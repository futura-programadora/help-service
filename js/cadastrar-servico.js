console.log('iniciando js')

const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante

//ACONTECE APÓS O CARREGAMENTO DA PAGINA
document.addEventListener('DOMContentLoaded', () => {
    const categoriasSelect = document.getElementById('categorias');

    // Função para buscar as categorias e preencher o select
    fetch('https://back-end-help-service.onrender.com/get-categorias')
        .then(response => response.json())
        .then(categorias => {
            // Preenche o select com as categorias
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;  // Usando o id como valor da opção
                option.textContent = categoria.nome;  // Nome da categoria
                categoriasSelect.appendChild(option);  // Adiciona a opção ao select
            });
        })
        .catch(error => {
            console.error('Erro ao carregar categorias:', error);
        });
});


function cadastrarSevico() {
    console.log('js funcionando')


    const servico = document.querySelector('#nome').value;
    const descricao = document.querySelector('#descricao').value;
    const categoria = document.querySelector('#categorias').value;
    const preco = document.querySelector('#valor').value || 'Valor não definido' ;
    const pagamento = document.querySelector('#tipo-pagamento').value;
    const identificacao = profissional.id;
    const email = profissional.email
    const numero = profissional.telefone

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
        alert('Não encontramos o id da sua conta')
        return
    }
    if (!email) {
        alert('Não encontramos o email da sua conta')
        return
    }
    if (!numero) {
        alert('Não encontramos o numero da sua conta')
        return
    }

    const dadosServico = {
        servico: servico,
        descricao: descricao,
        categoria: categoria,
        preco: preco,
        pagamento: pagamento,
        identificacao: identificacao,
        email: email,
        numero: numero
    }

    fetch('https://back-end-help-service.onrender.com/servico', {
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