import React, { useState, useEffect } from 'react';
import rafe from './assets/user/rafe-uddaraj.jpg'
import maha from './assets/user/maha.jfif'
import mah from './assets/user/mah.jpg'
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

const Countdown = ({ targetDate }) => {
  const [days, setDays] = useState(0);
  const [flag, setFlag] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [email,setEmail] = useState('')

  const handleForm = (event)=>{
    event.preventDefault();
    if (isValidEmail(event.target[0].value)){
      setEmail( event.target[0].value)
      setFlag(true)
      setTimeout(()=>setFlag(false),3000)
    }else{
      console.log('invalid email')
    }
    
  }

  useEffect(() => {
    setTimeout(()=>{
      if(flag){
        setFlag(false)
      }
    },5000)
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    });

    return () => clearInterval(interval);
  }, [targetDate]);
  return (
    <main className='altrazen'>
      <section className="hero vh-100">
          <section className="container rel">
          {flag? (<div className="alert alert-success alert_css" role="alert">
                  Wow thank you for connecting with us. We will update you soon
                </div>): ''}
              <a href="/" className='text-decoration-none'>
              <h2 className="text-light pt-3 d-inline-block"> <i className="fa-thin fa-leaf"></i> Altraze<sup>n</sup></h2>
              </a>
              <div className="content w-50">
                  <h4 className="text-light tag_h4 font fw-light tag mb-3">Stay tuned for something amazing</h4>
                  <h1 className="display-1 text-light tag fw-bolder mb-5">
                      We are coming very soon
                  </h1>
                  <div className="timer d-flex text-center">
                      <div className="item">
                        <div className="box">
                              <span className="d-block text-light tag mb-2">{days}</span>
                        </div>
                          <span className="d-block text-light tag">Days</span>
                      </div>
                      <div className="item">
                        <div className="box">
                              <span className="d-block text-light tag mb-2">{hours}</span>
                        </div>
                          <span className="d-block text-light tag">Hours</span>
                      </div>
                      <div className="item">
                        <div className="box">
                              <span className="d-block text-light tag mb-2">{minutes}</span>
                        </div>
                          <span className="d-block text-light tag">Minutes</span>
                      </div>
                      <div className="item">
                        <div className="box">
                              <span className="d-block text-light tag mb-2">{seconds}</span>
                        </div>
                          <span className="d-block text-light tag">Seconds</span>
                      </div>
                  </div>
              </div>
              <div className="subscription w-75 mt-5">
                  <form action="#" className="d-flex form" onSubmit={handleForm}>
                      <div className="mb-3">
                          <input type="email" className="inp-css" placeholder="Enter Email Here" required/>
                          <div class="valid-feedback">
                              Looks good!
                          </div>
                        </div>
                      <div className="mb-3 mx-1">
                          <button type="submit" className="btn btn-primary btn-css">NOTIFY ME</button>
                        </div>
                  </form>
              </div>
            
              <div class="history-box">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="card border-0 shadow mb-4">
                      <div class="card-body">
                        <img class="rounded-circle" src={rafe} alt=""/>
                        <h3 class="card-title mb-2">Rafe Uddaraj</h3>
                        <h5 class="card-subtitle mb-3">Co-Founder</h5>
                        <a href="https://linkedin.com/in/rafeuddaraj" class="btn my-4 btn-outline-primary" target="_blank">Linkedin</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card border-0 shadow mb-4">
                      <div class="card-body">
                        <img class="rounded-circle" src={maha} alt=""/>
                        <h3 class="card-title mb-2">Maharaf Hossen</h3>
                        <h5 class="card-subtitle mb-3">Co-Founder</h5>
                        <a href="https://www.linkedin.com/in/maharaf-hossen/" target='_blank' class="btn my-4 btn-outline-primary">Linkedin</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card border-0 shadow mb-4">
                      <div class="card-body">
                        <img class="rounded-circle" src={mah} style={{width:'150px'}} alt=""/>
                        <h3 class="card-title mb-2">Mahjujah Usrat Vina</h3>
                        <h5 class="card-subtitle mb-3">Co-Founder</h5>
                        <a href="https://www.linkedin.com/in/mahjujah-usrat-vina/" target='_blank' class="btn my-4 btn-outline-primary">Linkedin</a>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <footer className="py-5">
                  <ul className="footer-icon d-flex">
                    <li><a href="https://www.github.com/altrazen" target="_blank"><i className="fa-brands fa-github"></i></a></li> 
                    <li><a href="https://www.linkedin.com/company/altrazen/" target="_blank"><i className="fa-brands fa-linkedin"></i></a></li> 
                    <li><a href="https://www.facebook.com/altrazen" target="_blank"><i className="fa-brands fa-facebook"></i></a></li> 
                  </ul>
                  <p className="text-end">&copy;2023 <a href="/">Altrazen</a>, all rights reserved</p>
              </footer>
          </section>
      </section>
      </main>
  );
};

export default Countdown;
