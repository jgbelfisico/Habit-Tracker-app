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
  var filterHandlers = {
    all: function () {
      return habits;
    },
    completed: function () {
      return habits.filter(window.habitsUtils.isHabitCompletedToday);
    },
    pending: function () {
      return habits.filter(function (habit) {
        return !window.habitsUtils.isHabitCompletedToday(habit);
      });
    }
  };

  applyTheme(window.storageUtils.loadTheme());

  // Guarda el estado actual para que siga disponible al recargar.
  function saveHabits() {
    window.storageUtils.saveHabits(habits);
  }

  // Guarda, renderiza y muestra un mensaje de éxito.
  function commitChanges(successMessage) {
    saveHabits();
    renderHabits();
    showMessage(successMessage, false);
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
    return filterHandlers[currentFilter]();
  }

  // Devuelve el mensaje correcto para el estado vacío actual.
  function getEmptyStateHtml() {
    var title = currentFilter === 'all' ? 'Aún no tienes hábitos creados.' : 'No hay hábitos para este filtro.';
    var description = currentFilter === 'all'
      ? 'Agrega el primero usando el formulario.'
      : 'Prueba con otro filtro o agrega un nuevo hábito.';

    return [
      '<div class="empty-state">',
      '  <p>' + title + '</p>',
      '  <p>' + description + '</p>',
      '</div>'
    ].join('');
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
      listElement.innerHTML = getEmptyStateHtml();
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

    habits.push(window.habitsUtils.createHabit(name));
    commitChanges('Hábito agregado correctamente.');
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
    commitChanges('Nombre del hábito actualizado.');
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

    commitChanges('Hábito eliminado.');
  }

  // Ejecuta la acción asociada al botón pulsado.
  function runHabitAction(action, habit) {
    if (action === 'complete-today') {
      window.habitsUtils.markHabitAsCompletedToday(habit);
      commitChanges('Marcaste el hábito como completado hoy.');
      return;
    }

    if (action === 'edit-habit') {
      editHabit(habit);
      return;
    }

    if (action === 'delete-habit') {
      deleteHabit(habit.id);
    }
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

    runHabitAction(actionButton.dataset.action, habit);
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
