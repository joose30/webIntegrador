import express, { Request, Response } from "express";
import mongoose, { Document, Schema } from "mongoose";

// **Conexión a MongoDB Atlas**
const uri = "mongodb+srv://Aldahir:aldahir.05@cluster0.hpmmu.mongodb.net/proyIoT?retryWrites=true&w=majority&appName=Cluster0";

// **Interfaz para el modelo de contraseñas**
interface IPassword extends Document {
  password: string;
  date: Date;
}

// **Esquema para la colección `contraseñasPuerta`**
const PasswordSchema: Schema = new Schema({
  password: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
});

// **Modelo basado en la colección `contraseñasPuerta`**
const PasswordModel = mongoose.model<IPassword>("contraseñasPuerta", PasswordSchema);

// **Configuración de Express**
const app = express();
app.use(express.json()); // Habilitar JSON en Express

// **Conexión a MongoDB Atlas**
mongoose
  .connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB Atlas:", err));

// **Ruta para comparar la contraseña ingresada**
app.post("/compare-password", async (req: Request, res: Response): Promise<void> => {
  console.log("🔹 Solicitud recibida en /compare-password");
  console.log("🔹 Body recibido:", req.body);

  let { password } = req.body;

  if (!password) {
    console.log("❌ Falta la contraseña en la solicitud.");
    res.status(400).send("❌ Falta la contraseña en la solicitud.");
    return;
  }

  password = password.replace(/^["']|["']$/g, '').trim();

  console.log(`🔍 Buscando contraseña en la BD: "${password}"`);

  try {
    // **Ver todas las contraseñas en MongoDB**
    const allPasswords = await PasswordModel.find({}, { password: 1, _id: 0 });
    console.log("🔍 Contraseñas en la base de datos:", allPasswords);

    // **Búsqueda flexible (sin importar mayúsculas/minúsculas)**
    const storedPassword = await PasswordModel.findOne({
      password: { $regex: new RegExp(`^${password}$`, "i") } 
    });

    if (storedPassword) {
      console.log("✅ Contraseña correcta encontrada en la BD.");
      res.send("OK");
    } else {
      console.log("❌ Contraseña incorrecta, no encontrada en la BD.");
      res.send("ERROR");
    }
  } catch (error) {
    console.error("❌ Error en la consulta:", error);
    res.status(500).send("Error en el servidor");
  }
});

// **Ruta para insertar una nueva contraseña en `contraseñasPuerta`**
app.post("/insert-password", async (req: Request, res: Response): Promise<void> => {
  let { password } = req.body;

  if (!password) {
    res.status(400).send("❌ Falta la contraseña en la solicitud.");
    return;
  }

  password = password.replace(/^["']|["']$/g, '').trim();

  try {
    const newPassword = new PasswordModel({ password });
    await newPassword.save();
    console.log("✅ Contraseña insertada correctamente:", password);
    res.send("Contraseña insertada correctamente");
  } catch (error) {
    console.error("❌ Error insertando contraseña:", error);
    res.status(500).send("Error insertando contraseña");
  }
});

// **Ruta de prueba para verificar conexión**
app.get("/test", (req: Request, res: Response): void => {
  res.send("✅ Servidor funcionando correctamente");
});

// **Iniciar el servidor en el puerto 3000**
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
