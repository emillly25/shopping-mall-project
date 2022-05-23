const menu = document.querySelector('.menu_header')

window.addEventListener('scroll',function(){
    let y = window.pageYOffset;
    if(y > 114){
        menu.style.position = 'fixed';
        menu.style.marginTop = 0;
        menu.style.zIndex = 100;
    }else{
        menu.style.position = 'relative';
    }
}
)




