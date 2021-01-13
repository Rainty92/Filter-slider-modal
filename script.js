const Img = [
	{
		path: 'https://pbs.twimg.com/media/C8GHEJwXUAEEYiG.jpg',
		price: '9$',
		dataValue: 'cake'
	},
	{
		path: 'https://img2.goodfon.ru/original/5250x3500/a/55/cupcake-dessert-sweet-cream-2239.jpg',
		price: '4$',
		dataValue: 'cupcakes'
	},
	{
		path: 'https://s6.hostingkartinok.com/uploads/images/2014/05/12474bf8c0876f87fe57edec8e914a1a.jpg',
		price: '3.5$',
		dataValue: 'sweet'
	},
	{
		path: 'https://s1.1zoom.ru/big3/609/Donuts_Closeup_553930_6016x4016.jpg',
		price: '6$',
		dataValue: 'doughnuts'
	},
	{
		path: 'https://www.yolandascakes.net/wp-content/uploads/2018/10/cupcakes-3-colores.jpg',
		price: '7$',
		dataValue: 'cupcakes'
	},
	{
		path: 'http://www.picshunger.com/wp-content/uploads/2014/05/1120.jpg',
		price: '15$',
		dataValue: 'cake'
	},

	{
		path: 'https://www.experiencekissimmee.com/sites/default/files/donut-miss.jpeg',
		price: '3$',
		dataValue: 'doughnuts'
	},

	{
		path: 'http://cdn.shopify.com/s/files/1/0116/2008/9956/collections/sweets_1200x1200.jpg?v=1563018091',
		price: '2$',
		dataValue: 'sweet'
	},
	{
		path: 'https://data.whicdn.com/images/28890738/original.jpg',
		price: '5$',
		dataValue: 'cupcakes'
	},
	{
		path: 'https://wallbox.ru/wallpapers/main2/201714/149141537658e53150a4d6f7.61218937.jpg',
		price: '14$',
		dataValue: 'cake'
	},


]



let wrapper = document.querySelector('.wrapper');
let itemArray = [];
let counter = 0;

document.querySelectorAll('.wrap button').forEach((btn)=>{
	btn.addEventListener('click', chooseСategory)
})

function chooseСategory () {

	//let dataAttr;

	//if(this.dataset) {
	//	dataAttr = this.dataset.value
	//} else {
	//	dataAttr = 'all'
	//}


	let dataAttr = this.dataset ? this.dataset.value : 'all'



	wrapper.innerHTML = '';

	for(let i = 0; i < Img.length; i++) {

		//if(dataAttr == Img[i].dataValue || dataAttr == 'all') {
		//	//result = true
		//	let item = `<div class='img-wrapper'><div class=" item-img item" data-value='${Img[i].dataValue}'><img class='item__img' src="${Img[i].path}" alt="" /></div></div>`
		//	render(item)
		//}

		let result = dataAttr == Img[i].dataValue || dataAttr == 'all';

		let item = `<div class='img-wrapper'><div class=" item-img item" data-value='${Img[i].dataValue}'><img class='item__img' src="${Img[i].path}" alt="" />
			<span class="store-item-icon">
				<img src='http://cdn.onlinewebfonts.com/svg/img_260172.png'>
			  </span>
		</div>
			<div class='item-value'>
				<div class='item-value__name'>${Img[i].dataValue}</div>
				<div class='item-value__price'>${Img[i].price}</div>
			</div>
		</div>`;

		result && render(item)
	}
	itemArray = document.querySelectorAll('.img-wrapper')
	openModal();

}

chooseСategory ();

//----render elements-----

function render (el) {
	wrapper.insertAdjacentHTML('afterbegin', el)
}


//----Get index


function getIndex(array, src) {
	for(let i = 0; i <= array.length - 1; i++) {
		if(array[i].querySelector('img').src == src) {
			return (i);
		}
	}
}

//----create modal window----


function openModal() {
	wrapper.querySelectorAll('.img-wrapper').forEach((item) => {
		item.children[0].addEventListener('click', (e) => {
			//e.preventDefault();
			modalWindow(e.target)
		})
	})
}


function modalWindow(e) {
	counter = getIndex(itemArray, e.src)
	let modalWindow = `
	<div class="popup">
		<div class='popup__wrapper'>
			<div class="btn btn-left">
				<button class="arrow left">
				<svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
				<polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
				45.63,75.8 0.375,38.087 45.63,0.375 "/>
				</svg>  
				</button>
			</div>
			<div class="popup__item hide">
				<img src=${e.src} />
			</div>
			<div class="btn btn-right">
				<button class="arrow right">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
				<polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
				0.375,0.375 45.63,38.087 0.375,75.8 "/>
				</svg>
				</button>
			</div>
		</div>
	</div>`

	render(modalWindow);
	modalListener()
}

//-----Close modal

function modalListener() {

	wrapper.querySelectorAll('.btn').forEach((btn)=>{
		btn.addEventListener('click', nextItem)
	})

	wrapper.querySelector('.popup').addEventListener('click', (e)=> {
		wrapper.removeChild(wrapper.querySelector('.popup'))
		console.log('e')
	})
}

//----Slide modal

function nextItem () {
	event.stopPropagation();
	let i = this.classList.contains('btn-right')
	if(i) {
		if(counter >= itemArray.length - 1) {
			counter = 0;
		} else {
			counter ++
		} 
	} else {
		if(counter <= 0) {
			counter = itemArray.length -1
		} else {
			counter--
		}
	}
	document.querySelector('.popup img').src = itemArray[counter].querySelector('img').src
}

