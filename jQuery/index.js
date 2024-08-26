$("h1").addClass("big-title")
$(document).keypress(function(event) {
    $("h1").text(String.fromCharCode(event.which));
});