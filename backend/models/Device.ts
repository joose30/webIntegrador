import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    macAddress: {
        type: String,
        required: true,
        unique: true,  // Evita que haya dispositivos duplicados con la misma MAC
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Device = mongoose.model('Device', DeviceSchema);
export default Device;
