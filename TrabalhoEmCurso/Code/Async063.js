async function myAsyncFunction(){
    var number = await func1(4);

    console.log('Hello');
    number = await func2(number);

    console.log('World');
    var result = await func3(number);

    console.log(result);
}