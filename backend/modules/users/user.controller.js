const userService = require("./user.service");

const getMe = async (req, res, next) =>{
    try {
        const user = await userService.getUserById(req.user.id, true);
        res.json(user);
    } catch (error) {
       if(error.message === "USER_NOT_FOUND"){
        return res.status(404).send("User not found");
       } 
       next(error);
    }
}

const getUserById = async(req,res,next) =>{
    try {
        const user = await userService.getUserById(req.params.id, true);
        res.json(user);
    } catch (error) {
        if(error.message === "USER_NOT_FOUND"){
            return res.status(404).send("User not found");
        }
        next(error);
    }
};

const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).send("Access denied");
    }

    const user = await userService.updateUserById(
      req.params.id,
      req.body
    );

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).send("Access denied");
    }

    await userService.deleteUserById(req.params.id);
    res.send("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMe,
  getUserById,
  updateUser,
  deleteUser
};