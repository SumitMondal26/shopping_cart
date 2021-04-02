const add_cart_btn = document.querySelectorAll(".add-button");
const cart = document.getElementById("cart");
const cart_list = document.getElementById("cart-list");
const side_products = document.querySelector(".side-products");
cart.style.display = "none";

let products = {};
let no_products = 0;
let total_price = 0;

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

		if (!(product_id in products)) {
			let product = {
				product_id,
				product_name,
				product_price,
				product_quantity,
			};
			products[product_id] = product;
			let item = document.createElement("li");
			item.innerHTML =
				"#" +
				product_id +
				" " +
				product_name +
				" x " +
				product_quantity +
				"......₹ " +
				product_price * product_quantity;
			cart_list.appendChild(item);

			no_products += 1;
			document.getElementById("total-products").innerHTML = no_products;

			total_price += product_price * product_quantity;
			document.getElementById("total-price").innerHTML = "₹ " + total_price;
		} else {
			var temp = parseInt(products[product_id].product_quantity);
			temp += parseInt(product_quantity);
			products[product_id].product_quantity = temp;

			for (let i = 0; i < cart_list.children.length; i++) {
				let temp = cart_list.children[i].textContent.split((seperator = " "))[0];
				console.log(temp);
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

		console.log(products);
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
