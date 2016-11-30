function getTaskJsonBE() {
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

function deleteAllBE() {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'deleteAll'
    }).responseText;
    //
    return jsonStr;
}

function deleteTaskBE(index) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'deleteTodoTasks',
        data: {param1: index}
    }).responseText;
    //
    return jsonStr;
}

function toggleDoneBE(index,done) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'toggleDone',
        data: {param1: index, param2: done}
    }).responseText;
    //
    return jsonStr;
}

function addTaskBE(text,index) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'addTask',
        data: {param1: text, param2: index}
    }).responseText;
    //
    return jsonStr;
}