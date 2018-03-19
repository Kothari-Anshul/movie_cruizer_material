export default class B {
    getSlideOutHeader() {
        let str = `
    <li><div class="user-view">
      <div class = "center">
        <img class = "circ" src="img/download.jpeg">
      </div>
      
      <a href="#" ><span class=" center name black-text">Anshul Kothari</span></a>
      <a href="#"><span class=" center email black-text">anshulkothari96@gmail.com</span></a>
    </div></li>
    `;
        return str;
    }

    getSlideOutItem(name) {
        let str = `<li class = "row"><a href="#movie_modal" class = "modal-trigger" id = 
        "${name}"> 
         ${name}
         <i class=" badge material-icons" id = "re${name}">assignment_return</i>
         <i id = "del${name}" class="badge material-icons">delete</i></a></li>`;
        return str;
    }

    movieModalItem(movie_to_poster, movie) {
        let str = `<div class = " center col s12 m4 l3">
                    
                      <input type="checkbox" id="${movie}" />
                      <label for="${movie}"><img class = "materialbox" src = "https://image.tmdb.org/t/p/w500${movie_to_poster[movie]}" style = "height:150px;"></label>
                      <h6 class = "center">${movie}</h6>
                    
                    </div>
                `;
        return str;
    }

    getMovieModalContent(k, temp) {
        let str = `
                <h5 id = "modal_header" class = "center">${k}</h5>
                <form action="#" class = "row">
                    ${temp}
                </form>
                    
            `;
        return str;
    }
    getMobileView(){
          let str = `
  <li><div class="user-view">
      
      
      <a href="#" ><span class=" center name black-text">Anshul Kothari</span></a>
      <a href="#"><span class=" center email black-text">anshulkothari96@gmail.com</span></a>
    </div></li>
    <li><a href="#create_modal" class=" waves-effect waves-light btn  blue-grey lighten-5  light-blue-text text-darken-3 modal-trigger">CREATE COLLECTION</a></li>

      `;
      return str;
    }
   
}