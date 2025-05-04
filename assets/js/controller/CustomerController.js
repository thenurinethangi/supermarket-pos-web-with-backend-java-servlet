import {customerDB,itemDB,orderDB} from "../db/db.js"
import CustomerModel from "../model/CustomerModel.js"

// load customer table
function loadCustomerTable() {

    let customerTbl = $('#customer-table-body');
    let customerTblRows = $('#customer-table-body>tr');

    customerTbl.empty();

    for (let i = 0; i < customerDB.length; i++) {
        if(i===4){
            break;
        }

        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let nic = customerDB[i].nic;
        let phoneNo = customerDB[i].phoneNo;

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

    let tableLong = Math.ceil(customerDB.length/4);

    let customerTblTag = $('#customer-tbl-long');
    customerTblTag[0].innerHTML = '1/'+tableLong;
}



// generate new customer id
function generateNewCustomerId() {

    let customerId = $('#customer-id');

    let lastCustomerId = customerDB[customerDB.length-1].id;
    let numberPart = lastCustomerId.split("-")[1];
    numberPart = Number(numberPart)+1;
    let formattedNumber = String(numberPart).padStart(6, '0');
    let newId = lastCustomerId.split("-")[0]+'-' + formattedNumber;
    // console.log(newId);

    customerId.val(newId);
}


// customer form clear btn js
let clearFormBtn = $('#customer-form-clear')[0];

clearFormBtn.addEventListener('click',(event)=>{

    let inputFileds = $('#customer-modal-body>input');

    inputFileds[1].value = '';
    inputFileds[2].value = '';
    inputFileds[3].value = '';
    inputFileds[4].value = '';

    generateNewCustomerId();

});


// add new customer js
let addNewCustomerBtn = $('#customer-form-add-btn')[0];

addNewCustomerBtn.addEventListener('click',(event)=>{

    let inputFileds = $('#customer-modal-body>input');

    let customerId = inputFileds[0].value;
    let name = inputFileds[1].value;
    let address = inputFileds[2].value;
    let nic = inputFileds[3].value;
    let phoneNo = inputFileds[4].value;

    if(customerId==='' || name==='' || address==='' || nic==='' || phoneNo==''){

        Swal.fire({
            title: 'Error!',
            text: 'All fields required',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    const nameRegex = /^(([A-Z]\.)+\s)?([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
    let nameValidation = nameRegex.test(name);

    const addressRegex = /^[A-Za-z0-9\s,\/\-]{5,}$/;
    let addressValidation = addressRegex.test(address);

    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    let nicValidation = nicRegex.test(nic);

    const phoneRegex = /^(?:0|\+94)(7[01245678])\d{7}$/;
    let phoneNoValidation = phoneRegex.test(phoneNo);

    if(!nameValidation || !addressValidation || !nicValidation || !phoneNoValidation){

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    let newCustomer = new CustomerModel(customerId,name,address,nic,phoneNo);
    customerDB.push(newCustomer);

    if(customerDB[customerDB.length-1].id===customerId){

        Swal.fire({
            title: 'Success!',
            text: 'Successfully Added A New Customer',
            icon: 'success',
            confirmButtonText: 'Ok'
        })

        inputFileds[1].value = '';
        inputFileds[2].value = '';
        inputFileds[3].value = '';
        inputFileds[4].value = '';
        generateNewCustomerId();
        loadCustomerTable();
    }
    else{

        Swal.fire({
            title: 'Fail!',
            text: 'Failed To Add A New Customer',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        inputFileds[1].value = '';
        inputFileds[2].value = '';
        inputFileds[3].value = '';
        inputFileds[4].value = '';
        generateNewCustomerId();
        loadCustomerTable();
    }

});



//customer delete icon
var selectedCustomerIdTodelete = null;

$(document).on('click', '.customer-delete-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    let customerId = childrens[1].innerHTML;
    selectedCustomerIdTodelete = customerId;
});


// cancel delete customer button
let cancelDeletCustomerBtn = $('#cancel-customer-delete')[0];
cancelDeletCustomerBtn.addEventListener('click',()=>{

    selectedCustomerIdTodelete = null;
});



// delete customer
let deletCustomerBtn = $('#delete-customer-btn')[0];
deletCustomerBtn.addEventListener('click',()=>{

    if(selectedCustomerIdTodelete===null){
        Swal.fire({
            title: 'Fail!',
            text: 'Failed To Delete Selected Customer',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }

    let bool = false;
    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;

        if(id===selectedCustomerIdTodelete){
            bool = true;
            customerDB.splice(i, 1);
            Swal.fire({
                title: 'Deleted!',
                text: 'Successfully Deleted Customer ID: '+selectedCustomerIdTodelete,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            break;
        }
    }

    if(bool===false){
        Swal.fire({
            title: 'Fail!',
            text: 'Failed To Delete Customer ID: '+selectedCustomerIdTodelete,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    // console.log(customerDB);
    selectedCustomerIdTodelete = null;
    loadCustomerTable();

});



//customer edit icon
var selectedCustomerIdToEdit = null;

$(document).on('click', '.customer-edit-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    let customerId = childrens[1].innerHTML;
    selectedCustomerIdToEdit = customerId;
    let selectedCustomer = null;

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;

        if(id===selectedCustomerIdToEdit){
            selectedCustomer = customerDB[i];
            break;
        }
    }

    let editCustomerFormInputFields = $('#update-customer-modal-body>input');

    if(selectedCustomer!=null) {
        editCustomerFormInputFields[0].value = selectedCustomer.id;
        editCustomerFormInputFields[1].value = selectedCustomer.name;
        editCustomerFormInputFields[2].value = selectedCustomer.address;
        editCustomerFormInputFields[3].value = selectedCustomer.nic;
        editCustomerFormInputFields[4].value = selectedCustomer.phoneNo;
    }
});



// edit customer
let updateCustomerBtn = $('#customer-edit-btn')[0];
updateCustomerBtn.addEventListener('click',()=>{

    let inputFileds = $('#update-customer-modal-body>input');

    let customerId = inputFileds[0].value;
    let name = inputFileds[1].value;
    let address = inputFileds[2].value;
    let nic = inputFileds[3].value;
    let phoneNo = inputFileds[4].value;

    if(customerId==='' || name==='' || address==='' || nic==='' || phoneNo==''){

        Swal.fire({
            title: 'Error!',
            text: 'All fields required',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    const nameRegex = /^(([A-Z]\.)+\s)?[A-Z][a-zA-Z]*$/;
    let nameValidation = nameRegex.test(name);

    const addressRegex = /^[A-Za-z0-9\s,\/\-]{5,}$/;
    let addressValidation = addressRegex.test(address);

    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    let nicValidation = nicRegex.test(nic);

    const phoneRegex = /^(?:0|\+94)(7[01245678])\d{7}$/;
    let phoneNoValidation = phoneRegex.test(phoneNo);

    if(!nameValidation || !addressValidation || !nicValidation || !phoneNoValidation){

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    let selectedCustomer = null;

    for (let i = 0; i < customerDB.length; i++) {
        let id = customerDB[i].id;

        if(id===customerId){
            selectedCustomer = customerDB[i];
            break;
        }
    }

    if(selectedCustomer!=null){

        selectedCustomer.name = name;
        selectedCustomer.address = address;
        selectedCustomer.nic = nic;
        selectedCustomer.phoneNo = phoneNo;

        Swal.fire({
            title: 'Success!',
            text: 'Successfully Updated Customer ID: '+customerId,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    else{

        Swal.fire({
            title: 'Error!',
            text: 'Failed To Update Customer ID: '+customerId,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }

    // console.log(selectedCustomer);
    // console.log(customerDB);
    loadCustomerTable();

});



//load more table data right
let rightIcon = $('#load-more-tbl-data-right-icon')[0];
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

    let customerTbl = $('#customer-table-body');
    customerTbl.empty();

    for (let i = x; i < y; i++) {
        if(i>=customerDB.length){
            break;
        }

        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let nic = customerDB[i].nic;
        let phoneNo = customerDB[i].phoneNo;

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

    let tableLong = Math.ceil(customerDB.length/4);

    let customerTblTag = $('#customer-tbl-long');
    customerTblTag[0].innerHTML = (no+1)+'/'+tableLong;

});



//load more table data left
let leftIcon = $('#load-more-tbl-data-left-icon')[0];
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

    let customerTbl = $('#customer-table-body');
    customerTbl.empty();

    for (let i = y; i < x; i++) {

        let id = customerDB[i].id;
        let name = customerDB[i].name;
        let address = customerDB[i].address;
        let nic = customerDB[i].nic;
        let phoneNo = customerDB[i].phoneNo;

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

    let tableLong = Math.ceil(customerDB.length/4);

    let customerTblTag = $('#customer-tbl-long');
    customerTblTag[0].innerHTML = (no-1)+'/'+tableLong;

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

        for (let i = 0; i < customerDB.length; i++) {
            let name = customerDB[i].name;
            let arr = name.split(' ');

            for (let j = 0; j < arr.length; j++) {
                if(arr[j].toLowerCase()===inputText){
                    customer.push(customerDB[i]);
                    break;
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











loadCustomerTable();
generateNewCustomerId();