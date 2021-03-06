const { createPoolCluster } = require('mysql2')
const { User } = require('../models')

const userController = {
    // functions will go here as methods
    
    // get all users
    getAllUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
             console.log(err)
             res.status(400).json(err)
        })
    },
    // get user by id (include thought and friend data)
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            // if no user is found, send a 404
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    },
    // post new user
    createUser({ body }, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    // put to update user by id
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    },
    // delete to remove user by id
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id!' })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
    }
    // BONUS remove a user's associated thoughts when deleted
}



module.exports = userController