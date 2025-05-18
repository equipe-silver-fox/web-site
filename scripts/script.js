// Função para buscar os pets da API
function fetchPets() {
    fetch('/api/pets')
        .then(response => response.json())
        .then(data => {
            window.petsData = data;  // Armazenar dados dos pets em uma variável global
            displayPets(data);  // Exibir os pets na tela
        })
        .catch(err => console.error('Erro ao carregar os pets:', err));
}

// Função para exibir os pets na página
function displayPets(pets) {
    const petCardsContainer = document.getElementById('pet-cards');
    petCardsContainer.innerHTML = '';  // Limpar os cards anteriores

    pets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('pet-card');
        petCard.setAttribute('data-personalidade', pet.personalidade);
        petCard.setAttribute('data-idade', pet.faixa_idade);

        petCard.innerHTML = `
            <div class="pet-image">
                <img src="${pet.imagem}" alt="${pet.nome}">
            </div>
            <div class="pet-info">
                <h3>Nome: ${pet.nome}</h3>
                <p>Idade: ${pet.idade}</p>
                <p>Personalidade: ${capitalize(pet.personalidade)}</p>
                <a href="#" class="adopt-btn">ADOTAR</a>
            </div>
        `;
        petCardsContainer.appendChild(petCard);
    });
}

// Função para filtrar os pets por personalidade
function filterPets(personalidade) {
    const filteredPets = window.petsData.filter(pet => pet.personalidade === personalidade);
    displayPets(filteredPets);
}

// Função para filtrar os pets por faixa etária
function filterPetsByAge(idade) {
    const filteredPets = window.petsData.filter(pet => pet.faixa_idade === idade);
    displayPets(filteredPets);
}

// Função para buscar e exibir pets filtrados pela pesquisa (se necessário)
function searchPets() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredPets = window.petsData.filter(pet => pet.nome.toLowerCase().includes(searchTerm));
    displayPets(filteredPets);
}

// Função para capitalizar a primeira letra (para mostrar "Calmo", "Carinhoso", etc.)
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Chama a função para carregar os pets assim que a página carregar
window.onload = fetchPets;
