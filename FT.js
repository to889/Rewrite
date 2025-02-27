#!name = FT中文网
#!icon = https://raw.githubusercontent.com/to889/Rewrite/refs/heads/Loon/FT.png

[Script]
# 会员解锁
http-response ^https:\/\/.*\.cloudfront\.net\/index\.php\/jsapi\/paywall$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10, tag=FT中文网

# 去除开屏广告 & 其他广告
http-response ^https:\/\/www\.ftchinese\.com\/index\.html$ script-path=https://raw.githubusercontent.com/Yu9191/Rewrite/main/FTzhongwenwang.js, requires-body=true, timeout=10

# 拦截广告 API 请求，防止广告加载
http-response ^https:\/\/www\.ftchinese\.com\/m\/ad\/(index|start).json$ reject-200
http-response ^https:\/\/www\.ftchinese\.com\/ad\/.*$ reject-200
http-response ^https:\/\/ads.*\.ftchinese\.com\/.*$ reject-200

[Mitm]
hostname = *.cloudfront.net, *.ftchinese.com, ads.ftchinese.com

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
        // 1. 删除 HTML 里的广告标签
        body = body.replace(/<div[^>]*class=["']?ad-container["']?[^>]*>.*?<\/div>/gs, ""); 
        body = body.replace(/<script[^>]*src=["']https?:\/\/.*?ad.*?\.js["'][^>]*>.*?<\/script>/gs, ""); 

        // 2. 清空 JSON 里的广告数据
        body = body.replace(/"ads":\s*\[.*?\]/gs, '"ads":[]');

        // 3. 删除本地存储中的广告信息
        body = body.replace(/window\.localStorage\.setItem\(["']adData["'],.*?\);/gs, "");

        // 4. 屏蔽开屏广告
        body = body.replace(/"splashAd":\s*{.*?}/gs, '"splashAd":{}');
    }
} catch (e) {
    console.log("FT中文网脚本错误：" + e);
}

$done({ body });
