const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, '*');
    res.header(`Access-Control-Allow-Headers`, 'Content-Type');
    next();
});

const api = express.Router();

api.get('/jobs', (req, res) => {
    res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('total nb of jobs: ', getAllJobs().length);
    res.json(job);
})

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // recup String, parse
    const job = getAllJobs().filter(j => j.id === id);
    if(job.length === 1) {
        res.json({ success: true, job: job[0]})
    } else {
        res.json({ success: false, message: `Pas de job ayant id ${id}`});
    }

});

app.use('/api', api); // localhost:4201/api/jobs

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});