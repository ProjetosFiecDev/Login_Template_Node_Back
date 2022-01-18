const { encrypt, decrypt, generateHash, checkHash } = require('../config/auth/cryptography');

module.exports = {
    /**
     * Criptografa os dados do usuário
     * @param {*} data dados do usuário
     * @returns os dados criptografados
     */
    async encryptUser(data) {
        const cryptedUser = {
            id: data.id,
            email: data.email,
            nome: data.nome,
            senha: data.senha ? await generateHash(data.senha) : null,
        }
        return cryptedUser
    },

    /**
     * Descriptografa os dados de um usuário
     * @param {*} data dados criptografados do usuário
     * @returns os dados descriptografados
     */
    async decryptUser(data) {
        const decryptedUser = {
            id: data.id,
            email: data.email,
            nome: data.nome,
        }
        return decryptedUser
    }
}
