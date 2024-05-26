const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, middleName, email, phone, role, address } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            firstName, lastName, middleName, email, phone, role, address
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Registrar usuario
exports.createUser = async (req, res) => {
    const { firstName, lastName, middleName, email, password, phone, role, address } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = new User({
            firstName,
            lastName,
            middleName,
            email,
            password,
            phone,
            role,
            address
        });

        await user.save();
        console.log('Contraseña encriptada al crear el usuario:', user.password);

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error de Server');
    }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(400).json({ msg: 'Credenciales Inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales Inválidas' });
        }

        const payload = {
            user: {
                id: user.id,
                isAdmin: user.role === 'admin'
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, userId: user.id });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error de Server');
    }
};