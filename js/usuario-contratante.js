const contratante = JSON.parse(localStorage.getItem('contratante'));

console.log(contratante);  // Isso vai mostrar todos os dados salvos do contratante

document.addEventListener("DOMContentLoaded", function() {
    const contratante = JSON.parse(localStorage.getItem('contratante'));

    if (contratante) {
        // Atualiza o email na div
        document.getElementById('email-usuario').textContent = contratante.email;

        // Atualiza a senha (mascarada por segurança)
        document.getElementById('senha-usuario').textContent = `senha: ********`;

        document.querySelector('.nome-da-cidade').textContent = contratante.cidade

        document.querySelector('.numero').textContent = contratante.telefone
    } else {
        console.log('Nenhum dado de contratante encontrado no localStorage.');
    }
});

// Função para abrir a tela de edição
function abrirTelaEdicao() {
    const contratante = JSON.parse(localStorage.getItem('contratante'));

    if (contratante) {
        // Preenche os campos de edição com os dados atuais
        document.getElementById('email-input').value = contratante.email;
        document.getElementById('senha-input').value = contratante.senha;

        // Exibe a tela de edição
        document.getElementById('tela-edicao').style.display = 'flex';
    } else {
        console.log('Nenhum dado de contratante encontrado para editar.');
    }
}

// Função para fechar a tela de edição
function fecharTelaEdicao() {
    // Esconde a tela de edição
    document.getElementById('tela-edicao').style.display = 'none';
}

// Função para salvar as mudanças
function salvarMudancas() {
    const novoEmail = document.getElementById('email-input').value;
    const novaSenha = document.getElementById('senha-input').value;

    // Verifica se os campos obrigatórios estão preenchidos
    if (novoEmail && novaSenha) {
        // Obtém os dados do contratante armazenados no localStorage
        const contratante = JSON.parse(localStorage.getItem('contratante')) || {};

        // Atualiza os dados no localStorage
        contratante.email = novoEmail;
        contratante.senha = novaSenha;

        // Salva as mudanças no localStorage
        localStorage.setItem('contratante', JSON.stringify(contratante));

        // Atualiza a página com os novos dados
        document.getElementById('email-usuario').textContent = novoEmail;
        document.getElementById('senha-usuario').textContent = `senha: ********`; // Senha mascarada

        // Envia os dados para a API para atualizar o banco de dados
        fetch('https://back-end-help-service.onrender.com/atualizar-contratante/' + contratante.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: novoEmail,
                senha: novaSenha,
                telefone: contratante.telefone, // Presumindo que você tenha os dados de telefone
                cidade: contratante.cidade // Presumindo que você tenha os dados de cidade
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o contratante no banco de dados');
            }
            return response.json();
        })
        .then(data => {
            console.log('Contratante atualizado no banco de dados:', data);
            // Fechar a tela de edição após salvar
            fecharTelaEdicao();
        })
        .catch(error => {
            console.error('Erro ao atualizar o contratante no banco de dados:', error);
            alert('Erro ao salvar as alterações no banco de dados.');
        });
    } else {
        alert('Por favor, preencha os campos de email e senha.');
    }
}