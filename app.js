const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { response } = require('express');
app.use(bodyParser.json())

require('./Employee'); //import model Employee

//pBLloc1zFyh6KEnn
const Employee = mongoose.model("employee") // call the model

const mongoUri = "mongodb+srv://cnq:pBLloc1zFyh6KEnn@cluster0.riggl.mongodb.net/<dbname>?retryWrites=true&w=majority" // uri mongoDB

//connect to mongo DB
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//check the connection
mongoose.connection.on('connected',()=>{
    console.log("Connected to mongo yeaah");
})

//check if error connection
mongoose.connection.on('error',(err)=>{
    console.log("error", err);
})

app.post('/send',(req,res)=>{
    const employee = new Employee({
        name : req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position: req.body.position,
    })
    employee.save()
    .then(data=>{
        res.send("success")
    })
    .catch(err=>{
        console.log(err);
    })
});

app.post('/update', (req, res) => {
    Employee.findByIdAndUpdate(req.body.id,{
        name : req.body.name,
        email: req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position: req.body.position,
    })
    .then(data=>{
        console.log(data);
        res.send(data)
    })
    .catch(err=>{
        console.log(err);
    })
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndDelete(req.body.id)
    .then(data => {
        console.log(data);
        res.send('deleted')
    })
    .catch(err => {
        console.log(err);
    })
})

app.get('/', function(req,res){
    Employee.find({})
    .then(data =>{
        res.send(data)
    })
    .catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('Server Run')
});



// "name" : "fandi adhitya S.Kom",
// 	"email": "fandiadhitya@gmail.com",
// 	"phone":"085275502364",
// 	"picture":"uri.jpg",
// 	"salary":"10",
// 	"position": "full stack developer"