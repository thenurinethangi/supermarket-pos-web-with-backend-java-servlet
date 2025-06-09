import CartModel from "../model/CartModel.js"

$(document).ready(function() {
    var username = localStorage.getItem('username');
    if (!username) {
        window.open("http://localhost:63342/supermarket-pos-web-with-backend-javaee/sign-in.html", "_self");
    }else {
        //
    }
});


$(document).ready(function() {
    window.addEventListener('pageshow', function(event) {
        // Check if page was loaded from browser cache (back/forward button)
        if (event.persisted) {
            // Page was loaded from cache, force reload
            window.location.reload();
        }
    });
});


// generate new order id
function generateNewOrderId() {

    let orderID = $('#orderID');

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/placeorder?newid=true',
        method: 'GET',
        success: function (res) {
            orderID.val(res);
        },
        error: function (xhr) {
            orderID.val(xhr.responseText);
            console.log("an error ocure while generating new order id");
        }

    });
}


//set current date
function setTodayDate() {

    let orderDate = $('#orderDate');

    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    orderDate.val(formatted);
}


//set customers ids
function setCustomersIds() {

    let customerSelect = $('#customerSelect');
    customerSelect.empty();

    customerSelect.append(`<option value="Select" selected>Select</option>`);

    $.ajax({
       url: 'http://localhost:8080/BackEnd_Web_exploded/placeorder?customers=true',
        method: 'GET',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                let id = res[i];

                let data = `<option value=${id}>${id}</option>`;
                customerSelect.append(data);
            }
        },
        error: function () {
            console.log("an error while set customer ids");
        }

    });
}


//set customer details by selected id
function setCustomersDetails() {

    let customerSelect = $('#customerSelect');
    let customerDetailsTextArea = $('.customer-details')[0];

    if(customerSelect[0].value && customerSelect[0].value!='Select'){
        let value = customerSelect[0].value;

        $.ajax({
           url: `http://localhost:8080/BackEnd_Web_exploded/placeorder?customerid=${value}`,
            method: 'GET',
            success: function (res) {
                let data1 = `<p class="mb-1">${res.id}</p>`;
                let data2 = `<p class="mb-1">${res.name}</p>`;
                let data3 = `<p class="mb-0">${res.phoneNo}</p>`;

                customerDetailsTextArea.innerHTML = "";
                customerDetailsTextArea.insertAdjacentHTML("beforeend", data1);
                customerDetailsTextArea.insertAdjacentHTML("beforeend", data2);
                customerDetailsTextArea.insertAdjacentHTML("beforeend", data3);

            },
            error: function () {
                console.log("an error ocure while setting selected customer details");
            }

        });
    }
    if(customerSelect[0].value=='Select'){
        customerDetailsTextArea.innerHTML = "";
    }
}



//set customer details by when selecting a id
let customerSelect = $('#customerSelect')[0];
customerSelect.addEventListener('change',function () {

    let id = this.value;
    let customerDetailsTextArea = $('.customer-details')[0];
    console.log(id);

    if(id=='Select'){
        customerDetailsTextArea.innerHTML = "";
        return;
    }

    $.ajax({
        url: `http://localhost:8080/BackEnd_Web_exploded/placeorder?customerid=${id}`,
        method: 'GET',
        success: function (res) {
            let data1 = `<p class="mb-1">${res.id}</p>`;
            let data2 = `<p class="mb-1">${res.name}</p>`;
            let data3 = `<p class="mb-0">${res.phoneNo}</p>`;

            customerDetailsTextArea.innerHTML = "";
            customerDetailsTextArea.insertAdjacentHTML("beforeend", data1);
            customerDetailsTextArea.insertAdjacentHTML("beforeend", data2);
            customerDetailsTextArea.insertAdjacentHTML("beforeend", data3);
        },
        error: function () {
            console.log("an error ocure while setting customer details when selecting a customer ids");
        }
    });

});



//set item ids
function setItemIds() {

    let itemSelect = $('#itemSelect');
    itemSelect.empty();

    itemSelect.append(`<option value="Select" selected>Select</option>`);

    $.ajax({
       url: 'http://localhost:8080/BackEnd_Web_exploded/placeorder?items=true',
        method: 'GET',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                let id = res[i];

                let data = `<option value=${id}>${id}</option>`;
                itemSelect.append(data);
            }
        },
        error: function () {
            console.log("an error ocure while setting item ids");
        }

    });
}


