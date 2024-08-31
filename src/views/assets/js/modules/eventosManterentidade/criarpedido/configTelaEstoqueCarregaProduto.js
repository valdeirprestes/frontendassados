const configCriarPedido = {
    className:"contents",
    classInsertName:"telaestoque_div",
    classtaggroup: "form-group",
    classtaginput: "",
    gravar:false,
    axios:{
        rota_Ler:"",
        metodo_Ler:"",
        rota_Salvar:"",
        metodo_Salvar:"",
    },
    campos:["nome", "item_fechamento", "unidade_parcial", "category","logradouro","numero","municipio"],
    apelidos:["Produto", "Item fechamento", "Item parcial", "Categoria","Estoque atual"],
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