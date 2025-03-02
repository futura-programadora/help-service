const profissional = JSON.parse(localStorage.getItem('profissional'));

console.log(profissional);  // Isso vai mostrar todos os dados salvos do contratante

function buscarDadosDoProfissional() {
    // Realiza o fetch para obter todos os profissionais
    fetch('http://localhost:3001/get-profissionais')
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
    
  // Chama a função para buscar os dados do contratante
  buscarDadosDoProfissional();