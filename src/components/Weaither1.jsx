import { useEffect, useState } from "react"
import { format } from 'date-fns';
import axios from "axios"
import myImg2 from '../assets/img2.jpg'
import myImg1 from '../assets/img1.jpg'
import myImg3 from '../assets/img3.jpg'
import myImg4 from '../assets/img4.jpg'
import myImg5 from '../assets/img5.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'



const Weaither1 = () => {
    const [city, setCity] = useState("")
    const [weaither, setWeaither] = useState(null)
    const [err, setErr] = useState("")
    const [now1, setNow] = useState(new Date());
    const apiKey = "180c2ff9a08c755276bac39b76063f85";
    const fetchWeather = async (e) => {
        e.preventDefault()
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        try {
            const responce = await axios.get(apiUrl)
            // console.log(responce)
            // setWeaither(responce)
            setCity("")
            const apiData = await responce.data
            console.log(apiData)
            setWeaither(apiData)
        } catch (error) {
            console.log(error.message)
            setErr(error.message)
        }
    }
    const handleChange = (event) => {
        setCity(event.target.value)
    }

    useEffect(() => {
        const fetchWeather2 = async () => {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kolkata&units=metric&appid=${apiKey}`
            try {
                const responce = await axios.get(apiUrl)
                // console.log(responce)
                // setWeaither(responce)
                setCity("")
                const apiData = await responce.data
                console.log(apiData)
                setWeaither(apiData)
            } catch (error) {
                console.log(error.message)
                setErr(error.message)
            }
        }
        fetchWeather2()
    }, [])
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const formattedDateTime = format(now1, 'dd-MM-yyyy hh:mm:ss a');
    return (
        <>
            <div className="container">
                <div className="backImg">{weaither?.weather[0].main == "Haze" && <img src={myImg2} alt="" />} </div>
                <div className="backImg">{weaither?.weather[0].main == "Rain" && <img src={myImg1} alt="" />} </div>
                <div className="backImg">{weaither?.weather[0].main == "Clouds" && <img src={myImg3} alt="" />} </div>
                <div className="backImg">{weaither?.weather[0].main == "Clear" && <img src={myImg4} alt="" />} </div>
                <div className="backImg">{weaither?.weather[0].main == "Smoke" && <img src={myImg5} alt="" />} </div>
                <div className="main">
                    <div className="symbol">{Math.round(weaither?.main.temp)}°C /{Math.round((((weaither?.main.temp) * 9 / 5) + 32))}°F</div>
                    <form onSubmit={fetchWeather}>
                        <img className="icon1" src={icon1} alt="" /> 
                        {/* ***************** */}
                        <input type="text" className="textInput" onChange={handleChange} value={city} />
                        {/* ********* */}
                        <div className="icon"><img src={`https://openweathermap.org/img/wn/${weaither?.weather[0].icon}@2x.png`} alt={weaither?.weather[0].description} /></div>
                        {/* ********** */}
                        <button className="submit" type="submit">Submit </button>
                        {/* ********* */}
                        <div className="tempGrp">
                            <p className="tempMin">MIN:{weaither?.main.temp_min}</p>
                            <p className="tempMax"> Max:{weaither?.main.temp_max}</p>
                            <p className="tempHumidity">Humidity:{weaither?.main.humidity}</p>
                            <p className="seaLevel">Sea Level:{weaither?.main.sea_level}mb</p>
                        </div>
                        <h1>{weaither?.name}- <span>{weaither?.sys.country}</span></h1>
                    </form>
                    <div className="weatherD">{weaither?.weather[0].main}</div>
                    <div className="wind"> <img src={icon2} alt="" /> Wind Speed : <p>{weaither?.wind.speed} km/h</p> </div>
                    <div className="details"></div>
                    <div className="date">{formattedDateTime}</div>
                    <div className="descrition"> <p>Decription:</p> {weaither?.weather[0].description}</div>
                </div>
            </div>
        </>
    )
}
export default Weaither1