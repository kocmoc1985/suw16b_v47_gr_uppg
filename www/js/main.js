$(document).ready(function () {
    go();
});

var URL_1 = "templates/toDoListEntry.html";

$(window).resize(function () {
    
});

function go() {
    addTodoEntry("Test 1");
    addTodoEntry("Test 2");
    addTodoEntry("Test 3");
    addTodoEntry("Test 4");
    addTodoEntry("Test 5");
    addTodoEntry("Test 6");
    addTodoEntry("Test 7");
    //
    addClickEventCheckBoxes();
    addClickEventDeleteIcon();
    addClickEventMoveUp();
    addClickEventMoveDown();
    addClickEventAddBtn();
}

function addClickEventAddBtn() {
    $("#add-btn").click(function () {
        alert("clicked");
    });
}

function addClickEventCheckBoxes() {
    //
    $(".chkbox").click(function () {
        //
        var todoListEntry = $(this).parent().parent();
        //
        if ($(this).is(':checked')) {
            //
            $(todoListEntry).fadeOut(500, function () {
                $("#container").append($(todoListEntry).detach().fadeIn(500));
                $(todoListEntry).find(".todo").addClass("checked");
            });
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

function addClickEventMoveUp() {
    $(".move-up").click(function () {
        var todoEntry = $(this).parent();
        var prev = $(todoEntry).prev();

        if ($(prev).length === 0) {
            return;
        }

        $(todoEntry).fadeOut(500, function () {
            var detach = $(todoEntry).detach();
            $(prev).before(detach.fadeIn(500));
        });
    });
}

function addClickEventMoveDown() {
    $(".move-down").click(function () {
        var todoEntry = $(this).parent();
        var next = $(todoEntry).next();

        if ($(next).length === 0) {
            return;
        }

        $(todoEntry).fadeOut(500, function () {
            var detach = $(todoEntry).detach();
            $(next).after(detach.fadeIn(500));
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