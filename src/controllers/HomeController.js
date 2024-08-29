class HomeController{
    index (req, res){

        res.status(200).redirect("/atendimento");
    }
}
export default new HomeController();