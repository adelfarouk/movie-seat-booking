const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie'); // <select>


// get selectedSeats and selectedMoiveIndex from localStorage
populateUI();

let ticketPrice = +movieSelect.value;  // use (let) not (const), cz it will updating

// <select> event: to update count & total if <select> changes
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// this approach is better than => seats.forEach(seat => addEventListener('click', =>{})), and make event for each seat
container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// update count and total
function updateSelectedCount() {

    // select all selected seats:
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // need to know index of each selected seat in all seats, to store it and be able to retrieve
    // this will return array of selected ((INDEXES)) from global (seats)
    // (seats) themselves are indexes at first_level, then we get their indexes in its order! [1,2,3,4,5] -> in fact these are indexes, but we get index of 1 e.g in this array of indexes!
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // store in LocalStorage:  => with non-primitives dataType we use (JSON.stringfy)
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Initial count and total set => to get proper count & total when reload page
updateSelectedCount();


/*
first thing will implement is [populateUI()] to data from localStorage,
then [updateSelectedCount()] to innerText these data
- forEach: doesn't return anything
- map: return new array
- localStorage: can store string in the browser
- make (addEventListener('click', (e)) to the whole container, and use (e.target) to reach the exact element
- if something isn't in localStorage, it's value = (null)
- 
*/