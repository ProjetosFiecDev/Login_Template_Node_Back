const jwt = require('jsonwebtoken');
require('dotenv').config({path:__dirname+'/./../../../.env'});

module.exports = {
    async genereteToken(donor) {
        var nome = donor.nome.split(" ");
        return jwt.sign({ auth: donor.auth, cpf: donor.cpf,  nome: nome[0], email: donor.email, admin: donor.admin }, `${process.env.JWT_SECRET}`, { expiresIn: "14d" });
    }
}