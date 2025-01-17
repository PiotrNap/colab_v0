/**
 * @name appContext
 * @desc Context & reducer for managing high-level application state
 * e.g.: auth, dark/light mode, theme preferences etc.
 */
import * as React from "react";
import { Appearance, ColorSchemeName } from "react-native";
import {
  AppState,
  AppContextProviderProps,
  AppContextProps,
} from "interfaces/appInterface";
import { AppActions, AppTypes } from "common/types/contextTypes";

// Get the user preffered color scheme (light or dark)
const colorScheme: ColorSchemeName = Appearance.getColorScheme();

const initialAppState: AppState = {
  authentication: true,
  colorScheme: colorScheme == null ? "light" : colorScheme,
  favoriteOrganizers: [],
  pageIndex: 0,
  ref: null,
};

const reducer = (state: AppState, action: AppActions) => {
  switch (action.type) {
    case "SET_REF":
      return {
        ...state,
        ref: action.payload.ref,
      };
    case AppTypes.ToggleAuth:
      return {
        ...state,
        authentication:
          action.payload.auth != null
            ? action.payload.auth
            : !state.authentication,
      };
    case AppTypes.SetPageIndex:
      if (action.payload.pageIndex != null) {
        return {
          ...state,
          pageIndex: action.payload.pageIndex,
        };
      }
    case AppTypes.SetColorScheme:
      if (action.payload.newColorScheme != null) {
        return {
          ...state,
          colorScheme: action.payload.newColorScheme,
        };
      }
    case AppTypes.SetFavoriteOrganizer:
      if (state.favoriteOrganizers.includes(action.payload.alias)) {
        const newFavoriteOrganizers = state.favoriteOrganizers.filter(
          (org) => org !== action.payload.alias
        );
        return {
          ...state,
          favoriteOrganizers: [...newFavoriteOrganizers],
        };
      }
      const newState = {
        ...state,
        favoriteOrganizers: [...state.favoriteOrganizers, action.payload.alias],
      };
      return newState;
    default:
      throw Error(`Unknown type of action: ${action.type}`);
  }
};

export const AppContext = React.createContext<AppContextProps>({
  state: initialAppState,
  dispatch: () => null,
});

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
