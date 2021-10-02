function mountUserComponent() {
  return Promise.all([
    get('profile.json'),
    get('avatar.json')
  ]).then(function (responses) {
    profile = responses[0];
    avatar = responses[1];
    new UserComponent(profile, avatar);

  }, function onRejected() {
    // falha em alguma requisição Ajax
  });
}