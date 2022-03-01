import $api from "../instanse"

const answer = {
    get(){

    },
    create(data){
        return $api.post('api/posts/add-answer/', data)
    }
}

export default answer