const inputs = document.querySelector('.inputs');
const dica = document.querySelector('.dica');
const resetBtn = document.querySelector('.resetar-btn');
const inputDigitacao = document.querySelector('.input-digitacao');
const tentativas = document.querySelector('.tentativas');
const letrasErradas = document.querySelector('.letrasErradas');

let palavra;
let tentativasMaximas;
let erros = [];
let corretas = [];

const palavraAleatoria = () => {
    let ObjetoPalavra = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    palavra = ObjetoPalavra.palavra;
    console.log(ObjetoPalavra);
    
    tentativasMaximas = 8;
    erros = [];
    corretas = [];

    letrasErradas.innerHTML = erros;
    dica.innerHTML = ObjetoPalavra.dica;
    tentativas.innerHTML = tentativasMaximas;

    let html = "";
    for (let index = 0; index < palavra.length; index++) {
        html+= `<input type="text" disabled>`;
    }

    inputs.innerHTML = html;
};

const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const iniciarJogo = (e) => {

    let letra = e.target.value;

    if (letra.match(/^[A-Za-zÀ-úà-ú]+$/) && !erros.includes(` ${letra}`)) {
        if(palavra.includes(letra))
        {
            for (let index = 0; index < palavra.length; index++) {
                if (palavra[index] === letra)
                {
                    corretas.push(letra);
                    inputs.querySelectorAll("input")[index].value = letra;
                }
                
            }
        }
        else
        {
            erros.push(` ${letra}`);
            tentativasMaximas--;
        }
        tentativas.innerHTML = tentativasMaximas;
        letrasErradas.innerHTML = erros;
    }

    inputDigitacao.value = "";

    setTimeout(() => {
        if(corretas.length === palavra.length)
        {
            alert("Parabéns, você acertou a palavra.");
            palavraAleatoria();
        }
        else if (tentativasMaximas < 1)
        {
            alert("Game over! você não possui mais tentativas.")

            for (let index = 0; index < palavra.length; index++) {
                inputs.querySelectorAll("input")[index].value = palavra[index];
                
            }
        }
    })

}

resetBtn.addEventListener('click', palavraAleatoria);
inputDigitacao.addEventListener('input', iniciarJogo);

document.addEventListener('keydown', () => {
    inputDigitacao.focus();
})
palavraAleatoria();