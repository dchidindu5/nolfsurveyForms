function showActiveStep()
{
    if ($('#step1').is(':visible'))
    {
        $('.side-inner img').attr
        (
            {
                src: 'assets/images/side-img.png',
            }
        )
    }
    else if ($('#step2').is(':visible'))
    {
        $('.side-inner img').attr
        (
            {
                src: 'assets/images/side-img.png',
            }
        )
    }
    else if ($('#step3').is(':visible'))
    {
        $('.side-inner img').attr
        (
            {
                src: 'assets/images/side-img.png',
            }
        )
    }

    else if ($('#step4').is(':visible'))
    {
        $('.side-inner img').attr
        (
            {
                src: 'assets/images/side-img.png',
            }
        )
    }


    else
    {
        $('.side-inner img').attr
        (
            {
                src: 'assets/images/side-img.png',
            }
        )
    }
}


// next prev
var divs = $('.show-section section');
var now = 0; // currently shown div
divs.hide().first().show(); // hide all divs except first

function next()
{
    divs.eq(now).hide();
    now = (now + 1 < divs.length) ? now + 1 : 0;
    divs.eq(now).show(); // show next
    showActiveStep();
}

$(".prev").click(function() {
    divs.eq(now).hide();
    now = (now > 0) ? now - 1 : divs.length - 1;
    divs.eq(now).show(); // show previous
    showActiveStep();
});


// label active on input check
$(document).ready(function()
{
    $('.form-radio input').on("change", function()
    {

            $(".form-radio").removeClass("active-field");
            $(this).parent().addClass("active-field");
    })
})

$(document).ready(function()
{
    $('.text-field-input input').focus(function()
     {
        $(this).closest('.focus').toggleClass("focused");
          })
    .blur(function(){
       
        $(this).closest('.focus').toggleClass("focused");
    });
});

var allstars = document.querySelectorAll(".star");

allstars.forEach((star, i) => 
{
    star.onclick = function()
    {
        let current_level_star = i + 1;
        allstars.forEach((star, j) =>
        {
            if(current_level_star >= j+1)
            {
                star.classList.add('fa-solid');
                star.classList.remove('fa-regular');
            }
            else
            {
                star.classList.add('fa-regular');
                star.classList.remove('fa-solid');
            }
        })   
    }
      
});
$(document).ready(function()
{
  setTimeout(function()
  {
    $(".form *").not('.next-prev-button').each(function()
    {
      $(this).addClass('revealfield');
    })
  }, 1000)
})




$(document).ready(function()
{
    $('.score-inner .score-point').click(function()
    {
        $('.score-inner .score-point').removeClass('active');
        $(this).addClass('active');
    })
})


/*Dropdown Menu*/
$('.select').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.select-menu').slideToggle(300);
});
$('.select').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.select-menu').slideUp(300);
});
$('.select .select-menu li').click(function () {
    $(this).parents('.select').find('span').text($(this).text());
});
/*End Dropdown Menu*/





 // form validiation
 var inputschecked = false;


 function formvalidate(stepnumber)
 {
   // check if the required fields are empty
   inputvalue = $("#step"+stepnumber+" :input").not("button").map(function()
   {
     if(this.value.length > 0)
     {
       $(this).removeClass('invalid');
       return true;
 
     }
     else
     {
       
       if($(this).prop('required'))
       {
         $(this).addClass('invalid');
         return false
       }
       else
       {
         return true;
       }
       
     }
   }).get();
   
 
   // console.log(inputvalue);
 
   inputschecked = inputvalue.every(Boolean);
 
   // console.log(inputschecked);
 }


$(document).ready(function()
 {


    // check step1
    $("#step1btn").on('click', function()
    {
        formvalidate(1);
        

        if(inputschecked == false)
        {
            formvalidate(1);
        }
        else
        {
            next();
        }
    })

    // check step2
    $("#step2btn").on('click', function()
    {
        formvalidate(2);
        var re = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var email = $("#mail-email").val();
        var emailFormat = re.test(email);

        if(inputschecked == false)
        {
            formvalidate(2);
        }
        else if(emailFormat == false)
        {
            (function (el) {
            setTimeout(function () {
                el.children().remove('.reveal');
            }, 3000);
            }($('#error').append('<div class="reveal alert alert-danger">Email address is invalid!</div>')));
            if(emailFormat == true)
            {
            $("#mail-email").removeClass('invalid');
            }
            else
            {
            $("#mail-email").addClass('invalid');
            }

        }
        else
        {
            next();
        }
    })

    // check step3
    $("#step3btn").on('click', function()
    {
        formvalidate(3);

        
        

        if(inputschecked == false)
        {
            formvalidate(3);
        }
        else
        {
            next();
        }
    })

    // check step4
    $("#step4btn").on('click', function()
    {
        formvalidate(4);

        
        

        if(inputschecked == false)
        {
            formvalidate(4);
        }
        else
        {
            next();
        }
    })


    // check last step
     $("#sub").on('click' , function()
     {
        formvalidate(5);
          if(inputschecked == false)
          {
              formvalidate(5);
          }
          
          else
          {
              $("#sub").html("<img src='assets/images/loading.gif'>");

              

              var dataString = new FormData(document.getElementById("steps"));


              console.log(dataString);

              
              // send form to send.php
              $.ajax({
                        type: "POST",
                        url: "form handling/send.php",
                        data: dataString,
                        processData: false,
                        contentType: false,
                        cache: false,
                       success: function(data,status)
                       {

                          $("#sub").html("Success!");
                          console.log(data);
                          
                          window.location = "thankyou.html";
                          
                       },
                       error: function(data, status)
                       {
                          $("#sub").html("failed!");
                          console.log(data);
                       }
                    });
          }

      });
 }
 );