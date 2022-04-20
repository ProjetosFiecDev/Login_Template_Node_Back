const Coletas = require('../infra/repository/coletas.repository');
const coletas = new Coletas();

class coletasController {

    list() {
        return function (req, res) {
    
          const { id } = req.params;
          console.log(id)
    
          coletas.list(id).then((response) => {
              if (response.error) res.status(response.code).send({ error: response.error });
              else return res.status(200).send(response);
          }).catch((error) => {
              throw new Error(error);
          })
        }
      }    

    LerXLSXs() {
        return function (req, res) {
    
          const file = req.file;
          console.log(file);
          coletas.LerXLSXs(file).then((response) => {
            if (response.error) return res.status(response.code).send({ error: response.error });
            else return res.status(200).json(response);
          }).catch((error) => {
            console.log(error);
            return res
            .status(400)
            .send({error: `Não é possível ler a planília.`})
          })
        }
      }
}

module.exports = coletasController;