import React from 'react';
import './Contact.css';
import NavBar from "../components/NavBar";

function Contact() {
    return(

   
        <body>
             <NavBar/>
             
            <div class="Contact">
        <h1>Have any questions?</h1>
        <p>For any inquiries please contact us through email!</p>
        <form target="_blank" action="https://formsubmit.co/mtelezing23@gmail.com" method="POST">
          <div class="form-group">
            <div class="form-row">
              <div class="col">
                <input type="text" name="name" class="form-control" placeholder="Full Name" required></input>
              </div>
              <div class="col">
                <input type="email" name="email" class="form-control" placeholder="Email Address" required></input>
              </div>
            </div>
          </div>
          <div class="form-group">
            <textarea placeholder="Your Message" class="form-control" name="message" rows="10" required></textarea>
          </div>
          <button type="Sub" class="btn btn-lg btn-dark btn-block">Submit Email</button>
    
        </form>
        
      </div>
      
        </body>
            
                   
       
    );
}

export default Contact;