import mongoose from 'mongoose';

const registroSchema = new mongoose.Schema({
    mensaje: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now }
});

const Registro = mongoose.model('Registro', registroSchema);
export default Registro;