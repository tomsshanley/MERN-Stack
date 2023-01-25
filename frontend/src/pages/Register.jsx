
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../componants/Spinner";

function Register() {
  // creating an object for the form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  // creating consts to be stored in formData object
  const {name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch]) 
  // above is a dependencie array, it will fire off if anything changes
  
  // onChange function. When using react 'useState' for form input...
  // a user can't type in the forms by defualt. 
  const onChange = (e) => {
    // I'm not sure how this works, but an object is created
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // onSubmit function
  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name, 
        email, 
        password,
      }
      dispatch(register(userData))
    }

    if(isLoading) {
      return <Spinner />
    }
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
           type="text" 
           className="form-control" 
           id="name" name="name" 
           value={name} 
           placeholder='Enter your name'
           onChange={onChange} />
        </div>
        <div className="form-group">
          <input 
           type="email" 
           className="form-control" 
           id="email" name="email" 
           value={email} 
           placeholder='Enter your email'
           onChange={onChange} />
        </div>
        <div className="form-group">
          <input 
           type="password" 
           className="form-control" 
           id="password" name="password" 
           value={password} 
           placeholder='Enter your password'
           onChange={onChange} />
        </div>
        <div className="form-group">
          <input 
           type="password" 
           className="form-control" 
           id="password2" name="password2" 
           value={password2} 
           placeholder='Confirm password'
           onChange={onChange} />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Register