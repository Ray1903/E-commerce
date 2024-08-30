

var clave = 'productos_general';
var productosSeleccionados = [];
if(clave in localStorage==false){
    
    var arregloJSON = JSON.stringify(productosSeleccionados);
    localStorage.setItem('productos_general', arregloJSON);
}
else{
   
    productosSeleccionados = localStorage.getItem('productos_general');
    productosSeleccionados = JSON.parse(productosSeleccionados);
   
     var num_articulos = productosSeleccionados.length;
    
 
     const boton = document.getElementById("carrito");
     boton.textContent = `Carrito ${num_articulos}`;
}

function AgregarAlCarrito(idProducto) {
  
    productosSeleccionados = localStorage.getItem('productos_general');
    productosSeleccionados = JSON.parse(productosSeleccionados);

    if (!productosSeleccionados.includes(idProducto)) {
    
        productosSeleccionados.push(idProducto);
        console.log(`Producto con ID ${idProducto} añadido al carrito.`);

    
        var arregloJSON = JSON.stringify(productosSeleccionados);
        localStorage.setItem('productos_general', arregloJSON);
    
        productosSeleccionados = localStorage.getItem('productos_general');
        productosSeleccionados = JSON.parse(productosSeleccionados);
        var num_articulos = productosSeleccionados.length;
    
 
    const boton = document.getElementById("carrito");
    boton.textContent = `Carrito ${num_articulos}`;



    } else {
        console.log(`El producto con ID ${idProducto} ya está en el carrito.`);
    }

   
}
const apiCall = async () => {
    const APIResponse = await fetch('https://fakestoreapi.com/products');
    const products = await APIResponse.json();

    const productosElement = document.getElementById("productos");
    var contador = 0;
    const altura = productosElement.style.height;

    products.forEach(product => {
    if(product.category=="men's clothing")
        {
            const productContainer = document.createElement("div");
            productContainer.classList.add("producto");

            const imgElement = document.createElement("img");
            imgElement.src = product.image;
            imgElement.alt = product.title;
            imgElement.style.height = "18em";

            const h2Element = document.createElement("h2");
            h2Element.textContent = product.title;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = product.description;

         
            const maxDescriptionLength = 100;
            const shortDescription =
                product.description.length > maxDescriptionLength
                    ? product.description.substring(0, maxDescriptionLength) + "..."
                    : product.description;

            descriptionElement.textContent = shortDescription;

            const spanElement = document.createElement("span");
            spanElement.classList.add("precio");
            spanElement.textContent = `$${product.price.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
            })}`;

            const buttonElement = document.createElement("button");
            buttonElement.textContent = "Agregar al carrito";
            buttonElement.onclick = function () {
                AgregarAlCarrito(product.id);
            };

            productContainer.appendChild(imgElement);
            productContainer.appendChild(h2Element);
            productContainer.appendChild(descriptionElement);

           
            const verMasButton = document.createElement("button");
            verMasButton.textContent = "Ver más";
            const verMenosButton = document.createElement("button");
            verMenosButton.textContent = "Ver menos";

           
            const toggleDescription = () => {
                if (descriptionElement.textContent === shortDescription) {
                    descriptionElement.textContent = product.description;
                    productContainer.style.height = "auto";
                } else {
                    descriptionElement.textContent = shortDescription;
                    productContainer.style.height = altura; 
                }
            };

   
            verMasButton.addEventListener("click", toggleDescription);
            verMenosButton.addEventListener("click", toggleDescription);

          
            productContainer.appendChild(verMasButton);
            productContainer.appendChild(verMenosButton);

       
            verMenosButton.style.display = "none";
            productContainer.appendChild(spanElement);
            productContainer.appendChild(buttonElement);

            if (contador % 5 === 0) {
                const rowElement = document.createElement("div");
                rowElement.style.width = "100%"; 
                productosElement.appendChild(rowElement);
            }
            contador++;

            productosElement.appendChild(productContainer);}
    });
  
};

apiCall();
