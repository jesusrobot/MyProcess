let idCard = '';
let costoGlobal = '0';

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

function createId() {
    let position;
    if(localStorage.getItem('cards') === null){
        position = 0;
    }
    if(localStorage.getItem('cards') !== null){
        position = JSON.parse(localStorage.getItem('cards')).length;
    }

    return position;
}

function priority(baja, media, alta) {
    if(baja === true) {
        return '<div class="p-item baja">Baja</div>'
    }
    if(media === true) {
        return '<div class="p-item media">Media</div>'
    }   
    if(alta === true) {
        return '<div class="p-item alta">Alta</div>'
    }
}

function priorityText(baja, media, alta) {
    if(baja === true) {
        return 'Baja'
    }
    if(media === true) {
        return 'Media'
    }   
    if(alta === true) {
        return 'Alta'
    }
}

function counter(container) {
    let number = document.getElementById(container).children.length;
    let containerElement = document.getElementById(`${container}-number`);
    containerElement.innerText = number;    
}

function counterAll(container1 = 'to-do', container2 = 'doing', container3 = 'done') {
    let number1 = document.getElementById(container1).children.length;
    let number2 = document.getElementById(container2).children.length;
    let number3 = document.getElementById(container3).children.length;
    document.getElementById('counter-g').innerText = number1+number2+number3;
}


// ESTE CODIGO NO SE USA EN NINGUN LUGUAR
// function printDiv(nombreDiv) {
//     var contenido= document.getElementById(nombreDiv).innerHTML;
//     var contenidoOriginal= document.body.innerHTML;

//     document.body.innerHTML = contenido;

//     window.print();

//     document.body.innerHTML = contenidoOriginal;
//     window.location.href = 'panel.html'
// }

