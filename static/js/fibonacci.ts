import varsnap from 'varsnap';

// Function for calculating fibonacci numbers
const calculateFibonacci = varsnap(function calculateFibonacci(index) {
  if (index <= 0) {
    return 0;
  }
  if (index == 1 || index == 2) {
    return 1;
  }
  return calculateFibonacci(index - 1) + calculateFibonacci(index - 2);
});

export default calculateFibonacci;
