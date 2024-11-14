//this code runs asynchronously
async function getTodos(){
    const response = await fetch("http://localhost:3000/api/todos")
    //console.log(response)
    const data = await response.json()
    console.log(data, "\n")
    //console.log("getData finished")
    
    const ul = document.querySelector("ul")
    data.forEach(todo => {
        const li = document.createElement("li")
        li.textContent = todo.description
        ul.appendChild(li)
    });
}

//he explains client to server side and vice versa on the video in 11/13 for when you are studying
getTodos()