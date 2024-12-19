#!name = Keep VIP

[Script]
http-response ^https?:\/\/(api|kit).gotokeep\.com\/(nuocha|gerudo|athena|nuocha\/plans|suit\/v5\/smart|kprime\/v4\/suit\/sales)\/ script-path=https://raw.githubusercontent.com/WeiGiegie/666/main/keep.js, requires-body=true, timeout=10

[MITM]
hostname = *.gotokeep.com, 162.14.5.*, 42.187.199.*, 101.42.124.*

