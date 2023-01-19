import React from 'react';
import bgImg from './home.png'
import logo from '../logo.png'
import profileImg from '../me.jpeg'
/*eslint-disable */
const Home = () => {
    return (
      <div>
        <img className="logo" src={logo} alt="logo" style={{width: '200px', height: 'auto'}}/>
        <div style={{ position: 'relative' }}>
          <img
            src={bgImg}
            alt="Freelancing"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              opacity: '0.7',
              top: 0,
              left: 0,
              borderRadius: '50%',
              animation: 'animation-name 3s ease-in-out infinite alternate',
            }}
          />
        </div>
        <div className="title" style={{textAlign: 'center', paddingTop: '50px', color: 'black', fontSize: '40px'}}>
        <h1>
          <span style={{fontWeight: 'bold'}}>Build</span>, 
          <span style={{fontWeight: 'bold'}}> Innovate </span> & 
          <span style={{color: '#5001d0', fontWeight: 'bold', fontSize: '80px'}}> share</span> your services today
        </h1>
      </div>

      <div className="paragraph-section" style={{ textAlign: 'center', marginLeft: '20%', marginBottom: '5%',  borderRadius: '25px', width: '60%'}}>
            <p style={{ fontSize: '25px', color: 'black', lineHeight: '30px' }}>
            "Are you a freelancer looking to build, innovate, and share your services in Oman? Look no further! Our platform is designed to connect you with potential clients and help you grow your business. Whether you're an experienced freelancer or just starting out, our user-friendly interface makes it easy for you to showcase your skills and services to a wider audience.

            With our service price estimator, you can easily calculate the cost of your services and stay competitive in the market. Additionally, our freelancing services section allows you to browse and connect with other freelancers in your field. Share your own freelancing services and gain visibility among potential clients. Join our community today and take the next step in your freelancing journey!"
            </p>    
        </div>

                <div className="about-me-section" style={{textAlign: 'center', paddingTop: '50px'}}>
        <img class="me" src={profileImg} alt="My Picture" style={{width: '200px', height: 'auto', borderRadius: '20%'}}/>
        <h2>About Me</h2>
        <p style={{ fontSize: '20px', color: 'black', lineHeight: '32px'  , marginLeft: '20%', marginBottom: '5%',  borderRadius: '25px', width: '60%'}}>
        After graduating high school, I was fortunate enough to receive a scholarship which allowed me to study English in the UK for a year. This experience not only improved my language skills but also exposed me to different cultures and ways of thinking. I then decided to pursue a career in technology and joined Fontys University in Eindhoven, Netherlands where I studied software engineering for a year and a half. Additionally, I also took a half-year course on artificial intelligence. Since then, I have been working in the field of AI with Insify. The knowledge and skills I gained through my education and experiences have been invaluable in my current job and have opened many doors for me in the tech industry.
        </p>
        </div>
        </div>
  );
};
  
  export default Home;
  
