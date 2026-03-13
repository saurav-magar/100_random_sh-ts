let stack = [];
const container = document.getElementById("listContainer");
const status = document.getElementById("status");

function renderStack(){

container.innerHTML="";

stack.forEach((value,index)=>{

const node=document.createElement("div");
node.className="node";
node.innerText=value;

if(index===stack.length-1){
node.classList.add("highlight");
}

container.appendChild(node);

});

}

function push(){

const input=document.getElementById("valueInput");
const value=input.value;

if(value===""){
status.innerText="Enter a value first";
return;
}

stack.push(value);
status.innerText="Pushed "+value+" to stack";

input.value="";
renderStack();

}

function pop(){

if(stack.length===0){
status.innerText="Stack Underflow";
return;
}

let removed=stack.pop();

status.innerText="Popped "+removed+" from stack";

renderStack();

}

function peek(){

if(stack.length===0){
status.innerText="Stack is empty";
return;
}

let topNode=container.lastChild;

topNode.classList.add("found");

status.innerText="Top element is "+stack[stack.length-1];

setTimeout(()=>{
topNode.classList.remove("found");
},1000);

}

function clearStack(){

stack=[];
renderStack();

status.innerText="Stack cleared";

}