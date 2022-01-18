const crypto = require('crypto');
require('dotenv').config({path:__dirname+'/./../../../.env'});

module.exports = {

    /**
     * Criptografa um valor recebido
     * @param {*} value valor a ser criptografado
     * @returns o a valor criptografado com o 'iv' ex: iv:value_crypted
     */
    async encrypt(value) {
        try {
            //gera um chave(iv) para a criptografia 
            const iv = Buffer.from(crypto.randomBytes(16));
            //cria o cifrador, OBRIGATORIO( algoritimo , segredo , iv)
            const cipher = crypto.createCipheriv(process.env.ALGORITHM, Buffer.from(process.env.SECRET), iv);
            //criptografa o valor 
            let encrypted = cipher.update(value);
            encrypted = Buffer.concat([encrypted, cipher.final()])
            //retorna o valor criptografado com o iv convertidos para 'hex'
            return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
        } catch (error) { throw error }

    },

    /**
     * Descriptografa um valor recebido
     * @param {*} crypted valor criptografado
     * @returns o valor descriptografado
     */
    async decrypt(crypted) {
        try {
            //separa a senha criptografada do 'iv'
            const [iv, encrypted] = crypted.split(':');
            //Desconverte o iv de hex
            const ivBuffer = Buffer.from(iv, 'hex');
            //cria o cifrador, OBRIGATORIO( algoritimo , segredo , iv)
            const decipher = crypto.createDecipheriv(process.env.ALGORITHM, Buffer.from(process.env.SECRET), ivBuffer);
            //descriptografa o valor 
            let value = decipher.update(Buffer.from(encrypted, 'hex'));
            value = Buffer.concat([value, decipher.final()])
            // retorna o valor descriptografado
            return value.toString();
        } catch (error) { throw error }
    },

    /**
     * Gera uma hash de um valor
     * @param {*} value valor a ser gerado a hash
     * @returns hash do valor
     */
    async generateHash(value) {
        try {
            return new Promise((resolve, reject) => {
                const salt = crypto.randomBytes(32).toString('hex');
                crypto.scrypt(value, salt, 256, (error, encrypted) => {
                    resolve(`${salt}:${encrypted.toString('hex')}`);
                });
            });
        } catch (error) { throw error }
    },

    /**
     * Verifica se a hash corresponde ao valor recebido
     * @param {*} value valor recebido
     * @param {*} encrypted hash a ser comparada
     * @returns true/false conforme o resultado
     */
    async checkHash(value, encrypted) {
        try {
            return new Promise((resolve, reject) => {
                const [salt, hash] = encrypted.split(':');
                crypto.scrypt(value, salt, 256, (error, encrypted) => {
                    if (hash == encrypted.toString('hex')) resolve(true);
                    resolve(false);
                });
            });
        } catch (error) { throw error }
    }
}