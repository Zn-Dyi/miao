
function isPrime(n) {
  for (var i = 2; i < n / 2; i++) {
    if (n % 2 == 0) {
      return false
    }
  }
  return true
}

module.exports = isPrime



