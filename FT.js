#!name = FT中文网
#!icon = https://raw.githubusercontent.com/to889/Rewrite/refs/heads/Loon/FT.png

[Script]
# 解锁 FT 中文网会员 & 去广告
http-response ^https:\/\/.*\.cloudfront\.net\/index\.php\/jsapi\/paywall$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10, tag=FT中文网
http-response ^https:\/\/www\.ftchinese\.com\/index\.html$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10

[Mitm]
hostname = *.cloudfront.net, *.ftchinese.com, *.ftimg.net

let body = $response.body;

try {
    const url = $request.url;

    // 处理 FT 会员解锁
    if (url.includes("/index.php/jsapi/paywall")) {
        let json = JSON.parse(body);
        json.paywall = 0;
        json.premium = 1;
        json.expire = "4092599349";
        json.standard = 1;
        json.v = 2099;
        json.campaign_code = "";
        json.latest_duration = "yearly";
        json.addon = 0;
        body = JSON.stringify(json);
    }

    // 处理 FT 开屏广告 & 其他广告
    if (url.includes("/index.html")) {
        body = body.replace(/<div[^>]*class="ad-container"[^>]*>.*?<\/div>/gs, ""); // 去除广告
        body = body.replace(/"ads":\s*\[.*?\]/gs, '"ads":[]'); // 去除 JSON 广告数据
    }
} catch (e) {
    console.log("FT 中文网去广告 & 会员解锁脚本错误: " + e);
}

$done({ body });
