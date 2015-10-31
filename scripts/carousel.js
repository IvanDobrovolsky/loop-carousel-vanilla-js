(function () {

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

    function animate(carousel){
        carousel.classList.remove('is-set');
        setTimeout(function () {
            carousel.classList.add('is-set');
        }, 50);
    }

    function reorder(slides, newSlide){
        newSlide.classList.add('is-running');
        newSlide.style.order = 1;

        for(var i = 1; i < slides.length; i++){
            newSlide = getNext(newSlide, slides);
            newSlide.style.order = i + 1;
        }
    }

    function switchSlide(direction){

        var slides = Array.prototype.slice.call(document.getElementsByClassName('slide')),
            slidesContainer = document.querySelector('.slides'),
            currentReference = document.querySelector('.is-running'),
            newSlide;


        currentReference.classList.remove('is-running');

        if(direction === 'right'){
            newSlide = getNext(currentReference, slides);
            slidesContainer.classList.remove('is-reversing');
        }else if (direction === 'left'){
            newSlide = getPrevious(currentReference, slides);
            slidesContainer.classList.add('is-reversing');
        }

        reorder(slides, newSlide);
        animate(slidesContainer);
    }



    document.querySelector('.prev').addEventListener('click', function () {
        switchSlide('left');
    });

    document.querySelector('.next').addEventListener('click', function () {
        switchSlide('right');
    });

}());
