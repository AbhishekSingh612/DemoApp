<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageServerData } from "./$types";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Ellipsis } from 'lucide-svelte'
	let { data }: { data: PageServerData } = $props();
	let isLoading = $state(false);
</script>

<div class="flex flex-col h-screen w-full items-center justify-center px-4">
	<Card.Root>
		<Card.Header>
			<Card.Title>Hi, {data.user.firstname}!</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Name: {data.user.firstname} {data.user.lastname}</p>
			<p>User Id: {data.user.id}</p>
			<p>username: {data.user.username}</p>
		</Card.Content>
		<Card.Footer>
			<form method="post" action="?/logout" use:enhance={() => {
                isLoading = true;
                return async ({ update }) => {
                    await update();
                    isLoading = false;
                };
            }}>
				<Button type="submit" class="w-full" disabled={isLoading}>
					{#if isLoading}
						<div class="animate-pulse"><Ellipsis /></div>
					{:else}
						Sign out
					{/if}   
				</Button>
			</form>
		</Card.Footer>
	</Card.Root>
</div>
