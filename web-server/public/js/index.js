console.log('this is a js file')
window.onload = () => {


  console.log("auth")
  /* QUERIES */
  // let store = [];
  let getNotify = document.getElementById('notify');
  let cartItem = document.querySelectorAll('.images')
  let cartItemsAll = document.getElementById('addAll');
  let cartItemsDelete = document.getElementById('removeAll');
  /**
  *  The Special Item should be the only item which shows in this category - create a feature that will show the product's second image when it is hovered on.
  */

  const getAllImages = document.querySelectorAll('img');
  for (let i = 0; i < getAllImages.length; i++) {
    let getAnImage = getAllImages[i];
    let readImg = ""
    getAnImage.addEventListener('mouseover', (e) => {
      e.target.style.opacity = 1;
      readImg = e.target.src.split('2').join('1')
      e.target.src = readImg
      e.target.style.opacity = .6;
    })
    getAnImage.addEventListener('mouseout', (e) => {
      console.log(e.target.src)
      e.target.style.opacity = .6;
      readImg = e.target.src.split('1').join('2')
      e.target.src = readImg
      e.target.style.opacity = 1;
      setTimeout(function () {
        e.target.style.cssText = "";
      }, 500);
    })
  }


  const deleteAll = (event) => {
    event.preventDefault()
    // console.log(JSON.stringify(store))
    fetch('https://localhost:8080/cart/update', {
      method: 'DELETE', // or 'PUT'
      headers: {
        'Accept': '*/* ',
        'Content-Type': 'application/json',
      }
    }).then(() => {
      getNotify.innerHTML += `<h3 class="alert-success"> Delete all items from cart! </h3>`
      setTimeout(() => {
        /**
         *  Notify the user that the product has been added.
         */
        getNotify.innerHTML = "";
        //to get the button on hbs conditions
        window.location.reload();

      }, 4000)
    }).catch(err => console.log(err))

  }
  const successBanner = (event, store) => {
    // 
    //https://store-l5vdkepxm9.mybigcommerce.com
    ///login.php?action=passwordless_login
    // https://{{domain}}/cart.php?action=add&product_id={{id}}&qty={{qty}}

    ////https://store-l5vdkepxm9.mybigcommerce.com/api/storefront/carts
    //https://api.bigcommerce.com/stores/{$$.env.store_hash}/v3/catalog/products
    //https://https://api.bigcommerce.com/stores/l5vdkepxm9/v3/api/storefront/carts
    //https://store-l5vdkepxm9.mybigcommerce.com/api/storefront/carts
    /**
     *  "list_price": 100,
             "name": "Strawberry",
             "parent_id": null,
             "product_id": 112,
             "quantity": 5,
             "sale_price": 100,
             "sku": "abc-123",
             "taxable": true,
             "url": "https://test-store2426.mybigcommerce.com/strawberry/",
             "variant_id": 77
     */
    /*{
  "line_items": [
    {
      "productId":112,
      "quantity": 5,
      "name": "Strawberry",
      "price": 100
    }
  ]
}
    
    */
    event.preventDefault()
    // console.log(JSON.stringify(store))
    fetch('https://localhost:8080/cart/update', {
      method: 'POST', // or 'PUT'
      headers: {
        'Accept': '*/* ',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store)

    }).then(response => {
      return response
    }).catch(err => console.log(err))

  }

  /* START submitForm */
  const submitForm = (event, target) => {

    event.preventDefault();
    cartItem = {
      description: target.alt,
      url: target.src,
      name: target.name,
      price: target.price,
      weight: target.weight

    }
    console.log(cartItem);
    // ** Create validation errors for every single click item.
    let boolCart = false;

    const addElement = (notify, type) => {
      // create a new div element
      const newDiv = document.createElement("div");
      newDiv.id = "notify"
      newDiv.className = "alert-warning"
      newDiv.innerHTML = notify
      type.focus();
      const currentDiv = document.getElementById(type.id);
      currentDiv.insertAdjacentElement('beforebegin', newDiv);
    }
    //mapping thedescriptions getting items in being read.

    let validateString = () => {
      if (document.getElementById('notify') !== null) {
        let getClass = document.querySelectorAll('.alert-warning');
        for (let i = 0; i < getClass.length; i++) {
          getClass[i].remove()
        }

      }
      if (cartItem.value == "") {
        addElement(notify, cartItem)

      } else {
        boolCart = true;
      }

    };
    if (boolCart == false) {
      validateString()

    }
    if (boolCart == true
    ) {
      // console.log(boolCart)
      // console.log(cartItem)
      let data = {
        query: cartItem
      }

      // store.push(data)
      successBanner(event, data)
      getNotify.innerHTML += `<h3 class="alert-success"> Updated to cart! ${JSON.stringify(data.query.name)} </h3>`
      setTimeout(() => {
        /**
         *  Notify the user that the product has been added.
         */
        getNotify.innerHTML = "";
        //to get the button on hbs conditions
        // window.location.reload();

      }, 4000)
    }
  }

  /**
   *  Add a button at the top of the category page labeled Add All To Cart. When clicked, the product will be added to the cart.
   */



  if (cartItemsDelete !== null) {
    cartItemsDelete.addEventListener('click', (e) => {
      e.preventDefault()
      deleteAll(e);
    })
  }

  if (cartItemsAll !== null) {
    cartItemsAll.addEventListener('click', () => {
      if (cartItem !== null) {
        cartItem.forEach(element => {
          element.click();
        });
      }
    })
  }
  for (let i = 0; i < cartItem.length; i++) {
    if (cartItem[i] !== null) {
      cartItem[i].addEventListener("click", (e) => {
        // e.preventDefault()
        submitForm(e, e.target);
      }, false);
    }
  }



}
