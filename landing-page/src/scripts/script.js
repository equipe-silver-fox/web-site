// Array global para armazenar todos os pets carregados da API
let allPets = [];

/**
 * Embaralha um array usando o algoritmo Fisher-Yates.
 * @param {Array} array - O array a ser embaralhado.
 * @returns {Array} O array embaralhado.
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // Enquanto ainda houver elementos para embaralhar
    while (currentIndex !== 0) {
        // Seleciona um elemento restante aleatoriamente
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // Troca o elemento atual pelo elemento aleatório
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Busca a lista de pets da API e exibe na tela.
 * Armazena os dados globalmente e mostra 4 pets aleatórios.
 */
function fetchPets() {
    fetch('/api/pets')
        .then(response => response.json())
        .then(data => {
            window.petsData = data;  // Salva os dados dos pets em uma variável global
            allPets = data;          // Atualiza o array global com todos os pets
            displayPets(data);       // Exibe todos os pets na tela inicialmente
            showRandomPets();        // Mostra 4 pets aleatórios
        })
        .catch(err => console.error('Erro ao carregar os pets:', err));
}

/**
 * Exibe uma lista de pets na tela, criando cards para cada pet.
 * @param {Array} pets - Array de objetos pet a serem exibidos.
 */
function displayPets(pets) {
    const petsListContainer = document.getElementById('pets-list');
    petsListContainer.innerHTML = ""; // Limpa o container antes de exibir
    // Aplica estilos flexbox ao container para layout responsivo
    petsListContainer.style.display = "flex";
    petsListContainer.style.flexWrap = "wrap";
    petsListContainer.style.gap = "20px";
    pets.forEach(pet => {
        let imgSrc = pet.imagem;
        // Garante que o caminho da imagem começa com "/"
        if (!imgSrc.startsWith('/')) imgSrc = '/' + imgSrc;
        const petCard = document.createElement('div');
        petCard.className = 'pet-card';
        // Estiliza o card individual
        petCard.style.flex = "1 1 200px";
        petCard.style.maxWidth = "250px";
        // Monta o HTML do card do pet
        petCard.innerHTML = `
            <div class="pet-info">
                <img src="${imgSrc}" style="width:100%;height:auto;"/>
                <h3>${pet.nome}</h3>
                <p>Idade: ${pet.idade}</p>
                <p>Personalidade: ${pet.personalidade}</p>
                <a href="#" class="adopt-btn">ADOTAR</a>
            </div>
        `;
        petsListContainer.appendChild(petCard); // Adiciona o card ao container
    });
}

/**
 * Mostra 4 pets aleatórios na tela.
 * Usa o array global allPets, embaralha e exibe apenas 4.
 */
function showRandomPets() {
    if (allPets.length === 0) return; // Não faz nada se não houver pets
    const shuffled = shuffle([...allPets]); // Embaralha uma cópia do array
    displayPets(shuffled.slice(0, 4));     // Exibe apenas os 4 primeiros
}

/**
 * Filtra os pets pela personalidade e exibe o resultado.
 * @param {string} personalidade - Personalidade para filtrar (ex: "Calmo").
 */
function filterPets(personalidade) {
    const filtered = allPets.filter(pet => pet.personalidade === personalidade);
    displayPets(filtered);
}

/**
 * Filtra os pets pela faixa de idade e exibe o resultado.
 * @param {string} faixa_idade - Faixa de idade para filtrar (ex: "Filhote").
 */
function filterPetsByAge(faixa_idade) {
    const filtered = allPets.filter(pet => pet.faixa_idade === faixa_idade);
    displayPets(filtered);
}

/**
 * Busca pets pelo nome a partir do campo de pesquisa e exibe o resultado.
 * Utiliza o valor do input com id 'search-input'.
 */
function searchPets() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    // Filtra pets cujo nome inclui o termo pesquisado
    const filteredPets = window.petsData.filter(pet => pet.nome.toLowerCase().includes(searchTerm));
    displayPets(filteredPets);
}

/**
 * Capitaliza a primeira letra de uma string.
 * @param {string} str - String a ser capitalizada.
 * @returns {string} String com a primeira letra maiúscula.
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Torna as funções de filtro globais para serem usadas em eventos HTML (onclick)
window.filterPets = filterPets;
window.filterPetsByAge = filterPetsByAge;

// Ao carregar a página, busca e exibe os pets automaticamente
window.onload = fetchPets;
