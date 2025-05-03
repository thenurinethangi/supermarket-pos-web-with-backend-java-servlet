import {customerDB,itemDB,orderDB} from "../db/db.js"

let customersCount = customerDB.length;
let itemsCount = itemDB.length;
let ordersCount = orderDB.length;

let boxOne = $('#box-one>.box-calculations');
boxOne[0].innerHTML = customersCount;

let boxTwo = $('#box-two>.box-calculations');
boxTwo[0].innerHTML = itemsCount;

let boxThree = $('#box-three>.box-calculations');
boxThree[0].innerHTML = ordersCount;