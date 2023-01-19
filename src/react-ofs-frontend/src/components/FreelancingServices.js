import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

const FreelancingServices = () => {
  const [freelancingservices, setFreelancingServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    axios.get(`https://${process.env.REACT_APP_API_FreelancingServices}/fs`)
      .then(res => setFreelancingServices(res.data.freelancingservices))
      .catch(err => console.log(err));
  }, []);
  
  useEffect(() => {
    const filteredServices = freelancingservices.filter(service => {
      return service.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
             (cityFilter === '' || service.city === cityFilter);
    });
    
    const checkAllAvailability = async () => {
      const newAvailability = {};
      for (const service of filteredServices) {
        const availability = await checkAvailability(service.id);
        newAvailability[service.id] = availability;
      }
      setAvailability(newAvailability);
    };
    checkAllAvailability();
  }, [freelancingservices, searchTerm, cityFilter]);


  const filteredServices = freelancingservices.filter(service => {
    return service.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (cityFilter === '' || service.city === cityFilter);
  });

  const checkAvailability = async (fs_id) => {
    try {
        const res = await axios.get(`https://${process.env.REACT_APP_API_FreelancingServices_Status}/status/${fs_id}`);
        const { scheduledTime } = res.data.status;
        console.log(scheduledTime);

        const day= new Date().getDay() //return 0 to 6
        let weekday= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const scheduledTimeDays = scheduledTime.Days;
        const scheduledTimeDayTimes = scheduledTime.DayTimes;

        let scheduledTimeDaysCurrentIndex = null;
      
        console.log (scheduledTimeDays)
        console.log (weekday[day])
        for (let i = 0; i < scheduledTimeDays.length; i++) {

          if (scheduledTimeDays[i] === weekday[day]){
            scheduledTimeDaysCurrentIndex = i;
          }
        }

        if (scheduledTimeDaysCurrentIndex === null) {
          return 'Not available today';
        }
        else {
          const beginningAvailableTime = scheduledTimeDayTimes[scheduledTimeDaysCurrentIndex].split('-')[0]
          const endTimeAvailableTime = scheduledTimeDayTimes[scheduledTimeDaysCurrentIndex].split('-')[1]
          const beginningAvailableTimeDate = moment(beginningAvailableTime, "HH:mm");
          const endTimeAvailableTimeDate = moment(endTimeAvailableTime, "HH:mm");
          const currentTime = moment();
        
          if (currentTime.isBetween(beginningAvailableTimeDate, endTimeAvailableTimeDate)) {
            return "Available now!"
          } 
          else 
          {
            return "Not available now."
          }
        }
    } catch (err) {
        console.log(err);
        return 'Error fetching availability';
    }
};



  return (
    <div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by description" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="search-input"
        />
        <select 
          value={cityFilter} 
          onChange={e => setCityFilter(e.target.value)}
          className="search-select"
        >
          <option value="">All Cities</option>
          {[...new Set(freelancingservices.map(service => service.city))].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <ul className="services-list">
      {filteredServices.map(service => {
        return (
          <li key={service.id} className="service-item">
            <div className="left-content">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p>City: {service.city}</p>
              <p>Phone number: {service.phone_number}</p>
              <p>Email: {service.email}</p>
            </div>
            <div className="right-content">
              <p>Price: {service.price}</p>
              <p>{availability[service.id]}
              </p>
            </div>
          </li>
        );
      })}
      </ul>
    </div>
  );
};

export default FreelancingServices;
