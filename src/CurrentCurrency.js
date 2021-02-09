import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap'


export default function CurrentCurrency(currentcurrency) {
    const [rates, setRates] = useState([]);


    useEffect (() => {
        fetch('https://api.exchangeratesapi.io/latest')
        .then((res) => res.json())
        .then((json) => setRates(json));
        
        }, []);
    
    
    
    return (
        <div>
          <Container>  
              {rates.map(rates => {
                  return <CurrentCurrency key={rates.rates}/>
              })}
          </Container>
        <Card>
            <Card.Body>

            <Card.title>
                {currentcurrency.title} - <span className='text-muted font-weight-light'>{currentcurrency.rates}</span>
            </Card.title>
        
        </Card.Body>
        </Card>
        
        </div>
    )
}

