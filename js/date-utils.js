(function () {
  // Devuelve la fecha local en formato simple YYYY-MM-DD.
  function getToday() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');

    return year + '-' + month + '-' + day;
  }

  window.dateUtils = {
    getToday: getToday
  };
})();
