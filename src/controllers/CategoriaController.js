import axiosconfig from "../config/axiosConfig";
import Axios from "axios";
class CategoriaController {
    criar(req, res) {
        return res.render("criarcategoria");
    }
    async efetuarcadastro(req, res) {
        return res.redirect("/");
    }
    async listar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.post('/categorias/todos', {
                "estado":"NORMAL",
                "qtdpagina":10,
                "pagina":req.params.pagina
            });
            const response2 = await axios.post('/categorias/quantidade');
            const quantidade = response2.data.quantidade
            let qtdepaginas = quantidade/10;
            qtdepaginas = Math.ceil(qtdepaginas);
            //console.log("data", response.data.errors);
            return res.render("listarcategorias", {"listacategorias":response.data, "qtdepaginas":qtdepaginas});
        } catch (e) {
            console.log(e.data);
            return res.redirect('notfound404');
        }
    }
    async editar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/categorias/${req.params.id}`);
            //console.log("data", response.data);
            let {updated_at, ...resto} = response.data;
            let tmp = new Date(updated_at);
            updated_at = tmp.toLocaleString('pt-BR', { timezone: 'UTC-3'});
            const newdata = {updated_at, ...resto};

            return res.render("editarcategoria", {"categoria":newdata});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async desativar(req, res) {
        try {
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.get(`/categorias/${req.params.id}`);
            console.log(response);
            return res.render("desativarcategoria", {"categoria":response.data});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
    async pesquisar(req, res) {
        try {
            const filter = {"nome":req.body.nome, "qtdpagina":10, "pagina":req.params.pagina};
            const axios = Axios.create(axiosconfig.configcontroller(req, res));
            const response = await axios.post('/categorias/todos', filter);

            const response2 = await axios.post('/categorias/quantidade', {"nome":req.body.nome});
            const quantidade = response2.data.quantidade
            let qtdepaginas = quantidade/10;
            qtdepaginas = Math.ceil(qtdepaginas);
            return res.render("pesquisarcategorias", {"listacategorias":response.data, "qtdepaginas":qtdepaginas, "nome":req.body.nome});
        } catch (e) {
            console.log(e);
            return res.redirect('notfound404');
        }
    }
}
export default new CategoriaController();
