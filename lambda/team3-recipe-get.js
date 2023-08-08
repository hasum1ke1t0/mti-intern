const {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "Recipe";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  /*
  // 今回は簡易的な実装だが、一般的にはAuthorizationHeaderの値は、Authorization: <type> <credentials>のような形式になります。
  // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Authorization#%E6%A7%8B%E6%96%87
  if (event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({
      message: "認証されていません。HeaderにTokenを指定してください",
    });

    return response;
  }
  */

  const param = {
    TableName,
    //Limit: 100,
  }
  
  const scanCommand = new ScanCommand(param);
  try {

    const articles = (await client.send(scanCommand)).Items;
    //console.log(1)
  
    if (articles.length == 0) {
      response.body = JSON.stringify({ articles: [] });
      //console.log(2)
    } else {
      const unmarshalledArticles = articles.map((item) => unmarshall(item));
      //console.log(3)
      //unmarshalledArticles.sort((a, b) => b.timestamp - a.timestamp);
      const qs = event.queryStringParameters;
      
      //console.log(4)
      //console.log(qs)
      //console.log(qs?.kcal)
      //console.log(qs?.material)
      
      const hasMat = qs?.material;
      const hasKcal = qs?.kcal;
      const hasAge = qs?.age;
      let newUnmsMat = [];
      let newUnmsKcal = [];
      let newUnmsAge = [];
      
      //console.log(5)
      
      // materialでしぼりこみ
      if (!hasMat) {
        //response.body = JSON.stringify({ articles: unmarshalledArticles });
        newUnmsMat = unmarshalledArticles;
        //console.log(6)
      } else{
        //console.log(7)
        for (let i = 0; i < unmarshalledArticles.length; i++) {
          //console.log(i)
          if (unmarshalledArticles[i].material == hasMat){
            newUnmsMat.push(unmarshalledArticles[i]);
          }
        }
      }
      //console.log(newUnmsMat)
      // kcalでしぼりこみ
      if (!hasKcal) {
        newUnmsKcal = newUnmsMat;
        //console.log(8)
      } else{
        //console.log(9)
        for (let i = 0; i < newUnmsMat.length; i++) {
          //console.log(i)
          if (newUnmsMat[i].kcal == hasKcal){
            newUnmsKcal.push(newUnmsMat[i]);
          }
        }
      }
      //console.log(newUnmsKcal)
      // Ageでしぼりこみ
      if (!hasAge) {
        newUnmsAge = newUnmsKcal;
        //console.log(10)
      } else {
        //console.log(11)
        for (let i = 0; i < newUnmsKcal.length; i++) {
          //console.log(i)
          if (newUnmsKcal[i].age == hasAge){
            newUnmsAge.push(newUnmsKcal[i]);
          }
        }
        //response.body = JSON.stringify({ articles: newUnmsAge });
      }
      //console.log(12)
      //console.log(newUnmsAge)
      // ランダムで選ぶ
      const randMax = newUnmsAge.length;
      var rand = Math.floor( Math.random() * randMax );
      response.body = JSON.stringify({ articles: newUnmsAge[rand] });
      console.log(response.body)
    }

  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
