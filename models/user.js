/**
 * Created by Dragos on 20.06.2016.
 */
var pg           = require('pg');

var conString = "postgres://postgres@localhost/world";

var client = new pg.Client(conString);

function User(){
    this.id = 0;
    this.email = "";
    this.password= ""; //need to declare the things that i want to be remembered for each user in the database
}

User.findOne = function(email, callback){
    var conString = "postgres://postgres@localhost/world";
    var client = new pg.Client(conString);

    var isNotAvailable = false; //we are assuming the email is taking
    //var email = this.email;
    //var rowresult = false;
    //check if there is a user available for this email;
    client.connect();
    //client.connect(function(err) {
    ////    //console.log(this.photo);
    //    console.log(email);
    //    if (err) {
    //        return console.error('could not connect to postgres', err);
    //    }

    client.query("SELECT * from users where username=$1", [email], function(err, result){
        if(err){
            return callback(err, isNotAvailable, this);
        }
        //if no rows were returned from query, then new user
        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            var user = new User();
            user.email= result.rows[0]['email'];
            user.password = result.rows[0]['password'];
            user.id = result.rows[0]['id'];
            client.end();
            return callback(null, user);
        }
    });
//});
};

User.findById = function(id, callback){
    var conString = "postgres://postgres@localhost/world";
    var client = new pg.Client(conString);

    client.connect();
    client.query("SELECT * from users where id=$1", [id], function(err, result){

        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            var user = new User();
            user.email= result.rows[0]['email'];
            user.password = result.rows[0]['password'];
            user.id = result.rows[0]['id'];
            console.log(user.email);
            return callback(null, user);
        }
    });
};

User.save = function(callback){
    this.save = function(callback) {
        var client = new pg.Client(conString);
        client.connect();

        console.log(this.email + ' will be saved');

        client.query('INSERT INTO users(email, password) VALUES($1, $2)', [this.email, this.password], function (err, result) {
            if (err) {
                console.log(err);
                return console.error('error running query', err);
            }
            console.log(result.rows);
            //console.log(this.email);
        });
        client.query('SELECT * FROM users ORDER BY id desc limit 1', null, function (err, result) {

            if (err) {
                return callback(null);
            }
            //if no rows were returned from query, then new user
            if (result.rows.length > 0) {
                console.log(result.rows[0] + ' is found!');
                var user = new User();
                user.email = result.rows[0]['email'];
                user.password = result.rows[0]['password'];
                user.id = result.rows[0]['id'];
                console.log(user.email);
                client.end();
                return callback(user);
            }
        });
    };
};


module.exports = User;