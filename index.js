import express from "express";
import cors from 'cors';
import rotaCandidatos from "./Rotas/rotasCandidatos.js";

const porta = 3100;
const hostname = "localhost";

const app = express();

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.static("./Frontend"));
app.use(express.json());
app.use("/candidatos", rotaCandidatos);

app.listen(porta, hostname,()=>{
    console.log("Backend respondendo em http://" + hostname + ":" + porta)
});