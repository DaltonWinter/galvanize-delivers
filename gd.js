$(document).ready(() => {
  let cart = []

  // add to cart
  $('.addbtn').click((event) => {
    event.preventDefault()
    let card = $(event.target).parent().parent()
    let price = card.find('.price').text()
    let title = card.find('.card-title').text()

    addToCart({price, title})

  })

  // remove from cart
  $('#orders').click('.remove', (event) => {
    let title = $(event.target).data("title")
    removeFromCart(title)
  })

  function removeFromCart(title) {
    let existingItem = findInCart(title)
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
    }

    renderCart()
  }

  function addToCart(item){
    // check if in cart, if so update
    let existingItem = findInCart(item.title)

    if (existingItem){
      existingItem.quantity++
    }
    else {
      // else add to cart with qty of 1
      item.quantity = 1
      cart.push(item)
    }


    renderCart()
  }

  function findInCart(title){
    let existingItem = null
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingItem = cart[i]
      }
    }
    return existingItem
  }

  function renderCart() {
    // find table
    let tbody = $('#orders tbody')

    // clear out all order data
    tbody.children().remove()

    // re-render tbody
    let subtotal = 0
    for (item of cart) {
      let price = parsePrice(item.price)

      if (item.quantity > 0 ) {
        tbody.append(`<tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${formatPrice(price)}</td>
          <td><a class="btn btn-primary remove-item" data-title="${item.title}">Remove</a></td>
        </tr>`)
      }
      subtotal += price * +(item.quantity)
      var tax= subtotal * 0.08;
      var total= subtotal + tax;

    }

    // do calculate
    $('#subtotal').text(formatPrice(subtotal))
    $('#tax').text(formatPrice(tax))
    $('#total').text(formatPrice(total))
  }

  function parsePrice(price) {
    return parseFloat(price.replace(/\$/, ''))
  }

  function formatPrice(price) {
    return '$' + price.toFixed(2)
  }

})
