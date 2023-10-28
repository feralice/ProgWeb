const index = (req, res) => {
    res.render("main/index", {
        title: "Olá, bem vindo",
        body: "Site feito para a matéria de programação web do curso engenharia de software",
        student: "Fernanda Alice Farias Duarte"
    });
}

const about = (req, res) => {
    res.render("main/about", {
        title: "O jogo do dino chrome",
        paragraph: "T-Rex Game[1][2], também denominado Chrome Dino[3] é um jogo integrado ao navegador Google Chrome.[4] O jogo foi criado por Edward Jung, Sebastien Gabriel e Alan Bettes em 2014[5] como um ovo de páscoa que aparece quando estiver offline e fizer uma pesquisa no Google Chrome.[6] Nesse momento, aparece uma imagem de um tiranossauro e, pressionando a barra de espaço, inicia-se o jogo. O T-Rex Game é jogado 270 milhões de vezes mensalmente (2018).[5]Durante o jogo, o T-Rex se move continuamente da esquerda para a direita em uma paisagem deserta em preto e branco, e o jogador tenta evitar os obstáculos que se aproximam, como cactos e pteranodontes, pulando ou agachando-se.[7] À medida que o jogo avança, a velocidade do jogo aumenta gradualmente até que o usuário bata em um obstáculo ou pterossauro, resultando em um fim de jogo instantâneo. Novos obstáculos aparecem quando você atinge 450 pontos: pterodáctilos e, desde maio de 2016, o modo noturno começa quando você atinge 700 pontos.[8] O esquema de cores muda conforme o jogo avança.[9][10] O jogo foi projetado para obter pontuações completas após aproximadamente 17 milhões de anos de jogo, dependendo de quanto tempo os tiranossauros existiram antes de morrer durante o evento de extinção Cretáceo-Paleogeno.[11]",
        image: "img/dinoPhoto.jpg",
    });
}
const ui = (req, res) => {
    res.render("main/ui", {});
}
const game = (req, res) => {
    res.render("main/game", {}); 
};

export default { index, about, ui, game };