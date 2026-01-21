/* Задания №1, 2
const myName = "Вероника";
const programmingLanguage = "JavaScript";
const courseCreatorName ="Никаиты Михайловича";
const reasonText = "думаю, что буду работать в этой сфере в будущем";
const numberOfMonth = "7";

let myInfoText = (`Всем привет! Меня зовут ${myName}. Сейчас я изучаю язык программирования ${programmingLanguage} на курсе по ${programmingLanguage} y ${courseCreatorName}.

Я хочу стать веб-разработчиком, потому что ${reasonText}. До этого я изучал(а) ${programmingLanguage} ${numberOfMonth} месяцев. Я уверен(а), что пройду данный курс до конца!`)

myInfoText = myInfoText.replaceAll(programmingLanguage, programmingLanguage.toUpperCase());

console.log(myInfoText)
console.log(myInfoText.length)
console.log(myInfoText.charAt(0))
console.log(myInfoText.charAt(308))
*/


/* Задание №3, 4
let userName = prompt("Как вас зовут?");
userName = userName.toLowerCase();
userName = userName.trim();

let userAge = prompt("Сколько вам лет?");
userAge = userAge.trim();
userAge = Number(userAge);

alert(`Вас зовут ${userName} и вам ${userAge} лет`);
*/

/* Задание №5
let userString = prompt("Введите текст для обрезки").trim();
let startSliceIndex = Number(prompt("Введите индекс, с которого нужно начать обрезку строки"));
let endSliceIndex = Number(prompt("Введите индекс, которым нужно закончить обрезку строки"));

userString = userString.substring(startSliceIndex, endSliceIndex);

alert(`Результат: ${userString}`);
*/

/* Задание №6 */
let userText = prompt("Введите текст").trim();
let wordFromText = prompt("Введите слово из текста").trim();
let indexOfWord = userText.indexOf(wordFromText);

userText = userText.substring(0, indexOfWord)

alert(`Результат: ${userText}`);