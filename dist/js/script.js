const getElem = (elem)=> document.querySelector(elem);
///////////////////////////////////////////////IF BLOCK IS VISIBLE//////////////////////
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

////////////////////////////////<PRELOADER>//////////////////////////////////
window.onload = function(){
  //hide the preloader
    setTimeout(()=>{
      fadeOutEffect();
      getElem('.promo__subtitle').classList.add('promo__subtitle_animated');
    },2000);
};

function fadeOutEffect() {
  let fadeTarget = document.querySelector(".preloader");
  let fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
          fadeTarget.style.opacity -= 0.1;
          setTimeout(()=>{
            fadeTarget.style.display = "none";
          },150);         
      } else {
          clearInterval(fadeEffect);
      }
  }, 100);
}
////////////////////////////////////////////////////////////MENU///////////
const burger = getElem('.hamburger');
const menu = getElem('.menu');
const closeMenu = getElem('.menu__close');

burger.addEventListener('click', ()=>{
    menu.classList.add('active');
    getElem('.sidepanel').style.zIndex = '1';
});
closeMenu.addEventListener('click', ()=>{
    menu.classList.remove('active');
    getElem('.sidepanel').style.zIndex = '2';
});
///////////////////////////////////////////////////////////SKILLS///////
TagCanvas.Start('myCanvas','tags',{////animation moving skills using tagcanvas library
  outlineColour:'#bee7fb',
  reverse: true,
  depth: 0.8,
  maxSpeed: 0.05,
  textColour:'#FFA501',
  textHeight: 15,
  textFont:'Poppins, sans-serif',
  zoomMin: 1,
  zoomMax: 1,
  outlineMethod:'none',
  activeCursor: 'auto'
});
function initTypeWriter() {
  let i = 0;///printed text function
  let txt = 'Where HTML and CSS help me design and structure your website,JavaScript enables me to make it interactive. Using it, I can  liven up website elements ';
  let speed = 50;  
  function typeWriter() {
    if (i < txt.length) {
      printedBlock.innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}

const printedBlock = document.getElementById("printed");////printed text block
const percentsBlock = getElem('.skills__percents');
const counters = document.querySelectorAll('.skills__percents-counter');
const lines = document.querySelectorAll('.skills__percents-line span');
const sections = document.querySelectorAll("section");

//////////////////////////////////////////////////ON SCROLL FUNCTIONS/////////////////////////////////
window.addEventListener("scroll", () => {//adding percents into skills block
  if(isInViewport(percentsBlock)) {
          counters.forEach((item, i) => {
      lines[i].style.width = item.innerHTML;
      }); 
  }

  if(isInViewport(printedBlock) && printedBlock.innerHTML=="") {////call printedBlock function
    initTypeWriter(); 
  }

  if(window.pageYOffset >= sections[0].offsetHeight + sections[1].offsetHeight){//adding arrow to scroll page up
      getElem(".arrow-up").classList.remove('hidden');
    } else{
      getElem(".arrow-up").classList.add('hidden');
  }
});

////////////////////////ANCHORS/////////

$('a[href^="#"]').on('click', function(event) {

  var target = $(this.getAttribute('href'));

  if (target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top
    }, 1000);
  }
});

//////////////////////////////////////////////////////SHOW/HIDE ARROW-UP///////////////////
// getElem('.arrow-up').addEventListener('click', up);
// let t;
// function up() {
// 	let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
// 	if(top > 0) {
// 		window.scrollBy(0,-100);
// 		t = setTimeout('up()',20);
// 	} else {clearTimeout(t);}
// 	return false;
// }

$('.arrow-up').on('click', function(){
  $('html, body').animate( { scrollTop : 0 }, 800 );
});




///////////////////////////////////////VALIDATE FORM///////////////
const form = document.getElementById('form');
const username = document.getElementById('name');
const email = document.getElementById('email');
const text = document.getElementById('text');

form.addEventListener('submit', e => {
  e.preventDefault();
  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
};

const setSuccess = element => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
};

const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  

  if(usernameValue === '') {
      setError(username, 'Username is required');
  } else {
      setSuccess(username);
  }
  const emailValue = email.value.trim();

  if(emailValue === '') {
    setError(email, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
    setError(email, 'Provide a valid email address');
  } else {
    setSuccess(email);
  }

  const textValue = text.value.trim();
  if(textValue === ''){
    setError(text, 'Please write your message here');
  } else{
    setSuccess(text);
  }
  if(isValidEmail(emailValue) && textValue != '' && usernameValue != ''){
    getElem('.overlay').classList.add('active');
    getElem('.modal').classList.add('active');
    form.reset();
    document.querySelectorAll('.contacts__input').forEach((input)=>{
        if(input.classList.contains('success')){
          input.classList.remove('success');}       
    });
    if(getElem('.contacts__textarea').classList.contains('success')){
      getElem('.contacts__textarea').classList.remove('success');
    }
  }
};
getElem('.modal__close').addEventListener('click', ()=>{
    getElem('.overlay').classList.remove('active');
    getElem('.modal').classList.remove('active');
});





  