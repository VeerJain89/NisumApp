function createCarouselItems(carouselItems) {
	let carouselControl = $(".carousel-inner").empty();
	let carouselIndicators = $(".carousel-indicators").empty();
	for(let i = carouselItems.length-1; i>=0; i--) {
		carouselIndicators.prepend($('<li data-target="#productGallery" data-slide-to='+i+'></li>').addClass(i===1 && "active"));
		let itemDiv = $('<div class="carousel-item"></div>').addClass(i===1 && "active");
		itemDiv.append($('<img src='+carouselItems[i].href+'></img>'));
		carouselControl.prepend(itemDiv);
	}
}

function createProductDetail(groups, index) {
	let productDetails = $("#product-details");
	for(let i = 0; i < groups.length; i++) {
		let div = $('<div class="product-area col-md-4"></div>');

		let anchor = $('<a href="#productGallery" data-slide-to='+index+'>');
		anchor.on("click", function() {
			$(".modal-title").html(groups[i].name);
			createCarouselItems(groups[i].images);
		})
		let modalDiv = $('<div class="product-rec" data-toggle="modal" data-target="#productModal"></div>');
		modalDiv.append($('<img src='+groups[i].hero.href+'></img>'));
		anchor.append(modalDiv);

		let descriptionDiv = $('<div class="product-des text-center"></div>');
		descriptionDiv.append($('<label>'+groups[i].name+'</label>'));
		descriptionDiv.append($('<label>'+"Price: $" + groups[i].priceRange.selling.low + "- $" + groups[i].priceRange.selling.high+'</label>'));

		div.append(anchor);
		div.append(descriptionDiv);

		productDetails.append(div);
	}
}

function init() {
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	let responseText = JSON.parse(xhr.responseText);
	    	$(".product-title").text("Towels - " + responseText.name);
		    createProductDetail(responseText.groups);
	    }
	};
	xhr.open("GET", "index.json");
	xhr.send();
}

$(document).ready(init);