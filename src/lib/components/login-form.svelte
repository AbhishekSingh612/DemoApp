<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
    import { login } from "$lib/services/authservice";

	let email = $state('');
	let password = $state('');

	async function onlogin() {
		return await login(email, password);
	}
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<!-- <Label for="email">Email</Label> -->
				<Input id="email" type="email" placeholder="Email" bind:value={email} required />
			</div>
			<div class="grid gap-2">
				<Input id="password" type="password" placeholder="Password" bind:value={password} required />
				<div class="flex items-center">
					<!-- <Label for="password">Password</Label> -->
					<a href="##" class="ml-auto inline-block text-sm underline">
						Forgot your password?
					</a>
				</div>
				
			</div>
			<Button onclick={() => onlogin()} type="submit" class="w-full">Login</Button>
			<Button variant="outline" class="w-full">Login with Google</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Don't have an account?
			<a href="/signup" class="underline"> Sign up </a>
		</div>
	</Card.Content>
</Card.Root>
