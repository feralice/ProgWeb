const models = require("../models/index");
const Curso = models.Curso;


const index = async(req, res) => {
    const cursos = await Curso.findAll();
    res.render("curso/index", {
        cursos: cursos.map((curso) => curso.toJSON())
    });
};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render("curso/create");
    } else {
        try {
            console.log("Adicionando curso");
            await Curso.create(req.body);
            res.redirect("/curso");
        } catch (e) {
            console.log(e);
        }
    }
};


const read = async(req, res) => {
    const id = req.params.id;
    const curso = await Curso.findOne({where:{id}});
    res.render("curso/read", {
        curso: curso.toJSON(),
    })
};

const update = (req, res) => {};

const remove = (req, res) => {

};

module.exports = {index, create, update, remove, read};