window.onload = function() {
	console.log("I am in load ");
    const searchForm = document.getElementById("search_form");

    searchForm.addEventListener("submit", formCB(event));

    const main = document.getElementById("main");
    main.addEventListener("keypress", mainCB);

    const searchBtn = document.getElementById("search_btn");

    searchBtn.addEventListener("click", searchCB);

    const addToCollectionBtn = document.getElementById("add_to_collection_btn");

    addToCollectionBtn.addEventListener("click", addToCollectionBtnCB);
    const save = document.getElementById("save");
    save.addEventListener("click", saveCB);
    const myCollection = document.getElementById("my_collection");
   	myCollection.addEventListener("click", myCollectionCB);
    const rename = document.getElementById("rename");
    rename.addEventListener("click", renameCB);
    const deleteMovie = document.getElementById("delete_movie");
    deleteMovie.addEventListener("click", deleteCB);
}