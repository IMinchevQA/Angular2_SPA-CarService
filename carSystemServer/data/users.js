const usersById = {}
const usersByEmail = {}

module.exports = {
  total: () => Object.keys(usersById).length,
  save: (user) => {
    const id = Object.keys(usersById).length + 1
    user.id = id
    usersById[id] = user
    usersByEmail[user.email] = user
    let savedUser = {
      id,
      email: usersById[id].email,
      name: usersById[id].name,
    }
    return savedUser
  },
  findByEmail: (email) => {
    return usersByEmail[email]
  },
  findById: (id) => {
    let userById = usersById[id]
    if (!userById) {
      return undefined
    }
    let userFetched = {
      id: id,
      email: userById.email,
      name: userById.name,
      image: userById.image,
      location: userById.location,
      biography: userById.biography
    }
    return userFetched
  },
  updateProfile: (userData, id) => {
    let updatedUser = {
      email: userData.email,
      password: usersById[id],
      name: userData.name,
      image: userData.image,
      location: userData.location,
      biography: userData.biography
    }
    usersById[id] = updatedUser;
    let editedUser = {
      id,
      email: updatedUser.email,
      name: updatedUser.name,
      image: updatedUser.image,
      locations: updatedUser.location,
      biography: updatedUser.biography
    }
    return editedUser;
  }
}
