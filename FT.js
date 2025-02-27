#!name = FT中文网
#!icon = https://raw.githubusercontent.com/to889/Rewrite/refs/heads/Loon/FT.png

[Script]
# 会员解锁
http-response ^https:\/\/.*\.cloudfront\.net\/index\.php\/jsapi\/paywall$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10, tag=FT中文网

# 去开屏广告
http-response ^https:\/\/www\.ftchinese\.com\/index\.html$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10

[Mitm]
hostname = *.cloudfront.net, *.ftchinese.com

let body = $response.body;

try {
    const url = $request.url;

    if (url.includes("/index.php/jsapi/paywall")) {
        // 解锁 FT 中文网会员
        let baby = JSON.parse(body);
        baby.paywall = 0;
        baby.premium = 1;
        baby.expire = "4092599349";
        baby.standard = 1;
        baby.v = 2099;
        baby.campaign_code = "";
        baby.latest_duration = "yearly";
        baby.addon = 0;
        body = JSON.stringify(baby);
    }

    if (url.includes("/index.html")) {
        // 去除 FT 中文网的开屏广告
        body = body.replace(/<div[^>]*class="ad-container"[^>]*>.*?<\/div>/gs, ""); // 删除广告 HTML
        body = body.replace(/"ads":\s*\[.*?\]/gs, '"ads":[]'); // 清空 JSON 里的广告数据
    }
} catch (e) {
    console.log("FT中文网脚本错误：" + e);
}

$done({ body });
