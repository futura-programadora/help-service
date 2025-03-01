console.log('Carregando DOM');

function cadastroContratante() {
    console.log('function funcionando');

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const telefone = document.querySelector('#telefone').value;

    // Pegar a cidade de acordo com a lógica que você descreveu
    const cidade = document.querySelector('#cidade').value || document.querySelector('#regiao').value;

    // Verificar se os campos essenciais estão preenchidos
    if (!email) {
        alert('O campo "Email" é obrigatório.');
        return;
    }
    if (!senha) {
        alert('O campo "Senha" é obrigatório.');
        return;
    }
    if (!telefone) {
        alert('O campo "Telefone" é obrigatório.');
        return;
    }
    if (!cidade) {
        alert('O campo "Cidade" é obrigatório.');
        return;
    }

    const dadosContratante = {
        email: email,
        senha: senha,
        telefone: telefone,
        cidade: cidade
    };

    // Enviar os dados para a API utilizando o fetch
    fetch('http://localhost:3001/contratante', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosContratante)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao tentar criar conta como contratante');
        }
        return response.json();
    })
    .then(data => {
        console.log('Contratante cadastrado com sucesso:', data);
        alert('Cadastro realizado com sucesso!');
        // Você pode redirecionar ou limpar os campos aqui, se necessário
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro no cadastro. Tente novamente mais tarde.');
    });
}
