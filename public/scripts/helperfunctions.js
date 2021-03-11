
      
// function updateCartTotal() {
//     let cartItemContainer = document.querySelector('.cart-all-items');
//     let cartRows = cartItemContainer.querySelectorAll('.cart-item');

//     let total = 0
//     for (let i = 0; i < cartRows.length; i++) {
//         let cartRow = cartRows[i]
//         let priceElement = cartRow.querySelector('.cart-item-price');
//         let quantityElement = cartRow.querySelector('.cart-item-quantity');

//         let price = parseFloat(priceElement.innerText.replace('$', ''))
//         let quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//     document.querySelector('.cart-total-price').innerText = '$' + total;
// }
