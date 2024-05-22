const express = require('express');
const { createUser, getUser, updateUser, deleteUser, loginUser } = require('../controllers/usercontroller');
const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
