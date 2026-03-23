(function () {
  var form = document.getElementById('habit-form');
  var input = document.getElementById('habit-name');
  var message = document.getElementById('form-message');
  var listElement = document.getElementById('habit-list');
  var filtersElement = document.getElementById('filters');
  var themeToggle = document.getElementById('theme-toggle');

  // Si falta algún nodo principal, la app no intenta continuar.
  if (!form || !input || !message || !listElement || !filtersElement || !themeToggle) {
    return;
  }

  var habits = window.storageUtils.loadHabits();
  var currentFilter = 'all';

  applyTheme(window.storageUtils.loadTheme());

  // Guarda el estado actual para que siga disponible al recargar.
  function saveHabits() {
    window.storageUtils.saveHabits(habits);
  }

  // Muestra un mensaje simple debajo del formulario.
  function showMessage(text, isError) {
    message.textContent = text;
    message.classList.toggle('is-error', Boolean(isError));
  }

  // Limpia espacios y valida que el nombre no esté vacío.
  function getValidHabitName(rawName) {
    var name = rawName.trim();

    if (!name) {
      showMessage('Escribe un nombre para el hábito.', true);
      return null;
    }

    return name;
  }

  // Busca un hábito usando su id.
  function findHabitById(habitId) {
    return habits.find(function (habit) {
      return String(habit.id) === String(habitId);
    });
  }

  // Devuelve la lista según el filtro activo.
  function getFilteredHabits() {
    if (currentFilter === 'completed') {
      return habits.filter(window.habitsUtils.isHabitCompletedToday);
    }

    if (currentFilter === 'pending') {
      return habits.filter(function (habit) {
        return !window.habitsUtils.isHabitCompletedToday(habit);
      });
    }

    return habits;
  }

  // Marca visualmente el botón del filtro activo.
  function updateFilterButtons() {
    var buttons = filtersElement.querySelectorAll('[data-filter]');

    buttons.forEach(function (button) {
      var isActive = button.dataset.filter === currentFilter;
      button.classList.toggle('is-active', isActive);
    });
  }

  // Dibuja la lista actual de hábitos.
  function renderHabits() {
    var visibleHabits = getFilteredHabits();

    if (visibleHabits.length === 0) {
      listElement.innerHTML = [
        '<div class="empty-state">',
        '  <p>No hay hábitos para este filtro.</p>',
        '  <p>Prueba con otro filtro o agrega un nuevo hábito.</p>',
        '</div>'
      ].join('');
      updateFilterButtons();
      return;
    }

    listElement.innerHTML = visibleHabits.map(window.habitsUtils.createHabitCard).join('');
    updateFilterButtons();
  }

  // Aplica el tema al documento y actualiza el botón.
  function applyTheme(theme) {
    var isDarkMode = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDarkMode);
    themeToggle.textContent = isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }

  // Cambia entre modo claro y oscuro.
  function toggleTheme() {
    var nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.storageUtils.saveTheme(nextTheme);
  }

  // Maneja el envío del formulario para crear hábitos.
  function handleFormSubmit(event) {
    event.preventDefault();

    var name = getValidHabitName(input.value);

    if (!name) {
      return;
    }

    var newHabit = window.habitsUtils.createHabit(name);
    habits.push(newHabit);

    saveHabits();
    renderHabits();
    showMessage('Hábito agregado correctamente.', false);
    form.reset();
    input.focus();
  }

  // Permite editar el nombre de un hábito existente.
  function editHabit(habit) {
    var newName = window.prompt('Nuevo nombre del hábito:', habit.name);

    if (newName === null) {
      return;
    }

    var validName = getValidHabitName(newName);

    if (!validName) {
      return;
    }

    habit.name = validName;
    saveHabits();
    renderHabits();
    showMessage('Nombre del hábito actualizado.', false);
  }

  // Elimina un hábito después de confirmar la acción.
  function deleteHabit(habitId) {
    var shouldDelete = window.confirm('¿Quieres eliminar este hábito?');

    if (!shouldDelete) {
      return;
    }

    habits = habits.filter(function (habit) {
      return String(habit.id) !== String(habitId);
    });

    saveHabits();
    renderHabits();
    showMessage('Hábito eliminado.', false);
  }

  // Responde a los botones dentro de cada tarjeta.
  function handleListClick(event) {
    var actionButton = event.target.closest('[data-action]');

    if (!actionButton) {
      return;
    }

    var habitCard = actionButton.closest('.habit-card');

    if (!habitCard) {
      return;
    }

    var habit = findHabitById(habitCard.dataset.id);

    if (!habit) {
      return;
    }

    if (actionButton.dataset.action === 'complete-today') {
      window.habitsUtils.markHabitAsCompletedToday(habit);
      saveHabits();
      renderHabits();
      showMessage('Marcaste el hábito como completado hoy.', false);
      return;
    }

    if (actionButton.dataset.action === 'edit-habit') {
      editHabit(habit);
      return;
    }

    if (actionButton.dataset.action === 'delete-habit') {
      deleteHabit(habit.id);
    }
  }

  // Cambia el filtro visible de hábitos.
  function handleFiltersClick(event) {
    var filterButton = event.target.closest('[data-filter]');

    if (!filterButton) {
      return;
    }

    currentFilter = filterButton.dataset.filter;
    renderHabits();
  }

  form.addEventListener('submit', handleFormSubmit);
  listElement.addEventListener('click', handleListClick);
  filtersElement.addEventListener('click', handleFiltersClick);
  themeToggle.addEventListener('click', toggleTheme);
  renderHabits();
})();
