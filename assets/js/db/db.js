import CustomerModel from "../model/CustomerModel.js"
import ItemModel from "../model/ItemModel.js"
import OrderModel from "../model/OrderModel.js"

export let customerDB = [];
customerDB.push(new CustomerModel('C-000001','Jungkook','Busan','199512345678','0714235678'));
customerDB.push(new CustomerModel('C-000002','Taehuyng','Daegu','199512345670','0714235678'));
customerDB.push(new CustomerModel('C-000003','Kim Namjoon','Seoul','199512345679','0714235678'));
customerDB.push(new CustomerModel('C-000004','kim Seaok Jin','South Korea','199512345676','0714235678'));
customerDB.push(new CustomerModel('C-000005','J hope','South Korea','199512345699','0714235678'));
customerDB.push(new CustomerModel('C-000006','Jimin','Busan','199512345622','0714235678'));
customerDB.push(new CustomerModel('C-000007','Min Yoongi','Daegu','199512345611','0714235678'));
customerDB.push(new CustomerModel('C-000008','Thenuri','Matara','199512345633','0714235678'));
customerDB.push(new CustomerModel('C-000009','Bangtan Sedoyan','South Korea','199512345677','0714235678'));
customerDB.push(new CustomerModel('C-000010','W.N. Nethangi','Colombo','200212345678','0714235678'));
customerDB.push(new CustomerModel('C-000011','Jung Hoseok','South Korea','200212345600','0714235678'));
customerDB.push(new CustomerModel('C-000012','Saman Perera','Galle','200012345678','0714235678'));

export let itemDB = [];
itemDB.push(new ItemModel('I-00001','Dove Shampoo 250ml','470.00','120'));
itemDB.push(new ItemModel('I-00002','Anchor 1kg Milk Powder','2200.00','200'));
itemDB.push(new ItemModel('I-00003','Penut Butter 100g','950.00','60'));
itemDB.push(new ItemModel('I-00004','Coca cola 150ml','170.00','350'));
itemDB.push(new ItemModel('I-00005','Popit 100g','420.00','80'));

export let orderDB = [];
let arr1 = ['I-00001','I-00002'];
orderDB.push(new OrderModel('ORD-000001','C-000001','2025-05-02','2','2700.00',arr1));

let arr2 = ['I-00001','I-00003];
orderDB.push(new OrderModel('ORD-000002','C-000002','2025-05-02','2','4000.00',arr2));

let arr3 = ['I-00002','I-00003'];
orderDB.push(new OrderModel('ORD-000003','C-000005','2025-05-03','2','3900.00',arr3));

let arr4 = ['I-00004','I-00005'];
orderDB.push(new OrderModel('ORD-000004','C-000007','2025-05-03','2','1300.00',arr4));

let arr5 = ['I-00001','I-00002'];
orderDB.push(new OrderModel('ORD-000005','C-000003','2025-05-03','2','5000.00',arr5));






