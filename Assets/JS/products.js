

const productosElement = document.getElementById("glider");

fetch('Assets/docs/products.json')
    .then(response => response.json())
    .then(products => {
        const glider = new Glider(document.querySelector('.glider'), {
            slidesToShow: 3,
            slidesToScroll: 1,

            arrows: {
                prev: '.glider-prev',
                next: '.glider-next'
            }
        });
        const cont=0
        products.forEach(product => {
            const productContainer = document.createElement("div");
            productContainer.classList.add("producto");

            const imgElement = document.createElement("img");
            imgElement.src = product.img;
            imgElement.alt = product.product;

            const h2Element = document.createElement("h2");
            h2Element.textContent = product.product;

            const pElement = document.createElement("p");
            pElement.textContent = product.descripcion;

            const spanElement = document.createElement("span");
            spanElement.classList.add("precio");
            spanElement.textContent = `$${product.precio.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })}`;

            const buttonElement = document.createElement("button");
            buttonElement.textContent = "Agregar al carrito";

            productContainer.appendChild(imgElement);
            productContainer.appendChild(h2Element);
            productContainer.appendChild(pElement);
            productContainer.appendChild(spanElement);
            productContainer.appendChild(buttonElement);

          
            glider.addItem(productContainer);
        });
    })
    .catch(error => console.error('Error al cargar el archivo:', error));