function chargeCard() {
    let cards = getLSCards();
    document.getElementById('to-do').innerHTML = '';
    document.getElementById('doing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    cards.forEach(card => {
        let element = document.createElement('div');
        element.id = card.id;
        element.className = 'card-job';
        element.innerHTML =  `
            <div class="overlay-card" id="${card.id}  draggable="true"></div>
                <div class="indicator"></div>
                <div class="description-card">
                        <div class="title-card">
                            <p class="name-product-card">${card.nombreEquipo}</p>
                            <button class="button more"><img src="assets/icons/context-menu.svg" alt="" id="actionsCard" class="icon"></button>
                        </div>
                        <div class="client">${card.nombreCliente}</div>                      
                </div>
                <div class="more-info-card">
                    <div class="tasks">
                        <img class="icon" src="assets/icons/cal.svg" alt="">
                        <p class="number-of-task">${card.fecha}</p>
                    </div> 
                    <div class="prioridad">
                        <span>Prioridad:</span> ${priority(card.sBaja, card.sMedia, card.sAlta)}
                    </div>
                </div>
        `;
        if(card.area === 'to-do') {
            document.getElementById(card.area).appendChild(element)
        }
        if(card.area === 'doing'){   
            document.getElementById(card.area).appendChild(element)
        }
        if(card.area === 'done'){   
            document.getElementById(card.area).appendChild(element)
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    darkmode()
    chargeCard();
    counter('to-do')
    counter('doing')    
    counter('done')
    counterAll()
});

let buttonCloseAlert = document.getElementById('closePopupAlert');
buttonCloseAlert.addEventListener('click', () => {
    showAlert(' ', false)
});

const  addElementButton = document.getElementById('addElement');
addElementButton.addEventListener('click', () => {
    showPopUp('overlay-add', 'popup-add')
});

const closeAddPopupButton = document.getElementById('closeAdd');
closeAddPopupButton.addEventListener('click', () => {
    showPopUp('overlay-add', 'popup-add', false);

    // close  y limpitar los cambios

    document.getElementById('nombre_equipo').value = ''
    document.getElementById('problemas_equipo').value = ''
    document.getElementById('marca').value = ''
    document.getElementById('modelo').value = ''
    document.getElementById('noSerie').value = ''
    document.getElementById('color').value = ''
    document.getElementById('nombre_Cliente').value = ''
    document.getElementById('dir').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('fecha').value = ''
    document.getElementById('checkbox-1').checked = false
});

const saveAddButton = document.getElementById('saveAdd');
saveAddButton.addEventListener('click', () => {
    let datos = {
        id: createId(),
        nombreEquipo: document.getElementById('nombre_equipo').value,
        problemasEquipo: document.getElementById('problemas_equipo').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        noSerie: document.getElementById('noSerie').value,
        color: document.getElementById('color').value,
        nombreCliente: document.getElementById('nombre_Cliente').value,
        dir: document.getElementById('dir').value,
        telefono: document.getElementById('telefono').value,
        fecha: document.getElementById('fecha').value,
        sBaja: document.getElementById('baja').checked,
        sMedia: document.getElementById('media').checked,
        sAlta: document.getElementById('alta').checked,
        charger: document.getElementById('checkbox-1').checked,
        area: 'to-do',
        datoBusqueda: (document.getElementById('nombre_equipo').value).toUpperCase(),
        datoBusqueda1: (document.getElementById('nombre_Cliente').value).toUpperCase()

    }

    let {nombreEquipo, problemasEquipo, marca, modelo, noSerie, color, 
    nombreCliente, dir, telefono} = datos;

    if(nombreEquipo !== '' && problemasEquipo !== '' && marca !== '' && 
    modelo !== '' && noSerie !== '' && color !== '' && 
    nombreCliente !== '' && dir !== '' && telefono !== '') {

        let cardsLS = getLSCards();
        
        cardsLS.push(datos);
        
        localStorage.setItem('cards', JSON.stringify(cardsLS));
        chargeCard();        
        counter('to-do')
        counterAll()
        showPopUp('overlay-add', 'popup-add', false);

    } else {
        showAlert('Todos los campos son obligatorios');
    }

    // clear
    document.getElementById('nombre_equipo').value = ''
    document.getElementById('problemas_equipo').value = ''
    document.getElementById('marca').value = ''
    document.getElementById('modelo').value = ''
    document.getElementById('noSerie').value = ''
    document.getElementById('color').value = ''
    document.getElementById('nombre_Cliente').value = ''
    document.getElementById('dir').value = ''
    document.getElementById('telefono').value = ''
    document.getElementById('fecha').value = ''
    document.getElementById('checkbox-1').checked = false
});

const menuButtonOpen = document.getElementById('menu');
menuButtonOpen.addEventListener('click', () => {
    showPopUp('overlay', 'popup');
});

const menuButtonClose = document.getElementById('cerrar');
menuButtonClose.addEventListener('click', () => {
    showPopUp('overlay', 'popup', false)
});

const backButton = document.getElementById('back');
backButton.addEventListener('click', ()=> {
    window.history.back();
});

let zone = document.getElementById('main-zone');
zone.addEventListener('click', (e) => {
    if(e.target.id === 'actionsCard') {
        showPopUp('overlay-options', 'optionsPop');
        idCard = e.target.parentElement.parentElement.parentElement.parentElement.id;
        let cardsLS = getLSCards();
        let cardSelected = cardsLS[idCard];
        if (cardSelected.area === 'done') {
            document.getElementById('p-container').classList.remove('hidden')
        } 
        if(cardSelected.area !== 'done'){
            document.getElementById('p-container').classList.add('hidden')

        }
    }
    
});

let closeOptions = document.getElementById('closePopupOptions');
closeOptions.addEventListener('click', () => {
    showPopUp('overlay-options', 'optionsPop', false);
});

let editButton = document.getElementById('edit');
editButton.addEventListener('click', ()=> {
    showPopUp('overlay-options', 'optionsPop', false);
    showPopUp('overlay-edit', 'popup-edit');
    let cardsLS = getLSCards();
    let cardSelected = cardsLS[idCard]; 
    
    let nombre_equipo = document.getElementById('nombre_equipo1');
    let problemas_equipo = document.getElementById('problemas_equipo1');
    let marca = document.getElementById('marca1');
    let modelo = document.getElementById('modelo1');
    let noSerie = document.getElementById('noSerie1');
    let color = document.getElementById('color1');
    let nombre_Cliente = document.getElementById('nombre_Cliente1');
    let dir = document.getElementById('dir1');
    let telefono = document.getElementById('telefono1');
    let fecha = document.getElementById('fecha1');
    let baja = document.getElementById('baja1');
    let media = document.getElementById('media1');
    let alta = document.getElementById('alta1');
    let charger = document.getElementById('checkbox-11');

    nombre_equipo.value = cardSelected.nombreEquipo;
    problemas_equipo.value = cardSelected.problemasEquipo;
    marca.value = cardSelected.marca;
    modelo.value = cardSelected.modelo;
    noSerie.value = cardSelected.noSerie;
    color.value = cardSelected.color;
    nombre_Cliente.value = cardSelected.nombreCliente;
    dir.value = cardSelected.dir;
    telefono.value = cardSelected.telefono;
    fecha.value = cardSelected.fecha;
    baja.checked = cardSelected.sMedia;
    media.checked = cardSelected.sMedia;
    alta.checked = cardSelected.sAlta; 
    charger.checked = cardSelected.charger   
})

let saveEdit = document.getElementById('saveEdit');
saveEdit.addEventListener('click', ()=> {
    let nombre_equipo = document.getElementById('nombre_equipo1');
    let problemas_equipo = document.getElementById('problemas_equipo1');
    let marca = document.getElementById('marca1');
    let modelo = document.getElementById('modelo1');
    let noSerie = document.getElementById('noSerie1');
    let color = document.getElementById('color1');
    let nombre_Cliente = document.getElementById('nombre_Cliente1');
    let dir = document.getElementById('dir1');
    let telefono = document.getElementById('telefono1');
    let fecha = document.getElementById('fecha1');
    let baja = document.getElementById('baja1');
    let media = document.getElementById('media1');
    let alta = document.getElementById('alta1');
    let charger = document.getElementById('checkbox-11');


    if(nombre_equipo.value !== '' &&
    problemas_equipo.value !== '' &&
    marca.value !== '' &&
    modelo.value !== '' && 
    noSerie.value !== '' && 
    color.value !== '' && 
    nombre_Cliente.value !== '' &&
    dir.value !== '' && 
    telefono.value !== '' && 
    fecha.value !== '') {
        let cardsLS = getLSCards();

        let cardSelected = cardsLS[idCard];

        
            cardSelected.nombreEquipo = nombre_equipo.value
            cardSelected.problemasEquipo = problemas_equipo.value
            cardSelected.marca = marca.value
            cardSelected.modelo = modelo.value
            cardSelected.noSerie = noSerie.value
            cardSelected.color = color.value
            cardSelected.nombreCliente = nombre_Cliente.value
            cardSelected.dir = dir.value
            cardSelected.telefono = telefono.value
            cardSelected.fecha = fecha.value
            cardSelected.sBaja = baja.checked
            cardSelected.sMedia = media.checked
            cardSelected.sAlta = alta.checked
            cardSelected.charger = charger.checked

        
        localStorage.setItem('cards', JSON.stringify(cardsLS));

        document.getElementById('to-do').innerHTML = '';
        document.getElementById('doing').innerHTML = '';
        document.getElementById('done').innerHTML = '';
        
        chargeCard();        

        showPopUp('overlay-edit', 'popup-edit', false);
        showPopUp('overlay-options', 'optionsPop', false);



    } else {
        showAlert('Todos los campos son obligatorios');
    }
})

let editClose = document.getElementById('closeEdit');
editClose.addEventListener('click', ()=> {
    showPopUp('overlay-edit', 'popup-edit', false);
    showPopUp('overlay-options', 'optionsPop');
});

let deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', ()=>{
    let cardsLS = getLSCards();
    // let cardSelected = cardsLS[idCard];
    // cardsLS.splice(idCard);
    showPopUp('overlay-options', 'optionsPop', false);
    showPopUp('overlay-delete', 'deletePop');

});

