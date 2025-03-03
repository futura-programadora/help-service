console.log('iniciando js')

const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante

function cadastrarSevico() {
    console.log('js funcionando')

    const servico = document.querySelector('#nome').value;
    const descricao = document.querySelector('#descricao').value;
    const categoria = document.querySelector('#categorias').value;
    const preco = document.querySelector('#valor').value || 0 ;
    const pagamento = document.querySelector('#tipo-pagamento').value;
    const identificacao = profissional.id;

    if (!servico) {
        alert('campo Nome do Serviço é obrigatório')
        return
    }
    if (!descricao) {
        alert('campo descrição do serviço é obrigatório')
        return
    }
    if (!categoria) {
        alert('campo categoria é obrigatório')
        return
    }
    if (!pagamento) {
        alert('Campo tipo de pagamento é obrigatório')
        return
    }
    if (!identificacao) {
        alert('Não encontramos o email da sua conta')
        return
    }

    const dadosServico = {
        servico: servico,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        pagamento: pagamento,
        identificacao: identificacao
    }

    fetch('http://localhost:3001/servico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosServico)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao tentar cadastrar serviço');
        }
        return response.json();
    })
    .then(data => {
        console.log('Serviço cadastrado com sucesso:', data);
        alert('Cadastro realizado com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro no cadastro. Tente novamente mais tarde.');
    });

}