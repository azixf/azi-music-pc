<template>
  <div class="search-box-wrapper">
    <div class="layout-header-search">
      <div class="layout-header-browser-btns flex align-center">
        <div class="browser-btn back active" title="刷新" @click="refeshWindow">
          <font-icon
            name="refresh"
            size="18"
            color="var(--color-header-icon)"
          />
        </div>
        <div
          :class="[
            'browser-btn',
            'back',
            {
              active: _router.router.previous.size > 0,
            },
          ]"
          title="后退"
          @click="_router.router.goToPrevious"
        >
          <svg-icon name="arrow-left" color="var(--color-header-icon)" />
        </div>
        <div
          :class="['browser-btn', { active: _router.router.next.size > 0 }]"
          title="前进"
          @click="_router.router.goToNext"
        >
          <svg-icon name="arrow-right" color="var(--color-header-icon)" />
        </div>
      </div>
      <div
        class="layout-header-input flex align-center"
        v-click-outside="() => onPopoverVisivibleChange(false)"
      >
        <svg-icon
          name="search"
          color="#fff"
          size="14px"
          class="search-icon cursor"
          v-click="() => onSearch()"
        />
        <input
          v-model="searchKey"
          type="text"
          placeholder="请输入"
          class="search-input"
          @input="onInputChange"
          @focus="onPopoverVisivibleChange(true)"
          @keyup.enter="onSearch"
        />
        <section class="search-popover" v-if="isPopoverVisible">
          <!-- <div class="search-popover-hot" v-if="!keyword">
            <p class="search-popover-title">热门搜索</p>
            <ul>
              <li v-for="item in 10" class="hot-item">这是什么</li>
            </ul>
          </div> -->
          <div class="search-popover-tip">
            <p class="search-popover-title">搜索提示</p>
            <ul v-if="!!tipsList.length">
              <li
                class="hot-item"
                v-for="item in tipsList"
                :key="item"
                v-click="() => onTipClick(item)"
              >
                {{ item }}
              </li>
            </ul>
            <el-empty :image-size="64" description="暂无搜索提示" v-else />
          </div>
          <div class="search-popover-history">
            <p class="search-popover-title">
              <span>搜索历史</span>
              <mdi-icon name="delete_forever" hover />
            </p>
            <ul class="history-wrapper" v-if="!!searchHistory.length">
              <li
                class="history-item"
                v-for="item in searchHistory"
                :key="item"
                v-click="() => onTipClick(item)"
              >
                <el-tag type="info" round class="history-tag cursor">{{
                  item
                }}</el-tag>
              </li>
            </ul>
            <el-empty :image-size="64" description="暂无搜索历史" v-else />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SearchBox",
};
</script>

<script lang="ts" setup>
import { vClickOutside, vClick } from "@/lib/directives";
import { useStore } from "@/store";
import { debounce } from "@/lib/utils/common";
import { apiGetKWSearchTips } from "@/api";

const { _router, system } = useStore();
const { searchHistory, keyword } = storeToRefs(system);

const refeshWindow = () => {
  location.reload();
};

const searchKey = ref('')
const tipsList = ref<string[]>([]);

const onInputChange = debounce(() => {
  getSearchTips();
}, 500);

const getSearchTips = async () => {
  if (searchKey.value) {
    const [err, data] = await apiGetKWSearchTips(searchKey.value);
    if (!err) {
      const tips = (data?.data as string[]) || ([] as string[]);
      const result: string[] = [];
      if (tips.length) {
        tips.map(item => {
          const arr = item.split("\r\n");
          const relword = arr[0];
          result.push(relword.slice(8));
        });
      }
      tipsList.value = result;
    }
  }
};

const onTipClick = (key: string) => {
  searchKey.value = key;
  onSearch();
};

const route = useRoute();
const router = useRouter();
const onSearch = async () => {
  keyword.value = searchKey.value;
  system.UPDATE_SEARCHHISTORY(searchKey.value);
  // const [err, data] = await apiKWSearch(keyword.value, 1, 30);
  // console.log("data: ", data);
  if (route.path !== "/search") {
    router.push({
      name: "search",
    });
  }
  isPopoverVisible.value = false;
};

const isPopoverVisible = ref(false);

const onPopoverVisivibleChange = (visible: boolean) => {
  if (visible) {
    getSearchTips();
  }
  isPopoverVisible.value = visible;
};
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  .layout-header-search {
    display: flex;
    align-items: center;
    .browser-btn {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background: var(--color-icon-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: not-allowed;
      &.back {
        margin-right: var(--padding-small);
      }
      &.active {
        cursor: pointer;
        &:active {
          opacity: 0.67;
        }
        :deep(.svg-icon) {
          color: #ffffff !important;
        }
      }
    }

    .layout-header-input {
      position: relative;
      margin-left: var(--padding-default);
      padding: 0 var(--padding-small);
      width: 200px;
      height: 32px;
      border-radius: 32px;
      background-color: var(--color-icon-bg);
      .search-icon {
        position: absolute;
        left: 12px;
      }
      .search-input {
        width: 150px;
        margin-left: var(--padding-large);
        outline: none;
        border: none;
        background-color: transparent;
        color: #ffffff;
        &::placeholder {
          color: var(--color-header-icon);
        }
      }
      .search-popover {
        position: absolute;
        left: 0;
        top: 32px;
        z-index: 10;
        width: 300px;
        padding: var(--padding-small) var(--padding-default);
        border-radius: var(--radius-default);
        background: var(--color-bg);
        box-shadow: 0 0 4px var(--color-border);
        &-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: var(--padding-mini);
        }
        .hot-item {
          padding: var(--padding-mini) 0;
          font-size: var(--font-small);
          color: var(--color-text);
          cursor: pointer;
          &:hover {
            background: var(--color-nav-hover);
          }
        }
        .history-wrapper {
          display: flex;
          flex-wrap: wrap;
        }
        .history-item {
          margin-right: var(--padding-mini);
          margin-bottom: var(--padding-mini);
        }
        .history-tag {
          font-size: var(--font-small);
          &.active {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
