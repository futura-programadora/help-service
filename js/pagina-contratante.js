const contratante = JSON.parse(localStorage.getItem('contratante'));

console.log(contratante);  // Isso vai mostrar todos os dados salvos do contratante

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

  // Carrega as categorias e as imagens patrocinadas (simulação de uma API ou dados)
  fetch('http://localhost:3001/get-categorias')  // Endpoint fictício, simule com a sua API real
      .then(response => response.json())
      .then(data => {
          // Aqui você pode renderizar as categorias dinamicamente, se necessário
      })
      .catch(error => console.error('Erro ao carregar categorias:', error));

  fetch('http://localhost:3001/get-patrocinados')  // Endpoint fictício, simule com a sua API real
      .then(response => response.json())
      .then(data => {
          // Insere as imagens patrocinadas
          patrocinioImages.forEach((image, index) => {
              if (data[index]) {
                  image.src = data[index].imagemUrl;
                  image.alt = data[index].descricao;
              }
          });
      })
      .catch(error => console.error('Erro ao carregar imagens patrocinadas:', error));

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
  fetch('http://localhost:3001/get-contratantes')
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

  
  