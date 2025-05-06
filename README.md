# mark2html-checker

O **mark2html-checker** é uma ferramenta para realizar **checagem ortográfica** em documentos Markdown (`.md`) escritos em português, além de gerar um **preview em HTML** do conteúdo Markdown. A principal função é detectar erros ortográficos e fornecer uma visualização do conteúdo convertido em HTML.

## 🧠 Objetivo

O objetivo do `mark2html-checker` é garantir que o conteúdo em Markdown esteja livre de erros ortográficos antes de ser convertido para HTML e publicado. Além disso, o projeto gera um **preview em HTML** para facilitar a visualização de como o documento ficará na web. A interface web simples permite que você interaja diretamente com o conteúdo por meio de um navegador.

## ✨ Funcionalidades

- ✅ Verificação ortográfica de documentos Markdown em português
- 🔎 Detecção de erros de ortografia no conteúdo Markdown
- 🌐 Geração de **preview em HTML** do arquivo Markdown
- 🖥 **Interface web** simples para interação, acessível via `localhost:3000`

## 🚀 Como usar

### Iniciar o servidor local

Para iniciar o servidor local, execute o seguinte comando:

```bash
npm start
````

Isso iniciará o servidor na porta `3000`, e você poderá acessar o aplicativo no seu navegador em `http://localhost:3000`.

### Funcionalidades do Front-End

* **Upload de arquivos Markdown**: Carregue seu arquivo Markdown para realizar a verificação ortográfica.
* **Preview em HTML**: Após a verificação, visualize como o conteúdo será exibido em HTML.
* **Exibição de erros ortográficos**: A interface mostrará os erros encontrados no conteúdo, com destaque para as palavras incorretas.

## 🛠 Tecnologias

* **Frontend**: HTML, CSS, JavaScript
* **Backend**: Node.js, Express.js
* **Bibliotecas de correção ortográfica**: `Spell-checker.js`
* **Geração de HTML**: Biblioteca de Markdown (`marked`)

---

Link do [projeto](https://roadmap.sh/projects/markdown-note-taking-app)

