window.addEventListener(
	"DOMContentLoaded",
	function () {
		const add_cart_btn = document.querySelectorAll(".add-button");
		const cart = document.getElementById("cart");
		const cart_list = document.getElementById("cart-list");
		const side_products = document.querySelector(".side-products");
		cart.style.display = "none";

		let products = {};
		let no_products = 0;
		let total_price = 0;
		let last_product_tag = 0;

		class Products {
			constructor(product_id, product_name, product_img, product_price, product_tag) {
				this.product_id = product_id;
				this.product_name = product_name;
				this.product_img = product_img;
				this.product_price = product_price;
				this.product_tag = product_tag;
			}
		}
		let PProducts = [];
		let suggestedProducts = [];
		const products2 = document.querySelectorAll(".product");

		for (let i = 0; i < products2.length; i++) {
			const element = products2[i];
			product_id = element.id;
			product_name = element.querySelector(".product-name").textContent;
			product_price = element.querySelector(".product-price").textContent;
			product_tag = element.querySelector(".add-button").id;
			product_img = element.querySelector(".product-image").src;

			PProducts.push(new Products(product_id, product_name, product_img, product_price, product_tag));
		}
		function foo(tag) {
			let count = 4;
			suggestedProducts = [];
			for (let i = 0; i < PProducts.length; i++) {
				const element = PProducts[i];
				if (element.product_tag == tag && count > 0) {
					suggestedProducts.push(element);
					count--;
				}
			}
			// console.log(suggestedProducts);
			foo2(suggestedProducts);
		}

		function foo2(suggested) {
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

		add_cart_btn.forEach((btn) => {
			btn.addEventListener("click", function action() {
				if (cart.style.display == "none") {
					cart.style.display = "block";
					side_products.style.display = "block";
					side_products.style.left = "169vh";
				}
				let product_id = btn.parentElement.parentElement.parentElement.parentElement.id;

				let product_name = btn.parentElement.parentElement.children[0].children[0].textContent;

				let product_price = btn.parentElement.parentElement.children[0].children[1].children[0].textContent;

				let product_quantity = btn.parentElement.children[1].value;

				let product_tag = btn.id;

				last_product_tag = product_tag;

				if (!(product_id in products)) {
					let product = {
						product_id,
						product_name,
						product_price,
						product_quantity,
						product_tag,
					};
					products[product_id] = product;

					let item = document.createElement("li");
					item.innerHTML = "#" + product_id + " " + product_name + " x " + product_quantity + "......₹ " + product_price * product_quantity;

					cart_list.appendChild(item);

					no_products += 1;
					document.getElementById("total-products").innerHTML = no_products;

					total_price += product_price * product_quantity;
					document.getElementById("total-price").innerHTML = "₹ " + total_price;
				}
				// -------------------------------------------------
				else {
					var temp = parseInt(products[product_id].product_quantity);
					temp += parseInt(product_quantity);
					products[product_id].product_quantity = temp;

					for (let i = 0; i < cart_list.children.length; i++) {
						let temp = cart_list.children[i].textContent.split((seperator = " "))[0];
						//console.log(temp);
						if ("#" + product_id == temp) {
							cart_list.children[i].innerHTML =
								"#" +
								product_id +
								" " +
								product_name +
								" x " +
								products[product_id].product_quantity +
								"......₹ " +
								products[product_id].product_quantity * products[product_id].product_price;

							total_price += product_price * product_quantity;
							document.getElementById("total-price").innerHTML = "₹ " + total_price;
						}
					}
				}
				// -------------------------------------------------
				// console.log(products);
				foo(product_tag);
				// -------------------------------------------------

				// -------------------------------------------------
			});
		});
		const empty_btn = document.getElementById("empty-btn");
		empty_btn.addEventListener("click", function empty() {
			if (confirm("are u sure ?")) {
				products = {};
				no_products = 0;
				total_price = 0;
				cart_list.innerHTML = "";
				document.getElementById("total-price").innerHTML = "";
				document.getElementById("total-products").innerHTML = no_products;
				cart.style.display = "none";
			}
		});
	},
	false
);
