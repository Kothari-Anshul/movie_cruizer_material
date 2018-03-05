var movie_name = document.getElementById("movie_name");
var search_btn = document.getElementById("search_btn");
var search_box = document.getElementById("search_box");
var more_modal_content = document.getElementById("more_modal_content");
var dropdown_modal_content = document.getElementById("dropdown_modal_content");

var movie_to_poster = {};

var save = document.getElementById("save");

var create_modal = document.getElementById("create_modal");
var add_to_collection_btn = document.getElementById("add_to_collection_btn");
var display = document.getElementById("display");
var slide_out = document.getElementById("slide-out");

var my_collection = document.getElementById("my_collection");



var buffer = "";

var collection = {};
var json_array = [];

var search_form = document.getElementById("search_form");

search_form.addEventListener("submit", function(event){
    searchCB();
    event.preventDefault();
});



var main = document.getElementById("main");
main.addEventListener("keypress", function(event){
    
    
    searchCB();

});
// add listener to search button
search_btn.addEventListener("click", searchCB);

function searchCB() {

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

                more.addEventListener("click", function() {
                    let k = parseInt(this.id.substring(4));
                    let str = `
                        <h4>${json_array[k]["original_title"]}</h4>
                        <p>${json_array[k]["overview"]}</p>
                        <p>RATING: ${json_array[k]["vote_average"]}</p>
                    `;
                    more_modal_content.innerHTML = str;


                });

                let add_to_collection = document.getElementById(`add_to_collection${data[z]["original_title"]}`);
                add_to_collection.addEventListener("click", function() {
                    let list = "";
                    for (let name in collection) {
                        list += `
                            <p>
                              <input type="checkbox" id="test${name}" />
                              <label for="test${name}">${name}</label>
                            </p>
                        `;
                    }
                    let str = `
                        <h4>Select Collection for the Movie</h4>
                        <form action="#">
                            
                            ${list}
                        </form>

                    `;
                    dropdown_modal_content.innerHTML = str;
                    
                    let k = this.id.substring(17);
                    
                    buffer = k;
                    
                });
            }







            /*for (let i = 0; i < data.length; i += 1) {
                let bt = document.getElementById(`btn${i}`);



                bt.addEventListener("click", function(event) {

                    let id = this.id;
                    let key = parseInt(id.replace("btn", ""), 10);

                    let parent = document.getElementById(`collapse${key}`);
                    let checkbox = parent.getElementsByTagName("input");

                    for (let i = 0; i < checkbox.length; i += 1) {

                        if (isNaN(i) == false) { // means number haha
                            if (checkbox[i].type === "checkbox" && checkbox[i].checked === true) {
                                let check_value = checkbox[i].value;
                                if (collection[check_value].indexOf(json_array[key]["original_title"]) === -1) {
                                    collection[check_value].push(json_array[key]["original_title"]);
                                    console.log(collection);
                                    // to avoid duplication
                                }
                            }
                        }
                    }


                });

            }*/


            /*let panel_heading = document.querySelectorAll(`.panel-primary > .panel-heading`);
            if (panel_heading != null) {
                for (let k in panel_heading) {
                    if (isNaN(k) == false) {
                        panel_heading[k].addEventListener("click", function() {
                            let id = parseInt(this.id.substring(4));
                            console.log(id);
                            $(`#collapse${id}`).collapse('toggle');
                        });
                    }
                }
            }*/
        }
    );

    promise.catch(function(error) {

        search_box.innerHTML = error;
    });



}

add_to_collection_btn.addEventListener("click", function() {
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
});


save.addEventListener("click", function() {
    let name = document.getElementById("first_name").value;
    if(name in collection){
        Materialize.toast(`You Already Have One!`, 3000);
        return;
    }
    collection[name] = [];
    console.log(collection);
     $('#create_modal').modal('close');
     Materialize.toast(`Created ${name}`, 3000);
    
});

var movie_modal_content = document.getElementById("movie_modal_content");

