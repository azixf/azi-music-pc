<template>
  <div v-for="item in menu">
    <h1 class="m-b-16">{{ item.name }}</h1>
    <el-row :gutter="16">
      <el-col
        class="m-b-16"
        :sm="6"
        :md="6"
        :xl="6"
        :lg="4"
        v-for="subitem in item.list"
      >
        <list-item :src="subitem.pic" :detail="subitem.name"></list-item>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeRank",
};
</script>

<script lang="ts" setup>
import { apiGetKWMenu } from "@/api";
import { KWMenuItem } from "@/typings/playlist";

const menu = ref<KWMenuItem[]>([]);

onBeforeMount(() => {
  getMenu();
});

const getMenu = async () => {
  const [err, res] = await apiGetKWMenu();
  console.log("res: ", res);
  if (!err) {
    menu.value = res?.data;
  }
};
</script>

<style lang="scss" scoped></style>
