import funcdivcriarpedido from "./funcdivcriarpedido";
const config = {
    className:"cliente_criarpedido", //classe que tem o botao de busca
    classInputSelecionado:"usuarioselecionado", // classe do input tipo hidden
    classBotao:"AtivarBuscarInterativa", // classe do botão para buscar 
    classDivInsert:"divflexvertical", // uma div que possa centralizar a div de busca
    axios:{
        rota_contagem:"/usuario/quantidade",
        metodo_contagem:"post",
        rota_dados:"/usuario/todos",
        metodo_dados:"post",
        filtragemestatica:[
            {"campo":"estado", "valor":"NORMAL"},
            {"campo":"qtdpagina", "valor":5},
        ],
        
        filtragemdinamica:[
            {"campo":"nome" , "tipagem":"STRING"},
            {"campo":"celular", "tipagem":"STRING"},
        ]
    },
    classNameConfigTabela:"",
    classNamePaginado:"",
    labelbuscar:"Buscar cliente",
    labelbuscarcancel:"Cancelar",
    tabelacabecalho:['id', 'nome', 'contato'],
    tabeladados:['id', 'nome', 'telefone'],
    primeiracolunaoculta:false,
    funcaopost:funcdivcriarpedido
} 
export default config;
