import $api from "../instanse"
export const user = {
    get() {
        return $api.get('api/user/profile')
    },
    create(data) {
        return $api.post('/api/auth/users/', data)
    }
}