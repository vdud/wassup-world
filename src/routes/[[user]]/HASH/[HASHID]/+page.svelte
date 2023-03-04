<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

	console.log(JSON.parse(data.body.data))
</script>
