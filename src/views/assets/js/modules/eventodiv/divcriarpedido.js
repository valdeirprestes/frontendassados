const config = {
    className:"",
    axios:{
        rota:"/api/usuario",
        metodo:"get",
        filtragemestatica:[
            {"campo":"estado", "valor":"NORMAL"},
            {"campo":"qtdpagina", "valor":5}
        ],
        
        filtragemdinamica:[
            {"campo":"nome" , "tipagem":"STRING"},
            {"campo":"celular", "tipagem":"STRING"},
        ]
    },
    classNameConfigTabela:"",
    classNamePaginado:""
    
} 
export default config;
