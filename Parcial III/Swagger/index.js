const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const mysql = require('mysql2/promise');
const { SwaggerTheme } = require('swagger-themes');
const redoc = require('redoc-express');

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//ReadFileSync - Lectura síncrona, el código no puede seguir ejecutandose hasta que no se termine de leer la opción del archivo
const def = fs.readFileSync(path.join(__dirname,"./swagger.json"), {encoding: "utf8", flag: "r"});
const read = fs.readFileSync(path.join(__dirname,"./README.MD"), {encoding: "utf8", flag: "r"});
const defObj = JSON.parse(def);
defObj.info.description = read;
console.log(defObj.info.description)
const swaggerOptions = {
    definition : defObj,
    apis : [path.join(__dirname,"./index.js")]
}
const Theme = new SwaggerTheme('v3');
const option_v1 = {
    explorer: true,
    customCss: Theme.getBuffer("dark")
}
const option_v2 = {
    explorer: true,
    customCss: Theme.getBuffer("monokai")
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);                       //Definicion de mi API
app.use("/api-docs-v1",swaggerUI.serve,swaggerUI.setup(swaggerDocs, option_v1));
app.use("/api-docs-v2",swaggerUI.serve,swaggerUI.setup(swaggerDocs, option_v2));
app.use("/api-docs-json", (req, res) => {
    res.json(swaggerDocs);
})
app.get('/api-docs-redoc', redoc({
    title: 'API Docs Json',
    specUrl: '/api-docs-json',
    nonce: '', // <= it is optional,we can omit this key and value
    // we are now start supporting the redocOptions object
    // you can omit the options object if you don't need it
    // https://redocly.com/docs/api-reference-docs/configuration/functionality/
    redocOptions: {
        theme: {
            colors: {
                primary: {
                main: '#6EC5AB'
                }
            },
            typography: {
                fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
                fontSize: '15px',
                lineHeight: '1.5',
                code: {
                code: '#87E8C7',
                backgroundColor: '#4D4D4E'
                }
            },
            menu: {
                backgroundColor: '#ffffff'
            }
        }
    }
}));
/**
 * @swagger
 * tags: 
 *     name: Estudiantes
 *     description: Son estudiantes en una base de datos
 */

/**
 * @swagger
 * /estudiante/agregar:
 *   post:
 *     summary: Inserta un nuevo alumno
 *     description: Ruta con el método POST para insertar un nuevo estudiante para ingresarlo en la bd
 *     tags: 
 *       - Estudiantes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                apellido_paterno:
 *                  type: string
 *                apellido_materno:
 *                  type: string
 *                semestre:
 *                  type: integer
 *   response:
 *     200:
 *       description: "Estudiante Insertado Correctamente"
 *     400:
 *       description: "Estudiante No Insertado"
 *     500:
 *       description: "Error de conexión"
 */

app.post("/estudiante/agregar", async (req, res) => {
    try{
        console.log(req.body);
        let sent = `Insert Into Estudiante(nombre, apellido_paterno, apellido_materno, semestre) Values('${req.body.nombre}', '${req.body.apellido_paterno}', '${req.body.apellido_materno}', ${req.body.semestre} )`;
        const conn = await mysql.createConnection({ host:'localhost', user: 'root', password: 'root', database: 'test' });
        console.log(sent);
        const [rows, fields] = await conn.query(sent);
        if (rows.affectedRows != 0){
            res.status(200).send({ mensaje : "Estudiante Insertado Correctamente"});
            //res.json(req.body)
        }
        else{
            res.status(400).send({mensaje : "Estudiante No Insertado"});
        }
    }
    catch{
        res.status(500).json({mensaje : "Error de conexión"});
    }
});

/**
 * @swagger
 * /estudiante:
 *   get:
 *     summary: Obtiene todos los estudiantes de la base de datos
 *     description: Obtiene un listado de todos los estudiantes agregados en la base de datos
 *     tags: 
 *       - Estudiantes
 *     responses:
 *       200:
 *         description: Trae un json con la información de todos los estudiantes
 *       404:
 *         description: "No se encuentran estudiantes en la base de datos."
 *       500:
 *         description: "Error de conexión"
 */