let deleteButtonClose = document.getElementById('closePopupDelete');
deleteButtonClose.addEventListener('click', ()=> {
    showPopUp('overlay-delete', 'deletePop', false);
    showPopUp('overlay-options', 'optionsPop');

});

let saveDelete = document.getElementById('actionDelete');
saveDelete.addEventListener('click', ()=> {
    let cardsLS = getLSCards();
    let cardSelected = cardsLS[idCard];
    cardSelected.area = 'recycleBin';
    localStorage.setItem('cards', JSON.stringify(cardsLS));
    
    chargeCard();
    counter('to-do')
    counter('doing')
    counter('done')
    counterAll()
    showPopUp('overlay-delete', 'deletePop', false);
    
});

let proccessButton = document.getElementById('proccess');
proccessButton.addEventListener('click', ()=> {
    showPopUp('overlay-options', 'optionsPop', false);
    showPopUp('processOverlay', 'procesoPop');
    document.getElementById('checkbox').checked = true;
});

let closePopupProcess = document.getElementById('closePopupProcess');
closePopupProcess.addEventListener('click', () => {
    showPopUp('processOverlay', 'procesoPop',false);
    showPopUp('overlay-options', 'optionsPop');
    // clear
    document.getElementById('costo').value = '';
    document.getElementById('pago').value = '';
});

