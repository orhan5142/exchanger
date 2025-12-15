function situation() {
  currentValue = navigator.onLine;
  
  if (!currentValue) {
    popUP.style.display = 'block';
  } else {
    popUP.style.display = 'none';

  setTimeout(() => {
    const inputFirstElement = document.querySelector(".body-first-result");
    const inputSecondElement = document.querySelector(".body-second-result");
    
    if (change == 1 && inputFirstElement && inputFirstElement.value) {
      exchanger(staticSituationFirst[0], staticSituationSecond[0]);
    } else if (change == 2 && inputSecondElement && inputSecondElement.value) {
      exchangerReverse(staticSituationFirst[0], staticSituationSecond[0]);
    }
    static(staticSituationFirst[0], staticSituationSecond[0]);
    staticreverse(staticSituationFirst[0], staticSituationSecond[0]);
  }, 10);
}
}

window.addEventListener('online', situation);
window.addEventListener('offline', situation);

function exchanger(first, second) {
  if (!currentValue) {
    return;
  }
  
  fetch(`https://v6.exchangerate-api.com/v6/c17df2c12fc6d1381a30aa49/latest/${staticSituationFirst[0]}`)
    .then(response => response.json())
    .then(data => {
      let result = inputFirst.value * data.conversion_rates[`${staticSituationSecond[0]}`];
      
      let results = result.toString();
      if (results.includes('.')) {
        let h = results.split('.');
        if (h[1].length > 5) {
          result = parseFloat(result.toFixed(5));
        }
      }
      inputSecond.value = result;
    })
}

function exchangerReverse(first, second) {
  if (!currentValue) {
    return;
  }
  
  fetch(`https://v6.exchangerate-api.com/v6/c17df2c12fc6d1381a30aa49/latest/${staticSituationSecond[0]}`)
    .then(response => response.json())
    .then(data => {
      let result = inputSecond.value * data.conversion_rates[`${staticSituationFirst[0]}`];
      
      let results = result.toString();
      if (results.includes('.')) {
        let h = results.split('.');
        if (h[1].length > 5) {
          result = parseFloat(result.toFixed(5));
        }
      }
      inputFirst.value = result;
    })
}

function static(first, second) {
  if (!currentValue) {
    return;
  }
  
  fetch(`https://v6.exchangerate-api.com/v6/c17df2c12fc6d1381a30aa49/latest/${staticSituationFirst[0]}`)
    .then(response => response.json())
    .then(data =>
      bodyFirstValue.textContent = `1 ${staticSituationFirst[0]} = ${data.conversion_rates[`${staticSituationSecond[0]}`]} ${staticSituationSecond[0]}`
    )
}

function staticreverse(first, second) {
  if (!currentValue) {
    return;
  }
  
  fetch(`https://v6.exchangerate-api.com/v6/c17df2c12fc6d1381a30aa49/latest/${staticSituationSecond[0]}`)
    .then(response => response.json())
    .then(data =>
      bodySecondValue.textContent = `1 ${staticSituationSecond[0]} = ${data.conversion_rates[`${staticSituationFirst[0]}`]} ${staticSituationFirst[0]}`
    )
}

let bodyFirstBlockCarusel = document.querySelectorAll(
  ".body-first-block-carusel-child1, .body-first-block-carusel-child2, .body-first-block-carusel-child3, .body-first-block-carusel-child4"
);
let staticSituationFirst = ["RUB"];

bodyFirstBlockCarusel.forEach(child => {
  child.addEventListener("click", () => {
    bodyFirstBlockCarusel.forEach(item => {
      item.style.backgroundColor = "#FFFFFF";
      item.style.color = "#C6C6C6";
    });
    child.style.backgroundColor = "#833AE0";
    child.style.color = "#ffffff";
    staticSituationFirst = [];
    switch (child.className[30]) {
      case "1":
        staticSituationFirst.push("RUB")
        break;
      case "2":
        staticSituationFirst.push("USD")
        break;
      case "3":
        staticSituationFirst.push("EUR")
        break;
      case "4":
        staticSituationFirst.push("GBP")
        break;
      default:
        console.log("Netersen , nevar ne yox");
    }
    exchangerReverse(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`)
    staticreverse(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`)
    static(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`)
    console.log(child.className[30])
    console.log(staticSituationFirst)

  });
});


let bodySecondBlockCarusel = document.querySelectorAll(
  ".body-second-block-carusel-child1, .body-second-block-carusel-child2, .body-second-block-carusel-child3, .body-second-block-carusel-child4"
);

let staticSituationSecond = ["USD"];

bodySecondBlockCarusel.forEach(child => {
  child.addEventListener("click", () => {
    bodySecondBlockCarusel.forEach(item => {
      item.style.backgroundColor = "#FFFFFF";
      item.style.color = "#C6C6C6";
    });
    child.style.backgroundColor = "#833AE0";
    child.style.color = "#ffffff";
    staticSituationSecond = [];
    switch (child.className[31]) {
      case "1":
        staticSituationSecond.push("RUB")
        break;
      case "2":
        staticSituationSecond.push("USD")
        break;
      case "3":
        staticSituationSecond.push("EUR")
        break;
      case "4":
        staticSituationSecond.push("GBP")
        break;
      default:
        console.log("Netersen , nevar ne yox");
    }
    exchanger(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`)
    static(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`)
    staticreverse(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`)
    console.log(child.className[31])
    console.log(staticSituationSecond)
  });
});

let inputFirst = document.querySelector(".body-first-result")
let inputSecond = document.querySelector(".body-second-result")
let firstSituation = 0;
let secondSituation = 0;
let k = 0;

inputFirst.addEventListener("input", () => {
  inputFirst.value = inputFirst.value.replace(/,/g, ".");
  inputFirst.value = inputFirst.value.replace(/[^0-9.]/g, "");
  let k = inputFirst.value.split(".");
  console.log(k)
  if (k.length>2) {
      inputFirst.value = k[0] + "." + k.slice(1).join("");
      k = inputFirst.value.split(".");
  }
  if (k.length === 2 && k[1].length > 5) {
    inputFirst.value = k[0] + "." + k[1].slice(0, 5);
    k = inputFirst.value.split(".");
  }
  
  console.log(k)
  if (inputFirst.value == ".") {
    inputFirst.value = "0.";
  } 
  if (secondSituation == 1) {
    return console.log("besdi islediyin");
  }
  change = 1;
  firstSituation = 1;
  exchanger(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`);
  firstSituation = 0;
});

inputSecond.addEventListener("input", () => {
  inputSecond.value = inputSecond.value.replace(/,/g, ".");
  inputSecond.value = inputSecond.value.replace(/[^0-9.]/g, "");
  let k = inputSecond.value.split(".");
  if (k.length>2) {
      inputSecond.value = k[0] + "." + k.slice(1).join("");
      k = inputSecond.value.split(".");
  }
  if (k.length === 2 && k[1].length > 5) {
    inputSecond.value = k[0] + "." + k[1].slice(0, 5);
    k = inputSecond.value.split(".");
  }
  
  if (inputSecond.value == ".") {
    inputSecond.value = "0.";
  }
  if (firstSituation == 1) {
    return console.log("besdi islediyin");
  }
  change = 2
  secondSituation = 1;
  exchangerReverse(`${staticSituationFirst[0]}`, `${staticSituationSecond[0]}`);
  secondSituation = 0;
});

let bodySecondValue = document.querySelector(".body-second-value")
let bodyFirstValue = document.querySelector(".body-first-value")

let currentValue = navigator.onLine;

let popUP = document.querySelector('.internet');
let change = 0;



