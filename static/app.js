//delete memo
async function deleteMemo(event){
    const id= event.target.dataset.id;
    const res= await fetch(`/memos/${id}`, {
        //when delete, use method DELETE
        method: "DELETE",
    }); 
    readMemo();
}

//update memo
async function editMemo(event){
    //get id of the btn we pressed, so we know which btn to update
    const id= event.target.dataset.id;
    const editInput= prompt("update your memo");
    const res= await fetch(`/memos/${id}`, {
        //when updating, use method PUT
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            content: editInput,
        }),
    }); 
    readMemo();
}


//add memo that we got from server on HTML
function displayMemo(memo){
    const ul= document.querySelector("#memo-ul");
    const li= document.createElement("li");
    //make update btn
    const updateBtn= document.createElement("button");
    //make delete btn
    const deleteBtn = document.createElement("button");

    li.innerText = `[id:${memo.id}] ${memo.content}`;
    updateBtn.innerText = "update";
    updateBtn.addEventListener("click", editMemo);
    deleteBtn.innerText= "delete";
    deleteBtn.addEventListener("click", deleteMemo);

    //add id info to btn, so we know which btn was pressed
    updateBtn.dataset.id= memo.id;
    deleteBtn.dataset.id= memo.id;

    ul.appendChild(li);
    li.appendChild(updateBtn);
    li.appendChild(deleteBtn);

}

//read the memo that is posted on server GET
async function readMemo(){
    const res = await fetch('/memos')
    const jsonRes= await res.json();
    //need to clear ul everytime we read memo
    const ul= document.querySelector("#memo-ul");
    ul.innerText = "";
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