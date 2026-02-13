const User = require("./user.model");
const mongoose = require("mongoose");

// const getUserById = async(id) =>{
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         throw new Error("INVALID_USER_ID");
//     }
//     const user = await User.findById(id).select("-password");
//     if(!user){
//         throw new Error("USER_NOT_FOUND");
//     }
//     return user;
// }

const getUserById = async (id, populate = false) => {
    let query = User.findById(id).select("-password"); // exclude password
    if (populate) {
        query = query
            .populate("followers", "username email")
            .populate("following", "username email");
    }
    const user = await query;
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
};

const updateUserById = async(id, data) =>{
    const user = await User.findByIdAndUpdate(id, {$set: data},{new: true}).select("-password");

    if(!user){
        throw new Error("USER_NOT_FOUND");
    }
    return user;
}


const deleteUSerById = async(id) =>{
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new Error("USER_NT_FOUND");
    }
};

module.exports = {
    getUserById,
    updateUserById,
    deleteUSerById
};