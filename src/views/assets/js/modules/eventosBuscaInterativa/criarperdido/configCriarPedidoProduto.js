import funcCriarPedidoProduto from "./funcCriarPedidoProduto"
const config = {
    className:"produto_criarpedido", //classe que tem o botao de busca
    classInputSelecionado:"produtoselecionado_criarpedido", // classe do input tipo hidden
    classBotao:"buscarproduto_criarpedido", // classe do botão para buscar 
    classDivInsert:"divflexvertical", // uma div que possa centralizar a div de busca
    axios:{
        rota_contagem:"/produto/quantidade",
        metodo_contagem:"post",
        rota_dados:"/produto/todos",
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
    labelbuscar:"Buscar produto",
    labelbuscarcancel:"Cancelar",
    labelbuscarconfirmar:"Confirmar",
    tabelacabecalho:['Id', 'Nome','Categoria'],
    tabeladados:['id', 'nome','category'],
    tabelaprocura:['nome'],
    primeiracolunaoculta:false,
    SelecaoMultipla:true,
    funcaopost:funcCriarPedidoProduto
} 
export default config;
