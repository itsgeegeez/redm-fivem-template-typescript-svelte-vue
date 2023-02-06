<script lang="ts">
  import { useNuiEvent } from "../utils/useNuiEvent";
  import { fetchNui } from "../utils/fetchNui";
  import { onMount } from "svelte";
  import { visibility } from "../store/stores";

  useNuiEvent<boolean>("setVisible", (data: any) => {
    $visibility = data.visible;
  });

  onMount(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if ($visibility && ["Escape"].includes(e.code)) {
        fetchNui("hideUI");
        $visibility = false;
      }

      if($visibility && ["F1"].includes(e.code)) {
        fetchNui("hideUI");
        // $visibility = false;
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  });
</script>

<main>
  {#if $visibility}
    <slot />
  {/if}
</main>
