$(document).ready(function () {
    go();
});

var URL_1 = "templates/toDoListEntry.html";
var URL_2 = "templates/deleteModal.html";
var URL_3 = "templates/addModal.html";

$(window).resize(function () {

});

function getTasks() {
    //
    var tasksObj = getTaskJson();
    var tasksArr = tasksObj.table;
    //
    for (var i = tasksArr.length - 1; i >= 0; i--) {
        addTodoEntry(tasksArr[i].text);
    }
    //
}

function go() {
    //
    includeHtml(URL_2, "body", "prepend");
    includeHtml(URL_3, "body", "prepend");
    //
    getTasks();
//    addTodoEntry("Test 1");
//    addTodoEntry("Test 2");
//    addTodoEntry("Test 3");
//    addTodoEntry("Test 4");
//    addTodoEntry("Test 5");
//    addTodoEntry("Test 6");
//    addTodoEntry("Test 7");
    //
    addClickEventCheckBoxes();
    addClickEventDeleteIcon();
    addClickEventMoveUp();
    addClickEventMoveDown();
    addClickEventAddBtn();
}

function addClickEventAddBtn() {
    //
    $('#gridSystemModalLabel').on('shown.bs.modal', function () {
        $('#task-text-input').focus();
    });
    //
    $('#btn-add-task-done').click(function (event) {
        var val = $('#task-text-input').val();
        addTodoEntry(val, 'before');
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
                $("#container").append($(todoListEntry).detach().fadeIn(500));
                $(todoListEntry).find(".todo").addClass("checked");
                //
            });
            //
        } else {
            $(todoListEntry).find(".todo").removeClass("checked");
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
    // $("#container .move-up").click(function () {
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


function addTodoEntry(text, where) {
    var todoEntryTemplate = $(loadHtml(URL_1));
    $(todoEntryTemplate).find(".todo").text(text.trim());
    if (where === 'before') {
        $("#container").prepend(todoEntryTemplate);
        //
        updateJson(text);
        //
    } else {
        $("#container").append(todoEntryTemplate);
    }
}


function getTaskJson() {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'getTodoTasks'
    }).responseText;
    //
    return JSON.parse(jsonStr);
}

function deleteTask(text) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'deleteTodoTasks',
        data: {param1: text}
    }).responseText;
    //
    return jsonStr;
}

function updateJson(text) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'saveJson',
        data: {param1: text}
    }).responseText;
    //
    return jsonStr;
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