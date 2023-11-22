function EsPar(number) {
    return (number % 2) == 0 && (number > 0 && number <= 30);
}

module.exports.EsPar = EsPar;