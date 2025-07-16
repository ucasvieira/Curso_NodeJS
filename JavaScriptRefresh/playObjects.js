const person = {
    name: 'Lucas',
    age: 19,
    greet() {
        console.log('Olá, eu sou ' + this.name);
    },
};

const printName = ({ name }) => {
    console.log(name);
};

printName(person);

const { name, age } = person;
console.log(name, age);



// const copiedPerson = { ...person };
// console.log(copiedPerson);

const hobbies = ['Sports', 'Cooking'];

let [primeiro,segundo] = hobbies;
console.log(primeiro,segundo);

// for (const hobby of hobbies) {
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => 'Hobby: ' + hobby + '!!'));
// console.log(hobbies);

// person.greet();

// hobbies.push('Programming');
// console.log(hobbies);

// const copiedArray = [...hobbies];
// console.log(copiedArray);

// const toArray = (...args) => {
//     return args;
// };

// console.log(toArray(1, 2, 3,4,5,6));


