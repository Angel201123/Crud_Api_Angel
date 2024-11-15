// Importamos bibliotecas
const express = require('express');
const path = require('path');

// Creación de la instancia
const app = express();
const port = 4000;

// Analizador de JSON
app.use(express.json());

// Array para almacenar usuarios
const usuarios = [];

// Creación de las rutas
/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});*/
// Sirviendo archivo HTML
app.use(express.static(path.join(__dirname)));

// Creación de una ruta POST
app.post('/usuarios', (req, res) => {
    const { id, name, email } = req.body;
    // Agregar elementos
    usuarios.push({ id, name, email });
    res.status(201).json({ mensaje: 'Usuario creado', usuario: { id, name, email } });
});

// Creación de una ruta GET
app.get('/usuarios', (req, res) => {
    res.json(usuarios)
});
//Ruta para o btener usuario
app.get('/usuarios/:id', (req, res)=>{
    const usuario = usuarios.find(u => u.id == req.params.id)
    //Validar objeto
    if(usuario){
        //MOSTRAR
        res.json(usuario)
    }else{
        res.status(404).json({mensaje:"Usuario no se encuentra"})
    }
    
})
app.get('/usuarios/correo/:email', (req, res) => {
    const usuario = usuarios.find(u => u.email === req.params.email);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ mensaje: "Usuario no encontrado con ese correo" });
    }
});

app.put('/usuarios/:id',(req,res)=>{
    const {name, email} = req.body
    const usuario = usuarios.find(u => u.id == req.params.id)
    if(usuario){
        usuario.name = name || usuario.name;
        usuario.email = email || usuario.email;
        res.json({mensaje: "Usuario actualizado"})
    }else{
        res.status(404).json({mensaje:"Usuario no encontrado"})
    }
})

app.delete('/usuarios/:id',(req, res)=>{
const index = usuarios.findIndex(u => u.id == req.params.id);
if(index !== -1){
    const usuarioEliminado = usuarios.splice(index,1);
    res.json({mensaje:"Usuario eliminado", usuario:usuarioEliminado});
}else{
    res.status(404).json({mensaje: "Usuario no encontrado"})
}
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);

})