import {Schema, model} from "mongoose"
import bcrypt from "bcryptjs"

const newUser = new Schema({
    username: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    active: {type: Boolean, default: true}
})

newUser.methods.enPassword = async (password) => {
    const genSalts = await bcrypt.genSalt()
    return bcrypt.hash(password, genSalts)
}

newUser.methods.desPassword = function(password){
    return bcrypt.compare(password, this.password)
}

export const User = model("User", newUser)
