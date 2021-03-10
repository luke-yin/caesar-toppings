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

  let total = 0;


  $(".button").on("click", function() {
    //it has to be var not let or const in order to work
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
      $(".itemTotalPriceTest").val(this.price);
      total++;
    } else {
     // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
        total--;
      } else {
        newVal = 0;
      }
    }

    $button.parent().find("input").val(newVal);
    console.log(newVal);

    // total = newVal;
    $("#itemTotalPrice").html(total);
  });





});
