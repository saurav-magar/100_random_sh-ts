let processes = [];

function addProcess() {

    let name = document.getElementById("processName").value;
    let burst = parseInt(document.getElementById("burstTime").value);

    if (!name || !burst) return;

    processes.push({
        name: name,
        burst: burst,
        remaining: burst
    });

    renderQueue();

    document.getElementById("processName").value = "";
    document.getElementById("burstTime").value = "";
}

function renderQueue() {

    let queue = document.getElementById("processQueue");
    queue.innerHTML = "";

    processes.forEach(p => {

        let div = document.createElement("div");
        div.className = "process";
        div.innerText = p.name + " (" + p.burst + ")";

        queue.appendChild(div);

    });
}

function runSimulation() {

    let algo = document.getElementById("algorithm").value;

    if (algo === "fcfs") runFCFS();
    if (algo === "sjf") runSJF();
    if (algo === "rr") runRR();

}

function drawGantt(order) {

    let chart = document.getElementById("ganttChart");
    chart.innerHTML = "";

    order.forEach(p => {

        let div = document.createElement("div");
        div.className = "block";
        div.innerText = p;

        chart.appendChild(div);

    });
}

function runFCFS() {

    let order = [];
    let time = 0;
    let waiting = 0;
    let turnaround = 0;

    processes.forEach(p => {

        order.push(p.name);

        waiting += time;
        time += p.burst;
        turnaround += time;

    });

    drawGantt(order);

    document.getElementById("avgWaiting").innerText = "Average Waiting Time: " + (waiting / processes.length).toFixed(2);

    document.getElementById("avgTurnaround").innerText = "Average Turnaround Time: " + (turnaround / processes.length).toFixed(2);

}

function runSJF() {

    let sorted = [...processes].sort((a, b) => a.burst - b.burst);

    let order = [];
    let time = 0;
    let waiting = 0;
    let turnaround = 0;

    sorted.forEach(p => {

        order.push(p.name);

        waiting += time;
        time += p.burst;
        turnaround += time;

    });

    drawGantt(order);

    document.getElementById("avgWaiting").innerText = "Average Waiting Time: " + (waiting / processes.length).toFixed(2);

    document.getElementById("avgTurnaround").innerText = "Average Turnaround Time: " + (turnaround / processes.length).toFixed(2);

}

function runRR() {

    let quantum = parseInt(document.getElementById("quantum").value);

    let queue = processes.map(p => ({ ...p }));

    let order = [];
    let time = 0;

    while (queue.some(p => p.remaining > 0)) {

        for (let p of queue) {

            if (p.remaining > 0) {

                let exec = Math.min(quantum, p.remaining);

                order.push(p.name);

                p.remaining -= exec;
                time += exec;

            }

        }

    }

    drawGantt(order);

    document.getElementById("avgWaiting").innerText = "Round Robin Simulation Complete";

    document.getElementById("avgTurnaround").innerText = "Check execution order above";

}

function resetAll() {

    processes = [];
    document.getElementById("processQueue").innerHTML = "";
    document.getElementById("ganttChart").innerHTML = "";
    document.getElementById("avgWaiting").innerText = "";
    document.getElementById("avgTurnaround").innerText = "";

}