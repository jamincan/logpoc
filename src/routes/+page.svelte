<script lang="ts">
	export let data;
	const { logs } = data;
</script>

<div>
	<h1>Logs</h1>
	<dl>
		{#each logs as log (log.id)}
			<dd>{log.date.toLocaleDateString()}</dd>
			<dt>{log.note}</dt>
		{/each}
	</dl>
</div>
