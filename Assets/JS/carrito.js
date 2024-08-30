
var productosSeleccionados = localStorage.getItem('productos_general')
productosSeleccionados = JSON.parse(productosSeleccionados)
document.addEventListener("DOMContentLoaded", function () {
  
    var productosEnCarrito = [];


    function agregarProductosAlCarrito() {
        productosSeleccionados.forEach(idProducto => {
          
            fetch(`https://fakestoreapi.com/products/${idProducto}`)
                .then(res => res.json())
                .then(producto => {
                  
                    productosEnCarrito.push({
                        id: producto.id,
                        nombre: producto.title,
                        descripcion: producto.description,
                        precio: producto.price,
                        imagen: producto.image
                    });

                   
                    renderizarCarrito(document.getElementById("carritoSection"));

                    
            
                });
        });
    }

   
    function renderizarCarrito(carritoSection) {
      
        carritoSection.innerHTML = "";

      
        productosEnCarrito.forEach(function (producto) {
            var productDiv = document.createElement("div");
            productDiv.classList.add("product");

            productDiv.innerHTML = `
                <img src="${producto.imagen}" alt="Product Image">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                </div>
                <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
            `;

            carritoSection.appendChild(productDiv);
        });

    
        var totalDiv = document.createElement("div");
        totalDiv.classList.add("total");
        var totalPrecio = productosEnCarrito.reduce(function (total, producto) {
            return total + producto.precio;
        }, 0);
        totalDiv.innerHTML = `<p>Total: $${totalPrecio.toFixed(2)}</p>`;
        carritoSection.appendChild(totalDiv);

        // Agregar botón de realizar pago
        var realizarPagoButton = document.createElement("button");
        realizarPagoButton.textContent = "Realizar Pago";
        realizarPagoButton.addEventListener("click", realizarPago);
        carritoSection.appendChild(realizarPagoButton);
    }

   
    window.eliminarProducto = function (idProducto) {
        
        productosEnCarrito = productosEnCarrito.filter(function (producto) {
            return producto.id != idProducto;
        });
    

        productosSeleccionados = localStorage.getItem('productos_general');
        productosSeleccionados = JSON.parse(productosSeleccionados);
    
        var index = productosSeleccionados.findIndex(function (producto) {
            return producto == idProducto; 
        });
    
        if (index !== -1) {
            productosSeleccionados.splice(index, 1);
            console.log(productosSeleccionados);
        }
    
        
        localStorage.setItem('productos_general', JSON.stringify(productosSeleccionados));
    
        
        renderizarCarrito(document.getElementById("carritoSection"));
    };
    


  
    function realizarPago() {
        alert("Pago realizado con éxito. Gracias por tu compra.");
    }

   
    agregarProductosAlCarrito();
   


    renderizarCarrito(document.getElementById("carritoSection"));
});
