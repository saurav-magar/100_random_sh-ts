let array = []
let comparisons = 0

const container = document.getElementById("arrayContainer")
const statusText = document.getElementById("status")
const comparisonText = document.getElementById("comparisons")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function generateArray() {

    container.innerHTML = ""
    array = []

    let size = document.getElementById("size").value

    for (let i = 0; i < size; i++) {

        let value = Math.floor(Math.random() * 100) + 5
        array.push(value)

        let bar = document.createElement("div")
        bar.classList.add("bar")
        bar.style.height = value * 2 + "px"
        bar.innerHTML = `<span>${value}</span>`

        container.appendChild(bar)

    }

    statusText.innerText = "Status: Array Generated"
    comparisonText.innerText = "Comparisons: 0"
}

async function linearSearch() {

    let target = parseInt(document.getElementById("searchValue").value)
    let bars = document.getElementsByClassName("bar")
    let speed = document.getElementById("speed").value

    comparisons = 0

    for (let i = 0; i < array.length; i++) {

        bars[i].style.background = "yellow"
        comparisons++
        comparisonText.innerText = "Comparisons: " + comparisons

        statusText.innerText = "Checking index " + i

        await sleep(speed)

        if (array[i] === target) {

            bars[i].style.background = "green"
            statusText.innerText = "Element Found at index " + i
            return
        }

        bars[i].style.background = "red"

    }

    statusText.innerText = "Element Not Found"
}

async function binarySearch() {

    let target = parseInt(document.getElementById("searchValue").value)
    let speed = document.getElementById("speed").value

    array.sort((a, b) => a - b)

    generateSortedBars()

    let bars = document.getElementsByClassName("bar")

    let left = 0
    let right = array.length - 1

    comparisons = 0

    while (left <= right) {

        let mid = Math.floor((left + right) / 2)

        bars[mid].style.background = "yellow"

        comparisons++
        comparisonText.innerText = "Comparisons: " + comparisons

        statusText.innerText = "Checking middle index " + mid

        await sleep(speed)

        if (array[mid] === target) {

            bars[mid].style.background = "green"
            statusText.innerText = "Element Found at index " + mid
            return
        }

        else if (array[mid] < target) {

            bars[mid].style.background = "red"
            left = mid + 1

        }

        else {

            bars[mid].style.background = "red"
            right = mid - 1

        }

    }

    statusText.innerText = "Element Not Found"
}

function generateSortedBars() {

    container.innerHTML = ""

    array.forEach(value => {

        let bar = document.createElement("div")
        bar.classList.add("bar")
        bar.style.height = value * 2 + "px"
        bar.innerHTML = `<span>${value}</span>`

        container.appendChild(bar)

    })

}

function startSearch() {

    let algo = document.getElementById("algorithm").value

    if (algo === "linear") linearSearch()
    if (algo === "binary") binarySearch()

}

function reset() {

    container.innerHTML = ""
    array = []
    statusText.innerText = "Status: Reset"
    comparisonText.innerText = "Comparisons: 0"

}