const { Router } = require("express");
const { check } = require("express-validator");
const { validarArchivoSubir } = require("../middlewares/validar-archivo");
const {
  cargarArchivos,
  actualizarImagen,
} = require("../controllers/uploads.controller");
const { validateResult } = require("../helpers/validatehelper");
const { coleccionesPermitidas } = require("../helpers/db-validaciones");

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivos);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validateResult,
  ],
  actualizarImagen
);

module.exports = router;
