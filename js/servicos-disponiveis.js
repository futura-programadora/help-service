console.log('iniciando js')

console.log('iniciando js');

document.addEventListener('DOMContentLoaded', () => {
    const servicosDisponiveis = document.querySelector('.servicos-disponiveis');
    const pesquisaInput = document.getElementById('pesquisa');

    // Vamos guardar os serviços carregados para usar na pesquisa
    let servicos = [];

    // Fazer a requisição para pegar todos os serviços
    fetch('http://localhost:3001/get-servicos')
        .then(response => response.json())  // Converte a resposta em JSON
        .then(data => {
            servicos = data;  // Guarda os serviços
            renderizarServicos(servicos);  // Renderiza os serviços na página
        })
        .catch(error => {
            console.error('Erro ao buscar serviços:', error);
        });

    // Função para renderizar os serviços
    function renderizarServicos(servicos) {
        // Limpa a lista antes de adicionar os novos serviços
        servicosDisponiveis.innerHTML = '';

        // Percorre todos os serviços e cria os elementos HTML
        servicos.forEach(servico => {
            const servicoElement = document.createElement('div');
            servicoElement.classList.add('servico');
            
            servicoElement.innerHTML = `
                <h1 class="nome-do-servico">${servico.servico}</h1>
                <details class="detalhes-servico">
                    <summary>Detalhes do serviço</summary><br>
                    <div class="descricao">${servico.descricao}</div>
                    <div class="valor">
                        <p class="preco">R$ ${servico.preco}</p>
                        <p class="Tipo de pagamento">Tipo de pagamento: ${servico.pagamento}</p>
                    </div>
                    <div class="contatos">
                        <p class="numero">Número: ${servico.numero}</p>
                        <p class="email">Email: ${servico.email}</p>
                    </div>
                    <div class="categoria">
                        <p class="nome-categoria">Categoria: ${servico.categoria}</p>
                    </div>
                </details>
            `;
            
            // Adiciona o serviço ao container de serviços
            servicosDisponiveis.appendChild(servicoElement);
        });
    }

    // Função para filtrar serviços com base na pesquisa
    pesquisaInput.addEventListener('input', () => {
        const termoPesquisa = pesquisaInput.value.toLowerCase();
        
        // Filtra os serviços baseados no nome ou categoria
        const servicosFiltrados = servicos.filter(servico => {
            return servico.servico.toLowerCase().includes(termoPesquisa) || 
                   servico.categoria.toLowerCase().includes(termoPesquisa);
        });
        
        // Renderiza os serviços filtrados
        renderizarServicos(servicosFiltrados);
    });
});
