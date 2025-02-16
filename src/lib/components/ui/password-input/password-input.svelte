<script lang="ts">
	import { Input } from "$lib/components/ui/input/index.js";
    import Eye from 'lucide-svelte/icons/eye';
    import EyeOff from 'lucide-svelte/icons/eye-off';
    let showPassword = $state(false);
</script>

<div class="relative">
    <Input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"  required />
    <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3" tabindex="-1" onclick={()=>{showPassword = !showPassword}}>
    {#if showPassword}
        <EyeOff class="w-5 h-5 text-gray-300" />
    {:else}
        <Eye class="w-5 h-5 text-gray-300" />
    {/if}
    </button>
</div>
