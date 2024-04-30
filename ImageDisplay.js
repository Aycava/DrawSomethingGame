//gets pictures array from local storage
const totalPictures = localStorage.getItem("drawingNumber")
let currentIndex = 1;

//updates the image display with the current 3 images that should be there
function updateImages(){
    for (let i = 0; i < 3; i++) {
        let img = document.getElementById(`pic${i+1}`).querySelector('img');
        const imageIndex = currentIndex + i;

        if (imageIndex < totalPictures + 1) {
            img.src = localStorage.getItem("drawing" + imageIndex);
        }

    }
}
//checks that we aren't going to be left with empty pictures, displays the next picture on the rightmost slot
function next() {
  if (currentIndex < totalPictures - 2 ) {
      currentIndex ++;
      updateImages();
  }
}
//checks that we aren't going too far back, displays the previous picture on the rightmost slot
function prev() {
    if (currentIndex > 1) {
        currentIndex --;
        updateImages();
    }
}
//sets the selected image to bigImage
function show() {
    const targetSrc = event.target.src;
    const bigImg = document.getElementById('big-image');
    bigImg.src = targetSrc;
}
//makes sure the bigImage is set to the first image value
function bigImageInit() {
    const bigImg = document.getElementById('big-image');
    bigImg.src = localStorage.getItem("drawing1");
}
//sets up event listeners to allow user to navigate the images, also allows user to click on any little image to display it in the big image
document.getElementById("next").addEventListener("click", next);

document.getElementById("prev").addEventListener("click", prev)

document.getElementById("pic1").addEventListener("click", show);

document.getElementById("pic2").addEventListener("click", show);

document.getElementById("pic3").addEventListener("click", show);