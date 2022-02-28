const message = document.getElementById("message");

const toggleSpinner = (value) => {
    document.getElementById("spinner").style.display = value;
};

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
        toggleSpinner("block");
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
    cardContainer.innerHTML = "";

    if (phoneLength == 0) {
        message.innerText = `"No result found"`;
        toggleSpinner("none");
    } else {
        //result message
        message.innerText = `"${phoneLength} result found"`;

        phones.forEach((phone) => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                <div class="card border-0 shadow h-100 card-border ">
                    <img src="${phone.image}" class="card-img-top img-border" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                        <h6>Brand: ${phone.brand}</h6>
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
            // console.log(phone);
        });
        toggleSpinner("none");
    }
};

//Load details
const showDetails = (slug) => {
    toggleSpinner("block");

    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayPhoneDetails(data.data));
};

//Display phone details
const displayPhoneDetails = (phone) => {
    console.log(phone);

    // const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = phone.others;

    const phoneDetails = document.getElementById("phone-details");

    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("w-50");
    div.classList.add("mx-auto");
    div.classList.add("m-3");
    div.classList.add("card-border");
    div.classList.add("shadow");
    div.classList.add("border-0");
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top img-border" alt="...">
        <div class="card-body">
            <h5 class="card-title">Phone Name: ${phone.name}</h5>
            <h6>Brand: ${phone.brand}</h6>

            <h6>Main Features:</h6>
            <li><b>ChipSet</b>: ${phone.mainFeatures.chipSet}</li>
            <li><b>Display</b> Size: ${phone.mainFeatures.displaySize}</li>
            <li><b>Memory</b>: ${phone.mainFeatures.memory}</li>
            <li><b>Sensors: </b>${phone.mainFeatures.sensors}</li>

            <p><b>Release Date:</b> ${
                phone.releaseDate ? phone.releaseDate : "No release date found"
            }</p>
        </div>
    `;

    phoneDetails.appendChild(div);

    toggleSpinner("none");
};
