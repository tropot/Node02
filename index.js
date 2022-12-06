const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;
  
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
  

app.route("/main").get(function(req,res){
    res.render('main.ejs', {buba:"sdasdasd"});
}).post(function(req,res) {
    console.log(req.body.nr);
})

app.listen(port, () => {
   console.log(`server is running at ${port}`);
});