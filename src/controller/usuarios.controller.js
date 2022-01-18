const Usuarios = require("../infra/repository/usuarios.repository");
const usuarios = new Usuarios();

class usuariosController {
  /**
   * Registra um usuário
   * @returns mensagem referente ao resultado obtido
   */
  register() {
    return function (req, res) {
      var { data } = req.body;

      usuarios
        .register(data)
        .then((response) => {
          if (response.error)
            return res.status(response.code).send({ error: response.error });
          else return res.status(200).json(response);
        })
        .catch((error) => {
          return res
            .status(400)
            .send({ error: `Não foi possível realizar o cadastro!` });
        });
    };
  }

  /**
   * Realiza o login de um usuário
   * @returns mensagem referente ao resultado obtido
   */
  login() {
    return function (req, res) {
      const { data } = req.body;

      usuarios
        .login(data)
        .then((response) => {
          if (response.error)
            return res.status(response.code).send({ error: response.error });
          else return res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
          return res
            .status(400)
            .send({ error: `Não foi possivel realizar o login` });
        });
    };
  }
}

module.exports = usuariosController;
