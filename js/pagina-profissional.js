const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante

function buscarDadosDoProfissional() {
    // Realiza o fetch para obter todos os profissionais
    fetch('https://back-end-help-service.onrender.com/get-profissionais')
      .then(response => response.json())  // Converte a resposta para JSON
      .then(profissionais => {
        console.log('Todos os profissionais:', profissionais);  // Exibe todos os contratantes no console
        
        // Obtém o email do contratante armazenado no localStorage
        const profissional = JSON.parse(localStorage.getItem('profissional'));
  
        if (profissional && profissional.email) {
          const email = profissional.email;
  
          // Filtra o contratante com o email correspondente
          const profissionalEncontrado = profissionais.find(user => user.email === email);
  
          if (profissionalEncontrado) {
            console.log('profissional encontrado:', profissionalEncontrado);
  
            // Guarda todos os dados do contratante no localStorage
            localStorage.setItem('profissional', JSON.stringify(profissionalEncontrado));
            console.log('Dados do profissional atualizados no localStorage');
            console.log('Dados armazenados no localStorage:', profissional);
          } else {
            console.log('profissional não encontrado.');
          }
        } else {
          console.log('Email do profissional não encontrado no localStorage.');
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);  // Caso ocorra um erro na requisição
      });
  }
    


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

// Chama a função para buscar os dados do contratante
buscarDadosDoProfissional();