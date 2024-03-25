<template>
  <div>
    <slot>
      <span class="loaderspinner"></span>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 100%;
  // height: 100%;
  height: 80%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .loaderspinner {
    height: 30px;
    width: 30px;
    margin: auto;
    display: flex;
    position: absolute;
    -webkit-animation: rotation 0.6s infinite linear;
    -moz-animation: rotation 0.6s infinite linear;
    -o-animation: rotation 0.6s infinite linear;
    animation: rotation 0.5s infinite linear;
    border-left: 6px solid $base-color;
    border-right: 6px solid $base-color-1;
    border-bottom: 6px solid $base-color-2;
    border-top: 6px solid $base-color-3;
    border-radius: 100%;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(359deg);
    }
  }

  @-moz-keyframes rotation {
    from {
      -moz-transform: rotate(0deg);
    }

    to {
      -moz-transform: rotate(359deg);
    }
  }

  @-o-keyframes rotation {
    from {
      -o-transform: rotate(0deg);
    }

    to {
      -o-transform: rotate(359deg);
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }

  #loaderoverlay {
    position: fixed;
    /* Sit on top of the page content */
    display: none;
    /* Hidden by default */
    width: 100%;
    /* Full width (cover the whole page) */
    height: 100%;
    /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    z-index: 2;
    /* Specify a stack order in case you're using a different order for other elements */
    cursor: not-allowed;
    /* Add a pointer on hover */
  }
}
</style>
