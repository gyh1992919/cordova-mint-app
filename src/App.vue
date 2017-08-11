<template>
	<!-- App -->
	<div class="app">
		<navigation>
			<router-view></router-view>
		</navigation>
	</div>
</template>

<script>
	export default {
       mounted () {
            // bind event
            this.$navigation.on('forward', (to, from) => {
                window.plugins.nativepagetransitions.slide(
					{"direction": "left"}
                )
            })
            this.$navigation.on('back', (to, from) => {
                window.plugins.nativepagetransitions.slide(
                    {"direction": "right"}
                )
            })
               navigator.splashscreen.hide();

        }
	}
</script>
