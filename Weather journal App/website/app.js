/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
/*another way
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear(); 
*/

//the URL to retrieve weather info from his API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//personal API key for OpenWeatherMap API
//&units-metric to get the Celsius temperature
const apiKey = ",&appid=18ca5a48c8f56e5ed9a3761e3f295109&units=metric";

//the URL of the server to post data
const server = "http://127.0.0.1:8000";

//showing the error to the user
const error = document.getElementById('error');

//generateData
/*function to get input values
call getWeatherData to fetch the data from the API
create object from API object by using destructuring
post data in the server 
and get the data to update UI by using .then() method
*/

const generateData = () => {
    //get data when you click the button
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    //getWeatherData return promise
    getWeatherData(zip).then((data) => {
        //make sure from the received data to execute rest of steps
        if(data){
            const{
                main:{temp},
                name: city,
                weather: [{description}],
            } = data;
            const info = {
                newDate,
                city,
                temp: Math.round(temp), //to get convert double numbers into integer numbers
                description,
                feelings,
            };
            postData(server + '/add', info);
            updatingUI();
            document.getElementById('holder-entry').style.opacity = 1;
        }
    });

};

//Eventlistener
document.getElementById('generate').addEventListener('click', generateData);

//function to GET web API Data 
//async to allow the use of try&catch, await, fetch
const getWeatherData = async(zip) => {
    try{
        const res = await fetch(baseURL + zip + apiKey);
        const data = await res.json();

        if(data.cod != 200){
            //display the error message on UI
            error.innerHTML = data.message;
            setTimeout(_=> error.innerHTML = '', 2000)
            throw `${data.message}`;
        }
        return data;
    }catch(error){
        console.log('error',error);
    }
};

//func to POST data
const postData = async (url='', info = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json', 
        },
        body: JSON.stringify(info), //to return info in string
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error', error);
    }
};

//func to GET project data and update UI by this data
const updatingUI = async()=>{
    const res = await fetch(server + '/all');
    try{
        //transform into JSON
        const savedData = await res.json();
        console.log(savedData);
        //write updated data to DOM elements
        document.getElementById('date').innerHTML = savedData.newDate;
        document.getElementById('city').innerHTML = savedData.city;
        document.getElementById('temp').innerHTML = savedData.temp + '&degC';
        document.getElementById('description').innerHTML = savedData.description;
        document.getElementById('content').innerHTML = savedData.feelings
    }catch(error){
        console.log('error', error);
    }
};