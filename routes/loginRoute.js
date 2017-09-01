
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    port: 3306,
    password : 'payal',
    database : 'payal'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn",err);
    }
    });

    exports.register = function(req,res){



        console.log("req",req.body,req.body.first_name);
        var today = new Date();
        var users={
          "first_name":req.body.first_name,
          "last_name":req.body.last_name,
          "email":req.body.email,
          "password":req.body.password
        }
        connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          console.log('The solution is: ', results);
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
        }
        });
      }


      exports.login =function(req,res)
      {
          connection.query('SELECT * FROM user WHERE email =?',[req.body.email],(err,result,fields)=>
        {
            if(err)
                throw err;
            else if(result.length>0){
                    if(result[0].password==req.body.password)
                        {
                            res.send({
                                "code" : 200,
                                "message": 'login successfully'
                            })
                        }
                        else
                            {
                                res.send({
                                    "code" : 400,
                                    "message": 'password does not match'
                                })
                            }
            }
            else{
                res.send({
                    "code" : 400,
                    "message" : "email not found"
                })
            }
        })
      }