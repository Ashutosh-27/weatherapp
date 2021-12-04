import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CntryNames from './contriesName.json'
import '../css/weather.css'


function Weather(props) {

    var dt = new Date();

    const [CurrentData, setCurrentData] = useState([])
    const [ForecastMainData, setForecastMainData] = useState([])
    const [cityData, setcityData] = useState({})
    const [cntryCode, setcntryCode] = useState()
    const [Show_toggel, setShow_toggel] = useState(false)

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "August", "Sept", "Oct", "Novr", "Dec"
    ];

    const weekDays = ["Sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat"]

    let arr2 = []

    useEffect(() => {
        let latitude, longitude;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude

                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=045e6c7b533350a086f3492e23808a72`
                fetch(url).then(response => response.json()).then(response => {
                    ////console.log(response)
                    let raw_arr = response.list
                    let code = `${response.city.country}`
                    setcityData(response.city)
                    setcntryCode(CntryNames[code].toUpperCase())

                    dt.setDate(dt.getDate() + 3);

                    for (let i = 0; i < raw_arr.length; i++) {
                        const date = new Date(raw_arr[i].dt_txt);
                        if (date.getDate() > dt.getDate()) {
                            raw_arr.splice(i, raw_arr.length)

                        }
                    }

                    // let dict = raw_arr[1]
                    // let tp = raw_arr[1].main.temp
                    // tp = tp - 273.15
                    // tp = tp.toString().slice(0, 4);
                    // //console.log(tp)
                    // dict.main.temp = tp


                    // setCurrentData(dict)
                    //console.log(raw_arr)


                    for (let i = 1; i < raw_arr.length; i++) {
                        const date1 = new Date(raw_arr[i - 1].dt_txt);
                        const date2 = new Date(raw_arr[i].dt_txt);
                        if (date1.getDate() === date2.getDate()) {
                            continue
                        }

                        let tp = raw_arr[i].main.temp
                        tp = tp - 273.15
                        tp = tp.toString().slice(0, 4);
                        //console.log(tp)
                        raw_arr[i].main.temp = tp

                        let rx_dt = new Date(raw_arr[i].dt_txt)
                        raw_arr[i].dt_txt = rx_dt


                        arr2.push(raw_arr[i + 4])
                        //console.log(arr2)
                    }

                    for (let i = 0; i < arr2.length; i++) {
                        let tp = arr2[i].main.temp
                        tp = tp - 273.15
                        tp = tp.toString().slice(0, 4);
                        //console.log(tp)
                        arr2[i].main.temp = tp

                        let rx_dt = new Date(arr2[i].dt_txt)
                        arr2[i].dt_txt = rx_dt
                        //console.log(arr2[i].dt_txt.getDay())
                    }
                    
                    let tp = raw_arr[1].main.temp
                    tp = tp - 273.15
                    tp = tp.toString().slice(0, 4);
                    //console.log(tp)
                    raw_arr[1].main.temp = tp
                    let arr1 = [raw_arr[1]]
                    setCurrentData(arr1)

                    setForecastMainData(arr2)
                    
                    console.log(raw_arr[1])
                    //console.log(cityData)
                })
            })
        }

    }, [])

    
    return (
        <div className='sub_section1' >
            <div className='container_A'>
                <div>
                    <span>{dt.getHours()}:{dt.getMinutes()}</span>&nbsp;<span className='bar'>|</span>&nbsp;
                    <span> {monthNames[dt.getMonth()]}&nbsp;{dt.getDate()}</span>
                </div>
                <h2>{cntryCode},&nbsp;<span>{cityData.country}</span></h2>
            </div>
            <div>
                <div className={'mainTemp'}>
                    <span >
                        {
                            dt.getHours() > 6 && dt.getHours() < 19 ?
                                <img src='./images/dayclouds.png' />
                                :
                                <img src='./images/nightclouds.png' />
                        }
                    </span>
                    <span>
                        {
                           CurrentData.map((e)=>{
                               return(
                                   <h2 className='temp0'>{e.main.temp}&#730;C</h2>
                               )
                           })                    
                        }
                    </span>
                </div>
                <div>
                    <button className={'forecast_btn'} onClick={() => {
                        {
                            !Show_toggel ? setShow_toggel(true) : setShow_toggel(false)
                        }

                    }}>Next 3 Days Forecast</button>
                </div>
                <div className={`forecast_toggle_container${Show_toggel ? " active" : ""}`}>

                    {
                        ForecastMainData.map((e, index = 0) => {
                            return (
                                <div key={index} className='toogle_item'>
                                    <div className='toogle_item_info'>
                                        <span className={`${e.dt_txt.getDay()}`}>{weekDays[e.dt_txt.getDay()]}&nbsp;|{monthNames[e.dt_txt.getMonth()]} {e.dt_txt.getDate()}</span>
                                    </div>
                                    <div className='toogle_item_data'>
                                        <span>
                                            {
                                                e.dt_txt.getHours() > 6 && e.dt_txt.getHours() < 19 ?
                                                    <img src='./images/dayclouds.png' className='toogle_item_img' />
                                                    :
                                                    <img src='./images/nightclouds.png' className='toogle_item_img' />
                                            }
                                        </span>
                                        <span>{e.main.temp}&#730;C</span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Weather
