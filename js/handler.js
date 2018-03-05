var movie_to_poster = {};
var buffer = "";
var collection = {};
var json_array = [];



function searchCB() {
	let movie_name = document.getElementById("movie_name");
	let search_box = document.getElementById("search_box");
    let temp = movie_name.value.trim();

    if (temp == "") {
        console.log("Will not work hehe");
        return;
    }
    // form the proper URL to be sent to the database and get the JSON using AJAX call
    var url = `https://api.themoviedb.org/3/search/movie?api_key=f49392b2198b0fa9fe90421c7d55a08e&query=${temp}`;
    var promise = getData(url);
    promise.then(
        function(data) {
            json_array = data;
            var search_result = "";
            for (key in data) {

                movie_to_poster[data[key]["original_title"]] = data[key]["poster_path"];

                let x = getCard(key, data[key]);


                search_result += x;
            }




            if (search_result === "") {
                search_box.innerHTML = "DATA NOT FOUND";
                return;
            } else {
                search_box.innerHTML = search_result;
            }

            // related to zooimg 
            $(document).ready(function() {
                $('.materialboxed').materialbox();
            });

            for (let z in data) {


                let more = document.getElementById(`more${z}`);
                let  more_modal_content = document.getElementById("more_modal_content");
                more.addEventListener("click", function() {
                    let k = parseInt(this.id.substring(4));

                    more_modal_content.innerHTML = getMoreView(k, json_array);


                });

                let add_to_collection = document.getElementById(`add_to_collection${data[z]["original_title"]}`);
                let dropdown_modal_content = document.getElementById("dropdown_modal_content");
                add_to_collection.addEventListener("click", function() {
                    let list = "";
                    for (let name in collection) {
                        list += getDropDownItem(name);
                    }

                    dropdown_modal_content.innerHTML = getDropdown(list);

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









function formCB(event) {
    searchCB();
    event.preventDefault();
}

function mainCB() {
    searchCB();
}

function addToCollectionBtnCB() {
    let c_box = dropdown_modal_content.getElementsByTagName("input");
    for (let i in c_box) {
        if (isNaN(i) == false) {
            if (c_box[i].type === "checkbox" && c_box[i].checked === true) {
                let array = collection[c_box[i].id.substring(4)];

                if (array.indexOf(buffer) === -1) {
                    array.push(buffer);
                    console.log(collection);
                    Materialize.toast(` ${buffer} Added to Selected Collections`, 3000);
                }
            }
        }
    }
}

function saveCB() {
    let name = document.getElementById("first_name").value;
    if (name in collection) {
        Materialize.toast(`You Already Have One!`, 3000);
        return;
    }
    collection[name] = [];
    console.log(collection);
    $('#create_modal').modal('close');
    Materialize.toast(`Created ${name}`, 3000);
}

function myCollectionCB() {
	let slide_out = document.getElementById("slide-out");
	let movie_modal_content = document.getElementById("movie_modal_content");
    console.log("hello world");

    let str = getSlideOutHeader();

    for (let name in collection) {
        str += getSlideOutItem(name);

    }
    slide_out.innerHTML = str;
    for (let name in collection) {
        let ele = document.getElementById(name);
        ele.addEventListener("click", function() {
            let temp = ``;

            let k = this.id;

            for (let index in collection[k]) {
                let movie = collection[k][index];
                console.log(`${k} --- ${movie}`);
                temp += movieModalItem(movie_to_poster, movie);

            }



            movie_modal_content.innerHTML = getMovieModalContent(k, temp);
        });

        let del = document.getElementById(`del${name}`);
        del.addEventListener("click", function(event) {
            let k = this.id.substring(3);
            delete collection[k];
            Materialize.toast(`${k} Deleted`, 3000);
            event.stopPropagation();
            $('.gg').sideNav('hide');

        });
        let rename = document.getElementById(`re${name}`);
        rename.addEventListener("click", function(event) {
            // Invoke Modal
            $('#rename_modal').modal('open');
            event.stopPropagation();
            let old_name = this.id.substring(2);
            rename_buffer = old_name;

        });
    }

}
let rename_buffer ="";

function renameCB() {
	console.log("I am in Rename");
    let new_name = document.getElementById("new_name").value;
    collection[new_name] = collection[rename_buffer];
    delete collection[rename_buffer];
    $('#rename_modal').modal('close');
    Materialize.toast(`Successfully Renamed`, 3000);
    $('.gg').sideNav('hide');
}

function deleteCB() {
    console.log("I am in Delete ");
    let c_name = document.getElementById("modal_header").innerHTML;
    let movie_modal = document.getElementById("movie_modal");
    let array = collection[c_name];
    console.log(array);
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
    Materialize.toast(`Successfully Deleted ${count} Movies`, 3000);

    $('#movie_modal').modal('close');
}