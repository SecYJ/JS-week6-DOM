const form = document.querySelector("form");
let currentStep = 1;
const formStep = form.children[currentStep];

const buttons = document.querySelectorAll("button[data-btn=next]");
const prevButtons = document.querySelectorAll("button[data-btn=prev]");

buttons.forEach((btn) => {
	btn.addEventListener("click", () => {
		const currentStepInputs = document.querySelectorAll(
			`[data-step="${currentStep}"] input[name]`
		);

		currentStepInputs.forEach((input) => {
			const { value, name } = input;
			if (value.trim() === "" || (name === "email" && !value.includes("@"))) {
				input.classList.add("warning");
				return;
			}
			input.classList.remove("warning");
		});

		const isEmailExist = currentStepInputs[0].name === "email";
		if (isEmailExist && !currentStepInputs[0].value.includes("@")) return;

		const isValidInputs = [...currentStepInputs].every((input) => input.value.trim() !== "");

		if (isValidInputs) {
			currentStepInputs.forEach((input) => {
				input.value = "";
				input.classList.remove("warning");
			});

			currentStep += 1;
			if (currentStep > 3) {
				form.classList.add("hidden");
			} else {
				document
					.querySelectorAll("[data-step]")
					.forEach((el) => el.classList.add("hidden"));
				document.querySelector(`[data-step='${currentStep}']`).classList.remove("hidden");
			}
		}
	});
});

prevButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		currentStep -= 1;
		// if (currentStep < 1) return;
		document.querySelectorAll("[data-step]").forEach((el) => el.classList.add("hidden"));
		document.querySelector(`[data-step='${currentStep}']`).classList.remove("hidden");
	});
});

const init = () => {
	document.querySelectorAll("[data-step]").forEach((el) => el.classList.add("hidden"));
	document.querySelector(`[data-step='${currentStep}']`).classList.remove("hidden");
};

init();
