
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
// End of Scroll to Top button code section



// Form Errors Validation Messages
  $(function() {
    $("username_error_message").hide();
    $("email_error_message").hide();
    $("subject_error_message").hide();
    $("textarea_error_message").hide();


      var username_error = false;
      var email_error = false;
      var subject_error = false;
      var textarea_error = false;


    $("#username").focusout(function() {
      check_username();
    });
    $("#email").focusout(function() {
      check_email();
    });
    $("#subject").focusout(function() {
      check_subject();
    });
    $("#textarea").focusout(function() {
      check_textarea();
    });


    // function check_username() {
    //   var username_length = $("#username").val().length;
    //   if(username_length < 5 || username_length > 20) {
    //     $("#name_error_message").html("Must be between 5-20 characters long");
    //     $("#name_error_message").show();
    //     username_error = true;
    //   } else {
    //     $("#name_error_message").hide();
    //   }
    // }

    function check_username() {
      var name_pattern = new RegExp(/^[A-Za-z]+\s?([A-Za-z]+)?$/);
      if(name_pattern.test($("#username").val())) {
        $("#username_error_message").hide();
      } else {
        $("#username_error_message").html("Please enter a valid name");
        $("#username_error_message").show();
        username_error = true;
      }
    }

    function check_email() {
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      if(pattern.test($("#email").val())) {
        $("#email_error_message").hide();
      } else {
        $("#email_error_message").html("Please enter a valid email address");
        $("#email_error_message").show();
        email_error = true;
      }
    }
  
    function check_subject() {
      var user_subject = $("#subject").val().length;
      if(user_subject < 5 || user_subject > 20) {
        $("#subject_error_message").html("Subject must be between 5-30 characters long");
        $("#subject_error_message").show();
        subject_error = true;
      } else {
        $("#subject_error_message").hide();
      }
    }
  
    function check_textarea() {
      var textarea_length = $("#textarea").val().length;
      if(textarea_length < 10 || textarea_length > 20) {
        $("#textarea_error_message").html("Message must be between 10-30 characters long");
        $("#textarea_error_message").show();
        textarea_error = true;
      } else {
        $("#textarea_error_message").hide();
      }
    }
  
    $("#contact_me_form").submit(function() {
      var username_error = false;
      var email_error = false;
      var subject_error = false;
      var textarea_error = false;
  
      check_username();
      check_email();
      check_subject();
      check_textarea();
  
      if(
        username_error == false && 
        email_error == false && 
        subject_error == false && 
        textarea_error == false) {
          return true;
        } else {
          return false;
        }
    })

  });

// End of Form Errors Validation Messages



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

