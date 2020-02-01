// Variables globales
let id = '';
let area = '';

function showPopUp(overlay, popWindow, visibility = true) {
    if(visibility) {
        document.getElementById(overlay).style.visibility = 'visible';
        document.getElementById(popWindow).style.opacity = '1';
        document.getElementById(popWindow).style.transform = 'scale(1)';  
    }  else {
        document.getElementById(overlay).style.visibility = 'hidden';
        document.getElementById(popWindow).style.opacity = '0';
        document.getElementById(popWindow).style.transform = 'scale(.75)'; 
    } 
    
}

function darkmode() {
    let status = localStorage.getItem('darkmode');
    document.getElementsByTagName('body').class = 'darkmode'

    if(status === 'false' || status === null){
        console.log('ok darkmode is off');
        document.getElementById('body').classList.remove('darkmode')

    }else {
        document.getElementById('body').className = 'darkmode'
        console.log('darkmode is on');
        
    }
    console.log(status);
    
}

function showAlert(messagge = 'error', visibility = true) {
    if(visibility){
        document.getElementById('errOverlay').style.visibility = 'visible';
        document.getElementById('errPop').style.opacity = '1';
        document.getElementById('errPop').style.transform = 'scale(1)';  
        document.getElementById('mensaje').innerText = messagge;
    } else {
        document.getElementById('errOverlay').style.visibility = 'hidden';
        document.getElementById('errPop').style.opacity = '0';
        document.getElementById('errPop').style.transform = 'scale(.75)';  
    }
        
}

function getLSCards() {
    let array;

    if(localStorage.getItem('cards') === null){
        array = [];
    } else {
        array = JSON.parse(localStorage.getItem('cards'));
    }

    return array;

}

function counter(container = 'table-body') {
    let number = document.getElementById(container).children.length;
    let containerElement = document.getElementById(`counter-g`);
    containerElement.innerText = number;    
}

