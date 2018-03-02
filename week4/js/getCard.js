function getCard(key,content) {
    let str = `

	<div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img class="materialboxed" src="https://image.tmdb.org/t/p/w500${content["poster_path"]}" alt="movie_poster" style = "height:326px;">
                        
                        <a id = "add_to_collection${content["original_title"]}" href = "#dropdown_modal" class="btn-floating halfway-fab waves-effect waves-light red modal-trigger"><i class="material-icons">add</i></a>
                        
						 
						  
                    </div>
                    <div class="card-content">
                        <p>${content["original_title"]}</p>
                        <a id="more${key}" href="#more_modal" class="modal-trigger">More Details</a>

						  
						  
                    </div>
                </div>
    </div>
	`;
    return str;

}