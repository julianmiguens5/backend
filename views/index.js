//const e = require("express");

function render(data) {
    html = data.map(msg => `<tr>
                  <td>${msg.name}</td>
                  <td>${msg.price}</td>
                  <td>${msg.category}</td>
                  <td><img src='${msg.img}' alt='${msg.name}' class="imgTable"></td>
                  <td>${msg.stock}</td>
                  <td>${msg.description}</td>
                  </tr>`).join(" ");

document.getElementById('listado').innerHTML = html;

}


const socket = io.connect();

document.getElementById("enviar").addEventListener("click", function(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const img = document.getElementById('img').value;
    const stock = document.getElementById('stock').value;
    const description = document.getElementById('description').value;
    document.getElementById('name').value = '';
    socket.emit('new_msg', {name: name, price: price, category: category, img: img, stock: stock, description: description });
    return false;
  });

socket.on('products', data => {
    console.log(data);
    render(data);
});