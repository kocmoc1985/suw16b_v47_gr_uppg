function getTaskJson() {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'getTodoTasks'
    }).responseText;
    //
    if(jsonStr.length === 0){
        return null;
    }
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

function toggleDone(index,done) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'toggleDone',
        data: {param1: index, param2: done}
    }).responseText;
    //
    return jsonStr;
}

function addTask(text) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'addTask',
        data: {param1: text}
    }).responseText;
    //
    return jsonStr;
}