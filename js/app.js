(function () {
  var previewHabits = [
    {
      name: 'Beber agua',
      description: 'Recordatorio simple para mantener constancia diaria.',
      completedToday: true,
      streak: 'Racha actual: 4 días',
      progress: 'Completado 12 veces'
    },
    {
      name: 'Leer 15 minutos',
      description: 'Hábito pensado para una rutina corta y fácil de sostener.',
      completedToday: false,
      streak: 'Racha actual: 0 días',
      progress: 'Completado 6 veces'
    },
    {
      name: 'Caminar después de almorzar',
      description: 'Ejemplo de tarjeta con espacio para estado y progreso.',
      completedToday: true,
      streak: 'Racha actual: 7 días',
      progress: 'Completado 18 veces'
    }
  ];

  function createHabitCard(habit) {
    var statusClass = habit.completedToday ? 'is-complete' : 'is-pending';
    var statusText = habit.completedToday ? 'Completado hoy' : 'Pendiente hoy';

    return [
      '<article class="habit-card">',
      '  <div class="habit-card-top">',
      '    <div>',
      '      <h3>' + habit.name + '</h3>',
      '      <p>' + habit.description + '</p>',
      '    </div>',
      '    <span class="status-badge ' + statusClass + '">' + statusText + '</span>',
      '  </div>',
      '  <div class="habit-card-bottom">',
      '    <div class="metric-box">',
      '      <span>Progreso</span>',
      '      <strong>' + habit.progress + '</strong>',
      '    </div>',
      '    <div class="metric-box">',
      '      <span>Racha</span>',
      '      <strong>' + habit.streak + '</strong>',
      '    </div>',
      '  </div>',
      '</article>'
    ].join('');
  }

  function renderPreview() {
    var listElement = document.getElementById('habit-list');

    if (!listElement) {
      return;
    }

    listElement.innerHTML = previewHabits.map(createHabitCard).join('');
  }

  function bindFormPreview() {
    var form = document.getElementById('habit-form');

    if (!form) {
      return;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  }

  renderPreview();
  bindFormPreview();
})();
