#!name=AutoCAD
#!desc=去广告解锁视频(支持Loon)
#!author=T
#!date=2025-08-01

[Script]
http-response ^https:\/\/app\.autocad360\.com\/entitlements\/v2\/me\/status script-path=script/autoCAD.js, requires-body=true, timeout=60, tag=AutoCAD
  
[Mitm]
hostname = app.autocad360.com

// AutoCAD 解锁脚本 for Loon

var obj = JSON.parse($response.body);

obj = {
  "status": "ADSK_GRANTED_USERS_AUTODESK_EDUCATION_BUNDLE",
  "is_legacy_subscriber": true,
  "features": [
    "MyDesignStorage",
    "svc0000020",
    "svc0000087",
    "svc0000089",
    "svc0002664",
    "svc0003000"
  ],
  "is_trial": false,
  "is_authorized": true,
  "type": "ADSK_GRANTED_USERS_AUTODESK_EDUCATION_BUNDLE",
  "start_sec": 1709105997,
  "subscribed": true,
  "is_mobile_store_subscriber": true,
  "subscriptions": [],
  "expiry_sec": 4080428400,
  "is_edu_account": true,
  "recheck_sec": 1709218539
};

$done({ body: JSON.stringify(obj) });
