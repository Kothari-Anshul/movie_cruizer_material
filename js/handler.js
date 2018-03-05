import "materialize-css";
import $ from "jquery";

import getData from "./getdata.js";
import "./jquery.js";
import A from "./searchView.js";
import B from "./collectionView.js";

var P = new A();
var Q = new B();
var previous_movie_to_poster = localStorage.getItem("Key2");
if(previous_movie_to_poster == null){
    var movie_to_poster = {};
}
else{
    movie_to_poster = JSON.parse(previous_movie_to_poster);
}
var buffer = "";
var previous_state = localStorage.getItem("Key");
if(previous_state == null){
    var collection = {};
}
else {
    var collection = JSON.parse(previous_state);
}

var json_array = [];



export function searchCB() {
	let movie_name = document.getElementById("movie_name");
	let search_box = document.getElementById("search_box");
	let temp = movie_name.value.trim();

	if (temp == "") {
		//console.log("Will not work hehe");
		return;
	}
	// form the proper URL to be sent to the database and get the JSON using AJAX call
	var url = `https://api.themoviedb.org/3/search/movie?api_key=f49392b2198b0fa9fe90421c7d55a08e&query=${temp}`;
	var promise = getData(url);
	promise.then(
		function(data) {
			json_array = data;
			var search_result = "";
			for (let key in data) {

				movie_to_poster[data[key]["original_title"]] = data[key]["poster_path"];

				let x = P.getCard(key, data[key]);


				search_result += x;
			}


            localStorage.setItem("Key2",JSON.stringify(movie_to_poster));

			if (search_result === "") {
				search_box.innerHTML = "DATA NOT FOUND";
				return;
			} else {
				search_box.innerHTML = search_result;
			}

			// related to zooimg 
			$(document).ready(function() {
				$(".materialboxed").materialbox();
			});

			for (let z in data) {


				let more = document.getElementById(`more${z}`);
				let more_modal_content = document.getElementById("more_modal_content");
				more.addEventListener("click", function() {
					let k = parseInt(this.id.substring(4));

					more_modal_content.innerHTML = P.getMoreView(k, json_array);


				});

				let add_to_collection = document.getElementById(`add_to_collection${data[z]["original_title"]}`);
				let dropdown_modal_content = document.getElementById("dropdown_modal_content");
				add_to_collection.addEventListener("click", function() {
					let list = "";
					for (let name in collection) {
						list += P.getDropDownItem(name);
					}

					dropdown_modal_content.innerHTML = P.getDropdown(list);

					let k = this.id.substring(17);

					buffer = k;

				});
			}

		}
	);

	promise.catch(function(error) {

		search_box.innerHTML = error;
	});



}









export function formCB(event) {
	searchCB();
	event.preventDefault();
}

export function mainCB() {
	searchCB();
}

export function addToCollectionBtnCB() {
	let dropdown_modal_content = document.getElementById("dropdown_modal_content");
	let c_box = dropdown_modal_content.getElementsByTagName("input");
	for (let i in c_box) {
		if (isNaN(i) == false) {
			if (c_box[i].type === "checkbox" && c_box[i].checked === true) {
				let array = collection[c_box[i].id.substring(4)];

				if (array.indexOf(buffer) === -1) {
					array.push(buffer);
					//console.log(collection);
                    // update the local stroge
                    localStorage.setItem("Key",JSON.stringify(collection));
					Materialize.toast(` ${buffer} Added to Selected Collections`, 3000);
				}
			}
		}
	}
}

export function saveCB() {
	let name = document.getElementById("first_name").value;
	if (name in collection) {
		Materialize.toast("You Already Have One!", 3000);
		return;
	}
	collection[name] = [];
    localStorage.setItem("Key",JSON.stringify(collection));
	//console.log(collection);
	$("#create_modal").modal("close");
	Materialize.toast(`Created ${name}`, 3000);
}

export function myCollectionCB() {
	let slide_out = document.getElementById("slide-out");
	let movie_modal_content = document.getElementById("movie_modal_content");
	//console.log("hello world");

	let str = Q.getSlideOutHeader();

	for (let name in collection) {
		str += Q.getSlideOutItem(name);

	}
	slide_out.innerHTML = str;
	for (let name in collection) {
		let ele = document.getElementById(name);
		ele.addEventListener("click", function() {
			let temp = "";

			let k = this.id;

			for (let index in collection[k]) {
				let movie = collection[k][index];
				//console.log(`${k} --- ${movie}`);
				temp += Q.movieModalItem(movie_to_poster, movie);

			}



			movie_modal_content.innerHTML = Q.getMovieModalContent(k, temp);
		});

		let del = document.getElementById(`del${name}`);
		del.addEventListener("click", function(event) {
			let k = this.id.substring(3);
			delete collection[k];
            localStorage.setItem("Key",JSON.stringify(collection));
			Materialize.toast(`${k} Deleted`, 3000);
			event.stopPropagation();
			$(".gg").sideNav("hide");

		});
		let rename = document.getElementById(`re${name}`);
		rename.addEventListener("click", function(event) {
			// Invoke Modal
			$("#rename_modal").modal("open");
			event.stopPropagation();
			let old_name = this.id.substring(2);
			rename_buffer = old_name;

		});
	}

}
let rename_buffer = "";

export function renameCB() {
	//console.log("I am in Rename");
	let new_name = document.getElementById("new_name").value;
	collection[new_name] = collection[rename_buffer];
	delete collection[rename_buffer];
    localStorage.setItem("Key",JSON.stringify(collection));
	$("#rename_modal").modal("close");
	Materialize.toast("Successfully Renamed", 3000);
	$(".gg").sideNav("hide");
}

export function deleteCB() {
	//console.log("I am in Delete ");
	let c_name = document.getElementById("modal_header").innerHTML;
	let movie_modal = document.getElementById("movie_modal");
	let array = collection[c_name];
	//console.log(array);
	let count = 0;
	let c_box = movie_modal.getElementsByTagName("input");
	for (let i in c_box) {
		if (isNaN(i) === false) {

			if (c_box[i].type === "checkbox" && c_box[i].checked === true) {

				let movie_name = c_box[i].id;
				let index = array.indexOf(movie_name);
				if (index != -1) {
					array.splice(index, 1);
					count += 1;
				}
			}
		}
	}
    localStorage.setItem("Key",JSON.stringify(collection));
	Materialize.toast(`Successfully Deleted ${count} Movies`, 3000);

	$("#movie_modal").modal("close");
}