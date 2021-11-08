const axios = require('axios');

const getSummary=async (req,resp)=>{
    // console.log(req.body)
    const audioOption = {
        method: 'post',
        url: 'http://169.51.205.194:31375/model/predict',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          text:[req.body.text]
        }
      };
    
  try{  await axios(audioOption) 
.then((response, err) => {
console.log(response)
resp.json(response.data);
});
}
catch{
  resp.json("Error while processing")
}
}


module.exports={
    getSummary:getSummary
  };
  