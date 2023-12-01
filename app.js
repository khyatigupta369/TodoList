const express = require("express");
// const bodyParser = require("body-parser");
const date = require(__dirname+'/today.js');

const app = express();
const items = [];
const workItems =[];
// let is far better than var ---scope issues
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("list", { listTitle: date.getDate(), items: items });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  if(req.body.list === "work"){
  workItems.push(item);
  res.redirect('/work');
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});

app.get('/work',(req,res)=>{
  res.render('list',{ listTitle: "work", items: workItems });
});

app.listen(8000, () => {
  console.log("Set up to port 8000");
});
