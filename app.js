const express = require("express");
const app = express();
const fs = require('fs');
//const fs = require('fs').promises;
const port = 3000;

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get("/crear", (req, res) => {
    const year = new Date().getFullYear()
    const mes = new Date().getMonth() +1
    const dia = new Date().getDate()
    const fecha = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${year}`

    const { archivo, contenido } = req.query

    fs.writeFile(`${archivo}`,`${fecha} \n ${contenido}`, (error) =>{
        const mensaje = fs.readFile(`${archivo}`, "utf-8",(error,mensaje) =>{
            mensaje
            ? res.send("Archivo ha sido creado con éxito!")
            : res.status(500).send("Algo salio mal")
        })        
    })
});

app.get("/leer", (req, res) =>{
    const { archivo } = req.query
    fs.readFile(archivo, 'utf8', (err, data) => {
        res.send(`<pre>${data}</pre>`)
    })
});

app.get("/renombrar", (req, res) => {   
    const { nombre } = req.query   
    const { nuevoNombre } = req.query   
    fs.rename(nombre, nuevoNombre, (err, data) => {
    res.send(`Archivo ha sido modificado con éxito! ${nombre} renombrado por ${nuevoNombre}`)
    })
});

app.get("/eliminar", (req, res) => {
    const { archivo } = req.query  
    fs.unlink(archivo, (err, data) => {
    res.send(`Archivo ${archivo} eliminado con éxito`)
    })
});

//CON PROMESAS
// app.get("/crear",async(req,res) => {
//     const year = new Date().getFullYear()
//     const mes = new Date().getMonth() +1
//     const dia = new Date().getDate()
//     const fecha = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${year}`
//     const { archivo, contenido } = req.query
    
//     await fs.writeFile(`${archivo}`,`${fecha} \n ${contenido}`)
//     const mensaje = await fs.readFile(`${archivo}`, "utf-8")
//     mensaje
//     ? res.send(`El archivo ${archivo} fue creado con éxito`)
//     : res.status(500).send("Algo salio mal")
// })

// app.get("/leer", async (req, res) => {
//     const { archivo } = req.query
//     try {
//         const data = await fs. readFile(`${archivo}`, `utf-8`)
//         res.send(data)
//     }catch (error){
//         res.status(500).send(error)
//     }
// });

// app.get("/renombrar", async(req,res) => {
//     const { nombre, nuevoNombre } = req.query
//     try{
//         await fs.rename(nombre, nuevoNombre)
//         res.send(`El arvhivo ${nombre} fue renombrado a ${nuevoNombre} exitosamente`)
//     }catch{
//         res.status(500).send("El Archivo consultado no existe")
//     }
// });

// app.get("/eliminar", async(req, res) => {
//     const { archivo } = req.query
//     try{
//         await fs.unlink(archivo)
//         res.send(`El archivo ${archivo} ha sido eliminado exitosamente.`)
//     }catch{
//         res.status(500).send("El Archivo consultado no existe")
//     }
// });