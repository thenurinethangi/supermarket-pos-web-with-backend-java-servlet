
// load order table
function loadOrderTable() {

    let orderTbl = $('#order-table-body');

    orderTbl.empty();

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
        method: 'GET',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                if(i===4){
                    break;
                }

                let orderId = res[i].id;
                let customerId = res[i].customer.id;
                let date = res[i].date;
                let itemCount = res[i].itemCount;
                let total = res[i].total;

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

            let tableLong = Math.ceil(res.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = '1/'+tableLong;

            let orderSearchBar = $('#order-search-bar')[0];
            orderSearchBar.value = '';
        },
        error: function () {
            console.log("an error ocure while loading order table");
        }
    });
}



//view order deatils icon
$(document).on('click', '.view-order-icon', function () {
    let parentRow = $(this).closest('tr');
    let childrens = parentRow[0].childNodes;

    let orderDetail = "Order ID:  " + childrens[1].innerHTML + "\n" +
        "Customer ID:  " + childrens[3].innerHTML + "\n" +
        "Date:  " + childrens[5].innerHTML + "\n" +
        "Item Count:  " + childrens[7].innerHTML + "\n" +
        "Total:  Rs " + childrens[9].innerHTML;

    let orderDetailsTextArea = $('#order-details')[0];
    orderDetailsTextArea.value = orderDetail;

    $.ajax({
       url: `http://localhost:8080/BackEnd_Web_exploded/orders/${childrens[1].innerHTML}`,
        method: 'GET',
        success: function (res) {
            let order = res;

            let itemDetails = "";
            if (order != null) {
                $.ajax({
                    url: `http://localhost:8080/BackEnd_Web_exploded/orders?orderdetails=true&id=${order.id}`,
                    method: 'GET',
                    success: function (res) {
                        for (let i = 0; i < res.length; i++) {
                            let item = res[i];
                            itemDetails += "Item #" + (i + 1) + ":\n";
                            itemDetails += "  ID: " + item.id + "\n";
                            itemDetails += "  Description: " + item.description + "\n";
                            itemDetails += "  Price: Rs " + item.price + "\n\n";
                        }

                        let itemDetailsTextArea = $('#itemDetails')[0];
                        itemDetailsTextArea.value = itemDetails.trim();

                        $('#staticBackdropOrder').modal('show');
                    },
                    error: function () {

                    }
                });
            }
        },
        error: function () {
            console.log("an error ocure while getting order details-order");
        }

    });
});



// Print button click handler
$(document).on('click', '#print-order-details', function() {

    const originalBackdrop = $('#staticBackdropOrder').data('bs-backdrop');
    $('#staticBackdropOrder').data('bs-backdrop', 'static');

    $('.modal-backdrop').addClass('d-none');

    window.print();

    $('.modal-backdrop').removeClass('d-none');

    $('#staticBackdropOrder').data('bs-backdrop', originalBackdrop);
});



// Adjust textarea height based on content
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}


