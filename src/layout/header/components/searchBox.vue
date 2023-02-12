<template>
  <div class="search-box-wrapper">
    <div class="layout-header-search">
      <div class="layout-header-browser-btns flex align-center">
        <div class="browser-btn back active" title="刷新" @click="refeshWindow">
          <mdi-icon
            name="refresh"
            size="18"
            color="var(--color-header-icon)"
          />
        </div>
        <div
          :class="[
            'browser-btn',
            'back',
            'p-l-6',
            {
              active: _router.router.previous.size > 0,
            },
          ]"
          title="后退"
          @click="_router.router.goToPrevious"
        >
          <mdi-icon name="arrow_back_ios" size="16" color="var(--color-header-icon)" />
        </div>
        <div
          :class="['browser-btn', { active: _router.router.next.size > 0 }]"
          title="前进"
          @click="_router.router.goToNext"
        >
          <mdi-icon name="arrow_forward_ios" size="16" color="var(--color-header-icon)" />
        </div>
      </div>
      <div
        class="layout-header-input flex align-center"
        v-click-outside="() => onPopoverVisivibleChange(false)"
      >
        <mdi-icon
          name="search"
          color="#fff"
          size="18"
          class="search-icon cursor p-t-2"
          v-click="() => onSearch()"
        />
        <input
          ref="input"
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
          <div class="search-popover-history" v-if="!!searchHistory.length">
            <p class="search-popover-title">
              <span>搜索历史</span>
              <mdi-icon name="delete_forever" hover title="清空" @click="clearHistory" />
            </p>
            <ul class="history-wrapper">
              <li
                class="history-item"
                v-for="item in searchHistory"
                :key="item"
              >
                <el-tag
                  type="info"
                  round
                  closable
                  class="history-tag cursor"
                  @click="onTipClick(item)"
                  @close="onTagClose(item)"
                  >{{ item }}</el-tag
                >
              </li>
            </ul>
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
import { ElMessage, ElMessageBox } from "element-plus";

const { _router, system } = useStore();
const { searchHistory, keyword } = storeToRefs(system);

const refeshWindow = () => {
  location.reload();
};

const searchKey = ref("");
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

const onTagClose = (key: string) => {
  const index = searchHistory.value.findIndex(item => item === key);
  if (index > -1) {
    searchHistory.value.splice(index, 1);
  }
};

const route = useRoute();
const router = useRouter();
const input = ref<HTMLInputElement>()
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
  input.value?.blur()
  isPopoverVisible.value = false;
};

const isPopoverVisible = ref(false);

const onPopoverVisivibleChange = (visible: boolean) => {
  if (visible) {
    getSearchTips();
  }
  isPopoverVisible.value = visible;
};

const clearHistory = () => {
  ElMessageBox.confirm("确认清空搜索历史?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      searchHistory.value = [];
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除成功",
      });
    });
};
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  -webkit-app-region: no-drag;
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
