$(document).ready(function () {
    go();
});

var URL_1 = "templates/toDoListEntry.html";

function go() {
    addTodoEntry("Test 3");
    addTodoEntry("Test 4");
    //
    addClickEventCheckBoxes();
    addClickEventDeleteIcon();
    addClickEventAddBtn();
}

function addClickEventAddBtn(){
     $("#add-btn").click(function () {
         alert("clicked");
     });
}

function addClickEventCheckBoxes() {
    $(".chkbox").click(function () {
        //
        var todoListEntry = $(this).parent().parent();
        //
        if ($(this).is(':checked')) {
            $(todoListEntry).find(".todo").addClass("checked");
            //
            $("#container").append($(todoListEntry).detach());
            //
        } else {
            $(todoListEntry).find(".todo").removeClass("checked");
        }
    });
}

function addClickEventDeleteIcon() {
    $(".delete").click(function () {
        var todoEntry = $(this).parent();
        $(todoEntry).fadeOut(500, function () {
            $(todoEntry).remove();
        });
    });
}

function addTodoEntry(text) {
    var todoEntryTemplate = $(loadHtml(URL_1));
    $(todoEntryTemplate).find(".todo").text(text);
    $("#container").append(todoEntryTemplate);
}

function loadHtml(url) {
    //
    var html = $.ajax({
        url: url,
        type: "GET",
        dataType: 'html',
        async: false
    }).responseText;
    //
    return html;
}