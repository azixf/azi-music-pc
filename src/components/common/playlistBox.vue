<template>
  <el-dialog
    v-model="modelValue"
    :title="title"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form ref="formRef" :model="form" label-position="top">
      <el-form-item
        label="歌单名"
        prop="name"
        :rules="[{ required: true, message: '歌单名必填', trigger: 'blur' }]"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end">
      <el-button @click="onCancelled">取消</el-button>
      <el-button type="primary" @click="onConfirmed">创建</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
export default {
  name: "PlaylistBox",
};
</script>
<script lang="ts" setup>
import { usePlaylist } from "@/lib/hooks/userPlaylist";

interface PropType {
  modelValue: Boolean;
  title?: string;
}

const formRef = ref();

const form = reactive({
  name: "",
});

const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();

withDefaults(defineProps<PropType>(), {
  title: "创建歌单",
});

const onCancelled = () => {
  formRef.value.resetFields();
  emit("update:modelValue", false);
};

const { createPlaylist } = usePlaylist();
const onConfirmed = () => {
  formRef.value.validate().then(valid => {
    if (valid) {
      const result = createPlaylist(form.name);
      formRef.value.resetFields();
      if (result) {
        emit('update:modelValue', false)
      }
    }
  });
};
</script>
<style lang="scss" scoped></style>
