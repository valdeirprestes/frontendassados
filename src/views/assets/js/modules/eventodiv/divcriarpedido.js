const config = {
    className:"cliente_criarpedido",
    classinfomacao:"",
    axios:{
        rota_contagem:"/usuario/quantidade",
        metodo_contagem:"post",
        rota_dados:"/usuario/todos",
        metodo_dados:"post",
        filtragemestatica:[
            {"campo":"estado", "valor":"NORMAL"},
            {"campo":"qtdpagina", "valor":5},
            {"campo":"pagina", "valor":1}
        ],
        
        filtragemdinamica:[
            {"campo":"nome" , "tipagem":"STRING"},
            {"campo":"celular", "tipagem":"STRING"},
        ]
    },
    classNameConfigTabela:"",
    classNamePaginado:"",
    labelbuscar:"Buscar cliente",
    tabelacabecalho:['id', 'nome', 'contato'],
    tabeladados:['id', 'nome', 'telefone'],
    primeiracolunaoculta:false
} 
export default config;
