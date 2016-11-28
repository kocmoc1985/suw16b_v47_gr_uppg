$(document).ready(function () {
    go2();
});

function go2() {
    addHoverEventTodoListEntry();
}

function addHoverEventTodoListEntry() {
    //
    $("#container").on("mouseover", ".todo", function () {
        var parent = $(this).parent();
        $(parent).find(".controller").fadeIn(600);
    });
    //
    $("#container").on("mouseleave", ".todo-list-entry", function () {
        var parent = $(this).parent();
        $(parent).find(".controller").fadeOut(40);
    });
    //
}