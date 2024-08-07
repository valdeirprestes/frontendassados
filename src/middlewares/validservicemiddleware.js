export default (req, res, next)=>{
    if ( !res.locals.permissaoatendente )
        return res.redirect('/');
    next();
}