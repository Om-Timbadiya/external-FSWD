const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    activityTitle: {
        type: String,
        required: true,
        trim: true
    },
    activityDetails: {
        type: String,
        required: true
    },
    scheduledDateTime: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    activityType: {
        type: String,
        required: true,
        enum: ["Educational", "Entertainment", "Athletic", "Professional", "Miscellaneous"]
    },
    mediaUrl: {
        type: String,
        default: ''
    },
    coordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
        required: true
    },
    currentStatus: {
        type: String,
        enum: ['scheduled', 'in-progress', 'concluded'],
        default: 'scheduled'
    },
    creationTimestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


const sampleActivities = [
    {
        activityTitle: 'Innovation Summit 2024',
        activityDetails: 'A comprehensive gathering featuring technological innovations, expert panels, and interactive workshops.',
        scheduledDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        venue: 'Innovation Center',
        activityType: 'Educational',
        currentStatus: 'scheduled'
    },
    {
        activityTitle: 'Global Cultural Showcase',
        activityDetails: 'Celebrate diversity through cultural performances, international cuisine, and traditional exhibitions.',
        scheduledDateTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        venue: 'Cultural Pavilion',
        activityType: 'Entertainment',
        currentStatus: 'scheduled'
    },
    {
        activityTitle: 'Inter-Collegiate Championship',
        activityDetails: 'Annual sports championship featuring multiple disciplines and competitive events.',
        scheduledDateTime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        venue: 'Sports Arena',
        activityType: 'Athletic',
        currentStatus: 'scheduled'
    }
];

ActivitySchema.statics.initializeSampleActivities = async function(coordinatorId) {
    try {
        for (const activity of sampleActivities) {
            const existingActivity = await this.findOne({ activityTitle: activity.activityTitle });
            if (!existingActivity) {
                await this.create({
                    ...activity,
                    coordinator: coordinatorId
                });
            }
        }
        console.log('Sample activities initialized successfully');
    } catch (error) {
        console.error('Activity initialization error:', error);
    }
};

ActivitySchema.index({ activityTitle: 'text', activityDetails: 'text' });

module.exports = mongoose.model('Activity', ActivitySchema); 