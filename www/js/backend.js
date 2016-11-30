function getTaskJsonBE(clientId) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'getTodoTasks',
        data: {param1: clientId}
    }).responseText;
    //
    if(jsonStr.length === 0){
        return null;
    }
    //
    return JSON.parse(jsonStr);
}

function deleteAllBE(clientId) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'deleteAll',
        data: {param1: clientId}
    }).responseText;
    //
    return jsonStr;
}

function deleteTaskBE(index,clientId) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'deleteTodoTasks',
        data: {param1: index,param2:clientId}
    }).responseText;
    //
    return jsonStr;
}

function toggleDoneBE(index,done,clientId) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'toggleDone',
        data: {param1: index, param2: done,param3: clientId}
    }).responseText;
    //
    return jsonStr;
}

function addTaskBE(text,index,clientId) {
    var jsonStr =  $.ajax({
        async: false, //is true by default
        type: "POST",
        url: "http://localhost:3000/" + 'addTask',
        data: {param1: text, param2: index,param3: clientId}
    }).responseText;
    //
    return jsonStr;
}