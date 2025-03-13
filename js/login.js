console.log('iniciando js')

// Função para preencher os campos automaticamente se as credenciais forem encontradas no localStorage
function preencherCampos() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');
    const meLembrei = localStorage.getItem('meLembrei') === 'true';

    if (email && senha && meLembrei) {
        document.querySelector('#email').value = email;
        document.querySelector('#senha').value = senha;
        document.querySelector('#me-lembre').checked = true;  // Marca o checkbox "Me lembre"
    }

    // Mostrar dados armazenados no localStorage no console quando a página é recarregada
    mostrarLocalStorage();
}

// Função para armazenar dados no localStorage se "Me lembre" estiver ativado
function armazenarDados() {
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const meLembrei = document.querySelector('#me-lembre').checked;

    // Cria um objeto contendo todos os dados que você quer armazenar
    const contratante = {
        email: email,
        senha: senha,
        meLembrei: meLembrei, // Armazena a informação sobre o checkbox
    };


    // Sempre armazena os dados no localStorage
    localStorage.setItem('contratante', JSON.stringify(contratante));

    // Se quiser salvar a informação de "Me lembre" também (caso desejado)
    if (meLembrei) {
        localStorage.setItem('meLembrei', 'true');
    } else {
        localStorage.removeItem('meLembrei');
    }
}

// Função para mostrar todos os dados armazenados no localStorage
function mostrarLocalStorage() {
    console.log(localStorage);
}


// Função de login
async function logar() {
    console.log('Avaliando dados.')
    
    // Exibir a tela de carregamento
    showLoading();
    
    const email = document.querySelector('#email').value; // Pega o valor do input
    const senha = document.querySelector('#senha').value; // Pega o valor do input

    const response = await fetch("https://back-end-help-service.onrender.com/contratante/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,  // Passa o valor do input
            senha: senha   // Passa o valor do input
        })
    });

    const data = await response.json();

    if (response.ok) {
        // Armazenar os dados se "Me lembre" estiver ativado
        armazenarDados();
        // Exibe os dados armazenados no localStorage no console
        mostrarLocalStorage();
        hideLoading();
        window.location.href = "../paginas/pagina-inicial-contratante.html";  // Redireciona para a página específica
    } else {
        alert(data.message);  // Exibe a mensagem de erro
    }
}

// Função para mostrar a tela de carregamento
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

// Função para esconder a tela de carregamento
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Chama a função para preencher os campos automaticamente quando a página carregar
window.onload = preencherCampos;
