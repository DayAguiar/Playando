const regexYoutube = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
const input = document.querySelector("#linktitulo");
const buttonAdd = document.querySelector("#button-add");
const modal = document.querySelector("dialog");
const modalContainer = document.querySelector("#dialogcontainer");
const cardContainer = document.querySelector("#cardContainer");

function test(value) {
  console.log(value);
}

var texto = input.value;
console.log(texto);

buttonAdd.value = "Buscar";
input.addEventListener("input", (e) => {
  if (regexYoutube.test(input.value)) {
    buttonAdd.value = "Adicionar";
    return;
  }
  buttonAdd.value = "Buscar";
});

buttonAdd.disabled = true;
input.addEventListener("input", (e) => {
  const conteudo = input.value;
  if (conteudo !== null && conteudo !== "") {
    buttonAdd.disabled = false;
    return;
  }
  buttonAdd.disabled = true;
});

modal.addEventListener("click", () => modal.close());

modalContainer.addEventListener("click", (event) => event.stopPropagation());

function execute(busca) {
  gapi.client.youtube.search
    .list({
      part: ["snippet"],
      maxResults: 4,
      q: busca,
    })
    .then(
      function (response) {
        const videos = response.result.items;
        const formattedVideos = videos.map((video) => {
          return {
            id: video.id.videoId,
            publishedAt: video.snippet.publishedAt,
            title: video.snippet.title,
            image: video.snippet.thumbnails.medium.url,
            channelTitle: video.snippet.channelTitle,
          };
        });

        const cardsHtml = formattedVideos
          .map((formattedvideo) => {
            return `
          <div id="card">
            <img src="${formattedvideo.image}" alt="" />
            <div id="cardContent">
              <div id="informationWrapper">
                <a
                  id="videoName"
                  href="https://www.youtube.com/watch?v=${formattedvideo.id}"
                  >${formattedvideo.title}</a
                >
                <span id="postedBy">${formattedvideo.channelTitle}</span>
                <span id="date">${formattedvideo.publishedAt}</span>
              </div>
              <button class="buttonModal"
               data-id="${formattedvideo.id}"
                data-title="${formattedvideo.title}"
                 data-channelTitle="${formattedvideo.channelTitle}"
                 data-image="${formattedvideo.image}" 
                 data-publishedAt="${formattedvideo.publishedAt}" 
                 >Adicionar</button>
            </div>
          </div>
          `;
          })
          .join("");

        cardContainer.innerHTML = cardsHtml;
        const cardsButtons = document.querySelectorAll(".buttonModal");
        cardsButtons.forEach((cardButton) => {
          cardButton.addEventListener("click", (event) => {
            console.log(event.target.dataset);
          });
        });
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

buttonAdd.onclick = function () {
  modal.showModal();
  const conteudo = input.value;
  execute(conteudo);
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
