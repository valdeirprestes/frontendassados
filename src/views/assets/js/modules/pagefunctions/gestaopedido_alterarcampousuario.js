const classAlteracaoUsuario = "alterar_dados_usuario"


function gestaopedido_alterarcampousuario(objparametros){
    let tagspan = document.querySelector(`.${classAlteracaoUsuario}`);
    if(!tagspan)
    {
        console.log(`Não conseguiu acessar a class ${classAlteracaoUsuario}`);
        return;
    }
    tagspan.innerText = 1;
}

export default gestaopedido_alterarcampousuario;