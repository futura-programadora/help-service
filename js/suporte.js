console.log('iniciando js')


function ajuda() {

    const email = document.querySelector('#email').value;
    const detalhes = document.querySelector('#Motivo-do-contato').value;
    
    if (!email) {
        alert('Campo email é obrigatório')
        return
    }
    if (!detalhes) {
        alert('Campo de detalhes é obrigatório')
        return

    }

    const dadosAjuda = {
        email: email,
        detalhes: detalhes
    }

    fetch('https://back-end-help-service.onrender.com/ajuda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosAjuda)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao tentar entrar em contato');
        }
        return response.json();
    })
    .then(data => {
        console.log('mensagem enviada com sucesso:', data);
        alert('mensagem enviada com sucesso!');
        // Você pode redirecionar ou limpar os campos aqui, se necessário
        window.location.reload();

    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro no envio. Tente novamente mais tarde.');
    });
}