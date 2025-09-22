/* Уровень 1

const name = prompt("Введите имя: ");
const surname = prompt("Введите фамилию: ");
const age = Number(prompt("Введите возраст: "));

console.log(`Привет, ${name} ${surname}! Тебе ${age} лет.`);
*/


/* Уровень 2

const num = prompt("Введите число: ");

if (isNaN(num)) {
    console.log(`${num} не число`)
} else {
    if (num % 2 === 0) {
        console.log(`Число ${num} чётное`)}
    else {
        console.log(`Число ${num} нечётное`)
    }
}
*/


/* Уровень 3 */

const name = prompt("Введите имя: ");
const age = Number(prompt("Введите возраст: "));

if (age < 18) {
        console.log(`Привет, ${name}! Ты ещё школьник.`)}
    else if (age < 65){
        console.log(`Привет, ${name}! Ты взрослый человек, заходи.`)
    }
    else {
        console.log(`Привет, ${name}! Для возрастных лиц у нас скидки.`)
    }