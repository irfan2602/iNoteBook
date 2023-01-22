import React, { useState } from 'react'

const data = ['Select', 'Irfan', 'Ahmad', 'Farhan', 'ABC', 'XYZ', '123', '456', 'ABCXYZ']
const Testing = () => {
    const [count, setCount] = useState(0);
    return (

        <div>
            <h3>{count}</h3>
            <button onClick={() => setCount(count + 1)}>Count</button>
            {count > 5 &&
                <select>
                    {
                        data.map((info) => {
                            return <option info={data}>{info}</option>
                        })
                    }
                </select>
            }
        </div>
    )
}

export default Testing