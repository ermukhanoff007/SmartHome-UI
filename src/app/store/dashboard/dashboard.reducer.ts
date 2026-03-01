import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { initialState } from './dashboard.state';
import { toKebab } from '../../utils/to-kebab.function';

export const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.loadDashboard, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(dashboardActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    selectedTabId: dashboard.tabs?.length ? dashboard.tabs[0].id : null,
    loading: false,
  })),

  on(dashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),

  on(dashboardActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
  })),

  on(dashboardActions.deleteDashboard, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(dashboardActions.deleteDashboardSuccess, (state, { dashboardId }) => ({
    ...state,
    loading: false,
    selectedDashboard: state.selectedDashboard?.id === dashboardId ? null : state.selectedDashboard,
    selectedTabId: state.selectedDashboard?.id === dashboardId ? null : state.selectedTabId,
  })),

  on(dashboardActions.deleteDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(dashboardActions.selectTab, (state, { tabId }) => ({
    ...state,
    selectedTabId: tabId,
  })),

  on(dashboardActions.enterEditMode, (state) => ({
    ...state,
    snapshot: structuredClone(state.selectedDashboard),
  })),

  on(dashboardActions.exitEditMode, (state) => ({
    ...state,
    snapshot: null,
  })),

  on(dashboardActions.discardChange, (state) => ({
    ...state,
    snapshot: null,
    selectedDashboard: state.snapshot,
  })),

  on(dashboardActions.addTab, (state, { title }) => {
    if (!state.selectedDashboard) return state;

    const baseId = toKebab(title);

    let uniqueId = baseId;
    let counter = 1;

    while (state.selectedDashboard.tabs.some((tab) => tab.id === uniqueId)) {
      uniqueId = `${baseId}-${counter++}`;
    }

    const newTab = {
      id: uniqueId,
      title,
      cards: [],
    };

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: [...state.selectedDashboard.tabs, newTab],
      },
    };
  }),

  on(dashboardActions.removeTab, (state, { tabId }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.filter((tab) => tab.id !== tabId),
      },
    };
  }),

  on(dashboardActions.renameTab, (state, { tabId, newTitle }) => {
    if (!state.selectedDashboard) return state;
    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId ? { ...tab, title: newTitle } : tab,
        ),
      },
    };
  }),

  on(dashboardActions.reorderTab, (state, { tabId, direction }) => {
    if (!state.selectedDashboard) return state;

    const idx = state.selectedDashboard.tabs.findIndex((tab) => tab.id === tabId);
    const move = direction === 'left' ? -1 : 1;
    const newIdx = idx + move;

    if (newIdx < 0 || newIdx > state.selectedDashboard.tabs.length) return state;

    const newTabs = [...state.selectedDashboard.tabs];

    [newTabs[idx], newTabs[newIdx]] = [newTabs[newIdx], newTabs[idx]];

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: newTabs,
      },
    };
  }),

  on(dashboardActions.addCard, (state, { tabId, layout, title }) => {
    if (!state.selectedDashboard) return state;

    const newCard = {
      id: Date.now().toString(),
      title: title ?? '',
      layout,
      items: [],
    };

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId ? { ...tab, cards: [...tab.cards, newCard] } : tab,
        ),
      },
    };
  }),

  on(dashboardActions.editCardContent, (state, { tabId, cardId, title, items }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId
            ? {
                ...tab,
                cards: tab.cards.map((card) =>
                  card.id === cardId ? { ...card, title, items } : card,
                ),
              }
            : tab,
        ),
      },
    };
  }),

  on(dashboardActions.reorderCard, (state, { tabId, cardId, newIdx }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) => {
          if (tab.id !== tabId) return tab;

          const cardIdx = tab.cards.findIndex((card) => card.id === cardId);

          if (newIdx < 0 || newIdx >= tab.cards.length) return tab;

          const updatedCards = [...tab.cards];

          const [moved] = updatedCards.splice(cardIdx, 1);
          updatedCards.splice(newIdx, 0, moved);
          return { ...tab, cards: updatedCards };
        }),
      },
    };
  }),

  on(dashboardActions.toggleDevice, (state, { deviceId, newState }) => {
    if (!state.selectedDashboard) return state;

    const updatedDasbboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) => ({
        ...tab,
        cards: tab.cards.map((card) => ({
          ...card,
          items: card.items.map((item) =>
            item.type === 'device' && item.id === deviceId ? { ...item, state: newState } : item,
          ),
        })),
      })),
    };
    return { ...state, selectedDashboard: updatedDasbboard };
  }),

  on(dashboardActions.toggleDeviceSuccess, (state, { device }) => {
    if (!state.selectedDashboard) return state;

    const updatedDasbboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) => ({
        ...tab,
        cards: tab.cards.map((card) => ({
          ...card,
          items: card.items.map((item) =>
            item.type === 'device' && item.id === device.id ? { ...device } : item,
          ),
        })),
      })),
    };
    return { ...state, selectedDashboard: updatedDasbboard };
  }),

  on(dashboardActions.toggleDeviceFailure, (state, { deviceId, prevState }) => {
    if (!state.selectedDashboard) return state;

    const updatedDasbboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) => ({
        ...tab,
        cards: tab.cards.map((card) => ({
          ...card,
          items: card.items.map((item) =>
            item.id === deviceId && item.type === 'device' ? { ...item, state: prevState } : item,
          ),
        })),
      })),
    };
    return { ...state, selectedDashboard: updatedDasbboard };
  }),
);
