export default (req, res, next)=>{
    if ( !res.locals.permissaoadm)
        return res.redirect('login');
    next();
}