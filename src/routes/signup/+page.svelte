<script lang="ts">
    import { enhance } from '$app/forms';
    import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
    import * as Alert from "$lib/components/ui/alert/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
    import PasswordInput from "$lib/components/ui/password-input/password-input.svelte"
    import Ellipsis from 'lucide-svelte/icons/ellipsis';
    import type {ActionData} from "../../../.svelte-kit/types/src/routes/login/$types";
    import GoogleLogo from "$lib/components/icons/google-logo.svelte";
    import SpotifyLogo from "$lib/components/icons/spotify-logo.svelte";
    let isLoading = $state(false);
    let { form }: { form: ActionData } = $props();
</script>

<div class="flex flex-col w-full items-center justify-center md:px-4">
	<Card.Root class="max-w-sm">
        <Card.Header class="text-center">
            <Card.Title class="text-2xl">Create an account</Card.Title>
            <Card.Description>Enter your information to create your account.</Card.Description>
            {#if form?.message}
                <Alert.Root variant="destructive">
                    <Alert.Description>{form?.message ?? ''}</Alert.Description>
                </Alert.Root>
            {/if}
        </Card.Header>
        <Card.Content>
            <form method='post' action='?/signup' use:enhance={() => {
                isLoading = true;
                return async ({ update }) => {
                    await update();
                    isLoading = false;
                };
            }}>
                <div class="grid gap-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="grid gap-2">
                          <Input id="first-name" name="first-name" placeholder="First name" required />
                        </div>
                        <div class="grid gap-2">
                          <Input id="last-name" name="last-name" placeholder="Last name" required />
                        </div>
                      </div>
                    <div class="grid gap-2">
                        <!-- <Label for="email">Email</Label> -->
                        <Input id="email" type="email" name="email" placeholder="Email" required />
                    </div>
                    <div class="grid gap-2">
                        <PasswordInput />
                    </div>
                    <Button type="submit" class="w-full" disabled={isLoading}>
                        {#if isLoading}
                            <div class="animate-pulse"><Ellipsis /></div>
                        {:else}
                            Create Account
                        {/if}   
                        </Button>
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <span class="w-full border-t"></span>
                        </div>
                        <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-background text-muted-foreground px-2"> Or </span>
                        </div>
                    </div>
                    <Button href="/login/google" variant="outline" class="w-full">
                        <GoogleLogo />
                        Sign up with Google
                    </Button>

                    <Button href="/login/spotify" variant="outline" class="w-full">
                        <SpotifyLogo />
                        Sign up with Spotify
                    </Button>
                </div>
            </form>
            <div class="mt-4 text-center text-sm">
                Already have an account?
                <a href="/login" class="underline"> Login </a>
            </div>
        </Card.Content>
    </Card.Root>
</div>
