console.log('iniciando js')

function verificar() {
    console.log('js funcionando')

    const contato = document.querySelector('#n-ou-e').value;
    const profissao = document.querySelector('#profissao').value;
    const cnpj = document.querySelector('#cnpj').value || 'Sem CNPJ';

    if (!contato) {
        alert('campo contato é Obrigatório');
        return
    }
    if (!profissao) {
        alert('Campo profissao é obrigatório');
        return
    }

    const dadosVerificacao = {
        contato: contato,
        profissao: profissao,
        cnpj: cnpj,
    }

    fetch('https://back-end-help-service.onrender.com/verificacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosVerificacao)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao tentar verificar conta');
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