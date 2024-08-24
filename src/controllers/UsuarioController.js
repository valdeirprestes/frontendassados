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
            const response = await axios.post('/usuario/todos', {
                "qtdpagina":10,
                "pagina":req.params.pagina
            });
            const response2 = await axios.post('/usuario/quantidade');
            const quantidade = response2.data.quantidade
            let qtdepaginas = quantidade/10;
            qtdepaginas = Math.ceil(qtdepaginas);
            
            return res.render("listarusuarios", {"listausuario":response.data, "qtdepaginas":qtdepaginas});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async pesquisar(req, res) {
        try {
            const filter = {"nome":req.body.nome, "qtdpagina":10, "pagina":req.params.pagina};
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.post('/usuario/todos', filter);

            const response2 = await axios.post('/usuario/quantidade', {"nome":req.body.nome});
            const quantidade = response2.data.quantidade
            let qtdepaginas = quantidade/10;
            qtdepaginas = Math.ceil(qtdepaginas);
            return res.render("pesquisarusuarios", {"listausuario":response.data, "qtdepaginas":qtdepaginas, "nome":req.body.nome});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async desativar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/usuario/${req.params.id}`);
            return res.render("desativarusuario", {"usuario":response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async editar(req, res) {
        try {
            //console.log("id", req.params.id);
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/usuario/${req.params.id}`);
            //console.log("data", response.data);
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
