'use strict';

module.exports = class Server {
  constructor() {
    // save our settings to this
    this.settings = g.settings.Server;
    
    // add express to this
    this.app = m.express();

    // run the setup method
    this.setup();
  }

  setup() {
    // tell express to use middleware to parse JSON
    this.app.use(m.bodyparser.json());
    // declare a webroot
    this.app.use(
      m.express.static(
        m.path.join(g.settings.appRoot, this.settings.webroot)
      )
    );

    // compress all files using gzip
    this.app.use(m.compression());

    // parse all request cookies
    this.app.use(m.cookieparser());

    // parse all urlencoded request body data
    // for example from "standard" HTML forms
    this.app.use(m.bodyparser.urlencoded({extended: false}));

   
    var me = this;

//==============================================================================
//==============================================================================
 var fs  = require('fs');
 var fileName = "taskList.json";

this.app.post('/addTask', function (req, res) {
    //
    var param1 = req.body.param1;
    //
    var entry = {
        table: []
    };
    //
    entry.table.push({index: 0,text: param1,done:'false'});
    //
    var json = JSON.stringify(entry);
    //
    fs.readFile(fileName, 'utf8', function (err, data){
    if (err){
         fs.writeFile(fileName, json, 'utf8', function(err,data){
         res.end("Saved!?");
         fs.close(2);
        });
    } else {
        var obj = JSON.parse(data); //now it an object
        var index = obj.table.length;
        obj.table.push({index: index,text: param1,done:'false'}); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(fileName, json, 'utf8', function(err, data){
            res.end("Saved!?");
            fs.close(2);
        });
    }
    //
 });
});

this.app.post('/getTodoTasks', function (req, res) {
    
        fs.readFile(fileName, 'utf8', function (err, data){
            if (err){
             res.end("");
             fs.close(2);
        } else {
            var json = JSON.parse(data);
            res.json(json);
        }
    });
});

this.app.post('/deleteTodoTasks', function (req, res) {
        //
        var param1 = req.body.param1;
        //
        fs.readFile(fileName, 'utf8', function (err, data){
            if (err){
             res.end("");
             fs.close(2);
        } else {
            var obj = JSON.parse(data);
            console.log("delete: " + param1);
            var index = param1;
            obj.table.splice(index,1);
            var json = JSON.stringify(obj); //convert it back to json
            //
            fs.writeFile(fileName, json, 'utf8', function(err, data){
                res.end("");
                fs.close(2);
          });
        }
    });
});

this.app.post('/toggleDone', function (req, res) {
        //
        var param1 = req.body.param1; // index
        var param2 = req.body.param2; // done
        //
        fs.readFile(fileName, 'utf8', function (err, data){
        //
        if (err){
             res.end("");
             fs.close(2);
        } else {
            var obj = JSON.parse(data);
            console.log("index: " + param1);
            obj.table[param1].done = param2;
            var json = JSON.stringify(obj); //convert it back to json
            //
            fs.writeFile(fileName, json, 'utf8', function(err, data){
                res.end("");
                fs.close(2);
          });
        }
    });
});
 
 
//==============================================================================
//==============================================================================
 
 var mysql   = require('mysql');
 var connectionMySql;
 
this.app.post('/connectMySql', function (req, res) {
    //
    var ip = req.body.ip;
    var user  = req.body.user;
    var pass = req.body.pass;
    var db = req.body.database;
    //
    connectMySql(ip,user,pass,db,res);
    //
});

this.app.post('/executeSelect', function (req, res) {
    //
    var query = req.body.query;
    //
    executeSelect(connectionMySql,query,res);
});

//==============================================================================<

var s = g.settings.SQL;
    
if(s.connect === 'true'){
    connectMySql(s.host,s.user,s.pass,s.database,null);
} 

//==============================================================================<

function connectMySql(ip,user,pass,dbname,response){
    console.log("Connecting to DB");
    //
      connectionMySql =  mysql.createConnection({
      host     : ip,
      user     : user,
      password : pass,
      database : dbname
    });
    //
    connectionMySql.connect(function(err){
        if(!err) {
            console.log("Database is connected ...");
            //           
            //
            if(response !== null){
                response.end("Connection to: " + dbname + "   OK");
            }
            //
        } else {
            console.log("Error connecting database ... nn" + err);
             if(response !== null){
                 response.end("Connection to: " + dbname + "   Failed: " + err);
             }
        }
    });
}

/**
 * 
 */
function executeSelect(connection,query,response){
    //
    console.log("Processing query:" + query);
    //
    connection.query(query, function(err, rows, fields) {
    //
    //    connection.end();
    //
    if (!err)
        //
        console.log("Query successful: " + query);
        //
       if(response !== null){
            response.json(rows);
        }
        //
    else
        //
        console.log('Error while performing Query:' + query);
        //
       if(response !== null){
            response.end('Error while performing Query: ' + query);
        }
        //
  });
    //
}

//==============================================================================
//==============================================================================
   // listen on port 3000
    this.app.listen(this.settings.port,  function() {
      console.log("Server listening on port "+me.settings.port);
    });
  }
  
  
}