my_collection.addEventListener("click", function() {
    console.log("hello world");

    let str = `
    <li><div class="user-view">
      <div class = "center">
        <img class = "circ" src="img/download.jpeg">
      </div>
      
      <a href="#" ><span class=" center name black-text">John Doe</span></a>
      <a href="#"><span class=" center email black-text">jdandturk@gmail.com</span></a>
    </div></li>
    `;

    for (let name in collection) {
        str += `<li class = "row"><a href="#movie_modal" class = "modal-trigger" id = "${name}"> ${name} <i class="material-icons" id = "del${name}">assignment_return</i><i id = "re${name}"class="material-icons">delete</i></a></li>`;

    }
    slide_out.innerHTML = str;
    for(let name in collection){
        let ele = document.getElementById(name);
        ele.addEventListener("click", function(){
            let temp = ``;

            let k = this.id;
           
            for(let index in collection[k]){
                let movie = collection[k][index];
                console.log(`${k} --- ${movie}`);
                temp += `
                    <div class = " center col s12 m4 l3">
                    
                      <input type="checkbox" id="${movie}" />
                      <label for="${movie}"><img class = "materialbox" src = "https://image.tmdb.org/t/p/w500${movie_to_poster[movie]}" style = "height:150px;"></label>
                      <h6 class = "center">${movie}</h6>
                    
                    </div>
                `;
            }

            let str = `
                <h4 id = "modal_header" class = "center">${k}</h4>
                <form action="#" class = "row">
                    ${temp}
                </form>
                    
            `;

            movie_modal_content.innerHTML = str;
        });

        let del = document.getElementById(`del${name}`);
        del.addEventListener("click", function(event){
            let k = this.id.substring(3);
            delete collection[k];
            Materialize.toast(`${k} Deleted`, 3000);
            event.stopPropagation();
            $('.gg').sideNav('hide');
            
        });
        let rename = document.getElementById(`re${name}`);
        rename.addEventListener("click", function(event){
            // Invoke Modal
            $('#rename_modal').modal('open');
            event.stopPropagation();
            let old_name = this.id.substring(2);
            rename_buffer = old_name;

        });
    }


});

var rename_buffer ="";
var rename = document.getElementById("rename");
rename.addEventListener("click", function(){
    
    let new_name = document.getElementById("new_name").value;
    collection[new_name] = collection[rename_buffer];
    delete collection[rename_buffer];
    $('#rename_modal').modal('close');
    Materialize.toast(`Successfully Renamed`, 3000);
    $('.gg').sideNav('hide');
    


});

var delete_movie = document.getElementById("delete_movie");
delete_movie.addEventListener("click", function(){
    let c_name = document.getElementById("modal_header").innerHTML;
    let array = collection[c_name];
    console.log(array);
    let count = 0;
    let c_box = movie_modal.getElementsByTagName("input");
    for(let i in c_box){
        if(isNaN(i) === false){
            
            if(c_box[i].type === "checkbox"  && c_box[i].checked === true){
                
                let movie_name = c_box[i].id;
                let index = array.indexOf(movie_name);
                if( index != -1){
                    array.splice(index,1);
                    count += 1;
                }
            }
        }
    }
    Materialize.toast(`Successfully Deleted ${count} Movies`, 3000);

    $('#movie_modal').modal('close');
});







/*var search_btn = document.getElementById("search-btn");
var movie_name = document.getElementById("movie_name");
var search_box = document.getElementById("search_box");
var bag = document.getElementById("bag");
var add = document.getElementById("add");

var dismiss = document.getElementById("dismiss");



$('#addModal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
});

/



//add.addEventListener("click", function() {
let save = document.getElementById("save");
save.addEventListener("click", function(event) {
    let name = document.getElementById("collection_name").value;
    

    if (name == null) {

        return;
    }
    if(name in collection){
        $('#addModal').modal('toggle');
        return;
    }

    collection[name] = [];
    bag.innerHTML += getCollectionItem(name);
    var allItems = document.querySelectorAll(".item");

    for (let j in allItems) {

        if (isNaN(j) == true) {
            continue;
        }
        allItems[j].addEventListener("mousedown", function(event) {
            

            if (event.button    == 0) {
                let modal_content = document.getElementById("modal_content");
                let modal_title = this.innerHTML;
                let movie_name_check = "";
                for (let i in collection[modal_title]) {
                    movie_name_check += `<input type="checkbox" value="${collection[modal_title][i]}">${collection[modal_title][i]}<br> `
                }
                console.log(movie_name_check);
                let str = `
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">${modal_title}</h4>
        </div>
        <div class="modal-body">
          <form action = "#">
          ${movie_name_check}
          </form>
        </div>`;

                modal_content.innerHTML = str;

                $('#myModal').modal('toggle');

            } 
        });



    }
    $('#addModal').modal('toggle');
    searchCB();
   

});





//});






dismiss.addEventListener("click", function() {
    let modal_title = document.querySelector(`.modal-title`);

    // Remove the selected items from the mapping or collections;
    let movie_name_check = document.querySelectorAll(`#myModal input`);

    for (let i in movie_name_check) {

        if (isNaN(i) === true) {
            continue;
        }
        if (movie_name_check[i].type === "checkbox" && movie_name_check[i].checked === true) {
            console.log("Yeah inside true checked");

            let index = collection[modal_title.innerHTML].indexOf(movie_name_check[i].value);
            collection[modal_title.innerHTML].splice(index, 1);
            $('#myModal').modal('toggle');


        }
    }
});*/