<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageServerData } from "./$types";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";

	let { data }: { data: PageServerData } = $props();
</script>

<div class="flex flex-col h-screen w-full items-center justify-center px-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Hi, {data.user.username}!</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<p>User Id: {data.user.id}</p>
		</Card.Content>
		<Card.Footer>
			<form method="post" action="?/logout" use:enhance>
				<Button type="submit">Sign out</Button>
			</form>
		</Card.Footer>
	</Card.Root>
</div>
