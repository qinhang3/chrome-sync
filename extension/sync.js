console.log("ready~");
var syncHost = "http://sync.qinhang3.win:8088";
jQuery(document).ready(
    function() {
        console.log("vue init~");
        window.vueBody = new Vue({
            el: '#listGroup',
            data: {
                resp : {
                    data: [],
                    success: true,
                    message: ''
                },
                req : {
                    value : ''
                }
            },
            methods: {
                save : function(){
                    jQuery.post(syncHost + "/sync/add",{
                        value : vueBody.req.value
                    }, function (data) {
                        vueBody.resp = data;
                    });
                },
                format : function (time) {
                    return timeFormatter(time, "{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}");
                }
            }
        });

        setInterval(load, 1000);
        load();
    }
);

function load() {
    jQuery.get(syncHost + "/sync/get", function (data) {
        vueBody.resp = data;
    });
}

function timeFormatter(unixTime, format) {
    if (!unixTime || isNaN(unixTime)) {
        return '';
    }
    var time = new Date(unixTime);
    var year = time.getFullYear(); //年
    var month = time.getMonth() + 1; //月
    var day = time.getDate(); //日
    var week = time.getDay(); //星期
    var hour = time.getHours(); //时
    var minute = time.getMinutes(); //分
    var second = time.getSeconds(); //秒
    var weekEnum = {
        '0': '日',
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
    };
    var result = format;
    result = result.replace(/\{YYYY\}/g, year);
    result = result.replace(/\{YY\}/g, year.toString().substr(2, 2));
    result = result.replace(/\{MM\}/g, month > 9 ? month : '0' + month);
    result = result.replace(/\{M\}/g, month);
    result = result.replace(/\{DD\}/g, day > 9 ? day : '0' + day);
    result = result.replace(/\{D\}/g, day);
    result = result.replace(/\{HH\}/g, hour > 9 ? hour : '0' + hour);
    result = result.replace(/\{H\}/g, hour);
    if (hour > 12) {
        hour = hour - 12;
    }
    result = result.replace(/\{hh\}/g, hour > 9 ? hour : '0' + hour);
    result = result.replace(/\{h\}/g, hour);
    result = result.replace(/\{mm\}/g, minute > 9 ? minute : '0' + minute);
    result = result.replace(/\{m\}/g, minute);
    result = result.replace(/\{ss\}/g, second > 9 ? second : '0' + second);
    result = result.replace(/\{s\}/g, second);
    result = result.replace(/\{W\}/g, weekEnum[week]);
    return result;
}