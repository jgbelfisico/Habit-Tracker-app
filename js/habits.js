(function () {
  // Crea un hábito nuevo con los datos mínimos para esta fase.
  function createHabit(name) {
    return {
      id: Date.now(),
      name: name,
      createdAt: window.dateUtils.getToday(),
      completedDates: []
    };
  }

  // Indica si el hábito ya fue completado en la fecha actual.
  function isHabitCompletedToday(habit) {
    var today = window.dateUtils.getToday();
    return habit.completedDates.includes(today);
  }

  // Marca el hábito para hoy sin repetir la misma fecha.
  function markHabitAsCompletedToday(habit) {
    var today = window.dateUtils.getToday();

    if (!habit.completedDates.includes(today)) {
      habit.completedDates.push(today);
    }
  }

  // Genera el HTML de una tarjeta de hábito.
  function createHabitCard(habit) {
    var completedToday = isHabitCompletedToday(habit);
    var statusClass = completedToday ? 'is-complete' : 'is-pending';
    var statusText = completedToday ? 'Completado hoy' : 'Pendiente hoy';
    var buttonText = completedToday ? 'Completado hoy' : 'Marcar como completado';
    var buttonDisabled = completedToday ? 'disabled' : '';
    var progressText = habit.completedDates.length + ' días completados';

    return [
      '<article class="habit-card" data-id="' + habit.id + '">',
      '  <div class="habit-card-top">',
      '    <div>',
      '      <h3>' + escapeHtml(habit.name) + '</h3>',
      '      <p>Creado el ' + habit.createdAt + '</p>',
      '    </div>',
      '    <span class="status-badge ' + statusClass + '">' + statusText + '</span>',
      '  </div>',
      '  <div class="habit-card-bottom">',
      '    <div class="metric-box">',
      '      <span>Progreso</span>',
      '      <strong>' + progressText + '</strong>',
      '    </div>',
      '    <div class="metric-box">',
      '      <span>Racha</span>',
      '      <strong>' + habit.completedDates.length + ' días seguidos</strong>',
      '    </div>',
      '  </div>',
      '  <button class="complete-button" data-action="complete-today" ' + buttonDisabled + '>',
      '    ' + buttonText,
      '  </button>',
      '</article>'
    ].join('');
  }

  // Evita que el texto del usuario rompa el HTML.
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  window.habitsUtils = {
    createHabit: createHabit,
    createHabitCard: createHabitCard,
    isHabitCompletedToday: isHabitCompletedToday,
    markHabitAsCompletedToday: markHabitAsCompletedToday
  };
})();
