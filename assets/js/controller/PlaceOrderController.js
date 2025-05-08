import {customerDB,itemDB,orderDB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"
import OrderModel from "../model/OrderModel.js"
import ItemModel from "../model/ItemModel.js"
import CartModel from "../model/CartModel.js"


// generate new order id
function generateNewOrderId() {

    let orderID = $('#orderID');

    if(orderDB.length<=0){
        orderID.val('ORD-000001');
        return;
    }

    let lastOrderId = orderDB[orderDB.length-1].orderId;
    let numberPart = lastOrderId.split("-")[1];
    numberPart = Number(numberPart)+1;
    let formattedNumber = String(numberPart).padStart(6, '0');
    let newId = lastOrderId.split("-")[0]+'-' + formattedNumber;
    // console.log(newId);

    orderID.val(newId);
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

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;

        let data = `<option value=${id}>${id}</option>`;
        customerSelect.append(data);
    }
}


//set customer details by selected id
function setCustomersDetails() {

    let customerSelect = $('#customerSelect');
    let customerDetailsTextArea = $('.customer-details')[0];

    if(customerSelect[0].value){
        let value = customerSelect[0].value;

        for (let i = 0; i < customerDB.length; i++) {
            let id = customerDB[i].id;

            if(value==id){
                let data1 = `<p class="mb-1">${customerDB[i].id}</p>`;
                let data2 = `<p class="mb-1">${customerDB[i].name}</p>`;
                let data3 = `<p class="mb-0">${customerDB[i].phoneNo}</p>`;

                customerDetailsTextArea.innerHTML = "";
                customerDetailsTextArea.insertAdjacentHTML("beforeend", data1);
                customerDetailsTextArea.insertAdjacentHTML("beforeend", data2);
                customerDetailsTextArea.insertAdjacentHTML("beforeend", data3);
                break;
            }
        }
    }
}



//set customer details by when selecting a id
let customerSelect = $('#customerSelect')[0];
customerSelect.addEventListener('change',function () {

    let id = this.value;
    let customerDetailsTextArea = $('.customer-details')[0];
    console.log(id);

    for (let i = 0; i < customerDB.length; i++) {
        let customerId = customerDB[i].id;

        if(id==customerId){
            let data1 = `<p class="mb-1">${customerDB[i].id}</p>`;
            let data2 = `<p class="mb-1">${customerDB[i].name}</p>`;
            let data3 = `<p class="mb-0">${customerDB[i].phoneNo}</p>`;

            customerDetailsTextArea.innerHTML = "";
            customerDetailsTextArea.insertAdjacentHTML("beforeend", data1);
            customerDetailsTextArea.insertAdjacentHTML("beforeend", data2);
            customerDetailsTextArea.insertAdjacentHTML("beforeend", data3);
            break;
        }
    }

});



//set item ids
function setItemIds() {

    let itemSelect = $('#itemSelect');
    itemSelect.empty();

    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;

        let data = `<option value=${id}>${id}</option>`;
        itemSelect.append(data);
    }
}


// set customer details by selected id
function setItemsDetails() {

    let itemSelect = $('#itemSelect');
    let itemDetailsTextArea = $('#item-details')[0];

    if(itemSelect[0].value){
        let value = itemSelect[0].value;

        for (let i = 0; i < itemDB.length; i++) {
            let id = itemDB[i].id;

            if(value==id){
                let data1 = `<p class="mb-1">ID: ${itemDB[i].id}</p>`;
                let data2 = `<p class="mb-1">Description: ${itemDB[i].description}</p>`;
                let data3 = `<p class="mb-1">Price: ${itemDB[i].price}</p>`;
                let data4 = `<p class="mb-0">Qty: ${itemDB[i].quntity}</p>`;

                itemDetailsTextArea.innerHTML = "";
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data1);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data2);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data3);
                itemDetailsTextArea.insertAdjacentHTML("beforeend", data4);
                break;
            }
        }
    }
}


