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




//customer search
let customerSearchBar = $('#customer-search-bar')[0];

customerSearchBar.addEventListener('keydown',(event)=> {

    let text = customerSearchBar.value.length;
    if((text===1 && event.key == 'Backspace') || (text>0 && event.key == 'Delete')){
        loadCustomerTable();
    }

    if (event.key !== 'Enter') {
        return;
    }

    let inputText = customerSearchBar.value;
    inputText = inputText.toLowerCase();
    // console.log(inputText);

    const idRegex = /^C-0*[1-9][0-9]{0,5}$/i;
    let customerIdValidation = idRegex.test(inputText);

    const nameRegex = /^(([A-Z]\.)+\s)?([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
    let nameValidation = nameRegex.test(inputText);

    const addressRegex = /^[A-Za-z0-9\s,\/\-]{5,}$/;
    let addressValidation = addressRegex.test(inputText);

    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    let nicValidation = nicRegex.test(inputText);

    const phoneRegex = /^(?:0|\+94)(7[01245678])\d{7}$/;
    let phoneNoValidation = phoneRegex.test(inputText);

    if(!customerIdValidation && !nameValidation && !addressValidation && !nicValidation && !phoneNoValidation){
        return;
    }

    if(customerIdValidation){

        // console.log('customer id validate');

        let customer = null;

        for (let i = 0; i < customerDB.length; i++) {
            let id = customerDB[i].id;
            id = id.toLowerCase();

            if(id===inputText){
                customer = customerDB[i];
                break;
            }
        }

        if(customer!==null) {

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            let id = customer.id;
            let name = customer.name;
            let address = customer.address;
            let nic = customer.nic;
            let phoneNo = customer.phoneNo;

            let data = `<tr class="tbl-row">
                          <td>${id}</td>
                          <td>${name}</td>
                          <td>${address}</td>
                          <td>${nic}</td>
                          <td>${phoneNo}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit customer-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash customer-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

            customerTbl.append(data);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(nameValidation){

        // console.log("name valid");

        let customer = [];

        if(inputText.split(' ').length>1){

            for (let i = 0; i < customerDB.length; i++) {
                let name = customerDB[i].name;

                if(name.toLowerCase()===inputText){
                    customer.push(customerDB[i]);
                }
            }
        }
        else if(inputText.split(' ').length===1){
            for (let i = 0; i < customerDB.length; i++) {
                let name = customerDB[i].name;
                let arr = name.split(' ');

                for (let j = 0; j < arr.length; j++) {
                    if (arr[j].toLowerCase() === inputText) {
                        customer.push(customerDB[i]);
                        break;
                    }
                }
            }
        }

        if(customer.length!=0) {

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            for (let i = 0; i < customer.length; i++) {

                if(i>=4){
                    break;
                }
                let id = customer[i].id;
                let name = customer[i].name;
                let address = customer[i].address;
                let nic = customer[i].nic;
                let phoneNo = customer[i].phoneNo;

                let data = `<tr class="tbl-row">
                          <td>${id}</td>
                          <td>${name}</td>
                          <td>${address}</td>
                          <td>${nic}</td>
                          <td>${phoneNo}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit customer-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash customer-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

                customerTbl.append(data);
            }

            let tableLong = Math.ceil(customer.length/4);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = 1+'/'+tableLong;
            return;
        }

    }
    if(addressValidation){

        // console.log('address validate');

        let customer = [];

        for (let i = 0; i < customerDB.length; i++) {
            let address = customerDB[i].address;

            if(address.toLowerCase()===inputText){
                customer.push(customerDB[i]);
            }
        }

        if(customer.length!=0) {

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            for (let i = 0; i < customer.length; i++) {

                if(i>=4){
                    break;
                }
                let id = customer[i].id;
                let name = customer[i].name;
                let address = customer[i].address;
                let nic = customer[i].nic;
                let phoneNo = customer[i].phoneNo;

                let data = `<tr class="tbl-row">
                          <td>${id}</td>
                          <td>${name}</td>
                          <td>${address}</td>
                          <td>${nic}</td>
                          <td>${phoneNo}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit customer-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash customer-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

                customerTbl.append(data);
            }

            let tableLong = Math.ceil(customer.length/4);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = 1+'/'+tableLong;
            return;
        }
    }
    if(nicValidation){

        // console.log('nic validate');

        let customer = null;

        for (let i = 0; i < customerDB.length; i++) {
            let nic = customerDB[i].nic;

            if(nic===inputText){
                customer = customerDB[i];
                break;
            }
        }

        if(customer!=null) {

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            let id = customer.id;
            let name = customer.name;
            let address = customer.address;
            let nic = customer.nic;
            let phoneNo = customer.phoneNo;

            let data = `<tr class="tbl-row">
                          <td>${id}</td>
                          <td>${name}</td>
                          <td>${address}</td>
                          <td>${nic}</td>
                          <td>${phoneNo}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit customer-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash customer-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

            customerTbl.append(data);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(phoneNoValidation){

        // console.log('phone number validate');

        let customer = null;

        for (let i = 0; i < customerDB.length; i++) {
            let phoneNo = customerDB[i].phoneNo;

            if(phoneNo===inputText){
                customer = customerDB[i];
                break;
            }
        }

        if(customer!=null) {

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            let id = customer.id;
            let name = customer.name;
            let address = customer.address;
            let nic = customer.nic;
            let phoneNo = customer.phoneNo;

            let data = `<tr class="tbl-row">
                          <td>${id}</td>
                          <td>${name}</td>
                          <td>${address}</td>
                          <td>${nic}</td>
                          <td>${phoneNo}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit customer-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash customer-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

            customerTbl.append(data);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    else{

        loadCustomerTable();
    }


});




loadOrderTable();