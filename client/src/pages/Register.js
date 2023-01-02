import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [credentials, setcredentials] = useState({
        email: "",
        password: "",
        confirmPassword:""
    })

    const handleInputChange = (e)=>{
        const {name,value}=e.target

        setcredentials({...credentials, [name]:value})
    }

    const handleSubmit= (e)=>{
        e.preventDefault()

        if(!credentials || !password ||!confirmPassword){
          toast.error("pls enter the all required field")
          return

        }
        if(credentials.password!==credentials.confirmPassword){
          toast.error("password do not match")
          return
        }

    }
  return(
  <>
  <ToastContainer autoClose={2000} />
    <h3>create your account</h3>

    <form onSubmit={handleSubmit} >
      <div class="form-group">
        <label for="exampleInput" class="form-label mt-4">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInput"
          aria-describedby="emailHelp"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          placeholder="sid@gmail.com"
          required
        />
      </div>
      <div class="form-group">
        <label for="passwordInput" class="form-label mt-4">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="passwordInput"
          name="Password"
          value={credentials.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          required
        />
      </div>

      <div class="form-group">
        <label for="passwordInput" class="form-label mt-4">
           confirm Password
        </label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleInputChange}
          placeholder="Enter password"
          required
        />
      </div>
      <input
        type="submit"
        value="Register"
        className="btn btn-primary my-3"
      ></input>
      <p>
        already have an account <Link to="/login">Log in</Link>
      </p>
    </form>
  </>
  )
};
export default Register;
