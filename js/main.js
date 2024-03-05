/* jslint browser: true */
/* global $, TweenMax */

// hide all screens and section divs
$("main, section").hide();

// SPLASH SCREEN //////////////////////////////////////////////
$("main#splash").show();
    //TweenMax is going to be used to call out all TweenMax features
    //to animate the splash page on load 
    //"#splash" says where it wil start, 0.5 is how long it'll take
TweenMax.from("#splash",0.5,{
    delay: 0.25,
    opacity: 0
})
    //animate the header
TweenMax.from("#splash header", 0.5, {
    delay: 0.5,
        //the y: -$ says that it'll start above the top and drop from the top
    y: -$("#splash header").outerHeight(),
    ease: setInterval.easeOut
});

TweenMax.from("#splash footer", 0.5,{
    delay:0.5,
    y: $("#splash footer").outerHeight(),
    ease: setInterval.easeOut
})
TweenMax.to("#splash img", 0.6, {
    delay: 2.5,
    opacity: 0,
    onComplete: loadLanding
})
// LANDING SCREEN ///////////////////////////////////////////

function loadLanding(){
    console.log("about to load");
    //below hides the main and section 
    $("main, section").hide().css({opacity:1});
    //this makes the next page show up
    $("#landing").show();


    TweenMax.from("#landing", 0.5,{
        delay: 0.25,
        opacity: 0
    });

    //to make header drop down from above
    TweenMax.from("#landing header", 0.5,{
        delay: 0.5,
        y: -$("#landing header").outerHeight(),
        ease: Sine.easeOut
    });
    //to make the footer fade up from bottom
    TweenMax.from("#landing footer", 0.5,{
        delay: 0.5,
        y: $("#landing footer").outerHeight(),
        ease: Sine.easeOut
    });
    //the logo animation
    TweenMax.from("#cevicheLogo", 0.5,{
        delay: 1,
        opacity: 0
    });
    TweenMax.from("#tavolaLogo", 0.5,{
        delay: 1.25,
        opacity: 0
    });
    TweenMax.from("#crispyLogo", 0.5,{
        delay: 1.5,
        opacity: 0
    });

    //make items clickable
    $("#cevicheLogo").click(function(){
        //this will turn off the landing page
        TweenMax.to("#landing", 0.5,{
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest1", "#a1a1a1"]
        })
    });
    $("#tavolaLogo").click(function(){
        //this will turn off the landing page
        TweenMax.to("#landing", 0.5,{
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest2", "#a69f88"]
        })

    });
    $("#crispyLogo").click(function(){
        //this will turn off the landing page
        TweenMax.to("#landing", 0.5,{
            opacity: 0,
            onComplete: loadRest,
            onCompleteParams: ["#rest3", "#ffde17"]
        })
    });
}

// RESTAURANT SCREENS ///////////////////////////////////////////

