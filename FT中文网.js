#!name = FT中文网

[Script]
http-response ^https:\/\/.*\.cloudfront\.net\/index\.php\/jsapi\/paywall script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10, tag=FT中文网

[Mitm]
hostname = *.cloudfront.net

var baby = JSON.parse($response.body);

baby = {
  "paywall": 0,
  "premium": 1,
  "expire": "4092599349",
  "standard": 1,
  "v": 2099,
  "campaign_code": "",
  "latest_duration": "yearly",
  "addon": 0
};

$done({ body: JSON.stringify(baby) });
