<script lang="ts">
	import { Layout } from '../lib';
	export let data;
</script>

<svelte:component this={Layout} {data}>
	<slot />
</svelte:component>
