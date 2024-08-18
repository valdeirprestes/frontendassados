import ValidLogin from "./modules/ValidLogin";
import ValidUsuario from "./modules/ValidUsuario";
import ValidDesativarUsuario from "./modules/ValidDesativarUsuario";
import ValidEditarUsuario from "./modules/ValidEditarUsuario";

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
});