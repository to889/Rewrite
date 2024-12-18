#!name=建工计算器

[Script]
http-response ^https?:\/\/calc\.kuaicad\.com\/authority\/verify_vip script-path=https://raw.githubusercontent.com/chxm1023/Rewrite/main/jgjsq.js, requires-body=true, tag=建工计算器VIP解锁

[Mitm]
hostname = calc.kuaicad.com

/**
 * 建工计算器 VIP 解锁
 */
var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "type": 1,
  "expiresTime": 4092599349000,
  "isExpires": false
};

$done({body: JSON.stringify(chxm1023)});


