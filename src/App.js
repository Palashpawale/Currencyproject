import React, { useState, useEffect } from 'react';
import './App.css';
import CurrencyHandler from './CurrencyHandler';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import CurrentCurrency from './CurrentCurrency';


const BASE_API = 'https://api.exchangeratesapi.io/latest'

function App() {

  const [currencyDrop, setCurrencyDrop] = useState([])
  const [currencyFrom, setCurrencyFrom] = useState([])
  const [currencyTo, setCurrencyTo] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [sum, setSum] = useState(1)
  const [sumCurrency, setSumCurrency] = useState(true)
  
  let sumTo, sumFrom
  if (sumCurrency) {
    sumFrom = sum
    sumTo = sum * exchangeRate
  } else {
    sumTo = sum
    sumFrom = sum / exchangeRate
  }


  useEffect (() => {
   fetch(BASE_API)
   .then(res => res.json())
   .then(data => {
     const firstCurrency = Object.keys(data.rates)[0]
     setCurrencyDrop([data.base, ...Object.keys(data.rates)])
     setCurrencyFrom(data.base)
     setCurrencyTo(firstCurrency)
     setExchangeRate(data.rates[firstCurrency])
   })
  }, [])

  useEffect(() => {
    if (currencyFrom != null && currencyTo != null) {
      fetch(`${BASE_API}?base=${currencyFrom}&symbols=${currencyTo}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[currencyTo]))
    }

  }, [currencyFrom, currencyTo])


  function handleSumChangeFrom(e) {
   setSum(e.target.value)
   setSumCurrency(true)
  }
 

  function handleSumChangeTo(e) {
    setSum(e.target.value)
    setSumCurrency(false)
   }




  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/CurrentCurrency" component={CurrentCurrency} />
        <Link to="/CurrentCurrency">Rates</Link>
      </Switch>
    </Router>
    
    <h1>Currency Convert(Athena Analytics)</h1>
    <CurrencyHandler 
     currencyDrop={currencyDrop}
     selectedCurrency={currencyFrom}
     currencyChange={e => setCurrencyFrom(e.target.value)}
     onChangeSum={handleSumChangeFrom}
     sum={sumFrom}
    />
    <div className='equals'>==</div>
    <CurrencyHandler 
    currencyDrop={currencyDrop}
    selectedCurrency={currencyTo}
    currencyChange={e => setCurrencyTo(e.target.value)}
    onChangeSum={handleSumChangeTo}
    sum={sumTo}
    />
    </>
    
  );
}

export default App;
