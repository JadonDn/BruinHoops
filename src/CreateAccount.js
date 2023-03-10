import React from 'react'
import './CreateAccount.css'
const CreateAccount = () => {


    return(
      <div className='test'>
        <body><div  className='Create'>
        <img src = "mascot.png" className="bear" alt="logo"/>
      <form>
 <a>Create Account</a>
 <label for="username">Username:</label>
 <input type="text" id="username" name="username" required></input>
 <label for="password">Password:</label>
 <input type="password" id="password" name="password" required></input>
 <label for="email">
  
 </label>
 <input type="email" id="email" name="email" required></input>
 <input type="submit" value="Create Account"></input>
</form>
   </div>  
  </body>
     </div>
   
  
        
    );
    
};
export default CreateAccount;