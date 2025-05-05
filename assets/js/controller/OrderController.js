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






loadOrderTable();