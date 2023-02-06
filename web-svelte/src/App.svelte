<script lang="ts">
  import VisibilityProvider from "./providers/VisibilityProvider.svelte";
  import Component from "./components/Component.svelte";
  import { debugData } from "./utils/debugData";
  import { useNuiEvent } from "./utils/useNuiEvent";
  import { debug } from "./store/stores";

  debugData([
    {
      action: "setVisible",
      data: {
        visible: true,
      },
    },
  ]);
</script>

<main>
  <VisibilityProvider>
    <Component />
  </VisibilityProvider>
</main>
