const {
  createUser,
  updateUser,
  DeleteUser,
  getAllUser,
  getUserById,
  dashboard,
} = require("../services/admin.services");

const createUserController = async (req, res) => {
  const { username, password, email, role_id } = req.body;

  try {
    const result = await createUser(username, password, email, role_id);

    if (result.success) {
      return res.status(200).json({
        message: result.message,
        token: result.token,
        status: 200,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Fail to create a user",
      error: err.message,
      status: 500,
    });
  }
};

const updateUserController = async (req, res) => {
  const user_id = parseInt(req.params.id, 10);
  const { username, email, role_id } = req.body;
  console.log(req.body);
  try {
    const result = await updateUser(user_id, username, email, role_id);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    } else {
      return res.status(401).json({
        message: result.message,
        status: 401,
      });
    }
  } catch (err) {
    console.log("fail to update 1");
  }
};

const deleteUserController = async (req, res) => {
  const user_id = parseInt(req.params.id, 10);
  console.log(user_id);
  try {
    const result = await DeleteUser(user_id);
    console.log(result);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Delete successful", status: 200 });
    } else {
      return res.status(401).json({ message: "Delete failed", status: 401 });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const result = await getAllUser();

    if (result.success) {
      return res.status(200).json({ user: result.user });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.log("Fail to get all user", error);
    res.status(500).json({ message: "Error getting all user" });
  }
};

const getUserByIdController = async (req, res) => {
  const user_id = parseInt(req.params.id, 10);
  console.log(user_id);
  try {
    const result = await getUserById(user_id);
    if (result.success) {
      return res.status(200).json({ user: result.user });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (err) {
    console.log("Fail to get user", err);
    res.status(500).json({ message: "Error getting user" });
  }
};

const dashboardController = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Validate the date format dd-MM-yyyy
  if (
    !startDate ||
    !endDate ||
    !/^\d{2}-\d{2}-\d{4}$/.test(startDate) ||
    !/^\d{2}-\d{2}-\d{4}$/.test(endDate)
  ) {
    return res.status(400).send({
      error:
        "Please provide both startDate and endDate query parameters in the format dd-MM-yyyy.",
    });
  }

  try {
    const data = await dashboard(startDate, endDate);
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createUserController,
  updateUserController,
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  dashboardController,
};
