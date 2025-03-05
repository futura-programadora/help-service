const contratante = JSON.parse(localStorage.getItem('contratante'));

console.log(contratante);  // Isso vai mostrar todos os dados salvos do contratante

document.addEventListener('DOMContentLoaded', () => {
  // Carrega as avaliações
  fetch('https://back-end-help-service.onrender.com/get-avaliacoes')
      .then(response => response.json())
      .then(avaliacoes => {
          // Filtra as avaliações com nota maior ou igual a 3
          const avaliacoesFiltradas = avaliacoes.filter(avaliacao => parseInt(avaliacao.avaliacao) >= 3);

          // Cria um objeto para armazenar a maior avaliação de cada serviço
          const servicosMaiorAvaliacao = {};

          // Itera sobre as avaliações filtradas
          avaliacoesFiltradas.forEach(avaliacao => {
              // Verifica se o serviço já existe no objeto
              if (servicosMaiorAvaliacao[avaliacao.servico]) {
                  // Se a avaliação atual for maior, substitui
                  if (parseInt(avaliacao.avaliacao) > parseInt(servicosMaiorAvaliacao[avaliacao.servico].avaliacao)) {
                      servicosMaiorAvaliacao[avaliacao.servico] = avaliacao;
                  }
              } else {
                  // Se o serviço não existir no objeto, adiciona
                  servicosMaiorAvaliacao[avaliacao.servico] = avaliacao;
              }
          });

          // Converte o objeto para um array de serviços
          const servicosUnicos = Object.values(servicosMaiorAvaliacao);

          // Aqui você vai renderizar os serviços mais avaliados
          const containerAvaliacoes = document.querySelector('.avaliados'); // Alvo onde você quer exibir as avaliações

          // Limpa qualquer conteúdo anterior
          containerAvaliacoes.innerHTML = '';

          // Renderiza as avaliações filtradas e sem repetição de serviços
          servicosUnicos.forEach(servico => {
              const divServico = document.createElement('div');
              divServico.classList.add('avaliado');
              divServico.innerHTML = `
                  <div class="usuario">
                      <img src="../imagens/imagem-sem-user.png" alt="usuario">
                      <div class="nome">${servico.servico}</div> <!-- Nome do serviço -->
                  </div>

                  <div class="avaliacao">
                      <i class="ri-star-fill"></i>
                      <div class="numero-de-avaliacao">${servico.avaliacao}</div> <!-- Nota da avaliação -->
                  </div>
              `;
              containerAvaliacoes.appendChild(divServico);
          });
      })
      .catch(error => {
          console.error('Erro ao buscar avaliações:', error);
      });
});


document.addEventListener('DOMContentLoaded', () => {
  const pesquisaInput = document.getElementById('pesquisa');

  // Adiciona um listener para o clique no campo de pesquisa
  pesquisaInput.addEventListener('click', () => {
      // Quando o input for clicado, redireciona para a página de serviços disponíveis
      window.location.href = './servicos-disponiveis.html';  // Aqui redireciona para a página servicos-disponiveis.html
  });

  // Muda a imagem dos patrocinados, se necessário
  const patrocinioImages = document.querySelectorAll('.patrocinio img');
  let currentIndex = 0;
  patrocinioImages[currentIndex].classList.add('active');

  // Função para mudar a imagem
  function changeImage() {
      patrocinioImages[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % patrocinioImages.length;
      patrocinioImages[currentIndex].classList.add('active');
  }

  // Muda a imagem a cada 3 segundos
  setInterval(changeImage, 3000);

  // Lógica para filtrar categorias no input de pesquisa
  pesquisaInput.addEventListener('input', () => {
      const termoPesquisa = pesquisaInput.value.toLowerCase();
      const categoriaLinks = document.querySelectorAll('.categoria a');

      categoriaLinks.forEach(link => {
          const categoriaNome = link.textContent.toLowerCase();
          if (categoriaNome.includes(termoPesquisa)) {
              link.style.display = 'block';
          } else {
              link.style.display = 'none';
          }
      });
  });
});


function buscarDadosDoContratante() {
  // Realiza o fetch para obter todos os contratantes
  fetch('https://back-end-help-service.onrender.com/get-contratantes')
    .then(response => response.json())  // Converte a resposta para JSON
    .then(contratantes => {
      console.log('Todos os contratantes:', contratantes);  // Exibe todos os contratantes no console
      
      // Obtém o email do contratante armazenado no localStorage
      const contratante = JSON.parse(localStorage.getItem('contratante'));

      if (contratante && contratante.email) {
        const email = contratante.email;

        // Filtra o contratante com o email correspondente
        const contratanteEncontrado = contratantes.find(user => user.email === email);

        if (contratanteEncontrado) {
          console.log('Contratante encontrado:', contratanteEncontrado);

          // Guarda todos os dados do contratante no localStorage
          localStorage.setItem('contratante', JSON.stringify(contratanteEncontrado));
          console.log('Dados do contratante atualizados no localStorage');
          console.log('Dados armazenados no localStorage:', contratante);
        } else {
          console.log('Contratante não encontrado.');
        }
      } else {
        console.log('Email do contratante não encontrado no localStorage.');
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);  // Caso ocorra um erro na requisição
    });
}
  
// Chama a função para buscar os dados do contratante
buscarDadosDoContratante();

  
  