import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CurrencyCode from './currencycodes.json'
import CountryNames from './contriesName.json'
require('dotenv').config();

const Weather_API_KEY = process.env.REACT_APP_WEATHER_API_KEY


function Subforex1(props) {

    const [Price, setPrice] = useState()
    const [Percent, setPercent] = useState()
    const [CountryCurrCode, setCountryCurrCode] = useState()

    useEffect(() => {
        let latitude, longitude;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude


                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}`
                fetch(url).then(response => response.json()).then(response => {

                        let code = `${response.city.country}`
                        

                        for (const [key, value] of Object.entries(CountryNames)) {
                            if(key === code){
                                let CountryName = value
                        

                                CurrencyCode.map((e) => {
                                    if (e.country === CountryName) {
                                        
                                        
                                        
                                        
                                        const url = `/historics/${props.fromCurr}-${e.currency_code}.json?key=demo`
                                        
                                        fetch(url).then(response => response.json()).then(USDresponse => {
                                            let raw_data = USDresponse.historics

                                            let total_count = 0
                                            let length = Object.values(raw_data).length
                                            let price = Object.values(raw_data)[0].high
                                            
                                            
                                            for (const [key, value] of Object.entries(raw_data)) {
                                                let c = key 
                                                c = 0
                                                total_count += value.close + c;
                                            }
                                            let avg = total_count/length
                                            console.log((price/avg))
                                            let change = (price/total_count)
                                            change = change.toString().slice(0, 4)
            
                                            setPercent(change)
                                            setPrice(price)
                                            setCountryCurrCode(e.currency_code)
                                        })
                                    }
                                    return null;
                                })
                            }
                        }

                })
            })
        }









    }, [])

    return (
        <tr>
            <td>{props.fromCurr}{CountryCurrCode}</td>
            <td>{Price}</td>
            <td className={`${Percent > 0 ? "Percent_Posve":"Percent_Negve"}`}><span></span>{Percent}%</td>
        </tr>
    )
}

export default Subforex1
