import ValidLogin from "./modules/validform/ValidLogin";
import ValidUsuario from "./modules/validform/ValidUsuario";
import ValidProduto from "./modules/validform/ValidProduto";
import ValidCategoria from "./modules/validform/ValidCategoria";
import ValidDesativarUsuario from "./modules/validform/ValidDesativarUsuario";
import ValidDesativarProduto from "./modules/validform/ValidDesativarProduto";
import ValidEditarUsuario from "./modules/validform/ValidEditarUsuario";
import ValidEditarProduto from "./modules/validform/ValidEditarProduto";



import configCriarPedido from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedido";
import configCriarPedidoProduto from "./modules/eventosBuscaInterativa/criarperdido/configCriarPedidoProduto";



import { AtivarBuscaInterativa } from "./buscaInterativa";

window.addEventListener('load', (e)=>{

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



    const listValidForm = [];
    listValidForm.push([ValidLogin, ".class-form-login"]);
    listValidForm.push([ValidUsuario, ".class-form-usuario"]);
    listValidForm.push([ValidDesativarUsuario, ".class-form-deativarusuario"]);
    listValidForm.push([ValidEditarUsuario, ".class-form-editarusuario"]);
    listValidForm.push([ValidProduto, ".class-form-produto"]);
    listValidForm.push([ValidEditarProduto, ".class-form-editarproduto"]);
    listValidForm.push([ValidDesativarProduto, ".class-form-desativarproduto"]);
    listValidForm.push([ValidCategoria, ".class-form-categoria"]);
    listValidForm.forEach( (Validclasstr) =>{
        const [Valid, classtr] = Validclasstr
        const valid = new Valid(classtr);
        valid.init();
    });

    
    
});