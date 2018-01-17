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
                    jQuery.get(syncHost + "/sync/add",{
                        value : vueBody.req.value
                    }, function (data) {
                        vueBody.resp = data;
                    });
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