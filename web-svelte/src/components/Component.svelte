<script lang="ts">
  import { debugData } from "@/utils/debugData";
  import { fetchNui } from "@/utils/fetchNui";
  import { fade, fly } from "svelte/transition";
  import { useNuiEvent } from "@/utils/useNuiEvent";
  import { debug } from "../store/stores";
  import type { PromiseResp } from "@types";
  import { onMount } from "svelte";

  // import Draggable from "./Draggable.svelte";

  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const test = async () => {
    const resp = await fetchNui<PromiseResp<any>>(
      "cunt",
      {
        plate: "INSERTPLATEHERE",
        cost: 5000,
        cunt: "Hello World!",
      },
      {}
    );
  };

  debugData([
    {
      action: "setDebug",
      data: [
        {
          type: "NuiMessage",
          action: "setDebug",
          body: [
            {
              source: 1,
              name: "Chris Snapshot",
              message: "Hello World",
            },
          ],
        },
        {
          type: "Callback",
          event: "lc-ui:callbackFromServer",
          body: {
            data: "Being sent to the server",
            waiting: "Waiting for a response",
          },
          resp: {
            data: {
              testing: "Hello World",
            },
            status: "ok",
          },
        },
      ],
    },
  ]);

  useNuiEvent<any>("setDebug", (data: any) => {
    $debug = data;
  });

  onMount(() => {
    let left = localStorage.getItem("left");
    let top = localStorage.getItem("top");
    let debugPos = localStorage.getItem("debugposition");
    let debugSize = localStorage.getItem("debugsize");
    console.log(debugPos);
    // Set window to forground when mounted
    let app_window = document.querySelector("#lc-debug");
    if (typeof debugPos == "string") {
      debugPos = JSON.parse(debugPos);
    }
    if (typeof debugSize == "string") {
      debugSize = JSON.parse(debugSize);
    }

    // its still setting left and top somewhere
    // app_window.style.top = debugPos.x + "px";
    // app_window.style.top = debugPos.x + "px";
    // app_window.style.left = getRandomInt(3, 45) + "%";

    // app_window.attr
    // need to set data-x and data-y
    // app_window.data("x", debugPos.x);

    let lcDebugBox = document.getElementById("lc-debug");

    lcDebugBox.style.webkitTransform = lcDebugBox.style.transform =
      "translate(" + debugPos.x + "px, " + debugPos.y + "px)";

      lcDebugBox.style.height = debugSize.h + "px";
      lcDebugBox.style.width = debugSize.w + "px";

    // update the posiion attributes
    lcDebugBox.setAttribute("data-x", debugPos.x);
    lcDebugBox.setAttribute("data-y", debugPos.y);

    // document.getElementById(
    //   "lc-debug"
    // ).style.transform = `translate(${debugPos.x}px, ${debugPos.y}px)`;

    // app_window.css("transform", `translate(${debugPos.x}px, ${debugPos.y}px);`);
    // app_window.css("top", debugPos.y + "px");
  });
  // function onMouseUp() {
  // 	moving = false;
  //   // localStorage.setItem("left", left)
  //   // localStorage.setItem("top", top)
  // }

  import gsap from "gsap";
  import interact from "interactjs";
  import Draggable from "gsap/Draggable";
  gsap.registerPlugin(Draggable);

  function dragMoveListener(event: any) {
    var target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    localStorage.setItem("debugposition", JSON.stringify({ x: x, y: y }));

    if (target && target.style) {
      // translate the element
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";

      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    }
  }

  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

  interact("#lc-debug")
    .resizable({
      // resize from all edges and corners
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move(event) {
          var target = event.target;
          var x = parseFloat(target.getAttribute("data-x")) || 0;
          var y = parseFloat(target.getAttribute("data-y")) || 0;

          if (target && target.style) {
            target.style.width = event.rect.width + "px";
            target.style.height = event.rect.height + "px";

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            localStorage.setItem("debugsize", JSON.stringify({ w: event.rect.width, h: event.rect.height }));
            localStorage.setItem("debugposition", JSON.stringify({ x: x, y: y }));
            
            target.style.transform = "translate(" + x + "px," + y + "px)";
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
          }
        },
        // update the element's style
      },
      modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictSize({
          min: {
            width: 350,
            height: 350,
          },
        }),
        interact.modifiers.restrictEdges({
          outer: ".main-window",
        }),
      ],

      inertia: true,
    })
    .draggable({
      trigger: ".drag-bar",
      listeners: {
        move: window.dragMoveListener,
      },
      inertia: {
        resistance: 30,
        minSpeed: 10,
        endSpeed: 5,
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: ".main-window",
          endOnly: false,
        }),
      ],
    });
</script>

<div
  class="absolute main-window w-screen h-screen  text-center font-cairo p-4 overflow-hidden pointer-events-none"
  in:fade={{ duration: 200 }}
  out:fade={{ duration: 200 }}
>
  <!-- <Draggable> -->
  <div
    id="lc-debug"
    class="draggable absolute bg-fore/80 w-96 rounded-lg text-left h-[80vh] flex flex-col gap-2 px-2 py-1 pointer-events-auto"
  >
    <div
      class="drag-bar title text-white uppercase flex items-center justify-between"
    >
      <span><b>Lucid</b> Request Debugger</span>
      <button
        class="bg-primary/80 hover:bg-primary transition text-xs rounded-lg px-4 py-0.5 uppercase"
        on:click={() => test()}>Test Request</button
      >
    </div>

    <div class="scrollbar overflow-y-auto flex flex-col gap-2">
      <!-- Loopable request box -->
      {#each $debug as i, index}
        <!-- <pre class="text-white">{JSON.stringify(i, null, 4)}</pre> -->
        <div
          class="request-box {i.event ? 'bg-bg' : 'bg-fore'}"
          in:fade={{ duration: 1000 }}
          out:fade={{ duration: 1000 }}
        >
          <div
            class="{i.event
              ? 'bg-secondary/50'
              : 'bg-primary/90'} text-white leading-none block flex items-center gap-1 text-sm flex justify-between"
          >
            <div class="text-xs">
              <span class="px-2 font-bold leading-none pr-2">
                {i.event ? "Event" : "Action"}:
              </span>

              {i.event || i.action}
            </div>
            <span class="bg-black/20 p-1 text-xs">{i.type}</span>
          </div>

          <div class="request-inner p-1">
            <div
              class="bg-blue-400/50 leading-none text-white uppercase text-xs p-1"
            >
              Body
            </div>

            <pre
              class="bg-blue-400/10 text-white text-left text-sm p-2 relative">{JSON.stringify(
                i.body,
                null,
                2
              )}</pre>
          </div>

          {#if i.event}
            <div class="request-inner p-1">
              <!-- Body -->

              {#if i.resp}
                <div
                  class="{i.resp.status != undefined && i.resp.status == 'ok'
                    ? 'bg-green-700/50'
                    : 'bg-red-700/50'} leading-none text-white uppercase text-xs flex justify-between items-center pl-1"
                >
                  Response
                  <span class="bg-black/10 p-1 lowercase"
                    >{i.responseTime} ms</span
                  >
                </div>
                <pre
                  class="{i.resp.status != undefined && i.resp.status == 'ok'
                    ? 'bg-green-700/10'
                    : 'bg-red-700/10'} text-white text-left text-sm p-2 relative">{i.resp
                    ? JSON.stringify(i.resp, null, 2)
                    : "No response"}</pre>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    <!-- <pre>{JSON.stringify($debug, null, 4)}</pre> -->
  </div>
  <!-- </Draggable> -->
</div>

<style lang="scss">
</style>
