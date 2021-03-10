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

  // $('.item-price').on('click', function(){
  //   currentPrice = parseFloat($(this)[0].innerText);
  //   currentPrice = Math.round(currentPrice * 100 ) / 100;
  // });

  let currentPrice = 0;

  // $(".open-card").on("click", function() {
  //   //console.log($(this).children().find("innerHTML").val());
  //   // let thisCheck = $(this);
  //   // currentPrice = $(this)[0].children[0].children[1].children[0].innerText.val();
  //   // console.log(currentPrice);

  //    //this works
  //   //currentPrice = parseFloat($(this)[0].children[0].children[1].children[0].innerHTML);
  //   //currentPrice = Math.round(currentPrice * 100 ) / 100;



  // });

  let total = 0;

  let cartOB = {};

  $('#itemTotalPrice').text(total);


  $(".button").on("click", function() {
    // console.log($(this));
    let id = $(this)[0].parentElement.parentElement.parentElement.children[3].innerHTML;
    let price = $(this)[0].parentElement.parentElement.parentElement.children[0].children[1].children[0].innerHTML;
    currentPrice = parseFloat(price);
    currentPrice = Math.round(currentPrice * 100 ) / 100;
    //it has to be var not let or const in order to work
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;

      total += currentPrice;

    } else {
     // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
         total -= currentPrice;
      } else {
        newVal = 0;
      }
    }

    $button.parent().find("input").val(newVal);
    total = Math.round(total * 100 ) / 100;
    $("#itemTotalPrice").text(total);
    // for (let i = 0; i < cart.length; i++) {
    //   if
    // itemQuantity.push(newVal);
    // cart.push({"id": id, 'quantity': itemQuantity});
    cartOB[id] = newVal;
    //cart = [{"id": id, 'quantity': newVal}];
  });


  $(".view-cart").on("click", function() {
    console.log($(this));
    console.log($("#for-loop").children.length);
    // console.log(cart);
    console.log(cartOB);

    // for (let i = 0; i <  ) {
    //   /*
    //   db.query(`
    // SELECT *
    // FROM items;
    // `)
    // */

    // }
  });


});