// set item details by selected id
function setItemsDetails() {

    let itemSelect = $('#itemSelect');
    let itemDetailsTextArea = $('#item-details')[0];

    if(itemSelect[0].value && itemSelect[0].value!='Select'){
        let value = itemSelect[0].value;

        $.ajax({
            url: `http://localhost:8080/BackEnd_Web_exploded/placeorder?itemid=${value}`,
            method: 'GET',
            success: function (res) {
                let data1 = `<p class="mb-1">ID: res.id}</p>`;
                let data2 = `<p class="mb-1">Description: ${res.description}</p>`;
                let data3 = `<p class="mb-1">Price: ${res.price}</p>`;
                let data4 = `<p class="mb-0">Qty: ${res.qty}</p>`;

                itemDetailsTextArea.innerHTML = "";
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data1);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data2);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data3);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data4);
            },
            error: function () {
                console.log("an error ocure while getting selected item details");
            }

        });
    }
    if(itemSelect[0].value=='Select'){
        itemDetailsTextArea.innerHTML = "";
    }
}


//set customer details by when selecting a id
let itemSelect = $('#itemSelect')[0];
itemSelect.addEventListener('change',function () {

    let id = this.value;
    let itemDetailsTextArea = $('#item-details')[0];

    if(id!='Select') {
        $.ajax({
            url: `http://localhost:8080/BackEnd_Web_exploded/placeorder?itemid=${id}`,
            method: 'GET',
            success: function (res) {
                let data1 = `<p class="mb-1">ID: ${res.id}</p>`;
                let data2 = `<p class="mb-1">Description: ${res.description}</p>`;
                let data3 = `<p class="mb-1">Price: ${res.price}</p>`;
                let data4 = `<p class="mb-0">Qty: ${res.qty}</p>`;

                itemDetailsTextArea.innerHTML = "";
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data1);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data2);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data3);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data4);

                let qtySelect = $('#selectQty')[0];
                qtySelect.value = 1;
            },
            error: function () {
                console.log("an error ocure while setting customer details when selecting customer ids");
            }
        });
    }
    if(id=='Select'){
        itemDetailsTextArea.innerHTML = "";
    }
});



