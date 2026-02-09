// API Base URL
const API_URL = 'http://localhost:5000/api';

// State
let todos = [];
let currentFilter = 'all';

// DOM Elements
const todoForm = document.getElementById('todoForm');
const todoTitle = document.getElementById('todoTitle');
const todoDescription = document.getElementById('todoDescription');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('emptyState');
const filterTabs = document.querySelectorAll('.tab');
const toast = document.getElementById('toast');

// Stats
const totalTasks = document.getElementById('totalTasks');
const activeTasks = document.getElementById('activeTasks');
const completedTasks = document.getElementById('completedTasks');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    todoForm.addEventListener('submit', handleAddTodo);
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currentFilter = tab.dataset.filter;
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTodos();
        });
    });
}

// Load Todos from API
async function loadTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        
        todos = await response.json();
        renderTodos();
        updateStats();
    } catch (error) {
        showToast('Error loading todos', 'error');
        console.error('Error:', error);
    }
}

// Add Todo
async function handleAddTodo(e) {
    e.preventDefault();
    
    const title = todoTitle.value.trim();
    const description = todoDescription.value.trim();
    
    if (!title) return;
    
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });
        
        if (!response.ok) throw new Error('Failed to create todo');
        
        const newTodo = await response.json();
        todos.unshift(newTodo);
        
        // Clear form
        todoTitle.value = '';
        todoDescription.value = '';
        
        renderTodos();
        updateStats();
        showToast('Task added successfully!', 'success');
    } catch (error) {
        showToast('Error adding task', 'error');
        console.error('Error:', error);
    }
}

// Toggle Todo
async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: todo.title,
                description: todo.description,
                completed: !todo.completed,
            }),
        });
        
        if (!response.ok) throw new Error('Failed to update todo');
        
        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        todos[index] = updatedTodo;
        
        renderTodos();
        updateStats();
        showToast(updatedTodo.completed ? 'Task completed! 🎉' : 'Task reopened', 'success');
    } catch (error) {
        showToast('Error updating task', 'error');
        console.error('Error:', error);
    }
}

// Delete Todo
async function deleteTodo(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete todo');
        
        todos = todos.filter(t => t.id !== id);
        
        renderTodos();
        updateStats();
        showToast('Task deleted', 'success');
    } catch (error) {
        showToast('Error deleting task', 'error');
        console.error('Error:', error);
    }
}

// Edit Todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    const content = todoElement.querySelector('.todo-content');
    
    // Create edit form
    content.innerHTML = `
        <div class="edit-form">
            <input type="text" id="edit-title-${id}" value="${todo.title}" required>
            <textarea id="edit-desc-${id}" rows="2">${todo.description || ''}</textarea>
            <div class="edit-actions">
                <button class="btn-save" onclick="saveEdit(${id})">Save</button>
                <button class="btn-cancel" onclick="cancelEdit(${id})">Cancel</button>
            </div>
        </div>
    `;
}

// Save Edit
async function saveEdit(id) {
    const title = document.getElementById(`edit-title-${id}`).value.trim();
    const description = document.getElementById(`edit-desc-${id}`).value.trim();
    const todo = todos.find(t => t.id === id);
    
    if (!title) {
        showToast('Title cannot be empty', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                completed: todo.completed,
            }),
        });
        
        if (!response.ok) throw new Error('Failed to update todo');
        
        const updatedTodo = await response.json();
        const index = todos.findIndex(t => t.id === id);
        todos[index] = updatedTodo;
        
        renderTodos();
        showToast('Task updated!', 'success');
    } catch (error) {
        showToast('Error updating task', 'error');
        console.error('Error:', error);
    }
}

// Cancel Edit
function cancelEdit(id) {
    renderTodos();
}

// Render Todos
function renderTodos() {
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    todoList.innerHTML = filteredTodos.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${todo.id})"></div>
            <div class="todo-content">
                <div class="todo-title">${escapeHtml(todo.title)}</div>
                ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
                <div class="todo-time">${formatDate(todo.created_at)}</div>
            </div>
            <div class="todo-actions">
                <button class="btn-icon btn-edit" onclick="editTodo(${todo.id})" title="Edit">
                    ✏️
                </button>
                <button class="btn-icon btn-delete" onclick="deleteTodo(${todo.id})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

// Update Stats
function updateStats() {
    const total = todos.length;
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;
    
    totalTasks.textContent = total;
    activeTasks.textContent = active;
    completedTasks.textContent = completed;
}

// Show Toast
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}