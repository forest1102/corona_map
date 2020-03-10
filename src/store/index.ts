import Vue from 'vue';
import Vuex from 'vuex';
import { ICountryState } from './modules/country'

Vue.use(Vuex);

export interface IRootState {
  country: ICountryState
}

export default new Vuex.Store<IRootState>({})
