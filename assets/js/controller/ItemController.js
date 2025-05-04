import {customerDB,itemDB,orderDB} from "../db/db.js"
import ItemModel from "../model/ItemModel.js"


// load item table
function loadItemTable() {

    let itemTbl = $('#item-table-body');

    itemTbl.empty();

    for (let i = 0; i < itemDB.length; i++) {
        if(i===4){
            break;
        }

        let id = itemDB[i].id;
        let description = itemDB[i].description;
        let price = itemDB[i].price;
        let qty = itemDB[i].quntity;

        let data = `<tr class="tbl-row item-page-rows">
                          <td>${id}</td>
                          <td>${description}</td>
                          <td>${price}</td>
                          <td>${qty}</td>
                          <td>
                               <div class="tbl-action-icons">
                                    <button type="button" class="editCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropTwo">
                                        <i class="fas fa-edit item-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash item-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

        itemTbl.append(data);
    }

    let tableLong = Math.ceil(itemDB.length/4);

    let itemTblTag = $('#item-tbl-long');
    itemTblTag[0].innerHTML = '1/'+tableLong;
}



// generate new item id
function generateNewItemId() {

    let customerId = $('#item-id');

    let lastCustomerId = itemDB[itemDB.length-1].id;
    let numberPart = lastCustomerId.split("-")[1];
    numberPart = Number(numberPart)+1;
    let formattedNumber = String(numberPart).padStart(5, '0');
    let newId = lastCustomerId.split("-")[0]+'-' + formattedNumber;
    // console.log(newId);

    customerId.val(newId);
}



// item form clear btn js
let clearFormBtn = $('#item-form-clear')[0];

clearFormBtn.addEventListener('click',(event)=>{

    let inputFileds = $('#item-modal-body>input');

    inputFileds[1].value = '';
    inputFileds[2].value = '';
    inputFileds[3].value = '';

    generateNewItemId();

});



// add new item js
let addNewItemBtn = $('#item-form-add-btn')[0];

addNewItemBtn.addEventListener('click',(event)=>{

    let inputFileds = $('#item-modal-body>input');

    let itemId = inputFileds[0].value;
    let description = inputFileds[1].value;
    let price = inputFileds[2].value;
    let qty = inputFileds[3].value;

    if(itemId==='' || description==='' || price==='' || qty===''){

        Swal.fire({
            title: 'Error!',
            text: 'All fields required',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    const descriptionRegex = /^[A-Za-z ]+\s\d+(ml|g|kg|L)$/i;
    let descriptionValidation = descriptionRegex.test(description);

    const priceRegex = /^\d+\.\d{2}$/;
    let priceValidation = priceRegex.test(price);

    const qtyRegex = /^\d+$/;
    let qtyValidation = qtyRegex.test(qty);

    console.log(descriptionValidation);
    console.log(priceValidation);
    console.log(qtyValidation);

    if(!descriptionValidation || !priceValidation || !qtyValidation){

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    let newItem = new ItemModel(itemId,description,price,qty);
    itemDB.push(newItem);

    if(itemDB[itemDB.length-1].id===itemId){

        Swal.fire({
            title: 'Success!',
            text: 'Successfully Added A New Item',
            icon: 'success',
            confirmButtonText: 'Ok'
        })

        inputFileds[1].value = '';
        inputFileds[2].value = '';
        inputFileds[3].value = '';
        generateNewItemId();
        loadItemTable();
    }

});







loadItemTable();
generateNewItemId();