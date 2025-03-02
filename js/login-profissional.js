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
}

// Função para armazenar dados no localStorage se "Me lembre" estiver ativado
function armazenarDados() {
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;
    const meLembrei = document.querySelector('#me-lembre').checked;

    const profissional = {
        email: email,
        senha: senha,
        meLembrei: meLembrei, // Armazena a informação sobre o checkbox
    };

    // Sempre armazena os dados no localStorage
    localStorage.setItem('profissional', JSON.stringify(profissional));

    if (meLembrei) {
        localStorage.setItem('email', email);
        localStorage.setItem('senha', senha);
        localStorage.setItem('meLembrei', 'true');
    } else {
        localStorage.removeItem('email');
        localStorage.removeItem('senha');
        localStorage.removeItem('meLembrei');
    }
}

// Função de login
async function logarProfissional() {
    console.log('Avaliando dados.')
    
    const email = document.querySelector('#email').value; // Pega o valor do input
    const senha = document.querySelector('#senha').value; // Pega o valor do input

    const response = await fetch("http://localhost:3001/profissional/login", {
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
        window.location.href = "../paginas/pagina-inicial-profissional.html";  // Redireciona para a página específica
    } else {
        alert(data.message);  // Exibe a mensagem de erro
    }
}

// Chama a função para preencher os campos automaticamente quando a página carregar
window.onload = preencherCampos;
