//add memo that we got from server on HTML
function displayMemo(memo){
    const ul= document.querySelector("#memo-ul");
    const li= document.createElement("li");
    li.innerText = `[id:${memo.id}] ${memo.content}`;
    ul.appendChild(li);
}

//read the memo that is posted on server GET
async function readMemo(){
    const res = await fetch('/memos')
    const jsonRes= await res.json();
    //need to clear ul everytime we read memo
    const ul= document.querySelector("#memo-ul");
    ul.innerHTML = "";
    //jsonRes is an array
    //go for each element in jsonRes array
    jsonRes.forEach(displayMemo);
}


//post memo on server POST
async function createMemo(value){
    const res= await fetch("/memos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: new Date().getTime(),
            content: value,
        }),
    }); 
    const jsonRes= await res.json();
    console.log(jsonRes);
    readMemo();
}

//what happens when submit btn is pressed
function handleSubmit(event){
    event.preventDefault();
    const input= document.querySelector("#memo-input");
    createMemo(input.value);
    input.value = "";
}



const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);


readMemo();