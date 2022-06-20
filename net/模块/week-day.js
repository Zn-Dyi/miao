




var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday"
]
module.exports.name = function (number) {
  return names[number]
}
module.exports.number = function (name) {
  return names.indexOf(name)
}
