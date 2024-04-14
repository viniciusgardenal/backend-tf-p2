import Candidatos from "../Modelo/Candidatos.js";

export default class controleCandidatos{
    
    gravar(requisicao, resposta){
        resposta.type("application/json" );
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const cpf   = dados.cpf;
            const nome  = dados.nome;
            const sobrenome  = dados.sobrenome;
            const genero  = dados.genero;
            const dataNascimento = dados.dataNascimento;
            const cep = dados.cep;
            const cidade = dados.cidade;
            const estado = dados.estado;

            if (cpf &&  nome && sobrenome && genero && dataNascimento && cep && cidade && estado){
                const candidatos = new Candidatos(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado);
                candidatos.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Candidato registrado com sucesso!"
                    });
                }).catch((erro)=>{
                    resposta.status(500).json({
                        status:false,
                        mensagem: "Não foi possível registrar o candidato." + erro.message
                    });
                });
            }
            else{
                resposta.status("400").json({
                    status:false,
                    mensagem: "Informe todos os dados necessários para cadastrar o candidato. Verifique a documentação da API."
                })
            }
        }
        else{
            resposta.status("400").json({
                status:false,
                mensagem: "Método não permitido para registrar um candidato"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "PUT" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf; // Recupere o CPF do corpo da requisição
            const nome = dados.nome;
            const sobrenome = dados.sobrenome;
            const genero = dados.genero;
            const dataNascimento = dados.dataNascimento;
            const cep = dados.cep;
            const cidade = dados.cidade;
            const estado = dados.estado;
    
            if (cpf && nome && sobrenome && genero && dataNascimento && cep && cidade && estado) {
                const candidatoAtualizado = new Candidatos(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado);
                candidatoAtualizado.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Não foi possível atualizar o Candidato: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe todos os dados necessários para atualizar o candidato. Verifique a documentação da API."
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido para atualizar um candidato. Verifique a documentação da API."
            });
        }
    }
    
    

    excluir(requisicao, resposta){
        resposta.type("application/json");

        const cpf = requisicao.params.cpf;
        if(requisicao.method === "DELETE"){

            if(cpf){
                
                    const candidatos = new Candidatos(cpf);
                    candidatos.excluir().then(()=>{
                        resposta.status(200).json({
                            status:true,
                            mensagem: "Candidato excluído com sucesso!"
                        });
                    }).catch((erro)=>{
                        resposta.status(500).json({
                            status:false,
                            mensagem: "Não foi possível excluir o candidato." + erro.message
                        });
                    });
                }
                else{
                    resposta.status("400").json({
                        status:false,
                        mensagem: "Informe o ID do Candidato para exclui-lo. Verifique a documentação da API."
                    })
                }
        }
        else{
            resposta.status("400").json({
                status:false,
                mensagem: "Método não permitido para excluir um candidato. Verifique a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "GET"){
          let termoConsulta = requisicao.params.nome;
          const candidatos = new Candidatos(0);
          if (isNaN(parseInt(termoConsulta))){
            if(termoConsulta === undefined ){
              termoConsulta = '';
            }
            candidatos.consultar(termoConsulta).then((listaCandidatoss)=>{
              resposta.status(200).json(listaCandidatoss);
            }).catch((erro)=>{
              resposta.status(500).json({
                status:false,
                mensagem: "Não foi possível realizar a consulta."
              })
            })
          } else{
            candidatos.consultarnome(termoConsulta).then((listaCandidatoss)=>{
              resposta.status(200).json(listaCandidatoss);
            }).catch((erro)=>{
              resposta.status(500).json({
                status:false,
                mensagem: "Não foi possível realizar a consulta."
              })
            })
          } 
        } else{
          resposta.status("400").json({
            status:false,
            mensagem: "Método não permitido para consultar um candidato. Verifique a documentação da API."
          })
        }
      }
}