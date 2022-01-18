const db = require("../database/db");
const { encryptUser, decryptUser } = require("../../utils/cryptUser");
const { genereteToken } = require('../../config/auth/jwt');
const { checkHash } = require('../../config/auth/cryptography');
const crypto = require('crypto');

class usuariosRepository {
  constructor() {
    this.db = db;
  }

  /**
   * Registra os dados de um usuário
   * @param {*} data dados do usuário
   * @returns mensagem referente ao resultado obtido
   */
  register(data) {
    return new Promise((resolve, reject) => {
      this.db.query(
        "SELECT * FROM usuarios WHERE email=?",
        [data.email],
        async (error, response) => {
          if (error) return reject(new Error(error));
          try {
            if (response[0]) {
              return resolve({
                error: `Usuário já cadastrado!`,
                code: 203,
              });
            } else {
              const cryptedUser = await encryptUser(data);
              this.db.query(
                `INSERT INTO usuarios (email, senha, nome) VALUES(?,?,?)`,
                [cryptedUser.email, cryptedUser.senha, cryptedUser.nome],
                (error, response) => {
                  if (error) throw error;
                  return resolve({
                    success: "Usuário cadastrado com sucesso!",
                    id: response.insertId,
                  });
                }
              );
            }
          } catch (error) {
            return reject(new Error(error));
          }
        }
      );
    });
  }

  /**
   * Realiza o login de um usuário
   * @param {*} data dados do usuário
   * @returns mensagem referente ao resultado obtido
   */
  login(data) {
    return new Promise(async (resolve, reject) => {
      this.db.query(
        "SELECT * FROM usuarios WHERE email=?",
        [data.email],
        async (error, response) => {
          if (error) return reject(new Error(error));
          try {
            if (response[0]) {
              if (await checkHash(data.senha, response[0].senha)) {
                const decryptedUser = await decryptUser(response[0]);
                const auth = crypto.randomBytes(128).toString("HEX");
                decryptedUser.auth = auth;
                const token = await genereteToken(decryptedUser);
                this.db.query(
                  "UPDATE usuarios set auth=? WHERE email=?",
                  [auth, data.email],
                  (error, response) => {
                    if (error) return reject(new Error(error));
                    return resolve({
                      token: token,
                      user: {
                        id: decryptedUser.id,
                        nome: decryptedUser.nome,
                        email: decryptedUser.email,
                      },
                    });
                  }
                );
              } else
                return resolve({
                  error: "Credenciais erradas!",
                  code: 203,
                });
            } else
              return resolve({
                error: `Usuário não cadastrado!`,
                code: 203,
              });
          } catch (error) {
              console.log(error);
            return reject(new Error(error));
          }
        }
      );
    });
  }
}

module.exports = usuariosRepository;
