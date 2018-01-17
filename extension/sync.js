console.log("ready~");
jQuery(document).ready(
    function() {
        console.log("vue init~");
        window.vueBody = new Vue({
            el: '#listGroup',
            data() {
                return {
                    datas : ['a','b']
                }
            },
            methods: {

            }
        });

        jQuery.get("http://gw.watsons.com.cn", function (data) {
            console.log(data)
        });
    }
);