(function () {
  // Devuelve la fecha local en formato simple YYYY-MM-DD.
  function getToday() {
    var now = new Date();
    return formatDate(now);
  }

  // Convierte un objeto Date al formato usado por la app.
  function formatDate(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    return year + '-' + month + '-' + day;
  }

  // Suma o resta días a una fecha en formato YYYY-MM-DD.
  function shiftDate(dateString, days) {
    var parts = dateString.split('-').map(Number);
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    date.setDate(date.getDate() + days);
    return formatDate(date);
  }

  window.dateUtils = {
    getToday: getToday,
    shiftDate: shiftDate
  };
})();
