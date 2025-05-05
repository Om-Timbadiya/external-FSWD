const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserProfileSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Invalid email format"]
    },
    secureKey: {
        type: String,
        required: true,
        minlength: 6
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    accessLevel: {
        type: String,
        enum: ['standard', 'administrator'],
        default: 'standard'
    }
}, {
    timestamps: true
});

const defaultAdmin = {
    fullName: 'Alex Thompson',
    contactEmail: 'alex@college.edu',
    secureKey: 'securePass123',
    accessLevel: 'administrator'
};

UserProfileSchema.statics.initializeDefaultAdmin = async function() {
    try {
        const existingAdmin = await this.findOne({ contactEmail: defaultAdmin.contactEmail });
        if (!existingAdmin) {
            const encryptionSalt = await bcrypt.genSalt(12);
            const encryptedKey = await bcrypt.hash(defaultAdmin.secureKey, encryptionSalt);
            await this.create({
                ...defaultAdmin,
                secureKey: encryptedKey
            });
            console.log('Default administrator profile created');
        }
    } catch (error) {
        console.error('Profile creation error:', error);
    }
};


UserProfileSchema.pre('save', async function(next) {
    if (!this.isModified('secureKey')) return next();
    this.secureKey = await bcrypt.hash(this.secureKey, 12);
    next();
});
UserProfileSchema.methods.verifySecureKey = async function(inputKey) {
    return await bcrypt.compare(inputKey, this.secureKey);
};

module.exports = mongoose.model('UserProfile', UserProfileSchema); 