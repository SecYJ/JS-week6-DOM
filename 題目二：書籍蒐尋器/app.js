// 第二题 - 書籍蒐尋器
const searchBook = document.querySelector("#search-book");
const booksList = searchBook.closest("form").nextElementSibling;
const booksData = [
	{
		name: "Harry Potter",
		intro: "content 01",
	},
	{
		name: "Hello world",
		intro: "content 02",
	},
	{
		name: "Old Man And Sea",
		intro: "content 01",
	},
];

const render = (el, data, type) => {
	const markup = (book) => {
		if (type === "button") {
			return `<li><button type="button">${book.name}</button></li>`;
		}
		return `<li>${book.name} | ${book.intro}</li>`;
	};

	el.innerHTML = data.map((book) => markup(book)).join("");
};

render(booksList, booksData);

searchBook.addEventListener("input", (e) => {
	const searchValue = e.target.value.toLowerCase();
	const filteredBooksData = booksData.filter((book) =>
		book.name.toLowerCase().includes(searchValue)
	);
	if (!filteredBooksData) return;
	render(searchBook.nextElementSibling, filteredBooksData, "button");
});

searchBook.nextElementSibling.addEventListener("click", (e) => {
	const { nodeName, textContent } = e.target;
	if (nodeName !== "BUTTON") return;
	const filteredData = booksData.filter((book) => book.name === textContent);
	render(booksList, filteredData);
});

searchBook.addEventListener("focus", () => render(booksList, booksData));
