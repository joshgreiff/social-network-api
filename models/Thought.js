const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }

    },
    {
        toJSON: {
            getters: true
        }
    }
)
const ThoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reactions: [
        ReactionSchema
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
)

// get total amount of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

// create the user model using the UserSchema
const Thought = model('Thought', ThoughtSchema)

// export the user model
module.exports = Thought