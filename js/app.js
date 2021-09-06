//VARIÁVEIS:
let btn = document.querySelector('#criar-card');
let btnAbrirForm = document.querySelector('#btn-abrir-form');
let form = document.querySelector('#form-card');
let secaoCards = document.querySelector('#secao-cards');
const localStorageCards = JSON.parse(localStorage.getItem('meusCards'));
let meusCards = localStorage.getItem('meusCards') !== null ? localStorageCards : [];
const popup = document.querySelector('#pop-up');


//EVENTOS E MÉTODOS:

// window.addEventListener('load', () => {//carregamento da janela
    console.log(meusCards)
    for (objCard of meusCards) {//leitura de itens no localStorage
        const titulo = objCard.titulo;
        const descricao = objCard.descricao;
        const url = objCard.urlImgCard;

        let novoArtigo = document.createElement('article');
        novoArtigo.setAttribute("class", "section__card");
        novoArtigo.innerHTML =
            `      
            <dir data-click class="section__card__lixeira">                   
                <img class="section__card__lixeira__img1" src="./midias/lixeira-de-reciclagem-tampa.png" alt="">                    
                <img class="section__card__lixeira__img2" src="./midias/lixeira-de-reciclagem-corpo.png" alt="">                
            </dir>
            <!-- img card -->
            <div id="imagem-card">
                <img class="imagem-card" src="${url}" alt="imagem">
            </div>
            <div class="conteudo-card">
                <!-- título -->
                <div>
                    <p>${titulo}</p>
                </div>
                <!-- descrição -->
                <div>
                    <p class="section__paragrafo">${descricao}</p>
                </div>
            </div>
        `
        secaoCards.appendChild(novoArtigo);
    }

    // const lixeiras = document.querySelectorAll('[data-click]');
    // lixeiras.forEach(el => el.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     let parent = el.parentElement;
    //     // console.log(parent.children[1].children[0].src);
    //     let objCard = criarObj();
    //         objCard.titulo = parent.children[2].children[0].children[0].textContent;
    //         objCard.descricao = parent.children[2].children[1].children[0].textContent;
    //         objCard.urlImgCard = parent.children[1].children[0].src;

    //     const index = meusCards.indexOf(objCard.titulo);
    //     console.log(index);
    //     console.log(meusCards[0]);
    //     console.log(objCard);
    //     // console.log(objCard == meusCards[0]);
    //     // if(index != -1) {
    //     //     let confirmacao = confirm("Você quer mesmo excluir esse card?");
    //     //     if(confirmacao)
    //     //         meusCards.splice(index, 1);
    //     // }
    // }))

    let cards = document.querySelectorAll('.section__card');//evento de click para popup
    cards.forEach(el => el.addEventListener("click", (e) => {
        e.preventDefault();
        popup.classList.add('open');
        const clone = el.cloneNode(true);
        const paragrafo = clone.children[2].children[1].children[0];
        clone.children[0].style.display = "none";
        paragrafo.classList.remove('section__paragrafo');
        clone.children[2].children[1].classList.add('section__card__box__paragrafo');
        popup.appendChild(clone);
    }))
// })

const criarObj = () => {//função que cria obj com informações do card gerado para armazenar no localStorage
    let obj = {};
    obj.titulo = form.titulo.value
    obj.descricao = form.descricao.value
    obj.urlImgCard = form.urlImgCard.value
    return obj;
}

btn.addEventListener('click', (e) => {//evento de click que cria um card
    e.preventDefault();
    let objCard = criarObj();
    if (form.titulo.value === '' || form.urlImgCard.value === '') {//alerta de campos vazios
        alert("Os campos de título e url não podem estar vazios!")
        return
    }

    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "section__card");
    novoArtigo.innerHTML =
        `
        <dir data-click class="section__card__lixeira">                   
            <img class="section__card__lixeira__img1" src="./midias/lixeira-de-reciclagem-tampa.png" alt="">                    
            <img class="section__card__lixeira__img2" src="./midias/lixeira-de-reciclagem-corpo.png" alt="">                
        </dir>
        <!-- img card -->
        <div id="imagem-card">
            <img class="imagem-card" src="${objCard.urlImgCard}" alt="imagem">
        </div>
        <div class="conteudo-card">
            <!-- título -->
            <div>
                <p>${objCard.titulo}</p>
            </div>
            <!-- descrição -->
            <div>
                <p class="section__paragrafo">${objCard.descricao}</p>
            </div>
        </div>
    `
    form.titulo.value = "";
    form.descricao.value = "";
    form.urlImgCard.value = "";

    meusCards.push(objCard);//adicionando o obj com informações do card gerado (essas informações são recuperadas no carregamento da pagina para gerar cards salvos)
    localStorage.setItem('meusCards', JSON.stringify(meusCards));//atualização do localStorage
    secaoCards.appendChild(novoArtigo);
    location.reload();
})

let contador = 0;
btnAbrirForm.addEventListener('click', (e) => {
    contador++;
    e.preventDefault();
    if (contador % 2 == 0) {
        form.style.animation = "remover-form ease-in-out 2s forwards";
    }
    else {
        form.style.animation = "mostrar-form ease-in-out 2s forwards";
    }
})


popup.addEventListener("click", () => {
    popup.classList.remove('open');
    popup.removeChild(popup.firstChild);
})