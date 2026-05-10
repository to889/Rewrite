#!name = FT中文网
#!icon = https://raw.githubusercontent.com/Wmaliva/Loon/refs/heads/Loon/icon/FT.png

[Script]
# 会员解锁
http-response ^https:\/\/.*\.cloudfront\.net\/index\.php\/jsapi\/paywall url script-response-body script-path= https://raw.githubusercontent.com/Wmaliva/Loon/refs/heads/Loon/rewrite/FT.js, requires-body=true, timeout=10, tag=FT中文网

# 拦截广告 API 请求，防止广告加载
http-response ^https:\/\/www\.ftchinese\.com\/m\/ad\/(index|start).json$ reject-200
http-response ^https:\/\/www\.ftchinese\.com\/ad\/.*$ reject-200
http-response ^https:\/\/ads.*\.ftchinese\.com\/.*$ reject-200
http-response ^https:\/\/ftmailbox\.cn\/ad_impression\/.*$ reject-200

# 拦截 Google Ads 相关广告脚本
http-response ^https:\/\/securepubads\.g\.doubleclick\.net\/pagead\/managed\/js\/gpt\/.* reject-200
http-response ^https:\/\/securepubads\.g\.doubleclick\.net\/pagead\/ppub_config.* reject-200

[Mitm]
hostname = *.cloudfront.net, *.ftchinese.com, ads.ftchinese.com, ftmailbox.cn, securepubads.g.doubleclick.net

*******************************/
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
