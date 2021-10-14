import { useState, useEffect, } from 'react';

function Server() {
    const city = useState('Los Angeles');
    const [apiData, setApiData] = useState({});

    //getting the unique key after subscribing for https://openweathermap.org/ current weather data
    const apiKey = process.env.REACT_APP_API_KEY; 
    const apiUrl = process.env.REACT_APP_API_URL;

    const weatherApiUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}`;

    useEffect(() => { //fetching data 
        fetch(weatherApiUrl)
            .then((response) => response.json())
            .then((data) => setApiData(data));
    }, [weatherApiUrl]);

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2); //converting to celsius
    };

    const kelvintoFarenheit = (kelvin) => {
        return (((kelvin - 273.15) * 1.8) + 32).toFixed(2); //converting to farenheit
    }
    return (
        <div className="App">
            <header className="d-flex justify-content-center align-items-center">
                <h2>React Weather App</h2>
            </header>
            {apiData.main ? (
                <p className="script">
                    Right now it is {kelvintoFarenheit(apiData.main.temp)}&deg; F
                    ({kelvinToCelsius(apiData.main.temp_max)}&deg; C)
                    in {city}, California
                </p>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default Server;
