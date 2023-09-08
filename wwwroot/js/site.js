// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Main Menu
const userMenu = jQuery('.user-login-menu').html();
jQuery('.main-menu-bar').append(userMenu);
const menuItems = jQuery('.menu-item');
if (menuItems.length > 0) {
    const currentLink = window.location.href;
    menuItems.each(function() {
        const aHreft = $(this).attr('href');
        if (currentLink.toLowerCase().includes(aHreft.toLowerCase())) {
            $(this).addClass( "active-link" );
        } else {
            const nextElement = $(this).next();
            if (nextElement.length > 0) {
                const nextElementClass = nextElement.attr('class');
                const appMenu = this;
                if (nextElementClass.includes('nav-dropdown-content')) {
                    nextElement.children().each(function () {
                        const aHreft = $(this).attr('href');
                        if (currentLink.toLowerCase().includes(aHreft.toLowerCase())) {
                            $(appMenu).addClass( "active-link" );
                            $(this).addClass( "active-link" );
                        }
                    })
                }
            }
        }
    });
}

function selectLanguage($event) {
    const language = $event.value;
    window.location.href = `/${language}`;
}

$(".formadmin").hover(function(){
    $(this).find('.edit-icon-admin i').show();
},function(){
    $(this).find('.edit-icon-admin i').hide();
});