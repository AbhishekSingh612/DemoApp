<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageServerData } from "./$types";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	let { data }: { data: PageServerData } = $props();
	let isLoading = $state(false);
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
	</Card.Root>
</div>
