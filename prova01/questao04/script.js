const retangulo = document.getElementById('div');
const botaoVerde = document.getElementById('botao1');
const botaoVermelho = document.getElementById('botao2');
const botaoAzul = document.getElementById('botao3');
const botaoReset = document.getElementById('botao4');

botaoVerde.addEventListener("click", function(){
    retangulo.style.backgroundColor = "green";
});

botaoVermelho.addEventListener("click", function(){
    retangulo.style.backgroundColor = "red";
});

botaoAzul.addEventListener("click", function(){
    retangulo.style.backgroundColor = "blue";
});

botaoReset.addEventListener("click", function(){
    retangulo.style.backgroundColor = "white";
});
