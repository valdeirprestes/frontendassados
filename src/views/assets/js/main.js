import ValidLogin from "./modules/validform/ValidLogin";
import ValidUsuario from "./modules/validform/ValidUsuario";
import ValidDesativarUsuario from "./modules/validform/ValidDesativarUsuario";
import ValidEditarUsuario from "./modules/validform/ValidEditarUsuario";

window.addEventListener('load', (e)=>{
    const listValid = [];
    //adicione cada validador de formulário
    listValid.push([ValidLogin, ".class-form-login"]);
    listValid.push([ValidUsuario, ".class-form-usuario"]);
    listValid.push([ValidDesativarUsuario, ".class-form-deativarusuario"]);
    listValid.push([ValidEditarUsuario, ".class-form-editarusuario"]);
    listValid.forEach( (Validclasstr) =>{
        const [Valid, classtr] = Validclasstr
        let valid = new Valid(classtr);
        valid.init();
    });

    const listInteract = [];
    listInteract.push(["interact-criar-pedido"]);
});