/* Задание №1 

const peopleWaiting = ["Кристина", "Олег", "Кирилл", "Мария", "Светлана", "Артем", "Глеб"];

function giveParcel(queue) { 
    if (queue.length === 0) return;
    
    const person = queue.shift(); // удаляет первый элемент из массива
    alert(`${person} получил(а) посылку. В очереди осталось ${queue.length} человек.`);
}

function leaveQueueWithoutParcel(queue) {
    if (queue.length === 0) return;
    
    const person = queue.pop(); // удаляет последнего из массива
    alert(`${person} не получил(а) посылку и ушел(ла) из очереди`);
}

giveParcel(peopleWaiting); 
giveParcel(peopleWaiting);
giveParcel(peopleWaiting);

while (peopleWaiting.length > 0) {
    leaveQueueWithoutParcel(peopleWaiting);
}
 */

/* Задание №2 

function getSumOfSequence(number) {
    const sequence = [];
    
    for (let i = 1; i <= number; i++) {
        sequence.push(i); // добавляет i в конец массива sequence
    }
    
    return sequence[0] + sequence[sequence.length - 1];
}

console.log(getSumOfSequence(10));
*/
/* Задание №3 

const coffees = ['Latte', 'Cappuccino', 'Americano'];

const coffeeName = prompt("Поиск кофе по названию:");

const index = coffees.findIndex(coffee => // возвращает индекс первого элемента, удовлетворяющего условию, если нет такого вернёт -1. 
    coffee.toLowerCase() === coffeeName.toLowerCase()
);

if (index !== -1) { 
    alert(`Держите ваш любимый кофе ${coffees[index]}. Он ${index + 1}-й по популярности в нашей кофейне.`);
} else {
    alert("К сожалению, такого вида кофе нет в наличии");
}
*/
/* Задание №4

const coffees = ['Latte', 'Cappuccino', 'Americano'];
const prices = [1.5, 1, 2];

const updatedPrices = prices.map(price => price + 0.5); // создаёт новый массив на основе исходного, каждый элемент — результат выполнения функции

coffees.forEach((coffee, index) => { // перебирает и выполняет для каждого элемента действие 
    alert(`Кофе ${coffee} сейчас стоит ${updatedPrices[index]} евро`); 
});
*/

/* Задание №5 

const clientsEstimations = [];

function askClientToGiveEstimation() {
    const estimation = Number(prompt("Как вы оцениваете нашу кофейню от 1 до 10?"));
    
    if (estimation >= 1 && estimation <= 10) {
        clientsEstimations.push(estimation); // добваляет в конец массива элемент
    }
}

for (let i = 0; i < 5; i++) {
    askClientToGiveEstimation();
}

const goodEstimations = clientsEstimations.filter(estimation => estimation > 5).length;
const notGoodEstimations = clientsEstimations.filter(estimation => estimation <= 5).length;

alert(`Всего положительных оценок: ${goodEstimations}; Всего отрицательных оценок: ${notGoodEstimations}`);
*/
/* Задание №6 

const numbers = [10, 4, 100, -5, 54, 2];

// 1 через цикл for
let sumFor = 0;
for (let i = 0; i < numbers.length; i++) {
    sumFor += numbers[i] ** 3;
}
console.log('for:', sumFor);

// 2 через цикл for of
let sumForOf = 0;
for (let number of numbers) {
    sumForOf += number ** 3;
}
console.log('for of:', sumForOf); 

// 3 через метод forEach
let sumForEach = 0;
numbers.forEach(number => {
    sumForEach += number ** 3;
});
console.log('forEach:', sumForEach); 

// 4 через метод reduce
const sumReduce = numbers.reduce((sum, number) => sum + number ** 3, 0); // сворачивает массив в одно значение, применяя функцию к каждому элементу
console.log('reduce:', sumReduce); 
*/
