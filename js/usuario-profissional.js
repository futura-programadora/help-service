const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante

// Carregar os dados do profissional do localStorage e exibir na página
document.addEventListener("DOMContentLoaded", function() {
    const profissional = JSON.parse(localStorage.getItem('profissional'));
    
    if (profissional) {
        // Atualiza o email na div
        document.getElementById('email-usuario').textContent = profissional.email;

        // Atualiza a senha (mascarada por segurança)
        document.getElementById('senha-usuario').textContent = `senha: *********`;

        document.querySelector('.nome-da-cidade').textContent = profissional.cidade

        document.querySelector('.numero').textContent = profissional.telefone
        
    } else {
        console.log('Nenhum dado de profissional encontrado no localStorage.');
    }
});

// Função para abrir a tela de edição
function abrirTelaEdicao() {
    const profissional = JSON.parse(localStorage.getItem('profissional'));
    
    if (profissional) {
        // Preenche os campos de edição com os dados atuais
        document.getElementById('email-input').value = profissional.email;
        document.getElementById('senha-input').value = profissional.senha;

        // Exibe a tela de edição
        document.getElementById('tela-edicao').style.display = 'flex';
    } else {
        console.log('Nenhum dado de profissional encontrado para editar.');
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
        // Obtém os dados do profissional armazenados no localStorage
        const profissional = JSON.parse(localStorage.getItem('profissional')) || {};

        // Atualiza os dados no localStorage
        profissional.email = novoEmail;
        profissional.senha = novaSenha;

        // Salva as mudanças no localStorage
        localStorage.setItem('profissional', JSON.stringify(profissional));

        // Atualiza a página com os novos dados
        document.getElementById('email-usuario').textContent = novoEmail;
        document.getElementById('senha-usuario').textContent = `senha: ${profissional.senha}`; // Senha mascarada

        // Envia os dados para a API para atualizar o banco de dados
        fetch('https://back-end-help-service.onrender.com/atualizar-profissional/' + profissional.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: novoEmail,
                senha: novaSenha,
                telefone: profissional.telefone, // Presumindo que você tenha os dados de telefone
                cidade: profissional.cidade // Presumindo que você tenha os dados de cidade
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao atualizar o profissional no banco de dados');
            }
            return response.json();
        })
        .then(data => {
            console.log('Profissional atualizado no banco de dados:', data);
            // Fechar a tela de edição após salvar
            fecharTelaEdicao();
        })
        .catch(error => {
            console.error('Erro ao atualizar o profissional no banco de dados:', error);
            alert('Erro ao salvar as alterações no banco de dados.');
        });
    } else {
        alert('Por favor, preencha os campos de email e senha.');
    }
}


