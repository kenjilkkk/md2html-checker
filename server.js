require('dotenv').config();

const express = require('express');
const multer = require('multer');
const path = require('path');
const { saveJson, getJson, hashing} = require('./utils/saveGetJson');

const renderRoute = require('./api/routes/renderRoute');
const checkRoute = require('./api/routes/checkRoute');

const app = express();
const upload = multer({dest: './uploads/'});

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//Set routes
app.use('/render', renderRoute);
app.use('/check-grammar', checkRoute)
//1. Check gramar of md file
/*
    You’ll provide an endpoint to check the grammar of the note.
    You’ll also provide an endpoint to save the note that can be passed in as Markdown text.
    Provide an endpoint to list the saved notes (i.e. uploaded markdown files).
    Return the HTML version of the Markdown note (rendered note) through another endpoint.
*/


app.post('/upload', upload.single('file'), saveJson);

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
})

app.get('/list', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'html', 'list.html'));	
})

app.get('/list-json', (req, res) => {
	const data = getJson();
	res.json(data);
})

app.get('/check-grammar', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'html', 'check-grammar.html'));
})


app.listen(PORT, () => {
	console.log(`servidor rodando na porta: ${PORT}`);
})

