const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys= require('../config/keys');

class Mailer extends helper.Mail{
    constructor({subject,recipients},content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html',content);
        this.recipients= this.formatAddresses(recipients);
        // recipients will be gonna be array of helper.Email below with email as prop

        this.addContent(this.body); // from helper  mail
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email})=>{
            return new helper.Email(email);
        });
    }
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking= new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    addRecipients(){
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient =>{
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    async send(){
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: '/v3/mail/send',
            body:this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}


//when we have javascript class,and call new automatically there has to be constructor : es2015 classes

// when there is like (new Mailer(...) , automatically there should be constructor, new )

module.exports = Mailer;
// hello this is the change