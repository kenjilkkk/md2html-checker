const fs = require('fs');
const textgears = require('textgears-api');
const removeMd = require('remove-markdown');

const { getJson } = require('../../utils/saveGetJson');

const MAX_RECURSION = 5;

const checkController = async (req, res) => {
	const index = req.params.index;

	const meta = getJson(); //modificar o get json para retornar somente o objeto do index correspondente.
	
	const md = fs.readFileSync(meta[index].path, {encoding: 'utf8'});
	const plain = removeMd(md);

	const textgearsApi = textgears(process.env.API_KEY_TEXTGEAR, {language: 'pt-BR', ai: true});
	//checar por extrangerismo.

	const textgear = async(text, depth = 0) => {
		let wordsToChange = [];

		if(depth > MAX_RECURSION)
		{
			console.warn("Recursao maxima atingida")

		}

		try
		{
			const data = await textgearsApi.checkGrammar(text);

			if (!data || !data.response || !Array.isArray(data.response.errors)) {
				console.warn("Resposta inesperada:", data);
				return [];
			}

			console.log(data.response.errors[0].bad)
			for(const error of data.response.errors)
			{
				if(error.description.en.toLowerCase().includes("estrangeirismo"))
				{

					wordsToChange.push(error.bad);
				}
			}
			if(wordsToChange.length > 0)
			{

				const changedPlain = subWord(text, wordsToChange);
				return await textgear(changedPlain, depth + 1);

			}else
			{
				return data.response.errors;
			}

		}catch(e)
		{
			console.log(e);
			return [];
		}


			
	}

	const respon = await textgear(plain);
	res.json(respon)
}

const subWord = (mdPlain, words) => {
	let newText = mdPlain;
	words.forEach(word => {
		newText = newText.replace(word, ' ');
	});
	return newText;
}

module.exports =  { checkController }
