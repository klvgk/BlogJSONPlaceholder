//API de JSON que será consumida: https://jsonplaceholder.typicode.com/posts

//Função assíncrona que irá consumir o JSON e mostrar na tela;
async function readPosts() {

    //Seleciona a área que irá mostrar o conteúdo do JSON;
    let postArea = document.querySelector('.posts');
    //Atribui uma mensagem para aparecer enquanto a requisição é feita;
    postArea.innerHTML = 'Carregando...';

    //Requisição do JSON;
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    //Transforma a Response em uma Promise de JSON;
    let json = await response.json();

    /*
    Verifica se existe conteúdo no JSON, caso tenha, adiciona o conteúdo ao HTML.
    Caso não, mostra mensagem de que não tem nenhum post para ser exibido;
    */
    if (json.length > 0) {
        //Limpa o texto prévio contido no HTML;
        postArea.innerHTML = '';

        //laço para percorrer todo o Array do JSON e adiciona-lo ao HTML;
        for (let i in json) {
            let postHtml = `<div><h1>${json[i].title}</h1> ${json[i].body}</div>`
            postArea.innerHTML += postHtml;
        }
    } else {
        postArea.innerHTML = 'Nenhum post para exibir..'
    }
}

//Função para envio de novo POST;
async function addNewPost(title, body) {

    //Requisição do tipo POST, que irá enviar os dados dos campos;
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 2
        })
    });

    //Limpa o conteúdo da tela;
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';
    //Recarrega o conteúdo da tela;
    readPosts();
}

//Dispara função para inserir post, quando houver evento de 'click';
document.querySelector('#insertButton').addEventListener('click', () => {
    //Pega o valor de title e body e atribui à variável;
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    //Verificação se os campos estão preenchidos;
    if (title && body) {
        addNewPost(title, body);
    } else {
        alert("Preencha todos os campos..")
    }
})

//Execução da função;
readPosts();