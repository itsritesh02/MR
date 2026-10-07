import { useState } from "react";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  // Handle input
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error
    setErrors({
      ...errors,
      [name]: "",
    });

    setMessage("");
  };


  // Validation
  const validate = () => {

    const newErrors = {};

    // Email
    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {

      newErrors.email = "Enter a valid email";

    }


    // Password
    if (!formData.password.trim()) {

      newErrors.password = "Password is required";

    } else if (formData.password.length < 6) {

      newErrors.password =
        "Password must be at least 6 characters";

    }

    return newErrors;
  };


  // Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    // Frontend validation
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {

      setErrors(validationErrors);

      return;
    }

    try {

      setLoading(true);

      // API call
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage(data.message);

        // Clear form
        setFormData({
          email: "",
          password: "",
        });

      } else {

        setMessage(data.message);

      }

    } catch (error) {

      console.log(error);

      setMessage("Unable to connect to server");

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="login-container">

      <div className="login-box">

        <h2>Login</h2>

        <p className="subtitle">
          Login to your account
        </p>


        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="error">
                {errors.email}
              </p>
            )}

          </div>


          {/* Password */}

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.password && (
              <p className="error">
                {errors.password}
              </p>
            )}

          </div>


          {/* Button */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>


          {/* Response */}

          {message && (
            <p className="message">
              {message}
            </p>
          )}

        </form>

      </div>

    </div>
  );
}

export default Login;