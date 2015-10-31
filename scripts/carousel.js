(function () {
    "use strict";

    //Function which returns next DOM node(if last -> returns first)
    function getNext(slide, slides){
        var nextSlide, n = slides.length;

        for(var i = 0; i < n; i++){
            if(slides[i] == slide){
                if(i == n-1){
                    nextSlide = slides[0];
                }else{
                    nextSlide = slides[i+1];
                }
            }
        }
        return nextSlide;
    }


    //Function which returns previous DOM node(if first -> returns last)
    function getPrevious(slide, slides){
        var previousSlide, n = slides.length;

        for(var i = 0; i < n; i++){
            if(slides[i] == slide){
                if(i == 0){
                    previousSlide = slides[n-1];
                }else{
                    previousSlide = slides[i-1];
                }
            }
        }
        return previousSlide;
    }

    //Animating function
    function animate(carousel){
        carousel.classList.remove('transitioned');
        setTimeout(function () {
            carousel.classList.add('transitioned');
        }, 50);
    }

    //Reordering function
    function reorder(slides, newSlide){
        newSlide.classList.add('marker');
        newSlide.style.order = 1;

        for(var i = 1; i < slides.length; i++){
            newSlide = getNext(newSlide, slides);
            newSlide.style.order = i + 1;
        }
    }

    //Function which implements switches slides
    function switchSlide(direction){

        var slides = Array.prototype.slice.call(document.getElementsByClassName('slide')),
            slidesContainer = document.querySelector('.slides'),
            currentReference = document.querySelector('.marker'),
            newSlide;

        currentReference.classList.remove('reversed');

        if(direction === 'right'){
            newSlide = getNext(currentReference, slides);
            slidesContainer.classList.remove('reversed');
        }else if (direction === 'left'){
            newSlide = getPrevious(currentReference, slides);
            slidesContainer.classList.add('reversed');
        }

        reorder(slides, newSlide);
        animate(slidesContainer);

    }

    //Events handling
    document.querySelector('.prev').addEventListener('click', function () {
        switchSlide('left');
    });

    document.querySelector('.next').addEventListener('click', function () {
        switchSlide('right');
    });


    //Implementation of a delay feature
    var delay = 5000; //milliseconds

    setInterval(function () {
        switchSlide('right')
    }, delay);

}());
