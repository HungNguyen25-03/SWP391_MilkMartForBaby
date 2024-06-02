const { createUser } = require("../services/admin.services");

const createUserController = async (req, res) => {
  const { username, password, email, role_id } = req.body;
  console.log(req.body);
  try {
    const result = await createUser(username, password, email, role_id);
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        status: 200,
      });
    }
  } catch (err) {
    console.log("fail to create a user");
  }
};

module.exports = { createUserController };
