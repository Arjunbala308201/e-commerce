import userModel  from "../model/UserModel.js";

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body, 'body');
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (!emailRegex.test(email)) {
      console.log('invalid mail')
      return res.status(200).json({
        toast: 'warning',
        message: 'Invalid email format'
      });
    }
    if(password.length <6){
      res.send({toast:'warning',message:'Password must be atleast 6 charectors'})
      console.log('password length error')
    }
  
    const newUser = new userModel({ name, email, password });
  
    try {
      const duplicateUser = await userModel.findOne({ email });
      if (duplicateUser) {
        console.log('email already exists');
        res.status(200).json({
          toast: 'warning',
          message: 'User already exists'
        });
      } else {
        try {
          await newUser.save();
          res.status(200).json({
            toast: 'success',
            message: 'User created successfully'
          });
        } catch (error) {
          next(error);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

const login = async (req, res, next) => {
    const { email, password } = req.body.userDetails; // Extract email and password
    console.log(req.body.userDetails, "body");
  
    try {
      // Check if the user exists
      const validUser = await userModel.findOne({ email: email });
      if (!validUser) {
        console.log("Invalid Mail");
        return res.status(200).send({  toast:'error',message: "User not found" }); // 404 for "not found"
      }
  
      // Compare the password
      if (validUser.password === password) {
        console.log("Invalid Password");
        return res.status(200).send({toast:'success', message: "Login Successful",userDetails:validUser }); // 200 for success
      } else {
        console.log("Invalid credentials");
        return res.status(200).send({ toast:'error',message: "Invalid credentials" }); // 401 for unauthorized
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).send({ message: "Internal Server Error" }); // 500 for server errors
    }
  };

const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    next(error);
  }
};

export { signup, login, logout };
// exports.verifyUser = (req, res, next) => {
//     const token = req.headers['x-access-token'];
//     if (!token) {
//         return res.status(403).send({ message: 'No token provided' });
//     }

//     jwt.verify(token, 'secret', (err, decoded) => {
//         if (err) {
//             return res.status(500).send({ message: 'Failed to authenticate token' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// exports.verifyAdmin = (req, res, next) => {
//     this.verifyUser(req, res, () => {
//         if (req.user.username !== 'admin') {
//             return res.status(403).send({ message: 'Requires admin role' });
//         }
//         next();
//     });
// };