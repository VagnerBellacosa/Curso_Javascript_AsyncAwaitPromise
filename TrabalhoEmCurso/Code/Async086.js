let userComponentGenerator = mountUserComponentGenerator();
userComponentGenerator.next().value.then(function(profile) {
    return userComponentGenerator.next(profile).value;
}).then(function(component) {
    // aqui teríamos o componente pronto
});