class IntegerSet {
    constructor(numMax) {
        this.numMax = numMax;
        //inicializa todos os elementos com falso
        this.vetor = new Array(numMax + 1).fill(false);
    }

    insercao(num) {
        if(num >= 0 && num <= this.numMax) {
            this.vetor[num] = true;
        }
    }

    exclusao(num) {
        if(num >= 0 && num <= this.numMax) {
            this.vetor[num] = false;
        }
    }

    uniao(outroConjunto) {
        const uniaoConjuntos = new IntegerSet(this.numMax);

        for(let i = 0; i<=this.numMax; i++) {
            uniaoConjuntos.vetor[i] = this.vetor[i] || outroConjunto.vetor[i];
        }

        return uniaoConjuntos;
    }

    intersecao(outroConjunto) {
        const intersecaoConjuntos = new IntegerSet(this.numMax);

        for(let i = 0; i<=this.numMax; i++) {
            intersecaoConjuntos.vetor[i] = this.vetor[i] && outroConjunto.vetor[i];
        }

        return intersecaoConjuntos;
    }

    diferenca(outroConjunto) {
        const diferencaConjuntos = new IntegerSet(this.numMax);

        for(let i = 0; i<=this.numMax; i++) {
            diferencaConjuntos.vetor[i] = this.vetor[i] && !outroConjunto.vetor[i];
        }

        return diferencaConjuntos;
    }

    converteString() {
        const elementos = [];

        for(let i = 0; i<=this.numMax; i++) {
            if(this.vetor[i]){
                elementos.push(i);
            }
        }
        return elementos;
    }
}

//testes
const conjunto1 = new IntegerSet(10);
conjunto1.insercao(3);
conjunto1.insercao(7);
conjunto1.insercao(9);
console.log("Conjunto 1:", conjunto1.converteString());

const conjunto2 = new IntegerSet(10);
conjunto2.insercao(2);
conjunto2.insercao(5);
conjunto2.insercao(7);
console.log("Conjunto 2:", conjunto2.converteString());

const uniao = conjunto1.uniao(conjunto2);
console.log("União:", uniao.converteString());

const intersecao = conjunto1.intersecao(conjunto2);
console.log("Interseção:", intersecao.converteString());

const diferenca = conjunto1.diferenca(conjunto2);
console.log("Diferença:", diferenca.converteString());
