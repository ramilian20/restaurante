const { Router } = require("express");
const { validarJWT } = require("../middlewares/jwt.validator");
const router = Router();

router.get("/", validarJWT, (req, res) => {
  res.render("administracion");
});

module.exports = router;
