(function () {
  // Crea un hábito nuevo con valores iniciales sencillos.
  function createHabit(name) {
    return {
      id: Date.now(),
      name: name,
      completedToday: false,
      totalCompletions: 0,
      createdAt: window.dateUtils.getToday()
    };
  }

  // Genera el HTML de una tarjeta de hábito.
  function createHabitCard(habit) {
    var statusClass = habit.completedToday ? 'is-complete' : 'is-pending';
    var statusText = habit.completedToday ? 'Completado hoy' : 'Pendiente hoy';
    var progressText = habit.totalCompletions + ' días completados';

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
      '      <strong>0 días seguidos</strong>',
      '    </div>',
      '  </div>',
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
    createHabitCard: createHabitCard
  };
})();
