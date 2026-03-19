const container = document.getElementById("array");
let arr = [];

function createArray() {
  const input = document.getElementById("inputArray").value;
  arr = input.split(",").map(num => parseInt(num.trim()));

  container.innerHTML = "";

  arr.forEach(value => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 5}px`;

    const label = document.createElement("span");
    label.innerText = value;

    bar.appendChild(label);
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      bars[j].classList.add("active");
      bars[j + 1].classList.add("active");

      await sleep(900);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        bars[j].style.height = `${arr[j] * 5}px`;
        bars[j + 1].style.height = `${arr[j + 1] * 5}px`;

        bars[j].querySelector("span").innerText = arr[j];
        bars[j + 1].querySelector("span").innerText = arr[j + 1];

        bars[j].classList.add("swap");
        bars[j + 1].classList.add("swap");

        await sleep(500);

        bars[j].classList.remove("swap");
        bars[j + 1].classList.remove("swap");
      }

      bars[j].classList.remove("active");
      bars[j + 1].classList.remove("active");
    }

    bars[arr.length - i - 1].classList.add("sorted");
  }
}