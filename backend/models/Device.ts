import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    macAddress: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    // Nuevo campo para relacionar el dispositivo al usuario
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Device = mongoose.model('Device', DeviceSchema);
export default Device;
