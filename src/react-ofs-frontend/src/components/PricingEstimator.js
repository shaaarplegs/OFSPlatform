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
      <h3 style={{color:'blue'}}>The service support estimating the prices of the following services:</h3>
      
      <ul className="pricing-estimator__list">
        {items.map((item, index) => (
          <li key={index} className="pricing-estimator__list-item">{item}</li>
        ))}
      </ul>
      <br />
      <input
        className="pricing-estimator__input pricing-estimatorInput"
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
            <h3 className="pricing-estimator__price">Estimated Price: {price} Rial Omani</h3>
        ) 
      }
      <br />
      <br />
      <br />
      <br />


<div className="paragraph-section" style={{ textAlign: 'center', marginBottom: '5%',  borderRadius: '25px', width: '60%'}}>
            <h3 style={{color:'blue'}}>How does this work ?</h3>
            <p style={{ fontSize: '18px', color: 'grey', lineHeight: '30px' }}>
            We use a machine learning model to predict the price of the service you are looking for.
            The model consistently learns from the data of the services that are already available on our platform.
            This means that you get an idea about the price of the service you are looking for without having to analysize the market beforehand.
            </p>    
        </div>
    </div>
  );
};

export default PricingEstimator;
