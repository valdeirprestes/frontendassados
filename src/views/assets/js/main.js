import ValidLogin from "./modules/validform/ValidLogin";
import ValidUsuario from "./modules/validform/ValidUsuario";
import ValidProduto from "./modules/validform/ValidProduto";
import ValidCategoria from "./modules/validform/ValidCategoria";
import ValidDesativarUsuario from "./modules/validform/ValidDesativarUsuario";
import ValidDesativarProduto from "./modules/validform/ValidDesativarProduto";
import ValidDesativarCategoria from "./modules/validform/ValidDesativarCategoria";
import ValidEditarUsuario from "./modules/validform/ValidEditarUsuario";
import ValidEditarProduto from "./modules/validform/ValidEditarProduto";
import ValidEditarCategoria from "./modules/validform/ValidEditarCategoria";




import configCriarPedido from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedido";
import configCriarPedidoProduto from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedidoProduto";
import { gestaopedido_registrarnovopedido } from "./modules/pagefunctions/gestaopedido_registrarpedido";
import gestaopedido_limparcamposcliente from "./modules/pagefunctions/gestaopedido_limparcamposcliente";


import { AtivarBuscaInterativa } from "./buscaInterativa";

window.addEventListener('load', (e)=>{
    /*  Cria dialogo de busca de seleção de objetos*/
    const listSearch = [];
    listSearch.push(configCriarPedido);
    listSearch.push(configCriarPedidoProduto);
    let botao;
    listSearch.forEach((objconfig)=>{
        let botao = document.querySelector(`.${objconfig.classBotao}`);
        if(botao)
        {
            botao.onclick = ()=> AtivarBuscaInterativa(objconfig);
        }
        else 
            console.log(`Classe ${objconfig.classBotao} não foi localizada`);
    });


    /*  Cria validação de formulários de busca de seleção de objetos*/
    const listValidForm = [];
    listValidForm.push([ValidLogin, ".class-form-login"]);
    listValidForm.push([ValidUsuario, ".class-form-usuario"]);
    listValidForm.push([ValidDesativarUsuario, ".class-form-deativarusuario"]);
    listValidForm.push([ValidEditarUsuario, ".class-form-editarusuario"]);
    listValidForm.push([ValidProduto, ".class-form-produto"]);
    listValidForm.push([ValidEditarProduto, ".class-form-editarproduto"]);
    listValidForm.push([ValidDesativarProduto, ".class-form-desativarproduto"]);
    listValidForm.push([ValidCategoria, ".class-form-categoria"]);
    listValidForm.push([ValidEditarCategoria, ".class-form-editarcategoria"]);
    listValidForm.push([ValidDesativarCategoria, ".class-form-desativarcategoria"]);
    listValidForm.forEach( (Validclasstr) =>{
        const [Valid, classtr] = Validclasstr
        const valid = new Valid(classtr);
        valid.init();
    });

    /*  liga funções ao elementos html com classe*/

    let listpagefunctions = [];
    listpagefunctions.push(["criar_criarpedido", "onclick", gestaopedido_registrarnovopedido]);
    listpagefunctions.push(["novo_criarpedido", "onclick", gestaopedido_limparcamposcliente]);
    
    listpagefunctions.forEach(Obj =>{
        const [ nameclass, stringevent, func ] = Obj;
        if(stringevent == "onclick"){
            let taghtml = document.querySelector(`.${nameclass}`);
            if(!taghtml)
                console.log(`Erro ao tentar acessar a class ${nameclass}`);
            else
                taghtml.onclick = ()=> func();
            
        }
        else if(stringevent == "onkeyup"){
            let taghtml = document.querySelector(`.${nameclass}`);
            if(!taghtml)
                console.log(`Erro ao tentar acessar a class ${nameclass}`);
            else
                taghtml.onkeyup = ()=> func();
            
        }
    });
});