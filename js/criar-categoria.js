console.log('Carregando DOM');

const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante

function criarCategoria() {
    console.log('Função funcionando ')

    const nome = document.querySelector('#nome').value;
    const sobre = document.querySelector('#descricao').value;
    const email = profissional.id;//id do profissional 

    if(!nome) {
        alert('campo categoria Obrigatório')
        return
    }
    if(!sobre) {
        alert('campo descrição é Obrigatório')
        return
    }
    if(!email) {
        alert('Não conseguimos indentificar o email da sua conta')
    }

    const dadosCategoria = {
        email: email,
        sobre: sobre,
        nome: nome,
        
    }

    // Enviar os dados para a API utilizando o fetch
    fetch('https://back-end-help-service.onrender.com/categoria', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCategoria)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao tentar criar categoria');
        }
        return response.json();
    })
    .then(data => {
        console.log('categoria cadastrada com sucesso:', data);
        alert('Cadastro realizado com sucesso!');
        window.location.reload()
        // Você pode redirecionar ou limpar os campos aqui, se necessário
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro no cadastro. Tente novamente mais tarde.');
    });

}