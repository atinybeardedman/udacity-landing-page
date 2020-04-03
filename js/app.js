/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

const sections = document.querySelectorAll('section');
const sectionsArray = [...sections];
const navList = document.querySelector('#navbar__list');
const header = document.querySelector('.page__header');
const topButton = document.querySelector('.top__button');
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= 200 && rect.top >= -200;
}

function scrollToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth'
    });
}

function hideNav() {
    header.classList.add('hidden');
}

function showNav() {
    header.classList.remove('hidden');
}

function toggleTopButton() {
    if (window.scrollY > window.innerHeight) {
        topButton.classList.remove('hidden');
    } else {
        topButton.classList.add('hidden');
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav from the sections
function buildNav() {
    const frag = document.createDocumentFragment();
    for (const section of sections) {
        const anchor = document.createElement('a');
        anchor.href = `#${section.id}`;
        anchor.dataset.target = section.id;
        anchor.classList.add('menu__link');
        anchor.textContent = section.dataset.nav;
        const li = document.createElement('li');
        li.appendChild(anchor);
        frag.appendChild(li);
    }
    navList.appendChild(frag);
}

// Add class 'active' to section when near top of viewport

function updateActiveSection() {
    for (const section of sections) {
        const anchor = navList.querySelector(`a.menu__link[data-target=${section.id}]`);
        if (isVisible(section)) {
            section.classList.add('active');
            anchor.classList.add('active');
        } else {
            section.classList.remove('active');
            anchor.classList.remove('active');
        }
    }
}

function onScroll() {
    showNav();
    updateActiveSection();
    toggleTopButton();
    setTimeout(() => {
        if(window.scrollY > 0){
            hideNav()
        }
    }, 2000);
}


// call inital functions (deferred until after DOM content via html attribute)
buildNav();


/**
 * End Main Functions
 * Begin Events
 * 
 */



// handle all clicks on the navList
navList.addEventListener('click', (event) => {
    // only try to scroll if the event was dispatched from an <a>
    if (event.target.nodeName === 'A') {
        event.preventDefault();
        const anchor = event.target;
        const section = sectionsArray.find(section => section.id === anchor.dataset.target);
        scrollToSection(section);
    }
})

// handle all scroll events together
document.addEventListener('scroll', onScroll);


// add click listener for back to top button
topButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})