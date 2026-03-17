/* Задание №1 

const addZero = (numberStr) => String(numberStr).length === 1 ? `0${numberStr}` : String(numberStr);

const getDateFormat = (date, separator = '.') => {
    const dateItem = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dateArray = [dateItem, month + 1, year].map((item) => addZero(item));
    return dateArray.join(separator);
}
console.log(getDateFormat(new Date()));
*/

/* Задание №2 
const convertMsToDays = (milliseconds) => {
    const days = milliseconds / (1000 * 60 * 60 * 24);
    return Math.round(days);
}

const getDaysBeforeBirthday = (nextBirthdayDate) => {
    const currentDate = new Date();
    const differenceMs = nextBirthdayDate - currentDate;
    return convertMsToDays(differenceMs);
}

const today = new Date();
const nextBirthday = new Date(today.getFullYear(), 6, 2);

console.log(`Сегодня:${today}\n
День рождения:${nextBirthday}\n
Дней до дня рождения: ${getDaysBeforeBirthday(nextBirthday)}`);
*/

/* Задание №3 
const addDays = (date, days = 1) => {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

const today = new Date();
console.log('Сегодня:', today);
console.log('Через 7 дней:', addDays(today, 7));
console.log('Через 1 день:', addDays(today));
*/

/* Задание №4 */
const allowVisa = (clients) => {
    const currentDate = new Date();
    
    return clients.filter(client => {
        if (client.criminalRecord) return false;
        
        const [day, month, year] = client.passportExpiration.split('.').map(Number);
        const expirationDate = new Date(year, month - 1, day);
        
        return currentDate < expirationDate;
    });
}

const peopleWithVisa = [
    {
        firstName: 'Stasia',
        lastName: 'Ward',
        criminalRecord: true,
        passportExpiration: '19.06.2027',
    },
    {
        firstName: 'Elliot',
        lastName: 'Baker',
        criminalRecord: false,
        passportExpiration: '04.06.2028',
    },
    {
        firstName: 'Leighann',
        lastName: 'Scott',
        criminalRecord: true,
        passportExpiration: '31.07.2026',
    },
    {
        firstName: 'Nick',
        lastName: 'Pop',
        criminalRecord: false,
        passportExpiration: '31.12.2027',
    },
];
const result = allowVisa(peopleWithVisa);
console.log('result', result);