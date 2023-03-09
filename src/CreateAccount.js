import React from 'react'
import './CreateAccount.css'
const CreateAccount = () => {
    return(
      
      <body><div  className='Create'>
        <img src = "https://content.sportslogos.net/logos/35/882/full/ucla_bruins_logo_mascot_20043890.png" className="bear" alt="logo"/>
      <form>
 <a>Create an Account</a>
 <label for="username">Username:</label>
 <input type="text" id="username" name="username" required></input>
 <label for="password">Password:</label>
 <input type="password" id="password" name="password" required></input>
 <label for="email">Email:</label>
 <input type="email" id="email" name="email" required></input>
 <input type="submit" value="Create Account"></input>
</form>
   </div>  
  </body>
   
  
        
    );
    
};
export default CreateAccount;