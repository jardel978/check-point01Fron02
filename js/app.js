//VARIÁVEIS:
let btn = document.querySelector('#criar-card');
let btnAbrirForm = document.querySelector('#btn-abrir-form');
let form = document.querySelector('#form-card');
let secaoCards = document.querySelector('#secao-cards');
const localStorageCards = JSON.parse(localStorage.getItem('meusCards'));
let meusCards = localStorage.getItem('meusCards') !== null ? localStorageCards : [];
const popup = document.querySelector('#pop-up');
const localStorageIdCards = JSON.parse(localStorage.getItem('idsCards'));
let indexCards = localStorage.getItem('idsCards') !== null ? localStorageIdCards : [];//array de ids para ligar lixeiras aos seu respectivos cards


//EVENTOS E MÉTODOS:
for (objCard of meusCards) {//leitura de itens no localStorage
    let novoArtigo = criarCard(objCard.titulo, objCard.descricao, objCard.urlImgCard, objCard.idCard);
    secaoCards.appendChild(novoArtigo);
}

const lixeiras = document.querySelectorAll('[data-click]');
lixeiras.forEach(el => el.addEventListener("click", (e) => {//para excluir cards
    let idLixeira = parseInt(el.id);//pegando o número do id que é o mesmo numero do index do card no array meusCards
    let indexCard = indexCards.indexOf(idLixeira);
    console.log(indexCard);
    let confirmacao = confirm("Você quer mesmo excluir esse card?");
    if (confirmacao) {
        popup.classList.remove('open');
        meusCards.splice(indexCard, 1);
        indexCards.splice(indexCard, 1);//removendo um elemento do indexCards para manter o sincronismo com o index de meusCards
        location.reload();

    } else
        e.stopPropagation();

    localStorage.setItem('meusCards', JSON.stringify(meusCards));//atualização do localStorage
    localStorage.setItem('idsCards', JSON.stringify(indexCards));//atualização do localStorage
}))


function criarCard(titulo, descricao, link, id) {
    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "section__card");
    novoArtigo.innerHTML =
        `
            <dir data-click id="${id}" class="section__card__lixeira">                   
                <img loading= "lazy" class="section__card__lixeira__img1" src="./midias/lixeira-de-reciclagem-tampa.png" alt="">                    
                <img loading= "lazy" class="section__card__lixeira__img2" src="./midias/lixeira-de-reciclagem-corpo.png" alt="">                
            </dir>
            <!-- img card -->
            <div id="imagem-card">
                <img loading= "lazy" class="imagem-card" src="${link}" alt="imagem">
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
    return novoArtigo;
}

const criarObj = () => {//função que cria obj com informações do card gerado para armazenar no localStorage
    let obj = {};
    obj.titulo = form.titulo.value;
    obj.descricao = form.descricao.value;
    obj.urlImgCard = form.urlImgCard.value;
    obj.idCard = idGenerator();
    return obj;
}

function idGenerator() {//função para gerar ids
    return Math.round(Math.random() * 1000);
}

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


btn.addEventListener('click', (e) => {//evento de click que cria um card
    e.preventDefault();

    if (form.titulo.value === '' || form.urlImgCard.value === '') {//alerta de campos vazios
        alert("Os campos de título e url não podem estar vazios!");
        return;
    }
    let objCard = criarObj();
    let novoArtigo = criarCard(objCard.titulo, objCard.descricao, objCard.urlImgCard, objCard.idCard);

    form.titulo.value = "";
    form.descricao.value = "";
    form.urlImgCard.value = "";

    indexCards.push(objCard.idCard);//adicionando o id gerado no array indexCards
    meusCards.push(objCard);//adicionando o obj com informações do card gerado (essas informações são recuperadas no carregamento da pagina para gerar cards salvos)
    localStorage.setItem('meusCards', JSON.stringify(meusCards));//atualização do localStorage
    localStorage.setItem('idsCards', JSON.stringify(indexCards));//atualização do localStorage
    secaoCards.appendChild(novoArtigo);
    location.reload();
})

let contador = 0;
btnAbrirForm.addEventListener('click', (e) => {
    contador++;
    e.preventDefault();
    if (contador % 2 == 0) {
        form.style.animation = "remover-form ease-in-out 0.3s forwards";
    }
    else {
        form.style.animation = "mostrar-form ease-in-out 0.3s forwards";
    }
})

popup.addEventListener("click", () => {
    popup.classList.remove('open');
    popup.removeChild(popup.firstChild);
})