console.log('iniciando js');

document.addEventListener('DOMContentLoaded', () => {
    const servicosDisponiveis = document.querySelector('.servicos-disponiveis');
    const pesquisaInput = document.getElementById('pesquisa');

    let servicos = [];

    // Fazendo requisição para buscar os serviços
    fetch('https://back-end-help-service.onrender.com/get-servicos')
        .then(response => response.json())
        .then(data => {
            servicos = data;
            renderizarServicos(servicos);
        })
        .catch(error => {
            console.error('Erro ao buscar serviços:', error);
        });

    // Função para renderizar os serviços na tela
    function renderizarServicos(servicos) {
        servicosDisponiveis.innerHTML = ''; // Limpa os serviços existentes

        servicos.forEach(servico => {
            const servicoElement = document.createElement('div');
            servicoElement.classList.add('servico');

            // Adicionando todos os detalhes do serviço e as estrelas para avaliação
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

                <!-- Sistema de Avaliação com estrelas -->
                <div class="avaliacao" data-servico="${servico.servico}">
                    <div class="estrelas">
                        <span class="estrela" data-valor="1">★</span>
                        <span class="estrela" data-valor="2">★</span>
                        <span class="estrela" data-valor="3">★</span>
                        <span class="estrela" data-valor="4">★</span>
                        <span class="estrela" data-valor="5">★</span>
                    </div>
                </div>
            `;

            servicosDisponiveis.appendChild(servicoElement);
        });

        // Adicionar eventos para as estrelas (para marcar a avaliação)
        document.querySelectorAll('.estrela').forEach(estrela => {
            estrela.addEventListener('click', (event) => {
                const valor = event.target.getAttribute('data-valor');
                const servicoNome = event.target.closest('.avaliacao').getAttribute('data-servico');

                // Marcar as estrelas corretamente (feedback visual)
                marcarEstrelas(servicoNome, valor);

                // Enviar a avaliação para o backend
                enviarAvaliacao(servicoNome, valor);
            });
        });
    }

    // Função para marcar as estrelas (feedback visual)
    function marcarEstrelas(servicoNome, valor) {
        const estrelas = document.querySelectorAll(`.avaliacao[data-servico="${servicoNome}"] .estrela`);
        
        estrelas.forEach(estrela => {
            const estrelaValor = estrela.getAttribute('data-valor');
            if (estrelaValor <= valor) {
                estrela.classList.add('selecionada'); // Marca a estrela como selecionada
            } else {
                estrela.classList.remove('selecionada'); // Remove a seleção da estrela
            }
        });
    }

    // Função para enviar a avaliação para o backend (via POST)
    function enviarAvaliacao(servico, avaliacao) {
        fetch('https://back-end-help-service.onrender.com/avaliacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                servico: servico,
                avaliacao: avaliacao.toString(),
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Avaliação enviada:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar avaliação:', error);
        });
    }

    // Função para filtrar serviços com base na pesquisa
    pesquisaInput.addEventListener('input', () => {
        const termoPesquisa = pesquisaInput.value.toLowerCase();
        
        // Filtra os serviços com base no nome ou categoria
        const servicosFiltrados = servicos.filter(servico => {
            return servico.servico.toLowerCase().includes(termoPesquisa) || 
                   servico.categoria.toLowerCase().includes(termoPesquisa);
        });

        renderizarServicos(servicosFiltrados);
    });
});