function dateformat(date) {
    let year = '';
    if(date == 0) {
        year = 'Enero'
    } 
    if(date == 1) {
        year = 'Febrero'
    } 
    if(date == 2) {
        year = 'Marzo'
    } 
    if(date == 3) {
        year = 'Abril'
    } 
    if(date == 4) {
        year = 'Mayo'
    } 
    if(date == 5) {
        year = 'Junio'
    } 
    if(date == 6) {
        year = 'Julio'
    } 
    if(date == 7) {
        year = 'Agosto'
    } 
    if(date == 8) {
        year = 'Septiembre'
    } 
    if(date == 9) {
        year = 'Octubre'
    } 
    if(date == 10) {
        year = 'Noviembre'
    } 
    if(date == 11) {
        year = 'Diciembre'
    } 
    return year
}

let actionProcess = document.getElementById('actionProcess');
actionProcess.addEventListener('click', () => {
    let pago = Number(document.getElementById('pago').value);
    let costo = Number(document.getElementById('costo').value);
    let checkbox = document.getElementById('checkbox').checked;
    costoGLobal = costo;
    let cards = getLSCards();
    let cardSelected = cards[idCard];
    // console.log(cardSelected);
    

    if(pago != '' && costo != '') {
        if(pago >= costo) {
            if(checkbox) {
                showPopUp('processOverlay', 'procesoPop', false);
                showPopUp('overlay-print', 'popup-print');
                // importantes funcionalidades de impreison: cargar data del ticket
                let templete = `
                <article class="ticket">
                        <header>
                            <div class="top">
                                <div class="logo">MyProcess</div>
                                <div class="aside">
                                    <div class="direction">Impulse Softworks Company</div>
                                    <div class="website">www.mystore.com</div>
                                </div>
                            </div>
                            <div class="middle">
                                <div class="direction">Palo alto California</div>
                                <div class="phone">626 108 91 14</div>
                            </div>
                        </header>
                        <section class="products">
                            <div class="info-table">
                                <div class="col cant">Cant.</div>
                                <div class="col name">Nombre</div>
                                <div class="col price">Precio</div>
                            </div>
                            <div id="insert" class="insert">
                                <div class="item-ticket">
                                <div class="col cant-item">${1}</div>
                                    <div class="col description-item">${(cardSelected.nombreEquipo)}</div>
                                    <div class="col price-item">$${costo}</div>
                                </div>
                            </div>
                            <div class="total">
                                
                                        <div>
                                            <p class="total-title">Total</p>
                                            <div class="total-sell">$${costo}</div>
                                        </div>
                                        <div>
                                            <p class="total-title">Pago con</p>
                                            <div class="total-sell">$${pago}</div>
                                        </div>
                                        <div>
                                            <p class="total-title">Su cambio</p>
                                            <div class="total-sell">$${(pago)-(costo)}</div>
                                        </div>
                                
                            </div>
                        </section>
                        <footer>
                            <p class="gratitude">Muchas gracias por su visita!</p>
                            <div class="date">${new Date().getDate()} del ${ dateformat(new Date().getMonth())} del ${new Date().getFullYear()}</div>
                        </footer>
                    </article>
                `;
                document.getElementById('insertTicket').innerHTML = templete  
            }else {
                let cards = getLSCards();
                let cardSelected = cards[idCard];
            
                cardSelected.area = 'processed';
                localStorage.setItem('cards', JSON.stringify(cards));

                showPopUp('processOverlay', 'procesoPop', false);

                chargeCard();

                counter('done')
                counterAll()
                cardSelected.pago = costo;
                localStorage.setItem('cards', JSON.stringify(cards))

            }

        } else {
            showAlert(`Pago Insuficiente se necesitan $${costo-pago} mas`);
        }
    } else {
        showAlert(`'Todos los campos son obligatorios`);

    }
    //  clear
    document.getElementById('costo').value = '';
    document.getElementById('pago').value = '';

});

let actionPrint = document.getElementById('actionPrint');
actionPrint.addEventListener('click', () => {
    // printDiv('insertTicket')
    
    window.print();

    let cards = getLSCards();
    let cardSelected = cards[idCard];

    cardSelected.area = 'processed';
    localStorage.setItem('cards', JSON.stringify(cards));

    chargeCard();
    counter('to-do')
    counter('doing')
    counter('done')
    counterAll()
    console.log(costoGlobal);
    
    cardSelected.pago = costoGLobal;
    localStorage.setItem('cards', JSON.stringify(cards))

});
console.log(costoGlobal);

