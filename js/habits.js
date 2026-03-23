(function () {
  // Crea un identificador simple para cada hábito.
  function createHabitId() {
    return 'habit-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  // Devuelve una copia ordenada y sin fechas repetidas.
  function getUniqueCompletedDates(habit) {
    var completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
    return Array.from(new Set(completedDates)).sort();
  }

  // Crea un hábito nuevo con los datos mínimos para esta fase.
  function createHabit(name) {
    return {
      id: createHabitId(),
      name: name,
      createdAt: window.dateUtils.getToday(),
      completedDates: []
    };
  }

  // Indica si el hábito ya fue completado en la fecha actual.
  function isHabitCompletedToday(habit) {
    var today = window.dateUtils.getToday();
    return getUniqueCompletedDates(habit).includes(today);
  }

  // Marca el hábito para hoy sin repetir la misma fecha.
  function markHabitAsCompletedToday(habit) {
    var today = window.dateUtils.getToday();
    var completedDates = getUniqueCompletedDates(habit);

    if (!completedDates.includes(today)) {
      completedDates.push(today);
      completedDates.sort();
    }

    habit.completedDates = completedDates;
  }

  // Cuenta cuántos días diferentes fue completado el hábito.
  function getCompletedDaysCount(habit) {
    return getUniqueCompletedDates(habit).length;
  }

  // Devuelve la fecha más reciente en la que se completó el hábito.
  function getLastCompletedDate(habit) {
    var completedDates = getUniqueCompletedDates(habit);

    if (completedDates.length === 0) {
      return 'Aún no completado';
    }

    return completedDates[completedDates.length - 1];
  }

  // Calcula una racha actual sencilla contando días consecutivos hasta hoy.
  function getCurrentStreak(habit) {
    var completedDates = getUniqueCompletedDates(habit);
    var streak = 0;
    var currentDate = window.dateUtils.getToday();

    while (completedDates.includes(currentDate)) {
      streak += 1;
      currentDate = window.dateUtils.shiftDate(currentDate, -1);
    }

    return streak;
  }

  // Devuelve las fechas completadas para mostrarlas como historial.
  function getHistoryDates(habit) {
    return getUniqueCompletedDates(habit).slice().reverse();
  }

  // Genera el HTML de una tarjeta de hábito.
  function createHabitCard(habit) {
    var completedToday = isHabitCompletedToday(habit);
    var statusClass = completedToday ? 'is-complete' : 'is-pending';
    var statusText = completedToday ? 'Completado hoy' : 'Pendiente hoy';
    var buttonText = completedToday ? 'Completado hoy' : 'Marcar como completado';
    var buttonDisabled = completedToday ? 'disabled' : '';
    var streakText = getCurrentStreak(habit) + ' días seguidos';
    var lastCompletedText = getLastCompletedDate(habit);
    var historyHtml = createHistoryHtml(habit);

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
      '      <span>Racha actual</span>',
      '      <strong>' + streakText + '</strong>',
      '    </div>',
      '    <div class="metric-box">',
      '      <span>Última vez</span>',
      '      <strong>' + lastCompletedText + '</strong>',
      '    </div>',
      '  </div>',
      '  <div class="card-actions">',
      '    <button class="complete-button" data-action="complete-today" ' + buttonDisabled + '>',
      '      ' + buttonText,
      '    </button>',
      '    <button class="card-action" data-action="edit-habit" type="button">Editar nombre</button>',
      '    <button class="card-action is-danger" data-action="delete-habit" type="button">Eliminar</button>',
      '  </div>',
      '  <div class="history-box">',
      '    <span class="history-title">Historial</span>',
      historyHtml,
      '  </div>',
      '</article>'
    ].join('');
  }

  // Genera una lista simple con las fechas completadas.
  function createHistoryHtml(habit) {
    var historyDates = getHistoryDates(habit);

    if (historyDates.length === 0) {
      return '<span class="history-empty">Todavía no hay días completados.</span>';
    }

    return [
      '<ul class="history-list">',
      historyDates
        .map(function (date) {
          return '<li>' + date + '</li>';
        })
        .join(''),
      '</ul>'
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
    markHabitAsCompletedToday: markHabitAsCompletedToday,
    getCompletedDaysCount: getCompletedDaysCount,
    getCurrentStreak: getCurrentStreak,
    getLastCompletedDate: getLastCompletedDate,
    getHistoryDates: getHistoryDates
  };
})();
