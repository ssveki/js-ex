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

/* Задание №7 */

const goals = [8, 1, 1, 3, 2, -1, 5];

// 1 самый результативный матч
let maxGoals = goals[0];
let maxIndex = 0;
for (let i = 1; i < goals.length; i++) {
    if (goals[i] > maxGoals) {
        maxGoals = goals[i];
        maxIndex = i;
    }
}
alert(`Самый результативный матч был под номером ${maxIndex + 1}. В нем было забито ${maxGoals} гол(ов).`);

// 2 самые нерезультативные игры
const validGoals = goals.filter(goal => goal >= 0);
const minGoals = Math.min(...validGoals);
const minIndexes = [];
for (let i = 0; i < goals.length; i++) {
    if (goals[i] === minGoals) {
        minIndexes.push(i + 1);
    }
}
alert(`Самые нерезультативные матчи были под номерами ${minIndexes.join(', ')}. В каждом из них было забито по ${minGoals} мячу(а).`);

// 3 общее количество голов за сезон
const totalGoals = validGoals.reduce((sum, goal) => sum + goal, 0);
alert(`Общее количество голов за сезон равно ${totalGoals}`);

// 4 были ли автоматические поражения
const hasAutoDefeats = goals.some(goal => goal < 0);
alert(`Были автоматические поражения: ${hasAutoDefeats ? 'да' : 'нет'}`);

// 5 среднее количество голов за матч
const averageGoals = Math.round(totalGoals / validGoals.length);
alert(`Среднее количество голов за матч равно ${averageGoals}`);

// 6 отсортированные голы
const sortedGoals = [...goals].sort((a, b) => a - b);
alert(sortedGoals.join(', '));





