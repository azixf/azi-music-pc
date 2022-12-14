<template>
  <div class="audio-player">
    <div class="music-operation-btns">
      <div
        class="play-mode-box"
        :title="modeObj.title"
        @click="onPlaymodeChanged"
      >
        <font-icon :name="modeObj.icon" size="20" />
      </div>
      <svg-icon name="skip_previous" size="20px" />
      <div class="play-state-box" @click="onplay_stateChange(playState)">
        <svg-icon name="play_fill" size="20px" v-if="playState === 'pause'" />
        <svg-icon
          name="pause"
          size="20px"
          v-else-if="playState === 'playing'"
        />
        <loading-icon size="20" v-else />
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
      :loop="mode === 'single'"
      :autoplay="autoplay"
    ></audio>
  </div>
</template>

<script lang="ts">
import LyricBox from "./lyricBox.vue";
import { MusicPlayState, PlayMode } from "@/typings/player";
export default {
  name: "AudioPlayer",
  components: {
    LyricBox,
  },
};
</script>

<script lang="ts" setup>
import { formatTime, throttle } from "@/lib/utils/common";
import { useStore } from "@/store";
import { ElMessageBox } from "element-plus";
import { apiKGVerifyMusicByHash } from "@/api";

const audioRef = ref();

const { player } = useStore();
const { volume, current_info, mode, autoplay, playState } = storeToRefs(player);

// listen playState change
watch(
  () => playState.value,
  state => {
    console.log("state:", state);
    if (state === "playing") {
      audioRef.value.play();
    } else if (state === "pause") {
      audioRef.value.pause();
    }
  }
);

// listen music changed
watch(
  [() => current_info.value.src, () => current_info.value.play_time],
  ([src, time], [psrc, ptime]) => {
    console.log(src, psrc, time, ptime);
    if (src) {
      loadSrc(() => {
        console.log("executed");
        playState.value = "pause";
        audioRef.value.currentTime = current_info.value.time;
        playState.value = "loading";
      });
    }
  }
);

// listen volume changed
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

// verify hash to audio src
const loadSrc = async (cb?: () => void) => {
  if (
    current_info.value.origin === "kugou" &&
    !current_info.value.src?.startsWith("http")
  ) {
    const [err, res] = await apiKGVerifyMusicByHash(current_info.value.src!);
    if (!err) {
      const data = res!.data as KGData;
      if (data.url) {
        current_info.value.src = data.url;
        cb && cb();
      }
    }
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
  console.log("canplay");
  if (playState.value === "loading") {
    // audioRef.value.play();
    playState.value = "playing";
  }
};

const endedHandler = (e: any) => {
  playState.value = "pause";
};

const timeupdateHandler = throttle((e: any) => {
  const current = e.target.currentTime;
  current_info.value.progress = Math.ceil(
    (current / current_info.value.duration!) * 100
  );
  current_info.value.time = current;
  current_info.value.time_ms = formatTime(current);
}, 1000);

// play and pause
const onplay_stateChange = (state: MusicPlayState) => {
  if (!current_info.value.src || state === "loading") {
    ElMessageBox.alert("?????????????????????????????????????????????...", "????????????", {
      confirmButtonText: "??????",
    });
    return;
  }
  if (state === "playing") {
    // audioRef.value.pause();
    playState.value = "pause";
  } else if (state === "pause") {
    // audioRef.value.play();
    playState.value = "playing";
  }
};

// ?????????????????????
const onAudioProgressChanged = (current: number) => {
  current_info.value.progress = current;
  current_info.value.time = (current / 100) * current_info.value.duration!;
  audioRef.value.currentTime = current_info.value.time;
  current_info.value.time_ms = formatTime(current_info.value.time);
};

interface PlayModeItem {
  index: number;
  key: PlayMode;
  icon: string;
  title: string;
}

const playModeList: Array<PlayModeItem> = [
  {
    index: 0,
    key: "loop",
    icon: "loop",
    title: "????????????",
  },
  {
    index: 1,
    key: "order",
    icon: "shunxubofang",
    title: "????????????",
  },
  {
    index: 2,
    key: "random",
    icon: "random",
    title: "????????????",
  },
  {
    index: 3,
    key: "single",
    icon: "LOOP_ONCE",
    title: "????????????",
  },
];

// play mode icon
const modeObj = computed((): PlayModeItem => {
  return playModeList.find(item => item.key === mode.value)!;
});

// listen playmode if changed
const onPlaymodeChanged = () => {
  const index = modeObj.value.index + 1;
  if (index > 3) {
    mode.value = playModeList[0].key;
  } else {
    mode.value = playModeList[index].key;
  }
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
