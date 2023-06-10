import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import './App.css'

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
  })
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a10980c711eb82828bd03ca3ddcfd349&units=metrics`

      axios.get(apiUrl).then(res => {
        console.log(res.data);
        setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed })
        setError('');
      })
        .catch(err => {
          if (err.response.status == 404) { setError("Invalid City Name") }
          else { setError(''); }
          console.log(err)
        });
    }
  }
  return (

    <div className='container'>
      <div className="weather">

        <div className="search">
          <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
          <button onClick={handleClick}>
            search
          </button>
        </div>

        <div className="error">
          <p>{error}</p>
        </div>

        <div className="winfo">

          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>

          <div className="details">
            <div className="col">
              <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <div className='wind'>
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Home