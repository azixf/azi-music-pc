<template>
  <div class="audio-player">
    <div class="music-operation-btns">
      <div class="play-mode-box" @click="onPlaymodeChanged">
        <mdi-icon :name="modeObj.icon" :title="modeObj.title" hover />
      </div>
      <mdi-icon
        name="skip_previous"
        title="上一首"
        hover
        @click="modePlay('pre')"
      />
      <div class="play-state-box" @click="onplay_stateChange(playState)">
        <mdi-icon
          name="play_arrow"
          title="播放"
          hover
          v-if="playState === 'pause'"
        />
        <mdi-icon
          name="pause"
          hover
          title="暂停"
          v-else-if="playState === 'playing'"
        />
        <loading-icon size="20" v-else />
      </div>
      <mdi-icon
        name="skip_next"
        title="下一首"
        hover
        @click="modePlay('next')"
      />
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
      playState.value = "pause";
      audioRef.value.currentTime = current_info.value.time;
      playState.value = "loading";
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

onMounted(() => {
  audioRef.value.currentTime = current_info.value.time;
  audioRef.value.volume = volume.value / 100;
  audioRef.value.addEventListener("canplay", canplayHandler);
  audioRef.value.addEventListener("ended", endedHandler);
  audioRef.value.addEventListener("timeupdate", timeupdateHandler);
  player.ON_MODE_CHANGE();
});

const canplayHandler = (e: any) => {
  console.log("canplay");
  if (playState.value === "loading") {
    // audioRef.value.play();
    playState.value = "playing";
  }
};

const endedHandler = (e: any) => {
  console.log('ended')
  modePlay('next');
  playState.value = "pause";
};

const timeupdateHandler = throttle((e: any) => {
  const current = e.target.currentTime;
  current_info.value.progress = Math.ceil(
    (current / current_info.value.duration!) * 100
  );
  current_info.value.time = current;
  current_info.value.time_ms = formatTime(current);
  // console.log("time: ", current, current_info.value.time, formatTime(current));
}, 200);

// play and pause
const onplay_stateChange = (state: MusicPlayState) => {
  if (!current_info.value.src || state === "loading") {
    ElMessageBox.alert("未选择要播放的歌曲或正在加载中...", "播放提示", {
      confirmButtonText: "确定",
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

// 拖动播放进度条
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
    title: "列表循环",
  },
  {
    index: 1,
    key: "order",
    icon: "reorder",
    title: "顺序播放",
  },
  {
    index: 2,
    key: "random",
    icon: "shuffle",
    title: "随机播放",
  },
  {
    index: 3,
    key: "single",
    icon: "settings_backup_restore",
    title: "单曲循环",
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
  player.ON_MODE_CHANGE();
};

const modePlay = (type: string) => {
  player.PLAY_WITH_MODE(type);
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
