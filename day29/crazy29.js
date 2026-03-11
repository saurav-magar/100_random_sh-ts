let array = [];

const container = document.getElementById("arrayContainer");
const statusText = document.getElementById("status");

function renderArray() {
    container.innerHTML = "";

    array.forEach((value, index) => {
        const box = document.createElement("div");
        box.classList.add("box");

        box.innerHTML = `
            ${value}
            <span>${index}</span>
        `;

        container.appendChild(box);
    });
}

function insertValue() {

    const valueInput = document.getElementById("valueInput");
    const value = parseInt(valueInput.value);

    if (isNaN(value)) {
        statusText.innerText = "Enter a valid value";
        return;
    }

    array.push(value);

    valueInput.value = "";
    statusText.innerText = `Inserted ${value}`;

    renderArray();
}

function deleteValue() {

    const indexInput = document.getElementById("indexInput");
    const index = parseInt(indexInput.value);

    if (isNaN(index) || index < 0 || index >= array.length) {
        statusText.innerText = "Invalid index";
        return;
    }

    array.splice(index, 1);

    indexInput.value = "";
    statusText.innerText = `Deleted element at index ${index}`;

    renderArray();
}

function updateValue() {

    const value = parseInt(document.getElementById("valueInput").value);
    const index = parseInt(document.getElementById("indexInput").value);

    if (isNaN(value) || isNaN(index) || index < 0 || index >= array.length) {
        statusText.innerText = "Invalid value or index";
        return;
    }

    array[index] = value;

    statusText.innerText = `Updated index ${index} with ${value}`;

    renderArray();
}

async function searchValue() {

    const value = parseInt(document.getElementById("valueInput").value);
    const boxes = document.getElementsByClassName("box");

    if (isNaN(value)) {
        statusText.innerText = "Enter value to search";
        return;
    }

    for (let i = 0; i < array.length; i++) {

        boxes[i].classList.add("highlight");

        await new Promise(resolve => setTimeout(resolve, 400));

        if (array[i] === value) {

            boxes[i].classList.remove("highlight");
            boxes[i].classList.add("found");

            statusText.innerText = `Value found at index ${i}`;
            return;
        }

        boxes[i].classList.remove("highlight");
    }

    statusText.innerText = "Value not found";
}

function resetArray() {

    array = [];
    container.innerHTML = "";

    statusText.innerText = "Array reset";
}