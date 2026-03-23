(function () {
  var habits = [];

  var form = document.getElementById('habit-form');
  var input = document.getElementById('habit-name');
  var message = document.getElementById('form-message');
  var listElement = document.getElementById('habit-list');

  // Dibuja la lista actual de hábitos.
  function renderHabits() {
    if (habits.length === 0) {
      listElement.innerHTML = [
        '<div class="empty-state">',
        '  <p>Aún no tienes hábitos creados.</p>',
        '  <p>Agrega el primero usando el formulario.</p>',
        '</div>'
      ].join('');
      return;
    }

    listElement.innerHTML = habits.map(window.habitsUtils.createHabitCard).join('');
  }

  // Muestra un mensaje simple debajo del formulario.
  function showMessage(text, isError) {
    message.textContent = text;
    message.classList.toggle('is-error', Boolean(isError));
  }

  // Limpia espacios y valida que el nombre no esté vacío.
  function getValidHabitName() {
    var name = input.value.trim();

    if (!name) {
      showMessage('Escribe un nombre para el hábito.', true);
      return null;
    }

    return name;
  }

  // Maneja el envío del formulario para crear hábitos.
  function handleFormSubmit(event) {
    event.preventDefault();

    var name = getValidHabitName();

    if (!name) {
      return;
    }

    var newHabit = window.habitsUtils.createHabit(name);
    habits.push(newHabit);

    renderHabits();
    showMessage('Hábito agregado correctamente.', false);
    form.reset();
    input.focus();
  }

  form.addEventListener('submit', handleFormSubmit);
  renderHabits();
})();
