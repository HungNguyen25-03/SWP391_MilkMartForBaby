const {registerUser,loginUser} = require("../services/users.services");

const registerUserController = async (req, res) => {
    const {username, password, email} = req.body;
    
    try {
        const user = await registerUser(username, password, email);
        if (user.success) {
        res.status(200).json({message: user.message, status: 200});
        } else {
        res.status(409).json({message: user.message, status: 409});
        }
    } catch (error) {
        res.status(500).send("Error registering user");
    }
}

const loginUserController = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await loginUser(email, password);
        if (user.success) {
        res.status(200).json({message: user.message, user: user.user, status: 200});
        } else {
        res.status(401).json({message: user.message, status: 401});
        }
    } catch (error) {
        res.status(500).send("Error logging in user");
    }
}

module.exports = {
    registerUserController,
    loginUserController,
};