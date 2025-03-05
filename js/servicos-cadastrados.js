console.log('iniciando serviços cadastrados')

console.log(profissional.id)


// Supondo que a identificação do profissional (ou a identificação que você deseja usar para filtrar) seja algo assim:
const identificacaoProfissional = profissional.id; // Substitua com a identificação correta

console.log('Iniciando serviços cadastrados');
console.log(identificacaoProfissional);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Iniciando serviços cadastrados');

    // Realiza a requisição para pegar os serviços cadastrados do banco
    fetch('https://back-end-help-service.onrender.com/get-servicos')  // Substitua pela URL correta do seu servidor
        .then(response => response.json())
        .then(servicos => {
            console.log('Serviços cadastrados:', servicos);  // Exibe no console todos os serviços retornados

            // Filtra os serviços com base na identificação do profissional
            const servicosFiltrados = servicos.filter(servico => servico.identificacao === identificacaoProfissional);

            console.log('Serviços filtrados:', servicosFiltrados);  // Exibe no console os serviços filtrados

            console.log(servicosFiltrados.length)
            

            document.querySelector('.valor-de-trabalhos').textContent = servicosFiltrados.length

            document.querySelector('.trabalhos-finalizados').textContent = servicosFiltrados.length
        })
        .catch(error => {
            console.error('Erro ao buscar os serviços:', error);  // Caso haja um erro na requisição
        });

        fetch('https://back-end-help-service.onrender.com/get-patrocinados')
        .then(response => response.json())
        .then(patrocinado => {
            console.log('patrocinados:', patrocinado);  // Exibe no console todos os patrocinados retornados
    
            if (!Array.isArray(patrocinado)) {
                console.error('O retorno não é um array:', patrocinado);
            } else {
                // Filtra os patrocinados com base na identificação do profissional
                const patrocinadosFiltrados = patrocinado.filter(patrocinado => patrocinado.identificacao === identificacaoProfissional);
    
                console.log('Patrocinados filtrados:', patrocinadosFiltrados);  // Exibe no console os patrocinados filtrados
    
                // Seleciona o container onde os patrocinados serão inseridos
            const container = document.querySelector('.seus-patrocinios');
            container.innerHTML = ''; // Limpa o conteúdo existente da seção

            // Preenche a seção com os patrocinados filtrados
            patrocinadosFiltrados.forEach(patrocinado => {
                const divPatrocinado = document.createElement('div');
                divPatrocinado.classList.add('servico-patrocinado');
                
                // A imagem é a mesma para todos os patrocinados
                divPatrocinado.innerHTML = `
                    <img src="../imagens/lampada-removebg-preview.png" alt="Imagem do serviço">
                    <div class="nome-do-servico">${patrocinado.servico}</div>
                `;
                
                // Adiciona o novo "servico-patrocinado" à seção
                container.appendChild(divPatrocinado);
            });


            }
        })
        .catch(error => {
            console.error('Erro ao buscar os patrocinados:', error);  // Caso haja um erro na requisição
        });
    
});


