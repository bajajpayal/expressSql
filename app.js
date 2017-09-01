var express = require ('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var login = require('./routes/loginRoute');

var app = module.exports = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

router.post('/register',login.register);
router.post('/login',login.login);

app.use('/api', router);


app.listen(4001,(err)=>
{
    if(err)
        {
            console.log("error connecting");
        }
        else{
            console.log("server is listening at 5000");
        }
});
