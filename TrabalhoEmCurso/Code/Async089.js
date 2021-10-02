async function mountUserComponent() {
  try {
    let profile = get('profile.json');
    let avatar = get('avatar.json');
    return new UserComponent(await profile, await avatar);
  } catch (error) {
    // falha em alguma requisição Ajax
  }
}