(function () {
  var STORAGE_KEY = 'habit-tracker-habits';

  // Guarda la lista completa de hábitos en localStorage.
  function saveHabits(habits) {
    var habitsJson = JSON.stringify(habits);
    localStorage.setItem(STORAGE_KEY, habitsJson);
  }

  // Carga la lista guardada y devuelve un arreglo listo para usar.
  function loadHabits() {
    var savedHabits = localStorage.getItem(STORAGE_KEY);

    if (!savedHabits) {
      return [];
    }

    return JSON.parse(savedHabits).map(normalizeHabit);
  }

  // Asegura que cada hábito tenga la forma esperada.
  function normalizeHabit(habit) {
    return {
      id: habit.id,
      name: habit.name || '',
      createdAt: habit.createdAt || window.dateUtils.getToday(),
      completedDates: Array.isArray(habit.completedDates) ? habit.completedDates : []
    };
  }

  window.storageUtils = {
    saveHabits: saveHabits,
    loadHabits: loadHabits
  };
})();
