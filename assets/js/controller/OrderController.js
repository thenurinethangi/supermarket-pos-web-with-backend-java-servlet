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
                                        <i class="fas fa-edit customer-edit-icon"></i>
                                    </button>
                                    <button type="button" class="deleteCustomerBtn" data-bs-toggle="modal" data-bs-target="#staticBackdropThree">
                                        <i class="fas fa-trash customer-delete-icon"></i>
                                    </button>
                               </div>
                        </td>
                    </tr>`

        orderTbl.append(data);
    }

    let tableLong = Math.ceil(customerDB.length/4);

    let customerTblTag = $('#customer-tbl-long');
    customerTblTag[0].innerHTML = '1/'+tableLong;
}





loadOrderTable();