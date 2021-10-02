// retorna o número 5
function example1(){
    return 5;
}

// retorna uma Promise com o valor 5
function example2(){
    return Promise.resolve(5);
}

// faz exatamente o mesmo que a função "example2()"
async function example3(){
    return 5;
}