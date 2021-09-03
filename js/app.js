let btn = document.querySelector('#criar-card');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    let secaoCards = document.querySelector('#secao-cards');
    let novoArtigo = document.createElement('article');
    novoArtigo.setAttribute("class", "card-item");
    let form = document.querySelector('#form-card');
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
            <div class="icone-paragrafro">

                <p>${form.descricao.value}</p>
            </div>


        </div>
    `
    form.titulo.value = "";
    form.descricao.value = "";
    form.urlImgCard.value = "";
    secaoCards.appendChild(novoArtigo);
})

