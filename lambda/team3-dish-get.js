const {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team3-Dish";

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
  ///*
  //動作確認済み 
  const param = {
    TableName,
    //Limit: 100,
  }
  //*/
  /*
  const qs = event.queryStringParameters;
  const { userId, date, dishkind } = qs;
  const param = {
    TableName,
    KeyConditionExpression: "userId = :uid and date = :date",
    ExpressionAttributeValues:{
      ":uid": qs?.userId,
      ":date": qs?.date,
      ":dk": qs?.dishkind,
    },
    //FilterExpression: "dishkind = :dk",
  }//*/
  //console.log(1)
  
  const scanCommand = new ScanCommand(param);
  //const queryCommand = new QueryCommand(param);
  try {
    // テスト中
    /*
    //console.log(2)
    //console.log('qs.userId:'+qs.userId)
    //console.log('qs.date:'+qs.date)
    const articles = (await client.send(queryCommand)).Items;
    //console.log(1)
    //*/
    /* 動作確認済み始まり */
    ///*
    const articles = (await client.send(scanCommand)).Items;
    if (articles.length == 0) {
      //response.body = JSON.stringify({ articles: [] });
      response.body = JSON.stringify({ dish: [] });
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
      
      const hasId = qs?.userId;
      const hasDate = qs?.date;
      const hasDishKind = qs?.dishkind;
      let nUI = [];
      let nUD = [];
      let nUDK = [];
      
      //console.log(5)
      //console.log('articles:'+unmarshalledArticles[0].userId)
      
      // userIdでしぼりこみ
      if (!hasId) {
        nUI = unmarshalledArticles;
        //console.log(10)
      } else {
        //console.log('hasId:'+hasId)
        //console.log(11)
        for (let i = 0; i < unmarshalledArticles.length; i++) {
          //console.log(1)
          //console.log(unmarshalledArticles[i].userId)
          if (unmarshalledArticles[i].userId == hasId){
            nUI.push(unmarshalledArticles[i]);
          }
        }
        //console.log(2)
        //response.body = JSON.stringify({ articles: newUnmsAge });
      }
      
      // Dateでしぼりこみ
      if (!hasDate) {
        nUD = nUI;
        //console.log(10)
      } else {
        //console.log(11)
        for (let i = 0; i < nUI.length; i++) {
          //console.log(i)
          if (nUI[i].date == hasDate){
            nUD.push(nUI[i]);
          }
        }
        //response.body = JSON.stringify({ articles: newUnmsAge });
      }
      
      // Dishkindでしぼりこみ
      if (!hasDishKind) {
        nUDK = nUD;
        //console.log(10)
      } else {
        //console.log(11)
        for (let i = 0; i < nUD.length; i++) {
          //console.log(i)
          if (nUD[i].dishkind == hasDishKind){
            nUDK.push(nUD[i]);
          }
        }
        //response.body = JSON.stringify({ articles: newUnmsAge });
      }
      //console.log(12)
      //console.log(newUnmsAge)
      //console.log(nUDK[0])
      //console.log('nUDK.kcal:'+nUDK[0].kcal)
      //response.body = JSON.stringify({ dish: nUDK });
      console.log("読み込み前")
      console.log(nUDK[0])
      if (nUDK[0] != undefined){
        response.body = JSON.stringify({ kcal: nUDK[0].kcal });
      }else{
        response.body = JSON.stringify({ kcal: 0})
      }
      //console.log(response.body)
    }//*/
    /* 動作確認済み終わり */
    /*console.log(3)
    if (articles.length == 0) {
      response.body = JSON.stringify({ articles: [] });
      console.log(4)
    } else {
      const unmarshalledArticles = articles.map((item) => unmarshall(item));
      unmarshalledArticles.sort((a, b) => b.timestamp - a.timestamp);
      response.body = JSON.stringify({ articles: unmarshalledArticles });
      console.log(5)
    }//*/

  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
