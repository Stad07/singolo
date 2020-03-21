window.onload = function() {

	menuHandler();
	showSlides(slideIndex);
	nextSlide();
	prevSlide();
	tagsHandler();
	defaultImagesPosition();	
}

const MENU = document.querySelector('.navigation');
const PREV = document.querySelector('.prev');
const NEXT = document.querySelector('.next');
const TAGS = document.querySelector('.portfolio__tags');
const PORTFOLIO = document.querySelector('.portfolio__layout');
const BUTTON_SUBMIT = document.querySelector('.button_submit');
const CLOSE_BUTTON = document.querySelector('.button_close');

// ......................SECTION HEADER......................

const menuHandler = () => {	 
	MENU.addEventListener('click', (e) => {	
		e.preventDefault();				
		let clickedItem = e.target;	
		let menuItems = document.querySelectorAll('.navigation .navigation__link');		
		chooseMenuItem(clickedItem, menuItems);
		scrollToTargetSection(clickedItem);
	});	
}

const chooseMenuItem = (clickedItem, menuItems) => {	
	menuItems.forEach(item => item.classList.remove('link_selected'));
	clickedItem.classList.add('link_selected');
}

const scrollToTargetSection = (clickedItem) => {
	const sectionID = clickedItem.getAttribute('href');	
		
	if (sectionID !== '#header') {		
		document.querySelector(sectionID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});			
		document.getElementById('header').classList.add('fixed');
	} else {
		window.scrollTo(0, 0);	
		document.getElementById('header').classList.remove('fixed');	
	}		
}

// ......................SECTION SLIDER......................

let slideIndex = 1;

function prevSlide() {
	PREV.addEventListener('click', () => {
		showSlides(--slideIndex);
	});	
}

function nextSlide() {
	NEXT.addEventListener('click', () => {
		showSlides(++slideIndex);
	});	
}

function showSlides(n) {	
	let slides = document.querySelectorAll('.slider__image');	

	if(n > slides.length) {
		slideIndex = 1;
	}

	if(n < 1) {
		slideIndex = slides.length;
	}

	for(let slide of slides) {	
		slide.style.display = 'none';		
	}

	slides[slideIndex - 1].style.display = 'flex';	
}

// ......................SECTION PORTFOLIO......................
const defaultImages = [];

const defaultImagesPosition = () => {	
	let images = document.querySelectorAll('.portfolio__layout img');
	images.forEach(image => {		
		defaultImages.push(image.getAttribute('src'));
	});
}

const tagsHandler = () => {	
	TAGS.addEventListener('click', (e) => {
		if (e.target.classList.contains('tag')) {
			let clickedTag = e.target;
			removeSelectedTags();
			addSelectedTags(clickedTag);
			if (clickedTag.innerText === 'All') {
				showAllPortfolio();
			} else {
				filterPortfolioBySelectedTag(clickedTag.innerText);
			}		
		}		
	});
}

const removeSelectedTags = () => {
	let tags = document.querySelectorAll('.portfolio__tags .tag');
	tags.forEach(tag => {
		tag.classList.remove('tag_selected');
		tag.classList.add('tag_bordered');
	});
}

const addSelectedTags = (clickedTag) => {
	clickedTag.classList.add('tag_selected');
	clickedTag.classList.remove('tag_bordered');
}

const showAllPortfolio = () => {
	let images = document.querySelectorAll('.portfolio__layout img');
	images.forEach((image, index) => {				
		image.setAttribute('src', defaultImages[index]);
	});
}

const filterPortfolioBySelectedTag = (selectedTag) => {
	let portfolioImages = document.querySelectorAll('.portfolio__layout img');
	
	portfolioImages.forEach(image => {
		if(selectedTag === 'Web Design') {			
			image.setAttribute('src', arrayRandomElement(defaultImages));
		}
		if(selectedTag === 'Graphic Design') {
			image.setAttribute('src', arrayRandomElement(defaultImages));
		}
		if(selectedTag === 'Artwork') {
			image.setAttribute('src', arrayRandomElement(defaultImages));
		}		
	});
}

function arrayRandomElement(arr) {
    let random = Math.floor(Math.random() * arr.length);
    return arr[random];
}

// ......................SECTION GET-A-QUOTE......................

BUTTON_SUBMIT.addEventListener('click', (e) => {
	e.preventDefault();
	let name = document.getElementById('name').value.toString();
	let email = document.getElementById('email').value.toString();
	let subject = document.getElementById('subject').value.toString();
	let project = document.getElementById('project').value.toString();

	document.getElementById('name_response').innerText = name;
	document.getElementById('email_response').innerText = email;

	if(subject) {
		document.getElementById('subject_response').innerText = `Тема: ${subject}`;
	} else {
		document.getElementById('subject_response').innerText = 'Без темы';
	}

	if(project) {
		document.getElementById('project_response').innerText = `Описание: ${project}`;
	} else {
		document.getElementById('project_response').innerText = 'Без описания';
	}
	
    document.getElementById('message-block').classList.remove('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {    
    document.getElementById('message-block').classList.add('hidden');
});



