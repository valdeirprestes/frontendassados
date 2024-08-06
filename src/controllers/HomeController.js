class HomeController{
    index (req, res){
        console.log("res.locals.user", res.locals.users);
        res.render('home');
        
    }
}

export default new HomeController();