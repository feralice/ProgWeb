class Venda{
    constructor(id, quantidade, preco) {
        this.id = id;
        this.quantidade = quantidade;
        this.preco = preco;
    }

    getId() {
        return this.id;
    }

    getQuantidade() {
        return this.quantidade;
    }

    getPreco() {
        return this.preco;
    }

    setId(novoId) {
        this.id = novoId;
    }

    setQuantidade(novaquantidade){
        this.quantidade = novaquantidade;
    }

    setPreco(novoPreco) {
        this.preco = novoPreco
    }

    getValorTotal() {
        return (this.getQuantidade() * this.getPreco());
    }

}
//primeiro obj
const primeiraVenda = new Venda (1, 2, 50);
console.log(primeiraVenda.getValorTotal());

//segundo obj
const segundaVenda = new Venda (2, 5, 200);
console.log(segundaVenda.getValorTotal());

