var axios = require('axios');
var data = '{\r\n    "owner_id":"example id",\r\n    "token":"example token",\r\n    "total_limit":1000,\r\n    "hourly_limit":100\r\n}\r\n';

var config = {
  method: 'post',
  url: 'https://rapidemail.rmlconnect.net/v1.0/settings/addSmtp',
  headers: { },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});