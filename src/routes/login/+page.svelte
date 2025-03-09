<script lang="ts">
    import {Button} from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import SpotifyLogo from '$lib/components/icons/spotify-logo.svelte'
    import {APP_NAME} from "$lib";

</script>
<div class="flex flex-col w-full items-center justify-center md:px-4">
    <div class="flex flex-col items-center justify-center w-full max-w-sm py-4">
        <Card.Root class="w-full max-w-sm border-none">
            <Card.Header class="text-center">
                <Card.Title class="text-2xl">Welcome back</Card.Title>
                <Card.Description>Login to your {APP_NAME} account</Card.Description>
            </Card.Header>
            <Card.Content>
                <div class="grid gap-4">
                    <Button href="/login/spotify" variant="outline" class="w-full">
                        <SpotifyLogo/>
                        Login with Spotify
                    </Button>
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