import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PricingEstimator = () => {
  const [price, setPrice] = useState();
  const [predicted, setPredicted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);


  useEffect(() => {
    const corsUnblocker = async (url) => {
      const proxyUrl = 'https://cors-unblocker.herokuapp.com/';
      const response = await fetch(proxyUrl + url);
      return await response.text();
    };
    corsUnblocker('http://ai.ofs-platform.com');
    console.log(process.env.REACT_APP_username)
    axios.get('http://ai.ofs-platform.com/predictableFreelancingServices/40', {
      headers: {
        'Content-Type': 'application/json;',
        'Access-Control-Allow-Origin': '*',
        'username': process.env.REACT_APP_username,
        'password': process.env.REACT_APP_password
    }
    })
      .then((r) => {
        setItems(r.data.freelancingServices);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handlePriceChange = () => {


    axios.post(`http://ai.ofs-platform.com/predict`, { 
      "description": inputValue
      },  {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'predictionKeyID': process.env.REACT_APP_predictionKeyID,
          'predictionSecretAccess': process.env.REACT_APP_predictionSecretAccess
      }
      })
      .then( (r) => {
        console.log(r.data.Price)
        setPrice(r.data.Price)
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
        predicted === true && (
            <h3 className="pricing-estimator__price">Price: {price} Rial Omani</h3>
        ) 
      }
    </div>
  );
};

export default PricingEstimator;
