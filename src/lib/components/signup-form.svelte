<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { signup } from "$lib/services/authservice";

	let email = $state('');
	let password = $state('');

	function onsignup() {
		return signup(email, password);
	}
</script>


<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign up</Card.Title>
		<Card.Description>Enter your email below to sign up new account.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
            <div class="grid gap-2">
				<!-- <Label for="email">Email</Label> -->
				<Input id="firstname" type="text" placeholder="First Name" required />
			</div>
            <div class="grid gap-2">
				<!-- <Label for="email">Email</Label> -->
				<Input id="lastname" type="text" placeholder="Last Name" required />
			</div>
			<div class="grid gap-2">
				<!-- <Label for="email">Email</Label> -->
				<Input id="email" type="email" placeholder="Email" bind:value={email} required />
			</div>
			<div class="grid gap-2">
				<Input id="password" type="password" placeholder="Password" bind:value={password}  required />
			</div>
			<Button onclick={() => onsignup()} type="submit" class="w-full">Signup</Button>
			<Button variant="outline" class="w-full">Signup with Google</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Have an account?
			<a href="/login" class="underline"> Login </a>
		</div>
	</Card.Content>
</Card.Root>
