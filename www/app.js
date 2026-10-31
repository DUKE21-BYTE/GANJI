/**
 * GANJI - Personal Expense Tracker
 * "Your money. Your record. Your control."
 * Offline-first personal digital expense notebook for Kenyan Shillings (KES).
 */

(() => {
  'use strict';

  // ================= STORAGE KEYS & CONSTANTS =================
  const STORAGE_KEY_EXPENSES = 'ganji_expenses_v1';
  const STORAGE_KEY_SETTINGS = 'ganji_settings_v1';

  // The 8 Core Categories with Clean Vector SVG Icons
  const CATEGORIES = [
    {
      id: 'Food & Drinks',
      name: 'Food & Drinks',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"></path><path d="M15 2v10"></path><line x1="12" y1="2" x2="12" y2="22"></line><path d="M6 2v20"></path></svg>`,
      color: '#D95720',
      badgeClass: 'food'
    },
    {
      id: 'Transport',
      name: 'Transport',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M4 11h16M8 4v7M16 4v7"></path><circle cx="7" cy="20" r="1.5"></circle><circle cx="17" cy="20" r="1.5"></circle></svg>`,
      color: '#D97706',
      badgeClass: 'transport'
    },
    {
      id: 'Shopping',
      name: 'Shopping',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
      color: '#9333EA',
      badgeClass: 'shopping'
    },
    {
      id: 'Bills & Utilities',
      name: 'Bills & Utilities',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      color: '#0284C7',
      badgeClass: 'bills'
    },
    {
      id: 'Entertainment',
      name: 'Entertainment',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
      color: '#DB2777',
      badgeClass: 'entertainment'
    },
    {
      id: 'Health',
      name: 'Health',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"></path></svg>`,
      color: '#059669',
      badgeClass: 'health'
    },
    {
      id: 'Education',
      name: 'Education',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
      color: '#4F46E5',
      badgeClass: 'education'
    },
    {
      id: 'Other',
      name: 'Other',
      icon: `<svg viewBox="0 0 24 24" class="svg-cat-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>`,
      color: '#64748B',
      badgeClass: 'other'
    }
  ];

  // Helper date generators for realistic relative demo dates
  const getRelativeDateStr = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  // Realistic Kenyan Seed Data
  const DEMO_EXPENSES = [
    {
      id: 'gnj-1',
      description: 'Matatu fare to Westlands',
      amount: 100,
      category: 'Transport',
      date: getRelativeDateStr(0),
      paymentMethod: 'M-Pesa',
      note: 'Morning commute',
      createdAt: Date.now() - 1000 * 60 * 60 * 3
    },
    {
      id: 'gnj-2',
      description: 'Nyama Choma & Ugali Lunch',
      amount: 750,
      category: 'Food & Drinks',
      date: getRelativeDateStr(0),
      paymentMethod: 'M-Pesa',
      note: 'Lunch at Olepolos with Brian',
      createdAt: Date.now() - 1000 * 60 * 60 * 1
    },
    {
      id: 'gnj-3',
      description: 'KPLC Electricity Token',
      amount: 1500,
      category: 'Bills & Utilities',
      date: getRelativeDateStr(1),
      paymentMethod: 'M-Pesa',
      note: 'Stima prepaid token 45 units',
      createdAt: Date.now() - 1000 * 60 * 60 * 24
    },
    {
      id: 'gnj-4',
      description: 'Naivas Supermarket Groceries',
      amount: 3450,
      category: 'Shopping',
      date: getRelativeDateStr(2),
      paymentMethod: 'M-Pesa',
      note: 'Vegetables, milk, cooking oil, maize flour',
      createdAt: Date.now() - 1000 * 60 * 60 * 48
    },
    {
      id: 'gnj-5',
      description: 'Safaricom Home Fibre Internet',
      amount: 3000,
      category: 'Bills & Utilities',
      date: getRelativeDateStr(3),
      paymentMethod: 'M-Pesa',
      note: 'Monthly 20Mbps package',
      createdAt: Date.now() - 1000 * 60 * 60 * 72
    },
    {
      id: 'gnj-6',
      description: 'Pharmacy Cough Syrup & Panadol',
      amount: 450,
      category: 'Health',
      date: getRelativeDateStr(4),
      paymentMethod: 'Cash',
      note: 'Chemist at estate gate',
      createdAt: Date.now() - 1000 * 60 * 60 * 96
    },
    {
      id: 'gnj-7',
      description: 'IMAX Cinema Movie Tickets',
      amount: 1200,
      category: 'Entertainment',
      date: getRelativeDateStr(5),
      paymentMethod: 'Card',
      note: 'Weekend movie & popcorn',
      createdAt: Date.now() - 1000 * 60 * 60 * 120
    },
    {
      id: 'gnj-8',
      description: 'Udemy Online Coding Course',
      amount: 1850,
      category: 'Education',
      date: getRelativeDateStr(6),
      paymentMethod: 'Card',
      note: 'Mobile App Development Tutorial',
      createdAt: Date.now() - 1000 * 60 * 60 * 144
    },
    {
      id: 'gnj-9',
      description: 'Matatu fare returning home',
      amount: 120,
      category: 'Transport',
      date: getRelativeDateStr(1),
      paymentMethod: 'Cash',
      note: 'Rush hour fare',
      createdAt: Date.now() - 1000 * 60 * 60 * 28
    },
    {
      id: 'gnj-10',
      description: 'Airtime & Safaricom Data Bundle',
      amount: 500,
      category: 'Bills & Utilities',
      date: getRelativeDateStr(3),
      paymentMethod: 'M-Pesa',
      note: 'Tunukiwa 5GB bundle',
      createdAt: Date.now() - 1000 * 60 * 60 * 76
    },
    {
      id: 'gnj-11',
      description: 'Java House White Coffee & Croissant',
      amount: 480,
      category: 'Food & Drinks',
      date: getRelativeDateStr(7),
      paymentMethod: 'Card',
      note: 'Morning coffee work session',
      createdAt: Date.now() - 1000 * 60 * 60 * 170
    },
    {
      id: 'gnj-12',
      description: 'Shell Petrol Station Fuel Top-up',
      amount: 2500,
      category: 'Transport',
      date: getRelativeDateStr(10),
      paymentMethod: 'M-Pesa',
      note: '12 Litres V-Power',
      createdAt: Date.now() - 1000 * 60 * 60 * 240
    }
  ];

  // Default Settings
  const DEFAULT_SETTINGS = {
    currency: 'KES',
    currencySymbol: 'KSh',
    monthlyBudget: 50000,
    soundEnabled: true,
    hapticEnabled: true,
    theme: 'warm'
  };

  // ================= STATE MANAGEMENT =================
  let state = {
    expenses: [],
    settings: { ...DEFAULT_SETTINGS },
    activeTab: 'tab-dashboard',
    lastDeletedExpense: null,
    undoTimeout: null,
    historyFilters: {
      searchQuery: '',
      timeFilter: 'all',
      category: 'ALL',
      sortBy: 'date-desc'
    },
    insightsPeriod: 'month',
    activeAddCategory: 'Food & Drinks',
    activeEditCategory: 'Food & Drinks'
  };

  // ================= WEB AUDIO SYNTHESIZER =================
  // Zero external sound asset dependencies - synthesized native feedback!
  class SoundFeedback {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTap() {
      if (!state.settings.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {
        // Audio error fallback
      }
    }

    playSuccess() {
      if (!state.settings.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.28);
      } catch (e) {
        // Audio error fallback
      }
    }

    playDelete() {
      if (!state.settings.soundEnabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {
        // Audio error fallback
      }
    }
  }

  const soundFx = new SoundFeedback();

  const triggerHaptic = (pattern = 15) => {
    if (state.settings.hapticEnabled && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore haptic failure
      }
    }
  };

  // ================= EMBEDDED INDEXEDDB DATABASE ENGINE =================
  class GanjiDatabase {
    constructor() {
      this.dbName = 'GanjiDB';
      this.dbVersion = 1;
      this.db = null;
    }

    async init() {
      if (!('indexedDB' in window)) return null;
      return new Promise((resolve) => {
        const req = indexedDB.open(this.dbName, this.dbVersion);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('expenses')) {
            const expStore = db.createObjectStore('expenses', { keyPath: 'id' });
            expStore.createIndex('date', 'date', { unique: false });
            expStore.createIndex('category', 'category', { unique: false });
          }
          if (!db.objectStoreNames.contains('settings')) {
            db.createObjectStore('settings', { keyPath: 'key' });
          }
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };
        req.onerror = () => resolve(null);
      });
    }

    async getAllExpenses() {
      if (!this.db) await this.init();
      if (!this.db) return null;
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction('expenses', 'readonly');
          const store = tx.objectStore('expenses');
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }

    async saveAllExpenses(expenses) {
      if (!this.db) await this.init();
      if (!this.db) return;
      try {
        const tx = this.db.transaction('expenses', 'readwrite');
        const store = tx.objectStore('expenses');
        store.clear();
        expenses.forEach(exp => store.put(exp));
      } catch (e) {
        // Fallback handled by localStorage
      }
    }
  }

  const ganjiDB = new GanjiDatabase();

  // ================= STORAGE UTILITIES =================
  const loadState = async () => {
    try {
      // 1. Initial fast synchronous read from localStorage
      const savedExpenses = localStorage.getItem(STORAGE_KEY_EXPENSES);
      if (savedExpenses) {
        state.expenses = JSON.parse(savedExpenses);
      } else {
        state.expenses = [...DEMO_EXPENSES];
        saveExpenses();
      }

      const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (savedSettings) {
        state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
      }

      // 2. Query embedded IndexedDB for long-term structured records
      const idbRecords = await ganjiDB.getAllExpenses();
      if (idbRecords && Array.isArray(idbRecords) && idbRecords.length > 0) {
        state.expenses = idbRecords;
        renderDashboard();
      } else if (state.expenses.length > 0) {
        ganjiDB.saveAllExpenses(state.expenses);
      }
    } catch (e) {
      console.error('Error loading state:', e);
      state.expenses = [...DEMO_EXPENSES];
    }
  };

  const saveExpenses = () => {
    try {
      // Dual-write: Synchronous localStorage + Transactional IndexedDB
      localStorage.setItem(STORAGE_KEY_EXPENSES, JSON.stringify(state.expenses));
      ganjiDB.saveAllExpenses(state.expenses);
    } catch (e) {
      console.error('Error saving expenses:', e);
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(state.settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  };

  // ================= FORMATTERS =================
  const formatKES = (num) => {
    if (isNaN(num)) return '0';
    return Number(num).toLocaleString('en-KE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const dateObj = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const yest = new Date();
    yest.setDate(today.getDate() - 1);
    const yestStr = yest.toISOString().split('T')[0];

    if (dateString === todayStr) return 'Today';
    if (dateString === yestStr) return 'Yesterday';

    return dateObj.toLocaleDateString('en-KE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const getCategoryObj = (catName) => {
    return CATEGORIES.find(c => c.name === catName) || CATEGORIES[CATEGORIES.length - 1];
  };

  // ================= DOM ELEMENT REFERENCES =================
  const elements = {
    // Shell & navigation
    phoneFrame: document.getElementById('phone-frame'),
    toggleFrameBtn: document.getElementById('toggle-frame-btn'),
    toggleRespBtn: document.getElementById('toggle-responsive-btn'),
    navItems: document.querySelectorAll('.nav-item'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    fabAddBtn: document.getElementById('fab-add-btn'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    greetingTime: document.getElementById('greeting-time'),
    greetingDate: document.getElementById('greeting-date'),

    // Dashboard
    heroTodayTotal: document.getElementById('dash-today-total'),
    heroTodayDate: document.getElementById('hero-today-date'),
    heroTodayCount: document.getElementById('dash-today-count'),
    heroQuickAddBtn: document.getElementById('hero-quick-add-btn'),
    weeklyTotal: document.getElementById('dash-weekly-total'),
    weeklySub: document.getElementById('dash-weekly-sub'),
    monthlyTotal: document.getElementById('dash-monthly-total'),
    monthTitle: document.getElementById('dash-month-title'),
    budgetFill: document.getElementById('dash-budget-fill'),
    budgetPercent: document.getElementById('dash-budget-percent'),
    budgetCap: document.getElementById('dash-budget-cap'),
    totalTransactions: document.getElementById('dash-total-transactions'),
    monthCount: document.getElementById('dash-month-count'),
    recentList: document.getElementById('dash-recent-list'),
    dashViewAllBtn: document.getElementById('dash-view-all-btn'),
    sparklineBars: document.getElementById('sparkline-bars'),
    sparklineTrendLabel: document.getElementById('sparkline-trend-label'),
    presetChips: document.querySelectorAll('.preset-chip'),

    // Transaction History
    txSearchInput: document.getElementById('tx-search-input'),
    txSearchClear: document.getElementById('tx-search-clear'),
    txFilteredCount: document.getElementById('tx-filtered-count'),
    txFilteredTotal: document.getElementById('tx-filtered-total'),
    txSortSelect: document.getElementById('tx-sort-select'),
    txHistoryContainer: document.getElementById('tx-history-container'),
    txEmptyState: document.getElementById('tx-empty-state'),
    emptyAddBtn: document.getElementById('empty-add-btn'),
    timeFilterPills: document.querySelectorAll('.filter-pill'),
    catFilterChipsContainer: document.getElementById('category-filter-chips'),
    exportHistoryBtn: document.getElementById('export-history-btn'),

    // Spending Insights
    insightsPeriodBtns: document.querySelectorAll('.period-btn'),
    insightsTotalSpent: document.getElementById('insights-total-spent'),
    insightsPeriodLabel: document.getElementById('insights-period-label'),
    insightsDailyAvg: document.getElementById('insights-daily-avg'),
    insightsTopAlert: document.getElementById('insights-top-alert'),
    insightsTopIcon: document.getElementById('insights-top-icon'),
    insightsTopTitle: document.getElementById('insights-top-title'),
    insightsTopDesc: document.getElementById('insights-top-desc'),
    donutSvg: document.getElementById('donut-svg'),
    donutCenterAmount: document.getElementById('donut-center-amount'),
    donutLegendList: document.getElementById('donut-legend-list'),
    insightsBarchart: document.getElementById('insights-barchart'),
    insightsPeakDay: document.getElementById('insights-peak-day'),
    rankedCategoriesContainer: document.getElementById('ranked-categories-container'),

    // Settings
    settingBudgetInput: document.getElementById('setting-budget-input'),
    saveBudgetBtn: document.getElementById('save-budget-btn'),
    settingSoundToggle: document.getElementById('setting-sound-toggle'),
    settingHapticToggle: document.getElementById('setting-haptic-toggle'),
    settingThemeToggle: document.getElementById('setting-theme-toggle'),
    btnExportCsv: document.getElementById('btn-export-csv'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnResetDemo: document.getElementById('btn-reset-demo'),
    btnClearData: document.getElementById('btn-clear-data'),
    importJsonFile: document.getElementById('import-json-file'),

    // Add Sheet
    addBackdrop: document.getElementById('add-sheet-backdrop'),
    addSheet: document.getElementById('add-expense-sheet'),
    closeAddBtn: document.getElementById('close-add-sheet-btn'),
    addForm: document.getElementById('add-expense-form'),
    addAmountInput: document.getElementById('expense-amount-input'),
    addDescInput: document.getElementById('expense-desc-input'),
    addCategoryGrid: document.getElementById('category-picker-grid'),
    selectedCatLabel: document.getElementById('selected-cat-label'),
    addDateInput: document.getElementById('expense-date-input'),
    dateBtnToday: document.getElementById('date-btn-today'),
    dateBtnYesterday: document.getElementById('date-btn-yesterday'),
    addPaymentSelect: document.getElementById('expense-payment-method'),
    addNotesInput: document.getElementById('expense-notes-input'),
    amountIncBtns: document.querySelectorAll('.inc-btn'),
    suggChips: document.querySelectorAll('.sugg-chip'),

    // Edit Sheet
    editBackdrop: document.getElementById('edit-sheet-backdrop'),
    closeEditBtn: document.getElementById('close-edit-sheet-btn'),
    editForm: document.getElementById('edit-expense-form'),
    editIdInput: document.getElementById('edit-expense-id'),
    editAmountInput: document.getElementById('edit-amount-input'),
    editDescInput: document.getElementById('edit-desc-input'),
    editCategoryGrid: document.getElementById('edit-category-picker-grid'),
    editSelectedCatLabel: document.getElementById('edit-selected-cat-label'),
    editDateInput: document.getElementById('edit-date-input'),
    editPaymentSelect: document.getElementById('edit-payment-method'),
    editNotesInput: document.getElementById('edit-notes-input'),
    deleteExpenseBtn: document.getElementById('delete-expense-btn'),

    // Toast
    toastContainer: document.getElementById('toast-container'),
    toastText: document.getElementById('toast-text'),
    toastUndoBtn: document.getElementById('toast-undo-btn')
  };

  // ================= TOAST NOTIFICATION =================
  const showToast = (message, showUndo = false, onUndo = null) => {
    elements.toastText.textContent = message;
    if (showUndo && onUndo) {
      elements.toastUndoBtn.style.display = 'inline-block';
      elements.toastUndoBtn.onclick = () => {
        onUndo();
        elements.toastContainer.classList.remove('show');
      };
    } else {
      elements.toastUndoBtn.style.display = 'none';
      elements.toastUndoBtn.onclick = null;
    }

    elements.toastContainer.classList.add('show');
    clearTimeout(state.undoTimeout);
    state.undoTimeout = setTimeout(() => {
      elements.toastContainer.classList.remove('show');
    }, 4500);
  };

  // ================= TAB ROUTING & SWITCHING =================
  const switchTab = (tabId) => {
    soundFx.playTap();
    triggerHaptic(10);
    state.activeTab = tabId;

    // Update nav items
    elements.navItems.forEach(item => {
      if (item.getAttribute('data-target') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update panes
    elements.tabPanes.forEach(pane => {
      if (pane.id === tabId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Refresh view data
    if (tabId === 'tab-dashboard') {
      renderDashboard();
    } else if (tabId === 'tab-transactions') {
      renderHistory();
    } else if (tabId === 'tab-insights') {
      renderInsights();
    } else if (tabId === 'tab-settings') {
      syncSettingsUI();
    }

    // Scroll container to top
    document.getElementById('app-content').scrollTop = 0;
  };

  // ================= CATEGORY GRID INITIALIZATION =================
  const initCategoryPickers = () => {
    // Add Sheet Grid
    elements.addCategoryGrid.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const item = document.createElement('div');
      item.className = `cat-picker-item ${cat.name === state.activeAddCategory ? 'selected' : ''}`;
      item.dataset.cat = cat.name;
      item.innerHTML = `
        <span class="cat-picker-icon">${cat.icon}</span>
        <span class="cat-picker-name">${cat.name}</span>
      `;
      item.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        state.activeAddCategory = cat.name;
        elements.selectedCatLabel.textContent = cat.name;
        document.querySelectorAll('#category-picker-grid .cat-picker-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
      });
      elements.addCategoryGrid.appendChild(item);
    });

    // Edit Sheet Grid
    elements.editCategoryGrid.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const item = document.createElement('div');
      item.className = `cat-picker-item ${cat.name === state.activeEditCategory ? 'selected' : ''}`;
      item.dataset.cat = cat.name;
      item.innerHTML = `
        <span class="cat-picker-icon">${cat.icon}</span>
        <span class="cat-picker-name">${cat.name}</span>
      `;
      item.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        state.activeEditCategory = cat.name;
        elements.editSelectedCatLabel.textContent = cat.name;
        document.querySelectorAll('#edit-category-picker-grid .cat-picker-item').forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
      });
      elements.editCategoryGrid.appendChild(item);
    });

    // Category filter chips in Transaction History
    elements.catFilterChipsContainer.innerHTML = `
      <button type="button" class="cat-pill active" data-cat-filter="ALL">All Categories</button>
    `;
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cat-pill';
      btn.dataset.catFilter = cat.name;
      btn.innerHTML = `${cat.icon} <span>${cat.name}</span>`;
      btn.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        document.querySelectorAll('.cat-pill').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        state.historyFilters.category = cat.name;
        renderHistory();
      });
      elements.catFilterChipsContainer.appendChild(btn);
    });

    // "All Categories" pill listener
    const allCatBtn = elements.catFilterChipsContainer.querySelector('[data-cat-filter="ALL"]');
    if (allCatBtn) {
      allCatBtn.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        document.querySelectorAll('.cat-pill').forEach(el => el.classList.remove('active'));
        allCatBtn.classList.add('active');
        state.historyFilters.category = 'ALL';
        renderHistory();
      });
    }
  };

  // ================= MODAL SHEETS CONTROLLERS =================
  const openAddSheet = (prefillDesc = '', prefillAmount = '', prefillCat = '') => {
    soundFx.playTap();
    triggerHaptic(15);

    // Reset or prefill form
    elements.addAmountInput.value = prefillAmount || '';
    elements.addDescInput.value = prefillDesc || '';
    elements.addDateInput.value = new Date().toISOString().split('T')[0];
    elements.addPaymentSelect.value = 'M-Pesa';
    elements.addNotesInput.value = '';

    const catToSelect = prefillCat || 'Food & Drinks';
    state.activeAddCategory = catToSelect;
    elements.selectedCatLabel.textContent = catToSelect;

    document.querySelectorAll('#category-picker-grid .cat-picker-item').forEach(el => {
      if (el.dataset.cat === catToSelect) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });

    elements.addBackdrop.classList.add('open');
    setTimeout(() => {
      if (!prefillAmount) {
        elements.addAmountInput.focus();
      }
    }, 150);
  };

  const closeAddSheet = () => {
    elements.addBackdrop.classList.remove('open');
  };

  const openEditSheet = (expenseId) => {
    const expense = state.expenses.find(e => e.id === expenseId);
    if (!expense) return;

    soundFx.playTap();
    triggerHaptic(15);

    elements.editIdInput.value = expense.id;
    elements.editAmountInput.value = expense.amount;
    elements.editDescInput.value = expense.description;
    elements.editDateInput.value = expense.date;
    elements.editPaymentSelect.value = expense.paymentMethod || 'M-Pesa';
    elements.editNotesInput.value = expense.note || '';

    state.activeEditCategory = expense.category;
    elements.editSelectedCatLabel.textContent = expense.category;

    document.querySelectorAll('#edit-category-picker-grid .cat-picker-item').forEach(el => {
      if (el.dataset.cat === expense.category) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });

    elements.editBackdrop.classList.add('open');
  };

  const closeEditSheet = () => {
    elements.editBackdrop.classList.remove('open');
  };

  // ================= DASHBOARD RENDERING =================
  const renderDashboard = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Greeting banner time
    const hour = now.getHours();
    let timeGreeting = 'Habari!';
    if (hour >= 5 && hour < 12) timeGreeting = 'Habari za Asubuhi';
    else if (hour >= 12 && hour < 17) timeGreeting = 'Habari za Mchana';
    else if (hour >= 17 && hour < 21) timeGreeting = 'Habari za Jioni';
    else timeGreeting = 'Usiku Mwema';

    elements.greetingTime.textContent = timeGreeting;
    elements.greetingDate.textContent = now.toLocaleDateString('en-KE', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });

    // 1. Today's Total & Count
    const todayExpenses = state.expenses.filter(e => e.date === todayStr);
    const todayTotal = todayExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    elements.heroTodayTotal.textContent = formatKES(todayTotal);
    elements.heroTodayDate.textContent = todayExpenses.length > 0 ? `${todayExpenses.length} Logged` : 'Zero logged';
    elements.heroTodayCount.textContent = `${todayExpenses.length} expense${todayExpenses.length === 1 ? '' : 's'} recorded today`;

    // 2. Weekly Spending (Past 7 days)
    const sevenDaysAgoDate = new Date();
    sevenDaysAgoDate.setDate(now.getDate() - 6);
    const sevenDaysAgoStr = sevenDaysAgoDate.toISOString().split('T')[0];

    const weeklyExpenses = state.expenses.filter(e => e.date >= sevenDaysAgoStr && e.date <= todayStr);
    const weeklyTotal = weeklyExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    elements.weeklyTotal.textContent = formatKES(weeklyTotal);

    // 3. Monthly Spending Overview & Budget Cap
    const monthExpenses = state.expenses.filter(e => e.date.startsWith(currentMonthPrefix));
    const monthlyTotal = monthExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
    elements.monthlyTotal.textContent = formatKES(monthlyTotal);

    const monthName = now.toLocaleDateString('en-KE', { month: 'short' });
    elements.monthTitle.textContent = `${monthName} Overview`;

    // Budget Cap & Progress Bar
    const budgetLimit = state.settings.monthlyBudget || 50000;
    const budgetPct = Math.min(Math.round((monthlyTotal / budgetLimit) * 100), 100);
    elements.budgetFill.style.width = `${budgetPct}%`;
    elements.budgetPercent.textContent = `${budgetPct}% of monthly cap`;
    elements.budgetCap.textContent = `Cap: KES ${formatKES(budgetLimit)}`;

    if (budgetPct >= 90) {
      elements.budgetFill.style.background = '#DC2626'; // Danger red
    } else if (budgetPct >= 75) {
      elements.budgetFill.style.background = '#F59E0B'; // Warning amber
    } else {
      elements.budgetFill.style.background = 'var(--color-primary)';
    }

    // 4. Total Number of Recorded Transactions
    elements.totalTransactions.textContent = state.expenses.length;
    elements.monthCount.textContent = `${monthExpenses.length} in ${monthName}`;

    // 5. 7-Day Sparkline
    renderSparkline(todayStr);

    // 6. Recent Transactions List (Latest 4)
    const sortedExpenses = [...state.expenses].sort((a, b) => {
      if (b.date !== a.date) return b.date.localeCompare(a.date);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    const recent = sortedExpenses.slice(0, 4);
    elements.recentList.innerHTML = '';

    if (recent.length === 0) {
      elements.recentList.innerHTML = `
        <div class="empty-state" style="padding: 24px 16px; margin: 0; text-align: center;">
          <p class="empty-desc" style="margin-bottom: 12px;">No expenses recorded yet. Tap + to add an expense or load sample records to test!</p>
          <button type="button" class="primary-btn" id="dash-load-demo-btn" style="padding: 8px 16px; font-size: 0.78rem;">
            Load Kenyan Sample Records
          </button>
        </div>
      `;
      const loadBtn = document.getElementById('dash-load-demo-btn');
      if (loadBtn) {
        loadBtn.addEventListener('click', () => {
          state.expenses = [...DEMO_EXPENSES];
          saveExpenses();
          soundFx.playSuccess();
          triggerHaptic(20);
          showToast('Sample records loaded!');
          renderDashboard();
        });
      }
    } else {
      recent.forEach(exp => {
        elements.recentList.appendChild(createTransactionCard(exp));
      });
    }
  };

  // Sparkline generator for last 7 days
  const renderSparkline = (todayStr) => {
    elements.sparklineBars.innerHTML = '';
    const days = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('en-KE', { weekday: 'narrow' });
      days.push({ dateStr, dayLabel, isToday: dateStr === todayStr });
    }

    const dayTotals = days.map(day => {
      const total = state.expenses
        .filter(e => e.date === day.dateStr)
        .reduce((sum, e) => sum + Number(e.amount), 0);
      return { ...day, total };
    });

    const maxTotal = Math.max(...dayTotals.map(d => d.total), 1);

    dayTotals.forEach(d => {
      const heightPct = Math.max(Math.round((d.total / maxTotal) * 100), 6);
      const col = document.createElement('div');
      col.className = 'spark-col';
      col.title = `${d.dateStr}: KES ${formatKES(d.total)}`;
      col.innerHTML = `
        <div class="spark-bar-wrap">
          <div class="spark-bar ${d.isToday ? 'today' : ''}" style="height: ${heightPct}%;"></div>
        </div>
        <span class="spark-day ${d.isToday ? 'today' : ''}">${d.dayLabel}</span>
      `;
      elements.sparklineBars.appendChild(col);
    });

    const weekTotal = dayTotals.reduce((s, d) => s + d.total, 0);
    elements.sparklineTrendLabel.textContent = `KES ${formatKES(weekTotal)} over 7 days`;
  };

  // ================= TRANSACTION CARD COMPONENT =================
  const createTransactionCard = (expense) => {
    const cat = getCategoryObj(expense.category);
    const card = document.createElement('div');
    card.className = 'tx-item';
    card.dataset.id = expense.id;

    const paymentClass = (expense.paymentMethod || '').toLowerCase().includes('mpesa') || 
                         (expense.paymentMethod || '').toLowerCase().includes('m-pesa') ? 'mpesa' : '';

    card.innerHTML = `
      <div class="tx-left">
        <div class="tx-cat-icon" style="background: ${cat.color}15; color: ${cat.color};">
          ${cat.icon}
        </div>
        <div class="tx-info">
          <span class="tx-desc">${expense.description}</span>
          <div class="tx-meta">
            <span class="tx-cat-badge">${cat.name}</span>
            <span class="tx-bullet">•</span>
            <span class="tx-payment-pill ${paymentClass}">${expense.paymentMethod || 'M-Pesa'}</span>
          </div>
        </div>
      </div>
      <div class="tx-right">
        <span class="tx-amount"><span class="tx-amount-prefix">KES</span>${formatKES(expense.amount)}</span>
        <span class="tx-time">${formatDateDisplay(expense.date)}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openEditSheet(expense.id);
    });

    return card;
  };

  // ================= TRANSACTION HISTORY RENDERING =================
  const renderHistory = () => {
    let filtered = [...state.expenses];

    // 1. Text Search Filter
    const q = state.historyFilters.searchQuery.trim().toLowerCase();
    if (q) {
      filtered = filtered.filter(e => 
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        (e.note && e.note.toLowerCase().includes(q)) ||
        (e.paymentMethod && e.paymentMethod.toLowerCase().includes(q)) ||
        String(e.amount).includes(q)
      );
    }

    // 2. Category Filter
    if (state.historyFilters.category !== 'ALL') {
      filtered = filtered.filter(e => e.category === state.historyFilters.category);
    }

    // 3. Time Filter
    const todayStr = new Date().toISOString().split('T')[0];
    const now = new Date();

    if (state.historyFilters.timeFilter === 'today') {
      filtered = filtered.filter(e => e.date === todayStr);
    } else if (state.historyFilters.timeFilter === 'week') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 6);
      const weekStr = sevenDaysAgo.toISOString().split('T')[0];
      filtered = filtered.filter(e => e.date >= weekStr && e.date <= todayStr);
    } else if (state.historyFilters.timeFilter === 'month') {
      const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      filtered = filtered.filter(e => e.date.startsWith(currentMonthPrefix));
    } else if (state.historyFilters.timeFilter === 'lastmonth') {
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthPrefix = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;
      filtered = filtered.filter(e => e.date.startsWith(lastMonthPrefix));
    }

    // 4. Sorting
    const sortVal = state.historyFilters.sortBy;
    filtered.sort((a, b) => {
      if (sortVal === 'date-desc') {
        if (b.date !== a.date) return b.date.localeCompare(a.date);
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      if (sortVal === 'date-asc') {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return (a.createdAt || 0) - (b.createdAt || 0);
      }
      if (sortVal === 'amount-desc') return Number(b.amount) - Number(a.amount);
      if (sortVal === 'amount-asc') return Number(a.amount) - Number(b.amount);
      return 0;
    });

    // Update Filtered Total & Count
    const filteredTotal = filtered.reduce((s, e) => s + Number(e.amount), 0);
    elements.txFilteredTotal.textContent = `KES ${formatKES(filteredTotal)}`;
    elements.txFilteredCount.textContent = `Showing ${filtered.length} of ${state.expenses.length} records`;

    // Render grouped by date or empty state
    elements.txHistoryContainer.innerHTML = '';

    if (filtered.length === 0) {
      elements.txEmptyState.style.display = 'block';
      elements.txHistoryContainer.style.display = 'none';
      return;
    }

    elements.txEmptyState.style.display = 'none';
    elements.txHistoryContainer.style.display = 'block';

    // Group items by date string
    const groups = {};
    filtered.forEach(exp => {
      if (!groups[exp.date]) {
        groups[exp.date] = [];
      }
      groups[exp.date].push(exp);
    });

    Object.keys(groups).forEach(dateStr => {
      const groupWrapper = document.createElement('div');
      groupWrapper.className = 'tx-group';

      const groupTotal = groups[dateStr].reduce((s, e) => s + Number(e.amount), 0);

      const header = document.createElement('div');
      header.className = 'tx-group-header';
      header.innerHTML = `
        <span class="tx-group-title">${formatDateDisplay(dateStr)}</span>
        <span class="tx-group-total">KES ${formatKES(groupTotal)}</span>
      `;
      groupWrapper.appendChild(header);

      const list = document.createElement('div');
      list.className = 'transaction-list';
      groups[dateStr].forEach(exp => {
        list.appendChild(createTransactionCard(exp));
      });

      groupWrapper.appendChild(list);
      elements.txHistoryContainer.appendChild(groupWrapper);
    });
  };

  // ================= SPENDING INSIGHTS RENDERING =================
  const renderInsights = () => {
    let filtered = [...state.expenses];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    let periodLabel = 'In selected period';
    let daysInPeriod = 30;

    if (state.insightsPeriod === 'week') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 6);
      const weekStr = sevenDaysAgo.toISOString().split('T')[0];
      filtered = filtered.filter(e => e.date >= weekStr && e.date <= todayStr);
      periodLabel = 'Past 7 days';
      daysInPeriod = 7;
    } else if (state.insightsPeriod === 'month') {
      const currentMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      filtered = filtered.filter(e => e.date.startsWith(currentMonthPrefix));
      periodLabel = `In ${now.toLocaleDateString('en-KE', { month: 'long' })}`;
      daysInPeriod = now.getDate();
    } else {
      periodLabel = 'All time total';
      daysInPeriod = 60;
    }

    const totalSpent = filtered.reduce((s, e) => s + Number(e.amount), 0);
    elements.insightsTotalSpent.textContent = formatKES(totalSpent);
    elements.insightsPeriodLabel.textContent = periodLabel;

    // Daily Average (over active days in period)
    const activeDates = new Set(filtered.map(e => e.date)).size || 1;
    const dailyAvg = Math.round(totalSpent / Math.max(activeDates, 1));
    elements.insightsDailyAvg.textContent = formatKES(dailyAvg);

    // Category Spending Aggregation
    const catMap = {};
    CATEGORIES.forEach(c => { catMap[c.name] = 0; });
    filtered.forEach(e => {
      catMap[e.category] = (catMap[e.category] || 0) + Number(e.amount);
    });

    const sortedCats = Object.keys(catMap)
      .map(name => ({
        name,
        amount: catMap[name],
        pct: totalSpent > 0 ? Math.round((catMap[name] / totalSpent) * 100) : 0,
        obj: getCategoryObj(name)
      }))
      .filter(c => c.amount > 0)
      .sort((a, b) => b.amount - a.amount);

    // 1. Top Spending Category Alert Card
    if (sortedCats.length > 0) {
      const top = sortedCats[0];
      elements.insightsTopAlert.style.display = 'flex';
      elements.insightsTopIcon.innerHTML = top.obj.icon;
      elements.insightsTopTitle.textContent = `Top Spend: ${top.name}`;

      let tip = '';
      if (top.name === 'Food & Drinks') {
        tip = `Food & Drinks took ${top.pct}% (KES ${formatKES(top.amount)}) of your spend. Cooking in batches on Sundays can save over KES 4,000 monthly!`;
      } else if (top.name === 'Transport') {
        tip = `Transport accounted for ${top.pct}% (KES ${formatKES(top.amount)}) of your spending. Avoiding peak-hour price surges on Matatus or Uber can quickly add up to significant savings.`;
      } else if (top.name === 'Bills & Utilities') {
        tip = `Bills took ${top.pct}% (KES ${formatKES(top.amount)}). Reviewing recurring internet packages and energy consumption helps safeguard your emergency cushion.`;
      } else if (top.name === 'Shopping') {
        tip = `Shopping was ${top.pct}% of your spending. Creating a strict shopping list before visiting supermarkets cuts impulse buying drastically.`;
      } else {
        tip = `${top.name} represents ${top.pct}% of your total expenditure in this period. Keeping daily tabs here guarantees you stay in full control!`;
      }

      elements.insightsTopDesc.textContent = tip;
    } else {
      elements.insightsTopAlert.style.display = 'none';
    }

    // 2. Interactive SVG Donut Chart
    renderDonutChart(sortedCats, totalSpent);

    // 3. Weekly 7-Day Day-of-Week Bar Chart
    renderDayOfWeekBarChart(filtered);

    // 4. Ranked Categories Progress Bars
    renderRankedCategories(sortedCats, totalSpent);
  };

  // Render SVG Donut Chart
  const renderDonutChart = (sortedCats, totalSpent) => {
    elements.donutSvg.innerHTML = '';
    elements.donutLegendList.innerHTML = '';
    elements.donutCenterAmount.textContent = formatKES(totalSpent);

    if (sortedCats.length === 0 || totalSpent === 0) {
      elements.donutSvg.innerHTML = `
        <circle cx="120" cy="120" r="80" fill="none" stroke="var(--color-bg-surface-alt)" stroke-width="32"/>
      `;
      elements.donutLegendList.innerHTML = `
        <p style="text-align: center; color: var(--color-text-muted); font-size: 0.8rem; padding: 12px 0;">No spending recorded in this period.</p>
      `;
      return;
    }

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    let accumulatedAngle = 0;

    sortedCats.forEach(cat => {
      const sliceLength = (cat.amount / totalSpent) * circumference;
      const strokeOffset = -accumulatedAngle;
      accumulatedAngle += sliceLength;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '120');
      circle.setAttribute('cy', '120');
      circle.setAttribute('r', String(radius));
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', cat.obj.color);
      circle.setAttribute('stroke-width', '32');
      circle.setAttribute('stroke-dasharray', `${sliceLength} ${circumference - sliceLength}`);
      circle.setAttribute('stroke-dashoffset', String(strokeOffset));
      circle.classList.add('donut-slice');

      // Slice hover/tap interaction
      circle.addEventListener('mouseenter', () => {
        elements.donutCenterAmount.textContent = formatKES(cat.amount);
      });
      circle.addEventListener('mouseleave', () => {
        elements.donutCenterAmount.textContent = formatKES(totalSpent);
      });
      circle.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        showToast(`${cat.name}: KES ${formatKES(cat.amount)} (${cat.pct}%)`);
      });

      elements.donutSvg.appendChild(circle);

      // Add to legend
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
        <div class="legend-left">
          <span class="legend-dot" style="background: ${cat.obj.color};"></span>
          <span class="legend-name">${cat.obj.icon} ${cat.name}</span>
        </div>
        <div class="legend-right">
          <span class="legend-val">KES ${formatKES(cat.amount)}</span>
          <span class="legend-pct">${cat.pct}%</span>
        </div>
      `;
      elements.donutLegendList.appendChild(item);
    });
  };

  // Render Day of Week Bar Chart (Mon-Sun)
  const renderDayOfWeekBarChart = (filteredExpenses) => {
    elements.insightsBarchart.innerHTML = '';
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dayTotals = [0, 0, 0, 0, 0, 0, 0];

    filteredExpenses.forEach(exp => {
      const d = new Date(exp.date + 'T00:00:00');
      const jsDay = d.getDay(); // 0 is Sunday, 1 is Monday ...
      const idx = jsDay === 0 ? 6 : jsDay - 1; // 0=Mon, 6=Sun
      dayTotals[idx] += Number(exp.amount);
    });

    const maxDaySpend = Math.max(...dayTotals, 1);
    let peakDayIdx = 0;
    let peakDayAmt = 0;

    dayTotals.forEach((amt, i) => {
      if (amt > peakDayAmt) {
        peakDayAmt = amt;
        peakDayIdx = i;
      }
    });

    dayNames.forEach((name, i) => {
      const amt = dayTotals[i];
      const isPeak = i === peakDayIdx && amt > 0;
      const heightPct = Math.max(Math.round((amt / maxDaySpend) * 100), 5);

      const col = document.createElement('div');
      col.className = 'barchart-col';
      col.title = `${name}: KES ${formatKES(amt)}`;
      col.innerHTML = `
        <span class="barchart-val-label">${amt > 0 ? (amt >= 1000 ? Math.round(amt / 1000) + 'k' : amt) : ''}</span>
        <div class="barchart-pill-track">
          <div class="barchart-pill-fill ${isPeak ? 'peak' : ''}" style="height: ${heightPct}%;"></div>
        </div>
        <span class="barchart-day-label" style="${isPeak ? 'color: var(--color-primary); font-weight: 800;' : ''}">${name}</span>
      `;
      elements.insightsBarchart.appendChild(col);
    });

    if (peakDayAmt > 0) {
      elements.insightsPeakDay.textContent = `Peak spending day: ${dayNames[peakDayIdx]} (KES ${formatKES(peakDayAmt)})`;
    } else {
      elements.insightsPeakDay.textContent = 'No expenses in selected period';
    }
  };

  // Render Ranked Categories Progress Bars
  const renderRankedCategories = (sortedCats, totalSpent) => {
    elements.rankedCategoriesContainer.innerHTML = '';

    if (sortedCats.length === 0) {
      elements.rankedCategoriesContainer.innerHTML = `
        <p style="text-align: center; color: var(--color-text-muted); font-size: 0.8rem;">No expenses recorded.</p>
      `;
      return;
    }

    sortedCats.forEach(cat => {
      const row = document.createElement('div');
      row.className = 'ranked-cat-row';
      row.innerHTML = `
        <div class="ranked-cat-header">
          <div class="ranked-cat-left">
            <span>${cat.obj.icon}</span>
            <span>${cat.name}</span>
          </div>
          <div class="ranked-cat-right">
            <span class="ranked-cat-amt">KES ${formatKES(cat.amount)}</span>
            <span class="ranked-cat-pct">${cat.pct}%</span>
          </div>
        </div>
        <div class="ranked-bar-track">
          <div class="ranked-bar-fill" style="width: ${cat.pct}%; background: ${cat.obj.color};"></div>
        </div>
      `;
      elements.rankedCategoriesContainer.appendChild(row);
    });
  };

  // ================= SETTINGS & PREFERENCES =================
  const syncSettingsUI = () => {
    elements.settingBudgetInput.value = state.settings.monthlyBudget;
    elements.settingSoundToggle.checked = state.settings.soundEnabled;
    elements.settingHapticToggle.checked = state.settings.hapticEnabled;
    elements.settingThemeToggle.checked = state.settings.theme === 'dark';
  };

  const applyTheme = (themeName) => {
    document.body.setAttribute('data-theme', themeName);
    state.settings.theme = themeName;
    saveSettings();
  };

  // ================= EXPORT & IMPORT UTILITIES =================
  const exportToCSV = () => {
    soundFx.playSuccess();
    triggerHaptic(20);

    if (state.expenses.length === 0) {
      showToast('No expenses to export');
      return;
    }

    const headers = ['ID', 'Date', 'Description', 'Category', 'Amount_KES', 'Payment_Method', 'Note'];
    const rows = state.expenses.map(e => [
      `"${e.id}"`,
      `"${e.date}"`,
      `"${(e.description || '').replace(/"/g, '""')}"`,
      `"${e.category}"`,
      e.amount,
      `"${e.paymentMethod || 'M-Pesa'}"`,
      `"${(e.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GANJI_Expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Exported CSV successfully!');
  };

  const exportToJSON = () => {
    soundFx.playSuccess();
    triggerHaptic(20);

    const exportData = {
      app: 'GANJI',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      currency: 'KES',
      settings: state.settings,
      expenses: state.expenses
    };

    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `GANJI_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Saved JSON backup offline!');
  };

  const importFromJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.expenses && Array.isArray(parsed.expenses)) {
          state.expenses = parsed.expenses;
          if (parsed.settings) {
            state.settings = { ...state.settings, ...parsed.settings };
          }
          saveExpenses();
          saveSettings();
          soundFx.playSuccess();
          triggerHaptic(30);
          showToast(`Restored ${state.expenses.length} records successfully!`);
          renderDashboard();
        } else {
          showToast('Invalid backup file format');
        }
      } catch (err) {
        showToast('Error reading backup file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ================= EVENT LISTENERS & WIRING =================
  const setupEventListeners = () => {
    // 1. Bottom Nav Navigation
    elements.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        switchTab(target);
      });
    });

    // 2. Open Settings from Header
    elements.openSettingsBtn.addEventListener('click', () => {
      switchTab('tab-settings');
    });

    // 3. FAB Add Button
    elements.fabAddBtn.addEventListener('click', () => {
      openAddSheet();
    });

    elements.heroQuickAddBtn.addEventListener('click', () => {
      openAddSheet();
    });

    elements.dashViewAllBtn.addEventListener('click', () => {
      switchTab('tab-transactions');
    });

    elements.emptyAddBtn.addEventListener('click', () => {
      openAddSheet();
    });

    // 4. Desktop Device Preview Toggle
    elements.toggleFrameBtn.addEventListener('click', () => {
      elements.phoneFrame.classList.remove('responsive-mode');
      elements.phoneFrame.classList.add('framed-mode');
      elements.toggleFrameBtn.classList.add('active');
      elements.toggleRespBtn.classList.remove('active');
    });

    elements.toggleRespBtn.addEventListener('click', () => {
      elements.phoneFrame.classList.remove('framed-mode');
      elements.phoneFrame.classList.add('responsive-mode');
      elements.toggleRespBtn.classList.add('active');
      elements.toggleFrameBtn.classList.remove('active');
    });

    // Default to framed-mode on desktop screens
    if (window.innerWidth >= 768) {
      elements.phoneFrame.classList.add('framed-mode');
    }

    // 5. Add Expense Sheet Events
    elements.closeAddBtn.addEventListener('click', closeAddSheet);
    elements.addBackdrop.addEventListener('click', (e) => {
      if (e.target === elements.addBackdrop) closeAddSheet();
    });

    // Quick Increment Buttons in Add Sheet
    elements.amountIncBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        const inc = Number(btn.getAttribute('data-inc') || 0);
        const current = Number(elements.addAmountInput.value) || 0;
        elements.addAmountInput.value = current + inc;
      });
    });

    // Date Shortcuts
    elements.dateBtnToday.addEventListener('click', () => {
      soundFx.playTap();
      elements.addDateInput.value = new Date().toISOString().split('T')[0];
    });

    elements.dateBtnYesterday.addEventListener('click', () => {
      soundFx.playTap();
      const y = new Date();
      y.setDate(y.getDate() - 1);
      elements.addDateInput.value = y.toISOString().split('T')[0];
    });

    // Quick Description Suggestion Chips
    elements.suggChips.forEach(chip => {
      chip.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        const text = chip.getAttribute('data-text');
        const cat = chip.getAttribute('data-cat');
        elements.addDescInput.value = text;
        if (cat) {
          state.activeAddCategory = cat;
          elements.selectedCatLabel.textContent = cat;
          document.querySelectorAll('#category-picker-grid .cat-picker-item').forEach(el => {
            if (el.dataset.cat === cat) el.classList.add('selected');
            else el.classList.remove('selected');
          });
        }
      });
    });

    // Preset Chips on Dashboard
    elements.presetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const desc = chip.getAttribute('data-desc');
        const amt = chip.getAttribute('data-amount');
        const cat = chip.getAttribute('data-cat');
        openAddSheet(desc, amt, cat);
      });
    });

    // Add Expense Form Submit
    elements.addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(elements.addAmountInput.value);
      const desc = elements.addDescInput.value.trim();
      const date = elements.addDateInput.value;
      const payment = elements.addPaymentSelect.value;
      const note = elements.addNotesInput.value.trim();
      const category = state.activeAddCategory;

      if (!amount || amount <= 0 || !desc || !date) {
        showToast('Please enter a valid amount and description');
        return;
      }

      const newExpense = {
        id: 'gnj-' + Date.now(),
        description: desc,
        amount: amount,
        category: category,
        date: date,
        paymentMethod: payment,
        note: note,
        createdAt: Date.now()
      };

      state.expenses.unshift(newExpense);
      saveExpenses();

      soundFx.playSuccess();
      triggerHaptic([20, 40, 20]);
      closeAddSheet();
      showToast(`Logged KES ${formatKES(amount)} for ${desc}!`);

      renderDashboard();
      if (state.activeTab === 'tab-transactions') renderHistory();
      if (state.activeTab === 'tab-insights') renderInsights();
    });

    // 6. Edit Expense Sheet Events
    elements.closeEditBtn.addEventListener('click', closeEditSheet);
    elements.editBackdrop.addEventListener('click', (e) => {
      if (e.target === elements.editBackdrop) closeEditSheet();
    });

    elements.editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = elements.editIdInput.value;
      const amount = parseFloat(elements.editAmountInput.value);
      const desc = elements.editDescInput.value.trim();
      const date = elements.editDateInput.value;
      const payment = elements.editPaymentSelect.value;
      const note = elements.editNotesInput.value.trim();
      const category = state.activeEditCategory;

      const idx = state.expenses.findIndex(x => x.id === id);
      if (idx !== -1) {
        state.expenses[idx] = {
          ...state.expenses[idx],
          description: desc,
          amount: amount,
          category: category,
          date: date,
          paymentMethod: payment,
          note: note
        };
        saveExpenses();
        soundFx.playSuccess();
        triggerHaptic(20);
        closeEditSheet();
        showToast('Expense updated!');

        renderDashboard();
        if (state.activeTab === 'tab-transactions') renderHistory();
        if (state.activeTab === 'tab-insights') renderInsights();
      }
    });

    // Delete Expense with Undo
    elements.deleteExpenseBtn.addEventListener('click', () => {
      const id = elements.editIdInput.value;
      const idx = state.expenses.findIndex(x => x.id === id);
      if (idx !== -1) {
        const deleted = state.expenses[idx];
        state.lastDeletedExpense = deleted;
        state.expenses.splice(idx, 1);
        saveExpenses();

        soundFx.playDelete();
        triggerHaptic(30);
        closeEditSheet();

        showToast(`Deleted ${deleted.description}`, true, () => {
          // Undo handler
          state.expenses.splice(idx, 0, deleted);
          saveExpenses();
          soundFx.playSuccess();
          renderDashboard();
          if (state.activeTab === 'tab-transactions') renderHistory();
          if (state.activeTab === 'tab-insights') renderInsights();
          showToast('Expense restored!');
        });

        renderDashboard();
        if (state.activeTab === 'tab-transactions') renderHistory();
        if (state.activeTab === 'tab-insights') renderInsights();
      }
    });

    // 7. Transaction History Controls
    elements.txSearchInput.addEventListener('input', (e) => {
      state.historyFilters.searchQuery = e.target.value;
      elements.txSearchClear.style.display = e.target.value ? 'flex' : 'none';
      renderHistory();
    });

    elements.txSearchClear.addEventListener('click', () => {
      elements.txSearchInput.value = '';
      state.historyFilters.searchQuery = '';
      elements.txSearchClear.style.display = 'none';
      renderHistory();
      elements.txSearchInput.focus();
    });

    elements.timeFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        elements.timeFilterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.historyFilters.timeFilter = pill.getAttribute('data-time-filter');
        renderHistory();
      });
    });

    elements.txSortSelect.addEventListener('change', (e) => {
      state.historyFilters.sortBy = e.target.value;
      renderHistory();
    });

    elements.exportHistoryBtn.addEventListener('click', exportToCSV);

    // 8. Spending Insights Period Controls
    elements.insightsPeriodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        soundFx.playTap();
        triggerHaptic(10);
        elements.insightsPeriodBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.insightsPeriod = btn.getAttribute('data-period');
        renderInsights();
      });
    });

    // 9. Settings Actions
    elements.saveBudgetBtn.addEventListener('click', () => {
      soundFx.playSuccess();
      const val = parseFloat(elements.settingBudgetInput.value) || 50000;
      state.settings.monthlyBudget = val;
      saveSettings();
      showToast(`Budget cap set to KES ${formatKES(val)}!`);
      renderDashboard();
    });

    elements.settingSoundToggle.addEventListener('change', (e) => {
      state.settings.soundEnabled = e.target.checked;
      saveSettings();
      if (e.target.checked) soundFx.playSuccess();
    });

    elements.settingHapticToggle.addEventListener('change', (e) => {
      state.settings.hapticEnabled = e.target.checked;
      saveSettings();
      if (e.target.checked) triggerHaptic([20, 40]);
    });

    elements.settingThemeToggle.addEventListener('change', (e) => {
      const isDark = e.target.checked;
      applyTheme(isDark ? 'dark' : 'warm');
    });

    elements.btnExportCsv.addEventListener('click', exportToCSV);
    elements.btnExportJson.addEventListener('click', exportToJSON);
    elements.importJsonFile.addEventListener('change', importFromJSON);

    elements.btnResetDemo.addEventListener('click', () => {
      if (confirm('Restore Kenyan demo expenses? This will add realistic sample records to your notebook.')) {
        state.expenses = [...DEMO_EXPENSES];
        saveExpenses();
        soundFx.playSuccess();
        triggerHaptic(20);
        showToast('Demo records loaded!');
        renderDashboard();
      }
    });

    elements.btnClearData.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete ALL expenses? This cannot be undone.')) {
        state.expenses = [];
        saveExpenses();
        soundFx.playDelete();
        triggerHaptic(40);
        showToast('All expenses cleared.');
        renderDashboard();
        if (state.activeTab === 'tab-transactions') renderHistory();
    // 10. Native PWA Install Prompt (No Store / No Android Studio Needed)
    let deferredPrompt = null;
    const installBtn = document.getElementById('install-app-btn');
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn) installBtn.style.display = 'inline-flex';
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        soundFx.playTap();
        triggerHaptic(15);
        if (!deferredPrompt) {
          showToast('To install: tap your browser menu (⋮) > Add to Home screen');
          return;
        }
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          soundFx.playSuccess();
          showToast('Installing GANJI on your phone!');
          installBtn.style.display = 'none';
        }
        deferredPrompt = null;
      });
    }
  };

  // ================= SERVICE WORKER REGISTRATION =================
  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('GANJI Service Worker registered for offline tracking:', reg.scope);
          })
          .catch((err) => {
            console.log('Service Worker registration skipped or failed:', err);
          });
      });
    }
  };

  // ================= APP INITIALIZATION =================
  const initApp = () => {
    loadState();
    applyTheme(state.settings.theme || 'warm');
    initCategoryPickers();
    setupEventListeners();
    renderDashboard();
    registerServiceWorker();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
