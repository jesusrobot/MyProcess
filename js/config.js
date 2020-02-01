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
        document.getElementById('body').className = 'darkmode';
         document.getElementById('checkbox').checked = status;
    }
    console.log(status);
    
}

document.addEventListener('DOMContentLoaded', () => {
    darkmode();
})

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

const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('click', (e) => {
    let state = checkbox.checked;
    localStorage.setItem('darkmode', state)
    darkmode()
    
})