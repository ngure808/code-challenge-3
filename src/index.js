// Your code here

document.addEventListener("DOMContentLoaded", () => {
    const localURL = "http://localhost:3000/films/";
    const ul = document.getElementById("films");
    const title = document.getElementById('title');
    const time = document.getElementById('runtime');
    const summary = document.getElementById('film-info');
    const when = document.getElementById('showtime');
    const ticket = document.getElementById('ticket-num');
    const btn = document.getElementById('buy-ticket');
    const image = document.getElementById("poster");

    function updateUI(){
      fetch(localURL)
     .then(response => response.json())
     .then(films => {
        ul.innerHTML = ""
       for(values of films){
        updateMovie(values)
       }
     })
    }
    updateUI();

    function updateMovie(films) {
        let remTickets = films.capacity - films.tickets_sold
        movieTitle = films.title
        filmId = films.id

        let li = document.createElement("li")
        if(!remTickets > 0){
            li.className = "sold-out"
        }
        ul.appendChild(li)

        const filmSpan = document.createElement("span")
        filmSpan.innerText = movieTitle
        li.appendChild(filmSpan)



        filmSpan.addEventListener("click", () =>{
            updatePage(films)
        })
        const remove = document.createElement("button")
        remove.innerHTML = "Delete"
        li.appendChild(remove)

        remove.addEventListener("click", () =>{
            removeMovie(films)
        })

        if(filmId === "1"){
            updatePage(films)
        }

    }

    function updatePage(films){
        let remTickets = films.capacity - films.tickets_sold
        let btnName;
        if (remTickets > 0){
            btnName = "Buy Ticket"
        } else {
            btnName = "Sold Out"
        }
        
        image.src = films.poster
        title.innerHTML = films.title;
        time.innerHTML = `${films.runtime} minutes`;
        summary.innerHTML = films.description;
        when.innerHTML = films.showtime;
        ticket.innerHTML = remTickets; 

        btn.addEventListener("click", () => {
            if (remTickets > 0){
                updateOnTickets(films)
            }else {
                console.log("You cannot buy tickets")
            }
            btn.dataset.filmId = films.id
            let button = document.querySelector(`[data-movie-id="${filmId}"]`)
            btn.innerText = btnName;
     })

    }
    function updateOnTickets(films){
        films.tickets_sold++
        let sold = films.tickets_sold
        let requestHeaders = {
            "Content-Type" : "application/json"
        }
        let requestBody = {
            "tickets_sold" : sold
        }
        fetch(localURL+films.id, {
            method : "PATCH",
            headers : requestHeaders,
            body:JSON.stringify(requestBody)
        })
        .then(response => response.json())
        .then(values => {
            updatePage(values)
            let num = values.capacity - values.tickets_sold
            if (!num > 0)
            {
                updateUI()
            }
            let addingKey = {
            "film_id" : values.id,
            "number_of_tickets" : numOfTickets
            } 
        
            fetch("http://localhost:3000/tickets", {
                method : "POST",
                headers : requestHeaders,
                body : JSON.stringify(addingKey)
            })
            .then(response => response.json())
            .then(values => values)  
            .catch(e => console.log(e.message))
        })
        .catch(e => console.log(e.message))
    }



    function removeMovie(film){
        let requestHeaders = {
            "Content-Type" : "application/json"
        }
        let remove = {
            "id" : film.id
        }
        fetch(localURL+film.id ,{
            method : "DELETE",
            Headers : requestHeaders,
            body : JSON.stringify(remove)
        })
        .then(response => response.json())
        .then(data => updateUI())
        .catch(e => console.log(e.message))
    }
});
   