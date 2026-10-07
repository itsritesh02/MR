import { useState } from "react";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData({
      ...formData,
      [name]: value
    })
  };

  //Validation

  const validate = () => {
    const newErrors = {};

    //Name

    if (!formData.name.trim()) {
      newErrors.name = " Name is required ";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must  be at least 3 characters"
    }

    //Email
    if (!formData.email.trim()) {
      newErrors.name = " Email is required ";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email"
    };

    //passWord

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "password must be at least 6 characters"
    }


    //Confirm Password

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Enter Confirm Password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password Do not Match"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registerd Data", formData);
    alert("Register Successfull")

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    setErrors({})
  }

  return (
    <div>
      <h2>Register Form</h2>


      <form onSubmit={handleSubmit} >

        {/* Name */}
        <div>
          <label>Name</label>
          <input type="name" name="name" value={formData.name} placeholder="Enter name" onChange={handleChange} />

          {errors.name && (<p style={{ color: "red" }}>{errors.name}</p>)}
        </div>
        <br />
        {/* Email */}
        <div>
          <label >Email</label>
          <input type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} />
          {errors.email && (<p style={{color:"red"}}>{errors.email}</p>)}
        </div>
        <br />
        {/* Password */}
        <div>
          <label >Password</label>
          <input type="password" name="password" value={formData.password} placeholder="Create Password" onChange={handleChange} />
          {errors.password && (
            <p style={{ color: "red" }}>
              {errors.password}
            </p>
          )}
        </div>
        <br />
        {/* ConfirmPasswors */}

        <div>
          <label >Confirm Password</label>

          <input type="password" name="confirmPassword" value={formData.confirmPassword} placeholder="Confirm Password" />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <br />
        <button type="submit" >Register</button>

      </form>
    </div>
  )
}
export default App;