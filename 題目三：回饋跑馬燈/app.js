import { data } from "../data.js";

const cardGroup = document.querySelector(".card-group");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
let currentSlide = 0;

const render = () => {
	const slicedData = data.slice(currentSlide, currentSlide + 2 || currentSlide);

	const markup = slicedData
		.map((item) => {
			const { imgUrl, title, text } = item;

			return `
            <div class="card">
                <div class="card-header">
                    <img src=${imgUrl} alt="" class="card-img" />
                    <h2 class="card-title">${title}</h2>
                </div>

                <p class="card-body">
                    ${text}
                </p>
            </div>
        `;
		})
		.join("");

	cardGroup.innerHTML = markup;
};

const updateSlide = (action) => {
	if (action === "increment") {
		currentSlide + 1 > data.length - 1 ? data.length - 1 : (currentSlide += 1);
	}

	if (action === "decrement") {
		currentSlide - 1 < 0 ? currentSlide : (currentSlide -= 1);
	}

	render();
};

prevBtn.addEventListener("click", () => updateSlide("decrement"));
nextBtn.addEventListener("click", () => updateSlide("increment"));

render();
