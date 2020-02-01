let data;
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
document.addEventListener('DOMContentLoaded',()=> {
    darkmode()
} )
// al clickear el boton back 
const backButton = document.getElementById('back');
backButton.addEventListener('click', ()=> {
    window.history.back();
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
// open popup backup
const backup = document.getElementById('backup');
backup.addEventListener('click', () => {
    let cards = getLSCards();
    console.log(cards);
    
    if(cards == '') {
        showAlert('No hay nada que respaldar!, la base de datos esta vacia 😑️')

    } else {
        showPopUp('overlay-backup', 'popBackup');
    }
})
const closePopupBackup = document.getElementById('closePopupBackup');
closePopupBackup.addEventListener('click', () => {
    showPopUp('overlay-backup', 'popBackup', false);
    // clear
    document.getElementById('filename').value = '';
    
})
const actionBackup = document.getElementById('actionBackup');
actionBackup.addEventListener('click', () => {
    let fileName = document.getElementById('filename').value;
    let contenidoDeArchivo = localStorage.getItem('cards');
    const elem = document.getElementById('actionBackup');
    if (filename === '') {
        elem.download = 'backup.txt';
    } else {
        elem.download = `${fileName}.txt`;
    }
    elem.href = "data:application/octet-stream," + encodeURIComponent(contenidoDeArchivo);
    showPopUp('overlay-backup', 'popBackup', false);

    document.getElementById('filename').value = '';
})
const closePopupAlert = document.getElementById('closePopupAlert')
closePopupAlert.addEventListener('click', () => {
    showAlert('', false)
})
// file drop

const fileInput = document.getElementById('file');
const dropZone = document.getElementById('drop-zone')

// dropZone.addEventListener('click', () => fileInput.click())

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('active');
})

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault()
    dropZone.classList.remove('active');
})

dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    let file = e.dataTransfer.files[0];
    if (file.type === 'text/plain') {
        let reader = new FileReader();
        reader.onloadend = () => saveFile(reader.result);
        reader.readAsText(file, 'ISO-8859-1');
      } else {
        showAlert('Esta archivo no es valido')
      }
    
})

function saveFile (contents) {
    data = contents;
    showPopUp('overlay-confirm', 'popConfirm');
}

const closePopupConfirm = document.getElementById('closePopupConfirm');
closePopupConfirm.addEventListener('click',  () => {
  showPopUp('overlay-confirm', 'popConfirm', false);
})

const actionRespaldad = document.getElementById('actionRespaldad');
actionRespaldad.addEventListener('click', () => {
    // console.log(data);
    localStorage.setItem('cards', data);
    showPopUp('overlay-confirm', 'popConfirm', false);

})