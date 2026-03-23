(function () {
  var HABITS_STORAGE_KEY = 'habit-tracker-habits';
  var THEME_STORAGE_KEY = 'habit-tracker-theme';

  // Guarda la lista completa de hábitos en localStorage.
  function saveHabits(habits) {
    var habitsJson = JSON.stringify(habits);
    localStorage.setItem(HABITS_STORAGE_KEY, habitsJson);
  }

  // Carga la lista guardada y devuelve un arreglo listo para usar.
  function loadHabits() {
    var savedHabits = localStorage.getItem(HABITS_STORAGE_KEY);

    if (!savedHabits) {
      return [];
    }

    try {
      return JSON.parse(savedHabits).map(normalizeHabit);
    } catch (error) {
      localStorage.removeItem(HABITS_STORAGE_KEY);
      return [];
    }
  }

  // Guarda el tema actual del usuario.
  function saveTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  // Recupera el tema guardado o devuelve el tema claro por defecto.
  function loadTheme() {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  }

  // Asegura que cada hábito tenga la forma esperada.
  function normalizeHabit(habit) {
    var completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];

    return {
      id: habit.id || 'habit-' + Date.now(),
      name: typeof habit.name === 'string' ? habit.name.trim() : '',
      createdAt: habit.createdAt || window.dateUtils.getToday(),
      completedDates: Array.from(new Set(completedDates)).sort()
    };
  }

  window.storageUtils = {
    saveHabits: saveHabits,
    loadHabits: loadHabits,
    saveTheme: saveTheme,
    loadTheme: loadTheme
  };
})();
