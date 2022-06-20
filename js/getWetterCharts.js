
var tempChart = echarts.init(document.getElementById("tempChart"), 'dark');

let wetterArr = [ {
name: "0085EF4F08FF5288",
timeSeriesId: "4d575f40-4930-48e8-93f5-a8be9241b404"},
{
name: "WeatherData2875376",
timeSeriesId: "1a959671-e28b-47c6-946f-eb556f04caa1"},
{
name: "WeatherData2873891",
timeSeriesId: "644c2622-bc30-45f8-80bd-c6bab411e0c0"}
]


let precipitationArr = [ {
name: "0085EF4F08FF5288_precipitation_intensity",
timeSeriesId: "ed86d215-0bac-4f2d-b809-38d2f00e9129"},
{
name: "0085EF4F08FF5288_precipitation_type",
timeSeriesId: "08febe79-4d7d-41b6-a09a-d7788ae582ec"},

]

function getData(tsID, startDate, endDate, interval, limit, func= 'avg', lora= false, sort = 'asc') {
data = [];
lora? api_key = "b64af05bfac248888c1ff5681daab321": api_key = "8e3b5fe2c8644919ae63394238b89644";
var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=${api_key}&timeSeriesId=${tsID}&func=${func}&interval=${interval}&timezone=Europe%2FBerlin&output=split&metadata=false&from=${startDate}&to=${endDate}&sort=${sort}`;
console.log(url);
var promise = new Promise((resolve,reject) =>{
    $.getJSON(
url,
      {},
      function (res) {
         
          data.push(res);
 
          // weatherData.push(res);
        console.log(res);
        resolve(res);
        reject("Keine Daten Verfügbar");
      }
    );
  });
  return promise;
}
function timestampstoString(response){
  timestamps = [];
  response.forEach(element => {
    date  = new Date(element);
      timestamps.push(date.toLocaleDateString("de-DE", {hour:"numeric" }));});
  return timestamps;
}
async function getTempChart(input){
    try{
    switch (input){
        case 0:
            weatherStation = "0085EF4F08FF5288";
            stationName= "Wetterstation 1";
            break;  
        case 1:
            weatherStation = "WeatherData2875376";
            stationName = "Wetterstation 2";
            break;
        case 2: 
            weatherStation = "WeatherData2873891";
            stationName = "Wetterstation 3";

            break;
        default:
            weatherStation = "0085EF4F08FF5288";
            stationName = "Wetterstation 1"
    }
    const response = await getData(wetterArr[input].timeSeriesId, "2022-01-01T00%3A00%3A00.000Z", "2022-05-24T00%3A00%3A00.000Z", 'H',100000, 'avg');
  console.log(response);
  tempChart.setOption(
    (option = {
      title: {
        text: "Mannheim - "+ stationName +" - Temperatur",
    
      },
      tooltip:{
        trigger: 'axis'
      },
      grid:{
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: "category",
        show: true,
        data: timestampstoString(response[0].timestamps),
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} mm/h'
        }
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
       dataZoom: [
          {
            startValue: "2022-01-17",
          },
          {
            type: "inside",
          },
        ],
      series: [
        {
          type: "line",
          smooth: true,
          color: '#FF0000',
          data: response[0].values,
        },
      ],
    })
  );
  }
  catch (err){
    console.log(err);
  }


}
async function getPrecipitationChart(){
try{
const response = await getData(precipitationArr[0].timeSeriesId, startDate, "2022-05-24T00%3A00%3A00.000Z", 'H', 'avg');
tempChart.setOption(
    (option = {
      title: {
        text: "Mannheim - Niederschlag",
      
      },
      tooltip:{
        trigger: 'axis'
      },
      grid:{
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        type: "category",
        data:  timestampstoString(response[0].timestamps)
      },
      yAxis: {
        type: "value",
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          startValue: "2022-01-17",
        },
        {
          type: "inside",
        },
      ],
      series: [
        {
          type: "line",
          color: '#0000FF',
          data: response[0].values,
        },
      ],
    })
  );
  }
  catch (err){
    console.log(err);
  }
}


