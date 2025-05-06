const fs = require('fs');
const removeMd = require('remove-markdown');
const spell = require('spell-checker-js');
const { getJson } = require('../../utils/saveGetJson');
const { join } = require('path');

const checkController = async (req, res) => {
	const index = req.params.index;

	try
	{
		const meta = getJson(); //modificar o get json para retornar somente o objeto do index correspondente.
		const md = fs.readFileSync(meta[index].path, {encoding: 'utf8'});
		const plain = removeMd(md);

		spell.load('dictionary/ptBr.txt');
		const check = spell.check(plain);

		console.log(check);
		if(check.length === 0)
		{
			res.json([]); // sem erros
		}

		let erros = [];

		check.forEach((item) => {

			if(isNaN(parseFloat(item)))
			{
				erros.push({'bad': item,
							'description': 'Spell miss'
			});

			}
		})

		res.json(erros);
	}catch(e)
	{
		console.log(e);
		res.json(e);
	}

}

module.exports =  { checkController }