app.get("/estudiante", async (req, res) => {           //CONSULTA GENERAL
    try 
    {
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: "test" });
        const [rows, fields] = await conn.query('SELECT * FROM Estudiante');

        //res.json(rows);
        if (rows.length==0){
            res.status(404).json({mensaje : 'No se encuentran estudiantes en la base de datos.'});
        } else {
            res.status(200).json(rows);
        }   
    }
    catch{
        res.status(500).json({mensaje : "Error de conexión"});
    }
});
/**
 * @swagger
 * /estudiante/:id:
 *   get:
 *     summary: Obtiene un estudiante específico
 *     description: Obtiene la información de un estudiante específico por medio de su ID obtenido del parametro de la URL
 *     tags: 
 *       - Estudiantes
 *     responses:
 *       200:
 *         description: Json con la información del estudiante consultado
 *       404:
 *         description: "El estudiante no existe"
 */
app.get("/estudiante/:id", async (req, res) => {       //CONSULTA ESPECÍFICA
    try {
        console.log(req.params.id);
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: "test" });
        const [rows, fields] = await conn.query('SELECT * FROM Estudiante WHERE id_estudiante = '+ req.params.id);
        if (rows.length==0){
            res.status(404).json({mensaje : 'El estudiante no existe'});
        } else {
            res.status(200).json(rows);
        }   
    }
    catch{
        res.status(500).json({mensaje : 'Error de conexión'});
    }
});

/**
 * @swagger
 * /estudiante/eliminar?id_estudiante=id:
 *   delete:
 *     summary: Elimina al estudiante de la base de datos
 *     description: Ruta con el método DELETE para eliminar a un estudiante de la base de datos
 *     tags: 
 *       - Estudiantes
 *   response:
 *     200:
 *       description: "Estudiante Eliminado Exitosamente."
 *     400:
 *       description: "Registro No Eliminado, Revise el parametro ingresado."
 *     500:
 *       description: "Error de conexión"
 */

app.delete("/estudiante/eliminar", async (req, res) => {        //BAJA
    try {
        console.log(req.query);
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'root', database: 'test' });
        const [rows, fields] = await conn.query('DELETE FROM Estudiante WHERE id_estudiante = '+ req.query.id_estudiante);
        if (rows.affectedRows != 0){
            res.status(200).json({mensaje: "Estudiante Eliminado Exitosamente."});
        }
        else{
            res.status(400).json({mensaje: "Registro No Eliminado, Revise el parametro ingresado."});
        }
    }
    catch{
        res.status(500).json({mensaje : 'Error de conexión'});
    }
});

/**
 * @swagger
 * /estudiante/actualizar?id_estudiante=id:
 *   patch:
 *     summary: Actualiza la información de un alumno
 *     description: Ruta con el método PATCH para actualizar un nuevo estudiante para ingresarlo en la bd
 *     tags: 
 *       - Estudiantes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre:
 *                  type: string
 *                apellido_paterno:
 *                  type: string
 *                apellido_materno:
 *                  type: string
 *                semestre:
 *                  type: integer
 *   response:
 *     200:
 *       description: "Estudiante Actualizado Correctamente"
 *     400:
 *       description: "Estudiante No Actualizado"
 *     500:
 *       description: "Error de conexión"
 */

app.patch("/estudiante/actualizar", async (req, res) => {
    try{
        const conn = await mysql.createConnection({ host:'localhost', user: 'root', password: 'root', database: 'test' })
        console.log(req.query)
        
        let objeto = req.body
        let campos = Object.keys(objeto);
        console.log(campos[0])
        let sentencia = "UPDATE Estudiante SET ";
        let columnas = "";
        let condicion = `where id_estudiante = ${req.query.id_estudiante}`;
        campos.forEach(columna => {
            if (Number.isInteger(objeto[columna])){
                columnas += `${columna} = ${objeto[columna]} ,`;
            }
            else {
                columnas += `${columna} = '${objeto[columna]}' ,`;
            }
        });
        let correccion = columnas.split(',').join(',').slice(0, columnas.length - 1);
        sentencia += correccion + condicion;
        console.log(sentencia);
        const [rows, fields] = await conn.query(sentencia);
        if (rows.affectedRows != 0){
            res.status(200).json({ mensaje : "Estudiante Actualizado Correctamente"});
        }
        else{
            res.status(400).json({mensaje : "Estudiante No Actualizado"});
        }
    }
    catch{
        res.status(500).json({mensaje : "Error de conexión"});
    }
});

app.listen(8081, (req, res) => {
    console.log("Servidor Express escuchando");
});