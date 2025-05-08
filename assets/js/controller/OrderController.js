import {customerDB,itemDB,orderDB} from "../db/db.js"
import OrderModel from "../model/OrderModel.js"


// load order table
function loadOrderTable() {

    let orderTbl = $('#order-table-body');

    orderTbl.empty();

    for (let i = 0; i < orderDB.length; i++) {
        if(i===4){
            break;
        }

        let orderId = orderDB[i].orderId;
        let customerId = orderDB[i].customerId;
        let date = orderDB[i].date;
        let itemCount = orderDB[i].itemCount;
        let total = orderDB[i].total;

        let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

        orderTbl.append(data);
    }

    let tableLong = Math.ceil(itemDB.length/4);

    let orderTblTag = $('#order-tbl-long');
    orderTblTag[0].innerHTML = '1/'+tableLong;

    let orderSearchBar = $('#order-search-bar')[0];
    orderSearchBar.value = '';
}



//view order deatils icon
var selectedCustomerIdTodelete = null;

$(document).on('click', '.view-order-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    console.log(childrens);

    let orderDetail = "Order ID: "+childrens[1].innerHTML+"\n"+
        "Customer ID: "+childrens[3].innerHTML+"\n"+
        "Date: "+childrens[5].innerHTML+"\n"+
        "Item Count: "+childrens[7].innerHTML+"\n"+
        "Total: "+childrens[9].innerHTML;

    let orderDetailsTextArea = $('#order-details')[0];
    orderDetailsTextArea.value = orderDetail;

    let order = null;

    for (let i = 0; i <orderDB.length ; i++) {
        let id = orderDB[i].orderId;

        if(childrens[1].innerHTML==id){
            order = orderDB[i];
            break;
        }
    }

    let itemDeatils = "";

    if(order!=null){

        for (let i = 0; i < order.itemList.length; i++) {
            let itemId = order.itemList[i];
            console.log(itemId);

           for (let j = 0; j < itemDB.length; j++) {
                let iId = itemDB[j].id;

                if(iId==itemId){
                    itemDeatils +="Item ID: "+itemDB[i].id+", Description: "+itemDB[i].description+"\n";
                    break;
                }
            }
        }
    }

    let itemDetailsTextArea = $('#item-details')[0];
    itemDetailsTextArea.value = itemDeatils;
});



//load more table data right
let rightIcon = $('#load-more-order-tbl-data-right-icon')[0];
rightIcon.addEventListener('click',()=>{

    let values = rightIcon.closest('div').children;
    let value = values[1].innerHTML;

    let str = value.split('/');

    if(str[0]===str[1]){
        return;
    }

    let no = parseInt(str[0]);
    let x = no*4;
    let y = (no+1)*4;

    let orderTbl = $('#order-table-body');
    orderTbl.empty();

    for (let i = x; i < y; i++) {
        if(i>=orderDB.length){
            break;
        }

        let orderId = orderDB[i].orderId;
        let customerId = orderDB[i].customerId;
        let date = orderDB[i].date;
        let itemCount = orderDB[i].itemCount;
        let total = orderDB[i].total;

        let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

        orderTbl.append(data);
    }

    let tableLong = Math.ceil(orderDB.length/4);

    let orderTblTag = $('#order-tbl-long');
    orderTblTag[0].innerHTML = (no+1)+'/'+tableLong;

});



//load more table data left
let leftIcon = $('#load-more-order-tbl-data-left-icon')[0];
leftIcon.addEventListener('click',()=>{

    let values = leftIcon.closest('div').children;
    let value = values[1].innerHTML;

    let str = value.split('/');

    if(parseInt(str[0])<=1){
        return;
    }

    let no = parseInt(str[0]);
    let x = (no-1)*4;
    let y = x-4;

    let orderTbl = $('#order-table-body');
    orderTbl.empty();

    for (let i = y; i < x; i++) {

        let orderId = orderDB[i].orderId;
        let customerId = orderDB[i].customerId;
        let date = orderDB[i].date;
        let itemCount = orderDB[i].itemCount;
        let total = orderDB[i].total;

        let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

        orderTbl.append(data);
    }

    let tableLong = Math.ceil(orderDB.length/4);

    let orderTblTag = $('#order-tbl-long');
    orderTblTag[0].innerHTML = (no-1)+'/'+tableLong;

});




//order search
let orderSearchBar = $('#order-search-bar')[0];