//set customer details by when selecting a id
let itemSelect = $('#itemSelect')[0];
itemSelect.addEventListener('change',function () {

    let id = this.value;
    let itemDetailsTextArea = $('#item-details')[0];

    for (let i = 0; i < itemDB.length; i++) {
        let itemId = itemDB[i].id;

        if(id==itemId){
            let data1 = `<p class="mb-1">ID: ${itemDB[i].id}</p>`;
            let data2 = `<p class="mb-1">Description: ${itemDB[i].description}</p>`;
            let data3 = `<p class="mb-1">Price: ${itemDB[i].price}</p>`;
            let data4 = `<p class="mb-0">Qty: ${itemDB[i].quntity}</p>`;

            itemDetailsTextArea.innerHTML = "";
            itemDetailsTextArea.insertAdjacentHTML("beforeend", data1);
            itemDetailsTextArea.insertAdjacentHTML("beforeend", data2);
            itemDetailsTextArea.insertAdjacentHTML("beforeend", data3);
            itemDetailsTextArea.insertAdjacentHTML("beforeend", data4);
            break;
        }
    }

});



//add cart
var cart = [];
let addCardBtn = $('#add-to-cart-btn')[0];
addCardBtn.addEventListener('click',function () {

    let itemSelect = $('#itemSelect')[0];
    let itemId = itemSelect.value;

    if(!itemSelect.value){
        return;
    }

    let price = 0;
    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;

        if(id==itemId){
            price = itemDB[i].price;
        }
    }

    let qtySelect = $('#selectQty')[0];
    let qty= Number(qtySelect.value);

    let total = Number(price)*Number(qty);

    for (let i = 0; i < cart.length; i++) {
        let iId = cart[i].itemId;

        if(iId==itemId){
            cart[i].qty += Number(qty);
            cart[i].total = cart[i].qty*cart[i].price;
            loadCartTable();
            Swal.fire({
                title: 'Added to Cart!',
                text: 'The item has been successfully added to cart.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            let qtySelect = $('#selectQty')[0];
            qtySelect.value = 1;
            return;
        }
    }

    let cartItem = new CartModel(itemId,price,qty,total);
    cart.push(cartItem);
    loadCartTable();

    Swal.fire({
        title: 'Added to Cart!',
        text: 'The item has been successfully added to cart.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
    let quantitySelect = $('#selectQty')[0];
    quantitySelect.value = 1;

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

    let value = this.value.toString();
    const discountRegex = /^(100(?:\.0+)?|[1-9]?\d(?:\.\d+)?|0(?:\.0+)?)$/;
    let discountValidation = discountRegex.test(value);
    value = Number(value);

    let finalPriceTag = $('.final-price')[0];
    let subTotalTag = $('.total-value')[0];
    if(discountValidation){

        let subTotal = Number(subTotalTag.innerHTML);
        let reduce = (subTotal*value)/100;
        let finalTotal = subTotal - reduce;
        finalTotal = finalTotal.toFixed(2);

        finalPriceTag.innerHTML = "Rs "+finalTotal;
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
    if(!customerSelect.value){
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

    for (let i = 0; i < cart.length; i++) {
        let itemId = cart[i].itemId;

        for (let j = 0; j < itemDB.length; j++) {
            let id = itemDB[j].id;

            if(id==itemId){
                let qty = Number(itemDB[j].quntity);
                qty-=Number(cart[i].qty);
                itemDB[j].quntity = qty;
                break;
            }
        }
    }
    
    let finalPriceTag = $('.final-price')[0];
    let finalPrice = Number(finalPriceTag.innerHTML.split(" ")[1]);
    finalPrice = finalPrice.toFixed(2);

    let itemsList = [];
    for (let i = 0; i < cart.length; i++) {
        itemsList.push(cart[i].itemId);
    }

    let order = new OrderModel(orderId,customerId,date,itemCount,finalPrice,itemsList);
    orderDB.push(order);

    Swal.fire({
        title: 'Success!',
        text: 'Order Placed Successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
    })
    clean();

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