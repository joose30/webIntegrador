import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

// Especifica el nombre de la colección como "contraseñasPuerta"
const Password = mongoose.model('Password', passwordSchema, 'contraseñasPuerta');

export default Password;