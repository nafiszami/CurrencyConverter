const url = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";


async function f(code) {
  let res = await fetch(url);
  let data = await res.json();
  return data.eur[code];
}


const updateFlag = (element) => {
  let curCode = element.value;
  let newUrl = `https://flagsapi.com/${countryList[curCode]}/shiny/64.png`;
  let flag = element.parentElement.querySelector("img");
  flag.src = newUrl;
};


const dropdowns = document.querySelectorAll(".dropdown");
for (let select of dropdowns) {
  for (let code in countryList) {
    let option = document.createElement("option");
    option.innerText = countryListAlpha2[countryList[code]];
    option.value = code;
    select.append(option);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const btn = document.querySelector("#converter");

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = parseFloat(document.querySelector("#amount").value);
  let from = document.querySelector("#fromc select");
  let to = document.querySelector("#toc select");

  let fromCode = from.value.toLowerCase();
  let toCode = to.value.toLowerCase();

  let fromValue = await f(fromCode);
  let toValue = await f(toCode);

  let eurAmount = amount / fromValue;
  let converted = eurAmount * toValue;
  let output = document.querySelector("#ans p");
  output.innerHTML = `${amount} ${from.value} = ${converted.toFixed(2)} ${to.value}`;




});
