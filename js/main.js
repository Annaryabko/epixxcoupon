var addCardButtons = document.querySelectorAll('.catalog_cart__btn'); // выбираем все кнопки в каталоге, создаем переменную
var goods = []; // пустой массив (пока)
var imageClose = document.querySelector('.catalog_basket__close').innerHTML; // достаем картинку закрывающую из innerHTML

function renderCart() { //функция для передачи данных из каталога в корзину
	var html=""; // пустая строка (пока)
	var totalPrice=0; // переменная для расчета цены(пока 0)
	for (var i=0; i<goods.length; i++){ // цикл перебора значений в массив goods
		html+=
		'<div class="catalog_basket__line">' + 
			'<div class="catalog_basket__product">' + goods[i].title + '</div>' + 
			'<div class="catalog_basket__price">' + goods[i].price + '</div>' + 
			'<div class="catalog_basket__close">' + imageClose + '</div>' + 
		'</div>';

		totalPrice+=goods[i].price; // расчет общей суммы
	}

	document.querySelector('.catalog_basket__list').innerHTML = html; //добавляем новые данные в корзину
	document.querySelector('.catalog_basket__summ_text').innerHTML = totalPrice; // добавляем новые данные в div с итоговой суммой

}

renderCart(); //вызываем функцию 

for (var i=0; i<addCardButtons.length; i++){
	addCardButtons[i].addEventListener('click', function(event){
		event.preventDefault();// убираем дефолтную ссылку с кнопки
		var title = event.target.closest('.catalog_cart__content').querySelector('.catalog_cart__title').innerText;
		var price = event.target.closest('.catalog_cart__content').querySelector('.catalog_cart__price_new').innerText;

		goods.push({ // добавляем массив объектов в массив
			price: Number(price),
			title: title
		});
		renderCart();
	});
}



