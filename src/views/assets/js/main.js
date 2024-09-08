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
import ValidMovimentoAbertura_formdata  from "./modules/validform/ValidMovimentoAbertura_formdata";
import ValidCancelarPedido from "./modules/validform/ValidCancelarPedido";
import ValidFinalizarPedido from "./modules/validform/ValidFinalizarPedido";




import configCriarPedido from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedido";
import configCriarPedidoProduto from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedidoProduto";
import configTelaEstoque_selecionar from "./modules/eventosBuscaInterativa/criarperdido/configTelaEstoque_selecionar";


import { gestaopedido_registrarnovopedido } from "./modules/pagefunctions/gestaopedido_registrarpedido";
import gestaopedido_limparcamposcliente from "./modules/pagefunctions/gestaopedido_limparcamposcliente";
import gestaopedido_cancelar from "./modules/pagefunctions/gestaopedido_cancelar";
import gestaopedido_alterarcampousuario from "./modules/pagefunctions/gestaopedido_alterarcampousuario";


import { AtivarBuscaInterativa } from "./buscaInterativa";
import GestaoPedido_carregarpedido from "./modules/pagefunctions/gestaopedido_carregarpedido";
import atendimento_busca_pedido from "./modules/pagefunctions/atendimento_busca_pedido";

import { ClassStatusProdutosPainelAtendimento } from "./modules/pagefunctions/atendimento_classeinitpainel";

window.addEventListener('load', (e)=>{
    /*  Cria dialogo de busca de seleção de objetos*/
    const listSearch = [];
    listSearch.push(configCriarPedido);
    listSearch.push(configCriarPedidoProduto);
    listSearch.push(configTelaEstoque_selecionar);
    let botao;
    listSearch.forEach((objconfig)=>{
        let botao = document.querySelector(`.${objconfig.classBotao}`);
        if(botao)
        {
            botao.onclick = ()=> AtivarBuscaInterativa(objconfig);
        }
    });


    /*  Inicializa uma função por uma classe - usado em telas de validação*/
    const listaJSClassePorHTMLClasse = [];
    listaJSClassePorHTMLClasse.push([ValidLogin, ".class-form-login"]);
    listaJSClassePorHTMLClasse.push([ValidUsuario, ".class-form-usuario"]);
    listaJSClassePorHTMLClasse.push([ValidDesativarUsuario, ".class-form-deativarusuario"]);
    listaJSClassePorHTMLClasse.push([ValidEditarUsuario, ".class-form-editarusuario"]);
    listaJSClassePorHTMLClasse.push([ValidProduto, ".class-form-produto"]);
    listaJSClassePorHTMLClasse.push([ValidEditarProduto, ".class-form-editarproduto"]);
    listaJSClassePorHTMLClasse.push([ValidDesativarProduto, ".class-form-desativarproduto"]);
    listaJSClassePorHTMLClasse.push([ValidCategoria, ".class-form-categoria"]);
    listaJSClassePorHTMLClasse.push([ValidEditarCategoria, ".class-form-editarcategoria"]);
    listaJSClassePorHTMLClasse.push([ValidDesativarCategoria, ".class-form-desativarcategoria"]);
    listaJSClassePorHTMLClasse.push([GestaoPedido_carregarpedido, ".produtoselecionadoparcial_criarpedido"]);
    listaJSClassePorHTMLClasse.push([ValidMovimentoAbertura_formdata, ".class-form_movimento_abrir_formdata"]);
    listaJSClassePorHTMLClasse.push([ValidCancelarPedido, ".class-form-cancelarpedido"]);
    listaJSClassePorHTMLClasse.push([ValidFinalizarPedido, ".class-form-finalizarpedido"]);
    listaJSClassePorHTMLClasse.push([ClassStatusProdutosPainelAtendimento, ""]);

    

    listaJSClassePorHTMLClasse.forEach( (Lista) =>{
        const [Classe, stringNameClasse] = Lista
        const instancia = new Classe(stringNameClasse);
        instancia.init();
    });

    /*  liga funções ao elementos html com classe*/

    let listpagefunctions = [];
    listpagefunctions.push(["criar_criarpedido", "onclick", gestaopedido_registrarnovopedido, {}]);
    listpagefunctions.push(["salvarpedido_criarpedido", "onclick", gestaopedido_registrarnovopedido, {}]);
    listpagefunctions.push(["novo_criarpedido", "onclick", gestaopedido_limparcamposcliente, {}]);
    //remover
    /*listpagefunctions.push(["cancelarpedido_criarpedido", "onclick", gestaopedido_cancelar, {}]);*/
    
    listpagefunctions.push(["dadosusuario_nome", "onkeyup", gestaopedido_alterarcampousuario, {}]);
    listpagefunctions.push(["dadosusuario_email", "onkeyup", gestaopedido_alterarcampousuario, {}]);
    listpagefunctions.push(["dadosusuario_telefone", "onkeyup", gestaopedido_alterarcampousuario, {}]);
    listpagefunctions.push(["dadosusuario_celular", "onkeyup", gestaopedido_alterarcampousuario, {}]);
    listpagefunctions.push(["dadosusuario_logradouro", "onkeyup", gestaopedido_alterarcampousuario, {}]);
    listpagefunctions.push(["dadosusuario_numero", "onkeyup", gestaopedido_alterarcampousuario, {}]);
    listpagefunctions.push(["dadosusuario_municipio", "onkeyup", gestaopedido_alterarcampousuario, {}]); 
    
    listpagefunctions.push(["js_atendimento_campo_comentrega", "onchange", atendimento_busca_pedido, {}]);
    listpagefunctions.push(["js_atendimento_campo_sementrega", "onchange", atendimento_busca_pedido, {}]);
    listpagefunctions.push(["js_atendimento_campo_estadonormal", "onchange", atendimento_busca_pedido, {}]);
    listpagefunctions.push(["js_atendimento_campo_estadocancelado", "onchange", atendimento_busca_pedido, {}]);
    listpagefunctions.push(["js_atendimento_campo_fase_concluido", "onchange", atendimento_busca_pedido, {}]);
    listpagefunctions.push(["js_atendimento_campo_busca", "onkeyup", atendimento_busca_pedido, {}]);
    listpagefunctions.forEach(Obj =>{
        const [ nameclass, stringevent, func, params ] = Obj;
        if(stringevent == "onclick"){
            let taghtml = document.querySelector(`.${nameclass}`);
            if(!taghtml);
                //console.log(`Erro ao tentar acessar a class ${nameclass}`);
            else
                taghtml.onclick = ()=> func(params);
            
        }
        else if(stringevent == "onkeyup"){
            let taghtml = document.querySelector(`.${nameclass}`);
            if(!taghtml);
                //console.log(`Erro ao tentar acessar a class ${nameclass}`);
            else
                taghtml.onkeyup = ()=> func(params);
            
        }
        else if(stringevent == "onchange"){
            let taghtml = document.querySelector(`.${nameclass}`);
            if(!taghtml);
                //console.log(`Erro ao tentar acessar a class ${nameclass}`);
            else
                taghtml.onchange = ()=> func(params);
            
        }
    });


});