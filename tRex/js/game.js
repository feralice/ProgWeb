(function () {
  const FPS = 300;
  const HEIGHT = 300;
  const WIDTH = 1024;
  const PROB_NUVEM = 0.5;
  const MINUTO = 60000;
  const AUMENTO_FPS_POR_MINUTO = 100;
  const MARGEM_ESPACO = 1; 

  let ehDia = true;
  let gameLoop;
  let jogoIniciado = false;
  let jogoPausado = false;
  let deserto;
  let dino;
  let nuvens = [];
  let intervaloCriacaoObstaculo = 100;
  let ultimoObstaculoTempo = 0;
  let obstaculos = [];
  let frame = 0;
  let pontuacao= 0;

  function init() {
    deserto = new Deserto();
    dino = new Dino();
    setInterval(trocarTurno, MINUTO);
    setInterval(aumentarVelocidade, MINUTO);
  }

  // keydown é tecla pressionada
  window.addEventListener("keydown", (e) => {

    if (e.code === "KeyP") {
      jogoPausado = !jogoPausado;
      if (!jogoPausado) {
        gameLoop = setInterval(run, 1000 / FPS);
      } else {
        clearInterval(gameLoop);
      }
    }
    if (e.code === "Space" || e.code === "ArrowUp") {
      if(!jogoIniciado) {
        jogoIniciado = true;
        gameLoop = setInterval(run, 1000 / FPS);
      }

      if (dino.status === 0) dino.status = 1;

    } else if (e.code === "ArrowDown") {
      if (dino.status === 0) dino.status = 2;
    } else if (e.code === "KeyP") {
      jogoIniciado = false;
    }
  });

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
      this.chao.style.backgroundPositionX = `${parseInt(this.chao.style.backgroundPositionX) - 1}px`;
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
      };
      this.#status = 0; // 0-correndo, 1-subindo, 2-descendo
      this.alturaMinima = 1;
      this.alturaMaxima = 200;
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
      deserto.element.appendChild(this.elementoScore);
      this.pontos = 0;
      deserto.element.appendChild(this.element);
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

      //status 2 : abaixando
      } else if (this.#status === 2) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.abaixando;
        this.element.style.width = "90px";
        this.element.style.bottom = `${parseInt(this.element.style.bottom) - 0.1}px`;

        if (parseInt(this.element.style.bottom) <= this.alturaMinima && frame === 1) {
          this.element.style.width = "66px";
          this.status = 0;
          this.element.style.bottom = 0;
        }

      // status 3 : abaixando lentamente do pulo
      } else if (this.#status === 3) {
        this.element.style.backgroundPositionX = this.backgroundPositionsX.pulando;
        this.element.style.bottom = `${parseInt(this.element.style.bottom) - 0.1}px`;
        if (parseInt(this.element.style.bottom) <= this.alturaMinima && frame === 1) {
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
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 1}px`;
    }
  }

  class Cacto {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "cacto1";
      this.element.style.right = 0;
      this.element.style.bottom = "-20px";
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 3}px`;
    }
  }

  class DoisCactos {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "doisCactos";
      this.element.style.right = 0;
      this.element.style.bottom = "-20px";
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 3}px`;
    }
  }

  class VariosCactos {
    constructor() {
      this.element = document.createElement("div");
      this.element.className = "variosCactos";
      this.element.style.right = 0;
      this.element.style.bottom = "-20px";
      deserto.element.appendChild(this.element);
    }
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 3}px`;
    }
  }

  class Passaro {
    constructor() {
      this.backgroundPositionsX = {
        fechandoAsa: "-195px",
        abrindoAsa: "-261px",
      };
  
      this.element = document.createElement("div");
      this.element.className = "passaro";
      this.element.style.backgroundPositionX = this.backgroundPositionsX.fechandoAsa;
      this.element.style.bottom = "60px";
      this.element.style.width = "50px";
      this.element.style.height = "50px";
      this.element.style.right = "0px";
      this.abrindoAsa = false;
      deserto.element.appendChild(this.element);
    }
  
    mover() {
      this.element.style.right = `${parseInt(this.element.style.right) + 10}px`;
    }
  
    voar() {
      //alterar as fotos do passaro
      if (frame % 20 === 0) {
        this.abrindoAsa = !this.abrindoAsa;
  
        this.element.style.backgroundPositionX =
          this.abrindoAsa
            ? this.backgroundPositionsX.abrindoAsa
            : this.backgroundPositionsX.fechandoAsa;
      }
    }
  }

  function run() {
    frame = frame + 1;
    if (frame === FPS) frame = 0;
    if (!jogoPausado) {
      deserto.mover();
      dino.correr();
      if (Math.random() * 100 <= PROB_NUVEM) nuvens.push(new Nuvem());
      if (frame % 2 === 0) nuvens.forEach(nuvem => nuvem.mover());
      const tempoAtual = Date.now();

      if (tempoAtual - ultimoObstaculoTempo > intervaloCriacaoObstaculo) {
        if (Math.random() * 100 <= PROB_NUVEM) {
          nuvens.push(new Nuvem());
        }
        if (Math.random() * 1000 <= 10) {

          if (frame % MARGEM_ESPACO === 0) {
            const obstacleType = Math.random() < 0.5 ? 'cacto' : 'passaro';

          if (obstacleType === 'cacto') {
            const cactoType = Math.floor(Math.random() * 3);
            if (cactoType === 0) {
              obstaculos.push(new Cacto());
            } else if (cactoType === 1) {
              obstaculos.push(new DoisCactos());
            } else {
              for (let i = 0; i < 3; i++) {
                obstaculos.push(new VariosCactos());
              }
            }
          } else {
            const novoPassaro = new Passaro();
            obstaculos.push(novoPassaro);
            novoPassaro.voar();
          }
          ultimoObstaculoTempo = tempoAtual;
        }
      }
    }

    //atualiza a pontuacao
    if (frame % 30 === 0) {
      pontuacao++;
      dino.elementoScoreTexto.innerText = String(pontuacao).padStart(5, '0');
    }
  }

  if (frame % 10 === 0) {
    obstaculos.forEach((obstaculo) => {
      obstaculo.mover();
      if (colisao(dino, obstaculo)) {
        jogadorPerdeu();
      }
      if (obstaculo instanceof Passaro) {
        obstaculo.voar();
      }
    });
  }

  function colisao(dino, obstaculo) {
    const margem = 10; // Margem de segurança
    const dinoRect = dino.element.getBoundingClientRect();
    const obstaculoRect = obstaculo.element.getBoundingClientRect();
  
    return (
      dinoRect.right - margem > obstaculoRect.left &&
      dinoRect.left + margem < obstaculoRect.right &&
      dinoRect.bottom - margem > obstaculoRect.top &&
      dinoRect.top + margem < obstaculoRect.bottom 
    );
  }

  function jogadorPerdeu() {
    const perdeuDiv = document.createElement("div");
    perdeuDiv.className = "perdeu";

    const restartDiv = document.createElement("div");
    restartDiv.className = "restart";

    document.querySelector('.deserto').appendChild(perdeuDiv);
    document.querySelector('.deserto').appendChild(restartDiv);
    clearInterval(gameLoop);
    document.querySelector(".restart").addEventListener("click", reiniciarJogo);
  }

  function reiniciarJogo() {
    // Reset game state
  clearInterval(gameLoop);
  jogoPausado = false;
  jogoIniciado = false;
  dino.status = 0;
  frame = 0;
  pontuacao = 0;
  // Clear any existing obstacles or clouds
  obstaculos.forEach((obstaculo) => obstaculo.element.remove());
  obstaculos = [];
  nuvens.forEach((nuvem) => nuvem.element.remove());
  nuvens = [];
  // Restart the game

  const restartDiv = document.querySelector(".restart");
  restartDiv.remove();
  const perdeuDiv = document.querySelector(".perdeu");
  perdeuDiv.remove();

}
  
}

//mudar a cor de fundo
  function trocarTurno() {
    ehDia = !ehDia;
    const quadradoJogo = document.querySelector('.deserto');
    quadradoJogo.style.backgroundColor = ehDia ? "white" : "black";

    const score = document.querySelector('.score');
    score.style.color = ehDia ? "black" : "white";
  }

  function aumentarVelocidade() {
    // Aumenta o FPS a cada 1 min
    FPS += AUMENTO_FPS_POR_MINUTO;
    clearInterval(gameLoop); 
    gameLoop = setInterval(run, 1000 / FPS); 
  }

  init();
})();