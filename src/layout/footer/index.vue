<template>
  <footer class="layout-footer">
    <div class="layout-footer-left">
      <div class="play-music-pic">
        <div class="play-music-mask">
          <svg-icon name="arrow-left" color="#eee" />
        </div>
        <img src="@/assets/vue.svg" alt="" />
      </div>
      <div class="play-name text-ellipsis cursor">晴天</div>
    </div>
    <div class="layout-footer-center">
      <div class="music-operation-btns">
        <svg-icon name="random" size="20px" />
        <svg-icon name="previous" size="20px" />
        <svg-icon name="play circle" size="20px" />
        <svg-icon name="next" size="20px" />
      </div>
      <div class="music-progress-bar">
        <span>0:00</span>
        <div>bar</div>
        <span>3:45</span>
      </div>
    </div>
    <div class="layout-footer-right">
      <svg-icon name="volume"  />
      <svg-icon name="musiclist"  />
    </div>
  </footer>
</template>

<script lang='ts'>
  export default {
    name: 'LayoutFooter'
  }
</script>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
.layout-footer {
  height: 100%;
  padding: var(--padding-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    .play-music-pic {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-small);
      margin-right: var(--padding-small);
      cursor: pointer;
      &:hover {
        .play-music-mask {
          display: flex;
        }
      }
      .play-music-mask {
        position: absolute;
        width: 40px;
        height: 40px;
        background: var(--color-mask);
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
      }
      img {
        object-fit: cover;
      }
    }
    .play-name {
      width: 120px;
    }
  }

  &-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    .music-operation-btns {
      display: flex;
      gap: 0 var(--padding-default);
      .svg-icon {
        cursor: pointer;
      }
    }
    .music-progress-bar {
      margin-top: var(--padding-small);
      display: flex;
      span {
        font-size: 12px;
      }
    }
  }

  &-right {
    display: flex;
    gap: 0 var(--padding-small);
    .svg-icon {
      cursor: pointer;
    }
  }
}
</style>

