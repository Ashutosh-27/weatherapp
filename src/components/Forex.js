import React from 'react'
import Subforex from './Subforex.js'



function Forex() {

    let fromCurrs = ['USD','EUR']
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
                    {
                        fromCurrs.map((e)=>{
                            return(
                            <Subforex fromCurr={e}/>
                            )
                        })
                    }
               
                
                </tbody>
            </table>
        </div>
    )
}

export default Forex
