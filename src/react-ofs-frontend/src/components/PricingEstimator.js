import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PricingEstimator = () => {
  const [price, setPrice] = useState(0);
  const [predicted, setPredicted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const axiosConf = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'username': process.env.REACT_APP_username,
        'password': process.env.REACT_APP_password
    }
    };

  useEffect(() => {
    axios.get('https://ai.ofs-platform.com/predictableFreelancingServices/40',axiosConf)
      .then(response => setItems(response.data))
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handlePriceChange = () => {

    const data = { 
        "description": inputValue
    }
      
    const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'predictionKeyID': process.env.REACT_APP_predictionKeyID,
        'predictionSecretAccess': process.env.REACT_APP_predictionSecretAccess
    }
    };

    axios.post(`https://ai.ofs-platform.com/predict`, data, axiosConfig)
      .then( (r) => {
        setPrice(r.data.price)
        setPredicted(true)
      })
  };

  return (
    <div className="pricing-estimator">
      <ul className="pricing-estimator__list">
        {items.map((item, index) => (
          <li key={index} className="pricing-estimator__list-item">{item}</li>
        ))}
      </ul>
      <br />
      <input
        className="pricing-estimator__input"
        type="string"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Describe the service"
      />
      <br />
      <br />
      <button className="pricing-estimator__button" onClick={handlePriceChange}>Get Price</button>
      <br />
      <br />

      {
        predicted == true && (
            <h3 className="pricing-estimator__price">Price: {price} Rial Omani</h3>
        ) 
      }
    </div>
  );
};

export default PricingEstimator;
