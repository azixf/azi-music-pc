<template>
  <div class="audio-player">
    <div class="music-operation-btns">
      <div class="play-mode-box">
        <svg-icon name="loop" size="20px" />
      </div>
      <svg-icon name="skip_previous" size="20px" />
      <div class="play-state-box" @click="onPlayStateChange(play_state)">
        <svg-icon
          name="play_fill"
          size="20px"
          v-show="play_state === PlayState[1]"
        />
        <svg-icon name="pause" size="20px" v-show="play_state === PlayState[0]" />
        <loading-icon soze="20" v-show="play_state === PlayState[2]" />
      </div>
      <svg-icon name="skip-next" size="20px" />
      <lyric-box />
    </div>
    <div class="music-progress-bar">
      <span>{{ current_info.time_ms || '0.00' }}</span>
      <div class="progress-bar-box">
        <el-slider
          v-model="current_info.progress"
          :show-tooltip="false"
          @change="onAudioProgressChanged"
        />
      </div>
      <span>{{ current_info.duration_ms || '0.00' }}</span>
    </div>
    <audio
      ref="audioRef"
      :src="current_info.src"
      :loop="loop"
      :autoplay="autoplay"
    ></audio>
  </div>
</template>

<script lang="ts">
import LyricBox from "./lyricBox.vue";
export default {
  name: "AudioPlayer",
  components: {
    LyricBox,
  },
};
</script>

<script lang="ts" setup>
import { throttle } from "@/lib/utils/common";
import { useStore } from "@/store";
import { ElMessageBox } from "element-plus";
import { apiVerifyMusicByHash } from "@/api";

const audioRef = ref();

const { player } = useStore();
const { volume, current_info, loop, autoplay } = storeToRefs(player);

watch(() => current_info.value.src, () => {
  loadSrc(() => {
    play_state.value = PlayState[2];
  })
})

// listen volume changed
watch(
  () => volume.value,
  current => {
    audioRef.value.volume = current / 100;
  }
);

// listen src changed 

interface KGData {
  author: string;
  avatar: string;
  name: string;
  pic: string;
  url: string;
}

onBeforeMount(() => {
  loadSrc();
});

// verify hash to audio src
const loadSrc = (cb?: () => void) => {
  if (
    current_info.value.origin === "kugou" &&
    !current_info.value.src?.startsWith("http")
  ) {
    apiVerifyMusicByHash(current_info.value.src!).then((res: any) => {
      const data = res.data as KGData;
      if (data.url) {
        current_info.value.src = data.url;
        cb && cb();
      }
    });
  } else {
    cb && cb();
  }
};

onMounted(() => {
  audioRef.value.currentTime = current_info.value.time;
  audioRef.value.volume = volume.value / 100;
  audioRef.value.addEventListener("canplay", canplayHandler);
  audioRef.value.addEventListener("ended", endedHandler);
  audioRef.value.addEventListener("timeupdate", timeupdateHandler);
});

const canplayHandler = (e: any) => {
  console.log('canplay');
  if (play_state.value === PlayState[2]) {
    audioRef.value.play();
    play_state.value = PlayState[0];
  }
};

const endedHandler = (e: any) => {
  play_state.value = PlayState[1];
};

const timeupdateHandler = throttle((e: any) => {
  const current = e.target.currentTime;
  current_info.value.progress = Math.ceil((current / current_info.value.duration!) * 100);
  current_info.value.time = current;
  current_info.value.time_ms = formatTime(current);
}, 1000);

enum PlayState {
  "playing",
  "pause",
  "loading",
}
const play_state = ref(PlayState[1]);

// play and pause
const onPlayStateChange = (state: string) => {
  if (!current_info.value.src || state === PlayState[2]) {
    ElMessageBox.alert('未选择要播放的歌曲或正在加载中...', '播放提示', {
      confirmButtonText: '确定'
    })
    return;
  }
  if (state === PlayState[0]) {
    audioRef.value.pause();
    play_state.value = PlayState[1];
  } else if(state === PlayState[1]) {
    audioRef.value.play();
    play_state.value = PlayState[0];
  }
};

// 拖动播放进度条
const onAudioProgressChanged = (current: number) => {
  current_info.value.progress = current;
  current_info.value.time = (current / 100) * current_info.value.duration!;
  audioRef.value.currentTime = current_info.value.time;
  current_info.value.time_ms = formatTime(current_info.value.time);
};

// 格式化时间
const formatTime = (duration: number): string => {
  const minitues = Math.floor(duration / 60);
  const seconds = Math.ceil(duration % 60);
  return `${minitues}:${(seconds + "").padStart(2, "0")}`;
};
</script>

<style lang="scss" scoped>
.audio-player {
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
    display: flex;
    align-items: center;
    user-select: none;
    .progress-bar-box {
      width: 260px;
      cursor: pointer;
      margin: 0 var(--padding-small);
    }
    span {
      font-size: 12px;
    }
    :deep(.el-slider__button) {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
