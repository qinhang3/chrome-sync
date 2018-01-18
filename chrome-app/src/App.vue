<template>
  <div class="row">
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <textarea class="form-control" rows="1" v-model="req.value" id="valueInput" placeholder="输入输出缓冲区。不用改。改了也没用"></textarea>
      <button type="button" class="btn btn-primary" v-on:click="ctrlc" style="width: 100%; margin-top: 10px">Ctrl+C</button>
      <div  class="list-group">
        <button type="button" class="list-group-item" v-on:click="ctrlv(item.value)" v-for="item in resp.data">
          <span class="badge">{{format(item.createTime)}}</span>
          {{item.value}}
        </button>
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>
</template>

<script>
  var syncHost = "http://sync.qinhang3.win:8088";
  export default {
    data() {
      return {
        resp: {
          data: [],
          success: true,
          message: ''
        },
        req: {
          value: ''
        }
      }
    },
    created : function () {
      console.log("created running...");
      this.load();
      setInterval(this.load, 1000)
    },
    methods: {
      ctrlc: function () {
        this.req.value = '';
        this.$nextTick(function () {
          jQuery('#valueInput').focus();
          document.execCommand('paste');
          this.$nextTick(function () {
            jQuery.post(syncHost + "/sync/add", {
              value: this.req.value
            }, function (data) {
              this.resp = data;
            });
          });
        })
      },
      format: function (time) {
        return timeFormatter(time, "{YYYY}-{MM}-{DD} {HH}:{mm}:{ss}");
      },
      ctrlv: function (str) {
        this.req.value = str;
        this.$nextTick(function () {
          jQuery('#valueInput').select();
          console.log(jQuery('#valueInput').val());
          console.log("write clipboard : " + document.execCommand('copy'));
        });
      },
      load : function() {
        jQuery.get(syncHost + "/sync/get",  data => {
          console.log('before ' + this.resp);
          this.resp = data;
          console.log('after ' + this.resp);
        });
      }
    }
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



</script>

<style>

</style>
