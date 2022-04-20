const db = require("../database/db");
const readXlsxFile = require("read-excel-file/node");

class coletasRepository {
    constructor() {
        this.db = db;
    }

    list(id) {
        return new Promise(async (resolve, reject) => {
          var query = id ? `WHERE alunos_coleta.id = ${id}` : ``;
          
          try {
            this.db.query(
              `SELECT * FROM alunos_coleta ${query}`,
              [],
              async (error, coletas) => {
                if (error) return reject(new Error(error));
                return resolve({ coletas: coletas });
              }
            );
          } catch (error) {
            return reject(new Error(error));
          }
        });
    }

    LerXLSXs(file) {

    
        return new Promise((resolve, reject) => {
  
            try {
                let filePath = __dirname + "../../../../uploads/" + file.filename;
                readXlsxFile(filePath).then(rows => {
  
                    rows.shift();
                    console.log(rows);
  
                    var codigo = [];
                    var rowsEditado = [];
  
                    rows.forEach((element, index) => {
  
                        if (element[0] != null) {
                            if (!codigo.includes(element[0])) {
                                codigo.push(element[0]);
                                rowsEditado.push(element);
                            }
                        }
                    });
  
                    let length = rowsEditado.length;
  
                    for (let i = 0; i < length; i++) {
  
                        let dados = {
                          "ID" : rowsEditado[i][0],
                          "Data" : rowsEditado[i][1],
                          "RM" : rowsEditado[i][2],
                          "Nome" : rowsEditado[i][3],
                          "Genero" : rowsEditado[i][4],
                          "Data_de_Nascimento:" : rowsEditado[i][5],
                          "Idade" : rowsEditado[i][6],
                          "Curso" : rowsEditado[i][7],
                          "Período:" : rowsEditado[i][8],
                          "Tipo" : rowsEditado[i][9],
                          "PA_Mínima_mmhg" : rowsEditado[i][10],
                          "PA_Máxima_mmhg" : rowsEditado[i][11],
                          "Pressão" : rowsEditado[i][12],
                          "Dextro_mg/l" : rowsEditado[i][13],
                          "DEXTRO" : rowsEditado[i][14],
                          "Peso_kg" : rowsEditado[i][15],
                          "Estatura_metros" : rowsEditado[i][16],
                          "IMC" : rowsEditado[i][17],
                          "Result IMC" : rowsEditado[i][18],
                          "Circ_Abdominal_cm" : rowsEditado[i][19],
                          "Result Circ Ab" : rowsEditado[i][20],
                          "Você_usa_óculos" : rowsEditado[i][21],
                          "Acuidade_Visual_Direita" : rowsEditado[i][22],
                          "Acuidade_Visual_Esquerda" : rowsEditado[i][23],
                          "Bioimpedância_ de_Gordura" : rowsEditado[i][24],
                          "Bioimpedância_Massa_Magra_kg" : rowsEditado[i][25],
                          "Bioimpedância_Massa_Gorda_kg" : rowsEditado[i][26],
                          "Você tem HIPERTENSÃO (Pressão Alta) -" : rowsEditado[i][27],
                          "Você tem DIABETES -" : rowsEditado[i][28],
                          "CONVULSÃOÕES" : rowsEditado[i][29],
                          "ALEGIAS_" : rowsEditado[i][30],
                          "Qual(is) ALERGIA(S) -" : rowsEditado[i][31],
                          "DOENÇAS_CRONICAS_EM_TRATAMENTO" : rowsEditado[i][32],
                          "Qual(s) DOENÇA(S) CRONICA(S) -" : rowsEditado[i][33],
                          "Você utiliza alguma MEDICAMENTO(S) CONTINUAMENTE -" : rowsEditado[i][34],
                          "Qual(s) MECIDAMENTO(S) UTILIZA -" : rowsEditado[i][35],
                          "Somando a sua renda com a renda das pessoas que moram com você, quanto é, aproximadamente, a renda familiar mensal-" : rowsEditado[i][36],
                          "Incluindo você quantas pessoas moram em sua casa:" : rowsEditado[i][37],
                          "Você está trabalhando atualmente-" : rowsEditado[i][38],
                          "Qual cargo ou função exerce atualmente-" : rowsEditado[i][39],
                          "Quantas horas trabalha por dia-" : rowsEditado[i][40],
                          "É fumante-" : rowsEditado[i][41],
                          "Pratica_Atividade_Física" : rowsEditado[i][42],
                          "Qual(is) Atividade(s) Física-" : rowsEditado[i][43],
                          "Quanta(s) veze(s) por semana você pratica Atividade(s) Física(s)-" : rowsEditado[i][44],        
                          "Quanta(s) hora(s) você pratica de Atividade(s) Física(s)-" : rowsEditado[i][45],
                          "Dorme quantas horas aproximadamente por noite-" : rowsEditado[i][46],
                          "[Nenhuma]" : rowsEditado[i][47],
                          "[Câncer]" : rowsEditado[i][48],
                          "[Diabetes]" : rowsEditado[i][49],
                          "[Doenças cardiovasculares]" : rowsEditado[i][50],
                          "[Alzheimer]" : rowsEditado[i][51],
                          "[Asma]" : rowsEditado[i][52],
                          "[Colesterol alto]" : rowsEditado[i][53],
                          "[Pressão alta]" : rowsEditado[i][54],
                          "[Distúrbios psiquiátricos]" : rowsEditado[i][55],
                          "[Doenças raras, como fibrose cística, hemofilia e distrofias musculares.]" : rowsEditado[i][56],"[Outros]" : rowsEditado[i][57],
                          "Quantos_copos_de_água_copo_americano 30" : rowsEditado[i][58],
                          "AGUA" : rowsEditado[i][59],
                          "Você Faz alguma Dieta -" : rowsEditado[i][60],
                          "Você_Faz_Suplementação_Alimentar_ou_Uili" : rowsEditado[i][61],
                          "Você possui informações ou orientação nutricional-" : rowsEditado[i][62],
                          "Faz_quantas_refeições_por_dia" : rowsEditado[i][63],
                          "Quantas_refeições_são_realizadas_em_casa" : rowsEditado[i][64],
                          "Quantas_refeições_são_realizadas_ fora_de_casa" : rowsEditado[i][65],
                          "Em sua casa quem prepara as refeições- [Você Mesmo]" : rowsEditado[i][66],
                          "Em sua casa quem prepara as refeições- [Mãe/Pai]" : rowsEditado[i][67],
                          "Em sua casa quem prepara as refeições- [Avós/Tios]" : rowsEditado[i][68],
                          "Em sua casa quem prepara as refeições- [Irmãos]" : rowsEditado[i][69],
                          "Em sua casa quem prepara as refeições- [Empregada]" : rowsEditado[i][70],
                          "Em sua casa quem prepara as refeições- [Outros]" : rowsEditado[i][71],
                          "Costuma_adicionar_sal_no_seu_prato_após_" : rowsEditado[i][72],
                          "Adiciona_mais_açúcar_nos_líquidos:_leite" : rowsEditado[i][73],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Ovos]" : rowsEditado[i][74],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Farinha de trigo]" : rowsEditado[i][75],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Leite/ Derivados]" : rowsEditado[i][76],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Soja]" : rowsEditado[i][77],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Frutos do Mar/Peixes]" : rowsEditado[i][78],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Nenhum]" : rowsEditado[i][79],
                          "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Outros]" : rowsEditado[i][80],
                          "Considerando porções médias dos alimentos, você acha que seu consumo de algum grupo é maior ou menor- Ex número de pãezinhos, de bifes de copos de leite, etc [Frutas]" : rowsEditado[i][81],    
                          "LEITE" : rowsEditado[i][82],
                          "1" : rowsEditado[i][83],
                          "CARNE" : rowsEditado[i][84],
                          "2" : rowsEditado[i][85],
                          "ÓLEOS" : rowsEditado[i][86],
                          "4" : rowsEditado[i][87],
                          "PETISCOS" : rowsEditado[i][88],
                          "5" : rowsEditado[i][89],
                          "CEREAIS" : rowsEditado[i][90],
                          "6" : rowsEditado[i][91],
                          "Legum 2" : rowsEditado[i][92],
                          "7" : rowsEditado[i][93],
                          "HORTALIÇAS" : rowsEditado[i][94],
                          "8" : rowsEditado[i][95],
                          "SOBREMESAS" : rowsEditado[i][96],
                          "9" : rowsEditado[i][97],
                          "BEBIDAS" : rowsEditado[i][98],
                          "10" : rowsEditado[i][99],
                          "DIET" : rowsEditado[i][100],
                        }
                                                
                        // Transforma chaves com valores "Sim" e "Não" em 1 e 0 respectivamente.
                        const format = ["Você_usa_óculos", "Você tem HIPERTENSÃO (Pressão Alta) -", "Você tem DIABETES -", "CONVULSÃOÕES", "ALEGIAS_", "DOENÇAS_CRONICAS_EM_TRATAMENTO", "Você utiliza alguma MEDICAMENTO(S) CONTINUAMENTE -", "Você está trabalhando atualmente-", "É fumante-", "Pratica_Atividade_Física", "[Nenhuma]", "[Câncer]", "[Diabetes]", "[Doenças cardiovasculares]", "[Alzheimer]", "[Asma]", "[Colesterol alto]", "[Pressão alta]", "[Distúrbios psiquiátricos]", "[Doenças raras, como fibrose cística, hemofilia e distrofias musculares.]", "AGUA", "Você Faz alguma Dieta -", "Você_Faz_Suplementação_Alimentar_ou_Uili", "Você possui informações ou orientação nutricional-", "Em sua casa quem prepara as refeições- [Você Mesmo]", "Em sua casa quem prepara as refeições- [Mãe/Pai]", "Em sua casa quem prepara as refeições- [Avós/Tios]", "Em sua casa quem prepara as refeições- [Irmãos]", "Em sua casa quem prepara as refeições- [Empregada]", "Costuma_adicionar_sal_no_seu_prato_após_", "Adiciona_mais_açúcar_nos_líquidos:_leite", "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Ovos]", "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Farinha de trigo]", "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Leite/ Derivados]", "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Soja]", "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Frutos do Mar/Peixes]", "Existe algum fator que determina a exclusão de certos alimentos na dieta- [Nenhum]"]
  
                        for (let i = 0; i < format.length; i++) {
                          if (dados[format[i]] === "Sim") dados[format[i]] = 1
                          else dados[format[i]] = 0
                        }
  
                        this.db.query('SELECT * FROM alunos WHERE rm= ? ', [dados.RM],
                            async (error, response) => {
                                if (error) return reject(new Error(error));
                                try {
                                  if (response[0]) {
                                    this.db.query(`UPDATE fiecdev_aluno_saudavel.alunos SET 
                                    alunos.data_cadastro = ?, alunos.nome = ?, alunos.genero = ?, alunos.data_nascimento = ?, alunos.curso = ?, alunos.periodo = ?, alunos.tipo_sanguineo = ?  WHERE alunos.rm = ?`, 
                                    [dados["Data"], dados["Nome"], dados["Genero"], dados["Data_de_Nascimento:"], dados["Curso"], dados["Período:"], dados["Tipo"], dados["RM"]],
                                    (error, response) => { if (error) {
                                        console.log(error);
                                        resolve({ error: "STATIC_ERRO_VALIDACAO_SQL", code: 203, });
                                    }
                                  });
                                    this.db.query(`UPDATE fiecdev_aluno_saudavel.alunos_coleta SET 
                                    alunos_coleta.pressao_minima = ?, alunos_coleta.pressao_maxima = ?, alunos_coleta.pressao = ?, alunos_coleta.dextro_mgl = ?, alunos_coleta.dextro = ?, alunos_coleta.peso_kg = ?, alunos_coleta.estatura_metros = ?, alunos_coleta.imc = ?, alunos_coleta.resultado_imc = ?, alunos_coleta.circ_abdominal_cm = ?, alunos_coleta.resultado_circ_abd = ?, alunos_coleta.oculos = ?, alunos_coleta.acuidade_visual_direita = ?, alunos_coleta.acuidade_visual_esquerda = ?, alunos_coleta.bioimpedancia_de_gordura = ?, alunos_coleta.bioimpedancia_massa_magra_kg = ?, alunos_coleta.bioimpedancia_massa_gorda_kg = ?, alunos_coleta.hipertensao = ?, alunos_coleta.diabetes = ?, alunos_coleta.convulsoes = ?, alunos_coleta.alergias = ?, alunos_coleta.qual_alergia = ?, alunos_coleta.doenca_cronica_tratamento = ?, alunos_coleta.qual_doenca_cronica_tratamento = ?, alunos_coleta.medicamento_continuo = ?, alunos_coleta.qual_medicamento_continuo = ?, alunos_coleta.renda_pessoas_casa = ?, alunos_coleta.qtd_pessoas_casa = ?, alunos_coleta.trabalha = ?, alunos_coleta.cargo = ?, alunos_coleta.trabalho_hrs_dia = ?, alunos_coleta.fuma = ?, alunos_coleta.atividade_fisica = ?, alunos_coleta.qual_atividade_fisica = ?, alunos_coleta.qtas_vzs_semana_atividade_fisica = ?, alunos_coleta.qtas_hrs_atividade_fisica = ?, alunos_coleta.qtas_hrs_dorme = ?, alunos_coleta.historico_doencas = ?, alunos_coleta.cancer = ?, alunos_coleta.diabates = ?, alunos_coleta.doencas_cardiovasculares = ?, alunos_coleta.alzheimer = ?, alunos_coleta.asma = ?, alunos_coleta.colesterol_alto = ?, alunos_coleta.pressao_alta = ?, alunos_coleta.disturbios_psiquiatricos = ?, alunos_coleta.doencas_raras = ?, alunos_coleta.outros = ?, alunos_coleta.qtos_copos_agua = ?, alunos_coleta.agua = ?, alunos_coleta.dieta = ?, alunos_coleta.suplementacao_alimentar_uili = ?, alunos_coleta.orientacao_nutricional = ?, alunos_coleta.qtas_refeicoes_dia = ?, alunos_coleta.qtas_refeicoes_em_casa = ?, alunos_coleta.qtas_refeicoes_fora = ?, alunos_coleta.prepara_propria_refeicao = ?, alunos_coleta.mae_pai_prepara_refeicao = ?, alunos_coleta.tios_avos_prepara_refeicao = ?, alunos_coleta.irmaos_prepara_refeicao = ?, alunos_coleta.empregada_prepara_refeicao = ?, alunos_coleta.outrosi_prepara_refeicao = ?, alunos_coleta.adiciona_sal_dps_pronto = ?, alunos_coleta.adiciona_acucar_liquidos = ?, alunos_coleta.restricao_alimento_ovos = ?, alunos_coleta.restricao_alimento_farinha_trigo = ?, alunos_coleta.restricao_alimento_leite_derivados = ?, alunos_coleta.restricao_alimento_soja = ?, alunos_coleta.restricao_alimento_frutos_mar_peixe = ?, alunos_coleta.restricao_alimento_nenhum = ?, alunos_coleta.restricao_alimento_outros = ?, alunos_coleta.porcao_maior_menor_grupo_alimento = ?, alunos_coleta.res_porcao_leite = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_leite = ?, alunos_coleta.res_porcao_carne = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_carne = ?, alunos_coleta.res_porcao_oleo = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_oleo = ?, alunos_coleta.res_porcao_petisco = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_petisco = ?, alunos_coleta.res_porcao_cereal = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_cereal = ?, alunos_coleta.res_porcao_legume = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_legume = ?, alunos_coleta.res_porcao_hortalica = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_hortalica = ?, alunos_coleta.res_porcao_sobremesa = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_sobremesa = ?, alunos_coleta.res_porcao_bebida = ?, alunos_coleta.porcao_maior_menor_grupo_alimento_bebida = ?, alunos_coleta.res_porcao_dieta = ?  WHERE alunos.rm = ?`, 
                                    [dados["PA_Mínima_mmhg"],
                                    dados["PA_Máxima_mmhg"],
                                    dados["Pressão"],
                                    dados["Dextro_mg/l"],
                                    dados["DEXTRO"],
                                    dados["Peso_kg"],
                                    dados["Estatura_metros"],
                                    dados["IMC"],
                                    dados["Result IMC"],
                                    dados["Circ_Abdominal_cm"],
                                    dados["Result Circ Ab"],
                                    dados["Você_usa_óculos"],
                                    dados["Acuidade_Visual_Direita"],
                                    dados["Acuidade_Visual_Esquerda"],
                                    dados["Bioimpedância_ de_Gordura"],
                                    dados["Bioimpedância_Massa_Magra_kg"],
                                    dados["Bioimpedância_Massa_Gorda_kg"],
                                    dados["Você tem HIPERTENSÃO (Pressão Alta) -"],
                                    dados["Você tem DIABETES -"],
                                    dados["CONVULSÃOÕES"],
                                    dados["ALEGIAS_"],
                                    dados["Qual(is) ALERGIA(S) -"],
                                    dados["DOENÇAS_CRONICAS_EM_TRATAMENTO"],
                                    dados["Qual(s) DOENÇA(S) CRONICA(S) -"],
                                    dados["Você utiliza alguma MEDICAMENTO(S) CONTINUAMENTE -"],
                                    dados["Qual(s) MECIDAMENTO(S) UTILIZA -"],
                                    dados["Somando a sua renda com a renda das pessoas que moram com você, quanto é, aproximadamente, a renda familiar mensal-"],
                                    dados["Incluindo você quantas pessoas moram em sua casa:"],
                                    dados["Você está trabalhando atualmente-"],
                                    dados["Qual cargo ou função exerce atualmente-"],
                                    dados["Quantas horas trabalha por dia-"],
                                    dados["É fumante-"],
                                    dados["Pratica_Atividade_Física"],
                                    dados["Qual(is) Atividade(s) Física-"],
                                    dados["Quanta(s) veze(s) por semana você pratica Atividade(s) Física(s)-"],
                                    dados["Quanta(s) hora(s) você pratica de Atividade(s) Física(s)-"],
                                    dados["Dorme quantas horas aproximadamente por noite-"],
                                    dados["[Nenhuma]"],
                                    dados["[Câncer]"],
                                    dados["[Diabetes]"],
                                    dados["[Doenças cardiovasculares]"],
                                    dados["[Alzheimer]"],
                                    dados["[Asma]"],
                                    dados["[Colesterol alto]"],
                                    dados["[Pressão alta]"],
                                    dados["[Distúrbios psiquiátricos]"],
                                    dados["[Doenças raras, como fibrose cística, hemofilia e distrofias musculares.]"],
                                    dados["[Outros]"],
                                    dados["Quantos_copos_de_água_copo_americano 30"],
                                    dados["AGUA"],
                                    dados["Você Faz alguma Dieta -"],
                                    dados["Você_Faz_Suplementação_Alimentar_ou_Uili"],
                                    dados["Você possui informações ou orientação nutricional-"],
                                    dados["Faz_quantas_refeições_por_dia"],
                                    dados["Quantas_refeições_são_realizadas_em_casa"],
                                    dados["Quantas_refeições_são_realizadas_ fora_de_casa"],
                                    dados["Em sua casa quem prepara as refeições- [Você Mesmo]"],
                                    dados["Em sua casa quem prepara as refeições- [Mãe/Pai]"],
                                    dados["Em sua casa quem prepara as refeições- [Avós/Tios]"],
                                    dados["Em sua casa quem prepara as refeições- [Irmãos]"],
                                    dados["Em sua casa quem prepara as refeições- [Empregada]"],
                                    dados["Em sua casa quem prepara as refeições- [Outros]"],
                                    dados["Costuma_adicionar_sal_no_seu_prato_após_"],
                                    dados["Adiciona_mais_açúcar_nos_líquidos:_leite"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Ovos]"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Farinha de trigo]"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Leite/ Derivados]"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Soja]"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Frutos do Mar/Peixes]"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Nenhum]"],
                                    dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Outros]"],
                                    dados["Considerando porções médias dos alimentos, você acha que seu consumo de algum grupo é maior ou menor- Ex número de pãezinhos, de bifes de copos de leite, etc [Frutas]"],
                                    dados["LEITE"],
                                    dados["1"],
                                    dados["CARNE"],
                                    dados["2"],
                                    dados["ÓLEOS"],
                                    dados["4"],
                                    dados["PETISCOS"],
                                    dados["5"],
                                    dados["CEREAIS"],
                                    dados["6"],
                                    dados["Legum 2"],
                                    dados["7"],
                                    dados["HORTALIÇAS"],
                                    dados["8"],
                                    dados["SOBREMESAS"],
                                    dados["9"],
                                    dados["BEBIDAS"],
                                    dados["10"],
                                    dados["DIET"],
                                    dados["RM"]],
                                (error, response) => { if (error) {
                                        console.log(error);
                                        resolve({ error: "STATIC_ERRO_VALIDACAO_SQL", code: 203, });
                                    }
                                  });
                                  } else {
                                        this.db.query(`INSERT INTO fiecdev_aluno_saudavel.alunos (alunos.data_cadastro, alunos.rm, alunos.nome, alunos.genero, alunos.data_nascimento, alunos.curso, alunos.periodo, alunos.tipo_sanguineo) VALUES(?,?,?,?,?,?,?,?)`, 
                                        [dados["Data"], dados["RM"], dados["Nome"], dados["Genero"], dados["Data_de_Nascimento:"], dados["Curso"], dados["Período:"], dados["Tipo"]],
                                            (error, response) => { if (error) resolve({ error: "STATIC_ERRO_VALIDACAO_SQL", code: 203, });
                                            });
                                        this.db.query(`INSERT INTO fiecdev_aluno_saudavel.alunos_coleta (alunos_coleta.pressao_minima, alunos_coleta.pressao_maxima, alunos_coleta.pressao, alunos_coleta.dextro_mgl, alunos_coleta.dextro, alunos_coleta.peso_kg, alunos_coleta.estatura_metros, alunos_coleta.imc, alunos_coleta.resultado_imc, alunos_coleta.circ_abdominal_cm, alunos_coleta.resultado_circ_abd, alunos_coleta.oculos, alunos_coleta.acuidade_visual_direita, alunos_coleta.acuidade_visual_esquerda, alunos_coleta.bioimpedancia_de_gordura, alunos_coleta.bioimpedancia_massa_magra_kg, alunos_coleta.bioimpedancia_massa_gorda_kg, alunos_coleta.hipertensao, alunos_coleta.diabetes, alunos_coleta.convulsoes, alunos_coleta.alergias, alunos_coleta.qual_alergia, alunos_coleta.doenca_cronica_tratamento, alunos_coleta.qual_doenca_cronica_tratamento, alunos_coleta.medicamento_continuo, alunos_coleta.qual_medicamento_continuo, alunos_coleta.renda_pessoas_casa, alunos_coleta.qtd_pessoas_casa, alunos_coleta.trabalha, alunos_coleta.cargo, alunos_coleta.trabalho_hrs_dia, alunos_coleta.fuma, alunos_coleta.atividade_fisica, alunos_coleta.qual_atividade_fisica, alunos_coleta.qtas_vzs_semana_atividade_fisica, alunos_coleta.qtas_hrs_atividade_fisica, alunos_coleta.qtas_hrs_dorme, alunos_coleta.historico_doencas, alunos_coleta.cancer, alunos_coleta.diabates, alunos_coleta.doencas_cardiovasculares, alunos_coleta.alzheimer, alunos_coleta.asma, alunos_coleta.colesterol_alto, alunos_coleta.pressao_alta, alunos_coleta.disturbios_psiquiatricos, alunos_coleta.doencas_raras, alunos_coleta.outros, alunos_coleta.qtos_copos_agua, alunos_coleta.agua, alunos_coleta.dieta, alunos_coleta.suplementacao_alimentar_uili, alunos_coleta.orientacao_nutricional, alunos_coleta.qtas_refeicoes_dia, alunos_coleta.qtas_refeicoes_em_casa, alunos_coleta.qtas_refeicoes_fora, alunos_coleta.prepara_propria_refeicao, alunos_coleta.mae_pai_prepara_refeicao, alunos_coleta.tios_avos_prepara_refeicao, alunos_coleta.irmaos_prepara_refeicao, alunos_coleta.empregada_prepara_refeicao, alunos_coleta.outrosi_prepara_refeicao, alunos_coleta.adiciona_sal_dps_pronto, alunos_coleta.adiciona_acucar_liquidos, alunos_coleta.restricao_alimento_ovos, alunos_coleta.restricao_alimento_farinha_trigo, alunos_coleta.restricao_alimento_leite_derivados, alunos_coleta.restricao_alimento_soja, alunos_coleta.restricao_alimento_frutos_mar_peixe, alunos_coleta.restricao_alimento_nenhum, alunos_coleta.restricao_alimento_outros, alunos_coleta.porcao_maior_menor_grupo_alimento, alunos_coleta.res_porcao_leite, alunos_coleta.porcao_maior_menor_grupo_alimento_leite, alunos_coleta.res_porcao_carne, alunos_coleta.porcao_maior_menor_grupo_alimento_carne, alunos_coleta.res_porcao_oleo, alunos_coleta.porcao_maior_menor_grupo_alimento_oleo, alunos_coleta.res_porcao_petisco, alunos_coleta.porcao_maior_menor_grupo_alimento_petisco, alunos_coleta.res_porcao_cereal, alunos_coleta.porcao_maior_menor_grupo_alimento_cereal, alunos_coleta.res_porcao_legume, alunos_coleta.porcao_maior_menor_grupo_alimento_legume, alunos_coleta.res_porcao_hortalica, alunos_coleta.porcao_maior_menor_grupo_alimento_hortalica, alunos_coleta.res_porcao_sobremesa, alunos_coleta.porcao_maior_menor_grupo_alimento_sobremesa, alunos_coleta.res_porcao_bebida, alunos_coleta.porcao_maior_menor_grupo_alimento_bebida, alunos_coleta.res_porcao_dieta)
                                        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                        [dados["PA_Mínima_mmhg"],
                                        dados["PA_Máxima_mmhg"],
                                        dados["Pressão"],
                                        dados["Dextro_mg/l"],
                                        dados["DEXTRO"],
                                        dados["Peso_kg"],
                                        dados["Estatura_metros"],
                                        dados["IMC"],
                                        dados["Result IMC"],
                                        dados["Circ_Abdominal_cm"],
                                        dados["Result Circ Ab"],
                                        dados["Você_usa_óculos"],
                                        dados["Acuidade_Visual_Direita"],
                                        dados["Acuidade_Visual_Esquerda"],
                                        dados["Bioimpedância_ de_Gordura"],
                                        dados["Bioimpedância_Massa_Magra_kg"],
                                        dados["Bioimpedância_Massa_Gorda_kg"],
                                        dados["Você tem HIPERTENSÃO (Pressão Alta) -"],
                                        dados["Você tem DIABETES -"],
                                        dados["CONVULSÃOÕES"],
                                        dados["ALEGIAS_"],
                                        dados["Qual(is) ALERGIA(S) -"],
                                        dados["DOENÇAS_CRONICAS_EM_TRATAMENTO"],
                                        dados["Qual(s) DOENÇA(S) CRONICA(S) -"],
                                        dados["Você utiliza alguma MEDICAMENTO(S) CONTINUAMENTE -"],
                                        dados["Qual(s) MECIDAMENTO(S) UTILIZA -"],
                                        dados["Somando a sua renda com a renda das pessoas que moram com você, quanto é, aproximadamente, a renda familiar mensal-"],
                                        dados["Incluindo você quantas pessoas moram em sua casa:"],
                                        dados["Você está trabalhando atualmente-"],
                                        dados["Qual cargo ou função exerce atualmente-"],
                                        dados["Quantas horas trabalha por dia-"],
                                        dados["É fumante-"],
                                        dados["Pratica_Atividade_Física"],
                                        dados["Qual(is) Atividade(s) Física-"],
                                        dados["Quanta(s) veze(s) por semana você pratica Atividade(s) Física(s)-"],
                                        dados["Quanta(s) hora(s) você pratica de Atividade(s) Física(s)-"],
                                        dados["Dorme quantas horas aproximadamente por noite-"],
                                        dados["[Nenhuma]"],
                                        dados["[Câncer]"],
                                        dados["[Diabetes]"],
                                        dados["[Doenças cardiovasculares]"],
                                        dados["[Alzheimer]"],
                                        dados["[Asma]"],
                                        dados["[Colesterol alto]"],
                                        dados["[Pressão alta]"],
                                        dados["[Distúrbios psiquiátricos]"],
                                        dados["[Doenças raras, como fibrose cística, hemofilia e distrofias musculares.]"],
                                        dados["[Outros]"],
                                        dados["Quantos_copos_de_água_copo_americano 30"],
                                        dados["AGUA"],
                                        dados["Você Faz alguma Dieta -"],
                                        dados["Você_Faz_Suplementação_Alimentar_ou_Uili"],
                                        dados["Você possui informações ou orientação nutricional-"],
                                        dados["Faz_quantas_refeições_por_dia"],
                                        dados["Quantas_refeições_são_realizadas_em_casa"],
                                        dados["Quantas_refeições_são_realizadas_ fora_de_casa"],
                                        dados["Em sua casa quem prepara as refeições- [Você Mesmo]"],
                                        dados["Em sua casa quem prepara as refeições- [Mãe/Pai]"],
                                        dados["Em sua casa quem prepara as refeições- [Avós/Tios]"],
                                        dados["Em sua casa quem prepara as refeições- [Irmãos]"],
                                        dados["Em sua casa quem prepara as refeições- [Empregada]"],
                                        dados["Em sua casa quem prepara as refeições- [Outros]"],
                                        dados["Costuma_adicionar_sal_no_seu_prato_após_"],
                                        dados["Adiciona_mais_açúcar_nos_líquidos:_leite"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Ovos]"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Farinha de trigo]"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Leite/ Derivados]"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Soja]"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Frutos do Mar/Peixes]"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Nenhum]"],
                                        dados["Existe algum fator que determina a exclusão de certos alimentos na dieta- [Outros]"],
                                        dados["Considerando porções médias dos alimentos, você acha que seu consumo de algum grupo é maior ou menor- Ex número de pãezinhos, de bifes de copos de leite, etc [Frutas]"],
                                        dados["LEITE"],
                                        dados["1"],
                                        dados["CARNE"],
                                        dados["2"],
                                        dados["ÓLEOS"],
                                        dados["4"],
                                        dados["PETISCOS"],
                                        dados["5"],
                                        dados["CEREAIS"],
                                        dados["6"],
                                        dados["Legum 2"],
                                        dados["7"],
                                        dados["HORTALIÇAS"],
                                        dados["8"],
                                        dados["SOBREMESAS"],
                                        dados["9"],
                                        dados["BEBIDAS"],
                                        dados["10"],
                                        dados["DIET"]],
                                            (error, response) => { 
                                              if (error) resolve({ error: "STATIC_ERRO_VALIDACAO_SQL", code: 203, });
                                            });
                                    }
                                } catch (error) { return reject(new Error(error)); };
                                return resolve({ success: 'Planilha lida com sucesso' });
                            });
                    }
                })
            } catch (error) { return reject(new Error(error)); };
        })
    }
  
}

module.exports = coletasRepository;