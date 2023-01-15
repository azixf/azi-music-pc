<template>
  <i :class="classes" :style="styles" @click="onClick" :title="title">{{ nextName }}</i>
</template>
<script lang="ts">
export default {
  name: 'MdiIcon',
}
</script>
<script lang="ts" setup>
import 'material-icons/iconfont/material-icons.css'
interface MdiIconProps {
  name: string
  size?: string | number
  color?: string
  transition?: string | number
  hover?: boolean
  type?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-one'
  title?: string
  onClick?: () => void
}

const props = withDefaults(defineProps<MdiIconProps>(), {
  size: 20,
  color: 'inherit',
  transition: '300',
  hover: false,
  type: 'filled',
  title: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: () => {},
})

const classes = computed(() => {
  let cls = 'mdi-icon'
  if (props.type === 'filled') {
    cls += ' material-icons'
  } else if (props.type === 'outlined') {
    cls += ' material-icons-outlined'
  } else if (props.type === 'round') {
    cls += ' material-icons-round'
  } else if (props.type === 'sharp') {
    cls += ' material-icons-sharp'
  } else {
    cls += ' material-icons-two-one'
  }
  if (props.hover) {
    cls += ' cursor'
  }
  if (shrinking.value) {
    cls += ' mdi-icon--shrinking'
  }
  return cls
})

const styles = computed(() => {
  return {
    fontSize: parseInt(props.size + '') + 'px',
    color: props.color,
    transition: shrinking.value
      ? `transform ${parseInt(props.transition + '')}ms`
      : '',
  }
})

const nextName = ref<string | undefined>('')
const shrinking = ref(false)

const handleNameChange = async (
  next: string | undefined,
  old: string | undefined
) => {
  const { transition } = props
  if (old == null || parseInt(transition + '') === 0) {
    nextName.value = next
    return
  }

  shrinking.value = true
  await nextTick()
  setTimeout(() => {
    old != null && (nextName.value = next)
    shrinking.value = false
  }, parseInt(transition + ''))
}

watch(() => props.name, handleNameChange, {
  immediate: true,
})
</script>
<style lang="scss" scoped>
.mdi-icon {
  // display: inline-flex;
  // justify-content: center;
  // align-items: center;
  vertical-align: middle;
  &--shrinking {
    transform: scale(0);
  }
}
</style>
