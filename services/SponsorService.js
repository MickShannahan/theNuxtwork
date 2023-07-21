import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"



class SponsorService {

  async getSponsors() {
    const res = await api.get('api/ads')
    AppState.sponsors = res.data
  }

}

export const sponsorService = new SponsorService()