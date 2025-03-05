// Função para carregar as configurações do localStorage
function carregarConfiguracoes() {
    // Carregar e aplicar as configurações de notificações
    const notificacoesAtivas = JSON.parse(localStorage.getItem('notificacoes'));
    if (notificacoesAtivas !== null) {
        // Aplique as notificações conforme a configuração
        if (notificacoesAtivas) {
            console.log('Notificações ativadas');
            // Lógica para habilitar as notificações no app
        } else {
            console.log('Notificações desativadas');
            // Lógica para desabilitar as notificações
        }
    }

    // Carregar e aplicar a configuração de mostrar senha
    const mostrarSenha = JSON.parse(localStorage.getItem('mostrarSenha'));
    if (mostrarSenha !== null) {
        const campoSenha = document.getElementById('senha');
        if (campoSenha) {
            campoSenha.type = mostrarSenha ? 'text' : 'password';
        }
    }

    // Carregar e aplicar o idioma
    const idioma = localStorage.getItem('idioma');
    if (idioma) {
        if (idioma === 'en') {
            console.log('Idioma configurado para inglês');
            // Aqui você poderia carregar traduções dinâmicas se necessário
        } else {
            console.log('Idioma configurado para português');
            // Aqui você poderia carregar traduções dinâmicas para português
        }
    }

    // Carregar e aplicar o tamanho da fonte
    const tamanhoFonte = localStorage.getItem('tamanhoFonte');
    if (tamanhoFonte) {
        document.body.style.fontSize = `${tamanhoFonte}px`;
    }
}

// Chama a função para carregar as configurações assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarConfiguracoes);
