const models = require("../models/index");
const Curso = models.Curso;
const Area = models.Area;


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

    try {
        const curso = await Curso.findByPk(id, {include:Area});
        res.render("curso/read", {
            curso: curso.toJSON(),
        })
    } catch(e) {
        console.log(e);
    }
};

const update = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await Curso.findByPk(id);

        if (!curso) {
            res.status(404).send("Curso não encontrado");
            return;
        }

        curso.sigla = req.body.sigla;
        curso.nome = req.body.nome;
        curso.areaId = req.body.areaId;

        await curso.save();

        res.redirect(`/curso/${id}`);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao atualizar o curso");
    }
};

const remove = async(req, res) => {
    const { id } = req.params;

    try{
        await Curso.destroy({where: {id:id}});
        res.send("Curso apagado com sucesso :D");
    } catch(e) {
        console.log(e);
        res.status(500).send(e);

    }
    
};

module.exports = { index , create, update, remove, read };