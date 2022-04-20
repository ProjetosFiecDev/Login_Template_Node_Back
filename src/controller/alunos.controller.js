const Alunos = require("../infra/repository/alunos.repository");
const alunos = new Alunos();

class alunosController {

    /**
     * Registra aluno no banco.
     * @returns mensagem referente ao resultado obtido
     */
  record() {
      return function (req, res) {
        var { data } = req.body;
  
        alunos
          .record(data)
          .then((response) => {
            if (response.error)
              return res.status(response.code).send({ error: response.error });
            else return res.status(200).json(response);
          })
          .catch((error) => {
            return res
              .status(400)
              .send({ error: `Não foi possível registrar aluno` });
          });
      };
    }

    /**
     * Lista todos os alunos ou aluno específico por RM.
     * @returns mensagem referente ao resultado obtido
     */
  list() {
    return function (req, res) {

      const { id } = req.params;
      console.log(id)

      alunos.list(id).then((response) => {
          if (response.error) res.status(response.code).send({ error: response.error });
          else return res.status(200).send(response);
      }).catch((error) => {
          throw new Error(error);
      })
    }
  }

    /**
     * Deleta aluno por RM.
     * @returns mensagem referente ao resultado obtido
     */
  delete() {
      return function (req, res) {

      const { id } = req.params;

      alunos.delete(id).then((response) => {
        if (response.error) res.status(response.code).send({ error: response.error });
        else return res.status(200).send(response);
      }).catch((error) => {
        throw new Error(error);
        })
      }
    }

    /**
   * Autaliza dados do aluno por RM.
   * @returns mensagem referente ao resultado obtido
   */
  update() {
    return function (req, res) {

      const { rm } = req.params;
      const { data } = req.body;

      alunos
        .update(rm, data)
        .then((response) => {
          if (response.error)
            return res.status(response.code).send({ error: response.error });
          else return res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          return res
            .status(400)
            .send({ error: `Não foi possivel atualizar as informações` });
        });
    };
  }
}

module.exports = alunosController;