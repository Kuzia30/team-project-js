export {scrollFunction, topFunction}

let mybutton = document.querySelector(".back-to-top");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1400 || document.documentElement.scrollTop > 1400) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener('click', topFunction)
function topFunction() {
    window.scrollTo({
          top:0,
        behavior: 'smooth'
    })

}


