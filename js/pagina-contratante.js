const contratante = JSON.parse(localStorage.getItem('contratante'));

console.log(contratante);  // Isso vai mostrar todos os dados salvos do contratante

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

  
  