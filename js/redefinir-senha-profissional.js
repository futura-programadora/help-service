console.log('iniciando js')

document.getElementById('submit-btn').addEventListener('click', async function(event) {
    event.preventDefault(); // Evita o comportamento padrão de submit do formulário

    // Pegando os valores dos inputs
    const email = document.getElementById('email').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const repitaSenha = document.getElementById('repita-senha').value;

    // Validando os campos
    if (!email || !novaSenha || !repitaSenha) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    if (novaSenha !== repitaSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // Enviar os dados para a API
    try {
        const response = await fetch('http://localhost:3001/user/edit-password-profissional', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                novaSenha: novaSenha,
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Senha redefinida com sucesso!');
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
        alert('Houve um erro ao tentar redefinir a senha. Tente novamente.');
    }
});