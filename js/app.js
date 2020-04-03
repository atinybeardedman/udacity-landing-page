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

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= 200 && rect.top >= -200;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav(){
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

function scrollToSection(section){
    section.scrollIntoView({
        behavior: 'smooth'
    });
}

// call inital functions (deferred until after DOM content via html attribute)
buildNav(); 


/**
 * End Main Functions
 * Begin Events
 * 
 */

// Scroll to section on link click


navList.addEventListener('click', (event) => {
    if(event.target.nodeName === 'A'){
        event.preventDefault();
        const anchor = event.target;
        const section = sectionsArray.find(section => section.id === anchor.dataset.target);
        scrollToSection(section);
    }
})

// Set sections as active
document.addEventListener('scroll', updateActiveSection);