// public/js/razorpay.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const amount = form.querySelector('input[name="amount"]').value;
  
      const response = await fetch('/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `amount=${amount}`,
      });
  
      const result = await response.json();
  
      const options = {
        key: razorpay_key_id,
        amount: result.order.amount,
        currency: result.order.currency,
        name: 'Your Company Name',
        description: 'Payment for Your Product/Service',
        order_id: result.order.id,
        handler: function (response) {
          alert('Payment Successful!');
          console.log(response);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '1234567890',
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const rzp = new Razorpay(options);
      rzp.open();
    });
  });
  