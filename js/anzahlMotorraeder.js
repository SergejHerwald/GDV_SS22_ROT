
let summe = [];
function getSumMotorrad(tsID, tsID2=0, tsID3=0, startDate, endDate, granularity) {
  return new Promise((resolve, reject) => {
    var url = `https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&from=${startDate}&to=${endDate}&func=sum&interval=${granularity}&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`;
    if(tsID2 !=0 && tsID3 !=0){
      url=`https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&timeSeriesId=${tsID2}&timeSeriesId=${tsID3}&from=${startDate}&to=${endDate}&func=sum&interval=${granularity}&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`;
    }else if(tsID2 != 0 ){
      url=`https://api.mvvsmartcities.com/v3/timeseries?Ocp-Apim-Subscription-Key=8e3b5fe2c8644919ae63394238b89644&timeSeriesId=${tsID}&timeSeriesId=${tsID2}&from=${startDate}&to=${endDate}&func=sum&interval=${granularity}&timezone=Europe%2FBerlin&sort=asc&output=split&metadata=false`;
    }else{
    }
      $.getJSON(
        url,
        {},
        function (res) {
          for (let elements in res) {
            summe.push(res);
            
          }
          resolve(res);
          reject("Keine Daten Verfügbar");
        }
      );
  });
}





