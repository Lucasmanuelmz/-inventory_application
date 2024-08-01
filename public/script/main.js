document.addEventListener('DOMContentLoaded', () => {
//CODIGO PARA ESTILIZAR DASHBOARD
const userMenuButton = document.getElementById('user-menu-button');
const userMenu = document.querySelector(`[aria-labelledby="user-menu-button"]`);
userMenu.classList.add('hidden');

userMenuButton.addEventListener('click', () => {
    userMenu.classList.toggle('hidden')
});

const mobileMenuButton = document.querySelector(`[aria-controls="mobile-menu"]`);
const svgOpen = document.getElementById('svg-open');
const svgClose = document.getElementById('svg-close');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenu.classList.add('hidden');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
        svgOpen.classList.toggle('hidden');
        svgClose.classList.toggle('hidden');
    
})

const drawerDisabledBackdropButton = document.querySelector(`[data-drawer-show="drawer-disabled-backdrop"]`);
const drawerDisabledBackdrop = document.getElementById('drawer-disabled-backdrop');
const closeDrawer = document.getElementById('close-drawer');
drawerDisabledBackdropButton.addEventListener('click', () => {
drawerDisabledBackdrop.classList.remove('-translate-x-full'); 
})

closeDrawer.addEventListener('click', () => {
    drawerDisabledBackdrop.classList.add('-translate-x-full')
})
})