function* infiniteLoopGenerator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}