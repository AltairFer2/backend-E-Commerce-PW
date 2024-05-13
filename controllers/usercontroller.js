// controllers/userController.js
const User = require('../models/User');

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

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
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
