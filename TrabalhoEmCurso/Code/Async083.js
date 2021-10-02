async function mountUserComponent() {
  try {
    let profile = await get('profile.json');
    return new UserComponent(profile);
  } catch (error) {
      // falha na requisição Ajax
  }
}