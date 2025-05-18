document.addEventListener('DOMContentLoaded', function() {
    const homePage = document.getElementById('home-page');
    const loginPage = document.getElementById('login-page');
    const registerPage = document.getElementById('register-page');
    const helpPage = document.getElementById('help-page');
    
    // Navigation links
    const homeLink = document.querySelector('a[href="#home"]');
    const accountLink = document.querySelector('a[href="#account"]');
    const helpLink = document.querySelector('a[href="#help"]');
    
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        homePage.classList.remove('hidden');
        loginPage.classList.add('hidden');
        registerPage.classList.add('hidden');
        helpPage.classList.add('hidden');
    });
    
    accountLink.addEventListener('click', function(e) {
        e.preventDefault();
        homePage.classList.add('hidden');
        loginPage.classList.remove('hidden');
        registerPage.classList.add('hidden');
        helpPage.classList.add('hidden');
    });
    
    helpLink.addEventListener('click', function(e) {
        e.preventDefault();
        homePage.classList.add('hidden');
        loginPage.classList.add('hidden');
        registerPage.classList.add('hidden');
        helpPage.classList.remove('hidden');
    });
    
    // Show home page by default
    homePage.classList.remove('hidden');
});