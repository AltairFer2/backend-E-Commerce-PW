const express = require('express');
const router = express.Router();

// Ruta de ejemplo
router.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

module.exports = router;
