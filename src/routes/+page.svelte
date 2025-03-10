<script lang="ts">
	import type { PageServerData } from "./$types";
	import * as Card from "$lib/components/ui/card/index.js";
	let { data }: { data: PageServerData } = $props();
</script>

<div class="flex flex-col w-full items-center justify-center px-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Hi, {data.user.firstName}!</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Name: {data.user.firstName} {data.user.lastName}</p>
			<p>User Id: {data.user.id}</p>
			<p>username: {data.user.email}</p>
		</Card.Content>
		<Card.Footer>
			<a href="/chat-spotify">chat-spotify</a>
		</Card.Footer>
	</Card.Root>
</div>
