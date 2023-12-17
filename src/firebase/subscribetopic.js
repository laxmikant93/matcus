export const subscriberToTopic = (token,topic) =>{
    fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: new Headers({
            'Content-Type':"application/json",
            'Authorization': 'key=AAAA4iir8Jo:APA91bHO7EjJIlp5BKt8eERPK4U-wFaFwykB2UT5DUbwmHtpG8FUr6Ihk9CteL-RDOA3xXAbnbi3X8kZ0zEeC1T73u1n0Wrkc-SImyj6fQ9czEAgjCKzqE2V2FvaABSCUeazh5TCpVpy'
        })
    }).then(response => {
        if (response.status < 200 || response.status >= 400) {
          
        }
       
    }).catch(error => {
    })
}