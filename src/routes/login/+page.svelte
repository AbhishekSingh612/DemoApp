<script lang="ts">
    import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
    import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import PasswordInput from '$lib/components/ui/password-input/password-input.svelte';
    import Ellipsis from 'lucide-svelte/icons/ellipsis';
    import GoogleLogo from '$lib/components/icons/google-logo.svelte'
    import SpotifyLogo from '$lib/components/icons/spotify-logo.svelte'
    import {APP_NAME} from "$lib";

	let { form }: { form: ActionData } = $props();
    let isLoading = $state(false);
</script>
<div class="flex flex-col w-full items-center justify-center md:px-4">
    <div class="flex flex-col items-center justify-center w-full max-w-sm py-4">
        <Card.Root class="w-full max-w-sm border-none">
            <Card.Header class="text-center">
                <Card.Title class="text-2xl">Welcome back</Card.Title>
                <Card.Description>Login to your {APP_NAME} account</Card.Description>
                {#if form?.message}
                    <Alert.Root variant="destructive" class="bg-red-50 dark:bg-red-400">
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
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <span class="w-full border-t" />
                            </div>
                            <div class="relative flex justify-center text-xs uppercase">
                                <span class="bg-background text-muted-foreground px-2"> Or </span>
                            </div>
                        </div>
                        <Button href="/login/google" variant="outline" class="w-full">
                            <GoogleLogo />
                            Login with Google
                        </Button>

                        <Button href="/login/spotify" variant="outline" class="w-full">
                            <SpotifyLogo />
                            Login with Spotify
                        </Button>
                    </div>
                </form>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="/signup" class="underline"> Sign up </a>
                </div>
            </Card.Content>
        </Card.Root>
    </div>
<!--
    <div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
    </div>
-->
</div>