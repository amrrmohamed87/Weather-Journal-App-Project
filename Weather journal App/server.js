//Empty JS object to act as an endpoint for all the routes
projectData = {};

//express run server and routes
const express = require('express')
//start up an instant of app
const app = express();

//Dependencies
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

//cors for cross origin allowance
const cors = require('cors')
app.use(cors());

//Initialize the main project folder
app.use(express.static('Website'));
const port = 8000;
const hostname = "127.0.0.1";

//callBack function to complete GET '/all'
const getAll = (req, res) => res.status(200).send(projectData);

//GET route
app.get('/all', getAll);

//CallBack function to complete POST '/add'
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);     //this line  is optional
}

//GET route
app.post('/add', postData);

//callback func to test the server
function listening(){
    console.log(`server running at http://${hostname}:${port}/`);
};

//spin up server 
app.listen(port, listening);