let closePopupPrint = document.getElementById('closePopupPrint');
closePopupPrint.addEventListener('click', () => {
    showPopUp('overlay-print', 'popup-print', false);
    showPopUp('processOverlay', 'procesoPop');
});

const finder = document.getElementById('finder');
finder.addEventListener('keyup', (e) => {
    let cards = getLSCards();
    let inputSearch = (e.target.value).toUpperCase();
    // console.log(input);    
    
    let cardsDisponibles = cards.filter(card => card.area !== 'processed' && card.area !== 'recycleBin');
    let search = cardsDisponibles.filter(card => card.datoBusqueda.indexOf(inputSearch) != -1 || card.datoBusqueda1.indexOf(inputSearch) != -1 || card.id === Number(inputSearch) );

    showResults(search);
});

function showResults(result) {
    let cards = result;
    document.getElementById('to-do').innerHTML = '';
    document.getElementById('doing').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    cards.forEach(card => {
        let element = document.createElement('div');
        element.id = card.id;
        element.className = 'card-job';
        element.innerHTML =  `
            <div class="overlay-card" id="${card.id}  draggable="true"></div>
                <div class="indicator"></div>
                <div class="description-card">
                        <div class="title-card">
                            <p class="name-product-card">${card.nombreEquipo}</p>
                            <button class="button more"><img src="assets/icons/context-menu.svg" alt="" id="actionsCard" class="icon"></button>
                        </div>
                        <div class="client">${card.nombreCliente}</div>                      
                </div>
                <div class="more-info-card">
                    <div class="tasks">
                        <img class="icon" src="assets/icons/cal.svg" alt="">
                        <p class="number-of-task">${card.fecha}</p>
                    </div> 
                    <div class="prioridad">
                        <span>Prioridad:</span> ${priority(card.sBaja, card.sMedia, card.sAlta)}
                    </div>
                </div>
        `;
        if(card.area === 'to-do') {
            document.getElementById(card.area).appendChild(element)
        }
        if(card.area === 'doing'){   
            document.getElementById(card.area).appendChild(element)
        }
        if(card.area === 'done'){   
            document.getElementById(card.area).appendChild(element)
        }
    });
    counter('to-do')
    counter('doing')
    counter('done')
} 

const show = document.getElementById('show');
show.addEventListener('click', () => {
    showPopUp('overlay-options', 'optionsPop', false);
    showPopUp('showOverlay', 'popup-show');
    let cardsLS = getLSCards();
    let cardSelected = cardsLS[idCard];

    console.log(cardSelected);

    document.getElementById('nombreEquipo').innerText = cardSelected.nombreEquipo;
    document.getElementById('problema').innerText = cardSelected.problemasEquipo;
    document.getElementById('marca2').innerText = cardSelected.marca;
    document.getElementById('modelo2').innerText = cardSelected.modelo;
    document.getElementById('serie').innerText = cardSelected.noSerie;
    document.getElementById('color2').innerText = cardSelected.color;
    document.getElementById('nCliente').innerText = cardSelected.nombreCliente;
    document.getElementById('direccion1').innerText = cardSelected.dir;
    document.getElementById('tel').innerText = cardSelected.telefono;
    document.getElementById('fecha2').innerText = cardSelected.fecha;
    document.getElementById('prioridad2').innerText = priorityText(cardSelected.sBaja, cardSelected.sMedia, cardSelected.sAlta);
    // console.log(priority(cardSelected.sBaja, cardSelected.sMedia, cardSelected.sAlta));
    
    
});

const actionShow = document.getElementById('actionShow');
actionShow.addEventListener('click', () => {
    showPopUp('showOverlay', 'popup-show', false);
    showPopUp('overlay-options', 'optionsPop');
})


// drag and drop
dragula([
    document.getElementById("to-do"),
    document.getElementById("doing"),
    document.getElementById("done")
]).on('drop', (el, container, target, sibling, source) => {
    let getLS = getLSCards();
    if(container.id === 'to-do'){
        getLS[el.id].area = 'to-do'
        counter(container.id);
        counter(target.id);
        counterAll()
    }
    if(container.id === 'doing'){
        getLS[el.id].area = 'doing';
        counter(container.id);
        counter(target.id);
        counterAll()
    }
    if(container.id === 'done'){
        getLS[el.id].area = 'done';
        counter(container.id);
        counter(target.id);
        counterAll()
    }
    localStorage.setItem('cards', JSON.stringify(getLS)); 
});
