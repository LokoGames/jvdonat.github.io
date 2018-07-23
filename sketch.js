let r,g,b;
let selector, button;
let selected;
let database;
function pickColor(){
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r,g,b);
}
function setup() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAF70CzJUH6UWFXoqA69N86O7YJJYp6CU8",
    authDomain: "colors-f897d.firebaseapp.com",
    databaseURL: "https://colors-f897d.firebaseio.com",
    projectId: "colors-f897d",
    storageBucket: "",
    messagingSenderId: "425996434527"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  pickColor();
  selector = createSelect();

  selector.option("blue-ish");
  selector.option("brown-ish");
  selector.option("gray-ish");
  selector.option("green-ish");
  selector.option("purple-ish");
  selector.option("pink-ish");
  selector.option("red-ish");
  selector.option("yellow-ish");
  button = createButton('submit');
  button.mousePressed(send);
}
function draw() {
  selected = selector.value();
}
function send(){
  console.log(selected);
  pickColor();
  let colorDb = database.ref('Colors');
  var data = {
    r:r,
    g:g,
    b:b,
    label: selected
  }
  console.log("saving data");
  console.log(data);
  let color = colorDb.push(data, finished);
  console.log("Firebase generated key: " + color.key);
  function finished(err) {
    if(err){
      console.error("ooops, something went wrong");
      console.error(err);
    }else {
      console.log("Data saved successfully");
    }
  }
}
