import Candidatos from "../Modelo/Candidatos.js"
import Conexao from "./conexao.js";

export default class CandidatosDAO{

    async gravar(candidatos){
        if(candidatos instanceof Candidatos){
            const conexao = await Conexao();
            const sql="INSERT INTO tabelaCandidatos(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado) \
            VALUES(?,?,?,?,?,?,?,?)";
            const valores = [candidatos.cpf, candidatos.nome, candidatos.sobrenome, candidatos.genero, candidatos.dataNascimento, candidatos.cep, candidatos.cidade, candidatos.estado];
            const [result] = await conexao.query(sql,valores)
            candidatos.cpf = result.insertCPF;
        }
    }

    async atualizar(candidatos){
        if(candidatos instanceof Candidatos){
            const conexao = await Conexao();
            const sql = "UPDATE tabelaCandidatos SET nome=?, sobrenome=?, genero=?, dataNascimento=?, cep=?, cidade=?, estado=? WHERE cpf=?";
            const valores = [candidatos.nome, candidatos.sobrenome, candidatos.genero, candidatos.dataNascimento, candidatos.cep, candidatos.cidade, candidatos.estado, candidatos.cpf];
            await conexao.query(sql, valores);
        }
    }

    async excluir(candidatos){
        if(candidatos instanceof Candidatos){
            const conexao = await Conexao();
            const sql="DELETE FROM tabelaCandidatos \
            WHERE cpf=? ";
            const valores = [candidatos.cpf]
            await conexao.query(sql,valores)
        }
    }

    async consultar(cpf){
        const conexao = await Conexao();
        const sql = "SELECT * FROM tabelaCandidatos WHERE cpf LIKE ?";
        const valores = ['%' + cpf + '%'];
        const [rows] = await conexao.query(sql,valores);
        const listaCandidatos = [];
        for(const row of rows){
            const candidatos = new Candidatos(row['cpf'], row['nome'], row['sobrenome'],row['genero'], row['dataNascimento'], row['cep'], row['cidade'], row['estado']);
            listaCandidatos.push(candidatos);
        }
        return listaCandidatos;
    }

    async consultarnome(nome){
        const conexao = await Conexao();
        const sql = "SELECT * FROM tabelaCandidatos WHERE nome=? ";
        const valores = [nome];
        const [rows] = await conexao.query(sql,valores);
        const listaCandidatos = [];
        for(const row of rows){
            const candidatos = new Candidatos(row['cpf'], row['nome'], row['sobrenome'],row['genero'], row['dataNascimento'], row['cep'], row['cidade'], row['estado'] );
            listaCandidatos.push(candidatos);
        }
        return listaCandidatos;
    }
}