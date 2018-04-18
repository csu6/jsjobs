const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let data = require('./jobs');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const api = express.Router();

api.get('/jobs', (req, res) => {
    res.json(data.jobs)
});

api.post('/jobs', (req, res) => {
    const job = req.body;
    res.json(job);
});

app.use('/api', api); // localhost:4201/api/jobs

const port = 4201;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});