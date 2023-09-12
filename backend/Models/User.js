const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Corrected spelling for bcrypt

const userSchema = new mongoose.Schema({
    Fullname: {
        required: true,
        type: String
    },
    Email: {
        required: true,
        type: String,
    },
    Password: {
        required: true,
        type: String,
        select:false
    },
    ConfirmPassword: {
        required: true,
        type: String,
        validate: {
            validator: function(confirmPassword) {
                return this.Password === confirmPassword; // Compare passwords for validation
            },
            message: "Passwords do not match"
        }
    },
    Role:{
        type:String
    },

    imageURL:{
        type:String,
        default:"https://storage.cloud.google.com/tourbooking/myimage.png"

    }  
});

userSchema.pre('save', async function(next) {
    this.ConfirmPassword = undefined; // Changed to 'undefined' instead of 'null'
    this.Password = await bcrypt.hash(this.Password, 10); // Use 'await' to handle async bcrypt.hash()
    this.Role="user"
    next();
});


userSchema.methods.comparePassword=async(userPassword,storedPassword)=>
{
    const match=await bcrypt.compare(userPassword,storedPassword)
    return match
}

const User = mongoose.model('Users', userSchema);

module.exports = User;
