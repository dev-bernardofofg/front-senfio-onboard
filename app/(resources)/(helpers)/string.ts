export const FN_UTILS_STRING = {
  avatarUser: (name: string) => {
    return name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  },
}
