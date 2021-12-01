const Account = require('../model/account')

class AccountRepository{

    insert(obj){
        return Account.create({...obj})
    }

    update(id, obj){
        return Account.update({ ...obj }, { where: { id: id } })
    }

    delete(id){
        return Account.destroy({ where: { id: id} });
    }

    find(id){
        return Account.findAll({
            where: {
                id: id
            },  
        })
    }

    findByUsername(username){
        return Account.findAll({
            where: {
                username: username
            },  
        })
    }

    findByEmail(email){
        return Account.findAll({
            where: {
                email: email
            },  
        })
    }

    findMany(){
        return Account.findAll()
    }

}

module.exports = AccountRepository