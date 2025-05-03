class ItemModel{

    constructor(orderId,customerId,date,itemCount,total,itemList) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.date = date;
        this.itemCount = itemCount;
        this.total = total;
        this.itemList = itemList;
    }
}

export default ItemModel;