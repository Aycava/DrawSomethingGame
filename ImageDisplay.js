let finalPictures = JSON.parse(localStorage.getItem('savedPictures')) || [];

//let testPictures = [ 'https://i.pinimg.com/736x/0f/62/65/0f6265fe8dc448b8f032f161db77c033.jpg',
  //  'https://i.pinimg.com/originals/dc/36/80/dc3680647ca39e32eef708d6d32e475b.jpg',
    //  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Eo_circle_blue_number-3.svg/1200px-Eo_circle_blue_number-3.svg.png',
      //  'https://i.pinimg.com/736x/2c/94/7b/2c947bcaf6ca4b1c37f44f9cff180d01.jpg']
let currentIndex = 0;


function updateImages(){
    for (let i = 0; i < 3; i++) {
        let img = document.getElementById(`pic${i+1}`).querySelector('img');
        const imageIndex = currentIndex + i;

        if (imageIndex < finalPictures.length) {
            img.src = finalPictures[imageIndex];
        }

    }
}

function next() {
  if (currentIndex < finalPictures.length - 3) {
      currentIndex ++;
      updateImages();
  }
}

function prev() {
    if (currentIndex > 0) {
        currentIndex --;
        updateImages();
    }
}

function show() {
    const targetSrc = event.target.src;
    const bigImg = document.getElementById('bigImage');
    bigImg.src = targetSrc;
}

function bigImageInit() {
    const bigImg = document.getElementById('bigImage');
    bigImg.src = finalPictures[0];
}