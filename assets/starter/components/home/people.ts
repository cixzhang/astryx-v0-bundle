export type Person = {name: string; src: string};

function person(name: string): Person {
  return {name, src: `/people/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`};
}

export const people = {
  ana: person('Ana Thomas'),
  drew: person('Drew Young'),
  jihoo: person('Jihoo Song'),
  margot: person('Margot Schroder'),
  daniela: person('Daniela Gimenez'),
  ami: person('Ami Pena'),
  itai: person('Itai Jordaan'),
  gabriela: person('Gabriela Fernandez'),
  nam: person('Nam Tran'),
  pablo: person('Pablo Morales'),
};
