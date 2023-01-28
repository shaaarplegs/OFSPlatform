import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Form, Select, Input, Button,Checkbox } from 'antd';
/*eslint-disable */
const CreateFreelancingService = () => {
  const [verticals, setVerticals] = useState([]);
  const [uploaded, setUploaded] = useState(null);
  const [uploadedML, setUploadedML] = useState(null);
  const [formData, setFormData] = useState({
    vertical_id: '',
    name: '',
    city: '',
    description: '',
    price: '',
    phone_number: '',
    email: '',
    scheduledTime: {
      "Days": [],
      "DayTimes": []
    }
  });

  useEffect(() => {
    // Fetch verticals
    axios.get(`https://${process.env.REACT_APP_API_Verticals}/vertical`)
      .then(res => setVerticals(res.data.verticals))
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSelect = value => {
    setFormData({ ...formData, vertical_id: value });
  }

  const handleCheckboxChange = e => {
    const days = formData.scheduledTime.Days;
    const day = e.target.value;
    if(e.target.checked && !days.includes(day)) {
      setFormData({ ...formData, scheduledTime: { ...formData.scheduledTime, Days: [...days, day] } });
    } else {
      setFormData({ ...formData, scheduledTime: { ...formData.scheduledTime, Days: days.filter(d => d !== day) } });
    }
  }
  
  const handleTimeChange = (day, e) => {
    const daytimes = formData.scheduledTime.DayTimes;
    const index = formData.scheduledTime.Days.indexOf(day);
    daytimes[index] = e.target.value;
    setFormData({ ...formData, scheduledTime: { ...formData.scheduledTime, DayTimes: daytimes } });
  }

  const handleSubmit = e => {
    // e.preventDefault();
    // Send form data to API
    axios.post(`https://${process.env.REACT_APP_API_FreelancingServices}/fs`, formData)
      .then((r) => {
        console.log(r)
        setUploaded(true)
      })
      .catch(err => console.log(err));

      // update machine learning database
      const mlData = {
        "vertical": formData.vertical_id,
        "FS": formData.name,
        "description":  formData.description,
        "price":  formData.price,
      }
      axios.post(`https://${process.env.REACT_APP_API_Proxy}/updateDB`, mlData)
      .then((r) => {
        console.log(r)
        setUploadedML(true)
      })
      .catch(err => console.log(err));

    console.log(formData)
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Category">
        <Select placeholder="Select a category" onChange={handleSelect}>
          {verticals.map(vertical => (
            <Select.Option key={vertical.id} value={vertical.id}>{vertical.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Name" >
        <Input placeholder="Enter name" name="name" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="City">
        <Input placeholder="Enter city" name="city" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Description">
        <Input placeholder="Enter description" name="description" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Price">
        <Input placeholder="Enter price" name="price" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Phone Number">
        <Input placeholder="Enter phone number" name="phone_number" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Email">
        <Input placeholder="Enter email" name="email" onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Available Days">
        <Checkbox.Group>
          <Checkbox value="Monday" onChange={handleCheckboxChange}>Monday</Checkbox>
          <Checkbox value="Tuesday" onChange={handleCheckboxChange}>Tuesday</Checkbox>
          <Checkbox value="Wednesday" onChange={handleCheckboxChange}>Wednesday</Checkbox>
          <Checkbox value="Thursday" onChange={handleCheckboxChange}>Thursday</Checkbox>
          <Checkbox value="Friday" onChange={handleCheckboxChange}>Friday</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Available Time">
        {formData.scheduledTime.Days.map(day => (
          <div key={day}>
            <p>{day}</p>
            <Input placeholder="Enter time range, e.g 09:00-17:00" name="time" onChange={(e)=>handleTimeChange(day,e)}/>
          </div>
        ))}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Create</Button>
      </Form.Item>
      {
          uploaded ? true && (
            <div>
             <h3 style={{color:'blue'}}>Your service has been shared successfully!</h3>
            </div>
          ) : false
      }

    {
          uploadedML ? true && (
            <div>
             <h3 style={{color:'blue'}}>Your freelancing service information will be used to enchance our pricing estimator service.</h3>
            </div>
          ) : false
      }
    </Form>
  );
} 

export default CreateFreelancingService