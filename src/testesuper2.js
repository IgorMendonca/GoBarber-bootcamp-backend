import Pessoa from './testesuper';

class Developer extends Pessoa {
  constructor(name) {
    super(name);
  }
}

const teste = new Developer('Prog');

console.log(teste.andar(teste.name));
