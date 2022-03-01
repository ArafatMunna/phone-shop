let products = [];
const message = document.getElementById("message");

//Spinner
const toggleSpinner = (value) => {
    document.getElementById("spinner").style.display = value;
};

const productPaginate = (isAll = false, products) => {
    if (isAll) return productShow(products);
    else {
        let newProductArray =
            products.length > 20 ? products.slice(0, 20) : products;
        return productShow(newProductArray);
    }
};

const showAll = () => {
    productPaginate(true, products);
};

//Toggle show all button
const toggleShowAllButton = (value) => {
    document.getElementById("show-all").style.display = value;
};

//Load products
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
            .then((data) => {
                products = data.data;
                return productPaginate(false, products);
            });
    }
};

//Show products
const productShow = (phones) => {
    const phoneLength = phones.length;

    const cardContainer = document.getElementById("card-container");

    //clear previous result
    cardContainer.innerHTML = "";
    document.getElementById("phone-details").innerHTML = "";

    if (phoneLength == 0) {
        message.innerText = `"No result found"`;
        toggleSpinner("none");
    } else {
        //result message
        message.innerText = `"${phoneLength} result showed"`;
        phones.forEach((phone) => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                <div class="card border-0 shadow p-3 h-100 card-border ">
                    <div class="w-50 mx-auto">
                        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                        <h6>Brand: ${phone.brand}</h6>
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
        });
        toggleShowAllButton("block");
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

    const phoneDetails = document.getElementById("phone-details");

    //clear previous result
    phoneDetails.innerHTML = "";

    const div = document.createElement("div");
    div.classList.add(
        "card",
        "w-50",
        "mx-auto",
        "m-3",
        "card-border",
        "shadow",
        "border-0",
        "p-3"
    );
    div.innerHTML = `
        <div class="w-50 mx-auto">
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Phone Name: ${phone.name}</h5>
            <h6>Brand: ${phone.brand}</h6>

            <p class="mt-2"><b>Release Date:</b> ${
                phone.releaseDate ? phone.releaseDate : "No release date found"
            }</p>

            <p class="mb-1"><b>Main Features:</b></p>
            <li><b>ChipSet: </b>${phone.mainFeatures.chipSet}</li>
            <li><b>Display Size: </b>${phone.mainFeatures.displaySize}</li>
            <li><b>Memory: </b>${phone.mainFeatures.memory}</li>
            <li><b>Sensors: </b>${phone.mainFeatures.sensors}</li>
            <br>
            <p class="mb-1"><b>Others:</b></p>
            <li><b>Bluetooth: </b>${
                phone?.others?.Bluetooth ? phone?.others?.Bluetooth : ""
            }</li>
            <li><b>GPS: </b>${phone?.others?.GPS ? phone?.others?.GPS : ""}</li>
            <li><b>NFC: </b>${phone?.others?.NFC ? phone?.others?.NFC : ""}</li>
            <li><b>Radio: </b>${
                phone?.others?.Radio ? phone?.others?.Radio : ""
            }</li>
            <li><b>USB: </b>${phone?.others?.USB ? phone?.others?.USB : ""}</li>
            <li><b>WLAN: </b>${
                phone?.others?.WLAN ? phone?.others?.WLAN : ""
            }</li>
        </div>
    `;

    phoneDetails.appendChild(div);

    toggleSpinner("none");
};
