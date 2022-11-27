import { RouteLocationNormalized } from 'vue-router'
import router from '@/router'
import { useStore } from '@/store'

class ArrayStack<T> {
  private list!: Array<T>
  private limit: number = Infinity
  public canPush: boolean = true
  constructor(limit?: number) {
    this.list = []
    limit && (this.limit = limit)
  }
  get size() {
    return this.list.length
  }

  top() {
    return this.list.at(-1)
  }

  pop() {
    return this.list.pop()
  }

  push(item: T) {
    if (this.canPush) {
      this.list.push(item)
      if (this.list.length > this.limit) {
        this.list.shift()
      }
    } else {
      this.canPush = true
    }
  }
}

export class CustomRouter {
  public previous: ArrayStack<RouteLocationNormalized> = new ArrayStack<RouteLocationNormalized>(20)
  public next: ArrayStack<RouteLocationNormalized> = new ArrayStack<RouteLocationNormalized>(20)

  public goToPrevious() {
    if (this.previous.size > 0) {
      const item = this.previous.pop()!
      this.previous.canPush = false
      const { _router } = useStore()
      this.next.push(_router.current)
      console.log('previous: ', item);
      router.push({
        path: item.path,
        query: item.query
      })
    }
  }

  public goToNext() {
    if (this.next.size > 0) {
      console.log('next lsit: ', this.next);
      const item = this.next.pop()!
      // this.previous.push(item)
      console.log('next: ', item);
      router.push({
        path: item.path,
        query: item.query
      })
    }
  }
}

