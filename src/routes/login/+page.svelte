<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
    import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex flex-col h-screen w-full items-center justify-center px-4">
	<Card.Root class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Login</Card.Title>
            <Card.Description>Enter your email below to login to your account</Card.Description>
            <Card.Description style='color: red'>{form?.message ?? ''}</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method='post' action='?/login' use:enhance>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Input id="email" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="grid gap-2">
                        <Input id="password" type="password" name="password" placeholder="Password" required />
                        <div class="flex items-center">
                            <a href="##" class="ml-auto inline-block text-sm underline">
                                Forgot your password? (TODO)
                            </a>
                        </div>
                        
                    </div>
                    <Button type="submit" class="w-full">Login</Button>
                    <!-- TODO: <Button variant="outline" class="w-full">Login with Google</Button> -->
                </div>
            </form>
            <div class="mt-4 text-center text-sm">
                Don't have an account?
                <a href="/signup" class="underline"> Sign up </a>
            </div>
        </Card.Content>
    </Card.Root>
</div>