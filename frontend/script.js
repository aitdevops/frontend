document.addEventListener('DOMContentLoaded', function() {
    const productServiceIp = '';
    const orderServiceIp = '';
    const userServiceIp = '';

    document.getElementById('fetch-products').addEventListener('click', function() {
        fetch(`http://${productServiceIp}:5001/products`)
            .then(response => response.json())
            .then(data => {
                const productsDiv = document.getElementById('products');
                productsDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                const productsDiv = document.getElementById('products');
                productsDiv.innerHTML = 'Error fetching products. Service might be down.';
            });
    });

    document.getElementById('fetch-orders').addEventListener('click', function() {
        fetch(`http://${orderServiceIp}:5002/orders`)
            .then(response => response.json())
            .then(data => {
                const ordersDiv = document.getElementById('orders');
                ordersDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
                const ordersDiv = document.getElementById('orders');
                ordersDiv.innerHTML = 'Error fetching orders. Service might be down.';
            });
    });

    document.getElementById('fetch-users').addEventListener('click', function() {
        fetch(`http://${userServiceIp}:5003/users`)
            .then(response => response.json())
            .then(data => {
                const usersDiv = document.getElementById('users');
                usersDiv.innerHTML = JSON.stringify(data, null, 2);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                const usersDiv = document.getElementById('users');
                usersDiv.innerHTML = 'Error fetching users. Service might be down.';
            });
    });
});
