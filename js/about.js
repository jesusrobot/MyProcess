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

const support = document.getElementById('support');
support.addEventListener('click', () => {
    showPopUp('overlay-confirm', 'popConfirm')    
})

const closePopupConfirm = document.getElementById('closePopupConfirm');
closePopupConfirm.addEventListener('click', () => {
    showPopUp('overlay-confirm', 'popConfirm', false)    

})

// document.addEventListener('click', () => {
//     document.getElementById('nameStore');
//     document.getElementById('adminStore'); 
// })

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

document.addEventListener('DOMContentLoaded', () => {
    darkmode();
})