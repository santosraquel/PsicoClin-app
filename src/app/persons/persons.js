export class Person {
  constructor () {
    this.name = ''
    this.phones = []
    this.rg = ''
    this.cpf = ''
    this.emails = ['']
    this.address = [new Address()]
  }
}

export class Address {
  constructor () {
    this.zipCode = ''
    this.number = ''
    this.street = ''
    this.neighborhood = ''
    this.city = 'Paranavaí'
    this.estate = 'PR'
    this.complement = ''
  }
}
