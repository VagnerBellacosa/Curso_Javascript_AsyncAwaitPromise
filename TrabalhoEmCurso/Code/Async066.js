function example1(){  
    return func1(4)
        .then(func2)
        .then(func3);
}

async function example2(){  
    var number = await func1(4);
    number = await func2(number);
    number = await func3(number);
    return number;
}

// ou
async function example3(){  
    return func3(await func2(await func1(4)))
}