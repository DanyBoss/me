// Audio Object.
let audio = new Audio('file/bart.mp3');

// Game Variables.
let usersActive = {user1:true, user2:false, user3:false, user4:false};

$(document).ready(() => {
    $(".avatar").on("click", playNextInteraction);
})

function playNextInteraction() {

    $(".avatar").off("click");

    if(audio.paused) {
        //audio.play();
    }

    // grab the new interaction
    let interaction = Interaction.getInteraction();
    let currentUser = interaction.user;

    // If the interaction is popping someone new
    if(!$(currentUser.classid).is(":visible")) {
        $("img", currentUser.classid).attr("src", currentUser.src); 
        $(currentUser.classid).addClass(currentUser.name);
        $(currentUser.classid).show(300);

        currentUser.isVisible = true;
    }

    // play animation
    $(currentUser.classid).animateCss(interaction.animation);

    // update text
    $("h1", currentUser.classid).fadeOut(200, function() {
        $(this).text(interaction.text).fadeIn(200);
    });

    //TODO: If the interaction is popping out someone

    // add cascading effect to all other users
    Interaction.getCharacters().forEach((character) => {
        if(character.isVisible) {
            $(character.classid).animate({
                marginTop: (character.id == currentUser.id) ? "0" : "+=50",
            }, 300);
        }
    });

    // Timer to set the next trigger
    setTimeout(() => {
        playNextInteraction();
    }, interaction.timer)

    //$(".avatar").on("click", playGame);
}

/**
 * Animation Function
 * When the animation ends this function cleans up the leftovers css
 * And also accepts a call to do something when the animation ends.
 */
$.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };
  
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
  
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
  
        if (typeof callback === 'function') callback();
      });
  
      return this;
    },
  });