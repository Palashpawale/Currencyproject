import React from 'react'

export default function CurrencyHandler(props) {
    const {
        currencyDrop,
        selectedCurrency,
        currencyChange,
        onChangeSum,
        sum
    } = props
    return (
        <div>
          <input className = 'input' type='number' value={sum} onChange={onChangeSum}/>
          <select value={selectedCurrency} onChange={currencyChange}> 
              {currencyDrop.map(option => (
              <option key={option} value={option}>{option}</option>
              ))}
              
          </select>   
        </div>
    )
}
