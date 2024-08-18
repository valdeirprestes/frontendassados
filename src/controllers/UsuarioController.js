import axiosconfig from "../config/axiosConfig";
import Axios from "axios";
class UsuarioController {
    cadastrar(req, res) {
        return res.render("cadastrousuarios");
    }
    async efetuarlogin(req, res) {
        return res.redirect("/login");
    }
    async listar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get('/usuario');
            //console.log("data", response.data);
            return res.render("listarusuarios", {"listausuario":response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async pesquisar(req, res) {
        try {
            const filter = req.body.nome;
            console.log("filter\n\n", filter);
            console.log("req.body\n\n", req.body);
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get('/usuario', {"nome":filter});
            //console.log("data", response.data);
            return res.render("listarusuarios", {"listausuario":response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async desativar(req, res) {
        try {
            console.log("id", req.params.id);
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/usuario/${req.params.id}`);
            console.log("data", response.data);
            //const response2 = await axios.put(`/usuario/${req.params.id}`,{   
                //"estado":"CANCELADO"
            //});
            return res.render("desativarusuario", {"usuario":response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async editar(req, res) {
        try {
            console.log("id", req.params.id);
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/usuario/${req.params.id}`);
            console.log("data", response.data);
            let {updated_at, ...resto} = response.data;
            let tmp = new Date(updated_at);
            updated_at = tmp.toLocaleString('pt-BR', { timezone: 'UTC-3'});
            const newdata = {updated_at, ...resto};

            return res.render("editarusuario", {"usuario":newdata});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
}
export default new UsuarioController();
