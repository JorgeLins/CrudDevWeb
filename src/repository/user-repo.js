const User = require('../model/User')

class UserRepository{

    constructor(){
        this.users = []
    }

    insert(obj){
        return User.create({...obj})
    }

    update(id, obj){
        return User.update({ ...obj }, { where: { id: id } })
    }

    delete(id){
        return User.destroy({ where: { id: id} });
    }

    find(id){
        return User.findAll({
            where: {
                id: id
            },  
        })
    }

    findMany(){
        return User.findAll()
    }

}

module.exports = UserRepository