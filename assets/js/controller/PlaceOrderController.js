import {customerDB,itemDB,orderDB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"
import OrderModel from "../model/OrderModel.js"
import ItemModel from "../model/ItemModel.js"


// generate new order id
function generateNewOrderId() {

    let orderID = $('#orderID');

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





generateNewOrderId();
setTodayDate();
setCustomersIds();
setCustomersDetails();
setItemIds();
setItemsDetails();