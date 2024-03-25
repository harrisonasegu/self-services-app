export class InputRegex {
  static email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  static password = {
    hasLowerCaseChar: /^(?=.*[a-z])/,
    hasUpperCaseChar: /^(?=.*[A-Z])/,
    hasNumberChar: /^(?=.*\d)/,
    hasSymbolChar: /[^\w\s]|_/
  }

  static phoneNumber = /^\d{0,11}$/

  static accountNumber = /^\d{0,10}$/

  static otp = /^\d{0,6}$/

  static allowedAmountInput = /^[1-9][0-9]{0,100}$/
}
