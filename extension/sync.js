console.log("ready~");
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
                    jQuery.get("http://127.0.0.1:8088/sync/add",{
                        value : vueBody.req.value
                    }, function (data) {
                        vueBody.resp = data;
                    });
                }
            }
        });

        // setInterval(load, 1000);
        // load();
    }
);

function load() {
    jQuery.get("http://127.0.0.1:8088/sync/get", function (data) {
        vueBody.resp = data;
    });
}