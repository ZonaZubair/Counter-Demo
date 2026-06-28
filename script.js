// This whole thing is a closure example.
// "count" lives inside createCounter() and stays private —
// the only way to change it is through the functions returned below.
// This is what "closures" means: a function remembering the
// variables from the place it was created in, even after that
// outer function has finished running.

function createCounter() {
  let count = 0; // private variable, not accessible from outside

  return {
    increase: function (step) {
      count += step;
      return count;
    },
    decrease: function (step) {
      count -= step;
      return count;
    },
    reset: function () {
      count = 0;
      return count;
    }
  };
}

const counter = createCounter();

// Grabbing the elements we need from the DOM
const countDisplay = document.getElementById('count');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const stepInput = document.getElementById('stepInput');

// Reads the step size from the input box.
// Falls back to 1 if the input is empty or invalid.
function getStep() {
  const value = parseInt(stepInput.value, 10);
  return isNaN(value) || value < 1 ? 1 : value;
}

// Updates the number on screen and changes color based on value.
// This is the "DOM manipulation" part — directly changing what's
// shown on the page based on JS logic.
function updateDisplay(value) {
  countDisplay.textContent = value;

  countDisplay.classList.remove('positive', 'negative');
  if (value > 0) countDisplay.classList.add('positive');
  if (value < 0) countDisplay.classList.add('negative');
}

// Event listeners — this is "handling events".
// Each button click calls the counter's functions and
// updates what the user sees.
increaseBtn.addEventListener('click', () => {
  const newValue = counter.increase(getStep());
  updateDisplay(newValue);
});

decreaseBtn.addEventListener('click', () => {
  const newValue = counter.decrease(getStep());
  updateDisplay(newValue);
});

resetBtn.addEventListener('click', () => {
  const newValue = counter.reset();
  updateDisplay(newValue);
});

// Extra feature: arrow keys also work as shortcuts.
// -> increases, <- decreases, using the same step size.
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    updateDisplay(counter.increase(getStep()));
  }
  if (event.key === 'ArrowLeft') {
    updateDisplay(counter.decrease(getStep()));
  }
});
