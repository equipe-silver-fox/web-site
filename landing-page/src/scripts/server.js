const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Caminho para o arquivo pets.json
const petsDataPath = path.join(__dirname, 'pets.json');

// Função para ler o arquivo pets.json de forma assíncrona
function getPetsData(callback) {
    fs.readFile(petsDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo pets.json:", err);
            return callback(err, null);
        }
        try {
            const pets = JSON.parse(data);
            callback(null, pets);
        } catch (err) {
            console.error("Erro ao analisar o JSON:", err);
            callback(err, null);
        }
    });
}

// Servir arquivos estáticos (HTML, CSS, JS) da pasta 'src'
app.use(express.static(path.join(__dirname, '../')));

// API para pegar todos os pets
app.get('/api/pets', (req, res) => {
    getPetsData((err, petsData) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao carregar os pets' });
        } else {
            res.json(petsData);
        }
    });
});


// Rota para servir qualquer arquivo HTML da pasta 'pages'
app.get('/:page.html', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, '../../src/pages', `${page}.html`);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send('Página não encontrada');
        }
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
