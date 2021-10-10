function getObjectSum(obj) {
    let sum = 0;
    for (let value of Object.values(obj)) {
        if (typeof value == 'number')
            sum += value;
        if (typeof value == 'object')
            sum += getObjectSum(value)
    }
    return sum;
}
const  formatter= new Intl.NumberFormat('hi-IN', {
    style: 'currency',
    currency: 'INR',
    notation: "standard",
    currencySign: "accounting"
});

function formatCurrency(value){
    return formatter.format(value)
}

module.exports = {
    formatter,
    formatCurrency,    
    getObjectSum,
}