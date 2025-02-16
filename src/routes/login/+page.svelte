<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
    import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import PasswordInput from '$lib/components/ui/password-input/password-input.svelte';
    import Ellipsis from 'lucide-svelte/icons/ellipsis';

	let { form }: { form: ActionData } = $props();
    let isLoading = $state(false);
</script>
<div class="flex flex-col h-screen w-full items-center justify-center px-4">
	<Card.Root class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Login</Card.Title>
            <Card.Description>Enter your email below to login to your account</Card.Description>
            {#if form?.message}
            <Alert.Root variant="destructive">
                <Alert.Description>{form?.message ?? ''}</Alert.Description>
              </Alert.Root>
            {/if}
        </Card.Header>
        <Card.Content>
            <form method='post' action='?/login' use:enhance={() => {
                isLoading = true;
                return async ({ update }) => {
                    await update();
                    isLoading = false;
                };
            }}>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Input id="email" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="grid gap-2">
                        <PasswordInput />
                        <div class="flex items-center">
                            <a href="##" class="ml-auto inline-block text-sm underline">
                                Forgot your password? (TODO)
                            </a>
                        </div>
                        
                    </div>
                    <Button type="submit" class="w-full" disabled={isLoading}>
                    {#if isLoading}
                        <div class="animate-pulse"><Ellipsis /></div>
                    {:else}
                        Login
                    {/if}   
                    </Button>
                     <Button href="/login/google" variant="outline" class="w-full">Login with Google</Button>
                </div>
            </form>
            <div class="mt-4 text-center text-sm">
                Don't have an account?
                <a href="/signup" class="underline"> Sign up </a>
            </div>
        </Card.Content>
    </Card.Root>
</div>