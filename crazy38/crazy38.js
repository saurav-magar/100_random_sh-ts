let container = document.getElementById("container");

function generateArray() {
  container.innerHTML = "";

  let input = document.getElementById("arrayInput").value;
  let arr = input.split(",").map(Number);

  arr.forEach(value => {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 10 + "px";
    bar.innerText = value;
    container.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  let speed = 800;

  for (let i = 1; i < bars.length; i++) {
    let key = parseInt(bars[i].innerText);
    let j = i - 1;

    bars[i].style.background = "red";
    await sleep(speed);

    while (j >= 0 && parseInt(bars[j].innerText) > key) {
      bars[j].style.background = "orange";

      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].innerText = bars[j].innerText;

      j--;
      await sleep(speed);
    }

    bars[j + 1].style.height = key * 3 + "px";
    bars[j + 1].innerText = key;

    for (let k = 0; k <= i; k++) {
      bars[k].style.background = "#22c55e";
    }
  }
}