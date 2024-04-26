let currentDrawing = 0;
let savedPictures = [];
const topics = [
    "Apple", "Banana", "Car", "Dog", "Elephant", "Flower", "Giraffe", "House", "Ice cream", "Jellyfish",
    "Kangaroo", "Lion", "Mountain", "Nest", "Owl", "Penguin", "Queen", "Robot", "Snake", "Tree",
    "Umbrella", "Violin", "Whale", "Xylophone", "Yacht", "Zebra", "Beach", "Cityscape", "Desert",
    "Eagle", "Forest", "Guitar", "Harbor", "Island", "Jungle", "Kite", "Lighthouse", "Mushroom", "Night",
    "Ocean", "Palm Tree", "Quilt", "River", "Sunset", "Tulip", "Unicorn", "Volcano", "Waterfall", "X-ray",
    "Yellow", "Zoo", "Acorn", "Ballet Dancer", "Cowboy", "Dragon", "Elf", "Firefighter", "Ghost", "Helmet",
    "Ink", "Jester", "Knight", "Lamp", "Magnet", "Noodle", "Orchestra", "Pirate", "Quiver", "Racquet",
    "Scarecrow", "Tornado", "Urchin", "Van", "Witch", "Explorer", "Yoga", "Zen Garden", "Actor", "Bridge",
    "Carnival", "Dumpling", "Empire", "Fountain", "Gnome", "Hammock", "Igloo", "Jacket", "Key", "Lemon",
    "Mirror", "Nebula", "Oboe", "Peacock", "Quartz", "Rodeo", "Sphinx", "Teacup", "Ukulele", "Vase",
    "Windmill", "Xenon", "Yard", "Zeppelin", "Arch", "Bucket", "Cupcake", "Dinosaur", "Easel", "Feather",
    "Globe", "Helmet", "Iris", "Jalapeño", "Koala", "Lobster", "Marshmallow", "Narwhal", "Octopus", "Paddle",
    "Quiche", "Rose", "Spaceship", "Tiger", "Umbrella", "Visor", "Wagon", "Xylophone", "Yogurt", "Zucchini",
    "Accordion", "Bonsai", "Cactus", "Drum", "Eggplant", "Flamingo", "Gazebo", "Harp", "Iceberg", "Jackal",
    "Kiwi", "Lemur", "Mango", "Nest", "Ostrich", "Parrot", "Quail", "Raspberry", "Strawberry", "Teapot",
    "Umpire", "Vanilla", "Waffle", "Xerus", "Yucca", "Zither", "Astrolabe", "Bamboo", "Chameleon", "Dove",
    "Egg", "Fig", "Gargoyle", "Hydrant", "Impala", "Jug", "Kiln", "Lilac", "Moose", "Neptune", "Olive",
    "Pumpkin", "Quill", "Rabbit", "Salamander", "Tomato", "Udon", "Violet", "Walrus", "Xenopus", "Yak",
    "Zodiac", "Albatross", "Boomerang", "Cyclone", "Daffodil", "Engine", "Frog", "Grasshopper", "Hibiscus",
    "Ivy", "Jigsaw", "Kettle", "Lynx", "Mandrill", "Nutcracker", "Ocelot", "Padlock", "Quasar", "Rhinoceros",
    "Seahorse", "Turnip", "Urchin", "Vent", "Wallaby", "X-ray Fish", "Yam", "Zipline", "Angelfish", "Bobcat",
    "Croissant", "Dahlia", "Emu", "Ferris Wheel", "Gecko", "Honeycomb", "Icicle", "Jackrabbit", "Komodo Dragon",
    "Lava", "Macaw", "Nectarine", "Opal", "Panda", "Quokka", "Reindeer", "Squirrel", "Truffle", "Uakari"];

const numberOfDrawings = parseInt(localStorage.getItem('drawing_number'));
let game_clock = setInterval(tick, 1000);
let selectedTopics = [];
if (selectedTopics.length === 0)
{
    getTopics();
}
//using this method for persistence, I want the drawings to still exist if the session is reset
let final_drawings = new Array(numberOfDrawings);
function start_drawing() {
    game_clock = setInterval(tick, 1000);
    currentDrawing = 0;
    next_drawing();
}

function next_drawing() {

    if  (currentDrawing !== 0) {
        save_drawing(currentDrawing);
    }

    document.getElementById('topic').innerHTML = selectedTopics[currentDrawing];
    currentDrawing++;


    if (currentDrawing > numberOfDrawings) {
        done_drawing();
    }

    if (!load_drawing(currentDrawing)) {
        console.log('no drawing, making new one' + currentDrawing);
        final_drawings.push('drawing' + currentDrawing);
        fillCanvas();
    }

}

function done_drawing() {
    clearInterval(game_clock);
    currentDrawing = 0;
    window.location.href = "RepeatPage.html";
}

function load_drawing(d_index) {
    const curURL = savedPictures[currentDrawing];

    if (curURL) {
        const img = new Image();
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };

        img.src = curURL;
        return true;
    } else {
        console.error('Can\'t load drawing');
        return false;
    }

}

function save_drawing() {
    const picURL = canvas.toDataURL('image/png');
    savedPictures.push(picURL);
    localStorage.setItem('savedPictures', JSON.stringify(savedPictures));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getTopics() {
    let blacklist = [];
    for (let i = 0; i < numberOfDrawings; i++) {
        let randomSelection;
        do {
            randomSelection = Math.floor(Math.random() * topics.length);
        } while (blacklist.includes(randomSelection));

        selectedTopics[i] = topics[randomSelection];
        blacklist.push(randomSelection);
    }
}











