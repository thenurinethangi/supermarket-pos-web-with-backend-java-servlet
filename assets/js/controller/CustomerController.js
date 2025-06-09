
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


// load customer table
function loadCustomerTable() {

    let customerTbl = $('#customer-table-body');
    let customerTblRows = $('#customer-table-body>tr');

    customerTbl.empty();

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer',
        method: 'GET',
        success: function (r) {

            for (let i = 0; i < r.length; i++) {
                if(i===4){
                    break;
                }

                let id = r[i].id;
                let name = r[i].name;
                let address = r[i].address;
                let nic = r[i].nic;
                let phoneNo = r[i].phoneNo;

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

            let tableLong = Math.ceil(r.length/4);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = '1/'+tableLong;

            let customerSearchBar = $('#customer-search-bar')[0];
            customerSearchBar.value = '';
        },
        error: function () {
            console.log('somthing went wrong with loadin customer table');
        }

    });
}



// generate new customer id
function generateNewCustomerId() {

    let customerId = $('#customer-id');

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer?newid=true',
        method: 'GET',
        success: function (res) {
            console.log(res);
            customerId.val(res);
        },
        error: function (xhr) {
            customerId.val(xhr.responseText);
            console.log("something went wrong while generating a new id")
        }

    });

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

    let modal = $('#customer-modal-body');
    modal.children('p').remove();

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

    // console.log(nameValidation);
    // console.log(addressValidation);
    // console.log(nicValidation);
    // console.log(phoneNoValidation);

    if(!nameValidation || !addressValidation || !nicValidation || !phoneNoValidation){

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        });

        return;
    }

    let customer = {
        "id": customerId,
        "name": name,
        "address": address,
        "nic": nic,
        "phoneNo": phoneNo
    };

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: function (res) {

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

        },
        error: function () {

            Swal.fire({
                title: 'Fail!',
                text: 'Failed To Add A New Customer',
                icon: 'error',
                confirmButtonText: 'Ok'
            });

            inputFileds[1].value = '';
            inputFileds[2].value = '';
            inputFileds[3].value = '';
            inputFileds[4].value = '';
            generateNewCustomerId();
            loadCustomerTable();

            console.log("error while adding a new customer");

        }

    });

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

    $.ajax({
        url: `http://localhost:8080/BackEnd_Web_exploded/customer/${selectedCustomerIdTodelete}`,
        method: 'DELETE',
        success: function (res) {

            selectedCustomerIdTodelete = null;
            loadCustomerTable();

            Swal.fire({
                title: 'Deleted!',
                text: 'Successfully Deleted Customer ID: '+selectedCustomerIdTodelete,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        },
        error: function () {

            selectedCustomerIdTodelete = null;
            loadCustomerTable();

            Swal.fire({
                title: 'Fail!',
                text: 'Failed To Delete Customer ID: '+selectedCustomerIdTodelete,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.log("something went wrong with deleting a customer");
        }

    });

});



//customer edit icon
var selectedCustomerIdToEdit = null;

$(document).on('click', '.customer-edit-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow.children();
    let customerId = childrens[0].innerHTML;
    // console.log(customerId);
    selectedCustomerIdToEdit = customerId;

    $.ajax({
        url: `http://localhost:8080/BackEnd_Web_exploded/customer/${selectedCustomerIdToEdit}`,
        method: 'GET',
        success: function (res) {

            let selectedCustomer = res;
            let editCustomerFormInputFields = $('#update-customer-modal-body>input');

            if(selectedCustomer!=null) {
                editCustomerFormInputFields[0].value = selectedCustomer.id;
                editCustomerFormInputFields[1].value = selectedCustomer.name;
                editCustomerFormInputFields[2].value = selectedCustomer.address;
                editCustomerFormInputFields[3].value = selectedCustomer.nic;
                editCustomerFormInputFields[4].value = selectedCustomer.phoneNo;
            }
        },
        error: function () {
            console.log("somthing went wrong with when setting a customer to update")
        }

    });
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


    let customer = {
        "id": customerId,
        "name": name,
        "address": address,
        "nic": nic,
        "phoneNo": phoneNo
    };

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(customer),
        success: function (res) {
            loadCustomerTable();

            Swal.fire({
                title: 'Success!',
                text: 'Successfully Updated Customer ID: '+customerId,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        },
        error: function () {
            loadCustomerTable();

            Swal.fire({
                title: 'Error!',
                text: 'Failed To Update Customer ID: '+customerId,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.log("error coure while updating a customer");
        }

    });

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

    let customerArr = [];

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer',
        method: 'GET',
        success: function (r) {
            customerArr = r;

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            for (let i = x; i < y; i++) {
                if(i>=customerArr.length){
                    break;
                }

                let id = customerArr[i].id;
                let name = customerArr[i].name;
                let address = customerArr[i].address;
                let nic = customerArr[i].nic;
                let phoneNo = customerArr[i].phoneNo;

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

            let tableLong = Math.ceil(customerArr.length/4);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = (no+1)+'/'+tableLong;
        },
        error: function () {
            console.log("something went wrong with loading all customer data");
        }
    });

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

    let customerArr = [];

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer',
        method: 'GET',
        success: function (res) {

            customerArr = res;

            let customerTbl = $('#customer-table-body');
            customerTbl.empty();

            for (let i = y; i < x; i++) {

                let id = customerArr[i].id;
                let name = customerArr[i].name;
                let address = customerArr[i].address;
                let nic = customerArr[i].nic;
                let phoneNo = customerArr[i].phoneNo;

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

            let tableLong = Math.ceil(customerArr.length/4);

            let customerTblTag = $('#customer-tbl-long');
            customerTblTag[0].innerHTML = (no-1)+'/'+tableLong;
        },
        error: function () {
            console.log("something wrong with loading all customer data");
        }
    });

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

    let customerArr = [];

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/customer',
        method: 'GET',
        success: function (res) {
            customerArr = res;

            if(customerIdValidation){

                // console.log('customer id validate');

                let customer = null;

                for (let i = 0; i < customerArr.length; i++) {
                    let id = customerArr[i].id;
                    id = id.toLowerCase();

                    if(id===inputText){
                        customer = customerArr[i];
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

                    for (let i = 0; i < customerArr.length; i++) {
                        let name = customerArr[i].name;

                        if(name.toLowerCase()===inputText){
                            customer.push(customerArr[i]);
                        }
                    }
                }
                else if(inputText.split(' ').length===1){
                    for (let i = 0; i < customerArr.length; i++) {
                        let name = customerArr[i].name;
                        let arr = name.split(' ');

                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j].toLowerCase() === inputText) {
                                customer.push(customerArr[i]);
                                break;
                            }
                        }
                    }
                }

                if(customer.length!=0) {

                    let customerTbl = $('#customer-table-body');
                    customerTbl.empty();

                    for (let i = 0; i < customer.length; i++) {

                        // if(i>=4){
                        //     break;
                        // }
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

                    // let tableLong = Math.ceil(customer.length/4);

                    let customerTblTag = $('#customer-tbl-long');
                    customerTblTag[0].innerHTML = 1+'/'+1;
                    return;
                }

            }
            if(addressValidation){

                // console.log('address validate');

                let customer = [];

                for (let i = 0; i < customerArr.length; i++) {
                    let address = customerArr[i].address;

                    if(address.toLowerCase()===inputText){
                        customer.push(customerArr[i]);
                    }
                }

                if(customer.length!=0) {

                    let customerTbl = $('#customer-table-body');
                    customerTbl.empty();

                    for (let i = 0; i < customer.length; i++) {

                        // if(i>=4){
                        //     break;
                        // }
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

                    // let tableLong = Math.ceil(customer.length/4);

                    let customerTblTag = $('#customer-tbl-long');
                    customerTblTag[0].innerHTML = 1+'/'+1;
                    return;
                }
            }
            if(nicValidation){

                // console.log('nic validate');

                let customer = null;

                for (let i = 0; i < customerArr.length; i++) {
                    let nic = customerArr[i].nic;

                    if(nic===inputText){
                        customer = customerArr[i];
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

                for (let i = 0; i < customerArr.length; i++) {
                    let phoneNo = customerArr[i].phoneNo;

                    if(phoneNo===inputText){
                        customer = customerArr[i];
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

        },
        error: function () {
            console.log("something went wrong with loading all customer data");
        }
    });

});



//input field validations
//customer-name validation
let customerNameField = $('.customer-name');
customerNameField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const nameRegex = /^(([A-Z]\.)+\s)?([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
    let nameValidation = nameRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid name input for this field'
    p.className = 'warning-text customer-name-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!nameValidation){
        customerNameField.next('.customer-name-warning-text').remove();
        customerNameField.after(p);
    }
    else{
        customerNameField.next('.customer-name-warning-text').remove();
    }

    if(input==''){
        customerNameField.next('.customer-name-warning-text').remove();
    }
});



//customer-address validation
let customerAddressField = $('.customer-address');
customerAddressField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const addressRegex = /^[A-Za-z0-9\s,\/\-]{5,}$/;
    let addressValidation = addressRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid address input for this field'
    p.className = 'warning-text customer-address-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!addressValidation){
        customerAddressField.next('.customer-address-warning-text').remove();
        customerAddressField.after(p);
    }
    else{
        customerAddressField.next('.customer-address-warning-text').remove();
    }

    if(input==''){
        customerAddressField.next('.customer-address-warning-text').remove();
    }
});



