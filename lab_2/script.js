/* Задание №1 */
const existedUserLogin = "the_best_user";
const existedUserPassword = 12345678;

let UserLogin = prompt("Введите логин").trim();
let UserPassword = prompt("Введите пароль").trim();

if (UserLogin === existedUserLogin && UserLogin === existedUserLogin){
    alert(`Добро пожаловать, ${UserLogin}`)
} else {
    alert(`Логин и(или) Пароль введены неверно!`)
}


/* Задание №2 
const answer1 = 4;
const answer2 = 4;
const answer3 = 1;
const answer4 = 12;
const answer5 = 6;
let correctAnswers = 0;
let incorrectAnswers = 0;

let userAnswer1 = Number(prompt("Тест по математике. Вопрос 1: Сколько будет 2 + 2 ?"));
userAnswer1 === answer1 
? (alert('Ответ верный'), correctAnswers++) 
: (alert('Ответ неверный'), incorrectAnswers++);

let userAnswer2 = Number(prompt("Вопрос 2: Сколько будет 2 * 2 ?"));
userAnswer2 === answer2 
? (alert('Ответ верный'), correctAnswers++) 
: (alert('Ответ неверный'), incorrectAnswers++);

let userAnswer3 = Number(prompt("Вопрос 3: У Пети было 5 яблок. 3 из них он съел, 1 отдал другу. Сколько яблок у Пети осталось?"));
userAnswer3 === answer3 
? (alert('Ответ верный'), correctAnswers++) 
: (alert('Ответ неверный'), incorrectAnswers++);

let userAnswer4 = Number(prompt("Вопрос 4: У Маши было 10 конфет. 2 она съела, 1 отдала другу. После мама дала Маше еще 5 конфет. Сколько в итоге конфет осталось у Маши?"));
userAnswer4 === answer4 
? (alert('Ответ верный'), correctAnswers++) 
: (alert('Ответ неверный'), incorrectAnswers++);

let userAnswer5 = Number(prompt("Вопрос 5: Сколько будет 2 + 2 * 2?"));
userAnswer5 === answer5 
? (alert('Ответ верный'), correctAnswers++) 
: (alert('Ответ неверный'), incorrectAnswers++);

alert(`Конец теста! Правильные ответы - ${correctAnswers}; Неправильные ответы - ${incorrectAnswers}.`)
 */

/* Задание №3 
let result1 = confirm('JavaScript появился в 1995 году? ');
if (result1 === true){
    alert('Верно');
    }
    else {
        alert('Да');
    }

let result2 = confirm('Спецификация JavaScript называется ECMAScript?');
if (result2 === true){
    alert('Верно');
    }
    else {
        alert('Да');
    }

let result3 = confirm('JavaScript был создан за 1 месяц?');
if (result3 === false){
    alert('Верно');
    }
    else {
        alert('Нет, за 10 дней.');
    }
*/

/* Задание №4 
let i = 0;
while (i < 3) {
    let newStudent = prompt("Введите имя нового студента!"); 
    newStudent = newStudent.trim();
    if (newStudent) {
        alert(`Добро пожаловать, ${newStudent}!`)
    }
    i += 1;
}

do {
    let newStudent2 = prompt("Введите имя нового студента!"); 
    newStudent2 = newStudent2.trim();
    if (newStudent2) {
        alert(`Добро пожаловать, ${newStudent2}!`)
    }
    i += 1;
} while (i < 3);

*/

/* Задание №5 
let sum = 0;
for (let i = 1; i <= 100; i++) {
    sum += i;
}
alert(sum);
*/

/* Задание №6, 7 
let clientName = "Игорь";
let clientSpentForAllTime = 110;
let clientSpentToday = 25;
let discount = 0;
*/
/*
let clientName = prompt("Введите имя клиента");
let clientSpentForAllTime = Number(prompt("Сколько клиент потратил за всё время?"));
let clientSpentToday = Number(prompt("Сколько клиент потратил сегодня?"));

if (isNaN(clientSpentToday) && isNaN(clientSpentForAllTime)) {
    alert("Сумма, которую клиент потратил за все время и которую потратил сегодня, должна быть числом! Перезагрузите страницу, чтобы повторить попытку.");
} else {
    let discount = 0;

    if (clientSpentForAllTime >= 100 && clientSpentForAllTime < 300){
        discount = 10;
        }
        else if (clientSpentForAllTime >= 300 && clientSpentForAllTime < 500){
            discount = 20;
        }
        else if (clientSpentForAllTime >= 500){
        discount = 30;
    }

    alert(`Вам предоставляется скидка в ${discount}%!`);
    const todayWithDiscount = clientSpentToday * (1 - discount / 100);
    clientSpentForAllTime += todayWithDiscount;

    alert(`Спасибо, ${clientName}! К оплате ${todayWithDiscount}$. За все время в нашем ресторане вы потратили ${clientSpentForAllTime}$.`);
}
*/
