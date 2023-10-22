const index = (req, res) => {
    res.render("main/index", {
        msg: "ola, bem vindo",
    });
}

const about = (req, res) => {
    res.render("main/about", {
        title: "O jogo do dino chrome",
        paragraph: "T-Rex Game, também denominado Chrome Dino é um jogo integrado ao navegador Google Chrome. O jogo foi criado por Edward Jung, Sebastien Gabriel e Alan Bettes em 2014 como um ovo de páscoa que aparece quando estiver offline e fizer uma pesquisa no Google Chrome.",
        image: "img/dinoPhoto.jpg",
    });
}

const ui = (req, res) => {
    res.render("main/ui", {});
}

export default { index, about, ui };