const { poolPromise } = require("../services/database.services");

const createUserMiddleware = async (req, res, next) => {
  const errors = [];
  const { username, password, email, role_id } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username)
    errors.push({
      name: "username",
      message: "Username is required",
      status: 400,
    });

  if (!email)
    errors.push({ name: "email", message: "Email is required", status: 400 });

  if (!password)
    errors.push({
      name: "password",
      message: "Password is required",
      status: 400,
    });
    
  if (!role_id)
    errors.push({ name: "role_id", message: "Role is required", status: 400 });

  if (!emailRegex.test(email))
    errors.push({
      name: "email",
      message: "Invalid email format",
      status: 400,
    });
    
  if (password.length < 8)
    errors.push({
      name: "password",
      message: "Password must be at least 8 characters long",
      status: 400,
    });

  if (password.length > 20)
    errors.push({
      name: "password",
      message: "Password must be less than 20 characters long",
      status: 400,
    });

  try {
    const pool = await poolPromise;

    const userResult = await pool
      .request()
      .input("username", username)
      .query("SELECT * FROM Users WHERE username = @username");

    if (userResult.recordset.length > 0) {
      errors.push({
        name: "username",
        message: "Username already exists",
        status: 401,
      });
    }

    const userEmailResult = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM Users WHERE email = @Email");

    if (userEmailResult.recordset.length > 0) {
      errors.push({
        name: "email",
        message: "Email already exists",
        status: 401,
      });
    }

    if (errors.length > 0) return next(errors);

    next();
  } catch (error) {
    next(error);
  }
};

const updateUserMiddleware = async (req, res, next) => {
  try {
    const errors = [];
    const { username, password, email, role_id } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      errors.push({
        name: "username",
        success: false,
        message: "Username is required",
        status: 400,
      });
    }

    if (!email) {
      errors.push({
        name: "email",
        success: false,
        message: "Email is required",
        status: 400,
      });
    }

    if (!password) {
      errors.push({
        name: "password",
        success: false,
        message: "Password is required",
        status: 400,
      });
    }

    if (!role_id) {
      errors.push({
        name: "role_id",
        success: false,
        message: "Role is required",
        status: 400,
      });
    }

    if (!emailRegex.test(email)) {
      errors.push({
        name: "email",
        success: false,
        message: "Invalid email format",
        status: 400,
      });
    }

    if (password.length < 8 && password.length > 0) {
      errors.push({
        name: "password",
        success: false,
        message: "Password must be at least 8 characters long",
        status: 400,
      });
    }

    if (password && password.length > 20) {
      errors.push({
        name: "password",
        success: false,
        message: "Password must be less than 20 characters long",
        status: 400,
      });
    }

    const pool = await poolPromise;
    let userCheckQuery;
    //check if username or email already exists but if it is the same user it's okay
    if (username || email) {
      userCheckQuery = await pool.request()
        .query(`SELECT * FROM Users WHERE (username = '${username}' OR email = '${email}') 
      AND user_id != ${req.params.id}`);
    }
    console.log(userCheckQuery.recordset);

    if (userCheckQuery.recordset.length > 0) {
      const existingUser = userCheckQuery.recordset[0];
      if (existingUser.username === username) {
        errors.push({
          name: "username",
          success: false,
          message: "Username already exists",
          status: 401,
        });
      }
      if (existingUser.email === email) {
        errors.push({
          name: "email",
          success: false,
          message: "Email already exists",
          status: 401,
        });
      }
    }

    if (errors.length > 0) {
      return next(errors);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserMiddleware,
  updateUserMiddleware,
};
