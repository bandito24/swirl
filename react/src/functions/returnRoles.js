export const extractRoleNames = (project) => {
    const array = []
    project.roles.forEach(position => {
        array.push(position.role)
    })
    return array.join(', ');
}
