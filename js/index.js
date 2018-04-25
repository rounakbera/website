/*---------------------------------------------
Clippy Headings
- Creates a scrolling cliprect effect on fixed headings
----------------------------------------------*/

$(document).ready(function(){

    var divHeight = document.getElementById('uno').offsetHeight;
    if(divHeight < document.getElementById('dos').offsetHeight) divHeight = document.getElementById('dos').offsetHeight;
    if(divHeight < document.getElementById('tres').offsetHeight) divHeight = document.getElementById('tres').offsetHeight;
    $("#uno").css("height",divHeight);
    $("#dos").css("height",divHeight);
    $("#tres").css("height",divHeight);

    var s,
        clippy = {
            settings: {
                heading: $('.js-clippy'),
            },
            init: function() {
                s = this.settings;
                this.bindEvents();
            },
            bindEvents: function(){
                $(window).on("load resize scroll", $.proxy(this.getClippy, this));
            },

            getClippy: function(){
                s.heading.each(function() {
                    var layerOffset = $(this).closest('article, section').offset(),
                        containerOffset = layerOffset.top - $(window).scrollTop(),
                        clippy = containerOffset - $(this).css("top").replace(/[^-\d\.]/g, '') - $(this).css("margin-top").replace(/[^-\d\.]/g, '');
                    $(this).css('clip', 'rect('+ clippy +'px, auto, auto, auto)');
                });
            },
        };
    clippy.init();

    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: [target.offset().top, "linear"]
                    }, 1700, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });


    window.sr = ScrollReveal();
    sr.reveal('.first', {delay: 800, duration: 800, viewFactor: 0.6});
    sr.reveal('.mast__header', {delay: 800, duration: 800, viewFactor: 0.6});
    sr.reveal('.second', {delay: 800, duration: 800, viewFactor: 0.6, reset:true});
});