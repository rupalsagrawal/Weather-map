const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',function(req,res)
{
  res.sendFile(__dirname+'/index.html');
})
app.post('/',function(req,res)
{
  const query=req.body.city;
  console.log(query);
  const appid='a853cf26b2cf6d22906b5f1f837ad4f2';
  const url='https://api.openweathermap.org/data/2.5/weather?q='+query+'&appid='+appid+'&units=metric';
  console.log(url);
  https.get(url,function(response){
    response.on("data",function(data){

      var weather_data=JSON.parse(data);
      console.log(weather_data);
      var description=weather_data.weather[0].description;
      var icon=weather_data.weather[0].icon;
      var temp=weather_data.main.temp;

      res.write('<h1>Temperature in '+query+' is: '+temp+'</h1>');
      res.write('<p>The weather description is '+description+'</p>');
      //res.write('<img src="http://openweathermap.org/img/wn/10d@2x.png"'+'>');
      res.write('<img src="http://openweathermap.org/img/wn/'+icon+'@2x.png'+'">');
      res.send();
});
});
});

app.listen(3000,function(){
  console.log('Server started on port 3000');
});