//customer-nic validation
let customerNicField = $('.customer-nic');
customerNicField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    let nicValidation = nicRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid nic input for this field'
    p.className = 'warning-text customer-nic-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!nicValidation){
        customerNicField.next('.customer-nic-warning-text').remove();
        customerNicField.after(p);
    }
    else{
        customerNicField.next('.customer-nic-warning-text').remove();
    }

    if(input==''){
        customerNicField.next('.customer-nic-warning-text').remove();
    }
});



//customer-phone-no validation
let customerPhoneNoField = $('.customer-phone-no');
customerPhoneNoField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const phoneRegex = /^(?:0|\+94)(7[01245678])\d{7}$/;
    let phoneNoValidation = phoneRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid phone no input for this field'
    p.className = 'warning-text customer-phone-no-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!phoneNoValidation){
        customerPhoneNoField.next('.customer-phone-no-warning-text').remove();
        customerPhoneNoField.after(p);
    }
    else{
        customerPhoneNoField.next('.customer-phone-no-warning-text').remove();
    }

    if(input==''){
        customerPhoneNoField.next('.customer-phone-no-warning-text').remove();
    }
});



//add new customer modal close icon action
let modalCloseBtn = $('#add-customer-modal-close');
modalCloseBtn.on('click',()=>{

    let inputFileds = $('#customer-modal-body>input');

    inputFileds[1].value = '';
    inputFileds[2].value = '';
    inputFileds[3].value = '';
    inputFileds[4].value = '';

    let modal = $('#customer-modal-body');
    modal.children('p').remove();

    let editModal = $('#update-customer-modal-body');
    editModal.children('p').remove();

    generateNewCustomerId();

});



//edit customer icon and btn action
let editModalColse = $('.customer-edit-modal-close');
editModalColse.on('click',()=>{

    let modal = $('#customer-modal-body');
    modal.children('p').remove();

    let editModal = $('#update-customer-modal-body');
    editModal.children('p').remove();

});


loadCustomerTable();
generateNewCustomerId();