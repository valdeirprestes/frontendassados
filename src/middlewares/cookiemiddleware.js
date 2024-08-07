
export default (req, res, next )=>{
    res.locals.user = req.session.user;

    if(res.locals.user)
    {    
        if(req.session.user.perfil == "ATENDENTE" || req.session.user.perfil == "ADM")
            res.locals.permissaoatendente = 1;
        else
            res.locals.permissaoatendente = null;

        
        if(req.session.user.perfil == "ADM")
            res.locals.permissaoadm= 1;
        else
            res.locals.permissaoadm= null;
    }
    else
    {
        res.locals.permissaoatendente = null;
        res.locals.permissaoadm= null;
    }
    next();

}