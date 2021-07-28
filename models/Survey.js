const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipients');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }, // ibelongto user will tell mongoose that reference made earlier (object_id) belongs to users collection
	// _ referes to as reference field that sets up the relationship between a given schema and given user
	// this user is the one who has made the survey
	// _ is relationship field
	dateSent: Date,
	lastResponded: Date,
});

//name of the model class is surveys and second is the schema name
mongoose.model('surveys', surveySchema);
// hello this is the change