function loadRest(restID, highlightColour){
    console.log(`${restID} and colour of ${highlightColour}`);
    $("#landing").hide();
    $(restID).show();

    //now we animate in the header for the restaurant 
    TweenMax.from(`${restID} header`, 0.5, {
        delay: 0.25,
        y: -$(`${restID} header`).outerHeight(),
        ease: Sine.easeOut
    });

    TweenMax.from(`${restID} footer`, 0.5, {
        delay: 0.25,
        y: $(`${restID} footer`).outerHeight(),
        ease: Sine.easeOut
    });
    //this is getting the home page content to show
    $(`${restID} .home`).show();
    TweenMax.from(`${restID} .home`, 0.5,{
        delay: 0.75,
        opacity:0
    });
    //for each element within the array (class of reveal within the class of home)
    $(`${restID} .home .revealLogo`).each(function(i){
        TweenMax.from(this, 1, {
            //1.25 seconds + i(start of array, it will stagger, it will multiply it by 0.25) 
            delay: 1.25,
            opacity: 0,
            y: -10,
            ease: Sine.easeOut
        });
    });
    $(`${restID} .home .reveal`).each(function(i){
        TweenMax.from(this, 1, {
            //1.25 seconds + i(start of array, it will stagger, it will multiply it by 0.25) 
            delay: 1.25 + i * 0.25,
            opacity: 0,
            x: -100,
            ease: Sine.easeOut
        });
    });
    //this highlights the home icon in footer on restaurant load
    //the highlighted colour was specified in the click action
    // $(".homeIcon").css({background:highlightColour});
//select the icons from the active restaurant dynamically 
let iconsTarget = `${restID} .homeIcon, ${restID} .specialsIcon, ${restID} .reservationsIcon, ${restID} .menuIcon`;
//remove the highlight from all nav icons
$(iconsTarget).css({background: 'none'}).removeClass("active");
//make home icon active
$(`${restID} .homeIcon`).css({background: highlightColour}).addClass("active");

// set up section nav - highlight and load section
$(iconsTarget).click(function(){
    if(!$(this).hasClass("active")){
    // remove highlight from all icons
    $(iconsTarget).css({background: 'none'}).removeClass("active");

    // add highlight to selected icon based on highlight colour
    $(this).css({background: highlightColour}).addClass("active");

    // load selected section - send current section and section to load
    loadSection(`${restID} section`, `${restID} ${$(this).attr("data-section")}`);
}
});


    //Ceviche Home Buttons
    $("#rest1 .menuButton").click(function () {
    loadSection(`#rest1 section`, `#rest1 ${$(this).attr("data-section")}`);
    $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
        background: "none"
    }).removeClass("active");
    $(".menuIcon").css({
        background: highlightColour
    }).addClass("active");
    })
    $("#rest1 .specialsButton").click(function () {
        loadSection(`#rest1 section`, `#rest1 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
            background: "none"
        }).removeClass("active");
        $(".specialsIcon").css({
            background: highlightColour
        }).addClass("active");
        })
    $("#rest1 .reservationsButton").click(function () {
        loadSection(`#rest1 section`, `#rest1 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
                background: "none"
        }).removeClass("active");
        $(".reservationsIcon").css({
                background: highlightColour
        }).addClass("active");
        })
    //Tavola Home Buttons
    $("#rest2 .menuButton").click(function () {
        loadSection(`#rest2 section`, `#rest2 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
            background: "none"
        }).removeClass("active");
        $(".menuIcon").css({
            background: highlightColour
        }).addClass("active");
        })
    $("#rest2 .specialsButton").click(function () {
        loadSection(`#rest2 section`, `#rest2 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
                background: "none"
        }).removeClass("active");
        $(".specialsIcon").css({
                background: highlightColour
        }).addClass("active");
        })
    $("#rest2 .reservationsButton").click(function () {
        loadSection(`#rest2 section`, `#rest2 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
                    background: "none"
        }).removeClass("active");
        $(".reservationsIcon").css({
                    background: highlightColour
        }).addClass("active");
        })
//Crispy Home Buttons
    $("#rest3 .menuButton").click(function () {
        loadSection(`#rest3 section`, `#rest3 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
            background: "none"
        }).removeClass("active");
        $(".menuIcon").css({
            background: highlightColour
        }).addClass("active");
        })
    $("#rest3 .specialsButton").click(function () {
        loadSection(`#rest3 section`, `#rest3 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
                background: "none"
        }).removeClass("active");
        $(".specialsIcon").css({
                background: highlightColour
        }).addClass("active");
        })
    $("#rest3 .reservationsButton").click(function () {
        loadSection(`#rest3 section`, `#rest3 ${$(this).attr("data-section")}`);
        $(".homeIcon, .menuIcon, .specialsIcon, .reservationsIcon").css({
                    background: "none"
        }).removeClass("active");
        $(".reservationsIcon").css({
                    background: highlightColour
        }).addClass("active");
        })
}

// REUSABLE FUNCTIONS/CLICKS /////////////////////////////////////
function loadSection(prevSection, nextSection){
console.log("loading a section");
console.log(prevSection);
console.log(nextSection);
//fade out the previous section
TweenMax.to(prevSection, 0.5,{
    opacity: 0,
    onComplete: function(){
        //hide and reset the previous section
        $(prevSection).hide().css({opacity:1});
        //display the next section and scroll to the top
        $(nextSection).show().scrollTop(0);
    }
});
//tween in the next section
TweenMax.from(nextSection, 0.5,{
    delay:0.5,
    opacity:0
});

//loop through and reveal all elements on next screen with .reveal class
$(nextSection + " .reveal").each(function(i){
    TweenMax.from(this, 1, {
        delay: 1 + i * 0.25,
        opacity: 0,
        y: -10,
        ease: Sine.easeOut
    });
});
}


//Civiche Submit button and pop-up
// Get the modal
let modal = document.getElementById("myModal");
let modal1 = document.getElementById("myModal1");
let modal2 = document.getElementById("myModal2");
//new shot
// let modal = document.getElementById("modal");
// Get the button that opens the modal
//let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];


//get Modal to pop up
let submitBtns = document.querySelectorAll(".formSubmit");
console.log(submitBtns);

submitBtns.forEach(bt => {
    bt.addEventListener("click",function(e){
        e.preventDefault();
        console.log("I was clicked");
        modal.style.display = "block";
    })
})
submitBtns.forEach(bt => {
    bt.addEventListener("click",function(e){
        e.preventDefault();
        console.log("I was clicked");
        modal1.style.display = "block";
    })
})
submitBtns.forEach(bt => {
    bt.addEventListener("click",function(e){
        e.preventDefault();
        console.log("I was clicked");
        modal2.style.display = "block";
    })
})

// When the user clicks on <span> (x), close the modal

