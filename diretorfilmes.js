//INICIO DO PROJETO
const readline = require('readline-sync');
//Comecei criando arrays para diretores e filmes e um ID para cada novo diretor e novo filme
let diretores = [];
let filmes = [];
let diretorId = 1;
let filmeId = 1;

// Funções adicionar um Diretores
function adicionarDiretor() {
    let nome = readline.question('Digite o nome do diretor: ');
    diretores.push({ id: diretorId++, nome });
    console.log('Diretor adicionado com sucesso.');
}
//Função para exibir todos os diretores cadastrados e caso não tiver nenhum, informa que não existe
function listarDiretores() {
    if (diretores.length === 0) {
        console.log('Nenhum diretor cadastrado.');
    } else {
        console.log('Diretores:');
        diretores.forEach(diretor => {
            console.log(`ID: ${diretor.id}, Nome: ${diretor.nome}`);
        });
    }
}
//função para substituir diretores já existentes
function atualizarDiretor() {
    listarDiretores();
    let id = parseInt(readline.question('Digite o ID do diretor que deseja atualizar: '));
    let diretor = diretores.find(d => d.id === id);
    if (diretor) {
        let novoNome = readline.question('Digite o novo nome do diretor: ');
        diretor.nome = novoNome;
        console.log('Diretor atualizado com sucesso.');
    } else {
        console.log('Diretor não encontrado.');
    }
}
//Função para deletar diretores 
function excluirDiretor() {
    listarDiretores();
    let id = parseInt(readline.question('Digite o ID do diretor que deseja excluir: '));
    let index = diretores.findIndex(d => d.id === id);
    if (index !== -1) {
        diretores.splice(index, 1);
        filmes = filmes.filter(f => f.diretorId !== id); // Remove também os filmes desse diretor
        console.log('Diretor excluído com sucesso.');
    } else {
        console.log('Diretor não encontrado.');
    }
}

// Função adicionar um Filme e atribuir este filme a um diretor por meio do seu ID
function adicionarFilme() {
    listarDiretores();
    let diretorId = parseInt(readline.question('Digite o ID do diretor do filme: '));
    let diretor = diretores.find(d => d.id === diretorId);
    if (diretor) {
        let titulo = readline.question('Digite o título do filme: ');
        filmes.push({ id: filmeId++, titulo, diretorId });
        console.log('Filme adicionado com sucesso.');
    } else {
        console.log('Diretor não encontrado.');
    }
}
//Função para mostrar todos os filmes existentes e caso não houver nenhum, informar que nãi tem
function listarFilmes() {
    if (filmes.length === 0) {
        console.log('Nenhum filme cadastrado.');
    } else {
        console.log('Filmes:');
        filmes.forEach(filme => {
            let diretor = diretores.find(d => d.id === filme.diretorId);
            console.log(`ID: ${filme.id}, Título: ${filme.titulo}, Diretor: ${diretor ? diretor.nome : 'Desconhecido'}`);
        });
    }
}
//Função para listar os filmes por meio do seu diretor
function listarFilmesDeDiretor() {
    listarDiretores();
    let diretorId = parseInt(readline.question('Digite o ID do diretor para listar seus filmes: '));
    let diretor = diretores.find(d => d.id === diretorId);
    if (diretor) {
        let filmesDoDiretor = filmes.filter(f => f.diretorId === diretorId);
        if (filmesDoDiretor.length === 0) {
            console.log('Nenhum filme cadastrado para esse diretor.');
        } else {
            console.log(`Filmes de ${diretor.nome}:`);
            filmesDoDiretor.forEach(filme => {
                console.log(`ID: ${filme.id}, Título: ${filme.titulo}`);
            });
        }
    } else {
        console.log('Diretor não encontrado.');
    }
}
//Função para substituir um filme buscando pelo seu ID
function atualizarFilme() {
    listarFilmes();
    let id = parseInt(readline.question('Digite o ID do filme que deseja atualizar: '));
    let filme = filmes.find(f => f.id === id);
    if (filme) {
        let novoTitulo = readline.question('Digite o novo título do filme: ');
        listarDiretores();
        let novoDiretorId = parseInt(readline.question('Digite o novo ID do diretor do filme: '));
        let novoDiretor = diretores.find(d => d.id === novoDiretorId);
        if (novoDiretor) {
            filme.titulo = novoTitulo;
            filme.diretorId = novoDiretorId;
            console.log('Filme atualizado com sucesso.');
        } else {
            console.log('Novo diretor não encontrado.');
        }
    } else {
        console.log('Filme não encontrado.');
    }
}
//Função para deletar um filme buscando pelo seu ID
function excluirFilme() {
    listarFilmes();
    let id = parseInt(readline.question('Digite o ID do filme que deseja excluir: '));
    let index = filmes.findIndex(f => f.id === id);
    if (index !== -1) {
        filmes.splice(index, 1);
        console.log('Filme excluído com sucesso.');
    } else {
        console.log('Filme não encontrado.');
    }
}

// Função Principal,
function menuOpc() {
    let sair = false;
    while (!sair) {
        console.log(`
        Escolha uma opção:
        1. Adicionar Diretor
        2. Listar Diretores
        3. Atualizar Diretor
        4. Excluir Diretor
        5. Adicionar Filme
        6. Listar Filmes
        7. Listar Filmes de um Diretor
        8. Atualizar Filme
        9. Excluir Filme
        0. Sair
        `);

        let opcao = parseInt(readline.question('Escolha uma opção: '));

        switch (opcao) {
            case 1:
                adicionarDiretor();
                break;
            case 2:
                listarDiretores();
                break;
            case 3:
                atualizarDiretor();
                break;
            case 4:
                excluirDiretor();
                break;
            case 5:
                adicionarFilme();
                break;
            case 6:
                listarFilmes();
                break;
            case 7:
                listarFilmesDeDiretor();
                break;
            case 8:
                atualizarFilme();
                break;
            case 9:
                excluirFilme();
                break;
            case 0:
                sair = true;
                console.log('Saindo do sistema.');
                break;
            default:
                console.log('Opção inválida.');
        }
    }
}

menuOpc();





