const configCriarPedido = {
    className:"cliente_criarpedido",
    classInsertName:"divusuario",
    classtaggroup: "form-group",
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
    tipo:["STRING","STRING","STRING","STRING","STRING","STRING","STRING"]
}

export default configCriarPedido;