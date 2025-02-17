<script lang="ts">
	import '../app.css';
    import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";
    import { ModeWatcher } from "mode-watcher";
    import ThemeToggle from "$lib/components/ui/theme-toggle/theme-toggle.svelte";
    import {APP_NAME} from "$lib";
	let { children } = $props();
</script>
<ModeWatcher />
<div class="grid min-h-svh">
    <div class="flex flex-col gap-4 p-6">
        <div class="flex justify-between items-center gap-2">
            <a href="#" class="flex items-center gap-2 font-medium">
                <div class="flex h-6 w-6 items-center justify-center rounded-md">
                    <GalleryVerticalEnd />
                </div>
                {APP_NAME}
            </a>
            <ThemeToggle />
        </div>
        <div class="flex flex-1 items-center justify-center">
            {@render children()}
        </div>
    </div>
</div>


