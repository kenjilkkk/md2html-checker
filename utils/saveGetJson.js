const fs = require('fs');
const { join } = require('path');
const crypto = require('crypto');

const file = join(__dirname, '..', 'jsons', 'meta.json')

const saveJson = (req, res) => {
	const original = req.file.originalname;
	const filename = req.file.filename;
	const path = req.file.path; //path of uploaded file

	const hash = hashing(path);
	
	
	if(fs.existsSync(file))
	{
		try
		{

			const data = JSON.parse(fs.readFileSync(file));
			const equal = data.some((item) => item.hashValue === hash);

			
			if(equal === true)
			{
				console.log(`hash iguais`);
				fs.rmSync(path);
				return res.status(204).send('File already exists');
			}
			//checar se o arquivo ja existe.
			
			data.push({originalname: original,
								 path: path,
								 uploadTime: new Date(),
								 hashValue: hash
								});		
			
			fs.writeFileSync(file, JSON.stringify(data));

			res.status(201).send();
		}catch(e)
		{
			console.log(e);			
		}

	}else
	{

		const data = [{originalname: original,
							 		path: path,
									uploadTime: new Date(),
									hashValue: hash
									}];

		fs.writeFileSync(file, JSON.stringify(data));

		res.status(200).send();
	}
	

}

const getJson = (index) => {
	const data = JSON.parse(fs.readFileSync(file));

	if(index == null)
	{
		return data;
	}else if(!isNaN(index))
	{
		return data[index];
	}
}

const hashing = (toHashFile) => {
	//criar hash do arquivo md
	const algo = 'sha256';
	const hash = crypto.createHash(algo);

	const fileToHash = fs.readFileSync(toHashFile);

	hash.update(fileToHash);

	const hashDigest = hash.digest('base64');

	return hashDigest;
}

module.exports = {saveJson, getJson};


