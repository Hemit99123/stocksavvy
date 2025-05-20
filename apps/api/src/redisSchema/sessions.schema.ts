import {Schema} from "redis-om"

const sessions = new Schema('sess', {
    name:  { type: "string"}, 
    email: {type: "string"},
}, {
    dataStructure: 'HASH'
})

export default sessions