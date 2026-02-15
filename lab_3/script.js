/* Задание №1 
const getName1 = (name) =>{
    return(`Имя равно ${name}`);
}


()=> console.log('test')

const getName2 = function(name) {
    return(`Имя равно ${name}`);
}

function getName3(name) {
    return(`Имя равно ${name}`);
}

console.log(getName1("Алексей"));
console.log(getName2("Женя"));
console.log(getName3("Оля"));
*/

/* Задание №2 

function getSumOfNumbers(numder, type = 'odd') {
    let sum = 0;

    for (let i = 0; i <= numder; i++){
        if (type === 'odd'){
            if (i % 2 != 0){
                sum += i;
            }
        }
        else if (type === 'even'){
            if (i % 2 === 0) {
                sum += i;
            }
        }
        else if (type === ''){
            sum += i;
        }
    }

    return(sum);
}

console.log(getSumOfNumbers(10, 'even'));
*/

/* Задание №3 
function getDivisorsCount(number = 1){
    if (number < 0 || !Number.isInteger(number)) {
        alert(`${number} должен быть целым числом и больше нуля!`);
        return;
    }
    let divisorsCount = 0;
    for (let i = 1; i <= number; i++){
        if (number % i === 0){
            divisorsCount++;
        }
    }
    return divisorsCount;
}

console.log(getDivisorsCount(12));
*/

/* Задание №4 

function checkQuestionAnswer(question, correctAnswer){
    const userAnswer = prompt(question);
    if (userAnswer === null || userAnswer.trim() === '') {
        alert("Ответ не введен!");
        return;
    }

    const normalUserAnswer = userAnswer.trim().toLowerCase();
    const normalCorrectAnswer = correctAnswer.trim().toLowerCase();

    if (normalUserAnswer === normalCorrectAnswer) {
        alert("Ответ верный");
    } else {
        alert("Ответ неверный");
    }
}

checkQuestionAnswer('Арбуз это фрукт или ягода?', 'Ягода');
*/

/* Задание №5 */

function showSuccessMessage(message){
    console.log(message);
}
function showErrorMessage(message){
    console.error(message);
}

function checkTextOnErrorSymbol(text, errorSymbol, successCallback, errorCallback){
    let hasError = false;
    for (let i = 0; i < text.length; i++){
        if (text[i] === errorSymbol){
            errorCallback(`Найден запрещенный символ "${errorSymbol}" под индексом ${i}.`);
            hasError = true;
        }
    }
    if (!hasError){
        successCallback('В данном тексте нет запрещенных символов');
    }
}

const text = "Привет! Как дела! Давно мы с тобой не виделись.";
checkTextOnErrorSymbol(text, 'а', showSuccessMessage, showErrorMessage);