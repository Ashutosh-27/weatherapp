import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CurrencyCode from './currencycodes.json'
import CountryNames from './contriesName.json'
require('dotenv').config();

const Weather_API_KEY = process.env.REACT_APP_WEATHER_API_KEY



function Subforex2(props) {

    const [Price, setPrice] = useState()
    const [Percent, setPercent] = useState()

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
                                        
            
                                        const url2 = `/historics/EUR-${e.currency_code}.json?key=demo`
                                        fetch(url2).then(response => response.json()).then(USDresponse => {
                                            let raw_data2 = USDresponse.historics
                                            //console.log(raw_data1)
                                            let total_count2 = 0
                                            let length2 = Object.keys(raw_data2).length
                                            let price2 = Object.values(raw_data2)[0].high
            
                                            for (const [key, value] of Object.entries(raw_data2)) {
                                                let c = key 
                                                c = 0
                                                total_count2 += value.high + c;
                                            }
                                            let Avg_change2 = (total_count2 / length2) / 100
                                            Avg_change2 = Avg_change2.toString().slice(0, 4)
            
                                            setPercent(Avg_change2)
                                            setPrice(price2)
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
        <td>EURINR</td>
        <td>{Price}</td>
        <td className={`${Percent > 0 ? "Percent_Posve":"Percent_Negve"}`}>{Percent}%</td>
    </tr>
    )
}

export default Subforex2
