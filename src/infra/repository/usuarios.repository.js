const db = require("../database/db");
const { encryptUser, decryptUser } = require("../../utils/cryptUser");
const { genereteToken } = require("../../config/auth/jwt");
const { checkHash, generateHash } = require("../../config/auth/cryptography");
const crypto = require("crypto");
const nodemailer = require('nodemailer');

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
              const token = await genereteToken(cryptedUser);
              this.db.query(
                `INSERT INTO usuarios (email, senha, nome) VALUES(?,?,?)`,
                [cryptedUser.email, cryptedUser.senha, cryptedUser.nome],
                (error, response) => {
                  if (error) throw error;
                  return resolve({
                    token: token,
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

  recover(data) {
    return new Promise(async (resolve, reject) => {
      try {
        this.db.query(
          "SELECT * FROM usuarios WHERE email=?",
          [data.email],
          async (error, user) => {
            if (error) return reject(new Error(error));
            if (user[0] == undefined)
              return resolve({ error: `Email inexistente!` });
            try {
              const newPassword = crypto.randomBytes(5).toString("HEX");
              if (error) return reject(new Error(error));
              else {
                var transporte = nodemailer.createTransport({
                  service: "smtp",
                  host: "mail.fiecdev.com.br",
                  secure: true,
                  port: 465,
                  auth: {
                    user: process.env.NODEMAILER_EMAIL_SENDER,
                    pass: process.env.NODEMAILER_EMAIL_PASS,
                  },
                });
                var layoutEmail = {
                  from: process.env.NODEMAILER_EMAIL_SENDER,
                  to: user[0].email,
                  subject: "ACI Bike - Recuperar Senha",
                  html: `<h1>Sua nova senha de acesso é: </h1><strong>${newPassword}</strong>`,
                };
                transporte
                  .sendMail(layoutEmail)
                  .then(async () => {
                    if (error) return reject(new Error(error));
                    try {
                      const senha = await generateHash(newPassword);
                      this.db.query(
                        `UPDATE usuarios set senha=? where email=?`,
                        [senha, data.email],
                        (error, response) => {
                          if (error) throw error;
                          return resolve({
                            success: `Sua nova senha foi enviada para seu email`,
                          });
                        }
                      );
                    } catch (error) {
                      return reject(new Error(error));
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            } catch (error) {
              return reject(new Error(error));
            }
          }
        );
      } catch (error) {
        return reject(new Error(error));
      }
    });
  }
}

module.exports = usuariosRepository;
