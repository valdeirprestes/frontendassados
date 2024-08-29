import criatelaDialogo from "../utils/criatelaDialogo";

const class_idcliente = "usuarioselecionado_criarpedido";
const clientecadastrado_campo = "clientecadastrado_campo";

/*const class_inputnome = "dadosusuario_nome";
const class_inputemail="dadosusuario_email"
const class_inputtelefone="dadosusuario_telefone";
const class_inputcelular="dadosusuario_celular";
const class_inputrua = "dadosusuario_logradouro";
const class_inputnumero="dadosusuario_numero";
const class_inputcidade="dadosusuario_municipio";*/

let campos = [
    "dadosusuario_nome",
    "dadosusuario_email",
    "dadosusuario_telefone",
    "dadosusuario_celular",
    "dadosusuario_logradouro",
    "dadosusuario_numero",
    "dadosusuario_municipio",
]
function gestaopedido_limparcamposcliente(objparametros){
    let cliente =  document.querySelector(`.${class_idcliente}`);
    if(!cliente){
        console.log(`Não conseguiu localizar a classe ${class_idcliente}`);
    }
    else
        cliente.innerText = "-1";
        cliente.value = "-1";

    let tagcliente =  document.querySelector(`.${clientecadastrado_campo}`);
    if(!tagcliente){
        console.log(`Não conseguiu localizar a classe ${clientecadastrado_campo}`);
    }
    else
        tagcliente.innerText = "NÃO";
    campos.forEach(item =>{
        let taghtml = document.querySelector(`.${item}`);
        if(!taghtml){
            console.log(` Não foi localizado a classe ${item}`);
        }
        else
            taghtml.value = ""
    });
    criatelaDialogo("divflexvertical",
    "Preencha os campos para inserir um novo usuario ou selecione um  usuário registrado.", 0);
}


export default gestaopedido_limparcamposcliente;