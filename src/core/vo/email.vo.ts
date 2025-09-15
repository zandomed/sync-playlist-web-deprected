class Email {
  constructor(private readonly value: string) {
    if (!this.validateEmail(value)) {
      throw new Error('Invalid email format');
    }
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  toString(): string {
    return this.value;
  }
}

export default Email;
