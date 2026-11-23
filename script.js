// 1. Функция для переключения вкладок
function showSection(sectionId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if(btn.getAttribute('onclick').includes(sectionId)) {
            btn.classList.add('active');
        }
    });

    // Если открыли вкладку фильтра, сразу показываем задачи
    if (sectionId === 'filter') {
        filterTasks();
    }
}

// 2. База данных задач (в реальности они приходили бы с сервера)
const allTasks = [
    { title: "Сделать макет лендинга", desc: "Отрисовать главную и форму входа.", tags: ["Дизайн", "UI/UX"], priority: "Критично" },
    { title: "Настроить базу данных", desc: "Поднять PostgreSQL и миграции.", tags: ["Backend", "Базы данных"], priority: "Важно" },
    { title: "Собрать требования", desc: "Провести интервью с заказчиком.", tags: ["Аналитика", "Коммуникации"], priority: "Критично" },
    { title: "Написать верстку", desc: "Сверстать страницы по макетам.", tags: ["Frontend", "Верстка"], priority: "Важно" },
    { title: "Протестировать формы", desc: "Проверить валидацию полей.", tags: ["Тестирование", "Frontend"], priority: "Средне" }
];

// 3. База данных сотрудников и их компетенций
const employees = {
    anna: { name: "Анна", competencies: ["Дизайн", "UI/UX", "Коммуникации"] },
    ivan: { name: "Иван", competencies: ["Backend", "Frontend", "Базы данных", "Верстка"] },
    maria: { name: "Мария", competencies: ["Аналитика", "Тестирование", "Коммуникации"] }
};

// 4. Главная функция фильтрации
function filterTasks() {
    const select = document.getElementById('user-select');
    if (!select) return; // Если элемент еще не загрузился

    const userId = select.value;
    const userCompetencies = employees[userId].competencies;
    const container = document.getElementById('filtered-tasks-container');
    
    // Очищаем контейнер
    container.innerHTML = '';

    // Отсеиваем задачи: оставляем только те, где есть хотя бы один общий тег
    const suitableTasks = allTasks.filter(task => {
        return task.tags.some(tag => userCompetencies.includes(tag));
    });

    // Если подходящих задач нет
    if (suitableTasks.length === 0) {
        container.innerHTML = `<div class="card" style="text-align:center; color:#64748b;">Для этого сотрудника нет подходящих задач по компетенциям.</div>`;
        return;
    }

    // Отрисовываем подходящие задачи
    suitableTasks.forEach(task => {
        const taskHTML = `
            <div class="card task-card" style="border-left: 4px solid #10b981;">
                <div class="task-header">
                    <h3>${task.title}</h3>
                    <span class="badge ${task.priority === 'Критично' ? 'high' : 'mid'}">${task.priority}</span>
                </div>
                <p>${task.desc}</p>
                <div class="tags">
                    ${task.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <div class="task-footer">
                    <span style="color: #10b981; font-weight: bold;">✓ Подходит по компетенциям</span>
                </div>
            </div>
        `;
        container.innerHTML += taskHTML;
    });
}