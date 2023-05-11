const { response } = require("express");
const path = require("path");
const { subirArchivo } = require("../helpers/subir-archivo");
const Usuario = require("../models/usuario.model");

const cargarArchivos = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos que subir." });
    return;
  }

  //imagenes
  try {
    const pathCompleto = await subirArchivo(req.files, undefined, "imgs");

    res.json({
      path: pathCompleto,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `no existe un usuario con el id ${id}`,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `no existe un usuario con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "se me olvido validar esto" });
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json({
    id,
    coleccion,
  });
};

module.exports = { cargarArchivos, actualizarImagen };
