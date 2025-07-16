const name = 'Lucas'
let age = 20;
const hasHobbies = true;

age = 30;

const summarizeUser = (userName, userAge, userHasHobby) =>{
    return (
        'Name is ' +
        userName +
        ', age is ' +
        userAge +
        ' and the user has hobbies: ' +
        userHasHobby
    );
}

const add = (a, b) => {
    return a + b;
}

const addOne = a => a + 1;

const addRandom = () => 1 + 2;



console.log(addOne(1));

console.log(summarizeUser(name, age, hasHobbies));