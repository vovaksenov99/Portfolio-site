const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
let config = require('./config');

global.app = app;
global.express = express;

const PORT = process.env.PORT || config.port; //listen heroku port

app.use('/public', express.static('introduceSite/public'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


let profile = require('./routing/profile');
let projects = require('./routing/projects');
let teams = require('./routing/teams');
let contacts = require('./routing/contacts');
let pdf = require('./routing/PDFVersion');

//let hobbies = require('./routing/hobbies');

app.use('/', profile);
app.use('/profile', profile);
app.use('/projects', projects);
app.use('/teams', teams);
app.use('/contacts', contacts);
app.use('/pdf', pdf);

//app.use('/hobbies', hobbies);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

let pdfBuilder = require('../introduceSite/routing/PDFBuilder');

//pdfBuilder.build();

//const browser = await puppeteer.launch();
const RenderPDF = require('chrome-headless-render-pdf');
RenderPDF.generateSinglePdf('https://www.google.com', path.join(config.projectDir,'public/businesscard.pdf'))
    .then(() => {
        console.log("Done");
    });

global.config = config;