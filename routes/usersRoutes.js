const express = require('express')
const route = express.Router ()
let usuarios= require ('../BBDD/userList.js')

//GET ALL
route.get('/', (req, res)=> res.json (usuarios))

//GET BY NAME
route.get('/:nombre', (req, res)=>{
    const name = req.params.nombre
    const user = usuarios.find (usuario => usuario.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())

    if(!user){
        res.status(404).json ({mensaje:`El usuario ${name} no existe`})
    }else {
        res.json(user)
    }

})

// CREATE - POST : Crear usuario 
route.post('/', (req, res)=>{
    const nuevoUsuario = {
        id:usuarios[usuarios.length - 1].id +1 ,
        nombre: req.body.nombre,
        edad:req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(nuevoUsuario)
    res.redirect('/usuarios')
})

//PUT: Update 
route.put ("/:nombre", (req,res)=>{
    const name = req.params.nombre
    const user= usuarios.findIndex(usuarios=> usuario.nombre.toLocaleLowerCase() === name.toLocaleLowerCase())
    if (!user=== -1){
        res.status(404).json({mensaje:`El usuario ${name} no existe`})
    }else {
        usuarios[user].nombre = req.body.nombre
        usuarios[user].edad = req.body.edad
        usuarios[user].lugarProcedencia = req.body.lugarProcedencia
    }
    res.json(usuarios[user])
})


//DELETE

route.delete("/:nombre", (req, ress)=>{
    const name = req.params.nombre
    const user = usuarios.some(usuario.usuario.nombre.toLocaleLowerCase()===name.toLocaleLowerCase())
    if (!user) {
     res.status(404).json({mensaje:`El usuario ${name} no existe`})
    }else {
        usuarios= usuarios.filter(usuario=> usuario.nombre.toLocaleLowerCase() !== name.toLocaleLowerCase())
        res.json(mensaje:`El usuario ${name} ha sido eliminado`)
    }
})
module.exports = route