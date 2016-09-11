var addCardButtons = document.querySelectorAll('.catalog_cart__btn'); 
// выбираем все кнопки в каталоге, создаем переменную
var goods = []; // пустой массив (пока)

if (localStorage.getItem("goods")) {
	goods = JSON.parse(localStorage.getItem("goods"));
}

var imageClose = document.querySelector('.catalog_basket__close').innerHTML; 
// достаем картинку закрывающую из innerHTML


//
// Перерисовка корзины (используется при добавлении и удалении)
//
function renderCart() { //функция для передачи данных из каталога в корзину
	var html=""; // пустая строка (пока)
	var totalPrice=0; // переменная для расчета цены(пока 0)

	for (var i=0; i<goods.length; i++){ // цикл перебора значений в массив goods
		html+=
		'<div class="catalog_basket__line">' + 
			'<div class="catalog_basket__product">' + goods[i].title + '</div>' + 
			'<div class="catalog_basket__price">' + goods[i].price + '</div>' + 
			'<div data-index="' + i + '" class="catalog_basket__close">' + imageClose + '</div>' + 
		'</div>';

		totalPrice+=goods[i].price; // расчет общей суммы
	}

	document.querySelector('.catalog_basket__list').innerHTML = html; //добавляем новые данные в корзину
	document.querySelector('.catalog_basket__summ_text').innerHTML = totalPrice; // добавляем новые данные в div с итоговой суммой

}


renderCart(); //вызываем функцию 


//
// Обработка клика по ADD CARD
//
for (var i=0; i<addCardButtons.length; i++){
	addCardButtons[i].addEventListener('click', function(event){
		event.preventDefault();// убираем дефолтную ссылку с кнопки

		var productElement = event.target.closest('.catalog__item');
		if (productElement.className.indexOf('catalog_cart--disabled') === -1) {

			var title = productElement.querySelector('.catalog_cart__title').innerText;// добавить полифилл2 подключить дополнительно в отдельный js и поставить ссылку html
			var price = productElement.getAttribute('data-price');//eproductElement.querySelector('.catalog_cart__price_new').innerText;

			goods.push({ // добавляем массив объектов в массив
				price: Number(price),
				title: title
			});

			localStorage.setItem('goods', JSON.stringify(goods));


			renderCart();
		}
	});
}


//
// Обработка удалния (крестик в корзине)
//
document.querySelector('.catalog_basket__list').addEventListener('click', function(event){
	if (event.target.parentNode.className === 'catalog_basket__close') {
		var i = event.target.parentNode.getAttribute('data-index');
		goods.splice(i, 1);

		localStorage.setItem('goods', JSON.stringify(goods));

		renderCart();
	}

});


//
// делаем таймер
//
// productElement (HTMLElement)
//
function runTimer(productElement) {
	var timerItems = productElement.querySelectorAll('.timer__item span:first-child');

	var daysCount = Number(timerItems[0].innerText);
	var hoursCount = Number(timerItems[1].innerText);
	var minutesCount = Number(timerItems[2].innerText);
	var secondsCount = Number(timerItems[3].innerText);

	var counter = function(){

		if (secondsCount == 0) {
		      if (minutesCount == 0) {
			      	if (hoursCount == 0) {
			      		if (daysCount == 0) {
						productElement.classList.add('catalog_cart--disabled');
						productElement.classList.remove('catalog_cart--special');
			      		clearInterval(myInterval);
			      		return;
			      	}

			        daysCount--;
			        hoursCount = 24;
			      	}

		        hoursCount--;
		        if (hoursCount < 10) hoursCount = "0" + hoursCount;
		        minutesCount = 60;
		      }
	      minutesCount--;
	    	if (minutesCount < 10) minutesCount = "0" + minutesCount;
	      secondsCount = 59;
	    }
	    else secondsCount--;
	    if (secondsCount < 10) secondsCount = "0" + secondsCount;



		timerItems[0].innerHTML = daysCount;
		timerItems[1].innerHTML = hoursCount;
		timerItems[2].innerHTML = minutesCount;
		timerItems[3].innerHTML= secondsCount;


	}

	var myInterval = setInterval (counter, 1000);
}

//document.querySelectorAll('.catalog_cart--special').forEach(runTimer);


var specialProducts = document.querySelectorAll('.catalog_cart--special');

for (var i = 0; i < specialProducts.length; i++) {
	runTimer(specialProducts[i]);
}


//
//сортировка по 3 или 2 элемента по клику
//

var div1Svg = document.querySelector('.catalog_view__item:first-child');
var div2Svg = document.querySelector('.catalog_view__item:nth-child(2)');

var catalogList = document.querySelector('.catalog__list');


div1Svg.addEventListener('click', function(event){

	div1Svg.classList.add('catalog_view__item--active');
	catalogList.classList.remove('catalog__list--three');
	catalogList.classList.add('catalog__list--two');
	div2Svg.classList.remove('catalog_view__item--active');


});

div2Svg.addEventListener('click', function(event){

	div2Svg.classList.add('catalog_view__item--active');
	catalogList.classList.remove('catalog__list--two');
	catalogList.classList.add('catalog__list--three');
	div1Svg.classList.remove('catalog_view__item--active');

});

	
//
//фильтр слева по клику раскрывается и закрывается
//

//var catalogFiltersItem1 = document.querySelector('.filter__title:first-child');
var catalogFiltersItems = document.querySelectorAll('.filter__title');
for (let i = 0; i < catalogFiltersItems.length; i++) {
	catalogFiltersItems[i].addEventListener('click', function(event){
		event.target.parentNode.classList.toggle('filter--open');
	});
};

