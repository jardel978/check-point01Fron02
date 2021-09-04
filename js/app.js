//variáveis:
let btn = document.querySelector('#criar-card');
let btnAbrirForm = document.querySelector('#btn-abrir-form');
let form = document.querySelector('#form-card');
let secaoCards = document.querySelector('#secao-cards');
// let meusCards = JSON.parse(localStorage.getItem('meusCards')) || [];

//métodos e funções
btn.addEventListener('click', (e) => {
    e.preventDefault();
    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "section__card");
    novoArtigo.innerHTML =
        `
        <!-- img card -->
        <div id="imagem-card">
            <img class="imagem-card" src="${form.urlImgCard.value}" alt="imagem">
        </div>
        <div class="conteudo-card">
            <!-- título -->
            <div>
                <p>${form.titulo.value}</p>
            </div>
            <!-- descrição -->
            <div>
                <p class="section__paragrafro">${form.descricao.value}</p>
            </div>
        </div>
    `
    form.titulo.value = "";
    form.descricao.value = "";
    form.urlImgCard.value = "";

    // meusCards.push(novoArtigo);
    // localStorage.setItem('meusCards', JSON.stringify(meusCards));
    secaoCards.appendChild(novoArtigo);
    // console.log(meusCards)
})

let contador = 0;
btnAbrirForm.addEventListener('click', (e) => {
    contador++;
    e.preventDefault();
    if (contador % 2 == 0) {
        form.style.animation = "remover-form ease-in-out 2s forwards"
    }
    else {
        form.style.animation = "mostrar-form ease-in-out 2s forwards"
    }
})




// const popup = document.querySelector('#pop-up');
// let cards = secaoCards.children;

// let arrayCards = Array.from(cards);
// console.log(arrayCards)

// for(let i = 0; i < cards.length; i++) {
//     let item = cards[i];
//     arrayCards.push(item);
// }



// secaoCards.onmouseover = () => {

//     arrayCards.forEach(el => el.addEventListener("click", (e) => {
//     popup.classList.add('open');
//     popup.innerHTML = el.textContent;
//     const img = document.createElement('img');
//     img.src = e.target.src;
//     el.style.transform = "scale(1.3)"
//     popup.appendChild(el);
// }))
// }

// popup.addEventListener("click", () => {
//     arrayCards.forEach
//     popup.children['article'].id.style.transform = "scale(1)";
//     popup.classList.remove('open');
// })
// console.log(cards);



// secaoCards.onmouseover = () => {
//     document.querySelectorAll('.section__card').forEach(el => el.addEventListener("click", (e) => {
//     e.preventDefault();
//     let urlImg = document.querySelector('.imagem-card');
//     let title = document.querySelector('.card_title');
//     let paragrafo = document.querySelector('.section__paragrafro');

//     popup.classList.add('open');
//     popup.innerHTML =     
//     `<article class="section__card">
//     <!-- img card -->
//     <div id="imagem-card">
//         <img class="imagem-card" src="${urlImg.value}" alt="imagem">
//     </div>
//     <div class="conteudo-card">
//         <!-- título -->
//         <div>
//             <p>${title.value}</p>
//         </div>
//         <!-- descrição -->
//         <div>
//             <p class="section__paragrafro">${paragrafo.value}</p>
//         </div>
//     </div>
//     </article>
// `;
//     // el.style.transform = "scale(1.3)"
//     // console.log(el)
// }))
// }

// popup.addEventListener("click", () => {
//     popup.removeChild(popup.firstChild);
//     popup.classList.remove('open');
// })