//add cart
var cart = [];
let addCardBtn = $('#add-to-cart-btn')[0];
addCardBtn.addEventListener('click', function () {

    let itemSelect = $('#itemSelect')[0];
    let itemId = itemSelect.value;

    if (!itemSelect.value || itemId == 'Select') {
        Swal.fire({
            title: 'Warning!',
            text: 'Select an item before adding it to the cart.',
            icon: 'warning',
            timer: 1500,
            showConfirmButton: false
        });
        return;
    }

    let qtySelect = $('#selectQty')[0];
    let qty = Number(qtySelect.value);

    // First AJAX call to get item details
    $.ajax({
        url: `http://localhost:8080/BackEnd_Web_exploded/placeorder?itemid=${itemId}`,
        method: "GET",
        success: function (res) {
            let price = res.price;
            let availableQty = res.qty;

            // Check if requested quantity is available
            if (availableQty < qty) {
                Swal.fire({
                    title: 'Warning!',
                    text: 'The available quantity is insufficient!',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            // Check if item already exists in cart
            let existingItemIndex = -1;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].itemId == itemId) {
                    existingItemIndex = i;
                    break;
                }
            }

            if (existingItemIndex !== -1) {
                // Item exists in cart - update quantity
                let totalQtyCount = cart[existingItemIndex].qty + qty;

                if (availableQty < totalQtyCount) {
                    Swal.fire({
                        title: 'Warning!',
                        text: 'The available quantity is insufficient!',
                        icon: 'warning',
                        confirmButtonText: 'Ok'
                    });
                    return;
                }

                // Update existing cart item
                cart[existingItemIndex].qty = totalQtyCount;
                cart[existingItemIndex].total = cart[existingItemIndex].qty * cart[existingItemIndex].price;

                showSuccessAndUpdate();
            } else {
                // New item - add to cart
                let total = price * qty;
                let cartItem = new CartModel(itemId, price, qty, total);
                cart.push(cartItem);

                showSuccessAndUpdate();
            }

            function showSuccessAndUpdate() {
                loadCartTable();
                setItemIds();
                setItemsDetails();

                Swal.fire({
                    title: 'Added to Cart!',
                    text: 'The item has been successfully added to cart.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });

                // Reset quantity selector
                qtySelect.value = 1;
            }
        },
        error: function (xhr, status, error) {
            console.log("Error occurred while loading item data:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to load item details. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});



// load cart table
function loadCartTable() {

    let cartTbl = $('#cart-tbl');
    cartTbl.empty();

    let mainTotal = 0;

    for (let i = 0; i < cart.length; i++) {

        mainTotal+=cart[i].total;

        let itemId = cart[i].itemId;
        let price = cart[i].price;
        let qty = cart[i].qty;
        let total = cart[i].total;

        let data = `<tr>
                          <td>${itemId}</td>
                          <td>${price}</td>
                          <td>${qty}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit cart-item-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn">
                                        <i class="fas fa-trash cart-item-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

        cartTbl.append(data);
    }

    let totalValuetext = $('.total-value')[0];
    mainTotal = mainTotal.toFixed(2);
    totalValuetext.innerHTML = mainTotal;

    let discountTag = $('#discount')[0];
    discountTag.value = 0;

    let finalPriceTag = $('.final-price')[0];
    finalPriceTag.innerHTML = 'Rs '+mainTotal;
}


//cart item delete
$(document).on('click', '.cart-item-delete-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    let itemId = childrens[1].innerHTML;

    for (let i = 0; i < cart.length; i++) {
        let id = cart[i].itemId;

        if(id==itemId){
            cart.splice(i,1);
            break;
        }
    }

    loadCartTable();
    Swal.fire({
        title: 'Removed From Cart!',
        text: 'Removed Item ID: '+itemId+", from cart",
        icon: 'success',
        timer: 1200,
        showConfirmButton: false
    });
});



//edit cart item icon
$(document).on('click', '.cart-item-edit-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    let itemId = childrens[1].innerHTML;

    let qty = childrens[5].innerHTML;

    let editCartFormInputFields = $('#update-order-modal-body>input');

    editCartFormInputFields[0].value = itemId;
    editCartFormInputFields[1].value = qty;

});


//edit cart item btn
let editCartItemBtn = $('#cart-item-edit-btn')[0];
editCartItemBtn.addEventListener('click',function () {

    let editCartFormInputFields = $('#update-order-modal-body>input');

    let itemId = editCartFormInputFields[0].value;
    let qty = editCartFormInputFields[1].value;

    for (let i = 0; i < cart.length; i++) {
        let id = cart[i].itemId;

        if(id==itemId){

            let totalQtyCount = cart[i].qty + Number(qty);

            for (let j = 0; j < itemDB.length; j++) {
                let itemIdInDb = itemDB[j].id;

                if(itemIdInDb==id){
                    let availableQty = itemDB[j].quntity;
                    if(availableQty<totalQtyCount){
                        Swal.fire({
                            title: 'Warning!',
                            text: 'The available quantity is insufficient!',
                            icon: 'warning',
                            confirmButtonText: 'Ok'
                        });
                        return;
                    }

                }
            }
            cart[i].qty = Number(qty);
            cart[i].total = Number(cart[i].price)*cart[i].qty;
            Swal.fire({
                title: 'Updated The Cart!',
                text: 'Successfully updated the item count in the cart for Item ID: '+itemId,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            break;
        }
    }

    loadCartTable();
});


//discount field js
let discountTextField = $('#discount')[0];
discountTextField.addEventListener('keyup',function (event) {

    let finalPriceTag = $('.final-price')[0];
    let subTotalTag = $('.total-value')[0];

    let value = this.value.toString();
    value = value.trim();
    if(value==''){
        finalPriceTag.innerHTML = "Rs "+subTotalTag.innerHTML;

    }

    const discountRegex = /^(100(?:\.0+)?|[1-9]?\d(?:\.\d+)?|0(?:\.0+)?)$/;
    let discountValidation = discountRegex.test(value);
    value = Number(value);

    if(discountValidation){

        let subTotal = Number(subTotalTag.innerHTML);
        let reduce = (subTotal*value)/100;
        let finalTotal = subTotal - reduce;
        finalTotal = finalTotal.toFixed(2);

        finalPriceTag.innerHTML = "Rs "+finalTotal;

        let cashTextField = $('#cash')[0];
        if(cashTextField.value){
            let balanceTag = $('#balance')[0];
            balanceTag.value = Number(cashTextField.value)-finalTotal;
        }
    }

});



//cash field js
let cashTextField = $('#cash')[0];
cashTextField.addEventListener('keyup',function (event) {

    let value = this.value.toString();
    const cashRegex = /^\d+(\.\d{1,2})?$/;
    let cashValidation = cashRegex.test(value);
    value = Number(value);

    let finalPriceTag = $('.final-price')[0];
    let balanceTag = $('#balance')[0];
    if(cashValidation){

        let finalTotal = finalPriceTag.innerHTML;
        finalTotal = Number(finalTotal.split(" ")[1]);

        let balance = value - finalTotal;
        balance = balance.toFixed(2);
        balanceTag.value = balance;
    }

});



//place order
let placeOrderBtn = $('#placeOrderBtn')[0];
placeOrderBtn.addEventListener('click',async function () {

    let customerSelect = $('#customerSelect')[0];
    if(!customerSelect.value || customerSelect.value=='Select'){
        Swal.fire({
            title: 'Error!',
            text: 'Enter Customer Details First',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }
    let customerId = customerSelect.value;

    if(cart.length<=0){
        Swal.fire({
            title: 'Warning!',
            text: 'Please add the item to the cart first',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        return;
    }

    let cashField = $('#cash')[0];
    if(!cashField.value || cashField.value===''){
        Swal.fire({
            title: 'Warning!',
            text: 'Please enter cash amount to place the order',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        return;
    }
    let cash = cashField.value;

    let balance = $('#balance')[0];
    balance = balance.value;
    balance = Number(balance);

    if(balance<0){
        Swal.fire({
            title: 'Warning!',
            text: 'The cash amount entered is insufficient to place the order',
            icon: 'warning',
            confirmButtonText: 'Ok'
        });
        return;
    }
    
    let spinner = $('.spinner-border-sm')[0];
    spinner.style.display = 'inline-block';
    await sleep(2000);
    spinner.style.display = 'none';

    let orderIdField = $('#orderID')[0];
    let orderId = orderIdField.value;

    let dateField = $('#orderDate')[0];
    let date = dateField.value;

    let itemCount = 0;
    for (let i = 0; i < cart.length; i++) {
        itemCount+=Number(cart[i].qty);
    }
    
    let finalPriceTag = $('.final-price')[0];
    let finalPrice = Number(finalPriceTag.innerHTML.split(" ")[1]);
    finalPrice = finalPrice.toFixed(2);

    let itemsList = [];
    for (let i = 0; i < cart.length; i++) {
        itemsList.push(cart[i].itemId);
        itemsList.push(String(cart[i].qty));
    }

    let data = {
        "id": orderId,
        "date": date,
        "total": String(finalPrice),
        "itemCount": String(itemCount),
        "customer": customerId,
        "itemList": itemsList
    };

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/placeorder',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (res) {
            Swal.fire({
                title: 'Success!',
                text: 'Order Placed Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            clean();
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Fail To Place The Order,Try Again Later',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.log("an error ocure while placing the order");
        }

    });

});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//clean after place the order
function clean() {

    cart = [];
    loadCartTable();
    generateNewOrderId();
    setTodayDate();
    setCustomersIds();
    setCustomersDetails();
    setItemIds();
    setItemsDetails();

    let cashField = $('#cash')[0];
    cashField.value = '';

    let balance = $('#balance')[0];
    balance.value = '';

    let qtySelect = $('#selectQty')[0];
    qtySelect.value = 1;

}



generateNewOrderId();
setTodayDate();
setCustomersIds();
setCustomersDetails();
setItemIds();
setItemsDetails();