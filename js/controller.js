import $ from 'jquery';

// State of the website
let buffer = "";
let renameBuffer = "";
const collection = {};
let jsonArray = [];
const movieToPoster = {};


// on load add all the event listener to the elements


function deleteCB() {
	const c_name = document.getElementById("modal_header").innerHTML;
	const movieModal = document.getElementById("movieModal");
	const array = collection[c_name];
	console.log(array);
	let count = 0;
	const cBox = movieModal.getElementsByTagName("input");
	for (const i in cBox) {
		if (isNaN(i) === false) {
			if (cBox[i].type === "checkbox" && cBox[i].checked === true) {
				const movieName = cBox[i].id;
				const index = array.indexOf(movieName);
				if (index !== -1) {
					array.splice(index, 1);
					count += 1;
				}
			}
		}
	}
	Materialize.toast(`Successfully Deleted ${count} Movies`, 3000);

	$("#movieModal").modal("close");
}

function renameCB() {
	const new_name = document.getElementById("new_name").value;
	collection[new_name] = collection[renameBuffer];
	delete collection[renameBuffer];
	$("#rename_modal").modal("close");
	Materialize.toast("Successfully Renamed", 3000);
	$(".gg").sideNav("hide");
}
// My Collection CB

function myCollectionCB() {
	const slide_out = document.getElementById("slide-out");
	const movieModal_content = document.getElementById("movieModal_content");

	let str = "";
	for (const name in collection) {
		str += getSlideOutItem(name);
	}
	const s = (getSlideOutHeader() + str);
	console.log(s);
	slide_out.innerHTML = s;

	for (const name in collection) {
		const ele = document.getElementById(name);
		ele.addEventListener("click", function () {
			let temp = "";

			const k = this.id;

			for (const index in collection[k]) {
				const movie = collection[k][index];
				console.log(`${k} --- ${movie}`);
				temp += getMovieModalItem(movie);
			}


			movieModal_content.innerHTML = getMovieModalContent(temp, k);
		});

		const del = document.getElementById(`del${name}`);
		del.addEventListener("click", function (event) {
			const k = this.id.substring(3);
			delete collection[k];
			Materialize.toast(`${k} Deleted`, 3000);
			event.stopPropagation();
			$(".gg").sideNav("hide");
		});
		const rename = document.getElementById(`re${name}`);
		rename.addEventListener("click", function (event) {
			// Invoke Modal
			$("#rename_modal").modal("open");
			event.stopPropagation();
			const oldName = this.id.substring(2);
			renameBuffer = oldName;
		});
	}
}
// Save Button CB
function saveCB() {
	const name = document.getElementById("first_name").value;
	if (name in collection) {
		Materialize.toast("You Already Have One!", 3000);
		return;
	}
	collection[name] = [];
	console.log(collection);
	$("#create_modal").modal("close");
	Materialize.toast(`Created ${name}`, 3000);
}

// Add to Collection Button CB
function addToCollectionBtnCB() {
	const dropdown_modal_content = document.getElementById("dropdown_modal_content");
	const cBox = dropdown_modal_content.getElementsByTagName("input");
	for (const i in cBox) {
		if (isNaN(i) === false) {
			if (cBox[i].type === "checkbox" && cBox[i].checked === true) {
				const array = collection[cBox[i].id.substring(4)];

				if (array.indexOf(buffer) === -1) {
					array.push(buffer);
					console.log(collection);
					Materialize.toast(` ${buffer} Added to Selected Collections`, 3000);
				}
			}
		}
	}
}
// Search Button Controller function SearchCB
function searchCB() {
	const movieName = document.getElementById("movieName");
	const temp = movieName.value.trim();
	const search_box = document.getElementById("search_box");

	if (temp === "") {
		console.log("Will not work hehe");
		return;
	}
	// form the proper URL to be sent to the database and get the JSON using AJAX call
	const url = `https://api.themoviedb.org/3/search/movie?api_key=f49392b2198b0fa9fe90421c7d55a08e&query=${temp}`;
	const promise = getData(url);
	promise.then((data) => {
		jsonArray = data;
		let searchResult = "";
		for (const key in data) {
			movieToPoster[data[key].original_title] = data[key].poster_path;

			const x = getCard(key, data[key]);


			searchResult += x;
		}


		if (searchResult === "") {
			search_box.innerHTML = "DATA NOT FOUND";
			return;
		}
		search_box.innerHTML = searchResult;


		// related to zooimg
		$(document).ready(() => {
			$(".materialboxed").materialbox();
		});

		for (const z in data) {
			const more = document.getElementById(`more${z}`);

			more.addEventListener("click", function () {
				const k = parseInt(this.id.substring(4), 10);
				more_modal_content = document.getElementById("more_modal_content");
				more_modal_content.innerHTML = getMoreView(jsonArray, k);
			});

			const add_to_collection = document.getElementById(`add_to_collection${data[z].original_title}`);
			add_to_collection.addEventListener("click", function () {
				let list = "";
				for (const name in collection) {
					list += addToCollectionList(name);
				}

				dropdown_modal_content.innerHTML = getAddToCollectionView(list);

				const k = this.id.substring(17);

				buffer = k;
			});
		}
	});

	promise.catch((error) => {
		search_box.innerHTML = error;
	});
}


function mainCB() {
	searchCB();
}

function formCB(event) {
	searchCB();
	event.preventDefault();
}

function load() {
	const search_form = document.getElementById("search_form");

	search_form.addEventListener("submit", formCB(event));

	const main = document.getElementById("main");
	main.addEventListener("keypress", mainCB);

	const searchBtn = document.getElementById("searchBtn");

	searchBtn.addEventListener("click", searchCB);

	const addToCollectionBtn = document.getElementById("addToCollectionBtn");

	addToCollectionBtn.addEventListener("click", addToCollectionBtnCB);
	const save = document.getElementById("save");
	save.addEventListener("click", saveCB);
	const my_collection = document.getElementById("my_collection");
	my_collection.addEventListener("click", myCollectionCB);
	const rename = document.getElementById("rename");
	rename.addEventListener("click", renameCB);
	const deleteMovie = document.getElementById("deleteMovie");
	deleteMovie.addEventListener("click", deleteCB);
}
