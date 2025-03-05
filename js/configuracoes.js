console.log('configurações sendo usadas');

document.addEventListener('DOMContentLoaded', () => {
    // Carregar as configurações salvas do localStorage (se existirem)
    loadSettings();

    // NOTIFICAÇÕES
    const notificacoesCheckbox = document.getElementById('notificacoes1');
    notificacoesCheckbox.addEventListener('change', () => {
        const notificacoesAtivas = notificacoesCheckbox.checked;
        localStorage.setItem('notificacoes', notificacoesAtivas);  // Salva no localStorage
        // Aplica a configuração em tempo real
        aplicarNotificacoes(notificacoesAtivas);
    });

    // MOSTRAR SENHA NA TELA
    const mostrarSenhaCheckbox = document.getElementById('mostrar-a-senha');
    mostrarSenhaCheckbox.addEventListener('change', () => {
        const mostrarSenha = mostrarSenhaCheckbox.checked;
        localStorage.setItem('mostrarSenha', mostrarSenha);  // Salva no localStorage
        // Aplica a configuração em tempo real
        aplicarMostrarSenha(mostrarSenha);
    });

    // IDIOMAS
    const idiomaSelect = document.getElementById('idiomas');
    idiomaSelect.addEventListener('change', () => {
        const idiomaSelecionado = idiomaSelect.value;
        localStorage.setItem('idioma', idiomaSelecionado);  // Salva no localStorage
        // Aplica a configuração em tempo real
        aplicarIdioma(idiomaSelecionado);
    });

    // TAMANHO DA FONTE
    const tamanhoFonteInput = document.getElementById('number');
    tamanhoFonteInput.addEventListener('input', () => {
        const tamanhoFonte = tamanhoFonteInput.value;
        localStorage.setItem('tamanhoFonte', tamanhoFonte);  // Salva no localStorage
        // Aplica a configuração em tempo real
        aplicarTamanhoFonte(tamanhoFonte);
    });
});

// Função para carregar as configurações do localStorage
function loadSettings() {
    // Carregar e aplicar as configurações do localStorage, se existirem

    // NOTIFICAÇÕES
    const notificacoesAtivas = JSON.parse(localStorage.getItem('notificacoes'));
    if (notificacoesAtivas !== null) {
        document.getElementById('notificacoes1').checked = notificacoesAtivas;
        aplicarNotificacoes(notificacoesAtivas);  // Aplica no momento do carregamento
    }

    // MOSTRAR SENHA NA TELA
    const mostrarSenha = JSON.parse(localStorage.getItem('mostrarSenha'));
    if (mostrarSenha !== null) {
        document.getElementById('mostrar-a-senha').checked = mostrarSenha;
        aplicarMostrarSenha(mostrarSenha);  // Aplica no momento do carregamento
    }

    // IDIOMAS
    const idioma = localStorage.getItem('idioma');
    if (idioma) {
        document.getElementById('idiomas').value = idioma;
        aplicarIdioma(idioma);  // Aplica no momento do carregamento
    }

    // TAMANHO DA FONTE
    const tamanhoFonte = localStorage.getItem('tamanhoFonte');
    if (tamanhoFonte) {
        document.getElementById('number').value = tamanhoFonte;
        aplicarTamanhoFonte(tamanhoFonte);  // Aplica no momento do carregamento
    }
}

// Funções para aplicar as configurações em tempo real

// Aplica a configuração de notificações
function aplicarNotificacoes(ativada) {
    if (ativada) {
        console.log('Notificações ativadas');
        // Aqui você pode colocar o código para habilitar as notificações no seu app.
    } else {
        console.log('Notificações desativadas');
        // Aqui você pode colocar o código para desabilitar as notificações no seu app.
    }
}

// Aplica a configuração de mostrar senha
function aplicarMostrarSenha(ativada) {
    const campoSenha = document.getElementById('senha');
    if (campoSenha) {
        campoSenha.type = ativada ? 'text' : 'password';  // Altera o tipo do campo de senha
    }
}

// Aplica a configuração do idioma
function aplicarIdioma(idioma) {
    console.log(`Idioma configurado para ${idioma}`);
    // Aqui você pode carregar as traduções ou alterar o idioma da página.
    // Por exemplo, alterando o texto ou carregando traduções.
}

// Aplica a configuração do tamanho da fonte
function aplicarTamanhoFonte(tamanho) {
    document.body.style.fontSize = `${tamanho}px`;  // Altera o tamanho da fonte em todo o corpo da página
}
