export class Email {
  private _email: string;

  constructor(email: string) {
    if (!Email.isValidEmail(email)) {
      throw new Error('Invalid email');
    }
    this._email = email;
  }

  getValue(): string {
    return this._email;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    return emailRegex.test(email.toLowerCase());
  }
}
