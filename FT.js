#!name = FT中文网
#!icon=https://raw.githubusercontent.com/to889/Rewrite/refs/heads/Loon/FT.png

[Script]
http-response ^https:\/\/.*\.cloudfront\.net\/index\.php\/jsapi\/paywall$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10, tag=FT中文网
http-response ^https:\/\/www\.ftchinese\.com\/index\.html$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10

[Mitm]
hostname = *.cloudfront.net, *.ftchinese.com, *.ftimg.net


let body = $response.body;

try {
    if ($request.url.includes("/index.php/jsapi/paywall")) {
        let baby = JSON.parse(body);
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
        body = JSON.stringify(baby);
    }
    
    if ($request.url.includes("/index.html")) {
        body = body.replace(/<div class="ad-container">.*?<\/div>/g, "");
    }
} catch (e) {
    console.log("FT中文网脚本错误：" + e);
}

$done({ body });