orderSearchBar.addEventListener('keydown',(event)=> {

    let text = orderSearchBar.value.length;
    if((text===1 && event.key == 'Backspace') || (text>0 && event.key == 'Delete')){
        loadOrderTable();
    }

    if (event.key !== 'Enter') {
        return;
    }

    let inputText = orderSearchBar.value;
    inputText = inputText.toLowerCase();
    console.log(inputText);

    const orderIdregex = /^ord-\d{6}$/i;
    let orderIdValidation = orderIdregex.test(inputText);

    const customerIdRegex = /^C-0*[1-9][0-9]{0,5}$/i;
    let customerIdValidation = customerIdRegex.test(inputText);

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    let dateValidation = dateRegex.test(inputText);

    const qtyRegex = /^\d+$/;
    let qtyValidation = qtyRegex.test(inputText);

    const totalRegex = /^\d+\.\d{2}$/;
    let totalValidation = totalRegex.test(inputText);

    if(!orderIdValidation && !customerIdValidation && !dateValidation && !qtyValidation && !totalValidation){
        return;
    }

    if(orderIdValidation){

        // console.log('order id validate');

        let order = null;

        for (let i = 0; i < orderDB.length; i++) {
            let id = orderDB[i].orderId;
            id = id.toLowerCase();

            if(id===inputText){
                order = orderDB[i];
                break;
            }
        }

        if(order!==null) {

            let orderTbl = $('#order-table-body');
            orderTbl.empty();

            let orderId = order.orderId;
            let customerId = order.customerId;
            let date = order.date;
            let itemCount = order.itemCount;
            let total = order.total;

            let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

            orderTbl.append(data);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(customerIdValidation){

        // console.log("customer id valid");

        let order = [];

        for (let i = 0; i < orderDB.length; i++) {
            let customerId = orderDB[i].customerId;

            if (customerId.toLowerCase() === inputText) {
                order.push(orderDB[i]);
            }
        }

        if(order.length!=0) {

            let orderTbl = $('#order-table-body');
            orderTbl.empty();

            for (let i = 0; i < order.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let orderId = order[i].orderId;
                let customerId = order[i].customerId;
                let date = order[i].date;
                let itemCount = order[i].itemCount;
                let total = order[i].total;

                let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

                orderTbl.append(data);
            }

            let tableLong = Math.ceil(order.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = 1+'/'+1;
            return;
        }

    }
    if(dateValidation){

        // console.log('date validate');

        let order = [];

        for (let i = 0; i < orderDB.length; i++) {
            let date = orderDB[i].date;

            if(date===inputText){
                order.push(orderDB[i]);
            }
        }

        if(order.length!=0) {

            let orderTbl = $('#order-table-body');
            orderTbl.empty();

            for (let i = 0; i < order.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let orderId = order[i].orderId;
                let customerId = order[i].customerId;
                let date = order[i].date;
                let itemCount = order[i].itemCount;
                let total = order[i].total;

                let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

                orderTbl.append(data);
            }

            // let tableLong = Math.ceil(order.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(qtyValidation){

        // console.log('qty validate');

        let order = [];

        for (let i = 0; i < orderDB.length; i++) {
            let qty = orderDB[i].itemCount;

            if(qty==inputText){
                order.push(orderDB[i]);
            }
        }

        if(order.length!=0) {

            let orderTbl = $('#order-table-body');
            orderTbl.empty();

            for (let i = 0; i < order.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let orderId = order[i].orderId;
                let customerId = order[i].customerId;
                let date = order[i].date;
                let itemCount = order[i].itemCount;
                let total = order[i].total;

                let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

                orderTbl.append(data);
            }

            // let tableLong = Math.ceil(order.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(totalValidation){

        // console.log('total validate');

        let order = [];

        for (let i = 0; i < orderDB.length; i++) {
            let total = orderDB[i].total;

            if(total===inputText){
                order.push(orderDB[i]);
            }
        }

        if(order.length!=0) {

            let orderTbl = $('#order-table-body');
            orderTbl.empty();

            for (let i = 0; i < order.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let orderId = order[i].orderId;
                let customerId = order[i].customerId;
                let date = order[i].date;
                let itemCount = order[i].itemCount;
                let total = order[i].total;

                let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

                orderTbl.append(data);
            }

            // let tableLong = Math.ceil(order.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    else{

        loadOrderTable();
    }


});



//search by date
let dateInput = $('#date-input-in-order')[0];

dateInput.addEventListener('input',function () {

    if(!this.value){
        loadOrderTable();
    }
});


dateInput.addEventListener("change", function () {

    let selectedDate = this.value;
    let order = [];

    for (let i = 0; i < orderDB.length; i++) {
        let date = orderDB[i].date;

        if(date===selectedDate){
            order.push(orderDB[i]);
        }
    }

    if(order.length!=0) {

        let orderTbl = $('#order-table-body');
        orderTbl.empty();

        for (let i = 0; i < order.length; i++) {

            // if(i>=4){
            //     break;
            // }
            let orderId = order[i].orderId;
            let customerId = order[i].customerId;
            let date = order[i].date;
            let itemCount = order[i].itemCount;
            let total = order[i].total;

            let data = `<tr class="tbl-row">
                          <td>${orderId}</td>
                          <td>${customerId}</td>
                          <td>${date}</td>
                          <td>${itemCount}</td>
                          <td>${total}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-eye view-order-icon"></i>
                                    </button>
                               </div>
                          </td>
                    </tr>`

            orderTbl.append(data);
        }

        // let tableLong = Math.ceil(order.length/4);

        let orderTblTag = $('#order-tbl-long');
        orderTblTag[0].innerHTML = 1+'/'+1;
        return;
    }

});




loadOrderTable();