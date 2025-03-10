<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import {Button} from "$lib/components/ui/button/index.js";
    import {Label} from "$lib/components/ui/label/index.js";
    import {Switch} from "$lib/components/ui/switch/index.js";
    import * as Select from "$lib/components/ui/select/index.js";


</script>

<div class="flex flex-col w-full items-center justify-center px-4">
    <Card.Root>
        <Card.Header>
            <Card.Title class="pb-1">!Play command</Card.Title>
            <Card.Description>Let our viewers play their favorite songs</Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-6">
            <div class="flex items-center justify-between space-x-2">
                <Label for="allow-admin" class="flex flex-col space-y-1">
                    <span>Allow admins</span>
                    <span class="text-muted-foreground text-xs font-normal leading-snug">
					Allow admins to play the song via chat.
				</span>
                </Label>
                <Switch id="allow-admin" checked aria-label="allow-admin"/>
            </div>

            <div class="flex items-center justify-between space-x-2">
                <Label for="allow-subscriber" class="flex flex-col space-y-1">
                    <span>Allow subscriber</span>
                    <span class="text-muted-foreground text-xs font-normal leading-snug">
					Allow subscribers to play the song via chat.
				</span>
                </Label>
                <Switch id="allow-subscriber" checked aria-label="allow-subscriber"/>
            </div>

            <div class="flex items-center justify-between space-x-2">
                <Label for="allow-everyone" class="flex flex-col space-y-1">
                    <span>Allow everyone</span>
                    <span class="text-muted-foreground text-xs font-normal leading-snug">
					Allows everyone to play the song via chat.
				</span>
                </Label>
                <Switch id="allow-everyone" aria-label="allow-everyone"/>
            </div>


            <div class="flex items-center justify-between space-x-2">
                <Label for="allow-everyone" class="flex flex-col space-y-1">
                    <span>Device</span>
                    <span class="text-muted-foreground text-xs font-normal leading-snug">
					Select the connected device.
				</span>
                </Label>
                <Select.Root type="single">
                    <Select.Trigger class="w-[180px]">Device</Select.Trigger>
                    <Select.Content>
                        <Select.Item value="light">Light</Select.Item>
                        <Select.Item value="dark">Dark</Select.Item>
                        <Select.Item value="system">System</Select.Item>
                    </Select.Content>
                </Select.Root>
            </div>
        </Card.Content>
        <Card.Footer>
            <Button class="w-full">Let's go</Button>
        </Card.Footer>
    </Card.Root>
</div>
