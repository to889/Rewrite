#!name=建工计算器

[Script]
^https?:\/\/calc\.kuaicad\.com\/authority\/verify_vip url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/jgjsq.js

[Mitm]
hostname = calc.kuaicad.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "type" : 1,
  "expiresTime" : 4092599349000,
  "isExpires" : false
};

$done({body : JSON.stringify(chxm1023)});