<template>
  <div class="playlist-wrapper">
    <section class="playlist-top">
      <el-row :gutter="16">
        <el-col :span="4">
          <img
            class="playlist-cover"
            src="@/assets/vue.svg"
            alt="playlist-cover"
          />
        </el-col>
        <el-col :span="20">
          <div class="playlist-header">
            <div class="playlist-header__tag">歌单</div>
            <div class="playlist-header__name">我喜欢的音乐</div>
          </div>
          <div class="playlist-info">
            <span>谁</span>
            <span class="m-l-16"> 2022-12-15创建 </span>
          </div>
          <div class="playlist-content">
            <div class="playlist-content__playall">
              <svg-icon name="play_fill" size="18px" color="#fff" />
              <span class="cursor">播放全部</span>
              <el-divider direction="vertical" />
              <svg-icon class="cursor" name="add" size="18px" color="#fff" />
            </div>
            <div class="playlist-content__collect">
              <svg-icon name="download" size="18px" />
              <span class="cursor">收藏</span>
            </div>
            <div class="playlist-content__download">
              <svg-icon name="download" size="18px" />
              <span class="cursor">下载全部</span>
            </div>
          </div>
          <div class="playlist-data">
            <span>歌曲：155</span>
            <span class="m-l-24">收听：1555555</span>
          </div>
          <div class="playlist-tag m-t-16">
            <el-tag>怀旧</el-tag>
            <el-tag>伤感</el-tag>
            <el-tag>忧伤</el-tag>
            <el-tag>情歌</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row class="m-t-24 m-b-16">
        <el-col :span="6" class="playlist-list__title">歌曲列表</el-col>
        <el-col :span="6" :offset="12">
          <el-input type="text" placeholder="搜索歌单音乐">
            <template #prefix>
              <svg-icon name="search" size="14px"></svg-icon>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </section>
    <section class="playlist-table">
      <el-table :data="data" stripe>
        <el-table-column type="index" />
        <el-table-column prop="operation" label="操作">
          <div class="playlist-table__operation">
            <svg-icon
              name="heart-fill"
              color="var(--color-primary)"
              size="18px"
            ></svg-icon>
            <svg-icon name="download" size="18px"></svg-icon>
          </div>
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template #default="{ row }">
            <div class="playlist-table__title">
              <span>{{ row.title }}</span>
              <span class="flag">MV</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="singer" label="歌手" />
        <el-table-column prop="album" label="专辑" />
        <el-table-column prop="duration" label="时间" />
      </el-table>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: "PlayList",
};
</script>

<script lang="ts" setup>
const data = ref([
  {
    title: "title1",
    singer: "singer1",
    album: "album1",
    duration: 3000,
  },
  {
    title: "title2",
    singer: "singer2",
    album: "album2",
    duration: 2000,
  },
  ...Array.from(new Array(60), () => {
    return {
      title: "title2",
      singer: "singer2",
      album: "album2",
      duration: 2000,
    };
  }),
]);
</script>

<style lang="scss" scoped>
.playlist {
  &-cover {
    width: 80%;
    height: 80%;
    border-radius: var(--radius-default);
  }

  &-header {
    display: flex;
    align-items: center;
    gap: var(--padding-small);
    margin-bottom: var(--padding-small);
    &__tag {
      border: 1px solid var(--color-border);
      border-radius: var(--radius-small);
      padding: 2px 3px;
      color: var(--color-primary);
    }
    &__name {
      font-size: var(--font-extra-large);
      font-weight: var(--font-weight-600);
    }
  }

  &-info {
    span {
      color: var(--color-text);
      font-size: var(--font-small);
    }
    margin-bottom: var(--padding-small);
  }

  &-content {
    display: flex;
    align-items: center;
    gap: var(--padding-small);
    margin-bottom: var(--padding-small);
    &__playall {
      padding: 6px 12px;
      background-color: var(--color-primary);
      border-radius: 20px;
      color: var(--el-color-primary-light-9);
      display: flex;
      align-items: center;
      gap: var(--padding-mini);
    }
    &__download,
    &__collect {
      padding: 6px 16px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: var(--padding-mini);
      border: 1px solid var(--color-border);
    }
  }

  &-data {
    span {
      font-size: var(--font-small);
      color: var(--color-text);
    }
  }

  &-tag {
    display: flex;
    align-items: center;
    gap: var(--padding-small);
  }

  &-list {
    &__title {
      font-size: var(--font-large);
      font-weight: var(--font-weight-550);
    }
  }

  &-table {
    &__operation {
      display: flex;
      align-items: center;
      gap: var(--padding-small);
      :deep(.svg-icon) {
        cursor: pointer;
      }
    }

    &__title {
      .flag {
        margin-left: var(--padding-mini);
        font-size: var(--font-small);
        font-style: italic;
        cursor: pointer;
        font-weight: var(--font-weight-600);
        color: var(--color-primary);
      }
    }
  }
}
</style>
