window.addEventListener('DOMContentLoaded', () => {
    // Carregue jQuery e DataTables diretamente
    window.$ = window.jQuery = require('jquery');
    require('datatables.net')();
});