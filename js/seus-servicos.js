console.log('iniciando seus serviços')

const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional.id)
const identificacaoProfissional = profissional.id

document.addEventListener('DOMContentLoaded', () => {
    console.log('Iniciando seus serviços');

    // Realiza a requisição para pegar os serviços cadastrados do banco
    fetch('https://back-end-help-service.onrender.com/get-servicos')  // Substitua pela URL correta do seu servidor
        .then(response => response.json())
        .then(servicos => {
            console.log('Serviços cadastrados:', servicos);  // Exibe no console todos os serviços retornados

            // Filtra os serviços com base na identificação do profissional
            const servicosFiltrados = servicos.filter(servico => servico.identificacao === identificacaoProfissional);

            console.log('Serviços filtrados:', servicosFiltrados);  // Exibe no console os serviços filtrados
            console.log(servicosFiltrados.length)

            const container = document.querySelector('.notificacoes');
            container.innerHTML = ''; // Limpa o conteúdo existente da seção

            // Preenche a seção com os serviços filtrados
            servicosFiltrados.forEach(servico => {
                const divServico = document.createElement('div');
                divServico.classList.add('notificacao');

                divServico.innerHTML = `
                    <div class="nome-do-servico">${servico.servico}</div>
                    <div class="excluir-serviço"><i class="ri-delete-bin-5-fill"></i></div>
                `;

                // Adiciona o novo "serviço" à seção
                container.appendChild(divServico);

                // Adicionando o evento de exclusão ao ícone de excluir
                divServico.querySelector('.excluir-serviço').addEventListener('click', () => {
                    excluirServico(servico.id, divServico);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os serviços:', error);  // Caso haja um erro na requisição
        });
});

// Função para excluir o serviço
function excluirServico(idServico, divServico) {
    fetch(`https://back-end-help-service.onrender.com/delete-servico/${idServico}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Serviço excluído:', data);
        // Remove o serviço excluído da interface
        divServico.remove();
    })
    .catch(error => {
        console.error('Erro ao excluir o serviço:', error);
    });
}
