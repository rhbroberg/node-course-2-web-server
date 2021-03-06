const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to log');
        }
    });
    next(); 
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//        pageTitle: 'maintenance baby'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        name: 'rhb',
        likes: [
            'biking',
            'skiing',
            'rowing'
        ],
        pageTitle: 'home page',
        welcomeMessage: 'welcome sez me'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'about page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'projects page',
    });
});

app.get('/bad', (req, res) => {
    res.send( {
        errorMessage: 'unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`server is up port ${port}`);
});
