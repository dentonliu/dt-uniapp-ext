<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
        
        onLoad() {
            this.getWeather('北京');
        },
        
		methods: {
            getWeather(city) {
                this.$http.get('simpleWeather', { city, key: '958e00f37fd7f4a9f6bc12d1eadc29e6' })
                    .then((res) => {
                        console.log(JSON.stringify(res));
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
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
