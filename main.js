const regexYoutube = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
const input = document.querySelector("#linktitulo");
const buttonAdd = document.querySelector("#button-add");
const modal = document.querySelector("dialog");
const modalContainer = document.querySelector("#dialogcontainer");

// input.addEventListener("input", (e) => {
//   if (regexYoutube.test(input.value)) {
//     console.log("link do youtube");
//   }
//   console.log("input", input.value);
// });

buttonAdd.value = "Buscar";

input.addEventListener("input", (e) => {
  if (regexYoutube.test(input.value)) {
    buttonAdd.value = "Adicionar";
    return;
  }
  buttonAdd.value = "Buscar";
});

modal.addEventListener("click", () => modal.close());

modalContainer.addEventListener("click", (event) => event.stopPropagation());

//TODO:Alterar nome da função execute e criar lógica para adicionar os resultados no modal.

function execute(busca) {
  gapi.client.youtube.search
    .list({
      part: ["snippet"],
      maxResults: 4,
      q: busca,
    })
    .then(
      function (response) {
        //TODO: Inserir dados/itens do response.result dentro do modal.(Pode criar uma função)
        console.log("Response", response.result);
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

buttonAdd.onclick = function () {
  modal.showModal();
  //TODO: Pegar valor do input e passar para função de busca.
  execute("Pokemon");
};

gapi.load("client", () => {
  gapi.client.init({
    apiKey: "AIzaSyAXbYfGpos4PSbVs_pbeYvS-AR16nhhiRg",
  });
  gapi.client
    .load("https://content.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
});
