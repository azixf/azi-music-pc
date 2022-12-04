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
          v-show="play_state === PlayState.pause"
        />
        <svg-icon
          name="pause"
          size="20px"
          v-show="play_state === PlayState.playing"
        />
      </div>
      <svg-icon name="skip-next" size="20px" />
      <lyric-box />
    </div>
    <div class="music-progress-bar">
      <span>{{ current_info.time_ms || "0.00" }}</span>
      <div class="progress-bar-box">
        <el-slider
          v-model="current_info.progress"
          :show-tooltip="false"
          @change="onAudioProgressChanged"
        />
      </div>
      <span>{{ current_info.duration_ms || "0.00" }}</span>
    </div>
    <audio
      ref="audioRef"
      :src="current_info.src"
      :currentTime="current_info.time"
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
import { formatTime } from "@/lib/utils/common";
import { useStore } from "@/store";
import { ElMessageBox } from "element-plus";
import { apiVerifyMusicByHash } from "@/api";

const audioRef = ref();

const { player } = useStore();
const { volume, current_info, autoplay } = storeToRefs(player);

watch(
  () => current_info.value.src,
  () => {
    loadSrc(() => {
      audioRef.value.play();
    });
  }
);

watch(
  () => volume.value,
  current => {
    audioRef.value.volume = current / 100;
  }
);

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

const loadSrc = (cb?: any) => {
  if (
    current_info.value.origin === "kugou" &&
    !current_info.value.src?.includes("http")
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
  audioRef.value.addEventListener("ended", endedHandler);
  audioRef.value.addEventListener("timeupdate", timeupdateHandler);
});

const endedHandler = (e: any) => {
  play_state.value = PlayState.pause;
};

const timeupdateHandler = (e: any) => {
  const current = e.target.currentTime;
  current_info.value.progress = Math.ceil(
    (current / current_info.value.duration!) * 100
  );
  current_info.value.time = current;
  current_info.value.time_ms = formatTime(current);
}

enum PlayState {
  "playing",
  "pause",
  "loading",
}
const play_state = ref(PlayState.pause);

// 播放和暂停
const onPlayStateChange = (state: PlayState) => {
  console.log(state);
  if (!current_info.value.src || state === PlayState.loading) {
    ElMessageBox.alert("未选择要播放的歌曲或正在加载中...", "温馨提示", {
      confirmButtonText: "我知道了",
    });
    return;
  }
  if (state === PlayState.pause) {
    audioRef.value.play();
    play_state.value = PlayState.playing;
  } else if (state === PlayState.playing) {
    audioRef.value.pause();
    play_state.value = PlayState.pause;
  }
};

// 拖动播放进度条
const onAudioProgressChanged = (current: number) => {
  current_info.value.progress = current;
  current_info.value.time = (current / 100) * current_info.value.duration!;
  current_info.value.time_ms = formatTime(current_info.value.time);
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
