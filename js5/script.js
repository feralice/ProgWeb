document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const alturasInputs = form.querySelectorAll(".barraInput");
    const largura = document.getElementById("larg");
    const colunas = document.querySelectorAll(".barras");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        colunas.forEach((column, index) => {
            column.style.height = alturasInputs[index].value + "px";
            column.style.width = largura.value + "px";
        });
    });
});
