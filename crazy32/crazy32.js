let queue = [];

function renderQueue(){

    const queueDiv = document.getElementById("queue");
    queueDiv.innerHTML="";

    queue.forEach((value,index)=>{

        const element=document.createElement("div");
        element.classList.add("queue-item");
        element.textContent=value;

        if(index===0){
            element.classList.add("front");
        }

        if(index===queue.length-1){
            element.classList.add("rear");
        }

        queueDiv.appendChild(element);
    });
}

function enqueue(){

    const input=document.getElementById("valueInput");
    const value=input.value;

    if(value===""){
        showMessage("Enter a value first");
        return;
    }

    queue.push(value);
    input.value="";

    showMessage(value + " enqueued");
    renderQueue();
}

function dequeue(){

    if(queue.length===0){
        showMessage("Queue is empty");
        return;
    }

    const removed=queue.shift();

    showMessage(removed + " dequeued");
    renderQueue();
}

function peek(){

    if(queue.length===0){
        showMessage("Queue is empty");
        return;
    }

    showMessage("Front element: " + queue[0]);
}

function clearQueue(){
    queue=[];
    renderQueue();
    showMessage("Queue cleared");
}

function showMessage(msg){
    document.getElementById("message").textContent=msg;
}