const router = require('express').Router()

const{ addFriend, removeFriend } = require('../../controllers/friend-controller')

router.route('/:userId/:friendId')
    .put(addFriend)

router.route('/:friendId')
    .put(removeFriend)

module.exports = router