const message = document.getElementById("message");

const searchPhone = () => {
    // Get input
    const searchField = document.getElementById("input-field");
    const searchText = searchField.value;

    // Clear input field
    searchField.value = "";

    // API fetch
    if (searchText == "") {
        // check error
        message.innerText = `"Please, write something"`;
    } else {
        // Remove error message
        message.innerText = "";

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => displayPhones(data.data));
    }
};

const displayPhones = (phones) => {
    const phoneLength = phones.length;

    const cardContainer = document.getElementById("card-container");

    //clear previous result
    cardContainer.textContent = "";

    if (phoneLength == 0) {
        message.innerText = `"No result found"`;
    } else {
        message.innerText = `"${phoneLength} result found"`;
        phones.forEach((phone) => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                        <h6>Brand: ${phone.brand}</h6>
                        <button class="btn btn-primary">See Details</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
            console.log(phone);
        });
    }

    console.log(typeof phones);
};
