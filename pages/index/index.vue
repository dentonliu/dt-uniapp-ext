<template>
	<view class="content">
        <view class="section">
            <input type="text" v-model="city" placeholder="输入城市查询天气">
        </view>
		<view class="section">
			<button type="primary" size="mini" @click="getWeather">查询</button>
		</view>
        <view class="section">
            <text>天气: {{weather.info}}</text><br />
            <text>温度: {{weather.temperature}}摄氏度</text><br />
            <text>湿度: {{weather.humidity}}</text><br />
            <text>风向: {{weather.direct}}</text><br />
            <text>风力: {{weather.power}}</text>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city: '',
                weather: {},
			}
		},
        
		methods: {
            getWeather() {
                if (!this.city) {
                    return;
                }

                this.$http.get(`/simpleWeather/query?city=${this.city}&key=958e00f37fd7f4a9f6bc12d1eadc29e6`)
                    .then((res) => {
                        this.weather = res.data.result.realtime;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
		}
	}
</script>

<style>
	.content {
        padding: 20rpx;
	}

    .section {
        margin-bottom: 20rpx;
    }
</style>
