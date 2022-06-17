const router = require('express').Router()
const { addThought, 
    getAllThoughts,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
 } = require('../../controllers/thought-controller')

// /API/THOUGHTS    
router  
    .route('/')
    .get(getAllThoughts)

// /api/thoughts/thoughtId
router  
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// /api/thoughts/<userId>
router
    .route('/:userId')
    .post(addThought)

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .post(addReaction)

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router  
    .route('/:userId/:reactionId')
    .delete(removeReaction)

module.exports = router