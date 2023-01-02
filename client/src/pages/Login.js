import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const {loginUser} = useContext(AuthContext)

    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e)=>{
        const {name, value}= e.target

        setcredentials({...credentials, [name]: value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!credentials || !password){
          toast.error("pls enter the all required field")
          return

        }
        loginUser(credentials)
    }
  return(
  <>
  <ToastContainer autoClose={2000} />
    <h3>Login</h3>

    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label htmlFor="exampleInput" className="form-label mt-4">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
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
        <label htmlFor="passwordInput" class="form-label mt-4">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          value={credentials.password}
          onChange={handleInputChange}
          name="password"
          placeholder="Enter password"
          required
        />
      </div>
      <input type="submit" value="Login" className="btn btn-primary my-3" ></input>
      <p>dont have an account <Link to="/register" >create one</Link></p>
    </form>
  </>
  )
};
export default Login;
