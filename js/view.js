function getCard(key, content) {
	const str = `

	<div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img class="materialboxed" src="https://image.tmdb.org/t/p/w500${content.poster_path}" alt="movie_poster" style = "height:326px;">
                        
                        <a id = "add_to_collection${content.original_title}" href = "#dropdown_modal" class="btn-floating halfway-fab waves-effect waves-light red modal-trigger"><i class="material-icons">add</i></a>
                        
						 
						  
                    </div>
                    <div class="card-content">
                        <p>${content.original_title}</p>
                        <a id="more${key}" href="#more_modal" class="modal-trigger">More Details</a>

						  
						  
                    </div>
                </div>
    </div>
	`;
	return str;
}

function getMoreView(json_array, k) {
	const str = `
                        <h4>${json_array[k].original_title}</h4>
                        <p>${json_array[k].overview}</p>
                        <p>RATING: ${json_array[k].vote_average}</p>
                    `;
	return str;
}

function addToCollectionList(name) {
	const list = `
                            <p>
                              <input type="checkbox" id="test${name}" />
                              <label for="test${name}">${name}</label>
                            </p>
                        `;
	return list;
}

function getAddToCollectionView(list) {
	const str = `
                        <h4>Select Collection for the Movie</h4>
                        <form action="#">
                            
                            ${list}
                        </form>

                    `;


	return str;
}

function getMovieModalContent(temp, k) {
	const str = `
                <h4 id = "modal_header" class = "center">${k}</h4>
                <form action="#" class = "row">
                    ${temp}
                </form>
                    
            `;
	return str;
}
function getMovieModalItem(movie, movie_poster) {
	const str = `
                    <div class = " center col s12 m4 l3">
                    
                      <input type="checkbox" id="${movie}" />
                      <label for="${movie}"><img class = "materialbox" src = "https://image.tmdb.org/t/p/w500${movie_to_poster[movie]}" style = "height:150px;"></label>
                      <h6 class = "center">${movie}</h6>
                    
                    </div>
                `;
	return str;
}

function getSlideOutHeader() {
	const str = `
    <li><div class="user-view">
      <div class = "center">
        <img class = "circ" src="img/download.jpeg">
      </div>
      
      <a href="#" ><span class=" center name black-text">John Doe</span></a>
      <a href="#"><span class=" center email black-text">jdandturk@gmail.com</span></a>
    </div></li>
    `;
	return str;
}
function getSlideOutItem(name) {
	const str = `<li class = "row"><a href="#movie_modal" 
        class = "modal-trigger" id = "${name}"> ${name} <i class=" material-icons" 
        id = "re${name}">assignment_return</i><i id = "del${name}"class="material-icons">delete</i></a></li>`;

	return str;
}

