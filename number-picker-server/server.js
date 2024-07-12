// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Read existing results from a JSON file
const readResults = () => {
    try {
        const data = fs.readFileSync('results.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Write results to a JSON file
const writeResults = (results) => {
    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
};

// Endpoint to get previous results
app.get('/results', (req, res) => {
    res.json(readResults());
});

// Endpoint to save new results
app.post('/results', (req, res) => {
    const results = readResults();
    results.push(req.body);
    writeResults(results);
    res.status(201).send('Result saved');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});