$(".close").click(function(){
    console.log("test");
    modal1.style.display = "none";
})
$(".close").click(function(){
    console.log("test");
    modal.style.display = "none";
})
$(".close").click(function(){
    console.log("test");
    modal2.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
$(".modal").click(function(){
    modal.style.display = "none";
})
$(".modal").click(function(){
    modal1.style.display = "none";
})
$(".modal").click(function(){
    modal2.style.display = "none";
})



// set up hamburger menu to reveal main menu
$(".hamburger").click(function(){
    console.log("hamburger works");
    //if the data-click-state is one 
    if($(this).attr("data-click-state") == 1){
        $("#menu").show();
        //set button data state to closeable (if it was 1, now it'll be 0)
        $(this).attr("data-click-state",0);
        //change the button to ham2close
        $(this).attr("src","img/burger.gif");
        //animate the current restaurant over to reveal menu
        TweenMax.to(".rest", 0.5, {
            x:310,
            ease: Sine.easeOut
        });
    } else {
        $(this).attr("data-click-state",1);
        $(this).attr("src","img/close2burger.gif");
        TweenMax.to(".rest", 0.5,{
            x:0,
            ease: Sine.easeOut,
            onComplete: function() {
                //hide menu
                $("#menu").hide();
            }
        })
    }
});
$(".hamburger1").click(function(){
    console.log("hamburger works");
    //if the data-click-state is one 
    if($(this).attr("data-click-state") == 1){
        $("#menu").show();
        //set button data state to closeable (if it was 1, now it'll be 0)
        $(this).attr("data-click-state",0);
        //change the button to ham2close
        $(this).attr("src","img/burger.gif");
        //animate the current restaurant over to reveal menu
        TweenMax.to(".mainMenu", 0.5, {
            x:310,
            ease: Sine.easeOut
        });
    } else {
        $(this).attr("data-click-state",1);
        $(this).attr("src","img/close2burger.gif");
        TweenMax.to(".mainMenu", 0.5,{
            x:0,
            ease: Sine.easeOut,
            onComplete: function() {
                //hide menu
                $("#menu").hide();
            }
        })
    }
});

// go back to landing screen
$("#backToLanding").click(function(){
    //reset our hamburger
    $(".hamburger").attr("data-click-state",1);
    $(".hamburger").attr("src","img/close2burger.gif");
    TweenMax.to(".rest", 0.5,{
        x:0,
        ease: Sine.easeOut,
        onComplete: function() {
            //hide menu
            $("#menu").hide();
            //fade out and go to landing screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadLanding,
            });
        }
    })
});
//back to landing from a menu page
$("#backToLanding").click(function(){
    //reset our hamburger
    $(".hamburger1").attr("data-click-state",1);
    $(".hamburger1").attr("src","img/close2burger.gif");
    TweenMax.to(".mainMenu", 0.5,{
        x:0,
        ease: Sine.easeOut,
        onComplete: function() {
            //hide menu
            $("#menu").hide();
            //fade out and go to landing screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadLanding
            });
        }
    })
});
function loadAbout(){
    console.log("about to load");
    //below hides the main and section 
    $("main, section").hide().css({opacity:1});
    //this makes the next page show up
    $("#aboutPage").show();
    TweenMax.from("#aboutPage", 0.5,{
        delay: 0.25,
        opacity: 0
    });
}
// reveal FoE about info      
$("#about").click(function(){
    // alert("About Family of Eateries"); //replace with reveal of actual content
    //reset our hamburger
    $(".hamburger").attr("data-click-state",1);
    $(".hamburger").attr("src","img/close2burger.gif");
    TweenMax.to(".rest", 0.5,{
        x:0,
        ease: Sine.easeOut,
        onComplete: function() {
            //hide menu
            $("#menu").hide();
            //fade out and go to about screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadAbout
            });
        }
    })
});
//to about from a menu page
$("#about").click(function(){
    // alert("About Family of Eateries"); //replace with reveal of actual content
    //reset our hamburger
    $(".hamburger1").attr("data-click-state",1);
    $(".hamburger1").attr("src","img/close2burger.gif");
    TweenMax.to(".mainMenu", 0.5,{
        x:0,
        ease: Sine.easeOut,
        onComplete: function() {
            //hide menu
            $("#menu").hide();
            //fade out and go to about screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadAbout
            });
        }
    })
});
function loadContact(){
    console.log("about to load");
    //below hides the main and section 
    $("main, section").hide().css({opacity:1});
    //this makes the next page show up
    $("#contactPage").show();
    TweenMax.from("#contactPage", 0.5,{
        delay: 0.25,
        opacity: 0
    });
}
// reveal FoE contact info      
$("#contact").click(function(){
    $(".hamburger").attr("data-click-state",1);
    $(".hamburger").attr("src","img/close2burger.gif");
    TweenMax.to(".rest", 0.5,{
        x:0,
        ease: Sine.easeOut,
        onComplete: function() {
            //hide menu
            $("#menu").hide();
            //fade out and go to contact screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadContact
            });
        }
    })
});
//to contact page from a menu page
$("#contact").click(function(){
    $(".hamburger1").attr("data-click-state",1);
    $(".hamburger1").attr("src","img/close2burger.gif");
    TweenMax.to(".mainMenu", 0.5,{
        x:0,
        ease: Sine.easeOut,
        onComplete: function() {
            //hide menu
            $("#menu").hide();
            //fade out and go to contact screen
            TweenMax.to("main", 0.5, {
                opacity: 0,
                onComplete: loadContact
            });
        }
    })
});