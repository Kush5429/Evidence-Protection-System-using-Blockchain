const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["User", "Officer", "Super Officer"],
        default:"User",
    },
    department: {
        type: String,
        default: "",
    },
    rank: {
        type: String,
        default: "",
    },
    batchNumber: {
        type: String,
        default: "",
    },
});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash
    }
    next();
});

userSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compareSync(password, this.password)
    return result;
};
module.exports = mongoose.model('User', userSchema);