// Get curiosidade
const curiosidadeText = document.querySelector("#curiosidade");

function getCuriosidadeAleatoria() {
  fetch("/curiosidade")
    .then((response) => response.json())
    .then((data) => {
      curiosidadeText.textContent = data.texto;
    })
    .catch((error) => {
      console.error("Erro ao buscar a curiosidade:", error);
    });
}


// Adicionar nova curiosidade
function postCuriosidade(event) {
  event.preventDefault();
  const texto = document.getElementById("texto-curiosidade").value;
  if (texto) {
    fetch("/curiosidade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ texto }), // Envia o texto como JSON
    }).catch((error) => {
      console.error("Erro ao adicionar a curiosidade:", error);
    });
  }
  document.getElementById("texto-curiosidade").value = ""; // Limpa o campo de entrada
}



function init() {
  const btnGetCuriosidade = document.querySelector("#gerar-curiosidade");
  const formGerarCuriosidade = document.querySelector("#curiosidade-form");

  if (btnGetCuriosidade)
    btnGetCuriosidade.addEventListener("click", getCuriosidadeAleatoria);
  if (formGerarCuriosidade)
    formGerarCuriosidade.addEventListener("submit", postCuriosidade);
}

document.addEventListener("DOMContentLoaded", init);
