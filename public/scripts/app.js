$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});

$(document).ready(function() {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // $(function() {

  //   $("form div").append('<div class="inc button">+</div><div class="dec button">-</div>');

  // });

  // Logic for adding the subtotal
  // Hide all the pictures except for picture #1
  // Hide all the new div elements for each card except for caesar #1
  // On click, hide picture 1, hide card 1, and show picture * and card *
  // On click of ca
  $('.item-price').on('click', function(){
    console.log($(this)[0].innerText);
  });

  let currentPrice = 0;

  $(".open-card").on("click", function() {
    //console.log($(this).children().find("innerHTML").val());
    // let thisCheck = $(this);
    currentPrice = parseFloat($(this)[0].children[0].children[1].children[0].innerHTML);
    // currentPrice = currentPrice.toFixedNumber(2);
    currentPrice = Math.round(currentPrice * 100 ) / 100;
    // currentPrice = currentPrice.toFixedNumber(2);
  });

  let total = 0;
  $(".itemTotalPriceTest").html(total);


  $(".button").on("click", function() {
    //it has to be var not let or const in order to work
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
      // $(".itemTotalPriceTest").val(this.price);
      total += currentPrice;
      // $(".itemTotalPriceTest").html(total);
    } else {
     // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
         total -= currentPrice;
        // $(".itemTotalPriceTest").html(total);
      } else {
        newVal = 0;

      }
    }

    $button.parent().find("input").val(newVal);
   //let totalPrice = newVal * currentPrice;
    total = Math.round(total * 100 ) / 100;
    console.log(total);
    //$(".itemTotalPriceTest").html(totalPrice);
    $(".itemTotalPriceTest").html(total);
    console.log(newVal);

    // total = newVal;
    // $("#itemTotalPrice").html(total);
  });



  // Character counter
  // $("#tweet-text").on("input", function() {
 // let length = $(this).val().length;
  //   let counter = $(this).siblings("div").find("output");
  //   counter.html(140-length);
  //   if (140 - length < 0) {
  //     counter.addClass("toggleRed");
  //   }
  //   else {
  //     counter.removeClass("toggleRed");
  //   }
  // });


});
