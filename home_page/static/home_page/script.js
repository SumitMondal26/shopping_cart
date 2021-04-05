window.addEventListener(
	"DOMContentLoaded",
	function () {
		const addCartBtn = document.querySelectorAll(".add-button");
		const cartList = document.getElementById("cart-list");
		const productsElement = document.querySelectorAll(".product");
		const suggestedProductsWindow = document.querySelector(".side-products");
		const cartWindow = document.getElementById("cart");
		cartWindow.style.display = "none";

		let productsToBeAdded = {};
		let numberOfProducts = 0;
		let totalPrice = 0;
		let lastProductTag = 0;
		let allProducts = [];
		let suggestedProducts = [];

		class Products {
			constructor(product_id, product_name, product_img, product_price, product_tag) {
				this.product_id = product_id;
				this.product_name = product_name;
				this.product_img = product_img;
				this.product_price = product_price;
				this.product_tag = product_tag;
			}
		}

		for (let i = 0; i < productsElement.length; i++) {
			const element = productsElement[i];
			product_id = element.id;
			product_name = element.querySelector(".product-name").textContent;
			product_price = element.querySelector(".product-price").textContent;
			product_tag = element.querySelector(".add-button").id;
			product_img = element.querySelector(".product-image").src;

			allProducts.push(new Products(product_id, product_name, product_img, product_price, product_tag));
		}

		function findProductToBeSuggested(tag) {
			suggestedProducts = [];
			for (let i = 0; i < allProducts.length; i++) {
				const element = allProducts[i];
				if (element.product_tag == tag) {
					suggestedProducts.push(element);
				}
			}
			suggestedProducts = suggestedProducts.sort(() => Math.random() - 0.5);
			//console.log(suggestedProducts);
			addSuggestedProductsToWindow(suggestedProducts);
		}

		function addSuggestedProductsToWindow(suggested) {
			const products3 = document.querySelectorAll(".side-product");
			for (let i = 0; i < products3.length; i++) {
				if (i < suggestedProducts.length) {
					const element = products3[i];
					element.id = suggested[i].product_id;
					element.querySelector(".product-name").innerHTML = suggested[i].product_name;
					element.querySelector(".product-image").src = suggested[i].product_img;
					element.querySelector(".product-price").innerHTML = suggested[i].product_price;
				}
				// console.log(product_id, product_name, product_price);
			}
		}
		// -------------------------------------------------
		addCartBtn.forEach((btn) => {
			btn.addEventListener("click", function action() {
				if (cartWindow.style.display == "none") {
					cartWindow.style.display = "block";
					suggestedProductsWindow.style.display = "block";
					suggestedProductsWindow.style.left = "169vh";
				}
				let product_id = btn.parentElement.parentElement.parentElement.parentElement.id;
				let product_name = btn.parentElement.parentElement.children[0].children[0].textContent;
				let product_price = btn.parentElement.parentElement.children[0].children[1].children[0].textContent;
				let product_quantity = btn.parentElement.children[1].value;
				let product_tag = btn.id;
				lastProductTag = product_tag;

				if (!(product_id in productsToBeAdded)) {
					let product = {
						product_id,
						product_name,
						product_price,
						product_quantity,
						product_tag,
					};
					productsToBeAdded[product_id] = product;

					let item = document.createElement("li");
					item.innerHTML = "#" + product_id + " " + product_name + " x " + product_quantity + "......₹ " + product_price * product_quantity;

					cartList.appendChild(item);

					numberOfProducts += 1;
					document.getElementById("total-products").innerHTML = numberOfProducts;

					totalPrice += product_price * product_quantity;
					document.getElementById("total-price").innerHTML = "₹ " + totalPrice;
				}
				// -------------------------------------------------
				else {
					var temp = parseInt(productsToBeAdded[product_id].product_quantity);
					temp += parseInt(product_quantity);
					productsToBeAdded[product_id].product_quantity = temp;

					for (let i = 0; i < cartList.children.length; i++) {
						let temp = cartList.children[i].textContent.split((seperator = " "))[0];
						//console.log(temp);
						if ("#" + product_id == temp) {
							cartList.children[i].innerHTML =
								"#" +
								product_id +
								" " +
								product_name +
								" x " +
								productsToBeAdded[product_id].product_quantity +
								"......₹ " +
								productsToBeAdded[product_id].product_quantity * productsToBeAdded[product_id].product_price;

							totalPrice += product_price * product_quantity;
							document.getElementById("total-price").innerHTML = "₹ " + totalPrice;
						}
					}
				}
				// -------------------------------------------------
				// console.log(products);
				findProductToBeSuggested(product_tag);
				// -------------------------------------------------
			});
		});
		const empty_btn = document.getElementById("empty-btn");
		empty_btn.addEventListener("click", function empty() {
			if (confirm("are you sure ?")) {
				productsToBeAdded = {};
				numberOfProducts = 0;
				totalPrice = 0;
				cartList.innerHTML = "";
				document.getElementById("total-price").innerHTML = "";
				document.getElementById("total-products").innerHTML = numberOfProducts;
				cartWindow.style.display = "none";
			}
		});
	},
	false
);
