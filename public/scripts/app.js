// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });

$(document).ready(function() {
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $(".caesar2").hide();
  $(".caesar3").hide();
  $(".caesar4").hide();
  $(".caesar5").hide();
  $(".caesar6").hide();

  $(".hidden-image").hide();
  $(".collapsible").hide();

  // Logic for adding the subtotal
  // Hide all the pictures except for picture #1
  // Hide all the new div elements for each card except for caesar #1
  // On click, hide picture 1, hide card 1, and show picture * and card *
  // On click of ca

  let currentPrice = 0;

  let total = 0;

  let cartOB = {};

  $('#itemTotalPrice').text(total);

  $(".item-header").on("click", function() {
    $(this).parent().find(".collapsible").toggle();
    $(this).parent().find(".item-id").toggle();
    let id = $(this)[0].parentElement.children[2].innerHTML;
    if (id == 1) {
      $(".caesar1").show();
      $(".caesar2").hide();
      $(".caesar3").hide();
      $(".caesar4").hide();
      $(".caesar5").hide();
      $(".caesar6").hide();
      $(this).parent().nextAll().find(".collapsible").hide();
      $(this).parent().nextAll().find(".item-id").hide();
    }
    else if (id == 2) {
      $(".caesar1").hide();
      $(".caesar2").show();
      $(".caesar3").hide();
      $(".caesar4").hide();
      $(".caesar5").hide();
      $(".caesar6").hide();
      $(this).parent().prevAll().find(".collapsible").hide();
      $(this).parent().prevAll().find(".item-id").hide();
      $(this).parent().nextAll().find(".collapsible").hide();
      $(this).parent().nextAll().find(".item-id").hide();
    }
    else if (id == 3) {
      $(".caesar1").hide();
      $(".caesar2").hide();
      $(".caesar3").show();
      $(".caesar4").hide();
      $(".caesar5").hide();
      $(".caesar6").hide();
      $(this).parent().prevAll().find(".collapsible").hide();
      $(this).parent().prevAll().find(".item-id").hide();
      $(this).parent().nextAll().find(".collapsible").hide();
      $(this).parent().nextAll().find(".item-id").hide();
    }
    else if (id == 4) {
      $(".caesar1").hide();
      $(".caesar2").hide();
      $(".caesar3").hide();
      $(".caesar4").show();
      $(".caesar5").hide();
      $(".caesar6").hide();
      $(this).parent().prevAll().find(".collapsible").hide();
      $(this).parent().prevAll().find(".item-id").hide();
      $(this).parent().nextAll().find(".collapsible").hide();
      $(this).parent().nextAll().find(".item-id").hide();
    }
    else if (id == 5) {
      $(".caesar1").hide();
      $(".caesar2").hide();
      $(".caesar3").hide();
      $(".caesar4").hide();
      $(".caesar5").show();
      $(".caesar6").hide();
      $(this).parent().prevAll().find(".collapsible").hide();
      $(this).parent().prevAll().find(".item-id").hide();
      $(this).parent().nextAll().find(".collapsible").hide();
      $(this).parent().nextAll().find(".item-id").hide();
    }
    else if (id == 6) {
      $(".caesar1").hide();
      $(".caesar2").hide();
      $(".caesar3").hide();
      $(".caesar4").hide();
      $(".caesar5").hide();
      $(".caesar6").show();
      $(this).parent().prevAll().find(".collapsible").hide();
      $(this).parent().prevAll().find(".item-id").hide();
    }
  })


  $(".button").on("click", function() {

    console.log($(this));
    let id = $(this).parent().parent().parent().find(".item-id").html(); //children[2].innerHTML;
    let price = $(this).parent().parent().parent().find(".actual-price").html(); //children[0].children[1].children[0].innerHTML;
    console.log("id:", id);
    console.log("price:", price);
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
    cartOB[id] = newVal;

  });





});
