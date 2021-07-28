const mongoose = require('mongoose');

//the mongoose object has the property Schema, take that property and assign to new variable schema, curly bracket
const {Schema}= mongoose;     // const Schema = mongoose.Schema  both are same

const userSchema = new Schema({
    googleId: String,
    credits: {type: Number, default:0}
});
//mongoose will create collection "user" if there is not; will not over-ride the data
mongoose.model('users', userSchema);
// hello this is the change