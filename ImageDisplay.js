let finalPictures = JSON.parse(localStorage.getItem('savedPictures')) || [];
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