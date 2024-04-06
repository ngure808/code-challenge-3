// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const localURL = "http://localhost:3000/films"
    const ul = document.getElementById("films")

    fetch(localURL)
    .then(response => response.json())
    .then(films => 
        films.forEach((value) => addsTitle(value.title.toUpperCase()))
    )

    function addsTitle(title){
        const li = document.createElement("li")
        li.innerHTML = title
        ul.appendChild(li)
        li.style.textDecoration = "underline"
    }

    // const image = document.getElementById("poster")
    
})