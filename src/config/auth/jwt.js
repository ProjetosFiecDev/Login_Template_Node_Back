const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/./../../../.env'});

module.exports = {
    async genereteToken(usuario) {
        return jwt.sign({ auth: usuario.auth, nome: usuario.nome, email: usuario.email }, `${process.env.JWT_SECRET}`, { expiresIn: "14d" });
    }
}