function filterData(status) {
    let cards = getLSCards();
    let cardsSelected;
    let btnRestore = document.getElementById('restore');
    if(status === 'all'){
        btnRestore.style.visibility = 'hidden';
        document.getElementById('all').classList.add('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
        showData(cards);
        counter();
    }else if(status === 'to-do') {
        btnRestore.style.visibility = 'hidden';
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.add('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
        cardsSelected = cards.filter(card => card.area === 'to-do');
        showData(cardsSelected)
        counter();
    }else if(status === 'doing'){
        btnRestore.style.visibility = 'hidden';
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.add('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
        cardsSelected = cards.filter(card => card.area === 'doing');
        showData(cardsSelected)
        counter();
    }else if(status === 'done'){
        btnRestore.style.visibility = 'hidden';
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.add('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
        cardsSelected = cards.filter(card => card.area === 'done');
        showData(cardsSelected)
        counter();
    }else if(status === 'processed'){
        btnRestore.style.visibility = 'visible';
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.add('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
        cardsSelected = cards.filter(card => card.area === 'processed');
        showData(cardsSelected)
        counter();
    }else if(status === 'recycleBin') {
        btnRestore.style.visibility = 'visible';
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.add('select-tab');
        cardsSelected = cards.filter(card => card.area === 'recycleBin');
        showData(cardsSelected)
        counter();
    }
}

function categoryselected(status) {
    // console.log(status);   
    if(status === 'all'){
        document.getElementById('all').classList.add('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
    }else if(status === 'to-do') {
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.add('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
    }else if(status === 'doing'){
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.add('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
    }else if(status === 'done'){
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.add('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
    }else if(status === 'processed'){
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.add('select-tab');
        document.getElementById('recycleBin').classList.remove('select-tab');
    }else if(status === 'recycleBin') {
        document.getElementById('all').classList.remove('select-tab')
        document.getElementById('to-do').classList.remove('select-tab');
        document.getElementById('doing').classList.remove('select-tab');
        document.getElementById('done').classList.remove('select-tab');
        document.getElementById('processed').classList.remove('select-tab');
        document.getElementById('recycleBin').classList.add('select-tab');
    }
}

function formatDate(fecha) {
    let arrayDate = fecha.split('-')
    let month;
    let monthArray = arrayDate[1];

    if(monthArray == '1'){
        month = 'Ene'
    }else if(monthArray === '2') {
        month = 'Feb';
    }else if(monthArray === '3') {
        month = 'Mar';
    }else if(monthArray === '4') {
        month = 'Abr';
    }else if(monthArray === '5') {
        month = 'Mayo';
    }else if(monthArray === '6') {
        month = 'Jun';
    }else if(monthArray === '7') {
        month = 'Jul';
    }else if(monthArray === '8') {
        month = 'Ago';
    }else if(monthArray === '9') {
        month = 'Sep';
    }else if(monthArray === '10') {
        month = 'Oct';
    }else if(monthArray === '11') {
        month = 'Nov';
    }else if(monthArray === '12') {
        month = 'Dec';
    }

    let format = `${arrayDate[1]} de ${month} del ${arrayDate[0]}`;
    return(format);
    
}

function status(baja, media, alta) {
    let html;

    if(baja) {
        html = `<p class="baja p-status">B</p>`
    }
    if(media) {
        html = `<p class="media p-status">M</p>`
    }
    if(alta) {
        html = `<p class="alta p-status">A</p>`
    
    }

    return html
}

function payment(pago) {
    if(pago !== 'Pending') {
        return `$${pago}`
    }
    return pago
}

function showData(cards) {
    document.getElementById('table-body').innerHTML = '';
    if(cards !== []) {
        cards.forEach(card => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.id = card.id;
            row.setAttribute('data-area', card.area);
            row.innerHTML = `
            <div class="col">#${card.id}</div>
            <div class="col">${card.nombreCliente}</div>
            <div class="col">${card.telefono}</div>
            <div class="col">${card.nombreEquipo}</div>
            <div class="col">${card.problemasEquipo}</div>
            <div class="col">${formatDate(card.fecha)}</div>
            <div class="col">${status(card.sBaja, card.sMedia, card.sAlta)}</div>
            <div class="col">${payment(card.pago)}</div>
            `;
            document.getElementById('table-body').appendChild(row);
        });
    } 
}

function showResults(result, inputSearch) {
    let cards = result;
    if(cards.length !== 0){
        document.getElementById('table-body').innerHTML = '';
        cards.forEach(card => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.id = card.id;
            row.innerHTML = `
            <div class="col">#${card.id}</div>
            <div class="col">${card.nombreCliente}</div>
            <div class="col">${card.telefono}</div>
            <div class="col">${card.nombreEquipo}</div>
            <div class="col">${card.problemasEquipo}</div>
            <div class="col">${formatDate(card.fecha)}</div>
            <div class="col">${status(card.sBaja, card.sMedia, card.sAlta)}</div>
            <div class="col">${payment(card.pago)}</div>
            `;
            if(inputSearch !== ''){
                categoryselected(card.area);

            } else {            
                categoryselected('all')
            }
            document.getElementById('table-body').appendChild(row);
        });
        counter()
    } else {
        filterData('all')        
    }
    
} 

function openFnRestore(area, id) {
    console.log(id);
    
    if (area === 'processed' || area === 'recycleBin') {
        if(id !== NaN) {
            showPopUp('overlay-restore', 'popRestore')
        }
    } else {
        // mostrar alert "Este elemento no se puede restaurar"
        showAlert('Seleccione un elemento, Recuerde que unicamente se pueden restaurar elementos previamente ya procesados o borrados');

    }
}

// al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    darkmode()
    document.getElementById('restore').style.visibility = 'hidden';
    let cards = getLSCards();
    showData(cards);
    counter();

});
// al dar click en las tabs
const tabs = document.getElementById('tabs');
tabs.addEventListener('click', (e) => {
    filterData(e.target.id);
});
// al clickear el boton menu
const menuButtonOpen = document.getElementById('menu');
menuButtonOpen.addEventListener('click', () => {
    showPopUp('overlay', 'popup');
});
// al clickear el boton cerrar el menu
const menuButtonClose = document.getElementById('cerrar');
menuButtonClose.addEventListener('click', () => {
    showPopUp('overlay', 'popup', false)
});
// al clickear el boton back 
const backButton = document.getElementById('back');
backButton.addEventListener('click', ()=> {
    window.history.back();
});
// al escribir en el campo finder

const finder = document.getElementById('finder');
finder.addEventListener('keyup', (e) => {
    let cards = getLSCards();
    let inputSearch = (e.target.value).toUpperCase();
    
    let search = cards.filter(card => card.datoBusqueda.indexOf(inputSearch) != -1 || card.datoBusqueda1.indexOf(inputSearch) != -1 || card.id === Number(inputSearch) );
    
    showResults(search, inputSearch);
});

// seleccionar el id y el area de los rows
const table = document.getElementById('table-body');
table.addEventListener('click', (e) => {
    id = Number(e.target.parentElement.id);
    area = e.target.parentElement.getAttribute('data-area');

    
});
// open el popup de restore
const buttonRestore = document.getElementById('restore');
buttonRestore.addEventListener('click', () => {
    openFnRestore(area, id);
})

// close popup
const closePopupAlert = document.getElementById('closePopupAlert');
closePopupAlert.addEventListener('click', () => {
    showAlert('', false)
});

const closePopupRestore = document.getElementById('closePopupRestore');
closePopupRestore.addEventListener('click', () => {
    showPopUp('overlay-restore', 'popRestore', false)
});

// funcionalidad de restaurar

const actionRestore = document.getElementById('actionRestore');
actionRestore.addEventListener('click', () => {
    let cards = getLSCards();

    cards.forEach((card) => {
        if(card.id == id) {
            card.area = 'to-do';
            card.pago = 'Pending';
        }
    });

    localStorage.setItem('cards', JSON.stringify(cards));
    filterData(area);
    showPopUp('overlay-restore', 'popRestore', false)
})