const mongoose=require('mongoose');
const SubscriptionModel=require('../model/subscription');

module.exports=(req,res)=>{

    const subscriptionModel = new SubscriptionModel(req.body);

    SubscriptionModel.find({endpoint:subscriptionModel.endpoint},(err,doc)=>{


     if(doc.length){
         res.json({
             data:"Subscription Already exit"
         })


     }

     else{
        subscriptionModel.save((err, subscription) => {
            if (err) {
                console.log("hello")
                console.error(`Error occurred while saving subscription. Err: ${err}`);
                res.status(500).json({
                    error: ' error occurred'
                });
            } else {
                res.json({
                    data: 'Subscription saved.'
                });
            }
        });
     }

    
    })
   

}