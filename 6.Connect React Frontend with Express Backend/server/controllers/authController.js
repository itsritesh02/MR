export const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Demo login
    if (email === "admin@gmail.com" && password === "123456") {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          email: email,
        },
      });
    }

    // Invalid credentials
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

