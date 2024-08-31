import  func from "./funcProdutos_telaestoque";
const config = {
    className:"telaestoque_div", //classe que tem o botao de busca
    classInputSelecionado:"telaestoque_produtoid", // classe do input tipo hidden
    classBotao:"telaestoque_botaoselecionar", // classe do botão para buscar 
    classDivInsert:"telaestoque_div", // uma div que possa centralizar a div de busca
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
            {"campo":"nome" , "tipagem":"STRING"}
        ]
    },
    classNameConfigTabela:"",
    classNamePaginado:"",
    labelbuscar:"Buscar produto",
    labelbuscarcancel:"Cancelar",
    tabelacabecalho:['id', 'nome','categoria'],
    tabeladados:['id', 'nome','category'],
    tabelaprocura:['nome'],
    primeiracolunaoculta:false,
    SelecaoMultipla:false,
    funcaopost:func
} 
export default config;
