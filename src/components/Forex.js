import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CurrencyCode from './currencycodes.json'
import Sub_forex1 from './Sub_forex1'
import Sub_forex2 from './Sub_forex2'


function Forex() {

    // const [currenCode, setcurrenCode] = useState()

    // useEffect(() => {
    //     let latitude, longitude;


    // }, [])





    return (
        <div className='forex_container'>
            <table>
                <thead>
                <tr>
                    <th>Currency</th>
                    <th>Price</th>
                    <th>Change%</th>
                </tr>
                </thead>
                <tbody>
                <Sub_forex1 />
                <Sub_forex2 />
                </tbody>
            </table>
        </div>
    )
}

export default Forex
