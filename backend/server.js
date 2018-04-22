const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const fakeUser = {email: 'sm@test.fr', password: 'aze'};
const secret = 'DRk43tgBQwjTzhZB6VagLY4oTEjJ33CJmIJ7B8osecAbuoy7twuiBnQ';
const jwt = require('jsonwebtoken');

const getAllJobs = () => {
    return  [...addedJobs, ...initialJobs];
};

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
    console.log('req.body : ', req.body);
    if(req.body) {
        const email = req.body.email.toLocaleLowerCase();
        const password = req.body.password.toLocaleLowerCase();
        if(email === fakeUser.email && password === fakeUser.password) {
            delete req.body.password;
            const token = jwt.sign({iss: 'http://localhost:4201', role: 'admin'}, secret);

           // res.json({success: true, data: req.body});
            res.json({success: true, token});
        } else {
            res.json({success: false, message: 'Identifiants incorrects'});
        }
    } else {
        res.json({success: false, message: 'Données manquantes'});
    }
});

api.get('/jobs', (req, res) => {
    //res.json(data.jobs)
    res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('Total jobs: ' + getAllJobs()).length;
    res.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term) ));
    if(place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }
    //res.json({sucess: true, jobs: jobs});
    res.json({sucess: true, jobs}); // same name
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // string to int
    const job = getAllJobs().filter(j => j.id === id);

    if(job.length === 1) {
        res.json({success: true, job: job[0]});
    } else {
        res.json({success: false, message: `Pas de job ayant l'id ${id}`});
    }

});

app.use('/api', api); // localhost:4201/api/jobs
app.use('/auth', auth); // localhost:4201/auth/login



const port = 4201;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});