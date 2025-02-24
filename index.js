    const express = require('express')// Trás o Frameork Express para criar um servidor
    var bodyParser = require('body-parser')// Importa o middleware Body-Parser para processar requisições

    const path = require('path') // Importa módulo "path" para manipular os diretorios
    const app = express() // inicializa o aplicativo Express

    app.use( bodyParser.json() ) //suportar json
    app.use( bodyParser.urlencoded({ //suportar URL
        extended: true
}))


    app.engine('html', require('ejs').renderFile) // engine renderiza
    app.set('view engine','html') //Define o mecanismo de template padrão como 'html
    app.use('/public', express.static(path.join(__dirname,'public')))//Isso é útil para servir CSS, JavaScript, imagens e outros arquivos estáticos necessários para o front-end da sua aplicação.
    app.set('views', path.join(__dirname,'views'))// Define diretório padrão para envios (html|ejs)

    var tarefas = [] //Array para armazenar Tarefa

    //Rota para adicionar uma tarefa
    app.post('/',(req,res)=>{
        let mensagem = null // Inicializa a variavel como nula
        if(req.body.tarefas ){ // Verifica se o campo "tarefas" foi enviado a requisição
            if(tarefas.includes(req.body.tarefas)){ // Verifica se a tarefa já esta na lista
              
                mensagem = 'Você já adicionou esta Tarefa!' // Mensagem de Erro
            }else{
                tarefas.push(req.body.tarefas) // Adiciona a tarefa à lista

            }
        }
    
        res.render('index',{tarefasList:tarefas, mensagem:mensagem}) //renderiza a página inicial, passando a lista de tarefas e a mensagem
})    
        

    // Rota para renderizar a página inicial
    app.get('/', (req, res) => {
    // Renderiza a página inicial com as tarefas atuais e sem mensagem
    res.render('index', { tarefasList: tarefas, mensagem: null });
});

    // Rota para deletar uma tarefa
    app.get('/deletar/:id', (req, res) => {
        let id = parseInt(req.params.id); // Converte o parâmetro ID para número inteiro
    
        // Remove a tarefa pelo índice correto
        tarefas = tarefas.filter((_, index) => index !== id);
    
        // Redireciona para a página inicial para evitar problemas de atualização
        res.redirect('/');
    });

// Inicializa o servidor na porta 5000
    app.listen(5000, () => { 
    console.log('rodando'); // Exibe uma mensagem no console indicando que o servidor está rodando
});