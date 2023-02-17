import { createSlice, configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import { IArticle } from "./hooks/useFetch";

export interface IFilterState {
  headline: string;
  dateFilter: string;
  countryFilter: string[];
}

const initialFilterState: IFilterState = {
  headline: "",
  dateFilter: "",
  countryFilter: [],
};

const homeFilterSlice = createSlice({
  name: "homeFilterSlice",
  initialState: initialFilterState,
  reducers: {
    updateHomeFilter: (state, action) => action.payload,
  },
});

const scrapFilterSlice = createSlice({
  name: "scrapFilterSlice",
  initialState: initialFilterState,
  reducers: {
    updateScrapFilter: (state, action) => action.payload,
  },
});

const initialScrapState: IArticle[] = localStorage.getItem("scrapArticles")
  ? JSON.parse(localStorage.getItem("scrapArticles") ?? "")
  : [];

const persistScrap = (newState: IArticle[]) => {
  localStorage.setItem("scrapArticles", JSON.stringify(newState));
};

const scrapSlice = createSlice({
  name: "scrapSlice",
  initialState: initialScrapState,
  reducers: {
    add: (state, action) => {
      const newState = [action.payload, ...state];
      persistScrap(newState);
      return newState;
    },
    remove: (state, action) => {
      const newState = state.filter(
        (article) => article.uri !== action.payload.uri
      );
      persistScrap(newState);
      return newState;
    },
  },
});

const rootReducer = combineReducers({
  homeFilterReducer: homeFilterSlice.reducer,
  scrapFilterReducer: scrapFilterSlice.reducer,
  scrapReducer: scrapSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const { updateHomeFilter } = homeFilterSlice.actions;
export const { updateScrapFilter } = scrapFilterSlice.actions;
export const { add, remove } = scrapSlice.actions;

export default store;
