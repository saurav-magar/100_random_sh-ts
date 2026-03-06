let memoryBlocks = [];
let processes = [];
let internalFragmentation = 0;

function addBlock() {

    const size = parseInt(document.getElementById("blockSize").value);

    if (!size) return;

    memoryBlocks.push({
        size: size,
        allocated: false,
        process: null
    });

    renderMemory();

    document.getElementById("blockSize").value = "";
}

function addProcess() {

    const size = parseInt(document.getElementById("processSize").value);

    if (!size) return;

    processes.push({
        id: "P" + (processes.length + 1),
        size: size
    });

    renderProcesses();

    document.getElementById("processSize").value = "";
}

function allocateMemory() {

    const algo = document.getElementById("algorithm").value;

    processes.forEach(process => {

        let index = -1;

        if (algo === "first") {
            index = firstFit(process);
        }

        if (algo === "best") {
            index = bestFit(process);
        }

        if (algo === "worst") {
            index = worstFit(process);
        }

        if (index != -1) {

            memoryBlocks[index].allocated = true;
            memoryBlocks[index].process = process;

            internalFragmentation += memoryBlocks[index].size - process.size;

        }

    });

    processes = [];
    renderProcesses();
    renderMemory();
    updateStats();
}

function firstFit(process) {

    for (let i = 0; i < memoryBlocks.length; i++) {

        if (!memoryBlocks[i].allocated && memoryBlocks[i].size >= process.size) {
            return i;
        }

    }

    return -1;
}

function bestFit(process) {

    let bestIndex = -1;

    for (let i = 0; i < memoryBlocks.length; i++) {

        if (!memoryBlocks[i].allocated && memoryBlocks[i].size >= process.size) {

            if (bestIndex == -1 || memoryBlocks[i].size < memoryBlocks[bestIndex].size) {
                bestIndex = i;
            }

        }

    }

    return bestIndex;
}

function worstFit(process) {

    let worstIndex = -1;

    for (let i = 0; i < memoryBlocks.length; i++) {

        if (!memoryBlocks[i].allocated && memoryBlocks[i].size >= process.size) {

            if (worstIndex == -1 || memoryBlocks[i].size > memoryBlocks[worstIndex].size) {
                worstIndex = i;
            }

        }

    }

    return worstIndex;
}

function renderMemory() {

    const memoryArea = document.getElementById("memoryArea");

    memoryArea.innerHTML = "";

    memoryBlocks.forEach(block => {

        const div = document.createElement("div");

        div.classList.add("block");

        div.style.height = (block.size / 2) + "px";

        if (block.allocated) {

            div.classList.add("used");

            div.innerText = `${block.process.id}
(${block.process.size}KB)
Free:${block.size - block.process.size}`;

        } else {

            div.classList.add("free");

            div.innerText = `Free ${block.size}KB`;

        }

        memoryArea.appendChild(div);

    });

}

function renderProcesses() {

    const queue = document.getElementById("processQueue");

    queue.innerHTML = "";

    processes.forEach(p => {

        const div = document.createElement("div");

        div.classList.add("process");

        div.innerText = `${p.id} - ${p.size}KB`;

        queue.appendChild(div);

    });

}

function updateStats() {

    document.getElementById("internalFrag").innerText =
        "Internal Fragmentation: " + internalFragmentation + " KB";

}

function resetSystem() {

    memoryBlocks = [];
    processes = [];
    internalFragmentation = 0;

    renderMemory();
    renderProcesses();
    updateStats();
}