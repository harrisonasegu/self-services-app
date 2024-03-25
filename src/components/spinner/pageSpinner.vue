<template>
  <div id="loaderoverlay">
    <span><slot>Signing out user...</slot></span> <span class="loaderspinner"></span>
  </div>
</template>

<style lang="scss" scoped>
div#loaderoverlay {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  column-gap: 10px;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(5, 5, 32, 0.452);
  cursor: progress;
  color: #fff;

  .loaderspinner {
    height: 20px;
    width: 20px;
    // margin: auto;
    display: flex;
    // position: absolute;
    -webkit-animation: rotation 0.6s infinite linear;
    -moz-animation: rotation 0.6s infinite linear;
    -o-animation: rotation 0.6s infinite linear;
    animation: rotation 0.6s infinite linear;
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
}
</style>
