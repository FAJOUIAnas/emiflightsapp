export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  civility: string;
  birthDate: string;
  address: string;

  constructor(id: string, firstName: string, lastName: string, email: string, civility: string, birthDate: string, address: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.civility = civility;
    this.birthDate = birthDate;
    this.address = address;
  }
}
