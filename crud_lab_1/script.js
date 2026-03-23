// ====== Работа с хранилищем ======
const STORAGE_KEY = 'tasks';

function getTasks() {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Переменные состояния
let editingTaskId = null;
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'date-desc';

const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');
const prioSelect = document.getElementById('task-priority');
const submitBtn = document.getElementById('submit-btn');
const taskList = document.getElementById('task-list');

// Функция сортировки
function sortTasks(tasks) {
	const sorted = [...tasks];
	
	if (currentSort === 'date-desc') {
		sorted.sort((a, b) => b.id - a.id);
	} else if (currentSort === 'date-asc') {
		sorted.sort((a, b) => a.id - b.id);
	} else if (currentSort === 'priority-high') {
		const priorityOrder = { high: 3, medium: 2, low: 1 };
		sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
	} else if (currentSort === 'priority-low') {
		const priorityOrder = { high: 3, medium: 2, low: 1 };
		sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
	}
	
	return sorted;
}

// Обновление счетчиков
function updateCounters() {
	const tasks = getTasks();
	document.getElementById('total-count').textContent = tasks.length;
	document.getElementById('active-count').textContent = tasks.filter(t => !t.completed).length;
	document.getElementById('completed-count').textContent = tasks.filter(t => t.completed).length;
}

// Отрисовка задач
function renderTasks() {
	let tasks = getTasks();

	// Поиск по названию
	if (currentSearch) {
		tasks = tasks.filter(t => t.title.toLowerCase().includes(currentSearch.toLowerCase()));
	}

	// Фильтрация
	if (currentFilter === 'active') {
		tasks = tasks.filter(t => !t.completed);
	} else if (currentFilter === 'completed') {
		tasks = tasks.filter(t => t.completed);
	}

	// Сортировка
	tasks = sortTasks(tasks);

	// Очищаем контейнер
	taskList.innerHTML = '';

	if (tasks.length === 0) {
		taskList.innerHTML = '<p class="empty">Задач нет.</p>';
	} else {
		tasks.forEach(function(task) {
			const card = document.createElement('div');
			card.className = 'task-card' + (task.completed ? ' completed' : '') + ' priority-' + task.priority;
			card.dataset.id = task.id;

			card.innerHTML = `
				<div class="task-header">
					<h3>${escapeHTML(task.title)}</h3>
					<span class="badge">${task.priority}</span>
				</div>
				<p>${escapeHTML(task.description)}</p>
				<div class="task-actions">
					<button onclick="toggleComplete(${task.id})">
						${task.completed ? '↩ Вернуть' : '✅ Выполнено'}
					</button>
					<button onclick="editTask(${task.id})">✏ Изменить</button>
					<button onclick="deleteTask(${task.id})">🗑 Удалить</button>
				</div>
			`;

			taskList.appendChild(card);
		});
	}
	
	updateCounters();
}

// Защита от XSS
function escapeHTML(str) {
	const div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
}

// Добавление/редактирование задачи
form.addEventListener('submit', function(e) {
	e.preventDefault();
	const title = titleInput.value.trim();
	const description = descInput.value.trim();
	const priority = prioSelect.value;

	if (!title) {
		alert('Введите название задачи!');
		return;
	}

	const tasks = getTasks();

	if (editingTaskId) {
		// Режим редактирования
		const index = tasks.findIndex(t => t.id === editingTaskId);
		if (index !== -1) {
			tasks[index].title = title;
			tasks[index].description = description;
			tasks[index].priority = priority;
		}
		editingTaskId = null;
		submitBtn.textContent = 'Добавить';
	} else {
		// Создание новой задачи
		const newTask = {
			id: Date.now(),
			title: title,
			description: description,
			priority: priority,
			completed: false,
			createdAt: new Date().toISOString()
		};
		tasks.push(newTask);
	}

	saveTasks(tasks);
	form.reset();
	renderTasks();
});

// Переключение статуса
function toggleComplete(id) {
	const tasks = getTasks();
	const task = tasks.find(t => t.id === id);
	if (task) {
		task.completed = !task.completed;
		saveTasks(tasks);
		renderTasks();
	}
}

// Редактирование
function editTask(id) {
	const tasks = getTasks();
	const task = tasks.find(t => t.id === id);
	if (!task) return;

	titleInput.value = task.title;
	descInput.value = task.description;
	prioSelect.value = task.priority;

	editingTaskId = id;
	submitBtn.textContent = '💾 Сохранить изменения';
	form.scrollIntoView({ behavior: 'smooth' });
}

// Удаление
function deleteTask(id) {
	if (!confirm('Вы уверены, что хотите удалить эту задачу?')) {
		return;
	}
	let tasks = getTasks();
	tasks = tasks.filter(t => t.id !== id);
	saveTasks(tasks);
	renderTasks();
}

// Фильтрация
document.querySelectorAll('.filter-btn').forEach(function(btn) {
	btn.addEventListener('click', function() {
		document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
		this.classList.add('active');
		currentFilter = this.dataset.filter;
		renderTasks();
	});
});

// Поиск
const searchInput = document.getElementById('task-search');
if (searchInput) {
	searchInput.addEventListener('input', function(e) {
		currentSearch = e.target.value;
		renderTasks();
	});
}

// Сортировка
const sortSelect = document.getElementById('sort-by');
if (sortSelect) {
	sortSelect.addEventListener('change', function(e) {
		currentSort = e.target.value;
		renderTasks();
	});
}

// Инициализация
document.addEventListener('DOMContentLoaded', renderTasks);