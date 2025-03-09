<script lang="ts">
    import '../app.css';
    import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";
    import {ModeWatcher} from "mode-watcher";
    import ThemeToggle from "$lib/components/ui/theme-toggle/theme-toggle.svelte";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib//components/ui/app-sidebar.svelte";
    import {APP_NAME} from "$lib";

    let {children, data} = $props();

    // Check if user exists in the data
    let user = $derived(data?.user);
    let isLoggedIn = $derived(!!user);
</script>
<ModeWatcher/>
<Sidebar.Provider>
    <Sidebar.Inset>
        <header class="flex justify-between h-16 shrink-0 items-center gap-2 px-4">
            <a href="#" class="flex items-center gap-2 font-medium">
                <div class="flex h-6 w-6 items-center justify-center rounded-md">
                    <GalleryVerticalEnd/>
                </div>
                {APP_NAME}
            </a>
            <div class="flex justify-between items-center gap-2">
                <ThemeToggle/>
                {#if isLoggedIn}
                    <Sidebar.Trigger class="-ml-1"/>
                {/if}
            </div>
        </header>
        <!--Main Body-->
        <div class="flex flex-1 flex-col gap-4 p-4 items-center justify-center">
            {@render children()}
        </div>
    </Sidebar.Inset>
    {#if isLoggedIn}
        <AppSidebar user={data.user}/>
    {/if}
</Sidebar.Provider>
