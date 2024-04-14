import {Router} from "express";
import controleCandidatos from "../Controle/controleCandidatos.js"

const rotaCandidatos = new Router();
const intControle = new controleCandidatos();

rotaCandidatos.post("/", intControle.gravar)
    .put("/", intControle.atualizar)
    .delete("/:cpf", intControle.excluir)
    .get("/", intControle.consultar)
    .get("/:consultarnome", intControle.consultar);


export default rotaCandidatos;