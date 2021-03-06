var guessInput = document.querySelector('#user-guess');
var guessOutput = document.querySelector('#guess-output');
var minInput = document.querySelector('#min-input');
var maxInput = document.querySelector('#max-input');
var randomNumber = Math.round((Math.random() * (maxInput.value - minInput.value) + minInput.value));
var guessButton = document.querySelector('#guess-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var setButton = document.querySelector('#set-button');
var instructionsBox = document.querySelector('#instructions');
var lastGuess = document.querySelector('.last-guess')
var currentLevel = document.querySelector('#current-level');
var userMessage = document.querySelector('.user-message');

function pageReset (){
  document.location.reload(true);
}

function setInstructions (){
  instructionsBox.innerText = ('Guess a number between ' + minInput.value + ' and ' + maxInput.value);
}

function setCurrentLevel (){
  currentLevel.innerText = currentLevel.value;
}

function clearInput (){
  guessInput.value = '';
}

function clearOutput () {
  guessOutput.innerText = '';
}

function disableClear() {
  clearButton.disabled = true;
}

function disableReset(){
  resetButton.disabled = true;
}

function enableClear() {
  clearButton.disabled = false;
}

function enableReset(){
  resetButton.disabled = false;
}

function guessEvent() {
  var guessInputParsed = parseInt(guessInput.value);
  var minInputParsed = parseInt(minInput.value);
  var maxInputParsed = parseInt(maxInput.value);
  guessOutput.innerText = guessInputParsed;
  setButton.disabled = true;
  minInput.disabled = true;
  maxInput.disabled = true;

  if (isNaN(guessInputParsed) === true) {
    clearInput();
    clearOutput();
    alert('Please enter a whole number');
    disableClear();
    return;
  }
  if (guessInputParsed < minInput.value || guessInputParsed > maxInput.value) {
    clearInput();
    clearOutput();
    alert('Trying to cheat the system I see... Input a number within ' + minInput.value + ' and ' + maxInput.value);
    disableClear();
    return;
  }
  lastGuess.innerText = 'Your last guess was...';
  if (randomNumber == guessInput.value){
    minInput.value = (minInputParsed - 10);
    maxInput.value = (maxInputParsed + 10);
    randomNumber = Math.round((Math.random() * (maxInputParsed - minInputParsed) + minInputParsed));
    userMessage.innerText = 'Congratulations you guessed it!!';
    setInstructions();
    currentLevel.value++;
    setCurrentLevel();
    clearInput();
    return;
  }
  if (randomNumber < guessInput.value) {
    userMessage.innerText = 'Sorry, that guess is too high. Try a lower number.';
  }
  if (randomNumber > guessInput.value) {
    userMessage.innerText = 'Sorry, that guess is too low. Try a higher number.';
  }
  if (randomNumber !== guessInput.value) {
    clearInput();
  }
};

function setRangeEvent(){
  var minInputParsed = parseInt(minInput.value);
  var maxInputParsed = parseInt(maxInput.value);
  if (isNaN(minInputParsed) === true) {
    alert('Please enter a whole number');
    disableClear();
    return;
  }
  if (isNaN(minInputParsed) === true) {
    alert('Please enter a whole number for the min value');
    disableClear();
    pageReset()
    return;
  }
  if (isNaN(maxInputParsed) === true) {
    alert('Please enter a whole number for the max value');
    disableClear();
    pageReset()
    return;
  }
  if (minInputParsed >= maxInputParsed) {
    alert('Nice try cheater... Min Range must be lower than Max Range.');
    pageReset();
  };
  randomNumber = Math.round((Math.random() * (maxInputParsed - minInputParsed) + minInputParsed));
  setButton.disabled = true;
  minInput.disabled = true;
  maxInput.disabled = true;
  setInstructions();
};

currentLevel.value = 1;
disableClear();
disableReset();
setInstructions();
setCurrentLevel();

guessButton.addEventListener('click', function(){
  guessEvent();
  console.log(randomNumber);
});

guessInput.addEventListener('keydown', function(evt){
  if(evt.keyCode == 13) {
  guessEvent();
  }
});

clearButton.addEventListener('click', function(){
  clearInput();
});

resetButton.addEventListener('click', function(){
  pageReset();
});

setButton.addEventListener('click', function(){
  setRangeEvent();
});

guessInput.addEventListener('keyup', function(){
  if (guessInput.value == '')
  disableClear();
});

guessInput.addEventListener('keypress', function(){
  if (guessInput.value !== '');
  enableClear();
  enableReset();
});
