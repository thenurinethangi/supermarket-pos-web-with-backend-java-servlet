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

    let itemSearchBar = $('#item-search-bar')[0];
    itemSearchBar.value = '';
}



// generate new item id
function generateNewItemId() {

    let itemId = $('#item-id');

    if(itemDB.length<=0){
        itemId.val('I-00001');
        return;
    }
    
    let lastCustomerId = itemDB[itemDB.length-1].id;
    let numberPart = lastCustomerId.split("-")[1];
    numberPart = Number(numberPart)+1;
    let formattedNumber = String(numberPart).padStart(5, '0');
    let newId = lastCustomerId.split("-")[0]+'-' + formattedNumber;
    // console.log(newId);

    itemId.val(newId);
}



// item form clear btn js
let clearFormBtn = $('#item-form-clear')[0];

clearFormBtn.addEventListener('click',(event)=>{

    let inputFileds = $('#item-modal-body>input');

    inputFileds[1].value = '';
    inputFileds[2].value = '';
    inputFileds[3].value = '';

    generateNewItemId();

    let modal = $('#item-modal-body');
    modal.children('p').remove();

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

    const descriptionRegex = /^[A-Za-z ]+( \d+(\.\d+)?(ml|g|kg|L))?( [A-Za-z ]+)?$/i;
    let descriptionValidation = descriptionRegex.test(description);

    const priceRegex = /^\d+\.\d{2}$/;
    let priceValidation = priceRegex.test(price);

    const qtyRegex = /^\d+$/;
    let qtyValidation = qtyRegex.test(qty);

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
    else{

        Swal.fire({
            title: 'Fail!',
            text: 'Failed To Add A New Item',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        inputFileds[1].value = '';
        inputFileds[2].value = '';
        inputFileds[3].value = '';
        generateNewItemId();
        loadItemTable();
    }

});



//item delete icon
var selectedItemIdTodelete = null;

$(document).on('click', '.item-delete-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    let itemId = childrens[1].innerHTML;
    selectedItemIdTodelete = itemId;
});


// cancel delete item button
let cancelDeleteItemBtn = $('#cancel-item-delete')[0];
cancelDeleteItemBtn.addEventListener('click',()=>{

    selectedItemIdTodelete = null;
});



// delete item
let deleteItemBtn = $('#delete-item-btn')[0];
deleteItemBtn.addEventListener('click',()=>{

    if(selectedItemIdTodelete===null){
        Swal.fire({
            title: 'Fail!',
            text: 'Failed To Delete Selected Item',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }

    let bool = false;
    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;

        if(id===selectedItemIdTodelete){
            bool = true;
            itemDB.splice(i, 1);
            Swal.fire({
                title: 'Deleted!',
                text: 'Successfully Deleted Item ID: '+selectedItemIdTodelete,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            break;
        }
    }

    if(bool===false){
        Swal.fire({
            title: 'Fail!',
            text: 'Failed To Delete Item ID: '+selectedItemIdTodelete,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    // console.log(itemDB);
    selectedItemIdTodelete = null;
    loadItemTable();

});



//item edit icon
var selectedItemIdToEdit = null;

$(document).on('click', '.item-edit-icon', function () {

    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;
    let itemId = childrens[1].innerHTML;
    selectedItemIdToEdit = itemId;
    let selectedItem = null;

    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;

        if(id===selectedItemIdToEdit){
            selectedItem = itemDB[i];
            break;
        }
    }

    let editItemFormInputFields = $('#update-item-modal-body>input');

    if(selectedItem!=null) {
        editItemFormInputFields[0].value = selectedItem.id;
        editItemFormInputFields[1].value = selectedItem.description;
        editItemFormInputFields[2].value = selectedItem.price;
        editItemFormInputFields[3].value = selectedItem.quntity;
    }
});



// edit item
let updateItemBtn = $('#item-edit-btn')[0];
updateItemBtn.addEventListener('click',()=>{

    let inputFileds = $('#update-item-modal-body>input');

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

    const descriptionRegex = /^[A-Za-z ]*\d+(ml|g|kg|L)[A-Za-z ]*$/i;
    let descriptionValidation = descriptionRegex.test(description);

    const priceRegex = /^\d+\.\d{2}$/;
    let priceValidation = priceRegex.test(price);

    const qtyRegex = /^\d+$/;
    let qtyValidation = qtyRegex.test(qty);

    if(!descriptionValidation || !priceValidation || !qtyValidation){

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

        return;
    }

    let selectedItem = null;

    for (let i = 0; i < itemDB.length; i++) {
        let id = itemDB[i].id;

        if(id===itemId){
            selectedItem = itemDB[i];
            break;
        }
    }

    if(selectedItem!=null){

        selectedItem.description = description;
        selectedItem.price = price;
        selectedItem.quntity = qty;

        Swal.fire({
            title: 'Success!',
            text: 'Successfully Updated Item ID: '+itemId,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
    else{

        Swal.fire({
            title: 'Error!',
            text: 'Failed To Update Item ID: '+itemId,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }

    // console.log(selectedCustomer);
    // console.log(customerDB);
    loadItemTable();

});



//load more table data right
let rightIcon = $('#load-more-item-tbl-data-right-icon')[0];
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

    let itemTbl = $('#item-table-body');
    itemTbl.empty();

    for (let i = x; i < y; i++) {
        if(i>=itemDB.length){
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
    itemTblTag[0].innerHTML = (no+1)+'/'+tableLong;

});



//load more table data left
let leftIcon = $('#load-more-item-tbl-data-left-icon')[0];
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

    let itemTbl = $('#item-table-body');
    itemTbl.empty();

    for (let i = y; i < x; i++) {

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
    itemTblTag[0].innerHTML = (no-1)+'/'+tableLong;

});



//item search
let itemSearchBar = $('#item-search-bar')[0];

itemSearchBar.addEventListener('keydown',(event)=> {

    let text = itemSearchBar.value.length;
    if((text===1 && event.key == 'Backspace') || (text>0 && event.key == 'Delete')){
        loadItemTable();
    }

    if (event.key !== 'Enter') {
        return;
    }

    let inputText = itemSearchBar.value;
    inputText = inputText.toLowerCase();
    // console.log(inputText);

    const idRegex = /^[iI]-\d{5}$/;
    let itemIdValidation = idRegex.test(inputText);

    const descriptionRegex = /^[A-Za-z ]+( \d+(\.\d+)?(ml|g|kg|L))?( [A-Za-z ]+)?$/i;
    let descriptionValidation = descriptionRegex.test(inputText);

    const priceRegex = /^\d+\.\d{2}$/;
    let priceValidation = priceRegex.test(inputText);

    const qtyRegex = /^\d+$/;
    let qtyValidation = qtyRegex.test(inputText);

    if(!itemIdValidation && !descriptionValidation && !priceValidation && !qtyValidation){
        return;
    }

    if(itemIdValidation){

        // console.log('item id validate');

        let item = null;

        for (let i = 0; i < itemDB.length; i++) {
            let id = itemDB[i].id;
            id = id.toLowerCase();

            if(id===inputText){
                item = itemDB[i];
                break;
            }
        }

        if(item!==null) {

            let itemTbl = $('#item-table-body');
            itemTbl.empty();

            let id = item.id;
            let description = item.description;
            let price = item.price;
            let qty = item.quntity;

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

            let itemTblTag = $('#item-tbl-long');
            itemTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(descriptionValidation){

        // console.log("description valid");

        let item = [];

        for (let i = 0; i < itemDB.length; i++) {
            let description = itemDB[i].description;

            if(description.toLowerCase().includes(inputText)){
                // console.log('contain');
                item.push(itemDB[i]);
            }

        }

        if(item.length!=0) {

            let itemTbl = $('#item-table-body');
            itemTbl.empty();

            for (let i = 0; i < item.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let id = item[i].id;
                let description = item[i].description;
                let price = item[i].price;
                let qty = item[i].quntity;

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

            // let tableLong = Math.ceil(item.length/4);

            let itemTblTag = $('#item-tbl-long');
            itemTblTag[0].innerHTML = 1+'/'+1;
            return;
        }

    }
    if(priceValidation){

        // console.log('price validate');

        let item = [];

        for (let i = 0; i < itemDB.length; i++) {
            let price = itemDB[i].price;

            if(price.toLowerCase()===inputText){
                item.push(itemDB[i]);
            }
        }

        if(item.length!=0) {

            let itemTbl = $('#item-table-body');
            itemTbl.empty();

            for (let i = 0; i < item.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let id = item[i].id;
                let description = item[i].description;
                let price = item[i].price;
                let qty = item[i].quntity;

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

            // let tableLong = Math.ceil(item.length/4);

            let itemTblTag = $('#item-tbl-long');
            itemTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    if(qtyValidation){

        // console.log('qty validate');

        let item = [];

        for (let i = 0; i < itemDB.length; i++) {
            let qty = itemDB[i].quntity;

            if(qty===inputText){
                item.push(itemDB[i]);
            }
        }

        if(item.length!=0) {

            let itemTbl = $('#item-table-body');
            itemTbl.empty();

            for (let i = 0; i < item.length; i++) {

                // if(i>=4){
                //     break;
                // }
                let id = item[i].id;
                let description = item[i].description;
                let price = item[i].price;
                let qty = item[i].quntity;

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

            // let tableLong = Math.ceil(item.length/4);

            let itemTblTag = $('#item-tbl-long');
            itemTblTag[0].innerHTML = 1+'/'+1;
            return;
        }
    }
    else{

        loadItemTable();
    }


});



//input field validations
//item-name validation
let itemNameField = $('.description');
itemNameField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const descriptionRegex = /^[A-Za-z ]+( \d+(\.\d+)?(ml|g|kg|L))?( [A-Za-z ]+)?$/i;
    let descriptionValidation = descriptionRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid description input for this field'
    p.className = 'warning-text item-name-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!descriptionValidation){
        itemNameField.next('.item-name-warning-text').remove();
        itemNameField.after(p);
    }
    else{
        itemNameField.next('.item-name-warning-text').remove();
    }

    if(input==''){
        itemNameField.next('.item-name-warning-text').remove();
    }
});



//item-price validation
let itemPriceField = $('.price');
itemPriceField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const priceRegex = /^\d+\.\d{2}$/;
    let priceValidation = priceRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid price input for this field'
    p.className = 'warning-text item-price-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!priceValidation){
        itemPriceField.next('.item-price-warning-text').remove();
        itemPriceField.after(p);
    }
    else{
        itemPriceField.next('.item-price-warning-text').remove();
    }

    if(input==''){
        itemPriceField.next('.item-price-warning-text').remove();
    }
});



//item-qty validation
let itemQtyField = $('.item-qty');
itemQtyField.on('keyup',function (){

    let input = this.value;
    input = input.trim();

    const qtyRegex = /^\d+$/;
    let qtyValidation = qtyRegex.test(input);

    let p = document.createElement('p');
    p.textContent = 'invalid quantity input for this field'
    p.className = 'warning-text item-qty-warning-text';
    p.style.fontSize = '11px';
    p.style.color = 'red';
    p.style.padding = '0px';
    p.style.margin = '0px';

    if(!qtyValidation){
        itemQtyField.next('.item-qty-warning-text').remove();
        itemQtyField.after(p);
    }
    else{
        itemQtyField.next('.item-qty-warning-text').remove();
    }

    if(input==''){
        itemQtyField.next('.item-qty-warning-text').remove();
    }
});



//add new item modal close icon action
let itemModalCloseBtn = $('#add-item-modal-close');
itemModalCloseBtn.on('click',()=>{

    let inputFileds = $('#item-modal-body>input');

    inputFileds[1].value = '';
    inputFileds[2].value = '';
    inputFileds[3].value = '';

    let modal = $('#item-modal-body');
    modal.children('p').remove();

    let editModal = $('#update-item-modal-body');
    editModal.children('p').remove();

});



//edit customer icon and btn action
let itemEditModalColse = $('.item-edit-modal-close');
itemEditModalColse.on('click',()=>{

    let modal = $('#item-modal-body');
    modal.children('p').remove();

    let editModal = $('#update-item-modal-body');
    editModal.children('p').remove();

});



loadItemTable();
generateNewItemId();