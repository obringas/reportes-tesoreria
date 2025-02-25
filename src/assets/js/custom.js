
$(document).ready(function () {
    $(":input").inputmask();
});

$(document).ready(function () {
    $('.combobox').combobox();
});

$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$.fn.datepicker.defaults.orientation = "bottom";
$('.datepicker').datepicker();