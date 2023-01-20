<template>
  <div class="window-operation">
    <font-icon
      :name="onTop ? 'icon_top1' : 'icon_top'"
      size="18"
      color="var(--color-header-icon)"
      hover-color="#ffffff"
      @click="onOperateWindow('fix')"
    ></font-icon>
    <svg-icon
      name="minus"
      size="18px"
      color="var(--color-header-icon)"
      @click="onOperateWindow('minify')"
    />
    <svg-icon
      name="full_screen"
      size="18px"
      color="var(--color-header-icon)"
      @click="onOperateWindow('toggleMaxize')"
    />
    <svg-icon
      name="close"
      size="18px"
      color="var(--color-header-icon)"
      @click="onOperateWindow('close')"
    />
  </div>
  <el-dialog
    v-model="closeDialogVisible"
    title="关闭应用"
    width="45%"
    @closed="onModalClosed"
  >
    <el-form :model="form">
      <p class="m-b-8">
        <el-radio-group v-model="form.closeType">
          <el-radio label="close">直接关闭应用</el-radio>
          <el-radio label="hide">最小化到托盘</el-radio>
        </el-radio-group>
      </p>
      <el-checkbox v-model="form.remembered" label="记住我的选择" border />
      <div class="flex justify-end m-t-12" slot="footer">
        <el-button type="primary" @click="onModalConfirm">确定</el-button>
        <el-button @click="onModalCancel">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
export default {
  name: "WindowOperation",
};
</script>

<script lang="ts" setup>
import { useStore } from "@/store";
import { CloseMethod } from "@/store/module/system";
import { ipcRenderer } from "electron";

const form = reactive({
  remembered: false,
  closeType: "hide",
});
const closeDialogVisible = ref(false);
const modalType = ref("");

const { system } = useStore();
const { closeType, onTop } = storeToRefs(system);

type WindowOperitionType = "minify" | "toggleMaxize" | "close" | "fix";
const onOperateWindow = (type: WindowOperitionType) => {
  // if (type === "minify") {
  //   // appWindow.minimize();
  // } else if (type === "toggleMaxize") {
  //   appWindow.toggleMaximize();
  // } else if (type === "close") {
  //   if (closeType.value === "close") return appWindow.close();
  //   if (closeType.value === "hide") return appWindow.hide();
  //   closeDialogVisible.value = true;
  // } else {
  //   onTop.value = !onTop.value;
  //   appWindow.setAlwaysOnTop(onTop.value);
  // }
  if (type === "fix") {
    onTop.value = !onTop.value;
    ipcRenderer.send("set-on-top", onTop.value);
  } else if (type === "close") {
    if (closeType.value === "close")
      return ipcRenderer.send("window-operation", "close");
    if (closeType.value === "hide")
      return ipcRenderer.send("window-operation", "hide");
    closeDialogVisible.value = true;
  } else {
    ipcRenderer.send("window-operation", type);
  }
};

const resetForm = () => {
  form.remembered = false;
  form.closeType = "hide";
};

const onModalCancel = () => {
  closeDialogVisible.value = false;
  modalType.value = "cancel";
  resetForm();
};

const onModalConfirm = () => {
  closeDialogVisible.value = false;
  modalType.value = "confirm";
};

const onModalClosed = () => {
  if (modalType.value === "cancel") return;
  if (form.remembered) {
    closeType.value = form.closeType as CloseMethod;
  } else {
    closeType.value = "none";
  }
  if (form.closeType === "hide") {
    ipcRenderer.send("window-operation", "hide");
  } else {
    ipcRenderer.send("window-operation", "close");
  }
  resetForm();
};
</script>

<style lang="scss" scoped>
.window-operation {
  display: flex;
  gap: var(--padding-default);
  .svg-icon {
    cursor: pointer;
    &:hover {
      color: #fff !important;
    }
  }
}
</style>
