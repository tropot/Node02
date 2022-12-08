const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const http = require('http');
var nrRandom = Math.floor(Math.random() * 10);
var tableId = 0;
const db = mysql.createConnection({

    host: "localhost",
  
    user: "root",
  
    password: "",
  
    database: "testing",
  
  });
  db.connect((err) => {

    if (err) {
  
      throw err;
  
    }
  });

const app = express();
const port = process.env.PORT || 3000;
  
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
  

app.route("/main").get(function(req,res){
    res.render('main.ejs', {buba:"sdasdasd"});
    
}).post(function(req,res) {
    console.log("action : ",req.body.action);
    var action = req.body.action;

	switch (action)
	{
		case  'fetch' :
      var query = "SELECT * FROM numbers";
      db.query(query, function(error, data){
              res.send(data);
      });
      break;
    case  'add' :
      console.log("newData : ", req.body.newData);
      addNumber(req.body.newData);
      res.send('add data');
      break;
    case 'edit' :
      console.log(req.body);
      editNumber(req.body.newData,req.body.id);
      break;
	}
})

app.get('/edit', function(req, res) {
  tableId = parseInt(req.query.uid);
  res.render('edit.ejs');
})

app.listen(port, () => {
   console.log(`server is running at ${port}`);
});

function addNumber(num)
{
  var suma = nrRandom + parseInt(num);
  var sql = "INSERT INTO numbers (input, random, sumaNr) VALUES (?,?,?)";
  db.query(sql,[num,nrRandom,suma]);
}
function editNumber(num,id)
{
  var editNr = parseInt(num);
  tableId = parseInt(id);
  console.log(num, "   ", id);
  sql = "UPDATE numbers SET input= ? WHERE id=?";
  db.query(sql,[editNr,tableId], function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
}
