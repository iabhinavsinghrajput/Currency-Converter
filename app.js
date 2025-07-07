const Base_url = "https://open.er-api.com/v6/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");

const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let fromCurr = fromSelect.value;
    let toCurr = toSelect.value;

    let amtVal = amount.value;
    if (amtVal === "" || isNaN(amtVal) || amtVal <= 0) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${Base_url}/${fromCurr}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.rates[toCurr];
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
    } catch (error) {
        msg.innerText = "Something went wrong. Try again!";
        console.error(error);
    }
};


swapIcon.addEventListener("click", () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    updateFlag(fromSelect);
    updateFlag(toSelect);
    updateExchangeRate();
});


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});


window.addEventListener("load", () => {
    updateExchangeRate();
});
