import $api from "../instanse"
const question = {
    get(id) {
        return $api.get(`/api/posts/question/${id}`)
    }
}

export default question