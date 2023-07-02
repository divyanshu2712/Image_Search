const key = "FyRCdKEYiAxZs1NqQTr6w84zQxk8HeHRti05lCHUEPI";
const search_input = document.getElementById('search');
const form_data = document.querySelector('form');
const search_results = document.querySelector('.results');
const showbutton = document.getElementById('show-more');
let page = 1;

async function search_image() {
  let input_data = search_input.value;
  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${key}`;
  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;
  if (page === 1) {
    search_results.innerHTML = "";
  }
  results.map((res) => {
    const image_wrap = document.createElement('div');
    image_wrap.classList.add('result');
    const image = document.createElement('img');
    image.src = res.urls.small;
    image.alt = res.alt_description;
    const anchor = document.createElement('a');
    anchor.href = res.links.html;
    anchor.target = '_blank';
    anchor.textContent = res.alt_description;
    image_wrap.appendChild(image);
    image_wrap.appendChild(anchor);
    search_results.appendChild(image_wrap);
  });
  page++;
  if (page > 1) {
    showbutton.style.display = "block";
  }
}

form_data.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  search_image();
});

showbutton.addEventListener("click", () => {
  search_image();
});
