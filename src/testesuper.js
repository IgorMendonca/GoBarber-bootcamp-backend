class Pessoa {
  constructor(name) {
    this.name = name;
    this.andar(this.name);
  }

  andar(name) {
    return `${name} está andando`;
  }
}

export default Pessoa;
