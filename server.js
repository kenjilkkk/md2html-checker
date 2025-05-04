require('dotenv').config();

const express = require('express');
const multer = require('multer');
const marked = require('marked');
const {lint} = require('markdownlint/async');
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


app.get('/list', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'list.html'));	

})

app.get('/list-json', (req, res) => {
	const data = getJson();
	res.json(data);
})




app.listen(PORT, () => {

	console.log(`servidor rodando na porta: ${PORT}`);

})


/*
function fileFilter (req, file, cb) {
	console.log(typeof file.path);
	const hashFile = hashing(file.path);
	const data = getJson();

	if(data.some(item => item.hashValue === hashFile))
	{
		cb(null, false);

	}
  cb(null, true)

}*/
