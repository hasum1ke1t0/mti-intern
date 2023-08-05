const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
//const TableName = "User";
const TableName = "Article"  //誤字の可能性アリ
const Limit = 100

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  //TODO: 取得対象のテーブル名をparamに宣言
  const param = {TableName,Limit};

  const command = new ScanCommand(param);

  try {
    console.log("全件取得")
    // client.send()で全件取得するコマンドを実行
    //const users = (await client.send(command)).Items;
    const articles = (await client.send(command)).Items;
    console.log("全件取得完了")
    
    /*
    //TODO: 全ユーザのpasswordを隠蔽する処理を記述
    console.log("隠ぺい処理開始")
    users?.forEach((item)=>{
      console.log(item)
      delete item?.password;
    });
    console.log("隠ぺい処理完了")
    */
    
    /* timestampの降順でソート */
    articles.sort(function(a, b) {
      if (a.timestamp > b.timestamp) {
        return 1;
      } else {
        return -1;
      }
    })
    
    console.log(articles);

    //TODO: レスポンスボディを設定する
    response.body  = JSON.stringify(articles.map((item)=>unmarshall(item)));
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
