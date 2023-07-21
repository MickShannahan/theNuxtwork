import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"




class ProfilesService {

  async getProfile(profileId) {
    const res = await api.get('api/profiles/' + profileId)
    AppState.profile = res.data
  }

  async getProfilePosts(profileId) {
    const res = await api.get(`api/profiles/${profileId}/posts`)
    AppState.posts = res.data.posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.page = res.data.page
    AppState.totalPages = res.data.totalPages
  }

}

export const profilesService = new ProfilesService()