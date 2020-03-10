import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import store from '../'

export interface ICountryState {
  country: string
}

@Module({ name: 'country', store, namespaced: true, dynamic: true })
class CountryName extends VuexModule {
  country = ''

  @Mutation
  CHANGE_NAME(newCountry: string) {
    this.country = newCountry
  }
}

export const countryModule = getModule(CountryName)
