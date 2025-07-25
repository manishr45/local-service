import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Modal states
  modals: {
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isProfileModalOpen: false,
    isOrderModalOpen: false,
  },
  
  // Sidebar and navigation
  isSidebarOpen: false,
  isMobileMenuOpen: false,
  
  // Loading states
  isPageLoading: false,
  loadingMessage: '',
  
  // Notifications
  notifications: [],
  
  // Theme
  theme: 'light',
  
  // Search
  searchQuery: '',
  searchFilters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
    isVegetarian: false,
  },
  
  // Current page info
  currentPage: {
    title: '',
    breadcrumbs: [],
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Modal actions
    openModal: (state, action) => {
      const modalName = action.payload;
      state.modals[modalName] = true;
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      state.modals[modalName] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
    },
    
    // Sidebar actions
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    
    // Mobile menu actions
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    
    // Loading actions
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    
    // Notification actions
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.notifications.unshift(notification);
      
      // Keep only last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
    },
    
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    
    // Search actions
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
    },
    resetSearchFilters: (state) => {
      state.searchFilters = initialState.searchFilters;
    },
    
    // Page info actions
    setCurrentPage: (state, action) => {
      state.currentPage = { ...state.currentPage, ...action.payload };
    },
    setBreadcrumbs: (state, action) => {
      state.currentPage.breadcrumbs = action.payload;
    },
    
    // Reset UI state
    resetUI: (state) => {
      return { ...initialState, theme: state.theme };
    },
  },
});

export const {
  // Modal actions
  openModal,
  closeModal,
  closeAllModals,
  
  // Sidebar actions
  toggleSidebar,
  openSidebar,
  closeSidebar,
  
  // Mobile menu actions
  toggleMobileMenu,
  closeMobileMenu,
  
  // Loading actions
  setPageLoading,
  
  // Notification actions
  addNotification,
  removeNotification,
  clearNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  
  // Theme actions
  setTheme,
  toggleTheme,
  
  // Search actions
  setSearchQuery,
  setSearchFilters,
  resetSearchFilters,
  
  // Page info actions
  setCurrentPage,
  setBreadcrumbs,
  
  // Reset
  resetUI,
} = uiSlice.actions;

export default uiSlice.reducer;