// Adjust textarea heights when modal is shown
$('#staticBackdropOrder').on('shown.bs.modal', function () {
    adjustTextareaHeight(document.getElementById('order-details'));
    adjustTextareaHeight(document.getElementById('itemDetails'));
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

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
        method: 'GET',
        success: function (res) {
            for (let i = x; i < y; i++) {
                if(i>=res.length){
                    break;
                }

                let orderId = res[i].id;
                let customerId = res[i].customer.id;
                let date = res[i].date;
                let itemCount = res[i].itemCount;
                let total = res[i].total;

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

            let tableLong = Math.ceil(res.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = (no+1)+'/'+tableLong;
        },
        error: function () {
            console.log("an error ocure while loading all orders");
        }

    });
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

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
        method: 'GET',
        success: function (res) {
            for (let i = y; i < x; i++) {

                let orderId = res[i].id;
                let customerId = res[i].customer.id;
                let date = res[i].date;
                let itemCount = res[i].itemCount;
                let total = res[i].total;

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

            let tableLong = Math.ceil(res.length/4);

            let orderTblTag = $('#order-tbl-long');
            orderTblTag[0].innerHTML = (no-1)+'/'+tableLong;
        },
        error: function () {
            console.log("an error ocure while loading all orders");
        }
    });
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

    const totalRegex = /^\d+(\.\d{1,2})?$/;
    let totalValidation = totalRegex.test(inputText);

    if(!orderIdValidation && !customerIdValidation && !dateValidation && !qtyValidation && !totalValidation){
        loadOrderTable();
        return;
    }

    if(orderIdValidation){

        console.log('order id validate');

        let order = null;

        $.ajax({
            url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
            method: 'GET',
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    let id = res[i].id;
                    id = id.toLowerCase();

                    if(id===inputText){
                        order = res[i];
                        break;
                    }
                }

                if(order!==null) {

                    let orderTbl = $('#order-table-body');
                    orderTbl.empty();

                    let orderId = order.id;
                    let customerId = order.customer.id;
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
            },
            error: function () {
                console.log("an error ocure while loading all orders");
            }

        });
    }
    if(customerIdValidation){

        console.log("customer id valid");

        let order = [];

        $.ajax({
            url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
            method: 'GET',
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    let customerId = res[i].customer.id;

                    if (customerId.toLowerCase() == inputText) {
                        order.push(res[i]);
                    }
                }

                if(order.length!=0) {

                    let orderTbl = $('#order-table-body');
                    orderTbl.empty();

                    for (let i = 0; i < order.length; i++) {

                        let orderId = order[i].id;
                        let customerId = order[i].customer.id;
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
            },
            error: function () {
                console.log("an error ocure while loading all orders");
            }
        });
    }
    if(dateValidation){

        console.log('date validate');

        let order = [];

        $.ajax({
            url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
            method: 'GET',
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    let date = res[i].date;

                    if(date==inputText){
                        order.push(res[i]);
                    }
                }

                if(order.length!=0) {

                    let orderTbl = $('#order-table-body');
                    orderTbl.empty();

                    for (let i = 0; i < order.length; i++) {

                        let orderId = order[i].id;
                        let customerId = order[i].customer.id;
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
            },
            error: function () {
                console.log("an error ocure while loading all orders");
            }
        });
    }
    if(qtyValidation){

        console.log('qty validate');

        let order = [];

        $.ajax({
            url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
            method: 'GET',
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    let qty = res[i].itemCount;

                    if(qty==inputText){
                        order.push(res[i]);
                    }
                }

                if(order.length!=0) {

                    let orderTbl = $('#order-table-body');
                    orderTbl.empty();

                    for (let i = 0; i < order.length; i++) {

                        // if(i>=4){
                        //     break;
                        // }
                        let orderId = order[i].id;
                        let customerId = order[i].customer.id;
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
            },
            error: function () {
                console.log("an error ocure while loading all orders");
            }
        });
    }
    if(totalValidation){

        console.log('total validate');

        let order = [];

        $.ajax({
            url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
            method: 'GET',
            success: function (res) {
                for (let i = 0; i < res.length; i++) {
                    let total = res[i].total;

                    if(total==inputText){
                        order.push(res[i]);
                    }
                }

                if(order.length!=0) {

                    let orderTbl = $('#order-table-body');
                    orderTbl.empty();

                    for (let i = 0; i < order.length; i++) {

                        // if(i>=4){
                        //     break;
                        // }
                        let orderId = order[i].id;
                        let customerId = order[i].customer.id;
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
            },
            error: function () {
                console.log("an error ocure while loading all orders");
            }
        });
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

    $.ajax({
        url: 'http://localhost:8080/BackEnd_Web_exploded/orders',
        method: 'GET',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                let date = res[i].date;

                if(date==selectedDate){
                    order.push(res[i]);
                }
            }

            if(order.length!=0) {

                let orderTbl = $('#order-table-body');
                orderTbl.empty();

                for (let i = 0; i < order.length; i++) {

                    let orderId = order[i].id;
                    let customerId = order[i].customer.id;
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
        },
        error: function () {
            console.log("an error ocure while loading all orders");
        }

    });

});




loadOrderTable();