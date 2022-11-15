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
          v-show="play_state === 'pause'"
        />
        <svg-icon name="pause" size="20px" v-show="play_state === 'play'" />
      </div>
      <svg-icon name="skip-next" size="20px" />
      <svg-icon name="add_to_list" size="20px" />
    </div>
    <div class="music-progress-bar">
      <span>{{ currentTimeFlag }}</span>
      <div class="progress-bar-box">
        <el-slider
          v-model="progress"
          :show-tooltip="false"
          @change="onAudioProgressChanged"
        />
      </div>
      <span>{{ endTime }}</span>
    </div>
    <audio ref="audioRef" :src="link"></audio>
  </div>
</template>

<script lang="ts">
export default {
  name: "AudioPlayer",
};
</script>

<script lang="ts" setup>
import { throttle } from "@/lib/utils/common";
import { useStore } from "@/store";

const link =
  "http://cdn.xieblog.ltd/music/%E6%90%81%E6%B5%85-%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3";

const audioRef = ref();

const { player } = useStore();
const { volume } = storeToRefs(player);

watch(
  () => volume.value,
  current => {
    console.log(current);
    audioRef.value.volume = current / 100;
  }
);

onMounted(() => {
  audioRef.value.addEventListener("canplay", canplayHandler);
  audioRef.value.addEventListener("ended", endedHandler);
  audioRef.value.addEventListener("timeupdate", timeupdateHandler);
});

const canplayHandler = (e: any) => {
  duration.value = e.target.duration;
  setStartAndEndTime(e.target.duration);
};

const endedHandler = (e: any) => {
  console.log("end");
  play_state.value = PlayState[1];
};

const timeupdateHandler = throttle((e: any) => {
  const current = e.target.currentTime;
  progress.value = Math.ceil((current / duration.value) * 100);
  console.log(duration.value, progress.value);
  currentTime.value = current;
  currentTimeFlag.value = formatTime(currentTime.value);
}, 800);

enum PlayState {
  "play",
  "pause",
}
const play_state = ref(PlayState[1]);

// 播放和暂停
const onPlayStateChange = (state: string) => {
  if (state === "play") {
    audioRef.value.pause();
    play_state.value = PlayState[1];
  } else {
    audioRef.value.play();
    play_state.value = PlayState[0];
  }
};

const progress = ref(0); // 进度条进度
const currentTime = ref(0); // 播放的时间 ms
const currentTimeFlag = ref("0:00"); // 播放的时间 minitues:seconds
const endTime = ref("0:00"); // 音频的长度  minitues:seconds
const duration = ref(0); // 音频的长度 ms

// 拖动播放进度条
const onAudioProgressChanged = (current: number) => {
  progress.value = current;
  currentTime.value = (current / 100) * duration.value;
  audioRef.value.currentTime = currentTime.value;
  currentTimeFlag.value = formatTime(currentTime.value);
};

// 获取音频时间长度
const setStartAndEndTime = (duration: number) => {
  endTime.value = formatTime(duration);
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
