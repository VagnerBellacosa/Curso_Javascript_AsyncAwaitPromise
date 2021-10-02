function* mountUserComponentGenerator() {
  let profile = yield get('profile.json');
  return new UserComponent(profile);
}
