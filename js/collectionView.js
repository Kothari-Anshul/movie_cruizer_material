function getSlideOutHeader(){
	let str = `
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

function getSlideOutItem(name){
	let str = `<li class = "row"><a href="#movie_modal" class = "modal-trigger" id = 
        "${name}"> ${name} <i class="material-icons" id = "del${name}">assignment_return</i><i i
        d = "re${name}"class="material-icons">delete</i></a></li>`;
    return str;
}

function movieModalItem(movie_to_poster, movie){
	let str = `<div class = " center col s12 m4 l3">
                    
                      <input type="checkbox" id="${movie}" />
                      <label for="${movie}"><img class = "materialbox" src = "https://image.tmdb.org/t/p/w500${movie_to_poster[movie]}" style = "height:150px;"></label>
                      <h6 class = "center">${movie}</h6>
                    
                    </div>
                `;
    return str;
}

function getMovieModalContent(k,temp){
	let str = `
                <h4 id = "modal_header" class = "center">${k}</h4>
                <form action="#" class = "row">
                    ${temp}
                </form>
                    
            `;
    return str;
}