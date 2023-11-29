<script lang="ts">
	export let data;
	const { logs, rows } = data;
</script>

<div>
	<h1>Database Logs</h1>
	<dl>
		{#each logs as log (log.id)}
			<dd>{log.date.toLocaleDateString()}</dd>
			<dt>{log.note}</dt>
		{/each}
	</dl>
    <h1>Sheet View</h1>
    {#if rows}
    <table>
        {#each rows as row}
            <tr><td>{row[0]}</td><td>{row[1]}</td></tr>
        {/each}
    </table>
    {/if}
</div>
