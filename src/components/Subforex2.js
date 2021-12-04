import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CurrencyCode from './currencycodes.json'

function Subforex2(props) {

    const [Price, setPrice] = useState()
    const [Percent, setPercent] = useState()

    useEffect(() => {
        let latitude, longitude;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
                const url = `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=ashutosh_9`
                fetch(url).then(response => response.json()).then(response => {
                    CurrencyCode.map((e) => {
                        if (e.country === response.countryName) {
                            console.log(e.currency_code)

                            const url2 = `/historics/EUR-${e.currency_code}.json?key=demo`
                            fetch(url2).then(response => response.json()).then(EURresponse => {
                                let raw_data2 = EURresponse.historics
                                let total_count2 = 0
                                let length2 = Object.keys(raw_data2).length
                                let price2 = Object.values(raw_data2)[0].close

                                for (const [key, value] of Object.entries(raw_data2)) {
                                    let c = key 
                                    c = 0
                                    total_count2 += value.close;
                                }
                                let Avg_change2 = (total_count2 / length2) / 100
                                Avg_change2 = Avg_change2.toString().slice(0, 4)



                                setPercent(Avg_change2)
                                setPrice(price2)
                            })

                        }
                        return null;
                    })
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
