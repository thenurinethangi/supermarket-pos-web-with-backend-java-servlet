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
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

        customerTbl.append(data);
    }

    let tableLong = Math.round(customerDB.length/4);

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

    const nameRegex = /^[A-Za-z\s]{2,}$/;
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
            text: 'Successfully Added A New Customer.',
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

});



// delete customer

let deletCustomerBtn = $('#delete-customer-btn')[0];
deletCustomerBtn.addEventListener('click',()=>{

    let customerId = $('#customer-id');

    let lastCustomerId = customerDB[customerDB.length-1].id;
    let numberPart = lastCustomerId.split("-")[1];
    numberPart = Number(numberPart)+1;
    let formattedNumber = String(numberPart).padStart(6, '0');
    let newId = lastCustomerId.split("-")[0]+'-' + formattedNumber;
    // console.log(newId);

    customerId.val(newId);
});







loadCustomerTable();
generateNewCustomerId();