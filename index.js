require('dotenv').config();
const express = require('express');

const downloader = require('./downloader');
const matchmaker = require('./matchmaker');

const app = express();
app.use(express.json());

// static files on public
app.use('/', express.static('public'));

app.get('/names', async (req, res) => {
    const data = await downloader();
    res.json(data[0].slice(1));
});

app.post('/match', async (req, res) => {
    const names = req.body.names;
    if (names.length !== 10) {
        res.status(400).send('Invalid number of names. Please choose 10.');
        return;
    }
    const data = await downloader();
    const matches = matchmaker(names, data);
    res.json(matches);
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
