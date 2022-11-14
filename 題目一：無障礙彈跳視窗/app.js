const modalBtn = document.querySelector(".modal-btn");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const dialog = document.querySelector(".dialog");
const dialogFirstEl = dialog.firstElementChild;

const modalAction = (el, action, className) => {
	el.classList[action](`${className}`);
};

modalBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	modalAction(dialog, "add", "dialog--active");
	modalAction(dialogFirstEl, "add", "dialog__window");
	modalAction(document.body, "add", "hidden");
	modalCloseBtn.focus();
});

modalCloseBtn.addEventListener("click", () => {
	modalAction(dialog, "remove", "dialog--active");
	modalAction(dialogFirstEl, "remove", "dialog__window");
});

window.addEventListener("keydown", (e) => {
	if (!dialog.classList.contains("dialog--active")) return;
	if (e.key !== "Escape") return;
	modalAction(dialog, "remove", "dialog--active");
});

window.addEventListener("click", (e) => {
	if (!dialog.classList.contains("dialog--active")) return;
	if (e.target.closest(".dialog__window")) return;
	modalAction(dialog, "remove", "dialog--active");
});
