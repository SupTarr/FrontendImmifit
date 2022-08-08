import React from "react";
import "./registerForm.css";

function registerForm(){
    return(
        <div className ='form'>
        <section>
         <form className="form-component">
           <div className="form-userName">
             <label htmlFor="name">Username</label>
             <input type="text" name="title" />
           </div>

           <div className="form-password">
             <label htmlFor="password">Password</label>
             <input type="password" name="password" />
           </div>

           <div className="form-password">
             <label htmlFor="password">Confirm Password</label>
             <input type="password" name="password" />
           </div>


           <div className="form-email">
             <label htmlFor="name">Email</label>
             <input type="email" name="email" />
           </div>
   
   
           <button>ADD ACTIVITIES</button>
         </form>
       </section>
       </div>
    )
}

export default registerForm;