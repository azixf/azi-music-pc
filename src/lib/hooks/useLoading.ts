export const useLoading = () => {
  const loading = ref(false)
  const exec = async <T>(func: () => T): Promise<[unknown, T | undefined]> => {
    try {
      loading.value = true
      const result: T = await func()
      return [undefined, result]
    } catch (e: unknown) {
      console.log('e: ', e)
      return [e, undefined]
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    exec,
  }
}