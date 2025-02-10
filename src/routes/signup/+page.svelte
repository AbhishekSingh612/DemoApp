<script lang="ts">
    import { enhance } from '$app/forms';
    import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
    import PasswordInput from "$lib/components/ui/password-input/password-input.svelte"
</script>

<div class="flex flex-col h-screen w-full items-center justify-center px-4">
	<Card.Root class="mx-auto max-w-sm">
        <Card.Header>
            <Card.Title class="text-2xl">Signup</Card.Title>
            <Card.Description>Enter your information to create an account.</Card.Description>
        </Card.Header>
        <Card.Content>
            <form method='post' action='?/signup' use:enhance>
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
                    <Button type="submit" class="w-full">Signup</Button>
                    <!-- <Button variant="outline" class="w-full">Signup with Google</Button> -->
                </div>
            </form>
            <div class="mt-4 text-center text-sm">
                Already have an account?
                <a href="/login" class="underline"> Login </a>
            </div>
        </Card.Content>
    </Card.Root>
</div>
