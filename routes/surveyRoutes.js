/*const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); //url is default in node,
const mongoose = require('mongoose');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }) //the one who has made the survey
			.select({ recipients: false }); // do not give recipients list

		res.send = surveys;
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks you for voting');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		//console.log(req.body);
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact(events)
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId, // whenever we are passing into mongo we keep _
						recipients: {
							$elemMatch: { email: email, responded: false },
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date(),
					}
				).exec(); //excutes the query but does not send that into database, we dont need to send to sendgrid so we dont keep async
			})
			.value();

		res.send({});
	});

	//destructuring according to es6
	/*const events = _.map(req.body, ({email, url})=>{
        const pathname= new URL(url).pathname;
        const p = new Path('/api/surveys/:surveyId/:choice')    // url extraction without domain
        //console.log(p.test(pathname));
        const match = p.test(pathname);
        if (match){
            return {email, surveyId:match.surveyId, choice: match.choice};


          // second clean up 

        app.post('/api/surveys/webhooks', (req,res)=> {
            
            const p = new Path('/api/surveys/:surveyId/:choice')    // url extraction without domain

        const events = _.chain(req.body)        
            .map(({email,url})=>{
                const match = p.test(new URL(url).pathname);
                if (match){
                    return {email, surveyId:match.surveyId, choice: match.choice};
                }
            })
            .compact(events)               
            .uniqBy( 'email', 'surveyId')
            .value();
    
        console.log(events);

            //other way

        const events = _.map(req.body, (event)=>{
            const pathname= new URL(event.url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice')    // url extraction without domain
            //console.log(p.test(pathname));
            const match = p.test(pathname);
            if (match){
                return {email: event.email, surveyId:match.surveyId, choice: match.choice};
                

            }
        });
        const compactEvents = _.compact(events);                 //
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        
        console.log(uniqueEvents);

    });



    
        }

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body; // access to differernt property

		//creating the instances of Survey in memory
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({email: email.trim() })),
			_user: req.user.id,   //id is generated by mongoose
			dateSent: Date.now(),
		});
		   // ES6 title body:body => body only

		//Es6 . map (email=> ({ email }))   bracket for shortened object , if not js intrepreter will think as function
		//array of strings... for evey email add return object... with the property email that points out the user email

		//Great place to send email
		const mailer = new Mailer(survey, surveyTemplate(survey)); // 1st parameter is  object and 2nd parameter is html

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save(); // this is the user from now onwards

			res.send(user);
		} catch (err) {
			res.status(422).send(err); // something is wrong that you sent us
		}
	});
}; */

// Web hook: It is anything where some outside API is fascilitating some process and gives our application somekind of callback.(SANDHOOK)



const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};