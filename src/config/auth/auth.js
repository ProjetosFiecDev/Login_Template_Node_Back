const db = require('../../infra/database/db');
require('dotenv').config({ path: __dirname + '/./../../../.env' });

module.exports.isAuthenticated = (req, res, next) => {
    const token = req.query.auth;
    try {
        db.query(`SELECT * FROM usuarios WHERE auth=?`, [token],
            async (error, usuarios) => {
                // if (error) return reject(new Error(error));
                if (usuarios[0]) {
                    next();
                } else {
                    res.status(401).json({ error: 'Rota bloqueada' });
                }
            });
    } catch {
        var erro = new Error('Não autorizado!');
        erro.status = 401;
        return next(erro);
    }
}

module.exports.isAuthenticatedAdmin = (req, res, next) => {
    try {
        const token = req.query.auth;
        db.query(`SELECT cpf FROM doadores WHERE auth=?`, [token],
            async (error, usuarios) => {

                if (error) return reject(new Error(error));
                if (!usuarios[0]) { res.status(401).json({ error: 'Rota bloqueada' }); }
                else {
                    if (process.env.CPF.split(",").includes(usuarios[0].cpf)) {
                        next();
                    } else {
                        res.status(401).json({ error: 'Rota bloqueada' });
                    }
                }
            });
    } catch {
        var erro = new Error('Não autorizado!');
        erro.status = 401;
        return next(erro);
    }
}