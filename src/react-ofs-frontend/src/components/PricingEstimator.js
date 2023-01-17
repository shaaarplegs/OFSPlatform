import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PricingEstimator = () => {
  const [price, setPrice] = useState();
  const [predicted, setPredicted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);


  useEffect(() => {
    axios.get(`https://${process.env.REACT_APP_API_Proxy}/predictableFreelancingServices/40`)
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
    axios.post(`https://${process.env.REACT_APP_API_Proxy}/predictor`, { 
      "description": inputValue
      })
      .then( (r) => {
        console.log(r.data.price)
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
        predicted === true && (
            <h3 className="pricing-estimator__price">Price: {price} Rial Omani</h3>
        ) 
      }
    </div>
  );
};

export default PricingEstimator;
