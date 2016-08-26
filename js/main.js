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


/*var catalogFiltersItems = document.querySelectorAll('.catalog_filters__item');

for (let i = 0; i < catalogFiltersItems.length; i++) {
	
	catalogFiltersItems[i].addEventListener('click', function(event){

		catalogFiltersItems[i].classList.toggle('.filter--open');
	})

} */








