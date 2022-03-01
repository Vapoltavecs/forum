import $api from "../instanse"

const auth = {
    get() {
        return $api.get('api/user/profile')
    },
    create(email, password) {
        return $api.post('api/user/token-create/', {
            email, password
        })
    }
}


export default auth