const db = require("../database/db");
const readXlsxFile = require("read-excel-file/node");
const path = require("path");


class alunosRepository {
    constructor() {
        this.db = db;
    }

/**
  * Registra alunos no banco de dados
  * @param {*} data dados do aluno
  * @returns mensagem referente ao resultado obtido
  */
  record(data) {
    return new Promise((resolve, reject) => {
      this.db.query(
        "SELECT * FROM alunos WHERE rm=?",
        [data.rm],
        async (error, response) => {
          if (error) return reject(new Error(error));
          try {
            if (response[0]) {
              return resolve({
                error: `Aluno já registrado!`,
                code: 203,
              });
            } else {
              this.db.query(
                `INSERT INTO alunos (rm, nome, genero, data_nascimento, curso, periodo, tipo_sanguineo, data_cadastro) VALUES(?,?,?,?,?,?,?,NOW())`,
                [data.rm, data.nome, data.genero, data.data_nascimento, data.curso, data.periodo, data.tipo_sanguineo],
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
 * Retorna todos os alunos , ou o especificado pelo rm, no banco de dados
 * @param {*} rm RM do aluno específico, null para retornar todos
 * @returns mensagem referente ao resultado obtido
 */
list(id) {
    return new Promise(async (resolve, reject) => {
      var query = id ? `WHERE alunos.id = ${id}` : ``;
      
      try {
        this.db.query(
          `SELECT alunos.id AS id_aluno, alunos.nome AS aluno, alunos.rm as rm,
          date_format(alunos.data_cadastro, "%d/%m/%Y") as data_cadastro, 
          date_format(alunos.data_nascimento, "%Y-%m-%d") as data_nascimento,
          alunos.genero as genero, alunos.curso as curso, alunos.periodo as periodo, alunos.tipo_sanguineo as tipo_sanguineo
          FROM alunos 
          ${query}
          ORDER BY alunos.nome`,
          [],
          async (error, alunos) => {
            if (error) return reject(new Error(error));
            return resolve({ alunos: alunos });
          }
        );
      } catch (error) {
        return reject(new Error(error));
      }
    });
    }


    /**
   * Deleta alunos do banco.
   * @param {*} rm RM do aluno
   * @returns mensagem referente ao resultado obtido
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `SELECT * FROM fiecdev_aluno_saudavel.alunos WHERE alunos.id=?`,
        [id],
        async (error, response) => {
          if (error) return reject(new Error(error));
          try {
            if (response[0] == null) {
              return resolve({
                error: `Aluno não existe.`,
                code: 203,
              });
            } else {
              this.db.query(
                "DELETE FROM fiecdev_aluno_saudavel.alunos WHERE alunos.id=?",
                [id],
                async (error, response) => {
                  if (error) return reject(new Error(error));
                  return resolve({
                    success: `Aluno deletado.`,
                  })
              });
            }
          } catch (error) {
            return reject(new Error(error));
          }
        })
      })
    }


    /**
   * Atualiza dados do aluno especificado.
   * @param {*} rm RM do aluno
   * @param {*} data dados do aluno
   * @returns mensagem referente ao resultado obtido
   */
  update(rm, data) {
      return new Promise(async (resolve, reject) => {
        try {
          this.db.query(
            "SELECT * FROM alunos WHERE rm=?",
            [rm],
            async (error, user) => {
              if (error) return reject(new Error(error));
              if (user[0] == undefined)
                return resolve({ error: `Aluno inexistente!` });
              try {
                this.db.query(
                  `UPDATE usuarios set nome=?, genero=?, data_nascimento=?, curso=?, periodo=?, tipo_sanguineo=?, where rm=?`,
                  [data.nome, data.genero, data.data_nascimento, data.curso, data.periodo, data.tipo_sanguineo],
                  (error, response) => {
                    if (error) throw error;
                    return resolve({
                      success: `Dados Atualizados`,
                    });
                  }
                );
              } catch (error) {
                return reject(new Error(error));
            }
          })
      } catch (error) {
        return reject(new Error(error));
      }
    })
  
    }
}

module.exports = alunosRepository;