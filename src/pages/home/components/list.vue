<template>
  <div class="m-b-16">
    <el-radio-group v-model="order" @change="onRadioChange">
      <el-radio-button label="new">最新</el-radio-button>
      <el-radio-button label="hot">最热</el-radio-button>
    </el-radio-group>
  </div>
  <section v-loading="!playlist.length">
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="6"
        :md="6"
        :xl="6"
        :lg="4"
        v-for="item in playlist"
      >
        <list-item
          :src="item.img"
          :detail="item.name"
          :show-mask="!!item.info"
          :mask-text="item.info"
          @click="goToDetail(item)"
        >
        </list-item>
      </el-col>
    </el-row>
    <div class="flex justify-center m-t-16">
      <el-pagination
        background
        v-model:current-page="pagination.page"
        :page-size="pagination.size"
        layout="prev, pager, next"
        :total="pagination.total"
        @current-change="onPaginationChange"
      ></el-pagination>
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "HomeList",
};
</script>

<script lang="ts" setup>
import { apiGetKWList } from "@/api";
import { recommendedListItem } from "@/typings/home";

const playlist = ref<recommendedListItem[]>([]);

const order = ref<"new" | "hot">("new");
const pagination = reactive({
  page: 1,
  size: 30,
  total: 0,
});

onBeforeMount(() => {
  getPlaylist();
});

const getPlaylist = async () => {
  playlist.value = [];
  const [err, res] = await apiGetKWList({
    order: order.value,
    page: pagination.page,
    size: pagination.size,
  });
  if (!err) {
    pagination.total = res?.data.total
    playlist.value = res?.data.data;
  }
};

const onRadioChange = (label: string) => {
  pagination.page = 1
  getPlaylist()
}

const onPaginationChange = () => {
  getPlaylist()
}

const router = useRouter();
const goToDetail = (item: recommendedListItem) => {
  router.push({
    name: "playlist",
    query: {
      type: "kuwo",
      pid: item.id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
