$(document).ready(function () {
    go();
});

var URL_1 = "templates/toDoListEntry.html";
var URL_2 = "templates/deleteModal.html";
var URL_3 = "templates/addModal.html";

function getTasks() {
    //
    var tasksObj = getTaskJson();
    //
    if (tasksObj === null) {
        return;
    }
    //
    var tasksArr = tasksObj.table;
    //
    for (var i = tasksArr.length - 1; i >= 0; i--) {
        addTodoEntry(tasksArr[i].index, tasksArr[i].text, tasksArr[i].done);
    }
    //
}

function go() {
    //
    includeHtml(URL_2, "body", "prepend");
    includeHtml(URL_3, "body", "prepend");
    //
    getTasks();
    //
    addClickEventCheckBoxes();
    addClickEventDeleteIcon();
    addClickEventMoveUp();
    addClickEventMoveDown();
    addClickEventAddBtn();
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

function addClickEventAddBtn() {
    //
    $('#gridSystemModalLabel').on('shown.bs.modal', function () {
        $('#task-text-input').focus();
    });
    //
    $('#btn-add-task-done').click(function (event) {
        var text = $('#task-text-input').val();
        addTodoEntry(-1, text, 'false', 'before');
        addTask(text);
    });
}

function addClickEventCheckBoxes() {
    //
    $("#container").on('click', '.chkbox', function () {
        //
        var todoListEntry = $(this).parent().parent();
        //
        if ($(this).is(':checked')) {
            //
            $(todoListEntry).fadeOut(500, function () {
                //
                toggleDone($(todoListEntry).data("index"), 'true');
                //
                $("#container").append($(todoListEntry).detach().fadeIn(500));
                $(todoListEntry).find(".todo").addClass("checked");
                //
            });
            //
        } else {
            //
            $(todoListEntry).find(".todo").removeClass("checked");
            //
            toggleDone($(todoListEntry).data("index"), 'false');
        }
    });
}

var todoEntry = null;

function addClickEventDeleteIcon() {
    $('#alert-delete-btn').on('click', function () {
        if (todoEntry) {
            //
            deleteTask(todoEntry[0].innerText.trim());
            //
            $(todoEntry).fadeOut(500, function () {
                $(todoEntry).remove();
                todoEntry = null;
            });
        }

    });
    //
    //
    $("#container").on('click', '.delete', function () {
        todoEntry = $(this).parent();
        //
        var itemTxt = '';
        if (todoEntry.length > 0) {
            itemTxt = ' "' + todoEntry[0].innerText.trim() + '"';
        }
        //
        $('.alert-danger h4').text('Delete item' + itemTxt + '?');
        //
    });
}

function addClickEventMoveUp() {
    $("#container").on('click', '.move-up', function () {
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
    $("#container").on('click', '.move-down', function () {
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


function addTodoEntry(index, text, done, where) {
    //
    var todoEntryTemplate = $(loadHtml(URL_1));
    $(todoEntryTemplate).find(".todo").text(text.trim());
    //
    if (index !== -1) {
        $(todoEntryTemplate).data("index", index);
    }
    //
    if (done === 'true') {
        $(todoEntryTemplate).find(".chkbox").prop('checked', true);
        $(todoEntryTemplate).find(".todo").addClass("checked");
    }
    //
    if (where === 'before') {
        $("#container").prepend(todoEntryTemplate);
        //
    } else {
        $("#container").append(todoEntryTemplate);
    }
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

function includeHtml(url, selector, addType) {
    //
    var html = $.ajax({
        url: url,
        dataType: 'text',
        async: false
    }).responseText;
    //
    if (addType === "append") {
        $(selector).append(html);
    } else if (addType === "prepend") {
        $(selector).prepend(html);
    } else if (addType === "after") {
        $(selector).after(html);
    } else if (addType === "before") {
        $(selector).before(html);
    } else {
        $(selector).append(html);
    }
}