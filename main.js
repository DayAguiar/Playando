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

buttonAdd.onclick = function () {
  modal.showModal();
};

modal.addEventListener("click", () => modal.close());

modalContainer.addEventListener("click", (event) => event.stopPropagation());
