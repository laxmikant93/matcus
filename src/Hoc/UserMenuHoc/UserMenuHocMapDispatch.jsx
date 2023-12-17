export const UserMenuMapStateToProps = state => {
    return {
        user: state.user,
        subdomainuser: state.subdomainuser
    }
}