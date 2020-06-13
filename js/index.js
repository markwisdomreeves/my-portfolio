
// Scroll to Top button code section
  document.addEventListener('DOMContentLoaded', (event) => {
    $(document).ready(function(){
      $(window).scroll(function(){
        if($(window).scrollTop() > 300){
          $('.scroll-top').css({
            "opacity":"1", "pointer-events":"auto"
          });
        }else{
          $('.scroll-top').css({
            "opacity":"0", "pointer-events":"none"
          });
        }
      });
      $('.scroll-top').click(function(){
        $('html').animate({scrollTop:0}, 500);
      });
    });
  
});



// Appear on scroll down Newsletter signup form
$(document).scroll(function() {
  var y = $(this).scrollTop(),
      news = $('.news');
  if (y > 800) {
    news.fadeIn();
  } else {
    news.fadeOut();
  }
 });



/* projects section code */
const buttons = document.querySelectorAll("li");
const section = document.querySelectorAll(".thumb");
let values = "all";
filter(values);

function filter(values){
  section.forEach(show => {
    show.style.display = "none";
    if(show.getAttribute("data-id") === values || values === "all") {
      show.style.display = "block";
    }
  });
}

// show images
buttons.forEach(item => {
  item.addEventListener("click", ()=> {
    buttons.forEach(item => {
      item.className = "";
    });
    item.className = "active-link"; 
    let values = item.textContent;
    // called the filter function here
    filter(values);
  });
});




// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 9000) {      // 3000
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;   //300

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 100;  //500
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}