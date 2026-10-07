import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }


  const validate = () => {
    const newErrors = {};

    //Email validaation

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }


    //Password validation

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (FormData.password.length < 6) {
      newErrors.password = "paassword must be atleast 6 charecters"
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Login Data", formData);
      alert("Login Successfully")

      setFormData({
        email: "",
        password: ""
      });

    }


  };

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />

        <input type="password" name="password" value={formData.password} placeholder="Enter Password" onChange={handleChange} />


        <button type="submit">Login</button>

      </form>
    </div>
  )
}

export default App;