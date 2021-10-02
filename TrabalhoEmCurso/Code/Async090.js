async function mountUserComponent() {
  try {
    let profile = get('profile.json');
    return new UserComponent(await profile);
  } catch (error) {
      // falha na requisição Ajax
  }
}