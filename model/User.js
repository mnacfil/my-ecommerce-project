const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        maxlength: [50, 'First name characters exceed, it should be less than 50'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        maxlength: [100, 'Max length of characters exceed']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    mobilePhone: {
        type: String,
        unique: true,
        required: [true, 'Please provide mobile phone'],
        validate: {
            validator: validator.isMobilePhone,
            message: 'Please provide valid mobile phone'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [8, 'Password must be more than 8 characters'],
        maxlength: [100, 'Maximum characters exceed'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    verificationToken: String,
    verificationDate: Date,
    isVerified: {
        type: Boolean,
        default: false
    },
    passwordToken: String,
    passwordTokenExpiration: Date
}, {
    timestamps: true
});

UserSchema.pre('save', async function() {
    // if if not modifying the password then just return, and dont hash again the pass
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.isPasswordMatch = async function (canditatePassword) {
    return await bcrypt.compare(canditatePassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);