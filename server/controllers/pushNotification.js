const mongoose=require('mongoose');
const webpush=require('web-push');
const SubscriptionModel=require('../model/subscription');
const q=require('q');




const vapidKeys = {
    publicKey:
      'BGAFZ9hQZDF4GhJ_NWZkZWbt3U8X6hzjp9Hm_rFig7DZTcaZFyNgLaHqV71_9OhkqC47PKGdnuWrqRjJ4pvPed8',
    privateKey: 'Xw5p8pPxLAqTDZ5MLaK-R7YEAHerkIfO7Y0emWCLc4Q',
  }





module.exports= async (req, res) => {

    // console.log(req.body)

    console

    const { title, message, imageurl,redirecturl } = req.body;

    const payload = {
        title,
        message,
        imageurl,
        redirecturl
    };

    console.log(payload);

    SubscriptionModel.find({},(err,subscriptions)=>{
        if(err) 
        {
            console.error(`Error occurred while getting subscriptions`);

            res.status(500).json({
                error: ' error occurred'
            });
        }
        else{

            let SubscriptionCalls=subscriptions.map((subscription)=>{

                return new Promise((resolve,reject)=>{
                    const pushSubscription={

                        endpoint: subscription.endpoint,
                        keys: {
                            p256dh: subscription.keys.p256dh,
                            auth: subscription.keys.auth
                        }

                    };

                    const pushPayload=JSON.stringify(payload);
                    console.log(pushPayload)
                    const pushOptions={
                        vapidDetails:{
                        subject:"http://ktj.in/",
                        privateKey:vapidKeys.privateKey,
                        publicKey:vapidKeys.publicKey

                        },
                        headers:{}

                    };

                    webpush.sendNotification(

                        pushSubscription,
                        pushPayload,
                        pushOptions

                    ).then((value)=>{
                        resolve({ 
                            status:true,
                            endpoint: subscription.endpoint,
                            data: value

                        })
                    })
                    .catch((err)=>{

                        reject({
                            status: false,
                            endpoint: subscription.endpoint,
                            data: err
                        });

                    })


                })
            });

            q.allSettled(SubscriptionCalls).then(pushResults=>{
                console.info(pushResults);
            });
        
            res.json({ 
                data:'Push triggered'
            })
        


        }
    });

   
    console.log(req.body);



     

}