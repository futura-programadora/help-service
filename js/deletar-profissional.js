const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante


document.addEventListener('DOMContentLoaded', () => {
    const deletarPerfilBtn = document.querySelector('#deletarPerfil'); // Referência ao botão de excluir

    
    const usuarioId = profissional ? profissional.id : null;

    console.log(usuarioId)

    if (!usuarioId) {
        alert("Usuário não encontrado.");
        return;
    }

    // Adicionando evento de clique no botão de excluir
    deletarPerfilBtn.addEventListener('click', () => {
        if (confirm("Tem certeza de que deseja excluir seu perfil? Esta ação não pode ser desfeita.")) {
            excluirPerfil(usuarioId);
        }
    });

    // Função para excluir o perfil
    function excluirPerfil(usuarioId) {
        fetch(`https://back-end-help-service.onrender.com/delete-profissional/${usuarioId}`, {  // Substitua com a URL correta do seu backend
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Perfil excluído:', data);
            alert('Seu perfil foi excluído com sucesso.');
            // Redireciona o usuário após a exclusão
            window.location.href = '../index.html';  // Redirecionamento para a página inicial
        })
        .catch(error => {
            console.error('Erro ao excluir perfil:', error);
            alert('Houve um erro ao tentar excluir seu perfil.');
        });
    }
});
