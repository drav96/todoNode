/**
 * Created by Dragos on 21.06.2016.
 */
var pg           = require('pg');

var conString = "postgres://postgres@localhost/world";

var client = new pg.Client(conString);

function Task(){
    this.id = 0;
    this.user_id= 0;
    this.text=""; 
    this.is_completed = false;
}

Task.getAllById = function(id,callback) {
    var conString = "postgres://postgres@localhost/world";
    var client = new pg.Client(conString);

    client.connect();
    client.query("SELECT * from task where user_id=$1", [id], function(err, result){

        var tasks = [];
        if(err){
            console.log("error" + err);
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            for(var i=0; i<result.rows.length ;i++) {
                var task = new Task();
                task.id = result.rows[i]['id'];
                task.user_id = result.rows[i]['user_id'];
                task.text = result.rows[i]['text'];
                task.is_completed = result.rows[i]['is_completed'];
                tasks.push(task);
            }
        }
        return callback(null, tasks);
    });
};


Task.insert = function(user_id,newItem,callback) {
    var conString = "postgres://postgres@localhost/world";
    var client = new pg.Client(conString);

    client.connect();
    client.query("INSERT INTO task (user_id, text, is_completed) values ($1,$2,$3)", [user_id,newItem,0], function(err, result){
        if(err){
            return callback(err);
        }
        return callback(null);

    });
};

Task.update = function() {

};


Task.delete = function() {

};


Task.setIsCompleted = function(ischecked,itemID,callback) {
        var conString = "postgres://postgres@localhost/world";
        var client = new pg.Client(conString);

        client.connect();
        client.query("UPDATE task SET is_completed=$1 Where id=$2", [ischecked,itemID], function(err,result){
            if(err){
                return callback(err);
            }
            return callback(null);

        });
    }


module.exports = Task;