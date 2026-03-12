/* Задание №1 
const users = [
    {
        username: 'David',
        status: 'online',
        lastActivity: 10
    },
    {
        username: 'Lucy',
        status: 'offline',
        lastActivity: 22
    },
    {
        username: 'Bob', 
        status: 'online', 
        lastActivity: 104
    }
]

const onlineUsers = users.filter(user => user.status === 'online');
const usersOnlineNames = onlineUsers.map(user => user.username).join(', ');
alert(`Сейчас в онлайн следующие пользователи: ${usersOnlineNames}`);
*/

/* Задание №2 
function giveTalonsInOrder(patients, orders) {
    return orders.map(orderId => {
        return patients.find(patient => patient.id === orderId)
    })
}

const ordersArr = [4, 2, 1, 3];
const people = [
    {id: 1, name: "Максим"},
    {id: 2, name: "Николай"},
    {id: 3, name: "Ангелина"},
    {id: 4, name: "Виталий" },
];
const result = giveTalonsInOrder(people, ordersArr);
console.log('result', result);
*/

/* Задание №3 
function handleObject (obj, key, action) {
    if (action === 'get') {
        return obj[key];
    }
    else if (action === 'add') {
        obj[key] = "";
    }
    else if (action === 'delete'){
        delete obj[key];
    }
    return obj;
}

const student = {
    name: 'Maxim',
    programmingLanguage: 'JavaScript',
}

const result = handleObject (student, 'programmingLanguage', 'delete');
console.log('result', result);
*/

/* Задание №4 
function giveJobToStudent(student, jobName) {
    const updatedStudent = Object.assign({}, student, {job: jobName});
    alert(`Поздравляем! У студента ${updatedStudent.fullName} появилась новая работа! Теперь он ${jobName}.`)
    return updatedStudent;
}

const student = {
    fullName: 'Максим',
    experienceInMonths: 12,
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
}

const updatedStudent = giveJobToStudent(student, 'веб-разработчик');
*/

/* Задание №5 
const groceries = {
    "Orange Juice": {
        price: 1.5,
        discount: 10,
    },
    "Chocolate": {
        price: 2,
        discount: 0,
    },
}

function getTotalPriceOfShoppingBag(shoppingBag){
    let totalPrice = 0;
    
    shoppingBag.forEach(item => {
        const productInfo = groceries[item.product];
        const priceWithDiscount = productInfo.price * (100 - productInfo.discount) / 100;
        totalPrice += priceWithDiscount * item.quantity;
    });
    
    return Number(totalPrice.toFixed(2));
}

const shoppingBag = [
    {product: "Chocolate", quantity: 3},
    {product: "Orange Juice", quantity: 23}
];

const totalPrice = getTotalPriceOfShoppingBag(shoppingBag);
console.log('totalPrice', totalPrice);
*/

/* Задание №6 */
function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hero = {
    name: 'Batman',
    health: 100,
    heatEnemy: function(enemy) { enemy.health -= 10; }
}
const enemy = {
    name: 'Joker',
    health: 100,
    heatHero: function(hero) { hero.health -= 10; }
}

function startGame (heroPlayer, enemyPlayer){
    while (heroPlayer.health > 0 && enemyPlayer.health > 0) {
        const random = getRandomNumberInRange(0, 1);
        if (random === 0){
            heroPlayer.heatEnemy(enemyPlayer);
        }
        else {
            enemyPlayer.heatHero(heroPlayer);
        }
    }
    const winner = heroPlayer.health > 0 ? heroPlayer : enemyPlayer;
    alert (`${winner.name} победил! У него осталось ${winner.health} здоровья.`)
}

startGame (hero, enemy);