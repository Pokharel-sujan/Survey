

Survey.updateOne ({
    id:surveyid,
    recipients: {
        $elemMatch: {email:email, responded:false}
    }
}, {
    $inc: {[choice]:1},
    $set: {'recipients.$.responded':true}
})
// hello this is the change