import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CurrencyCode from './currencycodes.json'
import CountryNames from './contriesName.json'

function Subforex1( ) {

    const [Price, setPrice] = useState()
    const [Percent, setPercent] = useState()

    useEffect(() => {
        let latitude, longitude;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude


                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=11fe811468071916b9a881af04c49138`
                fetch(url).then(response => response.json()).then(response => {

                        let code = `${response.city.country}`
                        

                        for (const [key, value] of Object.entries(CountryNames)) {
                            if(key === code){
                                let CountryName = value
                        

                                CurrencyCode.map((e) => {
                                    if (e.country === CountryName) {
                                        
                                        
                                        // "proxy": "https://v2.api.forex",
                                        
                                        const url1 = `https://v2.api.forex/historics/USD-${e.currency_code}.json?key=demo`
                                        
                                        fetch(url1).then(response => response.json()).then(USDresponse => {
                                            let raw_data1 = USDresponse.historics
                                            //console.log(raw_data1)
                                            let total_count1 = 0
                                            let length1 = Object.keys(raw_data1).length
                                            let price1 = Object.values(raw_data1)[0].close
            
                                            for (const [key, value] of Object.entries(raw_data1)) {
                                                let c = key 
                                                c = 0
                                                total_count1 += value.close + c;
                                            }
                                            let Avg_change1 = (total_count1 / length1) / 100
                                            Avg_change1 = Avg_change1.toString().slice(0, 4)
            
                                            setPercent(Avg_change1)
                                            setPrice(price1)
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
            <td>USDINR</td>
            <td>{Price}</td>
            <td className={`${Percent > 0 ? "Percent_Posve":"Percent_Negve"}`}>{Percent}%</td>
        </tr>
    )
}

export default Subforex1
