import { AppState } from '../AppState.js'
import { api } from './AxiosService.js'


class PostsService {

  async getPosts(url = 'api/posts') {
    const res = await api.get(url)
    console.log(res.data)
    AppState.posts = res.data.posts
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }

  async searchPosts(searchTerm) {
    const res = await api.get(`api/posts?query=${searchTerm}`)
    AppState.posts = res.data.posts
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }

  async createPost(post) {
    const res = await api.post('api/posts', post)
    AppState.posts.unshift(res.data)
    AppState.posts.pop()
  }

  async likePost(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
    const index = AppState.posts.findIndex(p => p.id == postId)
    AppState.posts.splice(index, 1, res.data)
  }

  async deletePost(postId) {
    const res = await api.delete('api/posts/' + postId)
    const index = AppState.posts.findIndex(p => p.id == postId)
    AppState.splice(index, 1)
  }

}

export const postsService = new PostsService()