class UUID {
  constructor(private readonly value: string) {}

  toString(): string {
    return this.value;
  }

  static create(): UUID {
    return new UUID(crypto.randomUUID());
  }
}
export default UUID;
