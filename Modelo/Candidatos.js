import CandidatosDAO from "../Persistencia/candidatosDAO.js";
export default class Candidatos{
    #cpf;
    #nome;
    #sobrenome;
    #genero;
    #dataNascimento;
    #cep;
    #cidade;
    #estado;

    constructor(cpf, nome, sobrenome, genero, dataNascimento, cep, cidade, estado){
        this.#cpf = cpf;
        this.#nome = nome; 
        this.#sobrenome = sobrenome;
        this.#genero = genero;
        this.#dataNascimento = dataNascimento;
        this.#cep = cep;
        this.#cidade = cidade;
        this.#estado = estado;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novocpf){
        this.#cpf = novocpf;
    }

    get nome(){
        return this.#nome
    }

    set nome(novonome){
        this.#nome = novonome;
    }

    get sobrenome(){
        return this.#sobrenome;
    }

    set sobrenome(novosobrenome){
        this.#sobrenome = novosobrenome;
    }

    get genero(){
        return this.#genero;
    
    }
    
    set genero(novogenero){
        this.#genero = novogenero;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(novadataNascimento){
        this.#dataNascimento = novadataNascimento;
    }

    get cep(){
        return this.#cep;
    }

    set cep(novocep){
        this.#cep = novocep;
    }

    get cidade(){
        return this.#cidade;
    
    }
        
    set cidade(novocidade){
        this.#cidade = novocidade;
    }

    get estado(){
        return this.#estado;
    
    }
        
    set estado(novaestado){
        this.#estado = novaestado;
    }

    
    toJSON(){
        return{
            "cpf"       : this.#cpf,
            "nome"      : this.#nome,
            "sobrenome" : this.#sobrenome,
            "genero"    : this.#genero,
            "dataNascimento"   : this.#dataNascimento,
            "cep"       : this.#cep,
            "cidade"    : this.#cidade,
            "estado"    : this.#estado
        }
    }

    async gravar(){
        const candidatoDAO = new CandidatosDAO();
        this.cpf = await candidatoDAO.gravar(this);
    }

    async atualizar(){
        const candidatoDAO = new CandidatosDAO();
        await candidatoDAO.atualizar(this);
    }

    async excluir(){
        const candidatoDAO = new CandidatosDAO();
        await candidatoDAO.excluir(this);
    }

    async consultar(cpf) {
        const candidatoDAO = new CandidatosDAO();
        const candidatos = await candidatoDAO.consultar(cpf);
        return candidatos

    }

    async consultarnome(nome){
        const candidatoDAO = new CandidatosDAO();
        const candidatos = await candidatoDAO.consultarnome(nome);
        return candidatos;
    }

}