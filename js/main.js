const error = document.getElementById("error-message");

const searchPhone = () =>{
    // Get input
    const searchField = document.getElementById("input-field");
    const searchText = searchField.value;

    // Clear input field
    searchField.value = "";

    // API fetch
    if(searchText == ""){// check error
        error.innerText = "Please, write something"
    }
    else{
        // Remove error message
        error.innerText = "";

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then(response => response.json())
            .then(data => displayPhones(data.data));
    }
}

const displayPhones = phones =>{


    console.log(phones);
}