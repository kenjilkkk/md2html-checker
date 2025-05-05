fetch('/list-json') // endpoint que retorna o meta.json
.then(response => response.json())
.then(data => {
	const list = document.getElementById('file-list');

	data.forEach((file, index) => {
		if (file.originalname.endsWith('.md')) {
			const li = document.createElement('li');
			const filename = document.createElement('span');
			const createA = document.createElement('a');
			filename.className = 'filename';
			filename.textContent = file.originalname;
			
			const createAText = document.createTextNode(filename.textContent);

			createA.setAttribute('href', `render/${index}`);
			createA.appendChild(createAText);

			const date = document.createElement('span');
			date.className = 'date';
			const d = new Date(file.uploadTime);
			date.textContent = `(enviado em ${d.toLocaleDateString()} às ${d.toLocaleTimeString()})`;
			
			const linker = document.createElement('a');
			const button = document.createElement('button');
			button.textContent = 'Checar gramatica';
			button.setAttribute('data-index', index);

			//evento ao clicar no botao

			button.addEventListener('click', () => {
				const idx = button.getAttribute('data-index');
				localStorage.setItem('selectIndx', idx);

				window.location.href = '/check-grammar';
		
			})

			linker.appendChild(button);
			
			li.appendChild(linker);
			li.appendChild(createA);
			li.appendChild(date);
			list.appendChild(li);

		}
	});
})
.catch(err => {
	document.body.innerHTML += '<p>Erro ao carregar a lista.</p>';
	console.error(err);
});