//
//сортируем по ценам
//

var sortByPriceElem = document.querySelectorAll('.catalog__item');
var sortByPriceElemArray = [];

for (var i = 0; i < sortByPriceElem.length; i++) {
	sortByPriceElemArray.push(sortByPriceElem[i]);
}

var parentSort = document.querySelector('.catalog__list');

document.querySelector('.catalog_sort__item:first-child').addEventListener('click', function(event){
	event.preventDefault();
	
	sortByPriceElemArray.sort(function(item1, item2){
		var price1 = item1.getAttribute('data-price');
		var price2 = item2.getAttribute('data-price');
		return price1 - price2;
		//возвращается результат вычитания. Отрицательный, положительный или 0.
	});

	for (var i = 0; i < sortByPriceElemArray.length; i++) {
		parentSort.appendChild(sortByPriceElemArray[i]);
	}

});

document.querySelector('.catalog_sort__item:nth-child(2)').addEventListener('click', function(event){
	event.preventDefault();
	
	sortByPriceElemArray.sort(function(item1, item2){
		var price1 = item1.querySelector('.catalog_cart__discount').innerHTML;
		var price2 = item2.querySelector('.catalog_cart__discount').innerHTML;
		price1 = parseInt(price1, 10);
		price2 = parseInt(price2, 10);

		return price2 - price1;
		//возвращается результат вычитания. Отрицательный, положительный или 0.
	});

	for (var i = 0; i < sortByPriceElemArray.length; i++) {
		parentSort.appendChild(sortByPriceElemArray[i]);
	}

});


//
//начинаем делать страшные фильтры 0_о
//


/* 
написать метод, который способен ответить на вопрос, надо показывать блок или нет. Если нет dislay none.
Отобразить все блоки, которые в атрибутах совпадают с выбранными галочками и полями, остальные скрыть.


*/

var catItems = document.querySelectorAll('.catalog__item');
var checkboxes = document.querySelectorAll('.checkbox__input');
var pricesInput = document.querySelectorAll('.filter__input');


function updateVisibility(){
	
	var filteredTypes = {
		entertainment: checkboxes[0].checked,
		beauty: checkboxes[1].checked,
		travel: checkboxes[2].checked,
		education: checkboxes[3].checked,
		food: checkboxes[4].checked,
		special: checkboxes[5].checked,
		primorskaya: checkboxes[6].checked,
		admiralteiskaya: checkboxes[7].checked,
		pushkinskaya: checkboxes[8].checked,
	};

	var filteredPrice = {
		from: Number(pricesInput[0].value),
		to: Number(pricesInput[1].value),
	}

	var inputDateValue = document.querySelector('input[type="date"]').value;
	

	for (var i = 0; i < catItems.length; i++) {
		catItems[i].style.display = 'inline-block';

		if (filteredTypes.entertainment || filteredTypes.beauty || filteredTypes.travel || filteredTypes.education || filteredTypes.food) {
			var type = catItems[i].getAttribute('data-type');

			if (filteredTypes[type] === false) {
				catItems[i].style.display = 'none';
			}
		}

		if (filteredTypes.primorskaya || filteredTypes.admiralteiskaya || filteredTypes.pushkinskaya || filteredTypes.education || filteredTypes.food) {
			var type = catItems[i].getAttribute('data-type');

			if (filteredTypes[type] === false) {
				catItems[i].style.display = 'none';
			}
		}

		if (checkboxes[5].checked) {
			if (!catItems[i].classList.contains('catalog_cart--special')) {
				catItems[i].style.display = 'none';
			}
		}


	
		if (!isNaN(filteredPrice.from) && filteredPrice.from !== 0 ) {
			var price = catItems[i].getAttribute('data-price');

			//if (filteredPrice[type] < pricesInput[0].value) {
			if (price < filteredPrice.from) {
				catItems[i].style.display = 'none';
			}
		}

		if (!isNaN(filteredPrice.to) && filteredPrice.to !== 0 ) {
			var price = catItems[i].getAttribute('data-price');

			if (price > filteredPrice.to) {
				catItems[i].style.display = 'none';
			}
		}



		if (inputDateValue) {
			var inputDate = new Date(inputDateValue);
			var parts = catItems[i].getAttribute('data-date-from').split('.');
			var dateItems = new Date('20' + parts[2], parts[1] - 1, parts[0]);

			if (dateItems < inputDate) {
				catItems[i].style.display = 'none';
			}
		}


	}
}


var checkboxes = document.querySelectorAll('.checkbox__input');

for (var checkbox of checkboxes) {
	checkbox.addEventListener('change', updateVisibility);
}

for (var prices of pricesInput) {
	prices.addEventListener('input', updateVisibility);
}

document.querySelector('input[type="date"]').addEventListener('input', updateVisibility);


//
//клик Купить и модальное окно
//

var buttonBuy = document.querySelector('.catalog_basket__summ a.btn');


function toBuy (e) {
	e.preventDefault();
	var modalOrder = document.querySelector('.modal_order');
	modalOrder.style.display = "block";
	var modalOrderBg = document.querySelector('.modal_underlay');
	modalOrderBg.style.display = "block";

}

buttonBuy.addEventListener('click', toBuy);















/*var catalogFiltersItems = document.querySelectorAll('.catalog_filters__item');

for (let i = 0; i < catalogFiltersItems.length; i++) {
	
	catalogFiltersItems[i].addEventListener('click', function(event){

		catalogFiltersItems[i].classList.toggle('.filter--open');
	})

} */










