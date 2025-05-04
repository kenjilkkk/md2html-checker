const fs = require('fs');
const {getJson} = require('../../utils/saveGetJson')
const { marked } = require('marked');

const renderController = (req, res) => {
	let markdown;
	const index = req.params.index;
	const md_meta = getJson();
	const path = md_meta[parseInt(index)].path;

	try{
		markdown = fs.readFileSync(path, {encoding: 'utf8'});

	}catch(e)
	{
		console.log(e);
		console.log(`Error opening file.`);
	}

	const html = marked(markdown);

	res.send(html);
}

module.exports = { renderController };
