const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

populateUI();


// + turns string into number. Instead of parseint
let ticketPrice = +movieSelect.value;


//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //... = spreadoperator -> copies elements of array. Converts nodelist in regular array
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    });

    //store strings in browser(built in) . Seats index is array -> wrap in JSON.stringify to make string
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    const selectedSeatsCount = selectedSeats.length;


   count.innerText = selectedSeatsCount;
   total.innerText = selectedSeatsCount * ticketPrice;
}

// get data form local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //check to see if anything is in the selected seats
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1 ) {
                seat.classList.add('selected');
            }
        });

    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex= selectedMovieIndex;
    }
}
//select movie
movieSelect.addEventListener('change', (e) =>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

//select seat
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

//
updateSelectedCount();