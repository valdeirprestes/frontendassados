import axiosconfig from "../config/axiosConfig";
import Axios from "axios";
class UsuarioController {
    cadastrar(req, res) {
        return res.render("cadastrousuarios");
    }
    async efetuarlogin(req, res) {
        return res.redirect("/login");
    }
}
export default new UsuarioController();
