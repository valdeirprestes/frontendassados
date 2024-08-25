const configCriarPedido = {
    className:"clientedados_criarpedido",
    classInsertName:"divusuario",
    classtaggroup: "label-input-group",
    classtaginput: "",
    gravar:false,
    axios:{
        rota_Ler:"",
        metodo_Ler:"",
        rota_Salvar:"",
        metodo_Salvar:"",
    },
    campos:["nome", "email", "telefone", "celular","logradouro","numero","municipio"],
    apelidos:["Nome", "Email", "Telefone", "Celular","Rua","numero","Cidade"],
    tipo:["STRING","STRING","STRING","STRING","STRING","STRING","STRING"],
    input_className:[
        "dadosusuario_nome",
        "dadosusuario_email", 
        "dadosusuario_telefone", 
        "dadosusuario_celular",
        "dadosusuario_logradouro",
        "dadosusuario_numero",
        "dadosusuario_municipio"]
}

export default configCriarPedido;