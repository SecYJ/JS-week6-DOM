import { questionsData } from "../data.js";

class App {
	#startBtn = document.querySelector(".start-btn");
	#form = document.querySelector(".form");
	#testQuestion = document.querySelector(".test-question");
	#result = document.querySelector(".result");
	#data = [];
	#currentStep = 0;
	#userAnswers = [];
	#username = "";

	constructor(data) {
		this.#data = data;
		this.#startBtn.addEventListener("click", this.#startTest.bind(this));
		this.#testQuestion.addEventListener("click", this.#submitAnswer.bind(this));
		this.#form.addEventListener("submit", this.#showResult.bind(this));
		this.#result.addEventListener("click", this.#restart.bind(this));
	}

	init() {
		this.#form.classList.add("hidden");
		this.#currentStep = 0;
		this.#userAnswers = [];
		this.#username = "";
		this.#clearMarkup(this.#result);
		this.#clearMarkup(this.#testQuestion);
	}

	#restart(e) {
		if (e.target.nodeName !== "BUTTON") return;
		this.init();
		this.#render(this.#testQuestion, this.#questionMarkup());
	}

	#startTest() {
		document.querySelector(".intro").classList.add("hidden");
		this.#render(this.#testQuestion, this.#questionMarkup());
	}

	#clearMarkup(element) {
		element.innerHTML = "";
	}

	#questionMarkup() {
		this.#clearMarkup(this.#testQuestion);
		const { question, selection, id } = this.#data[this.#currentStep];
		return `
            <h2>${question}</h2>
            <p>${this.#currentStep + 1} / ${this.#data.length}</p>
            ${selection
				.map((select) => {
					return `
                    <label class="answer-label">
                        <input type="radio" name=${id} />
                        ${select}
                    </label>
                    `;
				})
				.join("")}
        `;
	}

	#resultMarkup() {
		this.#clearMarkup(this.#result);
		const result = { correct: 0, wrong: 0 };
		this.#userAnswers.forEach((res) => (res ? (result.correct += 1) : (result.wrong += 1)));

		return `
		    <h2>${this.#username}</h2>
		    <p>{"Correct": ${result.correct}, "Wrong": ${result.wrong}}</p>
		    <p>(接著可以拿這筆資料來篩選出設定好的角色)</p>
		    <button type="button">再測驗一次</button>
		`;
	}

	#submitAnswer(e) {
		if (!e.target.closest(".answer-label")) return;
		const userAnswer = e.target.textContent.trim();
		this.#userAnswers.push(this.#data[this.#currentStep].ans === userAnswer);
		this.#currentStep += 1;
		if (this.#currentStep > this.#data.length - 1) {
			this.#clearMarkup(this.#testQuestion);
			this.#form.classList.remove("hidden");
			return;
		}
		this.#render(this.#testQuestion, this.#questionMarkup());
	}

	#showResult(e) {
		e.preventDefault();
		const { value } = e.target[0];
		if (value.trim() === "") return;
		this.#username = value.trim();
		e.target.reset();
		e.target.classList.add("hidden");
		this.#render(this.#result, this.#resultMarkup());
	}

	#render(el, markup) {
		el.insertAdjacentHTML("afterbegin", markup);
	}
}

const app = new App(questionsData);
app.init();
