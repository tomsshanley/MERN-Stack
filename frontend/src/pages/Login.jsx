import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  // creating an object for the form data
  const [formData, setFormData] = useState({

    email: '',
    password: '',

  })

  // creating consts to be stored in formData object
  const {email, password  } = formData

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
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Please login below</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
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
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login