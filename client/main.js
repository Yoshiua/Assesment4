const complimentBtn = document.getElementById("complimentButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

const fortuneBtn = document.getElementById("fortuneButton")

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)


const placesContainer = document.getElementById("places-container");
const form = document.querySelector('form')

const baseURL = "http://localhost:4000/api/food";

const placesCallback = ({ data: places }) => displayPlaces(places)
const errCallback = err => console.log(err)

const getAllPlaces = () => 
    axios
        .get(baseURL)
        .then(placesCallback)
        .catch(errCallback)
const createPlace = body => 
    axios
        .post(baseURL, body)
        .then(placesCallback)
        .catch(errCallback)
const deletePlace = id => 
    axios.
        delete(`${baseURL}/${id}`)
        .then(placesCallback)
        .catch(errCallback)
const voteOnPlace = (id, type) => 
    axios
        .put(`${baseURL}/${id}`, {type})
        .then(placesCallback)
        .catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let place = document.querySelector('#place')
    let votes = document.querySelector('#votes')
    let foodType = document.querySelector('#foodType')
    let item = document.querySelector('#item')
    let location = document.querySelector('.locations')
    let delivery = document.querySelector('#delivery')

    let locationsArray = [];
    let locationCheckBoxes = document.querySelectorAll('.location');
    locationCheckBoxes.forEach(checkbox => {
        if (checkbox.checked) {
            locationsArray.push(checkbox.value)
        }
    })

    let deliveryCheckbox = document.querySelector('#delivery');
    let deliveryBool = deliveryCheckbox.checked;


    let bodyObj = {
        place: place.value,
        votes: 0,
        foodType: foodType.value,
        item: item.value,
        location: locationsArray,
        delivery: deliveryBool,
    }

    createPlace(bodyObj)

    place.value = ''
    // votes.value = ''
    foodType.value = ''
    item.value = ''
    location.value = ''
    delivery.value = ''
}


function createPlaceCard(place) {
    // console.log(place.place)
    let deliveryStatus = ''
    if(place.delivery === true) {
        deliveryStatus = "They deliver"
    } 
    else {
        deliveryStatus = "They don't deliver"
    }
    const placeCard = document.createElement('div')
    placeCard.classList.add('place-card')
    placeCard.innerHTML = `<p class="place">${place.place}</p>
    <div class ="btns-container">
    <p class="titlesText">Current Votes:</p>
    <div class="votes-container">
        <button class="votesBtn" onclick="voteOnPlace(${place.id}, 'minus')">-</button>
        <p class="votes"> ${place.votes}</p>
        <button class="votesBtn" onclick="voteOnPlace(${place.id}, 'plus')">+</button>
    </div>
    <p class="titlesText">Type of Food:</p>
        <p class="food-type">${place.foodType}</p>
    <p class="titlesText">Menu Items:</p>
        <p class="item">${place.item}</p>
        <p class="location">${place.location}</p>
        <p class="delivery">${deliveryStatus}</p>
        <button class="deleteButton" onclick="deletePlace(${place.id})">Delete</button>
        </div>
`
    

    placesContainer.appendChild(placeCard)

}

function displayPlaces(arr) {
    placesContainer.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        // console.log(arr[i])
        createPlaceCard(arr[i])
    }
}

// Buttons for countys

// const deleteSLCBtn = document.querySelector('#onlyUC');
// deleteSLCBtn.addEventListener('click', deleteSLCBtn);

// function deleteSLCplaces() {
//     let dbCopy = [...db];
    
//     let utahCountyPlaces = dbCopy.filter(place.location.includes("Utah County"));

//     displayPlaces(utahCountyPlaces);
// }



form.addEventListener('submit', submitHandler)

getAllPlaces()