const fs = require('fs');
const textgears = require('textgears-api');
const removeMd = require('remove-markdown');

const { getJson } = require('../../utils/saveGetJson');


const checkController = (req, res) => {
	const index = req.params.index;

	const meta = getJson(); //modificar o get json para retornar somente o objeto do index correspondente.
	
	const md = fs.readFileSync(meta[index].path, {encoding: 'utf8'});
	const plain = removeMd(md);

	const textgearsApi = textgears(process.env.API_KEY_TEXTGEAR, {language: 'pt-BR', ai: false});
	textgearsApi.checkGrammar(plain)
			.then((data) => {
					if(!data.response.erros)
					{
						console.log('Sem Erros!');
					}
					for (const error of data.response.errors) {
							console.log('Error: %s. Suggestions: %s', error.bad, error.better.join(', '));
					}
			})
			.catch((err) => {});

}

module.exports =  { checkController }
