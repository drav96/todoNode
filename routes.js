/**
 * Created by Dragos on 20.06.2016.
 */
var Task = require('./models/task');
module.exports = function(app, passport) {
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/login')}
    // Root for users
    app.get('/',function(req,res){
        res.render('index',{
            isAuthenticated:false,
            user:req.user,
            title:'My app',
            items: Task
        });
    });
    app.get('/login', function(req,res){
        res.render('login');
    });

    app.post('/login', passport.authenticate('local'), function(req,res){
        res.redirect('/tasks');
    });



    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });



    //Root for tasks
    app.get('/tasks', ensureAuthenticated,function(req, res) {
        var id = req.user.id;
        Task.getAllById(id, function(err, tasks) {
            res.render('index',{
                title:'My app',
                isAuthenticated:true,
                user:req.user,
                items: tasks
            });
        });
    });

    app.post('/changeCompletion', ensureAuthenticated, function (req, res) {
        var id = req.body.id;
        var value = req.body.value;
        console.log(id,value);
        Task.setIsCompleted(value,id,function(error){
            console.log(error);
        });
    });

    app.post('/add', function(req, res) {
        var newItem = req.body.newItem;
        var user_id = req.user.id;
        Task.insert(user_id, newItem, function (err) {
            var id = req.user.id;
            Task.getAllById(id, function (err, tasks) {
                res.render('index', {
                    isAuthenticated:req.isAuthenticated(),
                    user:req.user,
                    items: tasks
                });

            });

        });
    });
   




}
