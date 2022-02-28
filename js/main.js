const searchPhone = () =>{
    // Get input
    const searchField = document.getElementById("input-field");
    const searchText = searchField.value;

    // Clear input field
    searchField.value = "";

    // API fetch
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data.data));
    // console.log(url);
}