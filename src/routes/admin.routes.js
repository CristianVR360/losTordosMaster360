const { Router } = require('express');
const { updateLot } = require('../controllers/admin.controller');
const {
  authenticateJWT,
  authorizeAdmin,
} = require('../middlewares/jwtValidator');

const router = Router();

router.put('/', authenticateJWT, authorizeAdmin, updateLot);

module.exports = router;
