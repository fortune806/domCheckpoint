/**
 * 
 * SELECT ALL TAGS
 * 
 */

// Get All products
let allProductsTag = document.getElementById("AllProducts");

// Add to cart button
let addToCartTag = document.getElementsByClassName("btn");

// Cart List Tag
let cartListTag = document.getElementById("cartList");

// let Total Price Tag
let totalPriceTag = document.getElementById("total");





/**
 *  ACTIONS / EVENT LISTENERS
 */


// initialze empty cart array
let emptyCartArray = [];


function showCartList(cartListArray){
    let cartCount = cartListArray.length;
    let totalprice = 0;
    let allCart = ''
    for(let c = 0; c < cartCount; c++){
        totalprice = totalprice + parseInt(cartListArray[c].pPrice);
        allCart += `<div class="s-cart" id="s-cart">
                        <div class="c-img">
                            <img src="${cartListArray[c].pImage}" alt="" id="img">
                        </div>
                        <div class="c-details">
                            <h3 id="c-name">${cartListArray[c].pName}</h3>
                            <h4 id="c-price">$${cartListArray[c].pPrice}</h4>
                        </div>
                        <div class="delete-icon">
                            <button id="removeCart" class="c-btn">X</button>
                        </div>
                    </div>`;
    }

    cartListTag.innerHTML = allCart;
    totalPriceTag.textContent = "$"+totalprice;

    // remove from cart
    let removeFromCartBtn = document.getElementsByClassName("c-btn");

    // remove btn length
    let allremoveBtns = removeFromCartBtn.length;

    if (allremoveBtns > 0) {
        for(let r = 0; r < allremoveBtns; r++){
            // console.log("hello")
            removeFromCartBtn[r].addEventListener("click", function(){
                cartListArray.splice(r, 1);
        
                showCartList(cartListArray);
                // alert("Hello")
            })
        }
    }
}

function removeFromCart(totalLength, index) {
    emptyCartArray.splice(totalLength, index);

    showCartList(emptyCartArray);
}


function displayProducts(allProductsData){
    let emptyProductsString = '';

    allProductsData.map(singleP => {
        emptyProductsString += `<div class="single-product">
                                    <div class="img-prod">
                                        <img id="prodImg" src="${singleP.images[0]}" alt="">
                                    </div>

                                    <div class="prod-desc">
                                        <h3 id="prodName" class="prodName">${singleP.title}</h3>
                                        <h4 id="prodPrice" class="price" data-price="${singleP.price}">$${singleP.price}</h4>

                                        <button id="addToCart" class="btn">Add To Cart</button>
                                    </div>
                                </div>`;
    })

    allProductsTag.innerHTML = emptyProductsString;

    // Add to cart Button action
    let allbtns  = addToCartTag.length;

    for(let b = 0; b < allbtns; b++){
        addToCartTag[b].addEventListener("click", function(){
            let singleProductCont = addToCartTag[b].parentElement.parentElement;
            
            // product Price
            let price = singleProductCont.querySelector("#prodPrice").getAttribute("data-price");
    
            // product Name
            let pName = singleProductCont.querySelector("#prodName").textContent;
    
            // product Image
            let pimg = singleProductCont.querySelector("#prodImg").getAttribute("src");
    
            singleCart = {
                pName: pName,
                pPrice: price,
                pImage: pimg
            };
    
            emptyCartArray.push(singleCart);
            showCartList(emptyCartArray)
        })
    }
    
}

async function getAllProductsFromDB(){
    const response = await fetch("https://api.escuelajs.co/api/v1/products")
    const Products = await response.json();

    // send product to front end
    displayProducts(Products);
}

getAllProductsFromDB();

