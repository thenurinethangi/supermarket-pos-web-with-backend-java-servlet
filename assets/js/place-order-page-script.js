// AOS.init({
//     duration: 800,
//     easing: 'ease-in-out',
//     once: true
// });
//
//
// document.addEventListener('DOMContentLoaded', function() {
//
//     const addItemBtn = document.getElementById('addItemBtn');
//     if (addItemBtn) {
//         addItemBtn.addEventListener('click', function() {
//             this.classList.add('slide-up');
//             setTimeout(() => {
//                 this.classList.remove('slide-up');
//             }, 500);
//         });
//     }
//
//
//     const deleteButtons = document.querySelectorAll('.delete-btn');
//     deleteButtons.forEach(btn => {
//         btn.addEventListener('click', function() {
//             const row = this.closest('tr');
//             row.style.transition = 'all 0.3s ease';
//             row.style.opacity = '0';
//             setTimeout(() => {
//                 row.style.display = 'none';
//             }, 300);
//         });
//     });
//
//
//     const placeOrderBtn = document.getElementById('placeOrderBtn');
//     if (placeOrderBtn) {
//         placeOrderBtn.addEventListener('click', function() {
//             this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
//             setTimeout(() => {
//                 this.innerHTML = '<i class="fas fa-check me-2"></i>Order Placed';
//                 this.classList.remove('btn-secondary');
//                 this.classList.add('btn-success');
//             }, 1500);
//         });
//     }
//
//
//     const dateField = document.getElementById('orderDate');
//     if (dateField) {
//         dateField.addEventListener('focus', function() {
//
//             const today = new Date();
//             const formattedDate = today.toLocaleDateString('en-US');
//             this.value = formattedDate;
//         });
//     }
//
//
//     const cashInput = document.getElementById('cash');
//     const balanceField = document.getElementById('balance');
//     const discountInput = document.getElementById('discount');
//
//     if (cashInput && balanceField) {
//         cashInput.addEventListener('input', calculateBalance);
//         if (discountInput) {
//             discountInput.addEventListener('input', calculateBalance);
//         }
//     }
//
//     function calculateBalance() {
//         const totalAmount = 1200.00;
//         const discount = parseFloat(discountInput.value) || 0;
//         const discountedAmount = totalAmount - (totalAmount * discount / 100);
//         const cash = parseFloat(cashInput.value) || 0;
//         const balance = cash - discountedAmount;
//
//         if (!isNaN(balance)) {
//             balanceField.value = balance.toFixed(2);
//         } else {
//             balanceField.value = "";
//         }
//     }
// });