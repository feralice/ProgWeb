(function () {
  const FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 0.5;
  const MINUTO = 60000;
  const MARGEM_ESPACO = 1;
  const velocidades = {
    cacto: 3,
    passaro: 5
  };
  const alturasPassaro = [20, 40, 120];
  const status = { correndo: 0, subindo: 1, abaixando: 2, abaixandoLentamente: 3 };
  const elementos = {};
  const intervalos = {
    criacaoObstaculo: 3000,
    trocarTurno: MINUTO,
    aumentarVelocidade: MINUTO
  };
  let ehDia = true;
  let gameLoop;
  let jogoIniciado = false;
  let jogoPausado = false;
  let nuvens = [];
  let ultimoObstaculoTempo = 0;
  let obstaculos = [];
  let frame = 0;
  let pontuacao = 0;

  function init() {
    criarElementos();
    setInterval(trocarTurno, intervalos.trocarTurno);
    setInterval(aumentarVelocidade, intervalos.aumentarVelocidade);
  }

  function criarElementos() {
    elementos.deserto = new Deserto();
    elementos.dino = new Dino();
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyP") {
      toggleJogoPausado();
    }

    if (!jogoPausado && (e.code === "Space" || e.code === "ArrowUp")) {
      iniciarJogo();
    } else if (!jogoPausado && e.code === "ArrowDown") {
      agacharDino();
    }
  });

  function toggleJogoPausado() {
    jogoPausado = !jogoPausado;

    if (jogoPausado) {
      clearInterval(gameLoop);
    } else if (jogoIniciado) {
      gameLoop = setInterval(run, 1000 / FPS);
    }
  }

  function iniciarJogo() {
    if (!jogoIniciado) {
      jogoIniciado = true;
      gameLoop = setInterval(run, 1000 / FPS);
    }

    elementos.dino.status = status.subindo;
  }

  function agacharDino() {
    if (!jogoPausado && elementos.dino.status === status.correndo) {
      elementos.dino.status = status.abaixando;
    }
  }

  class Deserto {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "deserto";
      this.element.style.width = `${WIDTH}px`;
      this.element.style.height = `${HEIGHT}px`;
      document.getElementById("game").appendChild(this.element);

      this.chao = document.createElement("div");
      this.chao.className = "chao";
      this.chao.style.backgroundPositionX = 0;
      this.element.appendChild(this.chao);
    }
    mover() {
      this.chao.style.backgroundPositionX = `${parseInt(
        this.chao.style.backgroundPositionX
      ) - 1}px`;
    }
  }

  class Dino {
    #status;
    constructor() {
      this.backgroundPositionsX = {
        correndo1: "-1391px",
        correndo2: "-1457px",
        pulando: "-1259px",
        abaixando: "-1652px",
        batendo: "-1590px",
      };
      this.#status = 0; // 0-correndo, 1-subindo, 2-descendo
      this.alturaMinima = 1;
      this.alturaMaxima = 160;
      this.element = document.createElement("div");
      this.element.className = "dino";
      this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
      this.element.style.backgroundPositionY = "-2px";
      this.element.style.bottom = `${this.alturaMinima}px`;
      this.elementoScore = document.createElement("div");
      this.elementoScore.className = "score";
      this.elementoScoreTexto = document.createElement("p");
      this.elementoScoreTexto.innerText = "00000";
      this.elementoScore.appendChild(this.elementoScoreTexto);
      elementos.deserto.element.appendChild(this.elementoScore);
      this.pontos = 0;
      elementos.deserto.element.appendChild(this.element);
    }
    /**
     * @param {number} value
     */
    set status(value) {
      if (value >= 0 && value <= 3) this.#status = value;
    }
    get status() {
      return this.#status;
    }
    correr() {
      //status 0 : correndo
      if (this.#status === 0 && frame % 20 === 0)
        this.element.style.backgroundPositionX =
          this.element.style.backgroundPositionX ===
          this.backgroundPositionsX.correndo1
            ? this.backgroundPositionsX.correndo2
            : this.backgroundPositionsX.correndo1;

      //status 1: pulando
      else if (this.#status === 1) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(this.element.style.bottom) + 1}px`;
        if (parseInt(this.element.style.bottom) >= this.alturaMaxima) {
          this.status = 3;
        }
      }

      //status 2 : abaixando
      else if (this.#status === 2) {
        this.element.style.backgroundPositionX =
          this.backgroundPositionsX.abaixando;
        this.element.style.width = "90px";
        this.element.style.height = "50px";
        this.element.style.bottom = `${parseInt(
          this.element.style.bottom
        ) - 0.1}px`;

        if (
          parseInt(this.element.style.bottom) <= this.alturaMinima &&
          frame === 1
        ) {
          this.element.style.width = "66px";
          this.element.style.height = "70px";
          this.status = 0;
          this.element.style.bottom = 0;
        }
      }

      // status 3 : abaixando lentamente do pulo
      else if (this.#status === 3) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(
          this.element.style.bottom
        ) - 0.1}px`;
        if (
          parseInt(this.element.style.bottom) <= this.alturaMinima &&
          frame === 1
        ) {
          this.status = 0;
          this.element.style.bottom = 0;
        }
      }
    }
  }

  class Nuvem {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "nuvem";
      this.element.style.right = 0;
      this.element.style.top = `${parseInt(Math.random() * 200)}px`;
      elementos.deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
    }
  }

  class Obstaculo {
    constructor(className) {
      this.element = document.createElement("div");
      this.element.className = className;
      this.element.style.right = 0;
      this.element.style.bottom = "-20px";
      elementos.deserto.element.appendChild(this.element);
    }

    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + velocidades.cacto}px`;
    }
  }

  class Cacto extends Obstaculo {
    constructor() {
      super("cactoUm");
      this.element.classList.add("cactoUm");
    }
  }
  
  class DoisCactos extends Obstaculo {
    constructor() {
      super("doisCactos");
      this.element.classList.add("doisCactos");
    }
  }
  
  class VariosCactos extends Obstaculo {
    constructor() {
      super("variosCactos");
      this.element.classList.add("variosCactos"); 
    }
  }

  class Passaro {
    constructor(altura) {
      this.backgroundPositionsX = {
        fechandoAsa: "-195px",
        abrindoAsa: "-261px",
      };

      this.element = document.createElement("div");
      this.element.className = "passaro";
      this.element.style.backgroundPositionX = this.backgroundPositionsX.fechandoAsa;
      this.element.style.bottom = `${altura}px`;
      this.element.style.width = "50px";
      this.element.style.height = "45px";
      this.element.style.right = "0px";
      this.abrindoAsa = false;
      elementos.deserto.element.appendChild(this.element);
    }

    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + velocidades.passaro}px`;
    }

    voar() {
      if (frame % 20 === 0) {
        this.abrindoAsa = !this.abrindoAsa;
        this.element.style.backgroundPositionX = this.abrindoAsa
          ? this.backgroundPositionsX.abrindoAsa
          : this.backgroundPositionsX.fechandoAsa;
      }
    }
  }

  function criarCacto() {
    obstaculos.push(new Cacto());
  }

  function criarDoisCactos() {
    obstaculos.push(new DoisCactos());
  }

  function criarVariosCactos() {
    obstaculos.push(new VariosCactos());
  }

  function run() {
    frame = (frame + 1) % FPS;

    if (!jogoPausado) {
      elementos.deserto.mover();
      elementos.dino.correr();
      if (Math.random() * 100 <= PROB_NUVEM) nuvens.push(new Nuvem());
      if (frame % 2 === 0) nuvens.forEach((nuvem) => nuvem.mover());

      const tempoAtual = Date.now();

      if (tempoAtual - ultimoObstaculoTempo > intervalos.criacaoObstaculo) {
        if (Math.random() * 100 <= PROB_NUVEM) {
          nuvens.push(new Nuvem());
        }
        if (Math.random() * 1000 <= 10 && frame % MARGEM_ESPACO === 0) {
          const obstacleType = Math.random() < 0.5 ? 'cacto' : 'passaro';

          if (obstacleType === 'cacto') {
            const cactoType = Math.floor(Math.random() * 3);
            if (cactoType === 0) {
              criarCacto();
            } else if (cactoType === 1) {
              criarDoisCactos();
            } else {
              criarVariosCactos();
            }
          } else {
            const alturaPassaro = alturasPassaro[Math.floor(Math.random() * 3)];
            const novoPassaro = new Passaro(alturaPassaro);
            obstaculos.push(novoPassaro);
            novoPassaro.voar();
          }
          ultimoObstaculoTempo = tempoAtual;
        }
      }

      // Atualiza a pontuação
      if (frame % 30 === 0) {
        pontuacao++;
        elementos.dino.elementoScoreTexto.innerText = String(pontuacao).padStart(5, '0');
      }

      if (frame % 10 === 0) {
        for (let i = obstaculos.length - 1; i >= 0; i--) {
          const obstaculo = obstaculos[i];
          obstaculo.mover();

          // Verifica se o obstáculo saiu da tela
          const obstaculoRect = obstaculo.element.getBoundingClientRect();
          if (obstaculoRect.right < 0) {
            // Remove o obstáculo do array usando shift e da DOM usando remove
            obstaculos.shift();
            obstaculo.element.remove();
          } else {
            if (colisao(elementos.dino, obstaculo)) {
              jogadorPerdeu();
              elementos.dino.element.style.backgroundPositionX = elementos.dino.backgroundPositionsX.batendo;
            }
            if (obstaculo instanceof Passaro) {
              obstaculo.voar();
            }
          }
        }
      }
    }
  }

  function colisao(dino, obstaculo) {
    const margem = 10;
    const dinoRect = dino.element.getBoundingClientRect();
    const obstaculoRect = obstaculo.element.getBoundingClientRect();

    // Calculate margins for collision detection
    const dinoLeft = dinoRect.left + margem;
    const dinoRight = dinoRect.right - margem;
    const dinoTop = dinoRect.top + margem;
    const dinoBottom = dinoRect.bottom - margem;

    const obstaculoLeft = obstaculoRect.left + margem;
    const obstaculoRight = obstaculoRect.right - margem;
    const obstaculoTop = obstaculoRect.top + margem;
    const obstaculoBottom = obstaculoRect.bottom - margem;

    const colisaoHorizontal = dinoRight > obstaculoLeft && dinoLeft < obstaculoRight;

    const colisaoVertical = dinoBottom > obstaculoTop && dinoTop < obstaculoBottom;

    if (colisaoHorizontal && colisaoVertical) {
      return true;  // Collision occurred
    }

    return false;  // No collision
  }

  function jogadorPerdeu() {
    const perdeuDiv = document.createElement("div");
    perdeuDiv.className = "perdeu";

    const restartDiv = document.createElement("div");
    restartDiv.className = "restart";

    document.querySelector(".deserto").appendChild(perdeuDiv);
    document.querySelector(".deserto").appendChild(restartDiv);
    clearInterval(gameLoop);
    document.querySelector(".restart").addEventListener("click", reiniciarJogo);
  }

  function reiniciarJogo() {
    clearInterval(gameLoop);
    jogoPausado = false;
    jogoIniciado = false;
    elementos.dino.status = status.correndo;
    frame = 0;
    pontuacao = 0;
    obstaculos.forEach((obstaculo) => obstaculo.element.remove());
    obstaculos = [];
    nuvens.forEach((nuvem) => nuvem.element.remove());
    nuvens = [];
    const restartDiv = document.querySelector(".restart");
    restartDiv.remove();
    const perdeuDiv = document.querySelector(".perdeu");
    perdeuDiv.remove();
    elementos.dino.element.style.bottom = 0;
    elementos.dino.element.style.backgroundPositionX = elementos.dino.backgroundPositionsX.pulando;
  }

  function trocarTurno() {
    ehDia = !ehDia;
    const quadradoJogo = document.querySelector('.deserto');
    quadradoJogo.style.backgroundColor = ehDia ? "white" : "black";

    const score = document.querySelector('.score');
    score.style.color = ehDia ? "black" : "white";
  }

  function aumentarVelocidade() {
    intervalos.criacaoObstaculo -= 100;
    velocidades.cacto++;
    velocidades.passaro++;
  }

  init();
})();