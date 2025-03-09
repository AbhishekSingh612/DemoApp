<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import * as Avatar from "$lib/components/ui/avatar/index";
    import * as Card from "$lib/components/ui/card/index.js";
    import {Button} from "$lib/components/ui/button";
    import {enhance} from "$app/forms";
    import {LogOut, Ellipsis} from "lucide-svelte";

    let isLoading = $state(false);

    let {user} = $props();
    console.log(user);
</script>

<Sidebar.Root side="right">
    <Sidebar.Header/>
    <Sidebar.Content>
        <Sidebar.Group/>
        <Sidebar.Group/>
    </Sidebar.Content>
    <Sidebar.Footer>
        <Card.Root>
            <Card.Content>
                <div class="flex items-center justify-between gap-2 text-center text-sm">
                    <Avatar.Root class="h-8 w-8 rounded-lg">
                        <Avatar.Image src={user.pictureUrl? user.pictureUrl : 'https://api.dicebear.com/9.x/icons/svg'} alt={user.firstName}/>
                        <Avatar.Fallback class="rounded-lg">{(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')}</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid flex-1 text-left text-sm leading-tight">
                        <span class="truncate font-semibold">{user.firstName}</span>
                        <span class="truncate text-xs">{user.email}</span>
                    </div>
                    <form method="post" action="?/logout" use:enhance={() => {
                                                                            isLoading = true;
                                                                            return async ({ update }) => {
                                                                                await update();
                                                                                isLoading = false;
                                                                            };
                                                                        }}>
                        <button type="submit"
                                class="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                disabled={isLoading}
                                aria-label="Sign out">
                            {#if isLoading}
                                <div class="animate-pulse">
                                    <Ellipsis/>
                                </div>
                            {:else}
                                <LogOut size={20} />
                            {/if}
                        </button>
                    </form>
                </div>
            </Card.Content>
        </Card.Root>
    </Sidebar.Footer>
    <Sidebar.Rail/>
</Sidebar.Root>