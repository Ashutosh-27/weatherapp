import React from 'react'
import Subforex1 from './Subforex1'
import Subforex2 from './Subforex2'


function Forex() {

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
                <Subforex1 />
                <Subforex2 />
                </tbody>
            </table>
        </div>
    )
}

export default Forex
