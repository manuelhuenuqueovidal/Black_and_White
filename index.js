//Importación de módulos.
import express from "express";
import Jimp from "jimp";
import { v4 as uuidv4 } from 'uuid';

//Servidor.
const app = express();
const port = 3000;

//Carpeta pública.
app.use(express.static("public"));

//Ruta por defecto.
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

//Ruta de imagen procesada por Jimp.
app.get("/jimp", async (req, res) => {
    try {

        //Constante de captura de imput HTML.
        const { url } = req.query;

        //Prueba de captura de imagen. 
        console.log("Sep, la captura de imagen está ok, mira 👌:", url); 
        const imagen = await Jimp.read(url);

        //Aplicando requrimientos de devolución de imagen.
        await imagen
            .resize(350, Jimp.AUTO)
            imagen.greyscale();            
        
        //Nombre único.
        const nombreUnico = `${uuidv4().slice(0, 6)}.jpeg`;

        //Ruta para guardar imagen.
        await imagen.writeAsync(`public/assets/img${nombreUnico}`);
       
        //Se devuelve imagen procesada. 
        res.send(`<img src="/assets/img${nombreUnico}" alt="Imagen procesada">`);

    } catch (error) {
        //Manejo de errores.
        console.error("Error al procesar la imagen:", error);
        res.status(500).send("Error al procesar la imagen");
    }
});

//Verificación de servidor arriba.
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
