
(async function () {
  const govData = window.GOV_DATA || { type: 'FeatureCollection', features: [] };
  const liwaData = window.LIWA_DATA || { type: 'FeatureCollection', features: [] };
  const railData = window.RAIL_DATA || { type: 'FeatureCollection', features: [] };
  const highwayData = window.HIGHWAY_DATA || { type: 'FeatureCollection', features: [] };
  const placesData = window.PLACES_EXTRA_DATA || { type: 'FeatureCollection', features: [] };
  const fiberData = window.FIBER_LAYERS_DATA || { type: 'FeatureCollection', features: [] };
  const contourData = window.CONTOUR_DATA || { type: 'FeatureCollection', features: [] };
  const archSitesData = window.ARCH_SITES_DATA || { type: 'FeatureCollection', features: [] };
  const hotelsData = window.HOTELS_DATA || { type: 'FeatureCollection', features: [] };
  const restaurantsData = window.RESTAURANTS_DATA || { type: 'FeatureCollection', features: [] };
  const masarData = window.MASAR_DATA || { type: 'FeatureCollection', features: [] };
  const elevationGrid = window.ELEVATION_GRID || null;

  const els = {
    appShell: document.querySelector('.app-shell'),
    mapWrap: document.getElementById('mapWrap'),
    mapElement: document.getElementById('mapElement'),
    sceneElement: document.getElementById('sceneElement'),
    mapScaleBadge: document.getElementById('mapScaleBadge'),
    featureInfo: document.getElementById('featureInfo'),
    selectionDetails: document.getElementById('selectionDetails'),
    govLegend: document.getElementById('govLegend'),
    railLegendWrap: document.getElementById('railLegendWrap'),
    highwayLegendWrap: document.getElementById('highwayLegendWrap'),
    placeLegendWrap: document.getElementById('placeLegendWrap'),
    fiberLegendWrap: document.getElementById('fiberLegendWrap'),
    masarLegendWrap: document.getElementById('masarLegendWrap'),
    archLegendWrap: document.getElementById('archLegendWrap'),
    hotelsLegendWrap: document.getElementById('hotelsLegendWrap'),
    restaurantsLegendWrap: document.getElementById('restaurantsLegendWrap'),
    modeBadge: document.getElementById('modeBadge'),
    zoomBadge: document.getElementById('zoomBadge'),
    zoomHint: document.getElementById('zoomHint'),
    highwayZoomBadge: document.getElementById('highwayZoomBadge'),
    toggleGov: document.getElementById('toggleGov'),
    toggleGovLabels: document.getElementById('toggleGovLabels'),
    toggleLiwa: document.getElementById('toggleLiwa'),
    toggleLiwaLabels: document.getElementById('toggleLiwaLabels'),
    toggleRails: document.getElementById('toggleRails'),
    toggleRailLabels: document.getElementById('toggleRailLabels'),
    toggleHighways: document.getElementById('toggleHighways'),
    toggleHighwayLabels: document.getElementById('toggleHighwayLabels'),
    togglePlaces: document.getElementById('togglePlaces'),
    togglePlaceLabels: document.getElementById('togglePlaceLabels'),
    toggleFiberEdu: document.getElementById('toggleFiberEdu'),
    toggleFiberGov: document.getElementById('toggleFiberGov'),
    toggleFiberHealth: document.getElementById('toggleFiberHealth'),
    toggleFiberSchools: document.getElementById('toggleFiberSchools'),
    toggleFiberLabels: document.getElementById('toggleFiberLabels'),
    toggleArchSites: document.getElementById('toggleArchSites'),
    toggleArchLabels: document.getElementById('toggleArchLabels'),
    toggleHotels: document.getElementById('toggleHotels'),
    toggleHotelLabels: document.getElementById('toggleHotelLabels'),
    toggleRestaurants: document.getElementById('toggleRestaurants'),
    toggleRestaurantLabels: document.getElementById('toggleRestaurantLabels'),
    toggleMasar: document.getElementById('toggleMasar'),
    toggleMasarLabels: document.getElementById('toggleMasarLabels'),
    toggleHillshade: document.getElementById('toggleHillshade'),
    toggleContours: document.getElementById('toggleContours'),
    homeBtn: document.getElementById('homeBtn'),
    mapHomeBtn: document.getElementById('mapHomeBtn'),
    layerHelpBtn: document.getElementById('layerHelpBtn'),
    basemapBtn: document.getElementById('basemapBtn'),
    view3dBtn: document.getElementById('view3dBtn'),
    aerial3dBtn: document.getElementById('aerial3dBtn'),
    parcelQueryBtn: document.getElementById('parcelQueryBtn'),
    openDlsBtn: document.getElementById('openDlsBtn'),
    sidebarToggleBtn: document.getElementById('sidebarToggleBtn'),
    exportBtn: document.getElementById('exportBtn'),
    exportPdfBtn: document.getElementById('exportPdfBtn'),
    clearHighlightBtn: document.getElementById('clearHighlightBtn'),
    routeFileInput: document.getElementById('routeFileInput'),
    importRouteBtn: document.getElementById('importRouteBtn'),
    editSelectedBtn: document.getElementById('editSelectedBtn'),
    saveEditBtn: document.getElementById('saveEditBtn'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    exportGeoJsonBtn: document.getElementById('exportGeoJsonBtn'),
    exportDialog: document.getElementById('exportDialog'),
    confirmExportBtn: document.getElementById('confirmExportBtn'),
    cancelExportDialogBtn: document.getElementById('cancelExportDialogBtn'),
    closeExportDialogBtn: document.getElementById('closeExportDialogBtn'),
    exportGeometryGroup: document.getElementById('exportGeometryGroup'),
    editStatusBox: document.getElementById('editStatusBox'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    resetNorthBtn: document.getElementById('resetNorthBtn'),
    kpiGovCount: document.getElementById('kpiGovCount'),
    kpiRailCount: document.getElementById('kpiRailCount'),
    kpiHighwayCount: document.getElementById('kpiHighwayCount'),
    kpiPopulation: document.getElementById('kpiPopulation'),
    kpiTopGov: document.getElementById('kpiTopGov'),
    govTableBody: document.getElementById('govTableBody'),
    searchBox: document.getElementById('searchBox'),
    mapSearchInput: document.getElementById('mapSearchInput'),
    mapSearchLayer: document.getElementById('mapSearchLayer'),
    mapSearchClear: document.getElementById('mapSearchClear'),
    searchSuggestions: document.getElementById('searchSuggestions'),
    layerHelpModal: document.getElementById('layerHelpModal'),
    closeLayerHelpBtn: document.getElementById('closeLayerHelpBtn'),
    aiAssistantBtn: document.getElementById('aiAssistantBtn'),
    aiAssistantPanel: document.getElementById('aiAssistantPanel'),
    aiAssistantClose: document.getElementById('aiAssistantClose'),
    aiAssistantMinimize: document.getElementById('aiAssistantMinimize'),
    aiModeButtons: document.querySelectorAll('[data-ai-mode]'),
    aiQuickButtons: document.querySelectorAll('[data-ai-question]'),
    aiContextSummary: document.getElementById('aiContextSummary'),
    aiQuestionInput: document.getElementById('aiQuestionInput'),
    aiAskBtn: document.getElementById('aiAskBtn'),
    aiClearBtn: document.getElementById('aiClearBtn'),
    aiAnswerBox: document.getElementById('aiAnswerBox')
  };

  const GOV_COLORS = {
    'إربد': '#2A9D8F',
    'عجلون': '#8FD6C3',
    'جرش': '#F4A261',
    'البلقاء': '#E9C46A',
    'الزرقاء': '#4A90E2',
    'عمان': '#5B6C9E',
    'مأدبا': '#7B6FD6',
    'مادبا': '#7B6FD6',
    'الكرك': '#E76F51',
    'الطفيلة': '#A78BFA',
    'معان': '#6C757D',
    'العقبة': '#70A1D7',
    'المفرق': '#6AB187'
  };

  const GOV_NAME_MAP = {
    Aqaba: 'العقبة',
    Ajloun: 'عجلون',
    Ajlun: 'عجلون',
    Amman: 'عمان',
    Balqa: 'البلقاء',
    Irbid: 'إربد',
    Jerash: 'جرش',
    Jarash: 'جرش',
    Karak: 'الكرك',
    Mafraq: 'المفرق',
    Madaba: 'مادبا',
    "Ma'an": 'معان',
    Maan: 'معان',
    Tafiela: 'الطفيلة',
    Tafilah: 'الطفيلة',
    Zarqa: 'الزرقاء'
  };

  const placeTypeLabels = {
    city: 'مدينة / عاصمة',
    town: 'بلدة / ضاحية',
    village: 'قرية / محلية'
  };

  const SCALE_THRESHOLDS = {
    // ArcGIS scale: bigger number = farther zoom-out.
    // هرمية أقرب لسلوك ArcGIS Online: وطني، إقليمي، محلي، ثم تفصيلي.
    // على المستوى الوطني لا تظهر أي نقاط أو خدمات؛ تظهر المحافظات فقط.
    national: 1500000,
    regional: 700000,
    local: 200000,
    detail: 50000,
    liwaVisible: 1500000,
    liwaLabels: 500000,
    railVisible: 650000,
    highwayVisible: 300000,
    highwayLabels: 90000,
    majorPlacesVisible: 650000,
    majorPlacesLabels: 350000,
    detailPlacesVisible: 100000,
    detailPlaceLabels: 45000,
    archVisible: 100000,
    archLabels: 45000,
    hotelsVisible: 80000,
    hotelsLabels: 30000,
    restaurantsVisible: 80000,
    restaurantsLabels: 30000,
    // طبقات المؤسسات النقطية تظهر متأخرة لأنها كثيفة جدًا.
    fiberEduVisible: 90000,
    fiberGovVisible: 90000,
    fiberHealthVisible: 90000,
    fiberSchoolsVisible: 60000,
    fiberLabels: 30000,
    fiberSchoolLabels: 20000,
    masarVisible: 300000,
    masarLabels: 90000,
    contourVisible: 50000,
    contourLabels: 30000
  };


  const STAGE_LABELS = {
    national: 'المحافظات — عرض عام',
    regional: 'مدن رئيسية + أسماء',
    local: 'انتقال محلي — مراكز رئيسية مسمّاة',
    detail: 'تفصيلي — نقاط وأسماء كاملة'
  };

  // حد التصغير الوطني.
  // في ArcGIS: كلما كبر رقم المقياس زاد الـ Zoom Out.
  // نستخدم 1:1,300,000 كحد أدنى، لكن إذا كان إطار الخريطة يحتاج مقياسًا أكبر
  // لإظهار الأردن كاملًا، يتم حسابه تلقائيًا حتى لا يتم قص الخريطة.
  const NATIONAL_MIN_ZOOM_OUT_SCALE = 1300000;
  const NATIONAL_HOME_SCALE_FALLBACK = 4000000;
  const NATIONAL_SCALE_PADDING = 1.30;


  const state = {
    basemap: 'none',
    viewMode: '2d',
    highlightHandle: null,
    selectedGraphic: null,
    selectedLayerKey: null,
    selectionOverlayGraphic: null,
    fullExtent: null,
    searchIndex: [],
    labelPrefs: {
      gov: !!document.getElementById('toggleGovLabels')?.checked,
      liwa: !!document.getElementById('toggleLiwaLabels')?.checked,
      rail: !!document.getElementById('toggleRailLabels')?.checked,
      highway: !!document.getElementById('toggleHighwayLabels')?.checked,
      place: !!document.getElementById('togglePlaceLabels')?.checked,
      fiber: !!document.getElementById('toggleFiberLabels')?.checked,
      masar: !!document.getElementById('toggleMasarLabels')?.checked,
      arch: !!document.getElementById('toggleArchLabels')?.checked,
      hotels: !!document.getElementById('toggleHotelLabels')?.checked,
      restaurants: !!document.getElementById('toggleRestaurantLabels')?.checked
    },
    currentStage: null,
    currentGovRendererKey: null,
    nationalViewExtent: null,
    jordanTargetExtent: null,
    nationalCenter: null,
    nationalScale: null,
    panLimitExtent: null,
    panClampBusy: false,
    lockRecenterBusy: false,
    searchNavigationBusy: false,
    renderedSearchResults: [],
    aiMode: 'map',
    lastAiContext: null,
    aiMapGraphics: [],
    aiResultsLayer: null,
    importedLayer: null,
    editLayer: null,
    sketchVM: null,
    editSourceGraphic: null,
    editWorkingGraphic: null,
    editedCopiesCounter: 1,
    aiResultItems: [],
    aiPanelMinimized: false
  };

  function decodeArabicMojibake(value) {
    if (value == null) return '';
    const s = String(value).trim();
    if (!s) return '';
    try {
      if (/[\u0600-\u06FF]/.test(s)) return s;
      return decodeURIComponent(escape(s));
    } catch (e) {}
    try {
      return new TextDecoder('windows-1256').decode(Uint8Array.from([...s].map((ch) => ch.charCodeAt(0) & 0xff)));
    } catch (e) {}
    return s;
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fmt(value) {
    if (value == null || value === '' || Number.isNaN(Number(value))) return '—';
    return Number(value).toLocaleString('en-US');
  }

  function normalizeSearchText(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[ً-ٰٟـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/[ىئ]/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/ء/g, '')
      .replace(/[\u0640\u200f\u200e]/g, '')
      .replace(/[،؛,:;\.\(\)\[\]{}<>"'`~!؟?\-_/\\|]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function hasArabic(value) {
    return /[\u0600-\u06FF]/.test(String(value || ''));
  }

  function firstArabicValue(...values) {
    for (const value of values) {
      const decoded = decodeArabicMojibake(value || '');
      if (decoded && hasArabic(decoded)) return decoded;
    }
    return '';
  }

  const HIGHWAY_TYPE_AR = {
    motorway: 'طريق سريع',
    motorway_link: 'وصلة طريق سريع',
    trunk: 'طريق رئيسي',
    trunk_link: 'وصلة طريق رئيسي',
    primary: 'طريق أولي',
    primary_link: 'وصلة طريق أولي',
    secondary: 'طريق ثانوي',
    secondary_link: 'وصلة طريق ثانوي',
    tertiary: 'طريق فرعي',
    tertiary_link: 'وصلة طريق فرعي',
    residential: 'طريق سكني',
    service: 'طريق خدمة',
    track: 'مسار ترابي',
    unclassified: 'طريق غير مصنف'
  };

  function highwayTypeArabic(value) {
    const key = String(value || '').toLowerCase();
    return HIGHWAY_TYPE_AR[key] || 'طريق';
  }

  const TRAIL_STAGE_AR = {
    '101': 'أم قيس إلى زقلاب',
    '102': 'زقلاب إلى بيت إيدس',
    '103': 'بيت إيدس إلى راسون',
    '104': 'راسون إلى قلعة عجلون',
    '201': 'قلعة عجلون إلى خربة السوق',
    '202': 'خربة السوق إلى سد الملك طلال',
    '203': 'سد الملك طلال إلى الرميمين',
    '204.1': 'الرميمين إلى الفحيص',
    '204': 'الرميمين إلى السلط',
    '301.1': 'الفحيص إلى عراق الأمير',
    '301': 'مدينة السلط إلى عراق الأمير',
    '302': 'عراق الأمير إلى حسبان',
    '303': 'حسبان إلى عيون الذيب',
    '304': 'عيون الذيب إلى وادي زرقاء ماعين',
    '401': 'وادي زرقاء ماعين إلى وادي الهيدان',
    '402': 'وادي الهيدان إلى وادي الموجب',
    '403': 'وادي الموجب إلى مجدلين',
    '404': 'مجدلين إلى الكرك',
    '501': 'الكرك إلى طور طابون',
    '502': 'طور طابون إلى كركا',
    '503': 'كركا إلى معطن',
    '504': 'معطن إلى ضانا',
    '601': 'ضانا إلى وادي ملقا',
    '602': 'وادي ملقا إلى رأس الفيض',
    '603': 'رأس الفيض إلى البتراء الصغيرة',
    '604.1': 'وادي المدلم — مسار بديل',
    '604': 'البتراء الصغيرة إلى البتراء',
    '701': 'البتراء إلى قاع مريبد',
    '702': 'قاع مريبد إلى وادي السيف',
    '703': 'وادي السيف إلى وادي قصيب',
    '704': 'وادي قصيب إلى وادي أحيمر',
    '705': 'وادي أحيمر إلى الحميمة',
    '801': 'الحميمة إلى جبل خرازة',
    '802': 'جبل خرازة إلى الشاكرية',
    '803': 'الشاكرية إلى قرية رم',
    '804': 'قرية رم إلى وادي ورقة',
    '805': 'وادي ورقة إلى المخيم الأخير',
    '806': 'المخيم الأخير إلى البحر الأحمر'
  };

  function trailStageArabic(stage, fallbackTitle) {
    const key = String(stage || '').trim();
    if (TRAIL_STAGE_AR[key]) return 'مرحلة ' + key + ' — ' + TRAIL_STAGE_AR[key];
    const decoded = decodeArabicMojibake(fallbackTitle || '');
    return hasArabic(decoded) ? decoded : ('مرحلة ' + (key || '')).trim();
  }

  function hexToRgba(hex, alpha) {
    const v = hex.replace('#', '');
    const n = parseInt(v, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return [r, g, b, alpha];
  }

  function getGovArabicName(props) {
    const decoded = decodeArabicMojibake(props.Name_A || '');
    if (decoded && /[\u0600-\u06FF]/.test(decoded)) return decoded;
    return GOV_NAME_MAP[props.NIC_NAME_E] || props.NIC_NAME_E || '—';
  }

  function normalizePlaceType(props) {
    const f = String(props.fclass || '').toLowerCase();
    if (f === 'national_capital' || f === 'city') return 'city';
    if (f === 'town') return 'town';
    return 'village';
  }

  function isMajorPlace(props) {
    const f = String(props.fclass || '').toLowerCase();
    return f === 'national_capital' || f === 'city' || f === 'town';
  }

  function makeBlobUrl(featureCollection) {
    return URL.createObjectURL(new Blob([JSON.stringify(featureCollection)], { type: 'application/json' }));
  }

  function computeExtent(features) {
    let xmin = Infinity;
    let ymin = Infinity;
    let xmax = -Infinity;
    let ymax = -Infinity;
    const scan = (coords) => {
      if (!Array.isArray(coords)) return;
      if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
        xmin = Math.min(xmin, coords[0]);
        ymin = Math.min(ymin, coords[1]);
        xmax = Math.max(xmax, coords[0]);
        ymax = Math.max(ymax, coords[1]);
        return;
      }
      coords.forEach(scan);
    };
    features.forEach((feature) => scan(feature.geometry?.coordinates));
    return { xmin, ymin, xmax, ymax };
  }

  function createGovFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: govData.features.map((feature, index) => {
        const props = feature.properties || {};
        const nameAr = getGovArabicName(props);
        return {
          type: 'Feature',
          geometry: feature.geometry,
          properties: {
            OBJECTID: index + 1,
            gov_name_ar: nameAr,
            gov_name_en: props.NIC_NAME_E || '',
            pop_2014: Number(props.Pop_2014 || 0),
            pop_density_2014: Number(props['Pop_km²_14'] || 0),
            hotel_beds_2014: Number(props.Ho_beds_14 || 0),
            refugees: Number(props.Refugees || 0),
            male_2014: Number(props.Male_2014 || 0),
            female_2014: Number(props.Fema_2014 || 0)
          }
        };
      })
    };
  }

  function createPlacesFeatureCollection(mode) {
    return {
      type: 'FeatureCollection',
      features: placesData.features
        .filter((feature) => Array.isArray(feature.geometry?.coordinates) && feature.geometry.coordinates.length >= 2)
        .filter((feature) => mode === 'major' ? isMajorPlace(feature.properties || {}) : !isMajorPlace(feature.properties || {}))
        .map((feature, index) => {
          const props = feature.properties || {};
          const type = normalizePlaceType(props);
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              place_name_ar: decodeArabicMojibake(props.name || '') || props.name || 'موقع',
              settlement_type: type,
              settlement_label: placeTypeLabels[type],
              fclass: props.fclass || '',
              population: Number(props.population || 0),
              osm_id: String(props.osm_id || ''),
              hierarchy_group: mode === 'major' ? 'major' : 'local'
            }
          };
        })
    };
  }

  function createArchFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: archSitesData.features
        .filter((feature) => Array.isArray(feature.geometry?.coordinates) && feature.geometry.coordinates.length >= 2)
        .map((feature, index) => {
          const props = feature.properties || {};
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: Number(props.id || index + 1),
              site_name_ar: firstArabicValue(props.site, props.name) || 'موقع أثري',
              governorate: firstArabicValue(props.gover, props.governorate, props.GOVERNORATE) || '',
              description_ar: firstArabicValue(props.desc_, props.description, props.DESCRIPTION) || 'موقع أثري',
              activity_count: Number(props.Act_Num || 0),
              point_no: Number(props.Num || index + 1)
            }
          };
        })
    };
  }


  function isValidHotelGeometry(feature) {
    const coords = feature?.geometry?.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) return false;
    const lon = Number(coords[0]);
    const lat = Number(coords[1]);
    return Number.isFinite(lon) && Number.isFinite(lat) && lat >= 28 && lat <= 34 && lon >= 34 && lon <= 40;
  }

  function cleanHotelText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .replace(/^[-–—]+|[-–—]+$/g, '')
      .trim();
  }

  function isGenericHotelName(value) {
    const text = cleanHotelText(value);
    return !text || /^فندق\s*\d+$/i.test(text) || /^hotel\s*\d+$/i.test(text);
  }

  function createHotelsAllFeatures() {
    const features = Array.isArray(hotelsData.features) ? hotelsData.features : [];
    return features.map((feature, index) => {
      const props = feature.properties || {};
      // لا نستخدم أسماء وهمية مثل "فندق 36". إذا لم يتوفر اسم عربي نعرض الاسم الإنجليزي كما هو.
      const rawArabicName = firstArabicValue(props.hotel_name_ar, props.hotel_name) || '';
      const rawEnglishName = cleanHotelText(props.hotel_name_en || props.hotel_name || props.google_query || '');
      const cleanArabicName = cleanHotelText(rawArabicName);
      const name = !isGenericHotelName(cleanArabicName)
        ? cleanArabicName
        : (!isGenericHotelName(rawEnglishName) ? rawEnglishName : '');
      return {
        type: 'Feature',
        geometry: feature.geometry || null,
        properties: {
          OBJECTID: Number(props.OBJECTID || index + 1),
          hotel_id: props.hotel_id || `HOTEL-${index + 1}`,
          hotel_name_ar: name,
          hotel_name_en: rawEnglishName,
          governorate_ar: props.governorate_ar || '',
          destination_ar: props.destination_ar || '',
          facility_type_ar: props.facility_type_ar || 'فندق / منشأة إيواء',
          classification_ar: props.classification_ar || '',
          phone: props.phone || '',
          email: props.email || '',
          website: props.website || '',
          address_ar: props.address_ar || '',
          osm_id: props.osm_id || '',
          rooms: props.rooms || '',
          beds: props.beds || '',
          google_query: props.google_query || '',
          google_maps_search: props.google_maps_search || ''
        }
      };
    }).filter((feature) => !isGenericHotelName(feature.properties.hotel_name_ar || feature.properties.hotel_name_en));
  }

  function createHotelsFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: hotelsAllFeatures.filter(isValidHotelGeometry)
    };
  }

  function isValidRestaurantGeometry(feature) {
    const coords = feature?.geometry?.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) return false;
    const lon = Number(coords[0]);
    const lat = Number(coords[1]);
    return Number.isFinite(lon) && Number.isFinite(lat) && lat >= 28 && lat <= 34 && lon >= 34 && lon <= 40;
  }

  function cleanRestaurantText(value) {
    return String(value || '')
      .replace(/\s+/g, ' ')
      .replace(/^[-–—]+|[-–—]+$/g, '')
      .trim();
  }

  function isGenericRestaurantName(value) {
    const text = cleanRestaurantText(value).toLowerCase();
    return !text || /^(مطعم|مقهى|كافيه|restaurant|restaurants|cafe|coffee|food|مطعم\s*\d+|restaurant\s*\d+|cafe\s*\d+)$/i.test(text);
  }

  function createRestaurantsAllFeatures() {
    const features = Array.isArray(restaurantsData.features) ? restaurantsData.features : [];
    return features.map((feature, index) => {
      const props = feature.properties || {};
      const rawArabicName = firstArabicValue(props.restaurant_name_ar, props.official_name_ar) || props.restaurant_name_ar || props.official_name_ar || '';
      const rawEnglishName = cleanRestaurantText(props.restaurant_name_en || props.official_name_en || props.restaurant_name_ar || '');
      const cleanArabicName = cleanRestaurantText(rawArabicName);
      const name = !isGenericRestaurantName(cleanArabicName)
        ? cleanArabicName
        : (!isGenericRestaurantName(rawEnglishName) ? rawEnglishName : '');
      return {
        type: 'Feature',
        geometry: feature.geometry || null,
        properties: {
          OBJECTID: Number(props.OBJECTID || index + 1),
          restaurant_id: props.restaurant_id || ('REST-' + (index + 1)),
          restaurant_name_ar: name,
          restaurant_name_en: rawEnglishName,
          area_ar: props.area_ar || '',
          facility_type_ar: props.facility_type_ar || 'مطعم / خدمة طعام',
          cuisine_ar: props.cuisine_ar || '',
          phone: props.phone || '',
          email: props.email || '',
          website: props.website || '',
          address_ar: props.address_ar || '',
          osm_id: props.osm_id || '',
          official_match: props.official_match || 'لا',
          official_category: props.official_category || '',
          official_source: props.official_source || '',
          official_year: props.official_year || '',
          match_score: props.match_score || ''
        }
      };
    }).filter((feature) => !isGenericRestaurantName(feature.properties.restaurant_name_ar || feature.properties.restaurant_name_en));
  }

  function createRestaurantsFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: restaurantsAllFeatures.filter(isValidRestaurantGeometry)
    };
  }

  function createLiwaFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: liwaData.features
        .filter((feature) => feature.geometry?.coordinates)
        .map((feature, index) => {
          const props = feature.properties || {};
          const name = decodeArabicMojibake(props.name || props.NAME || '') || props.name || `لواء ${index + 1}`;
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              liwa_name_ar: name,
              liwa_code: String(props.code || props.CODE || ''),
              osm_id: String(props.osm_id || props.OSM_ID || ''),
              fclass: props.fclass || props.FCLASS || ''
            }
          };
        })
    };
  }

  function createRailFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: railData.features
        .filter((feature) => feature.geometry?.coordinates)
        .map((feature, index) => {
          const props = feature.properties || {};
          const name = firstArabicValue(props.NAME, props.name) || `سكة حديدية ${index + 1}`;
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              rail_name_ar: name,
              rail_name_en: props.NAME_EN || '',
              railway_type: props.RAILWAY || '',
              gauge: props.GAUGE || '',
              service: props.SERVICE || '',
              osm_id: String(props.OSM_ID || '')
            }
          };
        })
    };
  }

  function createHighwayFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: highwayData.features
        .filter((feature) => feature.geometry?.coordinates)
        .map((feature, index) => {
          const props = feature.properties || {};
          const arabicName = firstArabicValue(props.NAME, props.name, props.NAME_AR);
          const ref = String(props.REF || '').trim();
          const highwayType = String(props.HIGHWAY || '').toLowerCase();
          const typeName = highwayTypeArabic(highwayType);
          const isMajorRoad = ['motorway', 'motorway_link', 'trunk', 'trunk_link', 'primary', 'primary_link', 'secondary', 'secondary_link'].includes(highwayType);

          // road_name_ar يستخدم للتفاصيل والبحث، أما road_label_ar فهو فقط للأسماء التي تستحق الظهور على الخريطة.
          // لا نعرض على الخريطة تسميات مولدة مثل: طريق غير مصنف 133843 أو طريق سكني 39225.
          const displayName = arabicName || (ref ? `طريق رقم ${ref}` : `${typeName} ${index + 1}`);
          const mapLabel = arabicName || (ref && isMajorRoad ? `طريق رقم ${ref}` : '');

          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              road_name_ar: displayName,
              road_label_ar: mapLabel,
              road_name_en: props.NAME_EN || '',
              ref,
              highway_type: props.HIGHWAY || '',
              highway_type_ar: typeName,
              osm_id: String(props.OSM_ID || '')
            }
          };
        })
    };
  }

  function createFiberFeatureCollection(filterKey) {
    return {
      type: 'FeatureCollection',
      features: fiberData.features
        .filter((feature) => feature.geometry?.coordinates)
        .filter((feature) => !filterKey || String(feature.properties?.layer_key || '') === filterKey)
        .map((feature, index) => {
          const props = feature.properties || {};
          const name = firstArabicValue(props.Arabic_Name, props.name, props.NAME_AR) || `موقع ${index + 1}`;
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              fiber_name_ar: name,
              connection_id: props.Connection_ID || '',
              department: decodeArabicMojibake(props.Department || '') || props.Department || '',
              layer_key: props.layer_key || filterKey || '',
              layer_label: decodeArabicMojibake(props.layer_label || '') || props.layer_label || '',
              active: props.Active || ''
            }
          };
        })
    };
  }

  function createMasarFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: masarData.features
        .filter((feature) => feature.geometry?.coordinates)
        .map((feature, index) => {
          const props = feature.properties || {};
          const stage = String(props.stage || props.id || index + 1);
          const title = trailStageArabic(stage, props.title || props.name);
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              masar_title: title,
              masar_name: title,
              masar_title_en: props.title || props.name || '',
              stage,
              distance_km: Number(props.distance_km || 0)
            }
          };
        })
    };
  }

  function createContourFeatureCollection() {
    return {
      type: 'FeatureCollection',
      features: contourData.features
        .filter((feature) => feature.geometry?.coordinates)
        .map((feature, index) => {
          const props = feature.properties || {};
          const elev = Number(props.elev ?? props.ELEV ?? props.CONTOUR ?? 0);
          return {
            type: 'Feature',
            geometry: feature.geometry,
            properties: {
              OBJECTID: index + 1,
              elev,
              contour_name: `خط كنتور ${fmt(elev)} م`,
              contour_label: `${fmt(elev)} م`,
              contour_type: elev === 0 ? 'zero' : (Math.abs(elev) % 500 === 0 ? 'major' : 'minor'),
              contour_type_ar: elev === 0 ? 'منسوب صفر' : (Math.abs(elev) % 500 === 0 ? 'كنتور رئيسي' : 'كنتور فرعي')
            }
          };
        })
    };
  }

  const govFC = createGovFeatureCollection();
  const liwaFC = createLiwaFeatureCollection();
  const railFC = createRailFeatureCollection();
  const highwayFC = createHighwayFeatureCollection();
  const majorPlacesFC = createPlacesFeatureCollection('major');
  const detailPlacesFC = createPlacesFeatureCollection('detail');
  const fiberEduFC = createFiberFeatureCollection('edu');
  const fiberGovFC = createFiberFeatureCollection('gov_agency');
  const fiberHealthFC = createFiberFeatureCollection('health');
  const fiberSchoolsFC = createFiberFeatureCollection('school');
  const masarFC = createMasarFeatureCollection();
  const contourFC = createContourFeatureCollection();
  const archFC = createArchFeatureCollection();
  const hotelsAllFeatures = createHotelsAllFeatures();
  const hotelsFC = createHotelsFeatureCollection();
  const restaurantsAllFeatures = createRestaurantsAllFeatures();
  const restaurantsFC = createRestaurantsFeatureCollection();

  const SEARCH_LAYER_PRIORITY = {
    gov: 1,
    liwa: 2,
    arch: 3,
    hotels: 4,
    restaurants: 5,
    'place-major': 6,
    'place-detail': 6,
    masar: 7,
    'fiber-edu': 7,
    'fiber-gov_agency': 7,
    'fiber-health': 7,
    'fiber-school': 7,
    rail: 8,
    contour: 9,
    highway: 10
  };

  function getSearchLayerPriority(layerKey) {
    return SEARCH_LAYER_PRIORITY[layerKey] || 99;
  }

  function compactSearchIndex(items) {
    return items.filter((item) => item && item.title && item.searchText);
  }

  function makeSearchItem(feature, layerKey, title, subtitle, searchParts = []) {
    const safeTitle = String(title || '').trim();
    const props = feature?.properties || {};
    const searchable = [safeTitle, subtitle, ...searchParts]
      .filter((value) => value !== undefined && value !== null)
      .join(' ');
    return {
      layerKey,
      objectId: props.OBJECTID,
      title: safeTitle,
      subtitle: String(subtitle || '').trim(),
      feature,
      searchText: normalizeSearchText(searchable),
      titleSearchText: normalizeSearchText(safeTitle),
      layerPriority: getSearchLayerPriority(layerKey)
    };
  }

  const searchIndices = {
    gov: compactSearchIndex(govFC.features.map((feature) => makeSearchItem(
      feature,
      'gov',
      feature.properties.gov_name_ar,
      'محافظة',
      [feature.properties.gov_name_en, 'محافظات محافظة governorate']
    ))),
    liwa: compactSearchIndex(liwaFC.features.map((feature) => makeSearchItem(
      feature,
      'liwa',
      feature.properties.liwa_name_ar,
      'لواء',
      [feature.properties.liwa_code, feature.properties.osm_id, 'الويه الوية لواء district']
    ))),
    rail: compactSearchIndex(railFC.features.map((feature) => makeSearchItem(
      feature,
      'rail',
      feature.properties.rail_name_ar,
      'سكة حديدية',
      [feature.properties.rail_name_en, feature.properties.railway_type, feature.properties.gauge, 'سكة سكك حديد قطار railway']
    ))),
    highway: compactSearchIndex(highwayFC.features.map((feature) => makeSearchItem(
      feature,
      'highway',
      feature.properties.road_name_ar,
      feature.properties.ref ? `طريق — رقم ${feature.properties.ref}` : 'طريق',
      [feature.properties.road_name_en, feature.properties.ref, feature.properties.highway_type, feature.properties.highway_type_ar, 'طريق طرق شارع شوارع road highway']
    ))),
    placeMajor: compactSearchIndex(majorPlacesFC.features.map((feature) => makeSearchItem(
      feature,
      'place-major',
      feature.properties.place_name_ar,
      `${feature.properties.settlement_label} — رئيسية`,
      [feature.properties.fclass, feature.properties.osm_id, 'مدينة مدن بلدة بلدات قرية قرى village city town']
    ))),
    placeDetail: compactSearchIndex(detailPlacesFC.features.map((feature) => makeSearchItem(
      feature,
      'place-detail',
      feature.properties.place_name_ar,
      feature.properties.settlement_label,
      [feature.properties.fclass, feature.properties.osm_id, 'مدينة مدن بلدة بلدات قرية قرى محلية locality village city town']
    ))),
    fiber: compactSearchIndex([...fiberEduFC.features, ...fiberGovFC.features, ...fiberHealthFC.features, ...fiberSchoolsFC.features].map((feature) => makeSearchItem(
      feature,
      `fiber-${feature.properties.layer_key}`,
      feature.properties.fiber_name_ar,
      feature.properties.layer_label || 'موقع مؤسسي',
      [feature.properties.department, feature.properties.layer_label, feature.properties.connection_id, 'مؤسسة مؤسسات مواقع مؤسسية مدرسة مدارس مدرسه حكومي صحة صحي صحية مركز صحي مستشفى مستشفي مديرية تربية']
    ))),
    arch: compactSearchIndex(archFC.features.map((feature) => makeSearchItem(
      feature,
      'arch',
      feature.properties.site_name_ar,
      feature.properties.governorate ? `موقع أثري — ${feature.properties.governorate}` : 'موقع أثري',
      [feature.properties.governorate, feature.properties.description_ar, 'موقع مواقع موقع اثري مواقع اثرية المواقع الاثرية مواقع اثريه اثري اثرية آثار اثار سياحي سياحية قلعة جبل القلعة']
    ))),
    // البحث المكاني يجب أن يعرض فقط الفنادق التي لها إحداثيات صحيحة حتى لا يختار المستخدم نتيجة لا يمكن تكبير الخريطة إليها.
    hotels: compactSearchIndex(hotelsFC.features.map((feature) => makeSearchItem(
      feature,
      'hotels',
      feature.properties.hotel_name_ar || feature.properties.hotel_name_en,
      feature.properties.governorate_ar ? `فندق / منشأة إيواء — ${feature.properties.governorate_ar}` : 'فندق / منشأة إيواء',
      [
        feature.properties.hotel_name_en,
        feature.properties.governorate_ar,
        feature.properties.destination_ar,
        feature.properties.classification_ar,
        feature.properties.facility_type_ar,
        feature.properties.address_ar,
        feature.properties.phone,
        'فندق فنادق هوتيل اوتيل hotel hotels lodging اقامة إقامة منشأة ايواء إيواء مخيم شقق فندقية'
      ]
    ))),
    restaurants: compactSearchIndex(restaurantsFC.features.map((feature) => makeSearchItem(
      feature,
      'restaurants',
      feature.properties.restaurant_name_ar || feature.properties.restaurant_name_en,
      feature.properties.area_ar ? ('مطعم / خدمة طعام — ' + feature.properties.area_ar) : 'مطعم / خدمة طعام',
      [
        feature.properties.restaurant_name_en,
        feature.properties.area_ar,
        feature.properties.cuisine_ar,
        feature.properties.facility_type_ar,
        feature.properties.address_ar,
        feature.properties.phone,
        feature.properties.official_source,
        'مطعم مطاعم مقهى كافيه كافيهات restaurant restaurants food cafe cuisine اكل طعام'
      ]
    ))),
    masar: compactSearchIndex(masarFC.features.map((feature) => makeSearchItem(
      feature,
      'masar',
      feature.properties.masar_title,
      `درب الأردن — مرحلة ${feature.properties.stage}`,
      [feature.properties.masar_name, feature.properties.masar_title_en, feature.properties.stage, feature.properties.distance_km, 'مسار درب الاردن الأردن trail jordan']
    ))),
    contour: compactSearchIndex(contourFC.features.map((feature) => makeSearchItem(
      feature,
      'contour',
      feature.properties.contour_name,
      'خط كنتور',
      [feature.properties.contour_type_ar, feature.properties.elev, 'كنتور contour elevation ارتفاع منسوب تضاريس']
    )))
  };

  state.searchIndex = [
    ...searchIndices.gov,
    ...searchIndices.liwa,
    ...searchIndices.rail,
    ...searchIndices.highway,
    ...searchIndices.placeMajor,
    ...searchIndices.placeDetail,
    ...searchIndices.fiber,
    ...searchIndices.arch,
    ...searchIndices.hotels,
    ...searchIndices.restaurants,
    ...searchIndices.masar,
    ...searchIndices.contour
  ];

  window.__APP_LAYER_DIAGNOSTICS__ = {
    features: {
      gov: govFC.features.length,
      liwa: liwaFC.features.length,
      rail: railFC.features.length,
      highway: highwayFC.features.length,
      placeMajor: majorPlacesFC.features.length,
      placeDetail: detailPlacesFC.features.length,
      fiber: fiberEduFC.features.length + fiberGovFC.features.length + fiberHealthFC.features.length + fiberSchoolsFC.features.length,
      arch: archFC.features.length,
      hotels: hotelsFC.features.length,
      hotelsRecords: hotelsAllFeatures.length,
      restaurants: restaurantsFC.features.length,
      restaurantsRecords: restaurantsAllFeatures.length,
      masar: masarFC.features.length,
      contour: contourFC.features.length
    },
    search: Object.fromEntries(Object.entries(searchIndices).map(([key, value]) => [key, value.length]))
  };

  function buildLegend() {
    const names = Object.keys(GOV_COLORS);
    els.govLegend.innerHTML = names
      .map((name) => `<div class="legend-item"><span class="legend-swatch" style="background:${GOV_COLORS[name]}"></span>${escapeHtml(name)}</div>`)
      .join('');
    [els.placeLegendWrap, els.archLegendWrap, els.hotelsLegendWrap, els.restaurantsLegendWrap, els.railLegendWrap, els.highwayLegendWrap, els.fiberLegendWrap, els.masarLegendWrap]
      .forEach((wrap) => wrap?.classList.remove('hidden'));
  }

  function populateKpis() {
    const totalPopulation = govFC.features.reduce((sum, f) => sum + Number(f.properties.pop_2014 || 0), 0);
    const topGov = govFC.features.slice().sort((a, b) => (b.properties.pop_2014 || 0) - (a.properties.pop_2014 || 0))[0];
    if (els.kpiGovCount) els.kpiGovCount.textContent = fmt(govFC.features.length);
    if (els.kpiRailCount) els.kpiRailCount.textContent = fmt(railFC.features.length);
    if (els.kpiHighwayCount) els.kpiHighwayCount.textContent = fmt(highwayFC.features.length);
    if (els.kpiPopulation) els.kpiPopulation.textContent = fmt(totalPopulation);
    if (els.kpiTopGov) els.kpiTopGov.textContent = topGov ? topGov.properties.gov_name_ar : '—';
  }

  function renderGovTable(filterText = '') {
    if (!els.govTableBody) return;
    const normalized = normalizeSearchText(filterText);
    const rows = govFC.features.filter((feature) => {
      if (!normalized) return true;
      return normalizeSearchText(feature.properties.gov_name_ar).includes(normalized);
    });
    els.govTableBody.innerHTML = rows
      .map((feature) => {
        const p = feature.properties;
        return `
          <tr>
            <td>${escapeHtml(p.gov_name_ar)}</td>
            <td>${fmt(p.pop_2014)}</td>
            <td>${fmt(p.pop_density_2014)}</td>
            <td>${fmt(p.hotel_beds_2014)}</td>
            <td>${fmt(p.refugees)}</td>
          </tr>`;
      })
      .join('');
  }

  function markAsPending(toggle, labelSuffix = '— مرحلة لاحقة') {
    if (!toggle) return;
    toggle.checked = false;
    toggle.disabled = true;
    const label = toggle.closest('label');
    if (label && !label.querySelector('.pending-badge')) {
      const badge = document.createElement('span');
      badge.className = 'pending-badge';
      badge.textContent = labelSuffix;
      label.appendChild(badge);
      label.classList.add('is-disabled');
    }
  }

  function disablePendingControls() {
    // جميع الطبقات مفعلة الآن، لذلك لا يتم تعطيل أي خيار في اللوحة أو البحث.
  }

  buildLegend();
  populateKpis();
  renderGovTable();
  // تم تفعيل جميع الطبقات والبحث عنها؛ لم تعد طبقات مرحلة لاحقة.
  els.modeBadge.textContent = 'ArcGIS — الخارطة السياحية الذكية';
  els.highwayZoomBadge.textContent = STAGE_LABELS.national;
  els.zoomHint.textContent = 'تم اعتماد هرمية فعلية لظهور الطبقات حسب مقياس الرسم: المحافظات عند العرض الوطني، ثم المدن الرئيسية والألوية والسكك، ثم الطرق والمسارات، ثم المؤسسات الصحية والمدارس وخطوط الكنتور عند التكبير المناسب. البحث يبقى شاملًا لكل الطبقات حتى لو كانت مخفية مؤقتًا بسبب المقياس.';
  if (els.selectionDetails) els.selectionDetails.innerHTML = '<div class="migration-note">لا يوجد عنصر محدد حاليًا.</div>';
  if (els.featureInfo) els.featureInfo.textContent = 'جاهز';

  const [Map, GeoJSONLayer, FeatureLayer, SceneLayer, TileLayer, Extent, Graphic, GraphicsLayer, webMercatorUtils, SketchViewModel] = await $arcgis.import([
    '@arcgis/core/Map.js',
    '@arcgis/core/layers/GeoJSONLayer.js',
    '@arcgis/core/layers/FeatureLayer.js',
    '@arcgis/core/layers/SceneLayer.js',
    '@arcgis/core/layers/TileLayer.js',
    '@arcgis/core/geometry/Extent.js',
    '@arcgis/core/Graphic.js',
    '@arcgis/core/layers/GraphicsLayer.js',
    '@arcgis/core/geometry/support/webMercatorUtils.js',
    '@arcgis/core/widgets/Sketch/SketchViewModel.js'
  ]);

  const govUrl = makeBlobUrl(govFC);
  const liwaUrl = makeBlobUrl(liwaFC);
  const railUrl = makeBlobUrl(railFC);
  const highwayUrl = makeBlobUrl(highwayFC);
  const majorPlacesUrl = makeBlobUrl(majorPlacesFC);
  const detailPlacesUrl = makeBlobUrl(detailPlacesFC);
  const fiberEduUrl = makeBlobUrl(fiberEduFC);
  const fiberGovUrl = makeBlobUrl(fiberGovFC);
  const fiberHealthUrl = makeBlobUrl(fiberHealthFC);
  const fiberSchoolsUrl = makeBlobUrl(fiberSchoolsFC);
  const masarUrl = makeBlobUrl(masarFC);
  const contourUrl = makeBlobUrl(contourFC);
  const archUrl = makeBlobUrl(archFC);
  const hotelsUrl = makeBlobUrl(hotelsFC);
  const restaurantsUrl = makeBlobUrl(restaurantsFC);

  function buildGovRenderer(mode) {
    const imageryOn = state.basemap === 'imagery';
    const nationalAlpha = imageryOn ? 0.055 : 0.86;
    const regionalAlpha = imageryOn ? 0.018 : 0.075;
    const outlineColor = imageryOn ? '#ffffff' : '#64748b';

    if (mode === 'national') {
      return {
        type: 'unique-value',
        field: 'gov_name_ar',
        defaultSymbol: { type: 'simple-fill', color: [220, 227, 236, imageryOn ? 0.035 : 0.85], outline: { color: imageryOn ? '#ffffff' : '#ffffff', width: imageryOn ? 2.1 : 1.5 } },
        uniqueValueInfos: Object.entries(GOV_COLORS).map(([value, color]) => ({
          value,
          symbol: { type: 'simple-fill', color: hexToRgba(color, nationalAlpha), outline: { color: imageryOn ? '#ffffff' : '#ffffff', width: imageryOn ? 2.1 : 1.5 } }
        }))
      };
    }
    if (mode === 'regional') {
      return {
        type: 'unique-value',
        field: 'gov_name_ar',
        defaultSymbol: { type: 'simple-fill', color: [220, 227, 236, imageryOn ? 0.015 : 0.07], outline: { color: outlineColor, width: imageryOn ? 1.6 : 1.15 } },
        uniqueValueInfos: Object.entries(GOV_COLORS).map(([value, color]) => ({
          value,
          symbol: { type: 'simple-fill', color: hexToRgba(color, regionalAlpha), outline: { color: outlineColor, width: imageryOn ? 1.6 : 1.15 } }
        }))
      };
    }
    // عند التكبير المحلي/التفصيلي تخرج المحافظات من نمط الألوان القوية
    // وتتحول إلى خلفية صفراء فاتحة شفافة مع حدود هادئة، بدل الأبيض،
    // حتى يبقى الإحساس بحدود الأردن دون تغطية الألوية والطرق والنقاط.
    return {
      type: 'simple',
      symbol: {
        type: 'simple-fill',
        color: imageryOn ? [255, 246, 164, 0.10] : [255, 246, 164, mode === 'local' ? 0.24 : 0.16],
        outline: {
          color: mode === 'local' ? (imageryOn ? '#fff7cc' : '#d6b84f') : (imageryOn ? '#fffbe6' : '#e6d27a'),
          width: mode === 'local' ? 1.05 : 0.8
        }
      }
    };
  }


  const govLabelClass = {
    labelExpressionInfo: { expression: '$feature.gov_name_ar' },
    symbol: { type: 'text', color: '#17324d', haloColor: '#ffffff', haloSize: 1.8, font: { size: 11, family: 'Tajawal', weight: 'bold' } },
    labelPlacement: 'always-horizontal',
    deconflictionStrategy: 'static'
  };

  const majorCityLabelClass = {
    where: "settlement_type = 'city'",
    labelExpressionInfo: { expression: '$feature.place_name_ar' },
    symbol: { type: 'text', color: '#17324d', haloColor: '#ffffff', haloSize: 2, font: { size: 9.5, family: 'Tajawal', weight: 'bold' } },
    labelPlacement: 'above-center',
    deconflictionStrategy: 'static'
  };

  const majorTownLabelClass = {
    where: "settlement_type = 'town'",
    labelExpressionInfo: { expression: '$feature.place_name_ar' },
    symbol: { type: 'text', color: '#35536c', haloColor: '#ffffff', haloSize: 1.8, font: { size: 8.5, family: 'Tajawal', weight: 'normal' } },
    labelPlacement: 'above-center',
    deconflictionStrategy: 'static'
  };

  const detailPlaceLabelClass = {
    labelExpressionInfo: { expression: '$feature.place_name_ar' },
    symbol: { type: 'text', color: '#35536c', haloColor: '#ffffff', haloSize: 2, font: { size: 8, family: 'Tajawal', weight: 'normal' } },
    labelPlacement: 'above-center',
    deconflictionStrategy: 'static'
  };

  const archLabelClass = {
    labelExpressionInfo: { expression: '$feature.site_name_ar' },
    symbol: { type: 'text', color: '#6b3f00', haloColor: '#ffffff', haloSize: 2, font: { size: 9, family: 'Tajawal', weight: 'bold' } },
    labelPlacement: 'above-center',
    deconflictionStrategy: 'static'
  };

  const liwaLabelClass = { labelExpressionInfo: { expression: '$feature.liwa_name_ar' }, symbol: { type: 'text', color: '#24506f', haloColor: '#ffffff', haloSize: 1.8, font: { size: 8.5, family: 'Tajawal', weight: 'bold' } }, labelPlacement: 'always-horizontal', deconflictionStrategy: 'static' };
  const railLabelClass = { labelExpressionInfo: { expression: '$feature.rail_name_ar' }, symbol: { type: 'text', color: '#1f2937', haloColor: '#ffffff', haloSize: 1.7, font: { size: 8, family: 'Tajawal', weight: 'bold' } }, labelPlacement: 'center-along', deconflictionStrategy: 'static' };
  const highwayLabelClass = {
    where: "road_label_ar <> ''",
    labelExpressionInfo: { expression: '$feature.road_label_ar' },
    symbol: { type: 'text', color: '#7c2d12', haloColor: '#ffffff', haloSize: 1.5, font: { size: 7.5, family: 'Tajawal', weight: 'bold' } },
    labelPlacement: 'center-along',
    deconflictionStrategy: 'static'
  };
  const fiberLabelClass = { labelExpressionInfo: { expression: '$feature.fiber_name_ar' }, symbol: { type: 'text', color: '#083344', haloColor: '#ffffff', haloSize: 1.7, font: { size: 7.5, family: 'Tajawal', weight: 'normal' } }, labelPlacement: 'above-center', deconflictionStrategy: 'static' };
  const masarLabelClass = { labelExpressionInfo: { expression: '$feature.masar_title' }, symbol: { type: 'text', color: '#064e3b', haloColor: '#ffffff', haloSize: 1.8, font: { size: 8, family: 'Tajawal', weight: 'bold' } }, labelPlacement: 'center-along', deconflictionStrategy: 'static' };
  const contourLabelClass = { labelExpressionInfo: { expression: '$feature.contour_label' }, symbol: { type: 'text', color: '#334155', haloColor: '#ffffff', haloSize: 1.6, font: { size: 7, family: 'Tajawal', weight: 'bold' } }, labelPlacement: 'center-along', deconflictionStrategy: 'static' };



  const OFFICIAL_STATS = window.OFFICIAL_STATS || {};

  function normalizeOfficialGovKey(name) {
    const raw = String(name || '').trim();
    if (!raw) return '';
    const aliases = OFFICIAL_STATS.govAliases || {};
    return aliases[raw] || aliases[raw.replace('محافظة ', '')] || raw.toLowerCase();
  }

  function getOfficialGovStatsByName(name) {
    const key = normalizeOfficialGovKey(name);
    const summary = OFFICIAL_STATS.dos2024ByLocation?.accommodationGovernorateSummary?.[key] || null;
    const classified = OFFICIAL_STATS.dos2024ByLocation?.classifiedHotels || {};
    const classifiedKeysByGov = {
      amman: ['amman'], aqaba: ['aqaba'], maan: ['maan_city', 'petra'], karak: ['karak'], ajloun: ['ajloun'], irbid: ['irbid'],
      balqa: ['balqa', 'dead_sea'], zarqa: ['zarqa', 'azraq'], madaba: ['madaba'], tafiela: ['tafiela'], mafraq: ['mafraq'], jarash: ['jarash']
    };
    const classRows = (classifiedKeysByGov[key] || []).map(k => classified[k]).filter(Boolean);
    return { key, summary, classRows };
  }

  function countCurrentLayerByGov(name, layerType) {
    const key = normalizeOfficialGovKey(name);
    const aliases = OFFICIAL_STATS.govAliases || {};
    const normalize = (v) => aliases[String(v || '').trim()] || aliases[String(v || '').trim().replace('محافظة ', '')] || '';
    const features = layerType === 'hotels' ? (window.HOTELS_DATA?.features || []) : (window.RESTAURANTS_DATA?.features || []);
    let count = 0;
    for (const f of features) {
      const p = f.properties || {};
      const candidates = layerType === 'hotels'
        ? [p.governorate_ar, p.destination_ar]
        : [p.governorate_ar, p.area_ar, p.official_source];
      if (candidates.some(v => normalize(v) === key)) count++;
      else if (key === 'maan' && candidates.some(v => /البترا|وادي رم|معان|Wadi Rum|Petra/i.test(String(v || '')))) count++;
      else if (key === 'balqa' && candidates.some(v => /البحر الميت|Dead Sea|البلقاء|السلط/i.test(String(v || '')))) count++;
      else if (key === 'zarqa' && candidates.some(v => /الأزرق|ازرق|Azraq|الزرقاء/i.test(String(v || '')))) count++;
    }
    return count;
  }

  function statCard(label, value, hint = '', unit = '') {
    const isEmpty = value === null || value === undefined || value === '';
    const display = isEmpty ? '—' : fmt(value) + (unit ? ' ' + unit : '');
    return '<div class="official-stat-card">'
      + '<div class="official-stat-label">' + escapeHtml(label) + '</div>'
      + '<div class="official-stat-value">' + escapeHtml(display) + '</div>'
      + (hint ? '<div class="official-stat-hint">' + escapeHtml(hint) + '</div>' : '')
      + '</div>';
  }

  function statSection(title, subtitle, cards, extra = '') {
    return '<section class="official-stat-section">'
      + '<div class="official-stat-section-title">' + escapeHtml(title) + '</div>'
      + (subtitle ? '<div class="official-stat-section-subtitle">' + escapeHtml(subtitle) + '</div>' : '')
      + '<div class="official-stat-grid">' + cards.join('') + '</div>'
      + extra
      + '</section>';
  }

  function detailSection(title, subtitle, innerHtml, open = false, tone = '') {
    return '<details class="official-accordion ' + escapeHtml(tone) + '"' + (open ? ' open' : '') + '>'
      + '<summary><span>' + escapeHtml(title) + '</span></summary>'
      + '<div class="official-accordion-body">'
      + (subtitle ? '<div class="official-accordion-subtitle">' + escapeHtml(subtitle) + '</div>' : '')
      + innerHtml
      + '</div>'
      + '</details>';
  }

  function infoList(items) {
    return '<div class="official-info-list">'
      + items.map(item => '<div class="official-info-row"><span>' + escapeHtml(item.label) + '</span><strong>' + escapeHtml(item.value) + '</strong></div>').join('')
      + '</div>';
  }

  function renderMotaPackages() {
    const pkgs = OFFICIAL_STATS.motaOfficialPackages || {};
    const years = Object.keys(pkgs).sort().reverse();
    const count = years.reduce((sum, y) => sum + ((pkgs[y] || []).length), 0);
    const blocks = years.map(year => {
      const items = (pkgs[year] || []).map(name => '<li>' + escapeHtml(name) + '</li>').join('');
      return '<div class="official-package-group">'
        + '<div class="official-package-year">' + escapeHtml(String(year)) + '</div>'
        + '<ul class="official-package-list">' + items + '</ul>'
        + '</div>';
    }).join('');
    const inner = '<div class="official-mini-banner">'
      + '<div><strong>' + escapeHtml(String(count)) + '</strong><span>ملف/محور رسمي متاح للربط</span></div>'
      + '<div><strong>' + escapeHtml(years.join(' / ')) + '</strong><span>السنوات المتاحة</span></div>'
      + '</div>'
      + blocks;
    return detailSection('بيانات وزارة السياحة والآثار', 'تعرض هنا الملفات والمحاور الرسمية المتاحة للربط التفصيلي لاحقاً، وليس أرقاماً رقمية جاهزة لكل محافظة.', inner, false, 'tone-warm');
  }

  function renderOfficialGovStats(attributes) {
    const govName = attributes.gov_name_ar || attributes.NIC_NAME_E || attributes.gov_name_en || '';
    const key = normalizeOfficialGovKey(govName);
    const gov = OFFICIAL_STATS.governorates?.[key] || null;
    const pop = gov?.population2025 || null;
    const acc = OFFICIAL_STATS.tourismAccommodation2024?.[key] || null;
    const hotelsOnMap = countCurrentLayerByGov(govName, 'hotels');
    const restaurantsOnMap = countCurrentLayerByGov(govName, 'restaurants');
    const yearsLabel = (OFFICIAL_STATS.metadata?.years || []).join(' – ');

    const summaryCards = [
      statCard('عدد السكان 2025', pop?.total, 'دائرة الإحصاءات العامة', 'نسمة'),
      statCard('معدل البطالة 2024', gov?.unemployment2024, 'حسب المحافظة', '%'),
      statCard('منشآت الإيواء 2024', acc?.units, 'إحصاءات رسمية', 'منشأة'),
      statCard('فنادق على الخريطة', hotelsOnMap, 'من الطبقة الحالية', 'موقع')
    ];

    const demographicCards = [
      statCard('ذكور 2025', pop?.male, '', 'نسمة'),
      statCard('إناث 2025', pop?.female, '', 'نسمة'),
      statCard('حضر 2025', pop?.urban, '', 'نسمة'),
      statCard('ريف 2025', pop?.rural, '', 'نسمة'),
      statCard('الكثافة السكانية 2025', pop?.density, 'شخص / كم²', ''),
      statCard('المساحة', pop?.area_km2, '', 'كم²'),
      statCard('حصة المحافظة من السكان', pop?.share, 'من إجمالي سكان المملكة', '%')
    ];

    const tourismCards = [
      statCard('منشآت الإيواء 2024', acc?.units, acc?.note || 'دائرة الإحصاءات / جداول السياحة', 'منشأة'),
      statCard('الغرف 2024', acc?.rooms, 'إيواء سياحي', 'غرفة'),
      statCard('الأسرّة 2024', acc?.beds, 'إيواء سياحي', 'سرير'),
      statCard('العاملون 2024', acc?.employees, 'في منشآت الإيواء', 'عامل')
    ];

    const mapCards = [
      statCard('فنادق داخل حدود المحافظة', hotelsOnMap, 'محسوبة من طبقة الفنادق الحالية', 'موقع'),
      statCard('مطاعم داخل حدود المحافظة', restaurantsOnMap, 'محسوبة من طبقة المطاعم الحالية', 'موقع')
    ];

    const summary = statSection('ملخص سريع', 'أهم المؤشرات الرسمية والمكانية لهذه المحافظة.', summaryCards);
    const demographics = detailSection('السكان والخصائص الديموغرافية', 'بيانات رسمية من دائرة الإحصاءات العامة لعام 2025 وبيانات البطالة 2024.', statSection('مؤشرات السكان والبطالة', '', demographicCards), true);
    const tourism = detailSection('الإيواء السياحي الرسمي', 'أرقام الإيواء السياحي الرسمية لعام 2024 المرتبطة بالمحافظة أو الوجهة السياحية.', statSection('الإيواء السياحي 2024', '', tourismCards), true);
    const spatial = detailSection('الربط المكاني داخل التطبيق', 'هذه أعداد مشتقة من الطبقات المكانية داخل التطبيق للمقارنة والتحليل.', statSection('طبقات الخريطة الحالية', '', mapCards) + infoList([
      { label: 'سنوات الربط المعتمدة', value: yearsLabel || '—' },
      { label: 'اسم مفتاح الربط', value: key || '—' }
    ]), false, 'tone-green');
    const sources = detailSection('مصادر البيانات', 'المصادر الرسمية المستخدمة في هذه الشاشة.', '<ul class="official-source-list">' + (OFFICIAL_STATS.metadata?.sources || []).map(src => '<li>' + escapeHtml(src.name) + '</li>').join('') + '</ul>', false);

    return '<div class="official-stat-panel">'
      + summary
      + demographics
      + tourism
      + spatial
      + renderMotaPackages()
      + sources
      + '</div>';
  }

  function renderOfficialGovPopup(attributes) {
    const name = attributes.gov_name_ar || 'محافظة';
    return '<div dir="rtl" class="official-popup-root">'
      + '<div class="official-popup-header"><div><h2>' + escapeHtml(name) + '</h2><div class="official-popup-subtitle">لوحة معلومات مرتبطة مكانياً</div></div><span>محافظة</span></div>'
      + renderOfficialGovStats(attributes)
      + '</div>';
  }

  const govPopupTemplate = {
    title: '{gov_name_ar}',
    content: function(event) {
      const attrs = event?.graphic?.attributes || {};
      return renderOfficialGovPopup(attrs);
    }
  };

  const majorPlacePopupTemplate = {
    title: '{place_name_ar}',
    content: [{
      type: 'fields',
      fieldInfos: [
        { fieldName: 'settlement_label', label: 'النوع' },
        { fieldName: 'fclass', label: 'التصنيف' },
        { fieldName: 'population', label: 'السكان', format: { digitSeparator: true, places: 0 } },
        { fieldName: 'osm_id', label: 'المعرّف' }
      ]
    }]
  };

  const detailPlacePopupTemplate = majorPlacePopupTemplate;


  function getGeoJsonPoint(feature) {
    const coords = feature?.geometry?.coordinates;
    if (!Array.isArray(coords)) return null;
    if (feature.geometry.type === 'Point' && Number.isFinite(Number(coords[0])) && Number.isFinite(Number(coords[1]))) {
      return [Number(coords[0]), Number(coords[1])];
    }
    return null;
  }

  function getArcGeometryVertices(geometry) {
    if (!geometry) return [];
    const vertices = [];
    const add = (x, y) => {
      const lon = Number(x);
      const lat = Number(y);
      if (Number.isFinite(lon) && Number.isFinite(lat) && Math.abs(lon) <= 180 && Math.abs(lat) <= 90) vertices.push([lon, lat]);
    };
    if (geometry.type === 'point') {
      add(geometry.longitude ?? geometry.x, geometry.latitude ?? geometry.y);
      return vertices;
    }
    const json = typeof geometry.toJSON === 'function' ? geometry.toJSON() : geometry;
    (json.paths || []).forEach(path => (path || []).forEach(c => add(c[0], c[1])));
    (json.rings || []).forEach(ring => (ring || []).forEach(c => add(c[0], c[1])));
    if (!vertices.length && json.x !== undefined && json.y !== undefined) add(json.x, json.y);
    return vertices;
  }

  function getArcGeometryCenter(geometry) {
    const verts = getArcGeometryVertices(geometry);
    if (!verts.length) return null;
    const sum = verts.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
    return [sum[0] / verts.length, sum[1] / verts.length];
  }

  function haversineKm(a, b) {
    if (!a || !b) return Infinity;
    const toRad = d => Number(d) * Math.PI / 180;
    const R = 6371.0088;
    const dLat = toRad(b[1] - a[1]);
    const dLon = toRad(b[0] - a[0]);
    const lat1 = toRad(a[1]);
    const lat2 = toRad(b[1]);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  }

  function minDistanceToGeometryKm(point, geometry) {
    const verts = getArcGeometryVertices(geometry);
    if (!verts.length) return Infinity;
    let min = Infinity;
    for (const v of verts) min = Math.min(min, haversineKm(point, v));
    return min;
  }

  function getNamedPointFeatures(kind) {
    const src = kind === 'hotels' ? (window.HOTELS_DATA?.features || []) : (window.RESTAURANTS_DATA?.features || []);
    return src.map(f => {
      const p = f.properties || {};
      const point = getGeoJsonPoint(f);
      const name = kind === 'hotels'
        ? (p.hotel_name_ar || p.hotel_name_en || p.hotel_name || '')
        : (p.restaurant_name_ar || p.restaurant_name_en || p.name || '');
      return point && name ? { point, name, properties: p } : null;
    }).filter(Boolean);
  }

  function nearbyToPoint(center, kind, radiusKm) {
    if (!center) return [];
    return getNamedPointFeatures(kind)
      .map(item => ({ ...item, distanceKm: haversineKm(center, item.point) }))
      .filter(item => item.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  function aiLayerLabel(layerKey) {
    const labels = {
      hotels: 'الفنادق ومنشآت الإيواء',
      restaurants: 'المطاعم وخدمات الطعام',
      arch: 'المواقع الأثرية',
      masar: 'مسارات درب الأردن',
      gov: 'المحافظات',
      liwa: 'الألوية',
      'place-major': 'المدن والبلدات الرئيسية',
      'place-detail': 'المدن والبلدات التفصيلية',
      'fiber-edu': 'مديريات التربية',
      'fiber-gov_agency': 'الجهات الحكومية',
      'fiber-health': 'المؤسسات الصحية',
      'fiber-school': 'المدارس',
      rail: 'السكك الحديدية',
      highway: 'الطرق',
      contour: 'خطوط الكنتور'
    };
    return labels[layerKey] || layerKey || 'طبقة غير محددة';
  }

  function isAiHeavyLayer(layerKey) {
    // هذه الطبقات كبيرة أو خطية؛ تفعيلها على الخريطة آمن، لكن تحويل كل عناصرها إلى Markers قد يعلق المتصفح.
    return layerKey === 'highway' || layerKey === 'contour';
  }

  function isAiResultLayer(layerKey) {
    return ['hotels', 'restaurants', 'arch', 'masar', 'gov', 'liwa', 'place-major', 'place-detail', 'fiber-edu', 'fiber-gov_agency', 'fiber-health', 'fiber-school', 'rail', 'highway', 'contour'].includes(layerKey);
  }

  function uniqueArray(values) {
    return [...new Set((values || []).filter(Boolean))];
  }

  function nearbySearchItems(center, layerKey, radiusKm, limit = 20) {
    if (!center || !layerKey || isAiHeavyLayer(layerKey)) return [];
    const groups = {
      gov: searchIndices.gov || [],
      liwa: searchIndices.liwa || [],
      arch: searchIndices.arch || [],
      masar: searchIndices.masar || [],
      rail: searchIndices.rail || [],
      'place-major': searchIndices.placeMajor || [],
      'place-detail': searchIndices.placeDetail || [],
      'fiber-edu': (searchIndices.fiber || []).filter(x => x.layerKey === 'fiber-edu'),
      'fiber-gov_agency': (searchIndices.fiber || []).filter(x => x.layerKey === 'fiber-gov_agency'),
      'fiber-health': (searchIndices.fiber || []).filter(x => x.layerKey === 'fiber-health'),
      'fiber-school': (searchIndices.fiber || []).filter(x => x.layerKey === 'fiber-school')
    };
    const source = groups[layerKey] || [];
    return source
      .map(item => {
        const point = featureCenterFromSearchItem(item);
        const distanceKm = point ? haversineKm(center, point) : Infinity;
        return { ...item, point, distanceKm, name: item.title, layerKey };
      })
      .filter(item => item.point && item.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);
  }

  function nearbyToGeometry(geometry, kind, radiusKm) {
    if (!geometry) return [];
    return getNamedPointFeatures(kind)
      .map(item => ({ ...item, distanceKm: minDistanceToGeometryKm(item.point, geometry) }))
      .filter(item => item.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }

  function nearestLine(title, items) {
    const first = items && items[0];
    if (!first) return { label: title, value: '—' };
    return { label: title, value: `${first.name} (${first.distanceKm.toFixed(1)} كم)` };
  }

  function renderTourismOfficialPackagesCompact(siteMode = 'site') {
    const pkgs = OFFICIAL_STATS.motaOfficialPackages || {};
    const wanted = [];
    Object.keys(pkgs).sort().reverse().forEach(year => {
      (pkgs[year] || []).forEach(name => {
        const text = String(name || '');
        if (siteMode === 'site' && /زوار المواقع|المواقع الأثرية|تصنيف الزوار/.test(text)) wanted.push(`${year} - ${text}`);
        if (siteMode === 'trail' && /زوار المواقع|مؤسسات الإيواء|المنشآت السياحية|العاملون/.test(text)) wanted.push(`${year} - ${text}`);
      });
    });
    const list = wanted.slice(0, 8).map(x => '<li>' + escapeHtml(x) + '</li>').join('');
    return detailSection(
      siteMode === 'site' ? 'بيانات وزارة السياحة المرتبطة بالموقع' : 'بيانات رسمية داعمة للمسار',
      siteMode === 'site'
        ? 'تظهر هنا حزمة الملفات الرسمية التي يمكن ربطها باسم الموقع السياحي/الأثري. الأرقام التفصيلية تظهر بعد تحويل ملف الزوار إلى JSON.'
        : 'لا يوجد جدول رسمي مباشر لمراحل درب الأردن داخل التطبيق، لذلك يتم الربط تحليلياً مع الإيواء والخدمات وزوار المواقع القريبة.',
      '<ul class="official-source-list">' + list + '</ul>',
      false,
      'tone-warm'
    );
  }

  function renderArchOfficialPopup(attributes, geometry) {
    const name = attributes.site_name_ar || attributes.site_name_en || 'موقع أثري';
    const center = getArcGeometryCenter(geometry);
    const hotels5 = nearbyToPoint(center, 'hotels', 5);
    const restaurants2 = nearbyToPoint(center, 'restaurants', 2);
    const summaryCards = [
      statCard('فنادق ضمن 5 كم', hotels5.length, 'من طبقة الفنادق داخل التطبيق', 'موقع'),
      statCard('مطاعم ضمن 2 كم', restaurants2.length, 'من طبقة المطاعم داخل التطبيق', 'موقع'),
      statCard('عدد الأنشطة', attributes.activity_count, 'من بيانات الموقع الحالية', 'نشاط'),
      statCard('الرقم المرجعي', attributes.point_no, 'داخل طبقة المواقع الأثرية', '')
    ];
    const basic = infoList([
      { label: 'المحافظة', value: attributes.governorate || '—' },
      { label: 'الوصف', value: attributes.description_ar || '—' },
      nearestLine('أقرب فندق', hotels5),
      nearestLine('أقرب مطعم', restaurants2)
    ]);
    return '<div dir="rtl" class="official-popup-root tourism-feature-popup">'
      + '<div class="official-popup-header"><div><h2>' + escapeHtml(name) + '</h2><div class="official-popup-subtitle">مؤشرات موقع أثري مرتبطة مكانياً</div></div><span>موقع أثري</span></div>'
      + '<div class="official-stat-panel">'
      + statSection('ملخص الموقع والخدمات القريبة', 'الأرقام أدناه محسوبة مكانياً من طبقات الفنادق والمطاعم الحالية.', summaryCards)
      + detailSection('بيانات الموقع', 'معلومات الموقع الأساسية وأقرب خدمات سياحية.', basic, true)
      + renderTourismOfficialPackagesCompact('site')
      + '</div></div>';
  }

  function renderMasarOfficialPopup(attributes, geometry) {
    const title = attributes.masar_title || 'مسار درب الأردن';
    const hotels5 = nearbyToGeometry(geometry, 'hotels', 5);
    const restaurants2 = nearbyToGeometry(geometry, 'restaurants', 2);
    const summaryCards = [
      statCard('فنادق ضمن 5 كم من المسار', hotels5.length, 'محسوبة من طبقة الفنادق', 'موقع'),
      statCard('مطاعم ضمن 2 كم من المسار', restaurants2.length, 'محسوبة من طبقة المطاعم', 'موقع'),
      statCard('رقم المرحلة', attributes.stage, 'من بيانات المسار', ''),
      statCard('المسافة', attributes.distance_km, 'طول المرحلة', 'كم')
    ];
    const basic = infoList([
      { label: 'الاسم العربي', value: attributes.masar_title || '—' },
      { label: 'الاسم الإنجليزي', value: attributes.masar_title_en || '—' },
      nearestLine('أقرب فندق للمسار', hotels5),
      nearestLine('أقرب مطعم للمسار', restaurants2)
    ]);
    return '<div dir="rtl" class="official-popup-root tourism-feature-popup">'
      + '<div class="official-popup-header"><div><h2>' + escapeHtml(title) + '</h2><div class="official-popup-subtitle">مؤشرات المسار والخدمات القريبة</div></div><span>درب الأردن</span></div>'
      + '<div class="official-stat-panel">'
      + statSection('ملخص جاهزية المسار', 'هذه مؤشرات مكانية تساعد في تقييم الخدمات حول المرحلة المختارة.', summaryCards)
      + detailSection('بيانات المسار', 'بيانات المرحلة وأقرب خدمات سياحية.', basic, true, 'tone-green')
      + renderTourismOfficialPackagesCompact('trail')
      + '</div></div>';
  }


  function getGeometryBrief(geometry) {
    if (!geometry) return { type: 'none' };
    const center = getArcGeometryCenter(geometry);
    return {
      type: geometry.type || 'unknown',
      center: center ? { longitude: Number(center[0].toFixed(6)), latitude: Number(center[1].toFixed(6)) } : null
    };
  }

  function getSelectedTitle(layerKey, attrs) {
    if (!attrs) return 'لا يوجد عنصر محدد';
    if (layerKey === 'gov') return attrs.gov_name_ar || attrs.NAME || 'محافظة';
    if (layerKey === 'arch') return attrs.site_name_ar || attrs.site_name_en || 'موقع أثري';
    if (layerKey === 'masar') return attrs.masar_title || 'مسار درب الأردن';
    if (layerKey === 'hotels') return attrs.hotel_name_ar || attrs.hotel_name_en || 'فندق';
    if (layerKey === 'restaurants') return attrs.restaurant_name_ar || attrs.restaurant_name_en || 'مطعم';
    if (layerKey === 'liwa') return attrs.liwa_name_ar || attrs.name_ar || 'لواء';
    if (layerKey && layerKey.startsWith('place')) return attrs.place_name_ar || attrs.name_ar || 'مدينة/بلدة';
    return attrs.name_ar || attrs.name || attrs.title || 'عنصر من الخريطة';
  }

  function getOfficialGovContext(attrs) {
    const govName = attrs?.gov_name_ar || attrs?.NIC_NAME_E || attrs?.gov_name_en || '';
    const key = normalizeOfficialGovKey(govName);
    const gov = OFFICIAL_STATS.governorates?.[key] || null;
    const acc = OFFICIAL_STATS.tourismAccommodation2024?.[key] || null;
    return {
      key,
      name_ar: gov?.name_ar || govName,
      population2025: gov?.population2025 || null,
      unemployment2024: gov?.unemployment2024 ?? null,
      tourismAccommodation2024: acc || null,
      mapCounts: {
        hotels: countCurrentLayerByGov(govName, 'hotels'),
        restaurants: countCurrentLayerByGov(govName, 'restaurants')
      }
    };
  }

  function buildSelectedAiContext() {
    const graphic = state.selectedGraphic;
    const layerKey = state.selectedLayerKey || 'none';
    const attrs = graphic?.attributes || {};
    const geometry = graphic?.geometry || null;
    const title = getSelectedTitle(layerKey, attrs);
    const base = {
      selected: !!graphic,
      layerKey,
      title,
      geometry: getGeometryBrief(geometry),
      visibleLayerCounts: {
        governorates: govData.features?.length || 0,
        liwas: liwaData.features?.length || 0,
        hotels: window.HOTELS_DATA?.features?.length || 0,
        restaurants: window.RESTAURANTS_DATA?.features?.length || 0,
        trails: masarData.features?.length || 0,
        archaeologicalSites: archSitesData.features?.length || 0
      },
      officialStatsAvailable: OFFICIAL_STATS?.metadata?.years || []
    };

    if (!graphic) return base;

    if (layerKey === 'gov') {
      base.officialGovernorateStats = getOfficialGovContext(attrs);
    } else if (layerKey === 'arch') {
      const center = getArcGeometryCenter(geometry);
      const hotels5 = nearbyToPoint(center, 'hotels', 5);
      const restaurants2 = nearbyToPoint(center, 'restaurants', 2);
      base.archaeologicalSite = {
        governorate: attrs.governorate || '',
        description: attrs.description_ar || '',
        hotelsWithin5Km: hotels5.length,
        restaurantsWithin2Km: restaurants2.length,
        nearestHotel: hotels5[0] ? { name: hotels5[0].name, distanceKm: Number(hotels5[0].distanceKm.toFixed(2)) } : null,
        nearestRestaurant: restaurants2[0] ? { name: restaurants2[0].name, distanceKm: Number(restaurants2[0].distanceKm.toFixed(2)) } : null,
        motaVisitorFilesAvailable: true
      };
    } else if (layerKey === 'masar') {
      const hotels5 = nearbyToGeometry(geometry, 'hotels', 5);
      const restaurants2 = nearbyToGeometry(geometry, 'restaurants', 2);
      base.trail = {
        stage: attrs.stage || '',
        distanceKm: attrs.distance_km || '',
        hotelsWithin5Km: hotels5.length,
        restaurantsWithin2Km: restaurants2.length,
        nearestHotel: hotels5[0] ? { name: hotels5[0].name, distanceKm: Number(hotels5[0].distanceKm.toFixed(2)) } : null,
        nearestRestaurant: restaurants2[0] ? { name: restaurants2[0].name, distanceKm: Number(restaurants2[0].distanceKm.toFixed(2)) } : null
      };
    } else if (layerKey === 'hotels') {
      base.hotel = {
        name_ar: attrs.hotel_name_ar || '',
        name_en: attrs.hotel_name_en || '',
        type: attrs.facility_type_ar || 'فندق / منشأة إيواء',
        phone: attrs.phone || '',
        website: attrs.website || ''
      };
    } else if (layerKey === 'restaurants') {
      base.restaurant = {
        name_ar: attrs.restaurant_name_ar || '',
        name_en: attrs.restaurant_name_en || '',
        type: attrs.facility_type_ar || 'مطعم / خدمة طعام',
        cuisine: attrs.cuisine_ar || '',
        area: attrs.area_ar || ''
      };
    } else {
      base.attributes = Object.fromEntries(Object.entries(attrs).slice(0, 20));
    }
    return base;
  }

  function updateAiContextSummary() {
    if (!els.aiContextSummary) return;
    const ctx = buildSelectedAiContext();
    state.lastAiContext = ctx;
    if (!ctx.selected) {
      els.aiContextSummary.innerHTML = '<strong>السياق الحالي:</strong> لا يوجد عنصر محدد. اختر محافظة أو موقعاً أو مساراً للحصول على تحليل أدق.';
      return;
    }
    let details = '';
    if (ctx.officialGovernorateStats) {
      const g = ctx.officialGovernorateStats;
      details = `السكان 2025: ${fmt(g.population2025?.total)}، البطالة 2024: ${fmt(g.unemployment2024)}%، فنادق على الخريطة: ${fmt(g.mapCounts.hotels)}، مطاعم: ${fmt(g.mapCounts.restaurants)}`;
    } else if (ctx.archaeologicalSite) {
      details = `فنادق ضمن 5 كم: ${ctx.archaeologicalSite.hotelsWithin5Km}، مطاعم ضمن 2 كم: ${ctx.archaeologicalSite.restaurantsWithin2Km}`;
    } else if (ctx.trail) {
      details = `فنادق ضمن 5 كم: ${ctx.trail.hotelsWithin5Km}، مطاعم ضمن 2 كم: ${ctx.trail.restaurantsWithin2Km}`;
    }
    els.aiContextSummary.innerHTML = '<strong>السياق الحالي:</strong> ' + escapeHtml(ctx.title) + ' <span>(' + escapeHtml(ctx.layerKey) + ')</span>' + (details ? '<br><small>' + escapeHtml(details) + '</small>' : '');
  }

  function setAiMode(mode) {
    state.aiMode = mode || 'investment';
    els.aiModeButtons?.forEach(btn => btn.classList.toggle('active', btn.dataset.aiMode === state.aiMode));
    const prompts = {
      investment: 'حلل أفضل فرصة استثمارية سياحية للموقع المحدد، مع نوع الاستثمار وتصنيفه وموقعه ومبرر وجوده والمخاطر والمتطلبات.',
      infrastructure: 'حلل البنية التحتية والخدمات القريبة للموقع المحدد، واذكر نقاط القوة والفجوات والتوصيات.',
      events: 'اقترح فعالية سياحية مناسبة للموقع المحدد، مع النوع والتفاصيل والموقع والمبرر والمتطلبات والمخاطر.',
      routes: 'اقترح مساراً سياحياً أو حسّن المسار المحدد، مع نقاط التوقف والخدمات الناقصة وفرص الاستثمار.',
      map: 'أجب عن سؤال حول الخريطة والطبقات والبيانات المتاحة في التطبيق.'
    };
    if (els.aiQuestionInput && !els.aiQuestionInput.value.trim()) els.aiQuestionInput.value = prompts[state.aiMode] || prompts.investment;
  }

  function setActiveViewPadding(leftPx = 0) {
    try {
      const pad = { top: 0, right: 0, bottom: 0, left: Math.max(0, Math.round(leftPx || 0)) };
      if (view) view.padding = pad;
      if (typeof mapView !== 'undefined' && mapView) mapView.padding = pad;
      if (typeof sceneView !== 'undefined' && sceneView) sceneView.padding = pad;
    } catch (e) {
      console.warn('تعذر ضبط إزاحة الخريطة للمساعد:', e);
    }
  }

  function applyAiPanelMapPadding() {
    const panel = els.aiAssistantPanel;
    const hidden = !panel || panel.classList.contains('hidden');
    if (hidden) {
      setActiveViewPadding(0);
      return;
    }
    const minimized = panel.classList.contains('minimized');
    const width = minimized ? 88 : Math.min(520, Math.max(360, panel.getBoundingClientRect?.().width || 470));
    setActiveViewPadding(width + 24);
    try { view?.resize?.(); } catch (e) {}
  }

  function openAiPanel() {
    els.aiAssistantPanel?.classList.remove('hidden');
    els.aiAssistantPanel?.classList.remove('minimized');
    els.aiAssistantPanel?.setAttribute('aria-hidden', 'false');
    state.aiPanelMinimized = false;
    updateAiContextSummary();
    applyAiPanelMapPadding();
    setTimeout(() => els.aiQuestionInput?.focus(), 50);
  }

  function closeAiPanel() {
    els.aiAssistantPanel?.classList.add('hidden');
    els.aiAssistantPanel?.classList.remove('minimized');
    els.aiAssistantPanel?.setAttribute('aria-hidden', 'true');
    state.aiPanelMinimized = false;
    applyAiPanelMapPadding();
  }

  function toggleAiPanelMinimized(forceValue = null) {
    const panel = els.aiAssistantPanel;
    if (!panel) return;
    panel.classList.remove('hidden');
    const next = forceValue == null ? !panel.classList.contains('minimized') : !!forceValue;
    panel.classList.toggle('minimized', next);
    panel.setAttribute('aria-hidden', 'false');
    state.aiPanelMinimized = next;
    if (els.aiAssistantMinimize) {
      els.aiAssistantMinimize.title = next ? 'تكبير المساعد' : 'تصغير المساعد';
      els.aiAssistantMinimize.setAttribute('aria-label', next ? 'تكبير المساعد' : 'تصغير المساعد');
    }
    applyAiPanelMapPadding();
  }


  function clearAiMapResults() {
    ensureAiResultsLayerVisible();
    try {
      if (state.aiResultsLayer?.graphics) {
        state.aiResultsLayer.removeAll();
      }
    } catch (e) {
      console.warn('تعذر مسح طبقة نتائج المساعد:', e);
    }

    if (view?.graphics && Array.isArray(state.aiMapGraphics)) {
      state.aiMapGraphics.forEach(g => {
        try { view.graphics.remove(g); } catch (e) {}
      });
    }
    state.aiMapGraphics = [];
    state.aiResultItems = [];
  }

  function addAiGraphic(graphic) {
    if (!graphic) return null;
    ensureAiResultsLayerVisible();
    try {
      if (state.aiResultsLayer) {
        state.aiResultsLayer.add(graphic);
      } else if (view?.graphics) {
        view.graphics.add(graphic);
        state.aiMapGraphics.push(graphic);
      } else {
        return null;
      }
      return graphic;
    } catch (e) {
      console.warn('تعذر إضافة نتيجة المساعد على الخريطة:', e);
      return null;
    }
  }

  function getGeoJsonCenter(feature) {
    const coords = collectGeoJsonCoordinates(feature?.geometry, []);
    if (!coords.length) return null;
    const sum = coords.reduce((acc, p) => [acc[0] + Number(p[0]), acc[1] + Number(p[1])], [0, 0]);
    return [sum[0] / coords.length, sum[1] / coords.length];
  }

  function pointGeometryFromLonLat(point) {
    if (!point || !Number.isFinite(Number(point[0])) || !Number.isFinite(Number(point[1]))) return null;
    return { type: 'point', longitude: Number(point[0]), latitude: Number(point[1]), spatialReference: { wkid: 4326 } };
  }

  function makeCirclePolygon(center, radiusKm, segments = 96) {
    if (!center) return null;
    const lon = Number(center[0]);
    const lat = Number(center[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
    const latRad = lat * Math.PI / 180;
    const dLat = radiusKm / 110.574;
    const dLon = radiusKm / (111.320 * Math.max(0.2, Math.cos(latRad)));
    const ring = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      ring.push([lon + Math.cos(a) * dLon, lat + Math.sin(a) * dLat]);
    }
    return { type: 'polygon', rings: [ring], spatialReference: { wkid: 4326 } };
  }

  function addAiBuffer(center, radiusKm, label = '') {
    const polygon = makeCirclePolygon(center, radiusKm);
    if (!polygon) return null;
    return addAiGraphic(new Graphic({
      geometry: polygon,
      attributes: { label, radiusKm },
      symbol: {
        type: 'simple-fill',
        color: [14, 165, 233, 0.08],
        outline: { color: [14, 165, 233, 0.85], width: 2, style: 'dash' }
      }
    }));
  }

  function addAiPointMarker(center, title, kind = 'suggestion', options = {}) {
    const geometry = pointGeometryFromLonLat(center);
    if (!geometry) return null;
    const color = kind === 'investment' ? [124, 58, 237, 0.96] : kind === 'event' ? [234, 88, 12, 0.96] : kind === 'result' ? [14, 165, 233, 0.95] : [22, 163, 74, 0.96];
    const popupContent = options.popupContent || '<div class="ai-popup-card"><strong>نتيجة من المساعد الذكي.</strong><br>اضغط على لوحة المساعد لمشاهدة تفاصيل التحليل.</div>';
    const graphic = addAiGraphic(new Graphic({
      geometry,
      attributes: { title, kind, ...(options.attributes || {}) },
      symbol: {
        type: 'simple-marker',
        style: kind === 'result' ? 'circle' : 'diamond',
        size: kind === 'result' ? 11 : 18,
        color,
        outline: { color: [255, 255, 255, 1], width: 2.5 }
      },
      popupTemplate: {
        title: title || 'نتيجة المساعد',
        content: popupContent
      }
    }));

    if (graphic && options.label) {
      addAiTextLabel(center, options.label, kind);
    }
    return graphic;
  }

  function addAiTextLabel(center, text, kind = 'suggestion') {
    const geometry = pointGeometryFromLonLat(center);
    if (!geometry || !text) return null;
    const color = kind === 'investment' ? [76, 29, 149, 1] : kind === 'event' ? [154, 52, 18, 1] : [3, 105, 161, 1];
    return addAiGraphic(new Graphic({
      geometry,
      attributes: { title: text, kind: 'ai-label' },
      symbol: {
        type: 'text',
        text,
        color,
        haloColor: [255, 255, 255, 0.95],
        haloSize: 1.8,
        yoffset: 22,
        font: { family: 'Tajawal', size: 10, weight: 'bold' }
      }
    }));
  }

  function aiPopupTable(rows) {
    const cleanRows = (rows || []).filter(row => row && row[1] != null && String(row[1]).trim() !== '');
    return '<div class="ai-popup-card">'
      + '<table class="ai-popup-table">'
      + cleanRows.map(row => '<tr><th>' + escapeHtml(row[0]) + '</th><td>' + escapeHtml(String(row[1])) + '</td></tr>').join('')
      + '</table>'
      + '<div class="ai-popup-note">نتيجة تحليل أولية من البيانات المتاحة على الخريطة، وتحتاج تحققاً ميدانياً وتنظيمياً قبل الاعتماد.</div>'
      + '</div>';
  }

  function addAiRouteLine(points, title = 'مسار مقترح') {
    const clean = (points || [])
      .filter(p => p && Number.isFinite(Number(p[0])) && Number.isFinite(Number(p[1])))
      .map(p => [Number(p[0]), Number(p[1])]);
    if (clean.length < 2) return null;
    return addAiGraphic(new Graphic({
      geometry: {
        type: 'polyline',
        paths: [clean],
        spatialReference: { wkid: 4326 }
      },
      attributes: { title, kind: 'route' },
      symbol: {
        type: 'simple-line',
        color: [14, 165, 233, 0.95],
        width: 4,
        style: 'solid'
      },
      popupTemplate: {
        title,
        content: 'خط إرشادي أولي من المساعد الذكي، ويحتاج مراجعة ميدانية قبل اعتماده كمسار رسمي.'
      }
    }));
  }

  function pointFromBearingDistance(center, distanceKm, bearingDeg) {
    if (!center) return null;
    const lon = Number(center[0]);
    const lat = Number(center[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
    const bearing = Number(bearingDeg) * Math.PI / 180;
    const latRad = lat * Math.PI / 180;
    const dLat = (Number(distanceKm) || 0) / 110.574;
    const dLon = (Number(distanceKm) || 0) / (111.320 * Math.max(0.2, Math.cos(latRad)));
    return [lon + Math.sin(bearing) * dLon, lat + Math.cos(bearing) * dLat];
  }

  function nearestDistance(items) {
    if (!Array.isArray(items) || !items.length) return null;
    const d = Number(items[0]?.distanceKm);
    return Number.isFinite(d) ? d : null;
  }

  function scoreAiCandidate(center, candidate, intent, baseCounts) {
    const hotels5 = nearbyToPoint(candidate, 'hotels', 5);
    const restaurants2 = nearbyToPoint(candidate, 'restaurants', 2);
    const hotels2 = nearbyToPoint(candidate, 'hotels', 2);
    const restaurants1 = nearbyToPoint(candidate, 'restaurants', 1);
    const distFromCenter = haversineKm(center, candidate);
    const nearestHotel = nearestDistance(hotels5);
    const nearestRestaurant = nearestDistance(restaurants2);

    let score = 45;
    const baseHotels = baseCounts?.hotels || 0;
    const baseRestaurants = baseCounts?.restaurants || 0;

    if (intent === 'events') {
      score += Math.min(restaurants2.length, 6) * 5;
      score += Math.min(hotels5.length, 5) * 3;
      score += Math.max(0, 8 - distFromCenter) * 1.5;
      if (restaurants2.length === 0) score -= 15;
      if (hotels5.length === 0) score -= 8;
    } else {
      if (baseRestaurants < 2) {
        score += Math.min(hotels5.length, 6) * 5;
        score += Math.max(0, 3 - restaurants1.length) * 6;
        if (nearestRestaurant != null && nearestRestaurant < 0.35) score -= 10;
      } else if (baseHotels < 3) {
        score += Math.min(restaurants2.length, 6) * 5;
        score += Math.max(0, 3 - hotels2.length) * 6;
        if (nearestHotel != null && nearestHotel < 0.45) score -= 10;
      } else {
        score += Math.min(restaurants2.length, 6) * 3;
        score += Math.min(hotels5.length, 6) * 3;
      }
      score += Math.max(0, 6 - distFromCenter) * 2;
    }

    score = Math.max(20, Math.min(95, Math.round(score)));
    return {
      point: candidate,
      score,
      scoreLabel: score >= 80 ? 'مرتفعة' : score >= 60 ? 'متوسطة' : 'منخفضة',
      hotelsWithin5Km: hotels5.length,
      restaurantsWithin2Km: restaurants2.length,
      distanceFromReferenceKm: Number(distFromCenter.toFixed(2)),
      nearestHotelKm: nearestHotel == null ? null : Number(nearestHotel.toFixed(2)),
      nearestRestaurantKm: nearestRestaurant == null ? null : Number(nearestRestaurant.toFixed(2))
    };
  }

  function chooseAiSuggestedPoint(center, intent, analysis) {
    if (!center) return null;
    const baseHotels = nearbyToPoint(center, 'hotels', 5);
    const baseRestaurants = nearbyToPoint(center, 'restaurants', 2);
    const baseCounts = { hotels: baseHotels.length, restaurants: baseRestaurants.length };
    const studyRadius = Math.max(1.2, Math.min(4.5, Number(analysis?.distanceKm || 5) * 0.45));
    const candidateDistances = [studyRadius * 0.45, studyRadius * 0.75, studyRadius];
    const bearings = [0, 45, 90, 135, 180, 225, 270, 315];
    const candidates = [center];
    candidateDistances.forEach(distance => {
      bearings.forEach(bearing => {
        const p = pointFromBearingDistance(center, distance, bearing);
        if (p) candidates.push(p);
      });
    });
    const scored = candidates
      .map(candidate => scoreAiCandidate(center, candidate, intent, baseCounts))
      .sort((a, b) => b.score - a.score || a.distanceFromReferenceKm - b.distanceFromReferenceKm);
    const best = scored[0] || scoreAiCandidate(center, center, intent, baseCounts);
    const gapReason = baseRestaurants.length < 2
      ? 'تم ترجيح نقطة تعالج فجوة الطعام والاستراحة حول الموقع.'
      : baseHotels.length < 3
        ? 'تم ترجيح نقطة تعالج فجوة الإيواء القريب حول الموقع.'
        : 'تم ترجيح نقطة قريبة من الطلب والخدمات القائمة لتقليل كلفة التشغيل.';
    return {
      ...best,
      baseHotelsWithin5Km: baseHotels.length,
      baseRestaurantsWithin2Km: baseRestaurants.length,
      reason: intent === 'events'
        ? 'تم ترجيح نقطة قابلة لخدمة فعالية قصيرة لأنها قريبة نسبياً من خدمات الطعام والإيواء.'
        : gapReason
    };
  }

  function inferAiIntent(question) {
    const q = normalizeSearchText(question);
    if (/استثمار|فرصه|فرصة|مشروع|جدوى|مستثمر|انشاء|إنشاء|اقامه|إقامة/.test(q)) return 'investment';
    if (/بنيه|بنية|خدمات|طرق|طريق|صحي|صحه|صحة|مواقف|جاهزيه|جاهزية|تحليل/.test(q)) return 'infrastructure';
    if (/فعاليه|فعالية|فعاليات|مهرجان|حدث|نشاط|احتفال|سوق/.test(q)) return 'events';
    if (/مسار|مسارات|رحله|رحلة|برنامج|خط سير|route|trail/.test(q)) return 'routes';
    if (/اعرض|اظهر|أظهر|اين|أين|اقرب|أقرب|قريب|قريبه|حول|ضمن|داخل|near/.test(q)) return 'nearby';
    if (/قارن|افضل|أفضل|الانسب|الأنسب|اكثر|أكثر|اقل|أقل|تحتاج/.test(q)) return 'compare';
    return 'map';
  }

  function inferAiTargetLayer(question, intent) {
    const q = normalizeSearchText(question);
    if (/فندق|فنادق|اوتيل|هوتيل|اقامه|إقامة|مبيت/.test(q)) return 'hotels';
    if (/مطعم|مطاعم|مقهى|مقهي|كافيه|طعام|اكل|أكل/.test(q)) return 'restaurants';
    if (/مدرسه|مدرسة|مدارس/.test(q)) return 'fiber-school';
    if (/صحي|صحيه|صحية|مستشفى|مستشفي|مركز صحي|مراكز صحيه|مراكز صحية/.test(q)) return 'fiber-health';
    if (/مديريه تربيه|مديرية تربية|تربيه|تربية/.test(q)) return 'fiber-edu';
    if (/حكوميه|حكومية|جهات حكوميه|جهات حكومية|مؤسسه حكوميه|مؤسسة حكومية/.test(q)) return 'fiber-gov_agency';
    if (/طريق|طرق|شارع|شوارع|highway|road/.test(q)) return 'highway';
    if (/سكة|سكك|قطار|rail/.test(q)) return 'rail';
    if (/كنتور|تضاريس|ارتفاع|منسوب|contour/.test(q)) return 'contour';
    if (/مسار|مسارات|درب|trail|route/.test(q)) return 'masar';
    if (/اثري|أثري|اثار|آثار|موقع سياحي|مواقع سياحيه|مواقع سياحية/.test(q)) return 'arch';
    if (/لواء|الويه|ألوية|الوية/.test(q)) return 'liwa';
    if (/محافظه|محافظة|محافظات/.test(q)) return 'gov';
    if (/مدن|مدينة|مدينه|بلدات|بلدة|بلده|قرية|قريه/.test(q)) return 'place-major';
    if (intent === 'investment' || intent === 'events' || intent === 'infrastructure') return null;
    return null;
  }

  function inferAiRequestedResultLayers(question, analysis) {
    const q = normalizeSearchText(question || '');
    const layers = [];
    const add = (...items) => items.forEach(item => { if (item) layers.push(item); });
    const allRequested = /كل الطبقات|كافة الطبقات|جميع الطبقات|باقي الطبقات|كل الخدمات|جميع الخدمات/.test(q);

    if (/فندق|فنادق|اوتيل|هوتيل|اقامه|إقامة|مبيت/.test(q)) add('hotels');
    if (/مطعم|مطاعم|مقهى|مقهي|كافيه|طعام|اكل|أكل/.test(q)) add('restaurants');
    if (/مدرسه|مدرسة|مدارس/.test(q)) add('fiber-school');
    if (/صحي|صحيه|صحية|مستشفى|مستشفي|مركز صحي|مراكز صحيه|مراكز صحية/.test(q)) add('fiber-health');
    if (/مديريه تربيه|مديرية تربية|تربيه|تربية/.test(q)) add('fiber-edu');
    if (/حكوميه|حكومية|جهات حكوميه|جهات حكومية|مؤسسه حكوميه|مؤسسة حكومية/.test(q)) add('fiber-gov_agency');
    if (/مؤسسات|مواقع مؤسسيه|مواقع مؤسسية/.test(q)) add('fiber-gov_agency', 'fiber-health', 'fiber-school', 'fiber-edu');
    if (/طريق|طرق|شارع|شوارع|highway|road/.test(q)) add('highway');
    if (/سكة|سكك|قطار|rail/.test(q)) add('rail');
    if (/كنتور|تضاريس|ارتفاع|منسوب|contour/.test(q)) add('contour');
    if (/مسار|مسارات|درب|trail|route/.test(q)) add('masar');
    if (/اثري|أثري|اثار|آثار|موقع سياحي|مواقع سياحيه|مواقع سياحية/.test(q)) add('arch');
    if (/مدن|مدينة|مدينه|بلدات|بلدة|بلده|قرية|قريه/.test(q)) add('place-major', 'place-detail');
    if (/محافظه|محافظة|محافظات/.test(q)) add('gov');
    if (/لواء|الويه|ألوية|الوية/.test(q)) add('liwa');

    if (allRequested) {
      add('hotels', 'restaurants', 'arch', 'place-major', 'place-detail', 'fiber-health', 'fiber-school', 'fiber-gov_agency', 'fiber-edu', 'masar', 'rail', 'highway');
    }

    if (!layers.length && analysis?.targetLayer && isAiResultLayer(analysis.targetLayer)) add(analysis.targetLayer);

    if (!layers.length && analysis?.intent === 'infrastructure') {
      add('hotels', 'restaurants', 'fiber-health', 'fiber-school', 'fiber-gov_agency', 'fiber-edu', 'highway');
    }

    if (!layers.length && (analysis?.intent === 'investment' || analysis?.intent === 'events' || analysis?.intent === 'routes')) {
      add('hotels', 'restaurants', 'arch', 'masar');
    }

    return uniqueArray(layers).filter(isAiResultLayer);
  }

  function inferAiDistanceKm(question, targetLayer, intent) {
    const q = normalizeSearchText(question);
    const match = q.match(/(\d+(?:\.\d+)?)\s*(كم|كيلو|كيلومتر|km)/);
    if (match) return Math.max(0.5, Math.min(50, Number(match[1])));
    if (targetLayer === 'restaurants') return 2;
    if (targetLayer === 'hotels') return 5;
    if (intent === 'events') return 3;
    if (intent === 'infrastructure' || intent === 'investment') return 5;
    return 5;
  }

  function allSearchItemsForAi(analysis) {
    // لا نستخدم كامل فهرس البحث هنا، لأن فهرس الطرق/الكنتور/الألياف كبير جداً
    // وقد يعلّق المتصفح عند تحليل سؤال حر. نستخدم فقط طبقات تصلح كمرجع مكاني واضح.
    const q = normalizeSearchText(analysis?.question || '');
    const referenceLayers = new Set(['gov', 'liwa', 'arch', 'place-major', 'place-detail', 'masar']);
    const exactReferenceLayers = new Set(['hotels', 'restaurants', 'fiber-edu', 'fiber-gov_agency', 'fiber-health', 'fiber-school', 'rail']);
    return (state.searchIndex || []).filter((item) => {
      if (!item?.feature?.geometry) return false;
      if (referenceLayers.has(item.layerKey)) return true;
      // الفنادق والمطاعم والمؤسسات يمكن أن تكون مرجعاً فقط إذا ذُكر اسمها الكامل تقريباً، وليس لأنها طبقة مطلوبة للعرض.
      if (exactReferenceLayers.has(item.layerKey)) {
        const title = item.titleSearchText || normalizeSearchText(item.title || '');
        return title.length >= 5 && q.includes(title);
      }
      return false;
    });
  }

  function aiStripGenericPlaceWords(text) {
    const generic = new Set(['موقع','الموقع','اثري','اثريه','الاثري','الاثريه','سياحي','سياحيه','مدينه','محافظه','لواء','منطقه','المنطقه','مسار','مرحله','درب','الاردن'].map(normalizeSearchText));
    return normalizeSearchText(text)
      .split(' ')
      .filter(w => w && !generic.has(w))
      .join(' ')
      .trim();
  }

  function aiReferenceStopWords() {
    return new Set([
      'في','من','الى','الي','على','علي','عن','حول','قرب','قريب','قريبه','ضمن','داخل','خلال','مع','و','او','ثم','هذا','هذه','ذلك','تلك','الموقع','المحدد','المختار','الحالي','هنا',
      'اقترح','اعرض','اظهر','حلل','اريد','اعطني','اين','ما','ماهي','ماهو','هل','افضل','انسب','اكثر','اقل','فرصه','فرصة','استثمار','استثماري','سياحي','سياحيه','مشروع','جدوى','مستثمر','انشاء','اقامه','إقامة',
      'بنيه','بنية','تحتيه','تحتية','خدمات','خدمه','خدمة','طرق','طريق','مواقف','جاهزيه','جاهزية','فعاليه','فعالية','فعاليات','مهرجان','حدث','نشاط','مسار','مسارات','رحله','رحلة','برنامج','خط','سير',
      'مطعم','مطاعم','مقهى','مقهي','كافيه','طعام','اكل','فندق','فنادق','اوتيل','هوتيل','مبيت','كم','كيلو','كيلومتر','km','الطبقات','الخريطه','خريطة','نتائج','اظهار'
    ].map(normalizeSearchText));
  }

  function aiReferenceTokens(text) {
    const stop = aiReferenceStopWords();
    return normalizeSearchText(text)
      .split(' ')
      .map(w => w.trim())
      .filter(w => w.length >= 3 && !stop.has(w) && !/^\d+$/.test(w));
  }

  function aiQuestionHasAny(q, words) {
    return words.some(w => q.includes(normalizeSearchText(w)));
  }

  function aiReferenceLayerBoost(item, q, analysis, titleExact) {
    const layerKey = item?.layerKey || '';
    let boost = 0;
    const asksGov = aiQuestionHasAny(q, ['محافظة', 'محافظه', 'محافظات']);
    const asksArch = aiQuestionHasAny(q, ['أثري', 'اثري', 'آثار', 'اثار', 'موقع سياحي', 'موقع اثري', 'قلعة', 'قلعه', 'كنيسة', 'المغطس', 'نيبو']);
    const asksRoute = aiQuestionHasAny(q, ['مسار', 'مسارات', 'درب', 'مرحلة', 'trail', 'route']);
    const asksHotelTarget = aiQuestionHasAny(q, ['فنادق', 'فندق', 'اوتيل', 'هوتيل', 'إيواء', 'ايواء']);
    const asksRestaurantTarget = aiQuestionHasAny(q, ['مطاعم', 'مطعم', 'مقهى', 'مقهي', 'كافيه', 'طعام']);

    if (asksGov) boost += layerKey === 'gov' ? 260 : -40;
    if (asksArch) boost += layerKey === 'arch' ? 300 : (layerKey === 'gov' ? -80 : 0);
    if (asksRoute) boost += layerKey === 'masar' ? 320 : -60;

    // عندما يكون السؤال عن عرض مطاعم/فنادق في مكان، لا يجوز اختيار مطعم/فندق كمرجع إلا إذا ذُكر اسمه تحديداً.
    if ((asksRestaurantTarget && layerKey === 'restaurants') || (asksHotelTarget && layerKey === 'hotels')) {
      boost += titleExact ? 80 : -260;
    }
    if (analysis?.targetLayer && layerKey === analysis.targetLayer && !titleExact) boost -= 180;

    // تفضيل منطقي عام للمرجع الجغرافي، وليس للنتيجة المطلوب عرضها.
    if (['arch', 'gov', 'masar', 'place-major', 'place-detail'].includes(layerKey)) boost += 80;
    if (layerKey === 'liwa') boost += 35;
    return boost;
  }

  function aiValidReferenceItem(item) {
    if (!item?.feature?.geometry) return false;
    const center = featureCenterFromSearchItem(item);
    return Array.isArray(center) && Number.isFinite(Number(center[0])) && Number.isFinite(Number(center[1]));
  }

  function findAiKnownAliasReference(q, items) {
    const aliases = [
      { patterns: ['جبل القلعه', 'قلعه عمان', 'القلعه عمان'], layer: 'arch', titleIncludes: 'جبل القلعه' },
      { patterns: ['البتراء الصغيره', 'البترا الصغيره', 'سيق البارد'], layer: 'arch', titleIncludes: 'البتراء الصغيره' },
      { patterns: ['البتراء', 'البترا', 'petra'], layer: 'arch', titleIncludes: 'البتراء' },
      { patterns: ['جرش الاثريه', 'اثار جرش', 'جرش'], layer: 'arch', titleIncludes: 'جرش' },
      { patterns: ['قلعه عجلون', 'قلعة عجلون'], layer: 'arch', titleIncludes: 'قلعه عجلون' },
      { patterns: ['ام قيس'], layer: 'arch', titleIncludes: 'ام قيس' },
      { patterns: ['جبل نيبو', 'نيبو'], layer: 'arch', titleIncludes: 'جبل نيبو' },
      { patterns: ['المغطس'], layer: 'arch', titleIncludes: 'المغطس' },
      { patterns: ['قلعه الكرك', 'قلعة الكرك'], layer: 'arch', titleIncludes: 'قلعه الكرك' },
      { patterns: ['وادي رم'], layer: 'arch', titleIncludes: 'وادي رم' },
      { patterns: ['ام الرصاص'], layer: 'arch', titleIncludes: 'ام الرصاص' }
    ];
    for (const alias of aliases) {
      const matched = alias.patterns.some(pattern => q.includes(normalizeSearchText(pattern)));
      if (!matched) continue;
      const wanted = normalizeSearchText(alias.titleIncludes);
      const found = items.find(item => item.layerKey === alias.layer && (item.titleSearchText || normalizeSearchText(item.title || '')).includes(wanted));
      if (found) return found;
    }
    return null;
  }

  function findAiReferenceItem(question, analysis) {
    const q = normalizeSearchText(question);
    const items = allSearchItemsForAi(analysis).filter(aiValidReferenceItem);
    if (!q || !items.length) return null;

    const aliasHit = findAiKnownAliasReference(q, items);
    if (aliasHit) return aliasHit;

    const qTokens = aiReferenceTokens(q);
    const scored = [];

    for (const item of items) {
      const title = normalizeSearchText(item.titleSearchText || item.title || '');
      const coreTitle = aiStripGenericPlaceWords(title);
      const searchText = normalizeSearchText(item.searchText || '');
      if (!title && !coreTitle) continue;

      let score = 0;
      const titleExact = title && q.includes(title) && title.length >= 3;
      const coreExact = coreTitle && coreTitle.length >= 3 && q.includes(coreTitle);

      if (titleExact) score += 1200 + Math.min(260, title.length * 18);
      if (coreExact) score += 850 + Math.min(220, coreTitle.length * 16);

      const titleTokens = aiReferenceTokens(title);
      const coreTokens = aiReferenceTokens(coreTitle);
      let titleHits = 0;
      let searchHits = 0;
      for (const t of qTokens) {
        if (titleTokens.includes(t) || coreTokens.includes(t)) titleHits += 1;
        else if (searchText.includes(t)) searchHits += 1;
      }
      score += titleHits * 160;
      score += searchHits * 18;

      // مطابقة عبارات مكوّنة من كلمتين تقلل اختيار محافظة عندما يكون السؤال عن موقع محدد مثل "قلعة عجلون".
      for (let i = 0; i < titleTokens.length - 1; i += 1) {
        const pair = `${titleTokens[i]} ${titleTokens[i + 1]}`;
        if (pair.length >= 7 && q.includes(pair)) score += 260;
      }

      score += aiReferenceLayerBoost(item, q, analysis, titleExact || coreExact);
      score -= Math.min(60, getSearchLayerPriority(item.layerKey) * 3);

      if (score > 0) scored.push({ item, score, titleExact, coreExact, title, coreTitle });
    }

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const alen = Math.max(a.title.length, a.coreTitle.length);
      const blen = Math.max(b.title.length, b.coreTitle.length);
      if (blen !== alen) return blen - alen;
      return getSearchLayerPriority(a.item.layerKey) - getSearchLayerPriority(b.item.layerKey);
    });

    const best = scored[0];
    // لا ننفذ على الخريطة إذا كان التطابق ضعيفاً؛ هذا يمنع اختيار موقع خاطئ لمجرد وجود كلمة عامة.
    if (!best || best.score < 180) return null;
    return best.item;
  }

  function getSelectedReferenceCenter() {
    return getArcGeometryCenter(state.selectedGraphic?.geometry || null);
  }

  function featureCenterFromSearchItem(item) {
    if (!item?.feature) return null;
    return getGeoJsonPoint(item.feature) || getGeoJsonCenter(item.feature);
  }

  function toNearbyItemFromNamed(item, layerKey) {
    const props = item.properties || {};
    const feature = {
      type: 'Feature',
      properties: { ...props, OBJECTID: props.OBJECTID },
      geometry: { type: 'Point', coordinates: item.point }
    };
    return makeSearchItem(
      feature,
      layerKey,
      item.name,
      layerKey === 'hotels' ? 'فندق / منشأة إيواء' : 'مطعم / خدمة طعام',
      Object.values(props).slice(0, 10)
    );
  }

  function buildFreeQuestionAnalysis(question) {
    const intent = inferAiIntent(question);
    const targetLayer = inferAiTargetLayer(question, intent);
    const distanceKm = inferAiDistanceKm(question, targetLayer, intent);
    const analysis = { intent, targetLayer, distanceKm, question };
    analysis.requestedLayers = inferAiRequestedResultLayers(question, analysis);
    analysis.referenceItem = findAiReferenceItem(question, analysis);
    return analysis;
  }

  function aiQuestionUsesSelectedContext(question) {
    const q = normalizeSearchText(question || '');
    return /المحدد|المختار|الحالي|هذا|هذه|هنا|حول الموقع|للموقع|في الموقع|المكان/.test(q);
  }

  function isUsefulAiSelectedLayer(layerKey) {
    return ['gov', 'arch', 'masar', 'place-major', 'place-detail', 'hotels', 'restaurants'].includes(layerKey || '');
  }

  async function ensureAiReferenceSelected(analysis) {
    if (analysis.referenceItem) {
      if (els.mapSearchInput) els.mapSearchInput.value = analysis.referenceItem.title || '';
      hideSuggestions();
      const center = featureCenterFromSearchItem(analysis.referenceItem);
      return {
        item: analysis.referenceItem,
        center,
        layerKey: analysis.referenceItem.layerKey,
        title: analysis.referenceItem.title,
        source: 'question'
      };
    }
    if (state.selectedGraphic && isUsefulAiSelectedLayer(state.selectedLayerKey) && aiQuestionUsesSelectedContext(analysis?.question)) {
      return { item: null, center: getSelectedReferenceCenter(), layerKey: state.selectedLayerKey, title: getSelectedTitle(state.selectedLayerKey, state.selectedGraphic.attributes || {}), source: 'selected' };
    }
    return { item: null, center: null, layerKey: null, title: '', source: 'missing' };
  }

  function ensureAiResultsLayerVisible() {
    try {
      if (!state.aiResultsLayer) return;
      state.aiResultsLayer.visible = true;
      if (typeof map !== 'undefined' && map?.layers && !map.layers.includes(state.aiResultsLayer)) {
        map.add(state.aiResultsLayer);
      }
    } catch (e) {
      console.warn('تعذر التأكد من ظهور طبقة نتائج المساعد:', e);
    }
  }

  async function goToAiReferenceCenter(center, analysis, ref = null) {
    if (!center || !view?.goTo) return;
    const layerScale = getSearchTargetScale(ref?.layerKey || analysis?.targetLayer || '');
    const scale = layerScale || (analysis?.intent === 'nearby' ? 35000 : 55000);
    const targetPoint = pointGeometryFromLonLat(center);

    state.searchNavigationBusy = true;
    try {
      if (view.when) await view.when();
      // مهم: لا نستخدم center: [lon,lat] هنا لأن ArcGIS قد يفسرها بإحداثيات نظام العرض
      // وليس WGS84، مما يمنع التكبير الصحيح ويجعل النتائج تبدو غير ظاهرة.
      if (targetPoint) {
        await view.goTo({ target: targetPoint, scale }, { duration: 450, easing: 'ease-in-out' });
      } else {
        await view.goTo({ center, scale }, { duration: 450, easing: 'ease-in-out' });
      }
    } catch (e) {
      console.warn('تعذر الانتقال إلى موقع المساعد:', e);
    } finally {
      state.searchNavigationBusy = false;
      updateScaleBadge();
      try { updateScaleDrivenHierarchy(); } catch (e) {}
      setTimeout(() => enforcePanWithinJordanExtent(0), 150);
    }
  }

  function updateAiContextSummaryFromReference(ref) {
    if (!els.aiContextSummary || !ref?.center) return;
    els.aiContextSummary.innerHTML = '<strong>السياق الحالي:</strong> ' + escapeHtml(ref.title || 'موقع من السؤال')
      + ' <span>(' + escapeHtml(ref.layerKey || 'AI') + ')</span>'
      + '<br><small>تم تحديده مباشرة من نص السؤال بدون فتح Popup الطبقة الأصلية، لتجنب تعليق المتصفح.</small>';
  }

  function addAiResultListMarkers(items, layerKey, limit = 20) {
    const layerName = layerKey === 'hotels' ? 'فندق / إيواء' : layerKey === 'restaurants' ? 'مطعم / طعام' : 'نتيجة مكانية';
    (items || []).slice(0, limit).forEach(item => {
      const distance = Number.isFinite(Number(item.distanceKm)) ? Number(item.distanceKm).toFixed(2) + ' كم' : '';
      const popupContent = aiPopupTable([
        ['النتيجة', item.name || 'غير مسمى'],
        ['الطبقة', layerName],
        ['المسافة من الموقع المرجعي', distance],
        ['طريقة الاستخدام', layerKey === 'hotels' ? 'نقطة دعم للإيواء أو نهاية/بداية مسار' : 'نقطة دعم للطعام والاستراحة أو فعالية قصيرة']
      ]);
      addAiPointMarker(item.point, item.name, 'result', { popupContent, label: distance ? distance : '' });
    });
  }

  function addAiGenericResultMarkers(items, layerKey, limit = 12) {
    const layerName = aiLayerLabel(layerKey);
    (items || []).slice(0, limit).forEach(item => {
      const distance = Number.isFinite(Number(item.distanceKm)) ? Number(item.distanceKm).toFixed(2) + ' كم' : '';
      const popupContent = aiPopupTable([
        ['النتيجة', item.name || item.title || 'غير مسمى'],
        ['الطبقة', layerName],
        ['المسافة من الموقع المرجعي', distance],
        ['طريقة الاستخدام', 'نتيجة مكانية داعمة للتحليل، وليست اختياراً نهائياً.']
      ]);
      addAiPointMarker(item.point, item.name || item.title, 'result', { popupContent, label: distance ? distance : '' });
    });
  }

  function collectAiLayerResults(center, layerKey, radiusKm, limit = 20) {
    activateLayerForSearch(layerKey, { deferUpdate: true });
    if (layerKey === 'hotels' || layerKey === 'restaurants') {
      return nearbyToPoint(center, layerKey, radiusKm)
        .slice(0, limit)
        .map(item => ({ ...item, layerKey }));
    }
    return nearbySearchItems(center, layerKey, radiusKm, limit).map(item => ({ ...item, layerKey }));
  }

  function renderAiRequestedLayers(center, requestedLayers, analysis, result, options = {}) {
    const limitPerLayer = options.limitPerLayer || 12;
    const radiusKm = options.radiusKm || analysis?.distanceKm || 5;
    const layerSummaries = [];
    let combined = [];

    uniqueArray(requestedLayers).filter(isAiResultLayer).forEach(layerKey => {
      activateLayerForSearch(layerKey, { deferUpdate: true });
      if (isAiHeavyLayer(layerKey)) {
        layerSummaries.push({ layerKey, label: aiLayerLabel(layerKey), count: null, heavy: true });
        result.actions.push('تم تفعيل طبقة ' + aiLayerLabel(layerKey) + ' فقط دون تحويل عناصرها إلى نقاط حتى لا يعلق المتصفح.');
        return;
      }
      const items = collectAiLayerResults(center, layerKey, radiusKm, limitPerLayer);
      if (layerKey === 'hotels' || layerKey === 'restaurants') addAiResultListMarkers(items, layerKey, limitPerLayer);
      else addAiGenericResultMarkers(items, layerKey, limitPerLayer);
      layerSummaries.push({ layerKey, label: aiLayerLabel(layerKey), count: items.length, heavy: false });
      combined = combined.concat(items);
      result.actions.push('تم عرض ' + items.length + ' نتيجة من طبقة ' + aiLayerLabel(layerKey) + ' ضمن ' + radiusKm + ' كم.');
    });

    try { updateScaleDrivenHierarchy(); } catch (e) {}
    result.layerSummaries = layerSummaries;
    return combined.sort((a, b) => (a.distanceKm || 9999) - (b.distanceKm || 9999));
  }

  function aiReferencePopup(ref, analysis) {
    return aiPopupTable([
      ['الموقع الذي فهمه المساعد', ref?.title || 'غير محدد'],
      ['مصدر الاختيار', ref?.source === 'question' ? 'من نص السؤال' : ref?.source === 'selected' ? 'من العنصر المحدد على الخريطة' : 'غير محدد'],
      ['نوع السؤال', analysis?.intent || 'غير محدد'],
      ['النطاق المستخدم', `${analysis?.distanceKm || 0} كم`]
    ]);
  }

  async function executeAiMapAction(question, analysis) {
    clearAiMapResults();
    const result = { actions: [], nearby: [], suggested: null, reference: null };
    const ref = await ensureAiReferenceSelected(analysis);
    result.reference = ref;

    const center = ref.center;
    const targetLayer = analysis.targetLayer;
    const intent = analysis.intent;
    const requestedLayers = uniqueArray(analysis.requestedLayers || inferAiRequestedResultLayers(question, analysis));

    if (!center) {
      result.actions.push('لم يتم تنفيذ أي رسم لأن المساعد لم يجد موقعاً واضحاً داخل نص السؤال.');
      return result;
    }

    await goToAiReferenceCenter(center, analysis, ref);
    ensureAiResultsLayerVisible();
    updateAiContextSummaryFromReference(ref);

    addAiPointMarker(center, `الموقع المرجعي: ${ref.title || 'غير محدد'}`, 'reference', {
      popupContent: aiReferencePopup(ref, analysis),
      label: ref.title ? `الموقع المرجعي: ${ref.title}` : 'الموقع المرجعي'
    });
    result.actions.push(`تم تحديد الموقع المرجعي من السؤال: ${ref.title || 'غير محدد'}.`);

    const directLayerRequest = targetLayer && isAiResultLayer(targetLayer) && !['investment', 'events', 'routes', 'infrastructure', 'compare'].includes(intent);
    if (intent === 'nearby' || directLayerRequest) {
      addAiBuffer(center, analysis.distanceKm, `نطاق ${analysis.distanceKm} كم`);
      const layersToShow = requestedLayers.length ? requestedLayers : ['restaurants', 'hotels'];
      result.nearby = renderAiRequestedLayers(center, layersToShow, analysis, result, { limitPerLayer: targetLayer ? 30 : 12 });
      result.actions.push(`تم رسم نطاق ${analysis.distanceKm} كم على الخريطة.`);
      if (!result.nearby.length && !(result.layerSummaries || []).some(x => x.heavy)) {
        result.actions.push('لم تظهر نتائج داخل النطاق؛ جرّب زيادة المسافة في السؤال مثل: ضمن 10 كم.');
      }
      return result;
    }

    if (intent === 'infrastructure' || intent === 'compare' || intent === 'map') {
      addAiBuffer(center, analysis.distanceKm, `نطاق تحليل ${analysis.distanceKm} كم`);
      const defaultInfraLayers = ['hotels', 'restaurants', 'fiber-health', 'fiber-school', 'fiber-gov_agency', 'fiber-edu', 'highway'];
      const infraLayers = uniqueArray([...(requestedLayers || []), ...defaultInfraLayers]);
      result.nearby = renderAiRequestedLayers(center, infraLayers, analysis, result, { limitPerLayer: 12 });
      const restaurants = nearbyToPoint(center, 'restaurants', Math.min(analysis.distanceKm, 5));
      const hotels = nearbyToPoint(center, 'hotels', Math.max(analysis.distanceKm, 5));
      result.actions.push(`تم رسم نطاق تحليل ${analysis.distanceKm} كم حول ${ref.title || 'الموقع'}.`);
      result.actions.push('تم عرض طبقات الخدمات والبنية التحتية المطلوبة دون استخدام فهرس الطرق كاملاً كمرجع حتى لا يعلق المتصفح.');
      if (!restaurants.length && !hotels.length && !result.nearby.length) result.actions.push('لا توجد خدمات ظاهرة ضمن النطاق الحالي؛ زِد النطاق أو تحقق من تشغيل الطبقات المطلوبة.');
      return result;
    }

    if ((intent === 'investment' || intent === 'events') && center) {
      addAiBuffer(center, analysis.distanceKm, `نطاق دراسة ${analysis.distanceKm} كم`);
      const title = intent === 'events' ? 'موقع فعالية مقترح' : 'موقع استثمار مقترح';
      const suggestion = chooseAiSuggestedPoint(center, intent, analysis);
      const suggestedPoint = suggestion?.point || center;
      const baseHotels = nearbyToPoint(center, 'hotels', 5);
      const baseRestaurants = nearbyToPoint(center, 'restaurants', 2);
      addAiResultListMarkers(baseRestaurants.slice(0, 8), 'restaurants', 8);
      addAiResultListMarkers(baseHotels.slice(0, 8), 'hotels', 8);
      let recommendationType = intent === 'events' ? 'فعالية ثقافية / سوق منتجات محلية / يوم تراثي' : 'مركز خدمات سياحية صغير';
      let recommendationCategory = intent === 'events' ? 'إدارة فعاليات وتجربة زائر' : 'خدمات سياحية وبنية تحتية خفيفة';
      let gap = 'لا توجد فجوة حادة حسب الطبقات الحالية، لذلك تم ترجيح القرب من الطلب والخدمات.';
      if (baseRestaurants.length < 2) {
        recommendationType = intent === 'events' ? 'فعالية سوق طعام ومنتجات محلية' : 'استراحة سياحية / مقهى تراثي / منتجات محلية';
        recommendationCategory = intent === 'events' ? 'فعالية مجتمعية وتجربة ضيافة' : 'الطعام والضيافة + استثمار مجتمعي';
        gap = 'فجوة الطعام والاستراحة واضحة ضمن 2 كم من الموقع المرجعي.';
      } else if (baseHotels.length < 3) {
        recommendationType = intent === 'events' ? 'فعالية يومية قصيرة بدون مبيت' : 'بيت ضيافة / نزل بيئي صغير / مخيم منظم';
        recommendationCategory = intent === 'events' ? 'فعالية قصيرة منخفضة المخاطر' : 'إيواء سياحي خفيف';
        gap = 'الإيواء القريب محدود ضمن 5 كم، لذلك يجب تجنب مشاريع إقامة كبيرة قبل دراسة الطلب.';
      }
      const popupContent = aiPopupTable([
        ['الموقع المرجعي', ref.title || 'غير محدد'],
        ['نوع المقترح', recommendationType],
        ['التصنيف', recommendationCategory],
        ['درجة الملاءمة', suggestion ? `${suggestion.score}% - ${suggestion.scoreLabel}` : 'غير محسوبة'],
        ['سبب اختيار النقطة', suggestion?.reason || 'قريبة من الموقع المرجعي والخدمات المتاحة'],
        ['الفجوة التي يعالجها المقترح', gap],
        ['فنادق ضمن 5 كم من المرجع', baseHotels.length],
        ['مطاعم ضمن 2 كم من المرجع', baseRestaurants.length],
        ['فنادق ضمن 5 كم من النقطة', suggestion?.hotelsWithin5Km],
        ['مطاعم ضمن 2 كم من النقطة', suggestion?.restaurantsWithin2Km],
        ['البعد عن المرجع', suggestion ? `${suggestion.distanceFromReferenceKm} كم` : '0 كم'],
        ['الإحداثيات', `${Number(suggestedPoint[1]).toFixed(6)}, ${Number(suggestedPoint[0]).toFixed(6)}`]
      ]);
      const marker = addAiPointMarker(suggestedPoint, title, intent === 'events' ? 'event' : 'investment', {
        popupContent,
        label: `${title} ${suggestion?.score ? '(' + suggestion.score + '%)' : ''}`,
        attributes: { recommendationType, recommendationCategory, referenceTitle: ref.title || '' }
      });
      try {
        if (marker && view?.popup?.open) view.popup.open({ features: [marker], location: marker.geometry });
      } catch (e) {}
      result.nearby = [
        ...baseRestaurants.slice(0, 8).map(item => ({ ...item, layerKey: 'restaurants' })),
        ...baseHotels.slice(0, 8).map(item => ({ ...item, layerKey: 'hotels' }))
      ];
      result.suggested = {
        point: suggestedPoint,
        title,
        recommendationType,
        recommendationCategory,
        gap,
        ...(suggestion || {}),
        method: 'تقييم مكاني أولي متعدد النقاط حول الموقع المرجعي'
      };
      result.actions.push('تم رسم نطاق الدراسة حول الموقع المختار.');
      result.actions.push('تم عرض Popup تفصيلي على Marker المقترح يوضح النوع والتصنيف والمبرر ودرجة الملاءمة.');
      result.actions.push('تم عرض أقرب الفنادق والمطاعم كدليل داعم حول الموقع المرجعي.');
      result.actions.push(`درجة الملاءمة الأولية للنقطة المقترحة: ${result.suggested.score || '—'}%.`);
      return result;
    }

    if (intent === 'routes' && center) {
      addAiBuffer(center, analysis.distanceKm, `نطاق اقتراح مسار ${analysis.distanceKm} كم`);
      const restaurants = nearbyToPoint(center, 'restaurants', 2);
      const hotels = nearbyToPoint(center, 'hotels', 5);
      addAiResultListMarkers(restaurants.slice(0, 8), 'restaurants', 8);
      addAiResultListMarkers(hotels.slice(0, 8), 'hotels', 8);
      const stops = [...restaurants.slice(0, 2), ...hotels.slice(0, 2)]
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 3);
      if (stops.length) addAiRouteLine([center, ...stops.map(item => item.point)], 'مسار إرشادي مقترح');
      result.nearby = [...restaurants.slice(0, 8), ...hotels.slice(0, 8)];
      result.actions.push('تم عرض نقاط خدمات يمكن استخدامها كنقاط توقف للمسار المقترح.');
      if (stops.length) result.actions.push('تم رسم خط إرشادي أولي يربط الموقع بأقرب نقاط دعم مناسبة.');
      return result;
    }

    return result;
  }

  function classifyFreeQuestionReadiness(hotels, restaurants) {
    if (hotels >= 8 && restaurants >= 10) return 'مرتفعة';
    if (hotels >= 3 || restaurants >= 4) return 'متوسطة';
    return 'منخفضة';
  }

  function generateFreeQuestionAnswer(question, analysis, ctx, mapResult) {
    const bullets = (items) => items.filter(Boolean).map((v, i) => `${i + 1}. ${v}`).join('\n');
    const refTitle = mapResult?.reference?.title || ctx?.title || 'الموقع المحدد';
    const intent = analysis.intent;
    const nearby = mapResult?.nearby || [];
    const actions = mapResult?.actions || [];

    if (!mapResult?.reference?.center) {
      return 'لم أستطع تحديد موقع واضح من السؤال على الخريطة. اكتب اسم محافظة أو موقع أو مسار، مثل: "اقترح استثمار في عجلون" أو "اعرض المطاعم القريبة من جبل القلعة".';
    }

    const isDirectLayerAnswer = analysis.targetLayer && isAiResultLayer(analysis.targetLayer) && !['investment', 'events', 'routes', 'infrastructure', 'compare'].includes(intent);
    if (intent === 'nearby' || isDirectLayerAnswer) {
      const layerName = analysis.targetLayer ? aiLayerLabel(analysis.targetLayer) : 'الطبقات المطلوبة من السؤال';
      const layerSummary = (mapResult?.layerSummaries || []).map(s => s.heavy ? (s.label + ': تم تفعيل الطبقة') : (s.label + ': ' + fmt(s.count) + ' نتيجة')).join('، ');
      const top = nearby.slice(0, 7).map(item => {
        const prefix = aiLayerLabel(item.layerKey || analysis.targetLayer);
        const d = Number.isFinite(Number(item.distanceKm)) ? Number(item.distanceKm).toFixed(2) + ' كم' : '—';
        return `${prefix}: ${item.name || item.title || 'غير مسمى'} (${d})`;
      }).join('، ');
      return `نتيجة السؤال على الخريطة: ${layerName} قرب ${refTitle}\n\n` + bullets([
        layerSummary ? `ملخص الطبقات: ${layerSummary}.` : '',
        `عدد النتائج المرسومة كـ Markers ضمن ${analysis.distanceKm} كم: ${fmt(nearby.length)}.`,
        top ? `أقرب النتائج: ${top}.` : 'لم تظهر نتائج نقطية ضمن النطاق المحدد، وقد تكون بعض الطبقات مفعّلة فقط لتفادي التعليق.',
        ...actions,
        'يمكن تغيير النطاق بكتابة المسافة في السؤال، مثل: ضمن 5 كم أو ضمن 10 كم.'
      ]);
    }

    const center = mapResult?.reference?.center;
    const hotels = center ? nearbyToPoint(center, 'hotels', 5) : [];
    const restaurants = center ? nearbyToPoint(center, 'restaurants', 2) : [];
    const readiness = classifyFreeQuestionReadiness(hotels.length, restaurants.length);

    if (intent === 'investment') {
      let invType = 'مركز خدمات سياحية صغير';
      let category = 'خدمات سياحية وبنية تحتية خفيفة';
      let reason = 'وجود موقع أو محافظة قابلة للربط بالخدمات السياحية القريبة، مع إمكانية تحسين تجربة الزائر.';
      if (restaurants.length < 2) {
        invType = 'استراحة سياحية / مقهى تراثي / نقطة بيع منتجات محلية';
        category = 'الطعام والضيافة + استثمار مجتمعي';
        reason = 'خدمات الطعام القريبة محدودة ضمن 2 كم، وهذا يخلق فرصة لمشروع صغير سريع الأثر.';
      } else if (hotels.length < 3) {
        invType = 'بيت ضيافة / نزل بيئي صغير / مخيم منظم';
        category = 'إيواء سياحي خفيف';
        reason = 'الإيواء القريب محدود ضمن 5 كم، لذلك الاستثمار الخفيف أنسب من فندق كبير في المرحلة الأولى.';
      }
      const s = mapResult?.suggested || null;
      return `اقتراح استثماري بناءً على الخريطة: ${refTitle}\n\n` + bullets([
        `نوع الاستثمار السياحي: ${invType}.`,
        `تصنيف الاستثمار: ${category}.`,
        `الموقع المقترح: Marker أزرق/بنفسجي داخل نطاق دراسة ${analysis.distanceKm} كم قرب ${refTitle}.`,
        s ? `درجة الملاءمة الأولية للنقطة المقترحة: ${s.score}% (${s.scoreLabel}).` : '',
        s ? `مبرر اختيار النقطة: ${s.reason}` : '',
        `مبرر وجود الاستثمار: ${reason}`,
        `مؤشرات حول الموقع المرجعي: ${fmt(hotels.length)} فندق ضمن 5 كم، و${fmt(restaurants.length)} مطعم ضمن 2 كم.`,
        s ? `مؤشرات حول Marker المقترح: ${fmt(s.hotelsWithin5Km)} فندق ضمن 5 كم، و${fmt(s.restaurantsWithin2Km)} مطعم ضمن 2 كم، والبعد عن المرجع ${fmt(s.distanceFromReferenceKm)} كم.` : '',
        `جاهزية الخدمات: ${readiness}.`,
        'ملاحظة: النتيجة تحليل أولي داعم للقرار، وليست اعتماداً نهائياً قبل التحقق الميداني والملكية والتنظيم.',
        ...actions
      ]);
    }

    if (intent === 'infrastructure') {
      return `تحليل البنية التحتية والخدمات: ${refTitle}\n\n` + bullets([
        `الإيواء القريب: ${fmt(hotels.length)} فندق/منشأة ضمن 5 كم.`,
        `الطعام والضيافة: ${fmt(restaurants.length)} مطعم/خدمة ضمن 2 كم.`,
        `مستوى الجاهزية الأولي: ${readiness}.`,
        restaurants.length < 2 ? 'الفجوة الأبرز: خدمات الطعام والاستراحة.' : 'خدمات الطعام متوفرة نسبياً حول الموقع.',
        hotels.length < 3 ? 'الإيواء القريب محدود ويحتاج استكمالاً أو ربطاً بمنطقة فندقية قريبة.' : 'الإيواء القريب مقبول كبداية.',
        'متطلبات التحسين: لوحات إرشادية، مواقف، دورات مياه، نقاط استراحة، وإدارة حركة الزوار.',
        ...actions
      ]);
    }

    if (intent === 'events') {
      const eventType = restaurants.length >= 3 ? 'فعالية طعام وتراث محلي' : 'فعالية ثقافية/بيئية خفيفة مع خدمات مؤقتة';
      const s = mapResult?.suggested || null;
      return `اقتراح فعالية سياحية: ${refTitle}\n\n` + bullets([
        `نوع الفعالية: ${eventType}.`,
        `الموقع المقترح: Marker برتقالي قرب ${refTitle} مع تجنب المناطق الحساسة أو المزدحمة.`,
        s ? `درجة ملاءمة موقع الفعالية: ${s.score}% (${s.scoreLabel}).` : '',
        s ? `سبب الاختيار: ${s.reason}` : '',
        `مبرر الفعالية: وجود موقع/محافظة يمكن ربطها بتجربة سياحية، وعدد مطاعم قريب = ${fmt(restaurants.length)} ضمن 2 كم.`,
        'التفاصيل: أكشاك محلية، جولات قصيرة، نقطة معلومات، أنشطة عائلية، وتنظيم حركة الزوار.',
        'المتطلبات: مواقف، أمن وسلامة، إسعاف أولي، إدارة نفايات، ودورات مياه.',
        'ملاحظة: يجب مراجعة التصاريح والسعة والسلامة قبل اعتماد الفعالية.',
        ...actions
      ]);
    }

    if (intent === 'routes') {
      return `اقتراح/تحسين مسار سياحي: ${refTitle}\n\n` + bullets([
        `نوع المسار: عائلي/ثقافي قصير إذا كانت الخدمات قريبة، أو مغامرة خفيفة إذا كان الموقع طبيعياً أو مساراً قائماً.`,
        `نقاط الدعم المتاحة: ${fmt(hotels.length)} فندق ضمن 5 كم و${fmt(restaurants.length)} مطعم ضمن 2 كم.`,
        restaurants[0] ? `نقطة توقف مقترحة: ${restaurants[0].name}.` : 'ينصح بإضافة نقطة ضيافة مؤقتة أو استراحة لعدم توفر مطاعم قريبة كافية.',
        hotels[0] ? `نقطة إقامة قريبة: ${hotels[0].name}.` : 'لا تظهر إقامة قريبة كافية؛ لا ينصح بتسويق المسار كمسار مبيت قبل استكمال الإيواء.',
        'المتطلبات: بداية ونهاية واضحتان، لوحات إرشادية، تقييم صعوبة، نقاط ظل وماء، وخطة سلامة.',
        ...actions
      ]);
    }

    return `إجابة مبنية على الخريطة: ${refTitle}\n\n` + bullets([
      `تم فهم السؤال كنوع: ${intent}.`,
      `الفنادق ضمن 5 كم: ${fmt(hotels.length)}.`,
      `المطاعم ضمن 2 كم: ${fmt(restaurants.length)}.`,
      `جاهزية الخدمات الأولية: ${readiness}.`,
      ...actions
    ]);
  }

  function localAiAnalysis(question, ctx, mode) {
    const title = ctx?.title || 'الخريطة';
    const layerKey = ctx?.layerKey || 'none';
    const lines = [];
    const bullets = (items) => items.filter(Boolean).map((v, i) => `${i + 1}. ${v}`).join('\n');
    const section = (name, body) => `\n${name}\n${body}`;

    function classifyReadiness(hotels, restaurants) {
      if (hotels >= 8 && restaurants >= 10) return 'مرتفعة';
      if (hotels >= 3 || restaurants >= 4) return 'متوسطة';
      return 'منخفضة';
    }

    function investmentForCounts(hotels, restaurants, placeType) {
      if (restaurants < 2 && (placeType === 'site' || placeType === 'trail')) {
        return {
          type: 'استراحة سياحية / مقهى تراثي / نقطة بيع منتجات محلية',
          category: 'الطعام والضيافة + استثمار مجتمعي',
          reason: 'وجود نقص واضح في خدمات الطعام القريبة من الموقع أو المسار، وهذا يضعف تجربة الزائر ويخلق فرصة لمشروع صغير سريع الأثر.'
        };
      }
      if (hotels < 3 && (placeType === 'site' || placeType === 'trail')) {
        return {
          type: 'نزل بيئي صغير / بيت ضيافة / مخيم منظم',
          category: 'الإيواء السياحي الخفيف',
          reason: 'عدد منشآت الإيواء القريبة محدود، لذلك الاستثمار الخفيف أنسب من فندق كبير إلى أن تثبت حركة الطلب.'
        };
      }
      return {
        type: 'مركز خدمات سياحية صغير',
        category: 'خدمات سياحية وبنية تحتية خفيفة',
        reason: 'وجود طبقات سياحية وخدمية حول الموقع يسمح بتحسين تجربة الزائر من خلال معلومات، إرشاد، استراحة، ودورات مياه.'
      };
    }

    if (!ctx?.selected) {
      return 'المساعد المحلي يعمل بدون مفتاح API.\n\nاختر محافظة أو موقعاً أثرياً أو مساراً من الخريطة، ثم اختر أحد التبويبات: استثمار، بنية تحتية، فعاليات، مسارات، أو الخريطة. بعد الاختيار سأعطيك تحليلاً مبنياً على الطبقات المتاحة داخل التطبيق: المحافظات، الفنادق، المطاعم، المواقع الأثرية، مسار درب الأردن، والمؤشرات الرسمية المتوفرة.';
    }

    if (ctx.officialGovernorateStats) {
      const g = ctx.officialGovernorateStats;
      const pop = g.population2025 || {};
      const acc = g.tourismAccommodation2024 || {};
      const hotels = g.mapCounts?.hotels || 0;
      const restaurants = g.mapCounts?.restaurants || 0;
      const readiness = classifyReadiness(hotels, restaurants);
      const inv = investmentForCounts(hotels, restaurants, 'gov');

      if (mode === 'investment') {
        return `تحليل استثماري محلي لمحافظة: ${title}\n\n` + bullets([
          `نوع الاستثمار السياحي المقترح: ${inv.type}`,
          `التصنيف: ${inv.category}`,
          `الموقع المقترح: داخل محافظة ${title} قرب التجمعات السياحية أو المسارات والمواقع الأكثر خدمة.` ,
          `مبرر وجود الاستثمار: ${inv.reason}`,
          `مؤشرات داعمة: السكان 2025 = ${fmt(pop.total)} نسمة، البطالة 2024 = ${fmt(g.unemployment2024)}%، منشآت الإيواء الرسمية 2024 = ${fmt(acc.units)} منشأة، والفنادق المكانية داخل التطبيق = ${fmt(hotels)}.` ,
          `الأولوية المكانية: ${readiness}.` ,
          'الخطوة التالية: تحديد قطعة/موقع دقيق ثم فحص الملكية، الوصول، البنية التحتية، والحساسية البيئية قبل اعتماد الاستثمار.'
        ]);
      }

      if (mode === 'infrastructure') {
        return `تحليل البنية التحتية لمحافظة: ${title}\n\n` + bullets([
          `الفنادق الظاهرة على الخريطة: ${fmt(hotels)} موقع.` ,
          `المطاعم الظاهرة على الخريطة: ${fmt(restaurants)} موقع.` ,
          `الإيواء الرسمي 2024: ${fmt(acc.units)} منشأة، ${fmt(acc.rooms)} غرفة، ${fmt(acc.beds)} سرير.` ,
          `قراءة أولية: مستوى الجاهزية الخدمية ${readiness}.` ,
          restaurants < 20 ? 'فجوة محتملة: خدمات الطعام والضيافة قد تحتاج استكمالاً أو توثيقاً مكانياً أفضل.' : 'خدمات الطعام ظاهرة بشكل جيد نسبياً ضمن طبقة المطاعم.' ,
          hotels < 10 ? 'فجوة محتملة: طبقة الفنادق المكانية قد لا تغطي كل المنشآت الرسمية أو تحتاج استكمال إحداثيات.' : 'طبقة الفنادق تعطي تغطية مكانية جيدة نسبياً للمحافظة.'
        ]);
      }

      if (mode === 'events') {
        return `اقتراح فعالية سياحية لمحافظة: ${title}\n\n` + bullets([
          'نوع الفعالية: سوق منتجات محلية وفعالية ثقافية/غذائية موسمية.' ,
          `الموقع المقترح: قرب مركز المحافظة أو أقرب موقع سياحي مخدوم بالفنادق والمطاعم.` ,
          `المبرر: وجود قاعدة سكانية قدرها ${fmt(pop.total)} نسمة، مع إمكانية ربط الفعالية بالمواقع والمسارات القريبة.` ,
          'الجمهور المستهدف: العائلات، الزوار المحليون، طلبة المدارس، والسياح المهتمون بالتجارب المحلية.' ,
          'المتطلبات: مواقف، إدارة حشود، نظافة، دورات مياه، إسعاف أولي، أكشاك منظمة، ولوحات إرشادية.' ,
          'المخاطر: ازدحام، ضعف المواقف، تداخل الحركة مع السكان، وضعف التسويق إن لم ترتبط الفعالية بموقع أو مسار معروف.'
        ]);
      }

      if (mode === 'routes') {
        return `اقتراح مسارات داخل محافظة: ${title}\n\n` + bullets([
          'مسار عائلي قصير: يربط مركز المحافظة بأقرب موقع سياحي ومطاعم قريبة.' ,
          'مسار ثقافي/تراثي: يربط المواقع التاريخية أو الأسواق القديمة مع نقاط ضيافة محلية.' ,
          'مسار خدماتي: يمر بالقرب من فنادق ومطاعم لتسهيل تجربة الزائر.' ,
          `مبرر المسار: المحافظة تضم ${fmt(hotels)} فندقاً على الخريطة و${fmt(restaurants)} مطعماً، ويمكن استخدامها كنقاط دعم للمسار.` ,
          'المطلوب قبل التنفيذ: تحديد نقاط البداية والنهاية، حساب الطول، فحص السلامة، وإضافة لوحات إرشادية.'
        ]);
      }

      return `ملخص عن محافظة ${title}\n\n` + bullets([
        `السكان 2025: ${fmt(pop.total)} نسمة.` ,
        `معدل البطالة 2024: ${fmt(g.unemployment2024)}%.` ,
        `منشآت الإيواء الرسمية 2024: ${fmt(acc.units)} منشأة.` ,
        `الفنادق داخل التطبيق: ${fmt(hotels)}، المطاعم داخل التطبيق: ${fmt(restaurants)}.` ,
        `القراءة العامة: جاهزية سياحية ${readiness} حسب الطبقات الحالية.`
      ]);
    }

    if (ctx.archaeologicalSite) {
      const s = ctx.archaeologicalSite;
      const hotels = s.hotelsWithin5Km || 0;
      const restaurants = s.restaurantsWithin2Km || 0;
      const readiness = classifyReadiness(hotels, restaurants);
      const inv = investmentForCounts(hotels, restaurants, 'site');
      if (mode === 'investment') {
        return `فرصة استثمارية حول الموقع الأثري: ${title}\n\n` + bullets([
          `نوع الاستثمار: ${inv.type}.` ,
          `التصنيف: ${inv.category}.` ,
          `الموقع: ضمن نطاق قريب من ${title} مع الحفاظ على حرم الموقع الأثري وعدم التأثير البصري عليه.` ,
          `مبرر الاستثمار: ${inv.reason}` ,
          `المؤشرات المكانية: فنادق ضمن 5 كم = ${fmt(hotels)}، مطاعم ضمن 2 كم = ${fmt(restaurants)}.` ,
          s.nearestHotel ? `أقرب فندق: ${s.nearestHotel.name} (${s.nearestHotel.distanceKm} كم تقريباً).` : 'لا يظهر فندق قريب ضمن النطاق المحسوب.' ,
          s.nearestRestaurant ? `أقرب مطعم: ${s.nearestRestaurant.name} (${s.nearestRestaurant.distanceKm} كم تقريباً).` : 'لا يظهر مطعم قريب ضمن النطاق المحسوب.' ,
          'تنبيه: يجب ربط أرقام زوار الموقع من ملفات وزارة السياحة قبل اعتماد حجم الاستثمار.'
        ]);
      }
      if (mode === 'infrastructure') {
        return `تحليل البنية التحتية حول الموقع الأثري: ${title}\n\n` + bullets([
          `توفر الإيواء: ${hotels} فنادق ضمن 5 كم.` ,
          `توفر الطعام: ${restaurants} مطاعم ضمن 2 كم.` ,
          `مستوى الجاهزية الأولي: ${readiness}.` ,
          restaurants < 2 ? 'الفجوة الأبرز: خدمات الطعام والاستراحة حول الموقع.' : 'خدمات الطعام متوفرة نسبياً حول الموقع.' ,
          hotels < 3 ? 'الإيواء القريب محدود؛ الأفضل اقتراح إيواء خفيف أو ربط الموقع بأقرب منطقة فندقية.' : 'الإيواء القريب مقبول كبداية.' ,
          'المتطلبات الداعمة: مواقف، لوحات إرشادية، دورات مياه، نقطة معلومات، وإدارة حركة الزوار.'
        ]);
      }
      if (mode === 'events') {
        return `فعالية مقترحة في ${title}\n\n` + bullets([
          'نوع الفعالية: فعالية ثقافية/تراثية أو يوم تعريفي بالموقع الأثري.' ,
          'التفاصيل: جولات إرشادية، عروض تراثية خفيفة، أكشاك منتجات محلية، وورش تعريفية قصيرة.' ,
          `الموقع المقترح: منطقة استقبال أو مساحة قريبة خارج النطاق الحساس للموقع.` ,
          `مبرر الفعالية: الموقع أثري ويمكن تحويل الزيارة من مشاهدة فقط إلى تجربة ثقافية منظمة.` ,
          `الخدمات المتاحة: ${hotels} فنادق ضمن 5 كم و${restaurants} مطاعم ضمن 2 كم.` ,
          'المخاطر: حماية الموقع، إدارة النفايات، الصوت والإضاءة، وسعة المكان.'
        ]);
      }
      if (mode === 'routes') {
        return `اقتراح مسار حول الموقع الأثري: ${title}\n\n` + bullets([
          `مسار قصير يبدأ من نقطة استقبال ${title} ويمر بنقاط مشاهدة أو شرح تاريخي.` ,
          s.nearestRestaurant ? `ربط المسار بأقرب مطعم: ${s.nearestRestaurant.name}.` : 'إضافة نقطة ضيافة مؤقتة أو كشك خدمات عند غياب المطاعم القريبة.' ,
          s.nearestHotel ? `ربط المسار بأقرب فندق: ${s.nearestHotel.name}.` : 'التوصية بعدم تسويق المسار كمسار إقامة قبل استكمال الإيواء القريب.' ,
          'نوع المسار: ثقافي/تعليمي مناسب للزوار والطلبة والعائلات.' ,
          'المتطلبات: لوحات تفسيرية، نقاط ظل، مقاعد، ومسار واضح للحركة.'
        ]);
      }
      return `ملخص الموقع الأثري ${title}\n\n` + bullets([
        `فنادق ضمن 5 كم: ${fmt(hotels)}.` ,
        `مطاعم ضمن 2 كم: ${fmt(restaurants)}.` ,
        `جاهزية الخدمات الأولية: ${readiness}.` ,
        'يمكن استخدام بيانات زوار المواقع من وزارة السياحة لاحقاً لتقدير الطلب بدقة أكبر.'
      ]);
    }

    if (ctx.trail) {
      const t = ctx.trail;
      const hotels = t.hotelsWithin5Km || 0;
      const restaurants = t.restaurantsWithin2Km || 0;
      const readiness = classifyReadiness(hotels, restaurants);
      const inv = investmentForCounts(hotels, restaurants, 'trail');
      if (mode === 'investment') {
        return `فرصة استثمارية على المسار: ${title}\n\n` + bullets([
          `نوع الاستثمار: ${inv.type}.` ,
          `التصنيف: ${inv.category}.` ,
          'الموقع المقترح: قرب بداية المرحلة أو نهايتها أو نقطة توقف آمنة على المسار.' ,
          `مبرر الاستثمار: ${inv.reason}` ,
          `فنادق ضمن 5 كم من المسار: ${fmt(hotels)}، مطاعم ضمن 2 كم: ${fmt(restaurants)}.` ,
          'الأفضلية: مشاريع صغيرة قابلة للتشغيل من المجتمع المحلي مثل استراحة، كشك، نقطة ماء، تأجير معدات، أو دليل محلي.'
        ]);
      }
      if (mode === 'infrastructure') {
        return `تحليل بنية تحتية للمسار: ${title}\n\n` + bullets([
          `طول/مرحلة المسار: ${t.distanceKm || 'غير محدد'} كم.` ,
          `الفنادق ضمن 5 كم: ${fmt(hotels)}.` ,
          `المطاعم ضمن 2 كم: ${fmt(restaurants)}.` ,
          `جاهزية الخدمة: ${readiness}.` ,
          restaurants < 2 ? 'الفجوة الرئيسية: نقاط الطعام والاستراحة على المسار.' : 'خدمات الطعام موجودة نسبياً حول المسار.' ,
          hotels < 3 ? 'الإيواء قريباً من المسار محدود، ويحتاج ربطاً بنقاط إقامة أو مخيمات منظمة.' : 'الإيواء حول المسار مقبول كبداية.' ,
          'متطلبات التحسين: علامات إرشادية، نقاط ظل، إسعاف أولي، خرائط مسار، ومعلومات صعوبة المسار.'
        ]);
      }
      if (mode === 'events') {
        return `فعالية مقترحة على المسار: ${title}\n\n` + bullets([
          'نوع الفعالية: مسير منظم / فعالية بيئية / يوم مغامرة خفيف.' ,
          'التفاصيل: تسجيل مسبق، مرشدون، نقطة بداية ونهاية، نقاط ماء، سيارة دعم، وإرشادات سلامة.' ,
          'الموقع المقترح: بداية المرحلة أو نهايتها، مع اختيار نقطة تجمع قريبة من طريق وخدمات.' ,
          `مبرر الفعالية: المسار موجود مكانياً ويمكن ربطه بخدمات قريبة: ${fmt(hotels)} فندق و${fmt(restaurants)} مطعم ضمن النطاقات المحسوبة.` ,
          'المخاطر: السلامة، الطقس، ضياع المشاركين، نقص نقاط الماء، وضعف الاتصال.'
        ]);
      }
      if (mode === 'routes') {
        return `تحسين/اقتراح مسار سياحي مرتبط بـ ${title}\n\n` + bullets([
          'تقسيم المسار إلى مقاطع قصيرة حسب مستوى الصعوبة.' ,
          'إضافة نقاط توقف عند المواقع التي تتوفر حولها مطاعم أو فنادق.' ,
          t.nearestRestaurant ? `استخدام ${t.nearestRestaurant.name} كنقطة دعم أو نهاية جزئية للمسار.` : 'إضافة نقطة خدمات متنقلة أو موسمية لعدم توفر مطاعم قريبة كافية.' ,
          t.nearestHotel ? `ربط المسار بأقرب إقامة: ${t.nearestHotel.name}.` : 'اقتراح مخيم/نزل صغير قرب نهاية المرحلة إذا سمحت الشروط.' ,
          'المسار المقترح مناسب كسياحة مغامرة خفيفة إذا تم توفير السلامة والإرشاد.'
        ]);
      }
      return `ملخص المسار ${title}\n\n` + bullets([
        `فنادق ضمن 5 كم: ${fmt(hotels)}.` ,
        `مطاعم ضمن 2 كم: ${fmt(restaurants)}.` ,
        `جاهزية الخدمة: ${readiness}.` ,
        'يمكن تطويره بربط نقاط التوقف بخدمات ضيافة محلية وفعاليات مشي منظمة.'
      ]);
    }

    if (ctx.hotel) {
      return `تحليل منشأة إيواء: ${title}\n\n` + bullets([
        'التصنيف التحليلي: نقطة إيواء داعمة للمسارات والمواقع القريبة.' ,
        'استخدامها في التطبيق: نقطة دعم للمبيت، نقطة بداية/نهاية رحلة، أو عنصر ضمن تحليل جاهزية المحافظة.' ,
        'اقتراح استثماري حولها: مطعم، تجربة محلية، خدمة نقل، أو برنامج جولات إلى المواقع القريبة.' ,
        'التحقق المطلوب: حالة الترخيص، التصنيف الرسمي، الطاقة الاستيعابية، ومطابقة الموقع.'
      ]);
    }

    if (ctx.restaurant) {
      return `تحليل مطعم/خدمة طعام: ${title}\n\n` + bullets([
        'التصنيف التحليلي: خدمة ضيافة داعمة للمسارات والمواقع السياحية.' ,
        'استخدامه في التطبيق: نقطة توقف، دعم فعالية، أو خدمة ضمن مسار عائلي.' ,
        'اقتراح تطوير: ربطه بمنتجات محلية، قوائم تراثية، أو عروض للمجموعات السياحية.' ,
        'التحقق المطلوب: نوع المطبخ، الطاقة الاستيعابية، ساعات العمل، ومطابقة الموقع.'
      ]);
    }

    return `تحليل محلي للعنصر: ${title}\n\n` + bullets([
      `نوع الطبقة: ${layerKey}.` ,
      'يمكن استخدام هذا العنصر في التحليل إذا تم ربطه بالمحافظة أو أقرب موقع سياحي أو أقرب مسار.' ,
      'لتحليل أدق اختر محافظة أو موقعاً أثرياً أو مسار درب الأردن.'
    ]);
  }

  // ============================================================
  // AI Assistant V2 — محرك جديد مستقل عن فهرس البحث القديم
  // الهدف: نتيجة مفهومة على الخريطة بدون تعليق وبدون اختيار موقع خاطئ
  // ============================================================

  function ai2Normalize(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/ـ/g, '')
      .replace(/[إأآٱ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/ؤ/g, 'و')
      .replace(/ئ/g, 'ي')
      .replace(/[^\u0600-\u06FFa-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function ai2Words(value) {
    const stop = new Set(['في', 'حول', 'قرب', 'من', 'الى', 'إلى', 'على', 'عن', 'ضمن', 'كم', 'كيلو', 'كيلومتر', 'اعرض', 'اظهر', 'حلل', 'اقترح', 'السياحي', 'السياحيه', 'السياحية', 'موقع', 'الموقع', 'الاثري', 'الاثريه', 'الأثري', 'الأثرية']);
    return ai2Normalize(value).split(' ').filter(w => w && w.length > 1 && !stop.has(w));
  }

  function ai2ContainsAny(text, words) {
    const q = ai2Normalize(text);
    return (words || []).some(w => q.includes(ai2Normalize(w)));
  }

  function ai2LonLatToMercator(point) {
    const lon = Number(point?.[0]);
    const latRaw = Number(point?.[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(latRaw)) return null;
    const lat = Math.max(-85.05112878, Math.min(85.05112878, latRaw));
    const originShift = 20037508.342789244;
    const x = lon * originShift / 180;
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    y = y * originShift / 180;
    return [x, y];
  }

  function ai2PointGeometry(point) {
    const lon = Number(point?.[0]);
    const lat = Number(point?.[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
    return { type: 'point', longitude: lon, latitude: lat, spatialReference: { wkid: 4326 } };
  }

  function ai2CircleGeometry(center, radiusKm, segments = 96) {
    if (!center) return null;
    const lon = Number(center[0]);
    const lat = Number(center[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
    const r = Math.max(0.2, Number(radiusKm || 1));
    const latRad = lat * Math.PI / 180;
    const dLat = r / 110.574;
    const dLon = r / (111.320 * Math.max(0.2, Math.cos(latRad)));
    const ring = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      ring.push([lon + Math.cos(a) * dLon, lat + Math.sin(a) * dLat]);
    }
    return { type: 'polygon', rings: [ring], spatialReference: { wkid: 4326 } };
  }

  function ai2LineGeometry(points) {
    const path = (points || [])
      .map(p => [Number(p?.[0]), Number(p?.[1])])
      .filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]));
    if (path.length < 2) return null;
    return { type: 'polyline', paths: [path], spatialReference: { wkid: 4326 } };
  }

  function ai2CollectCoordinates(geometry, acc = []) {
    if (!geometry) return acc;
    const coords = geometry.coordinates;
    if (!coords) return acc;
    const walk = (v) => {
      if (!Array.isArray(v)) return;
      if (v.length >= 2 && typeof v[0] === 'number' && typeof v[1] === 'number') {
        if (Number.isFinite(v[0]) && Number.isFinite(v[1])) acc.push([Number(v[0]), Number(v[1])]);
        return;
      }
      v.forEach(walk);
    };
    walk(coords);
    return acc;
  }

  function ai2FeatureCenter(feature) {
    const pts = ai2CollectCoordinates(feature?.geometry, []);
    if (!pts.length) return null;
    const sum = pts.reduce((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0]);
    return [sum[0] / pts.length, sum[1] / pts.length];
  }

  function ai2FeatureName(layerKey, props = {}) {
    if (layerKey === 'gov') return props.gov_name_ar || props.name_ar || props.NAME || props.NIC_NAME_E || 'محافظة';
    if (layerKey === 'liwa') return props.liwa_name_ar || props.name_ar || props.name || 'لواء';
    if (layerKey === 'arch') return props.site_name_ar || props.site || props.name_ar || props.site_name_en || 'موقع أثري';
    if (layerKey === 'masar') return props.masar_title || props.masar_name || props.title || props.name || 'مسار درب الأردن';
    if (layerKey === 'hotels') return props.hotel_name_ar || props.hotel_name_en || props.hotel_name || props.name || 'فندق';
    if (layerKey === 'restaurants') return props.restaurant_name_ar || props.restaurant_name_en || props.restaurant_name || props.name || 'مطعم';
    if (layerKey === 'place-major' || layerKey === 'place-detail') return props.place_name_ar || props.name_ar || props.name || 'مدينة/بلدة';
    if (String(layerKey).startsWith('fiber-')) return props.fiber_name_ar || props.Arabic_Name || props.name_ar || 'مؤسسة';
    if (layerKey === 'rail') return props.rail_name || props.name_ar || props.name || 'سكة حديد';
    if (layerKey === 'highway') return props.highway_name || props.name_ar || props.name || 'طريق';
    if (layerKey === 'contour') return props.contour_name || props.contour_label || 'خط كنتور';
    return props.name_ar || props.name || props.title || 'عنصر';
  }

  function ai2LayerLabel(layerKey) {
    return aiLayerLabel(layerKey);
  }

  function ai2CatalogItem(layerKey, feature, index) {
    const center = ai2FeatureCenter(feature);
    if (!center) return null;
    const name = ai2FeatureName(layerKey, feature.properties || {});
    const nName = ai2Normalize(name);
    if (!nName) return null;
    return { layerKey, feature, center, name, nName, index };
  }

  function ai2GetLayerFeatures(layerKey) {
    const maps = {
      gov: govFC?.features || [],
      liwa: liwaFC?.features || [],
      arch: archFC?.features || [],
      masar: masarFC?.features || [],
      hotels: hotelsFC?.features || [],
      restaurants: restaurantsFC?.features || [],
      'place-major': majorPlacesFC?.features || [],
      'place-detail': detailPlacesFC?.features || [],
      'fiber-edu': fiberEduFC?.features || [],
      'fiber-gov_agency': fiberGovFC?.features || [],
      'fiber-health': fiberHealthFC?.features || [],
      'fiber-school': fiberSchoolsFC?.features || [],
      rail: railFC?.features || [],
      highway: highwayFC?.features || [],
      contour: contourFC?.features || []
    };
    return maps[layerKey] || [];
  }

  function ai2BuildCatalog(layerKeys) {
    const keys = layerKeys || ['arch', 'gov', 'liwa', 'place-major', 'place-detail', 'masar', 'hotels', 'restaurants'];
    const out = [];
    keys.forEach(layerKey => {
      ai2GetLayerFeatures(layerKey).forEach((feature, index) => {
        const item = ai2CatalogItem(layerKey, feature, index);
        if (item) out.push(item);
      });
    });
    return out;
  }

  function ai2ParseQuestion(question) {
    const q = ai2Normalize(question);
    const m = q.match(/(?:ضمن|حول|قرب|مسافه|مسافة)\s*(\d+(?:\.\d+)?)\s*(?:كم|كيلو|كيلومتر)?/);
    const radiusKm = m ? Math.max(0.5, Math.min(30, Number(m[1]))) : (ai2ContainsAny(q, ['بنية', 'بنيه', 'خدمات', 'تحليل']) ? 5 : 3);
    let intent = 'nearby';
    if (ai2ContainsAny(q, ['استثمار', 'فرصه', 'فرصة', 'مشروع', 'جدوى'])) intent = 'investment';
    else if (ai2ContainsAny(q, ['فعالية', 'فعاليه', 'فعاليات', 'مهرجان', 'حدث'])) intent = 'events';
    else if (ai2ContainsAny(q, ['مسار', 'مسارات', 'درب', 'رحلة', 'رحله', 'برنامج'])) intent = 'routes';
    else if (ai2ContainsAny(q, ['بنية', 'بنيه', 'خدمات', 'بنية تحتية', 'تحليل'])) intent = 'infrastructure';

    const requested = [];
    const add = (...items) => items.forEach(x => { if (x && !requested.includes(x)) requested.push(x); });
    const all = ai2ContainsAny(q, ['كل الطبقات', 'جميع الطبقات', 'كافة الطبقات', 'كل الخدمات', 'جميع الخدمات']);
    if (all || ai2ContainsAny(q, ['فندق', 'فنادق', 'اوتيل', 'هوتيل', 'إيواء', 'ايواء'])) add('hotels');
    if (all || ai2ContainsAny(q, ['مطعم', 'مطاعم', 'مقهى', 'مقهي', 'كافيه', 'طعام', 'اكل'])) add('restaurants');
    if (all || ai2ContainsAny(q, ['صحي', 'صحية', 'صحيه', 'مستشفى', 'مستشفي', 'مراكز صحية'])) add('fiber-health');
    if (all || ai2ContainsAny(q, ['مدرسة', 'مدرسه', 'مدارس'])) add('fiber-school');
    if (all || ai2ContainsAny(q, ['حكومي', 'حكومية', 'حكوميه', 'جهات حكومية'])) add('fiber-gov_agency');
    if (all || ai2ContainsAny(q, ['تربية', 'تربيه', 'مديرية تربية'])) add('fiber-edu');
    if (all || ai2ContainsAny(q, ['موقع اثري', 'موقع أثري', 'اثار', 'آثار', 'مواقع اثرية'])) add('arch');
    if (all || ai2ContainsAny(q, ['مدينة', 'مدينه', 'بلدة', 'بلده', 'قرية', 'قريه'])) add('place-major', 'place-detail');
    if (all || ai2ContainsAny(q, ['مسار', 'مسارات', 'درب'])) add('masar');
    if (all || ai2ContainsAny(q, ['سكة', 'سكك', 'قطار'])) add('rail');
    if (all || ai2ContainsAny(q, ['طريق', 'طرق', 'شارع', 'شوارع'])) add('highway');
    if (all || ai2ContainsAny(q, ['كنتور', 'تضاريس', 'ارتفاع'])) add('contour');

    if (!requested.length && intent === 'infrastructure') add('hotels', 'restaurants', 'fiber-health', 'fiber-school', 'fiber-gov_agency', 'fiber-edu', 'highway');
    if (!requested.length && (intent === 'investment' || intent === 'events')) add('hotels', 'restaurants');
    if (!requested.length && intent === 'routes') add('masar', 'hotels', 'restaurants');
    if (!requested.length) add('hotels', 'restaurants');
    return { q, intent, radiusKm, requestedLayers: requested };
  }

  function ai2ReferenceAliases() {
    return [
      { keys: ['جبل القلعه', 'قلعه عمان', 'القلعه عمان', 'موقع جبل القلعه الاثري'], layerKey: 'arch', name: 'موقع جبل القلعة الاثري' },
      { keys: ['البتراء', 'البترا', 'petra'], layerKey: 'arch', name: 'البتراء' },
      { keys: ['البتراء الصغيره', 'البترا الصغيره', 'سيق البارد'], layerKey: 'arch', name: 'البتراء الصغيرة' },
      { keys: ['جرش الاثريه', 'جرش الاثري', 'اثار جرش'], layerKey: 'arch', name: 'جرش الأثرية' },
      { keys: ['قلعه عجلون', 'قلعة عجلون'], layerKey: 'arch', name: 'قلعة عجلون' },
      { keys: ['ام قيس', 'أم قيس'], layerKey: 'arch', name: 'أم قيس' },
      { keys: ['جبل نيبو', 'نيبو'], layerKey: 'arch', name: 'جبل نيبو' },
      { keys: ['المغطس'], layerKey: 'arch', name: 'المغطس' },
      { keys: ['قلعه الكرك', 'قلعة الكرك'], layerKey: 'arch', name: 'قلعة الكرك' },
      { keys: ['وادي رم'], layerKey: 'arch', name: 'وادي رم' },
      { keys: ['ام الرصاص', 'أم الرصاص'], layerKey: 'arch', name: 'أم الرصاص' }
    ];
  }

  function ai2ResolveReference(question, parsed) {
    const q = parsed.q;
    const catalog = ai2BuildCatalog(['arch', 'gov', 'liwa', 'place-major', 'place-detail', 'masar', 'hotels', 'restaurants']);
    for (const alias of ai2ReferenceAliases()) {
      if (alias.keys.some(k => q.includes(ai2Normalize(k)))) {
        const wanted = ai2Normalize(alias.name);
        const found = catalog.find(x => x.layerKey === alias.layerKey && (x.nName.includes(wanted) || wanted.includes(x.nName) || x.nName.includes(ai2Normalize(alias.keys[0]))));
        if (found) return { ...found, confidence: 100, reason: 'alias' };
      }
    }

    const qWords = new Set(ai2Words(q));
    const asksGov = ai2ContainsAny(q, ['محافظة', 'محافظه', 'محافظات']);
    const asksArch = ai2ContainsAny(q, ['قلعة', 'قلعه', 'أثري', 'اثري', 'آثار', 'اثار', 'موقع اثري', 'موقع أثري']);
    const asksTrail = ai2ContainsAny(q, ['مسار', 'درب', 'مرحلة']);
    const asksHotel = ai2ContainsAny(q, ['فندق', 'فنادق', 'اوتيل', 'هوتيل']);
    const asksRestaurant = ai2ContainsAny(q, ['مطعم', 'مطاعم', 'مقهى', 'كافيه']);

    const scored = catalog.map(item => {
      let score = 0;
      if (q.includes(item.nName)) score += 90 + Math.min(30, item.nName.length);
      const iWords = ai2Words(item.nName);
      const hits = iWords.filter(w => qWords.has(w));
      score += hits.length * 22;
      if (hits.length && hits.length === iWords.length) score += 35;
      if (asksGov && item.layerKey === 'gov') score += 60;
      if (asksArch && item.layerKey === 'arch') score += 70;
      if (asksTrail && item.layerKey === 'masar') score += 70;
      if ((asksHotel || asksRestaurant) && ['hotels', 'restaurants'].includes(item.layerKey) && !q.includes(item.nName)) score -= 80;
      if (!asksHotel && item.layerKey === 'hotels') score -= 20;
      if (!asksRestaurant && item.layerKey === 'restaurants') score -= 20;
      if (['arch', 'gov', 'liwa', 'place-major', 'place-detail'].includes(item.layerKey)) score += 8;
      return { ...item, confidence: score, reason: 'score' };
    }).filter(x => x.confidence >= 35).sort((a, b) => b.confidence - a.confidence);

    return scored[0] || null;
  }

  function ai2NearbyLayer(center, layerKey, radiusKm, limit = 20) {
    if (!center || !layerKey) return [];
    if (layerKey === 'highway' || layerKey === 'contour') return [];
    return ai2GetLayerFeatures(layerKey).map((feature, index) => {
      const c = ai2FeatureCenter(feature);
      const distanceKm = c ? haversineKm(center, c) : Infinity;
      return { layerKey, feature, center: c, distanceKm, name: ai2FeatureName(layerKey, feature.properties || {}), index };
    }).filter(x => x.center && x.distanceKm <= radiusKm)
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);
  }

  function ai2AddMarker(center, title, kind = 'result', rows = []) {
    const geometry = ai2PointGeometry(center);
    if (!geometry) return null;
    const color = kind === 'reference' ? [37, 99, 235, 0.98] : kind === 'investment' ? [124, 58, 237, 0.95] : kind === 'event' ? [234, 88, 12, 0.95] : [14, 165, 233, 0.9];
    const size = kind === 'reference' ? 20 : (kind === 'investment' || kind === 'event' ? 18 : 11);
    const style = kind === 'reference' ? 'circle' : (kind === 'investment' || kind === 'event' ? 'diamond' : 'circle');
    const safeRows = Array.isArray(rows) ? rows : [];
    const graphic = addAiGraphic(new Graphic({
      geometry,
      attributes: { title, kind },
      symbol: { type: 'simple-marker', style, size, color, outline: { color: [255, 255, 255, 1], width: 2 } },
      popupTemplate: { title, content: aiPopupTable(safeRows) }
    }));
    if (graphic) {
      const resultIndex = state.aiResultItems.push({ title, kind, rows: safeRows, center, graphic }) - 1;
      graphic.attributes = { ...(graphic.attributes || {}), aiResultIndex: resultIndex };
    }
    return graphic;
  }

  function ai2AddLabel(center, text, kind = 'result') {
    const geometry = ai2PointGeometry(center);
    if (!geometry || !text) return null;
    return addAiGraphic(new Graphic({
      geometry,
      attributes: { title: text, kind: 'ai-label' },
      symbol: {
        type: 'text', text, color: kind === 'reference' ? [30, 64, 175, 1] : [15, 23, 42, 1],
        haloColor: [255, 255, 255, 0.96], haloSize: 1.6, yoffset: 20,
        font: { family: 'Tajawal', size: 10, weight: 'bold' }
      }
    }));
  }

  function ai2AddBuffer(center, radiusKm) {
    const geometry = ai2CircleGeometry(center, radiusKm);
    if (!geometry) return null;
    return addAiGraphic(new Graphic({
      geometry,
      attributes: { title: `نطاق التحليل ${radiusKm} كم`, radiusKm },
      symbol: { type: 'simple-fill', color: [37, 99, 235, 0.08], outline: { color: [37, 99, 235, 0.9], width: 2, style: 'dash' } },
      popupTemplate: { title: `نطاق التحليل ${radiusKm} كم`, content: 'النطاق الذي استخدمه المساعد لاحتساب النتائج القريبة.' }
    }));
  }

  function ai2SetLayerToggles(layerKeys) {
    const mapToggles = {
      hotels: els.toggleHotels, restaurants: els.toggleRestaurants, arch: els.toggleArchSites, masar: els.toggleMasar,
      rail: els.toggleRails, highway: els.toggleHighways, contour: els.toggleContours,
      'fiber-edu': els.toggleFiberEdu, 'fiber-gov_agency': els.toggleFiberGov, 'fiber-health': els.toggleFiberHealth, 'fiber-school': els.toggleFiberSchools,
      'place-major': els.togglePlaces, 'place-detail': els.togglePlaces, gov: els.toggleGov, liwa: els.toggleLiwa
    };
    uniqueArray(layerKeys || []).forEach(k => {
      const t = mapToggles[k];
      if (t && !t.checked && !t.disabled) t.checked = true;
    });
    try { updateScaleDrivenHierarchy(); } catch (e) { console.warn('AI V2 layer toggle update failed:', e); }
  }

  function ai2Timeout(ms, label = 'operation') {
    return new Promise((_, reject) => setTimeout(() => reject(new Error(label + ' timeout')), ms));
  }

  async function ai2GoTo(center, radiusKm) {
    const targetPoint = ai2PointGeometry(center);
    if (!targetPoint || !view?.goTo) return false;
    const scale = Math.max(7000, Math.min(160000, Number(radiusKm || 3) * 11000));
    const targetArea = ai2CircleGeometry(center, Math.max(0.8, Number(radiusKm || 3) * 0.65), 64) || targetPoint;
    state.searchNavigationBusy = true;
    try {
      applyAiPanelMapPadding();
      if (view.when) await Promise.race([view.when(), ai2Timeout(2500, 'view.when')]);
      await Promise.race([
        view.goTo({ target: targetArea, scale }, { duration: 450, easing: 'ease-in-out' }),
        ai2Timeout(3500, 'view.goTo')
      ]);
      try { updateScaleBadge(); } catch (e) {}
      try { updateScaleDrivenHierarchy(); } catch (e) {}
      return true;
    } catch (e) {
      console.warn('AI V2 goTo failed:', e);
      return false;
    } finally {
      state.searchNavigationBusy = false;
    }
  }

  function ai2ChooseSuggestion(center, intent, radiusKm) {
    const d = Math.max(0.5, Math.min(3, Number(radiusKm || 3) * 0.35));
    const candidates = [0, 45, 90, 135, 180, 225, 270, 315].map(b => pointFromBearingDistance(center, d, b)).filter(Boolean);
    const scored = candidates.map(p => {
      const hotels = ai2NearbyLayer(p, 'hotels', 5, 100).length;
      const restaurants = ai2NearbyLayer(p, 'restaurants', 2, 100).length;
      let score = 45 + Math.min(hotels, 5) * 4 + Math.min(restaurants, 5) * 5;
      if (intent === 'investment' && restaurants < 2) score += 10;
      if (intent === 'events' && restaurants >= 2) score += 12;
      return { point: p, hotels, restaurants, score: Math.max(20, Math.min(95, Math.round(score))) };
    }).sort((a, b) => b.score - a.score);
    return scored[0] || null;
  }

  function ai2ResultAnswer(question, parsed, ref, layerSummaries, actions, suggestion) {
    const lines = [];
    lines.push(`فهمت السؤال على أنه: ${parsed.intent === 'infrastructure' ? 'تحليل بنية تحتية وخدمات' : parsed.intent === 'investment' ? 'اقتراح استثمار سياحي' : parsed.intent === 'events' ? 'اقتراح فعالية سياحية' : parsed.intent === 'routes' ? 'تحليل/اقتراح مسار' : 'عرض نتائج قريبة على الخريطة'}.`);
    lines.push(`الموقع المرجعي: ${ref.name} — ${ai2LayerLabel(ref.layerKey)}.`);
    lines.push(`نطاق التحليل: ${parsed.radiusKm} كم.`);
    lines.push('');
    lines.push('نتائج الطبقات:');
    layerSummaries.forEach(s => lines.push(`- ${s.label}: ${s.countText}`));
    if (suggestion) {
      lines.push('');
      lines.push(parsed.intent === 'events' ? 'موقع فعالية مقترح:' : 'موقع استثمار/خدمة مقترح:');
      lines.push(`- درجة الملاءمة الأولية: ${suggestion.score}%.`);
      lines.push(`- فنادق حول النقطة ضمن 5 كم: ${suggestion.hotels}.`);
      lines.push(`- مطاعم حول النقطة ضمن 2 كم: ${suggestion.restaurants}.`);
    }
    if (actions?.length) {
      lines.push('');
      lines.push('ما تم تنفيذه على الخريطة:');
      actions.forEach(a => lines.push(`- ${a}`));
    }
    lines.push('');
    lines.push('ملاحظة: هذا تحليل مكاني أولي من بيانات الخريطة الحالية، وليس قراراً نهائياً قبل التحقق الميداني والتنظيمي.');
    return lines.join('\n');
  }

  function ai2KindLabel(kind) {
    if (kind === 'reference') return 'الموقع المرجعي';
    if (kind === 'investment') return 'استثمار مقترح';
    if (kind === 'event') return 'فعالية مقترحة';
    return 'نتيجة قريبة';
  }

  function ai2IdentifyResultsHtml(maxCards = 30) {
    const items = Array.isArray(state.aiResultItems) ? state.aiResultItems.slice(0, maxCards) : [];
    if (!items.length) {
      return '<div class="ai-identify-results"><div class="ai-warning-box">لم يتم إنشاء بطاقات نتائج. تحقق من أن السؤال يحتوي على موقع واضح وطبقة مطلوبة.</div></div>';
    }
    const cards = items.map((item, idx) => {
      const rows = (item.rows || []).slice(0, 8).map(([k, v]) =>
        '<tr><td>' + escapeHtml(k) + '</td><td>' + escapeHtml(v) + '</td></tr>'
      ).join('');
      return '<div class="ai-identify-card" data-ai-card-index="' + idx + '">'
        + '<div class="ai-identify-card-head">'
        + '<div class="ai-identify-card-title">' + escapeHtml(item.title || 'نتيجة') + '</div>'
        + '<span class="ai-identify-card-kind">' + escapeHtml(ai2KindLabel(item.kind)) + '</span>'
        + '</div>'
        + '<table><tbody>' + rows + '</tbody></table>'
        + '<button type="button" class="ai-identify-zoom" data-ai-zoom-index="' + idx + '">تكبير على هذه النتيجة</button>'
        + '</div>';
    }).join('');
    const more = state.aiResultItems.length > maxCards ? '<span>+' + (state.aiResultItems.length - maxCards) + ' نتيجة أخرى على الخريطة</span>' : '<span>' + state.aiResultItems.length + ' نتيجة</span>';
    return '<div class="ai-identify-results">'
      + '<div class="ai-identify-title"><span>نتائج وصفية مثل Identify</span>' + more + '</div>'
      + cards
      + '</div>';
  }

  function ai2OpenResultPopup(index) {
    const item = state.aiResultItems?.[Number(index)];
    if (!item?.graphic || !view) return;
    try {
      if (view.popup?.open) {
        view.popup.open({ features: [item.graphic], location: item.graphic.geometry });
      } else if (view.openPopup) {
        view.openPopup({ features: [item.graphic], location: item.graphic.geometry });
      }
    } catch (e) {
      console.warn('تعذر فتح Popup نتيجة المساعد:', e);
    }
  }

  function ai2BuildAnswerIdentifyPopup(question, parsed, ref, layerSummaries, actions, answer, suggestion) {
    const safeLayerRows = (layerSummaries || []).map(s => `
      <tr>
        <th>${escapeHtml(s.label || 'طبقة')}</th>
        <td>${escapeHtml(s.countText || String(s.count || 0))}</td>
      </tr>
    `).join('');

    const safeActionRows = (actions || []).map(a => `<li>${escapeHtml(a)}</li>`).join('');

    const suggestionHtml = suggestion ? `
      <div style="font-weight:bold;margin:8px 0 4px">مقترح مكاني:</div>
      <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:10px">
        <tbody>
          <tr><th>درجة الملاءمة الأولية</th><td>${escapeHtml(String(suggestion.score))}%</td></tr>
          <tr><th>فنادق حول النقطة ضمن 5 كم</th><td>${escapeHtml(String(suggestion.hotels))}</td></tr>
          <tr><th>مطاعم حول النقطة ضمن 2 كم</th><td>${escapeHtml(String(suggestion.restaurants))}</td></tr>
        </tbody>
      </table>
    ` : '';

    return `
      <div class="ai-answer-identify-popup" dir="rtl" style="text-align:right;font-family:Tajawal,Arial,sans-serif;line-height:1.75;max-width:500px;min-width:310px;color:#0f172a">
        <div style="display:inline-block;background:linear-gradient(135deg,#0f4c81,#2563eb);color:#fff;border-radius:999px;padding:7px 13px;font-weight:800;margin-bottom:10px">
          جواب مساعد الخارطة السياحية الذكية
        </div>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:9px;margin-bottom:10px">
          <strong>السؤال:</strong><br>
          ${escapeHtml(question)}
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:10px">
          <tbody>
            <tr><th>الموقع المرجعي</th><td>${escapeHtml(ref.name)}</td></tr>
            <tr><th>الطبقة المرجعية</th><td>${escapeHtml(ai2LayerLabel(ref.layerKey))}</td></tr>
            <tr><th>نطاق التحليل</th><td>${escapeHtml(String(parsed.radiusKm))} كم</td></tr>
            <tr><th>الإحداثيات</th><td dir="ltr">${Number(ref.center[1]).toFixed(6)}, ${Number(ref.center[0]).toFixed(6)}</td></tr>
          </tbody>
        </table>

        <div style="font-weight:bold;margin:8px 0 4px">نتائج الطبقات ضمن النطاق:</div>
        <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:10px">
          <tbody>
            ${safeLayerRows || '<tr><td>لا توجد نتائج طبقات ضمن النطاق الحالي.</td></tr>'}
          </tbody>
        </table>

        ${suggestionHtml}

        <div style="font-weight:bold;margin:8px 0 4px">ما تم تنفيذه على الخريطة:</div>
        <ul style="margin:0 0 10px 0;padding-right:18px">
          ${safeActionRows || '<li>تم تحديد الموقع المرجعي ورسمه على الخريطة.</li>'}
        </ul>

        <div style="font-weight:bold;margin:8px 0 4px">الإجابة الوصفية:</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:9px;max-height:230px;overflow:auto">
          ${escapeHtml(answer).replace(/\n/g, '<br>')}
        </div>
      </div>
    `;
  }

  function ai2AddReferenceAnswerMarker(center, title, popupHtml, rows = []) {
    const geometry = ai2PointGeometry(center);
    if (!geometry) return null;

    addAiGraphic(new Graphic({
      geometry,
      attributes: { title: 'هالة الموقع المرجعي', kind: 'reference-halo' },
      symbol: {
        type: 'simple-marker',
        style: 'circle',
        size: 56,
        color: [37, 99, 235, 0.16],
        outline: { color: [37, 99, 235, 0.95], width: 3 }
      }
    }));

    addAiGraphic(new Graphic({
      geometry,
      attributes: { title: 'حلقة تأكيد الموقع المرجعي', kind: 'reference-ring' },
      symbol: {
        type: 'simple-marker',
        style: 'circle',
        size: 36,
        color: [255, 255, 255, 0.0],
        outline: { color: [245, 158, 11, 0.98], width: 4 }
      }
    }));

    const graphic = addAiGraphic(new Graphic({
      geometry,
      attributes: { title, kind: 'reference-answer' },
      symbol: {
        type: 'simple-marker',
        style: 'circle',
        size: 26,
        color: [37, 99, 235, 1],
        outline: { color: [255, 255, 255, 1], width: 5 }
      },
      popupTemplate: {
        title: 'جواب مساعد الخارطة السياحية الذكية',
        content: popupHtml || aiPopupTable(rows)
      }
    }));

    addAiGraphic(new Graphic({
      geometry,
      attributes: { title, kind: 'reference-label' },
      symbol: {
        type: 'text',
        text: '📍 ' + title,
        color: [15, 23, 42, 1],
        haloColor: [255, 255, 255, 1],
        haloSize: 2.5,
        yoffset: 42,
        font: { family: 'Tajawal', size: 12, weight: 'bold' }
      }
    }));

    if (graphic) {
      const safeRows = Array.isArray(rows) ? rows : [];
      const resultIndex = state.aiResultItems.push({ title, kind: 'reference', rows: safeRows, center, graphic }) - 1;
      graphic.attributes = { ...(graphic.attributes || {}), aiResultIndex: resultIndex };
    }

    return graphic;
  }

  function ai2OpenAnswerIdentifyPopup(graphic) {
    if (!graphic || !view) return false;
    try {
      if (view.popup) {
        view.popup.dockEnabled = true;
        view.popup.dockOptions = {
          buttonEnabled: true,
          breakpoint: false,
          position: 'bottom-right'
        };
        if (view.popup.open) {
          view.popup.open({ features: [graphic], location: graphic.geometry });
          return true;
        }
      }
      if (view.openPopup) {
        view.openPopup({ features: [graphic], location: graphic.geometry });
        return true;
      }
    } catch (e) {
      console.warn('تعذر فتح جواب المساعد داخل شاشة Identify:', e);
    }
    return false;
  }

  async function askAiAssistantV2() {
    const question = els.aiQuestionInput?.value.trim() || '';

    // عند التنفيذ يجب أن تظهر لوحة المساعد ولا تبقى مصغرة حتى لا تختفي الإجابة.
    els.aiAssistantPanel?.classList.remove('hidden');
    els.aiAssistantPanel?.classList.remove('minimized');
    els.aiAssistantPanel?.setAttribute('aria-hidden', 'false');
    state.aiPanelMinimized = false;
    applyAiPanelMapPadding();

    if (!question) {
      if (els.aiAnswerBox) {
        els.aiAnswerBox.innerHTML = '<strong>اكتب سؤالاً أولاً.</strong><br>مثال: حلل البنية التحتية حول جبل القلعة ضمن 5 كم.';
      }
      return;
    }

    if (els.aiAnswerBox) {
      els.aiAnswerBox.classList.add('loading');
      els.aiAnswerBox.textContent = 'جاري تحليل السؤال ورسم النتائج وفتح جواب Identify...';
    }

    try {
      clearAiMapResults();
      ensureAiResultsLayerVisible();

      const parsed = ai2ParseQuestion(question);
      const ref = ai2ResolveReference(question, parsed);

      if (!ref) {
        const msg = 'لم أتمكن من تحديد موقع واضح داخل بيانات الخريطة. اكتب السؤال بصيغة مثل: "اعرض الفنادق القريبة من جبل القلعة ضمن 5 كم" أو "حلل البنية التحتية في عجلون".';
        if (els.aiAnswerBox) {
          els.aiAnswerBox.innerHTML = '<div class="ai-local-badge">لم يتم تحديد الموقع</div><div class="ai-answer-text">' + escapeHtml(msg) + '</div>';
        }
        return;
      }

      ai2SetLayerToggles([ref.layerKey, ...parsed.requestedLayers]);

      // 1) نطاق التحليل أولاً حتى يبقى خلف النتائج.
      ai2AddBuffer(ref.center, parsed.radiusKm);

      const layerSummaries = [];
      const actions = [
        `تم تحديد ${ref.name} كموقع مرجعي للسؤال.`,
        `تم رسم نطاق التحليل ${parsed.radiusKm} كم حول الموقع المرجعي.`
      ];

      // 2) نتائج الطبقات القريبة.
      for (const layerKey of parsed.requestedLayers) {
        if (layerKey === 'highway' || layerKey === 'contour') {
          layerSummaries.push({
            layerKey,
            label: ai2LayerLabel(layerKey),
            count: 0,
            countText: 'تم تفعيل الطبقة، دون تحويلها إلى نقاط كثيرة لتفادي تعليق المتصفح'
          });
          actions.push(`تم تفعيل ${ai2LayerLabel(layerKey)} بشكل آمن.`);
          continue;
        }

        const nearby = ai2NearbyLayer(ref.center, layerKey, parsed.radiusKm, 18);
        nearby.forEach(item => {
          ai2AddMarker(item.center, item.name, 'result', [
            ['الاسم', item.name],
            ['الطبقة', ai2LayerLabel(layerKey)],
            ['المسافة عن الموقع المرجعي', `${item.distanceKm.toFixed(2)} كم`],
            ['سبب الظهور', 'نتيجة قريبة ضمن نطاق السؤال']
          ]);
        });

        layerSummaries.push({
          layerKey,
          label: ai2LayerLabel(layerKey),
          count: nearby.length,
          countText: `${nearby.length} نتيجة ضمن النطاق`
        });
        actions.push(`تم عرض ${nearby.length} نتيجة من ${ai2LayerLabel(layerKey)}.`);
      }

      // 3) اقتراح مكاني عند أسئلة الاستثمار أو الفعاليات.
      let suggestion = null;
      if (parsed.intent === 'investment' || parsed.intent === 'events') {
        suggestion = ai2ChooseSuggestion(ref.center, parsed.intent, parsed.radiusKm);
        if (suggestion) {
          const title = parsed.intent === 'events' ? 'موقع فعالية مقترح' : 'موقع استثمار/خدمة مقترح';
          ai2AddMarker(suggestion.point, title, parsed.intent === 'events' ? 'event' : 'investment', [
            ['الموقع المرجعي', ref.name],
            ['درجة الملاءمة الأولية', `${suggestion.score}%`],
            ['فنادق ضمن 5 كم', suggestion.hotels],
            ['مطاعم ضمن 2 كم', suggestion.restaurants],
            ['مبرر أولي', parsed.intent === 'events' ? 'قرب نسبي من خدمات داعمة للفعالية' : 'قرب من الطلب مع إمكانية معالجة فجوة خدمة']
          ]);
          ai2AddLabel(suggestion.point, `${title} (${suggestion.score}%)`, parsed.intent === 'events' ? 'event' : 'investment');
          const line = ai2LineGeometry([ref.center, suggestion.point]);
          if (line) {
            addAiGraphic(new Graphic({
              geometry: line,
              symbol: { type: 'simple-line', color: [124, 58, 237, 0.8], width: 3, style: 'short-dash' }
            }));
          }
          actions.push(`تم اقتراح نقطة ${parsed.intent === 'events' ? 'للفعالية' : 'للاستثمار/الخدمة'} وربطها بالموقع المرجعي.`);
        }
      }

      updateAiContextSummaryFromReference({ title: ref.name, layerKey: ref.layerKey, center: ref.center });

      const answer = ai2ResultAnswer(question, parsed, ref, layerSummaries, actions, suggestion);
      const answerPopupHtml = ai2BuildAnswerIdentifyPopup(question, parsed, ref, layerSummaries, actions, answer, suggestion);

      // 4) الموقع المرجعي يرسم في النهاية وبشكل كبير وواضح، ويحمل جواب السؤال داخل Identify.
      const referenceAnswerGraphic = ai2AddReferenceAnswerMarker(ref.center, ref.name, answerPopupHtml, [
        ['نوع النتيجة', 'جواب السؤال داخل شاشة Identify'],
        ['السؤال', question],
        ['الموقع المرجعي', ref.name],
        ['الطبقة المرجعية', ai2LayerLabel(ref.layerKey)],
        ['نطاق التحليل', `${parsed.radiusKm} كم`],
        ['الإحداثيات', `${Number(ref.center[1]).toFixed(6)}, ${Number(ref.center[0]).toFixed(6)}`]
      ]);

      const actionList = actions.map(a => '<li>' + escapeHtml(a) + '</li>').join('');
      const identifyHtml = ai2IdentifyResultsHtml(30);

      if (els.aiAnswerBox) {
        els.aiAnswerBox.innerHTML = '<div class="ai-local-badge">تم رسم النتائج وفتح جواب السؤال داخل Identify</div>'
          + '<div class="ai-map-actions"><strong>تم التنفيذ:</strong><ul>' + actionList + '</ul></div>'
          + '<div class="ai-warning-box">النافذة المفتوحة على الخريطة هي جواب المساعد الكامل، وليست فقط تعريف الموقع.</div>'
          + identifyHtml
          + '<div class="ai-answer-text">' + escapeHtml(answer).replace(/\n/g, '<br>') + '</div>';
      }

      ai2GoTo(ref.center, parsed.radiusKm).then((ok) => {
        ai2OpenAnswerIdentifyPopup(referenceAnswerGraphic);
        if (!ok && els.aiAnswerBox) {
          els.aiAnswerBox.innerHTML += '<div class="ai-warning-box">تم رسم النتائج وفتح الجواب، لكن تعذر تحريك الخريطة تلقائياً. استخدم زر تكبير على هذه النتيجة من بطاقات النتائج.</div>';
        }
      });
    } catch (error) {
      console.error('AI Assistant V2 failed:', error);
      if (els.aiAnswerBox) {
        els.aiAnswerBox.innerHTML = '<strong>تعذر تنفيذ السؤال.</strong><br>' + escapeHtml(error?.message || String(error));
      }
    } finally {
      els.aiAnswerBox?.classList.remove('loading');
    }
  }

  async function askAiAssistant() {
    return askAiAssistantV2();
  }



  const archPopupTemplate = {
    title: '{site_name_ar}',
    content: function(event) {
      const graphic = event?.graphic;
      return renderArchOfficialPopup(graphic?.attributes || {}, graphic?.geometry || null);
    }
  };

  const hotelsRenderer = {
    type: 'simple',
    symbol: iconSymbol('🏨', '#7c3aed', 23)
  };

  const hotelLabelClass = {
    labelExpressionInfo: { expression: '$feature.hotel_name_ar' },
    symbol: { type: 'text', color: '#4c1d95', haloColor: '#ffffff', haloSize: 1.8, font: { size: 8, family: 'Tajawal', weight: 'bold' } },
    labelPlacement: 'above-center',
    deconflictionStrategy: 'static'
  };

  const hotelsPopupTemplate = {
    title: '{hotel_name_ar}',
    content: [{
      type: 'fields',
      fieldInfos: [
        { fieldName: 'hotel_name_ar', label: 'اسم الفندق بالعربي' },
        { fieldName: 'hotel_name_en', label: 'اسم الفندق بالإنجليزي' },
        { fieldName: 'governorate_ar', label: 'المحافظة' },
        { fieldName: 'destination_ar', label: 'الوجهة' },
        { fieldName: 'facility_type_ar', label: 'نوع المنشأة' },
        { fieldName: 'classification_ar', label: 'التصنيف' },
        { fieldName: 'phone', label: 'الهاتف' },
        { fieldName: 'email', label: 'البريد الإلكتروني' },
        { fieldName: 'website', label: 'الموقع الإلكتروني' },
        { fieldName: 'address_ar', label: 'العنوان' }
      ]
    }]
  };


  const restaurantsRenderer = {
    type: 'simple',
    symbol: iconSymbol('🍴', '#f97316', 22)
  };

  const restaurantLabelClass = {
    labelExpressionInfo: { expression: '$feature.restaurant_name_ar' },
    symbol: { type: 'text', color: '#7c2d12', haloColor: '#ffffff', haloSize: 1.8, font: { size: 8, family: 'Tajawal', weight: 'bold' } },
    labelPlacement: 'above-center',
    deconflictionStrategy: 'static'
  };

  const restaurantsPopupTemplate = {
    title: '{restaurant_name_ar}',
    content: [{
      type: 'fields',
      fieldInfos: [
        { fieldName: 'restaurant_name_ar', label: 'اسم المطعم' },
        { fieldName: 'restaurant_name_en', label: 'الاسم الإنجليزي' },
        { fieldName: 'area_ar', label: 'المنطقة' },
        { fieldName: 'facility_type_ar', label: 'النوع' },
        { fieldName: 'cuisine_ar', label: 'نوع المطبخ' },
        { fieldName: 'phone', label: 'الهاتف' },
        { fieldName: 'email', label: 'البريد الإلكتروني' },
        { fieldName: 'website', label: 'الموقع الإلكتروني' },
        { fieldName: 'address_ar', label: 'العنوان' },
        { fieldName: 'official_match', label: 'مطابق مع مصدر رسمي' }
      ]
    }]
  };
  const liwaPopupTemplate = { title: '{liwa_name_ar}', content: [{ type: 'fields', fieldInfos: [{ fieldName: 'liwa_name_ar', label: 'اسم اللواء' }, { fieldName: 'liwa_code', label: 'كود اللواء' }, { fieldName: 'osm_id', label: 'المعرّف المكاني' }] }] };
  const railPopupTemplate = { title: '{rail_name_ar}', content: [{ type: 'fields', fieldInfos: [{ fieldName: 'rail_name_ar', label: 'اسم السكة' }, { fieldName: 'rail_name_en', label: 'الاسم الإنجليزي' }, { fieldName: 'railway_type', label: 'نوع السكة' }, { fieldName: 'gauge', label: 'عرض السكة' }] }] };
  const highwayPopupTemplate = { title: '{road_name_ar}', content: [{ type: 'fields', fieldInfos: [{ fieldName: 'road_name_ar', label: 'اسم الطريق بالعربي' }, { fieldName: 'ref', label: 'رقم الطريق' }, { fieldName: 'highway_type_ar', label: 'تصنيف الطريق بالعربي' }, { fieldName: 'osm_id', label: 'المعرّف المكاني' }] }] };
  const fiberPopupTemplate = { title: '{fiber_name_ar}', content: [{ type: 'fields', fieldInfos: [{ fieldName: 'fiber_name_ar', label: 'اسم الموقع بالعربي' }, { fieldName: 'layer_label', label: 'اسم الطبقة' }, { fieldName: 'department', label: 'الجهة / المنطقة' }, { fieldName: 'connection_id', label: 'معرّف الاتصال' }, { fieldName: 'active', label: 'الحالة' }] }] };
  const masarPopupTemplate = {
    title: '{masar_title}',
    content: function(event) {
      const graphic = event?.graphic;
      return renderMasarOfficialPopup(graphic?.attributes || {}, graphic?.geometry || null);
    }
  };
  const contourPopupTemplate = { title: '{contour_name}', content: [{ type: 'fields', fieldInfos: [{ fieldName: 'elev', label: 'الارتفاع / متر', format: { digitSeparator: true, places: 0 } }, { fieldName: 'contour_type_ar', label: 'تصنيف الخط' }] }] };

  function svgIconDataUrl(iconKey, bgColor, ringColor = '#ffffff') {
    // إصلاح جذري: لا نعتمد على Emoji داخل SVG لأن ArcGIS/Canvas قد يعرضها كدبابيس أو نقاط افتراضية.
    // لذلك نرسم أيقونات SVG حقيقية لكل نوع طبقة نقطية.
    const icons = {
      hotel: '<rect x="16" y="29" width="32" height="13" rx="3" fill="white"/><rect x="16" y="22" width="9" height="9" rx="2" fill="white"/><path d="M16 42v6M48 42v6M25 31h23" stroke="white" stroke-width="4" stroke-linecap="round"/>',
      restaurant: '<path d="M20 17v16M16 17v16M24 17v16M16 31h8M20 33v15" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M42 17c-6 5-7 13-3 18l3 3v10" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      arch: '<path d="M16 45h32M19 39h26M21 24h22M18 24l14-8 14 8M23 25v14M32 25v14M41 25v14" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      school: '<path d="M14 27l18-9 18 9-18 9-18-9z" fill="white"/><path d="M22 33v8c6 4 14 4 20 0v-8" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M49 28v12" stroke="white" stroke-width="4" stroke-linecap="round"/>',
      health: '<path d="M28 15h8v13h13v8H36v13h-8V36H15v-8h13z" fill="white"/>',
      gov: '<path d="M16 45h32M19 40h26M20 25h24M18 25l14-9 14 9M23 26v13M32 26v13M41 26v13" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      education: '<path d="M15 25l17-8 17 8-17 8-17-8z" fill="white"/><path d="M21 32v9c7 5 15 5 22 0v-9" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      city: '<path d="M18 45V25h9v20M29 45V18h12v27M43 45V29h6v16M15 45h37" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      town: '<path d="M16 45V31l10-8 10 8v14M36 45V27l7-5 7 5v18M14 45h38" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      place: '<path d="M32 49s14-14 14-25a14 14 0 0 0-28 0c0 11 14 25 14 25z" fill="white"/><circle cx="32" cy="24" r="5" fill="${bgColor}"/>',
      default: '<circle cx="32" cy="32" r="10" fill="white"/>'
    };
    const body = icons[iconKey] || icons.default;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="${bgColor}" stroke="${ringColor}" stroke-width="5"/>
        <circle cx="32" cy="32" r="22" fill="rgba(255,255,255,0.12)"/>
        ${body}
      </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function iconSymbol(iconKey, bgColor, size = 22, yoffset = 0) {
    const keyMap = {
      '🏨': 'hotel', '🍴': 'restaurant', '🏛️': 'arch', '🏫': 'school', '🏥': 'health',
      '🏢': 'gov', '🎓': 'education', '🏙️': 'city', '🏘️': 'town', '📍': 'place'
    };
    const normalizedKey = keyMap[iconKey] || iconKey || 'default';
    return {
      type: 'picture-marker',
      url: svgIconDataUrl(normalizedKey, bgColor),
      width: size,
      height: size,
      yoffset
    };
  }

  function clusterReduction(clusterColor = '#0f766e') {
    return {
      type: 'cluster',
      clusterRadius: '72px',
      popupEnabled: true,
      popupTemplate: {
        title: 'تجميع عناصر',
        content: 'يحتوي هذا التجميع على {cluster_count} عنصر. قم بالتكبير لعرض العناصر منفردة.'
      },
      labelingInfo: [{
        deconflictionStrategy: 'none',
        labelExpressionInfo: { expression: "Text($feature.cluster_count, '#,###')" },
        symbol: {
          type: 'text',
          color: 'white',
          haloColor: clusterColor,
          haloSize: 1.5,
          font: { size: 11, family: 'Tajawal', weight: 'bold' }
        },
        labelPlacement: 'center-center'
      }],
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          style: 'circle',
          color: clusterColor,
          size: 24,
          outline: { color: [255, 255, 255, 0.95], width: 2 }
        }
      }
    };
  }

  const govLayer = new GeoJSONLayer({
    title: 'المحافظات',
    url: govUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: !!els.toggleGov.checked,
    popupEnabled: true,
    popupTemplate: govPopupTemplate,
    labelsVisible: state.labelPrefs.gov,
    renderer: buildGovRenderer('national'),
    labelingInfo: [govLabelClass]
  });

  const liwaLayer = new GeoJSONLayer({ title: 'الألوية', url: liwaUrl, objectIdField: 'OBJECTID', outFields: ['*'], visible: false, minScale: SCALE_THRESHOLDS.liwaVisible, maxScale: 0, popupEnabled: true, popupTemplate: liwaPopupTemplate, labelsVisible: false, renderer: { type: 'simple', symbol: { type: 'simple-fill', color: [255, 255, 255, 0.04], outline: { color: '#2563eb', width: 0.8 } } }, labelingInfo: [liwaLabelClass] });
  const railLayer = new GeoJSONLayer({ title: 'السكك الحديدية', url: railUrl, objectIdField: 'OBJECTID', outFields: ['*'], visible: false, minScale: SCALE_THRESHOLDS.railVisible, maxScale: 0, popupEnabled: true, popupTemplate: railPopupTemplate, labelsVisible: false, renderer: { type: 'simple', symbol: { type: 'simple-line', color: '#374151', width: 2.2, style: 'dash' } }, labelingInfo: [railLabelClass] });
  const highwayLayer = new GeoJSONLayer({ title: 'الطرق', url: highwayUrl, objectIdField: 'OBJECTID', outFields: ['*'], visible: false, minScale: SCALE_THRESHOLDS.highwayVisible, maxScale: 0, popupEnabled: true, popupTemplate: highwayPopupTemplate, labelsVisible: false, renderer: { type: 'unique-value', field: 'highway_type', defaultSymbol: { type: 'simple-line', color: '#8b5e3c', width: 0.8 }, uniqueValueInfos: [{ value: 'motorway', symbol: { type: 'simple-line', color: '#c2410c', width: 2.3 } }, { value: 'trunk', symbol: { type: 'simple-line', color: '#c2410c', width: 2.1 } }, { value: 'primary', symbol: { type: 'simple-line', color: '#e09f3e', width: 1.8 } }, { value: 'secondary', symbol: { type: 'simple-line', color: '#8b5e3c', width: 1.3 } }, { value: 'tertiary', symbol: { type: 'simple-line', color: '#a16207', width: 1.05 } }, { value: 'residential', symbol: { type: 'simple-line', color: '#7c8aa5', width: 0.55 } }, { value: 'service', symbol: { type: 'simple-line', color: '#94a3b8', width: 0.45, style: 'short-dot' } }, { value: 'track', symbol: { type: 'simple-line', color: '#64748b', width: 0.45, style: 'dash' } }] }, labelingInfo: [highwayLabelClass] });

  const majorPlacesLayer = new GeoJSONLayer({
    title: 'المدن الرئيسية',
    url: majorPlacesUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: false,
    popupEnabled: true,
    popupTemplate: majorPlacePopupTemplate,
    minScale: SCALE_THRESHOLDS.majorPlacesVisible,
    maxScale: 0,
    labelsVisible: false,
    renderer: {
      type: 'unique-value',
      field: 'settlement_type',
      defaultSymbol: iconSymbol('📍', '#7c3aed', 19),
      uniqueValueInfos: [
        { value: 'city', symbol: iconSymbol('🏙️', '#b91c1c', 24) },
        { value: 'town', symbol: iconSymbol('🏘️', '#7c3aed', 21) }
      ]
    },
    labelingInfo: [majorCityLabelClass]
  });

  const detailPlacesLayer = new GeoJSONLayer({
    title: 'التجمعات المحلية',
    url: detailPlacesUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: false,
    popupEnabled: true,
    popupTemplate: detailPlacePopupTemplate,
    minScale: SCALE_THRESHOLDS.detailPlacesVisible,
    maxScale: 0,
    featureReduction: clusterReduction('#0f766e'),
    labelsVisible: false,
    renderer: {
      type: 'simple',
      symbol: iconSymbol('📍', '#0f766e', 17)
    },
    labelingInfo: [detailPlaceLabelClass]
  });

  const archLayer = new GeoJSONLayer({
    title: 'المواقع الأثرية',
    url: archUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: false,
    popupEnabled: true,
    popupTemplate: archPopupTemplate,
    minScale: SCALE_THRESHOLDS.archVisible,
    maxScale: 0,
    featureReduction: clusterReduction('#b45309'),
    labelsVisible: false,
    renderer: {
      type: 'simple',
      symbol: iconSymbol('🏛️', '#b45309', 24)
    },
    labelingInfo: [archLabelClass]
  });

  const hotelsLayer = new GeoJSONLayer({
    title: 'الفنادق ومنشآت الإيواء',
    url: hotelsUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: false,
    popupEnabled: true,
    popupTemplate: hotelsPopupTemplate,
    minScale: SCALE_THRESHOLDS.hotelsVisible,
    maxScale: 0,
    featureReduction: clusterReduction('#7c3aed'),
    labelsVisible: false,
    renderer: hotelsRenderer,
    labelingInfo: [hotelLabelClass]
  });


  const restaurantsLayer = new GeoJSONLayer({
    title: 'المطاعم وخدمات الطعام',
    url: restaurantsUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: false,
    popupEnabled: true,
    popupTemplate: restaurantsPopupTemplate,
    minScale: SCALE_THRESHOLDS.restaurantsVisible,
    maxScale: 0,
    featureReduction: clusterReduction('#f97316'),
    labelsVisible: false,
    renderer: restaurantsRenderer,
    labelingInfo: [restaurantLabelClass]
  });
  function buildFiberLayer(title, url, emoji, color, size = 21, minScale = 90000) {
    return new GeoJSONLayer({
      title,
      url,
      objectIdField: 'OBJECTID',
      outFields: ['*'],
      visible: false,
      minScale,
      maxScale: 0,
      featureReduction: clusterReduction(color),
      popupEnabled: true,
      popupTemplate: fiberPopupTemplate,
      labelsVisible: false,
      renderer: { type: 'simple', symbol: iconSymbol(emoji, color, size) },
      labelingInfo: [fiberLabelClass]
    });
  }
  const fiberEduLayer = buildFiberLayer('مديريات التربية', fiberEduUrl, '🎓', '#0ea5e9', 22, SCALE_THRESHOLDS.fiberEduVisible);
  const fiberGovLayer = buildFiberLayer('الجهات الحكومية', fiberGovUrl, '🏢', '#ef4444', 22, SCALE_THRESHOLDS.fiberGovVisible);
  const fiberHealthLayer = buildFiberLayer('المؤسسات الصحية', fiberHealthUrl, '🏥', '#10b981', 23, SCALE_THRESHOLDS.fiberHealthVisible);
  const fiberSchoolsLayer = buildFiberLayer('المدارس', fiberSchoolsUrl, '🏫', '#8b5cf6', 19, SCALE_THRESHOLDS.fiberSchoolsVisible);
  const masarLayer = new GeoJSONLayer({ title: 'مسار درب الأردن', url: masarUrl, objectIdField: 'OBJECTID', outFields: ['*'], visible: false, minScale: SCALE_THRESHOLDS.masarVisible, maxScale: 0, popupEnabled: true, popupTemplate: masarPopupTemplate, labelsVisible: false, renderer: { type: 'simple', symbol: { type: 'simple-line', color: '#0f766e', width: 3.2 } }, labelingInfo: [masarLabelClass] });
  const contourLayer = new GeoJSONLayer({
    title: 'خطوط الكنتور',
    url: contourUrl,
    objectIdField: 'OBJECTID',
    outFields: ['*'],
    visible: false,
    minScale: SCALE_THRESHOLDS.contourVisible,
    maxScale: 0,
    popupEnabled: true,
    popupTemplate: contourPopupTemplate,
    labelsVisible: false,
    renderer: {
      type: 'unique-value',
      field: 'contour_type',
      uniqueValueInfos: [
        { value: 'major', label: 'كنتور رئيسي', symbol: { type: 'simple-line', color: '#475569', width: 1.15 } },
        { value: 'zero', label: 'منسوب صفر', symbol: { type: 'simple-line', color: '#0f766e', width: 1.35 } },
        { value: 'minor', label: 'كنتور فرعي', symbol: { type: 'simple-line', color: '#94a3b8', width: 0.55 } }
      ],
      defaultSymbol: { type: 'simple-line', color: '#94a3b8', width: 0.55 }
    },
    labelingInfo: [contourLabelClass]
  });

  const aerialImageryLayer = new TileLayer({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
    title: 'صور جوية — Esri World Imagery',
    visible: false,
    listMode: 'hide',
    opacity: 1
  });

  const aiResultsLayer = new GraphicsLayer({
    title: 'نتائج مساعد الخارطة السياحية الذكية',
    listMode: 'hide',
    visible: true
  });
  state.aiResultsLayer = aiResultsLayer;

  const importedLayer = new GraphicsLayer({
    title: 'الملفات المرفوعة GPX / KML / GeoJSON / Shapefile',
    listMode: 'show',
    visible: true
  });
  const editLayer = new GraphicsLayer({
    title: 'طبقة تحرير مؤقتة',
    listMode: 'hide',
    visible: true
  });
  state.importedLayer = importedLayer;
  state.editLayer = editLayer;

  const map = new Map({
    basemap: null,
    layers: [aerialImageryLayer, contourLayer, govLayer, liwaLayer, railLayer, highwayLayer, majorPlacesLayer, detailPlacesLayer, fiberEduLayer, fiberGovLayer, fiberHealthLayer, fiberSchoolsLayer, masarLayer, archLayer, hotelsLayer, restaurantsLayer, importedLayer, editLayer, aiResultsLayer]
  });

  const OSM_BUILDINGS_2D_ASIA_ITEM_ID = 'efcea3961e8e417aae1f341b397684a2';
  const OSM_BUILDINGS_3D_ITEM_ID = 'ca0470dbbddb4db28bad74ed39949e25';
  const BUILDING_LAYER_INSERT_INDEX = 1;

  const buildings2dLayer = new FeatureLayer({
    portalItem: { id: OSM_BUILDINGS_2D_ASIA_ITEM_ID },
    layerId: 0,
    title: 'مباني OSM ثنائية الأبعاد — Esri / آسيا',
    visible: false,
    listMode: 'hide',
    popupEnabled: true,
    outFields: ['*'],
    minScale: 50000,
    maxScale: 0,
    opacity: 0.82,
    popupTemplate: {
      title: 'مبنى',
      content: 'بصمة مبنى من طبقة OpenStreetMap Buildings for Asia المستضافة على ArcGIS Online.'
    },
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-fill',
        color: [255, 255, 255, 0.03],
        outline: { color: [255, 255, 255, 0.72], width: 0.55 }
      }
    }
  });

  const buildings3dLayer = new SceneLayer({
    portalItem: { id: OSM_BUILDINGS_3D_ITEM_ID },
    title: 'مباني OSM ثلاثية الأبعاد — Esri',
    visible: false,
    listMode: 'hide',
    popupEnabled: true,
    minScale: 180000,
    maxScale: 0,
    elevationInfo: {
      mode: 'absolute-height',
      offset: 6
    }
  });

  let hillshadeLayer = null;

  try {
    if (elevationGrid?.bounds && Array.isArray(elevationGrid.bounds)) {
      const [MediaLayer, ImageElement, ExtentAndRotationGeoreference] = await $arcgis.import([
        '@arcgis/core/layers/MediaLayer.js',
        '@arcgis/core/layers/support/ImageElement.js',
        '@arcgis/core/layers/support/ExtentAndRotationGeoreference.js'
      ]);
      const b = elevationGrid.bounds;
      hillshadeLayer = new MediaLayer({
        title: 'التضاريس Hillshade',
        visible: false,
        opacity: 0.42,
        source: [new ImageElement({
          image: 'data/hillshade.png',
          georeference: new ExtentAndRotationGeoreference({
            extent: new Extent({ xmin: b[0], ymin: b[1], xmax: b[2], ymax: b[3], spatialReference: { wkid: 4326 } })
          })
        })]
      });
      map.add(hillshadeLayer, 0);
    }
  } catch (e) {
    console.warn('Hillshade MediaLayer was not loaded; vector layers remain available.', e);
  }

  const initialExtentBounds = computeExtent(govFC.features);

  // مهم جدًا: طبقات الصور الجوية من Esri تعمل ببلاطات Web Mercator.
  // لذلك نُنشئ العرض 2D على WKID 102100، ثم تُعاد إسقاط طبقات GeoJSON تلقائيًا.
  // السبب السابق لعدم ظهور الصور الجوية: الخريطة كانت تبدأ بامتداد WGS84 بدون basemap،
  // فتتعطل/تُعلّق طبقات البلاطات المتوافقة مع Web Mercator.
  state.fullExtent4326 = new Extent({
    xmin: initialExtentBounds.xmin - 0.18,
    ymin: initialExtentBounds.ymin - 0.12,
    xmax: initialExtentBounds.xmax + 0.18,
    ymax: initialExtentBounds.ymax + 0.12,
    spatialReference: { wkid: 4326 }
  });
  state.fullExtent = webMercatorUtils.geographicToWebMercator(state.fullExtent4326) || state.fullExtent4326.clone();

  const mapElement = els.mapElement;
  const sceneElement = els.sceneElement;
  mapElement.map = map;
  mapElement.spatialReference = { wkid: 102100 };
  mapElement.extent = state.fullExtent.clone();
  mapElement.popupComponentEnabled = true;
  mapElement.background = { color: '#eef3f8' };

  if (sceneElement) {
    sceneElement.map = map;
    sceneElement.popupComponentEnabled = true;
    sceneElement.background = { color: '#dbeafe' };
  }

  await mapElement.viewOnReady();
  const mapView = mapElement.view;
  let sceneView = null;
  let view = mapView;



  function setEditStatus(message, tone = 'info') {
    if (!els.editStatusBox) return;
    els.editStatusBox.textContent = message || '';
    els.editStatusBox.classList.toggle('hidden', !message);
    els.editStatusBox.dataset.tone = tone;
  }

  function updateEditButtons() {
    const hasSelection = !!state.selectedGraphic;
    const editing = !!state.editWorkingGraphic;
    const showEditTools = hasSelection || editing;
    [els.editSelectedBtn, els.saveEditBtn, els.cancelEditBtn].forEach(btn => btn?.classList.toggle('hidden', !showEditTools));
    if (els.editSelectedBtn) els.editSelectedBtn.disabled = !hasSelection || editing;
    if (els.saveEditBtn) els.saveEditBtn.disabled = !editing;
    if (els.cancelEditBtn) els.cancelEditBtn.disabled = !editing;
  }

  function editableSymbolForGeometry(type, imported = true) {
    if (type === 'point') {
      return { type: 'simple-marker', style: 'circle', size: imported ? 11 : 13, color: [14, 165, 233, 0.95], outline: { color: [255, 255, 255, 1], width: 2 } };
    }
    if (type === 'polyline') {
      return { type: 'simple-line', color: imported ? [14, 165, 233, 0.95] : [22, 163, 74, 0.95], width: imported ? 4 : 5 };
    }
    if (type === 'polygon') {
      return { type: 'simple-fill', color: imported ? [14, 165, 233, 0.14] : [22, 163, 74, 0.16], outline: { color: imported ? [14, 165, 233, 1] : [22, 163, 74, 1], width: 3 } };
    }
    return { type: 'simple-marker', size: 10, color: [14, 165, 233, 0.9], outline: { color: [255, 255, 255, 1], width: 2 } };
  }

  function parseCoordinateText(text) {
    return String(text || '').trim().split(/\s+/).map(part => {
      const [lon, lat, z] = part.split(',').map(Number);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
      return Number.isFinite(z) ? [lon, lat, z] : [lon, lat];
    }).filter(Boolean);
  }

  function xmlFirstText(node, tag) {
    return node.getElementsByTagName(tag)?.[0]?.textContent?.trim() || '';
  }

  function graphicsFromKml(xml, fileName) {
    const graphics = [];
    const placemarks = Array.from(xml.getElementsByTagName('Placemark'));
    placemarks.forEach((pm, idx) => {
      const name = xmlFirstText(pm, 'name') || `KML Feature ${idx + 1}`;
      const baseAttrs = { name, file_name: fileName, source_format: 'KML', edit_status: 'قابل للتعديل' };
      const point = pm.getElementsByTagName('Point')?.[0];
      const line = pm.getElementsByTagName('LineString')?.[0];
      const polygon = pm.getElementsByTagName('Polygon')?.[0];
      if (point) {
        const coords = parseCoordinateText(xmlFirstText(point, 'coordinates'));
        if (coords[0]) graphics.push(new Graphic({ geometry: { type: 'point', longitude: coords[0][0], latitude: coords[0][1], spatialReference: { wkid: 4326 } }, attributes: { ...baseAttrs, OBJECTID: Date.now() + idx }, symbol: editableSymbolForGeometry('point') }));
      } else if (line) {
        const path = parseCoordinateText(xmlFirstText(line, 'coordinates'));
        if (path.length > 1) graphics.push(new Graphic({ geometry: { type: 'polyline', paths: [path], spatialReference: { wkid: 4326 } }, attributes: { ...baseAttrs, OBJECTID: Date.now() + idx }, symbol: editableSymbolForGeometry('polyline') }));
      } else if (polygon) {
        const rings = Array.from(polygon.getElementsByTagName('LinearRing')).map(r => parseCoordinateText(xmlFirstText(r, 'coordinates'))).filter(r => r.length > 2);
        if (rings.length) graphics.push(new Graphic({ geometry: { type: 'polygon', rings, spatialReference: { wkid: 4326 } }, attributes: { ...baseAttrs, OBJECTID: Date.now() + idx }, symbol: editableSymbolForGeometry('polygon') }));
      }
    });
    return graphics;
  }

  function graphicsFromGpx(xml, fileName) {
    const graphics = [];
    const now = Date.now();
    Array.from(xml.getElementsByTagName('wpt')).forEach((wpt, idx) => {
      const lon = Number(wpt.getAttribute('lon'));
      const lat = Number(wpt.getAttribute('lat'));
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) return;
      const name = xmlFirstText(wpt, 'name') || `Waypoint ${idx + 1}`;
      graphics.push(new Graphic({ geometry: { type: 'point', longitude: lon, latitude: lat, spatialReference: { wkid: 4326 } }, attributes: { name, file_name: fileName, source_format: 'GPX', edit_status: 'قابل للتعديل', OBJECTID: now + idx }, symbol: editableSymbolForGeometry('point') }));
    });
    Array.from(xml.getElementsByTagName('trk')).forEach((trk, idx) => {
      const paths = Array.from(trk.getElementsByTagName('trkseg')).map(seg => Array.from(seg.getElementsByTagName('trkpt')).map(pt => [Number(pt.getAttribute('lon')), Number(pt.getAttribute('lat'))]).filter(([lon, lat]) => Number.isFinite(lon) && Number.isFinite(lat))).filter(path => path.length > 1);
      const name = xmlFirstText(trk, 'name') || `Track ${idx + 1}`;
      if (paths.length) graphics.push(new Graphic({ geometry: { type: 'polyline', paths, spatialReference: { wkid: 4326 } }, attributes: { name, file_name: fileName, source_format: 'GPX', edit_status: 'قابل للتعديل', OBJECTID: now + 1000 + idx }, symbol: editableSymbolForGeometry('polyline') }));
    });
    Array.from(xml.getElementsByTagName('rte')).forEach((rte, idx) => {
      const path = Array.from(rte.getElementsByTagName('rtept')).map(pt => [Number(pt.getAttribute('lon')), Number(pt.getAttribute('lat'))]).filter(([lon, lat]) => Number.isFinite(lon) && Number.isFinite(lat));
      const name = xmlFirstText(rte, 'name') || `Route ${idx + 1}`;
      if (path.length > 1) graphics.push(new Graphic({ geometry: { type: 'polyline', paths: [path], spatialReference: { wkid: 4326 } }, attributes: { name, file_name: fileName, source_format: 'GPX', edit_status: 'قابل للتعديل', OBJECTID: now + 2000 + idx }, symbol: editableSymbolForGeometry('polyline') }));
    });
    return graphics;
  }

  function arcGeometryFromGeoJsonGeometry(geometry) {
    if (!geometry) return null;
    if (geometry.type === 'Point') return { type: 'point', longitude: geometry.coordinates[0], latitude: geometry.coordinates[1], spatialReference: { wkid: 4326 } };
    if (geometry.type === 'LineString') return { type: 'polyline', paths: [geometry.coordinates], spatialReference: { wkid: 4326 } };
    if (geometry.type === 'MultiLineString') return { type: 'polyline', paths: geometry.coordinates, spatialReference: { wkid: 4326 } };
    if (geometry.type === 'Polygon') return { type: 'polygon', rings: geometry.coordinates, spatialReference: { wkid: 4326 } };
    if (geometry.type === 'MultiPolygon') return { type: 'polygon', rings: geometry.coordinates.flat(), spatialReference: { wkid: 4326 } };
    return null;
  }

  function graphicsFromGeoJson(json, fileName, sourceFormat = 'GeoJSON') {
    const features = json.type === 'FeatureCollection' ? json.features : json.type === 'Feature' ? [json] : [{ type: 'Feature', properties: {}, geometry: json }];
    return features.map((feature, idx) => {
      const geometry = arcGeometryFromGeoJsonGeometry(feature.geometry);
      if (!geometry) return null;
      const name = feature.properties?.name || feature.properties?.Name || feature.properties?.NAME || feature.properties?.title || `${sourceFormat} Feature ${idx + 1}`;
      return new Graphic({ geometry, attributes: { ...(feature.properties || {}), name, file_name: fileName, source_format: sourceFormat, edit_status: 'قابل للتعديل', OBJECTID: Date.now() + idx }, symbol: editableSymbolForGeometry(geometry.type) });
    }).filter(Boolean);
  }

  function normalizeShapefileGeoJson(result) {
    if (!result) return [];
    if (result.type === 'FeatureCollection' || result.type === 'Feature') return [{ name: 'Shapefile', data: result }];
    return Object.entries(result)
      .filter(([, value]) => value && (value.type === 'FeatureCollection' || value.type === 'Feature'))
      .map(([name, data]) => ({ name, data }));
  }

  async function graphicsFromShapefileZip(file) {
    const shpReader = window.shp;
    if (typeof shpReader !== 'function') throw new Error('مكتبة قراءة Shapefile غير محملة. تأكد من الاتصال بالإنترنت أو أضف shp.min.js محليًا.');
    const buffer = await file.arrayBuffer();
    const converted = await shpReader(buffer);
    const collections = normalizeShapefileGeoJson(converted);
    const graphics = [];
    collections.forEach((collection, layerIndex) => {
      const layerGraphics = graphicsFromGeoJson(collection.data, file.name, 'Shapefile');
      layerGraphics.forEach((graphic, idx) => {
        graphic.attributes = { ...(graphic.attributes || {}), shp_layer: collection.name, shp_order: idx + 1, OBJECTID: Date.now() + layerIndex * 100000 + idx };
      });
      graphics.push(...layerGraphics);
    });
    return graphics;
  }

  async function importRouteFile(file) {
    if (!file) return;
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    let graphics = [];
    if (ext === 'zip') {
      graphics = await graphicsFromShapefileZip(file);
    } else {
      const text = await file.text();
      if (ext === 'gpx' || ext === 'gps' || ext === 'kml') {
        const xml = new DOMParser().parseFromString(text, 'application/xml');
        if (xml.querySelector('parsererror')) throw new Error('تعذر قراءة الملف. تأكد أن ملف GPX/KML صحيح.');
        graphics = (ext === 'gpx' || ext === 'gps') ? graphicsFromGpx(xml, file.name) : graphicsFromKml(xml, file.name);
      } else if (ext === 'geojson' || ext === 'json') {
        graphics = graphicsFromGeoJson(JSON.parse(text), file.name, 'GeoJSON');
      } else {
        throw new Error('الصيغة غير مدعومة. استخدم GPX/GPS أو KML أو GeoJSON أو Shapefile بصيغة ZIP.');
      }
    }
    if (!graphics.length) throw new Error('لم يتم العثور على نقاط أو خطوط أو مضلعات قابلة للعرض داخل الملف.');
    importedLayer.addMany(graphics);
    if (els.featureInfo) els.featureInfo.textContent = `تم رفع ${graphics.length} عنصر من الملف ${file.name}.`;
    setEditStatus(`تم رفع ${graphics.length} عنصر من ${file.name}`, 'success');
    const target = graphics.length === 1 ? graphics[0].geometry : graphics.map(g => g.geometry);
    try { await view.goTo({ target, padding: 40 }, { duration: 700, easing: 'ease-in-out' }); } catch (e) {}
    await selectGraphic(graphics[0], 'imported', { goTo: false, openPopup: true });
  }

  function arcGeometryToGeoJson(geometry) {
    if (!geometry) return null;
    const g = geometry.spatialReference?.isWebMercator ? webMercatorUtils.webMercatorToGeographic(geometry) : geometry;
    if (g.type === 'point') return { type: 'Point', coordinates: [Number(g.longitude ?? g.x), Number(g.latitude ?? g.y)] };
    if (g.type === 'polyline') return { type: g.paths?.length > 1 ? 'MultiLineString' : 'LineString', coordinates: g.paths?.length > 1 ? g.paths : (g.paths?.[0] || []) };
    if (g.type === 'polygon') return { type: 'Polygon', coordinates: g.rings || [] };
    return null;
  }

  function escapeXml(value) {
    return String(value ?? '').replace(/[<>&"']/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[ch]));
  }

  function sanitizeExportProperties(attrs = {}) {
    const ignored = new Set(['OBJECTID', 'objectid', 'Shape__Area', 'Shape__Length']);
    const clean = {};
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (!ignored.has(key) && value !== undefined && value !== null && typeof value !== 'object') clean[key] = value;
    });
    return clean;
  }

  function graphicToFeature(graphic, idx) {
    const geometry = arcGeometryToGeoJson(graphic.geometry);
    if (!geometry) return null;
    return { type: 'Feature', properties: { ...sanitizeExportProperties(graphic.attributes || {}), export_order: idx + 1 }, geometry };
  }

  function getCheckedRadioValue(name, fallback) {
    return document.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
  }

  function collectExportGraphics() {
    const scope = getCheckedRadioValue('exportScope', 'all');
    const geomFilter = getCheckedRadioValue('exportGeometryType', 'all');
    let graphics = [];
    if (scope === 'selected') {
      if (state.selectedGraphic?.geometry) graphics = [state.selectedGraphic];
    } else {
      graphics = importedLayer.graphics.toArray();
      if (scope === 'modified') {
        graphics = graphics.filter(g => {
          const status = String(g.attributes?.edit_status || '');
          const format = String(g.attributes?.source_format || '');
          return status.includes('تعديل') || status.includes('معدلة') || format === 'Edited Copy' || !!g.attributes?.source_layer;
        });
      }
    }
    if (scope === 'geometry' && geomFilter === 'all') {
      // في حال اختيار حسب نوع الهندسة دون تحديد نوع، يتم تصدير كل الأنواع بدل إرجاع ملف فارغ.
      return graphics;
    }
    if (geomFilter !== 'all' && (scope === 'geometry' || scope === 'all' || scope === 'modified' || scope === 'selected')) {
      graphics = graphics.filter(g => g.geometry?.type === geomFilter);
    }
    return graphics;
  }

  function buildExportGeoJSON() {
    const graphics = collectExportGraphics();
    const features = graphics.map(graphicToFeature).filter(Boolean);
    return { type: 'FeatureCollection', features };
  }

  function downloadText(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function geoJsonToKml(geojson) {
    const placemarks = geojson.features.map((feature, idx) => {
      const p = feature.properties || {};
      const name = escapeXml(p.name || p.Name || p.NAME || `Feature ${idx + 1}`);
      const description = escapeXml(Object.entries(p).map(([k, v]) => `${k}: ${v}`).join('\n'));
      const geom = feature.geometry;
      const coordText = coords => coords.map(c => `${c[0]},${c[1]}${Number.isFinite(c[2]) ? ',' + c[2] : ''}`).join(' ');
      let geometryXml = '';
      if (geom.type === 'Point') geometryXml = `<Point><coordinates>${coordText([geom.coordinates])}</coordinates></Point>`;
      if (geom.type === 'LineString') geometryXml = `<LineString><coordinates>${coordText(geom.coordinates)}</coordinates></LineString>`;
      if (geom.type === 'MultiLineString') geometryXml = `<MultiGeometry>${geom.coordinates.map(line => `<LineString><coordinates>${coordText(line)}</coordinates></LineString>`).join('')}</MultiGeometry>`;
      if (geom.type === 'Polygon') geometryXml = `<Polygon>${geom.coordinates.map((ring, ringIdx) => ringIdx === 0 ? `<outerBoundaryIs><LinearRing><coordinates>${coordText(ring)}</coordinates></LinearRing></outerBoundaryIs>` : `<innerBoundaryIs><LinearRing><coordinates>${coordText(ring)}</coordinates></LinearRing></innerBoundaryIs>`).join('')}</Polygon>`;
      return `<Placemark><name>${name}</name><description>${description}</description>${geometryXml}</Placemark>`;
    }).join('');
    return `<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Tourism Map Export</name>${placemarks}</Document></kml>`;
  }

  function geoJsonToGpx(geojson) {
    const points = [];
    const tracks = [];
    geojson.features.forEach((feature, idx) => {
      const geom = feature.geometry;
      const name = escapeXml(feature.properties?.name || feature.properties?.Name || `Feature ${idx + 1}`);
      if (geom.type === 'Point') points.push(`<wpt lon="${geom.coordinates[0]}" lat="${geom.coordinates[1]}"><name>${name}</name></wpt>`);
      if (geom.type === 'LineString') tracks.push(`<trk><name>${name}</name><trkseg>${geom.coordinates.map(c => `<trkpt lon="${c[0]}" lat="${c[1]}"></trkpt>`).join('')}</trkseg></trk>`);
      if (geom.type === 'MultiLineString') geom.coordinates.forEach((line, part) => tracks.push(`<trk><name>${name} ${part + 1}</name><trkseg>${line.map(c => `<trkpt lon="${c[0]}" lat="${c[1]}"></trkpt>`).join('')}</trkseg></trk>`));
    });
    return `<?xml version="1.0" encoding="UTF-8"?><gpx version="1.1" creator="Smart Tourism Map" xmlns="http://www.topografix.com/GPX/1/1">${points.join('')}${tracks.join('')}</gpx>`;
  }

  function geoJsonToCsv(geojson) {
    const rows = [['name', 'geometry_type', 'longitude', 'latitude', 'coordinates_json', 'properties_json']];
    geojson.features.forEach((feature, idx) => {
      const geom = feature.geometry;
      const props = feature.properties || {};
      const name = props.name || props.Name || props.NAME || `Feature ${idx + 1}`;
      let lon = '', lat = '', coordsJson = JSON.stringify(geom.coordinates || []);
      if (geom.type === 'Point') { lon = geom.coordinates[0]; lat = geom.coordinates[1]; coordsJson = ''; }
      rows.push([name, geom.type, lon, lat, coordsJson, JSON.stringify(props)]);
    });
    return rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  }

  async function exportImportedGeoJson() {
    const format = getCheckedRadioValue('exportFormat', 'geojson');

    // تصدير الخريطة يستخدم نفس مخرج PNG/PDF السابق، ولا يرتبط بنطاق تصدير البيانات.
    if (format === 'png') {
      await downloadProfessionalPng();
      setEditStatus('تم تصدير الخريطة بصيغة PNG.', 'success');
      return;
    }
    if (format === 'pdf') {
      await downloadProfessionalPdf();
      setEditStatus('تم تصدير الخريطة بصيغة PDF.', 'success');
      return;
    }

    const geojson = buildExportGeoJSON();
    const count = geojson.features.length;
    if (!count) {
      setEditStatus('لا توجد عناصر مطابقة لنطاق التصدير المختار.', 'warning');
      return;
    }
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    if (format === 'geojson') downloadText(JSON.stringify(geojson, null, 2), `tourism-map-export-${stamp}.geojson`, 'application/geo+json;charset=utf-8');
    else if (format === 'kml') downloadText(geoJsonToKml(geojson), `tourism-map-export-${stamp}.kml`, 'application/vnd.google-earth.kml+xml;charset=utf-8');
    else if (format === 'gpx') downloadText(geoJsonToGpx(geojson), `tourism-map-export-${stamp}.gpx`, 'application/gpx+xml;charset=utf-8');
    else if (format === 'csv') downloadText(geoJsonToCsv(geojson), `tourism-map-export-${stamp}.csv`, 'text/csv;charset=utf-8');
    setEditStatus(`تم تصدير ${count} عنصر بصيغة ${format.toUpperCase()}.`, 'success');
  }

  function initSketchEditing() {
    state.sketchVM = new SketchViewModel({
      view,
      layer: editLayer,
      updateOnGraphicClick: false,
      defaultUpdateOptions: { tool: 'reshape', enableRotation: false, enableScaling: true, preserveAspectRatio: false, toggleToolOnClick: false }
    });
    state.sketchVM.on('update', (event) => {
      if (event.state === 'start') setEditStatus('وضع التحرير فعال: اسحب النقاط أو حرّك الشكل ثم اضغط ✓ للحفظ.', 'info');
      if (event.state === 'complete') setEditStatus('تم إنهاء الحركة. اضغط ✓ لحفظ التعديل أو ↶ للإلغاء.', 'info');
    });
  }

  function beginEditSelectedFeature() {
    if (!state.selectedGraphic?.geometry) {
      setEditStatus('اختر عنصرًا من الخريطة أولًا ثم اضغط تعديل.', 'warning');
      return;
    }
    if (!state.sketchVM) initSketchEditing();
    editLayer.removeAll();
    const src = state.selectedGraphic;
    const layerKey = state.selectedLayerKey || getLayerKeyFromLayer(src.layer) || 'selected';
    const working = src.clone ? src.clone() : new Graphic({ geometry: src.geometry, attributes: src.attributes || {} });
    working.attributes = { ...(src.attributes || {}), source_layer: layerKey, edit_status: 'قيد التحرير' };
    working.symbol = editableSymbolForGeometry(working.geometry?.type, false);
    editLayer.add(working);
    state.editSourceGraphic = src;
    state.editWorkingGraphic = working;
    try { state.sketchVM.update([working], { tool: 'reshape', enableRotation: false, enableScaling: true }); } catch (e) { state.sketchVM.update(working); }
    updateEditButtons();
    setEditStatus('وضع التحرير فعال. عدّل الشكل على الخريطة ثم اضغط ✓ للحفظ.', 'info');
  }

  async function saveCurrentEdit() {
    const working = state.editWorkingGraphic;
    const src = state.editSourceGraphic;
    if (!working || !src) return;
    const srcLayerKey = state.selectedLayerKey || getLayerKeyFromLayer(src.layer) || '';
    const isImported = src.layer === importedLayer || srcLayerKey === 'imported' || srcLayerKey === 'edited-copy';
    if (isImported) {
      src.geometry = working.geometry;
      src.symbol = editableSymbolForGeometry(src.geometry?.type, true);
      src.attributes = { ...(src.attributes || {}), edit_status: 'تم تعديله' };
      importedLayer.remove(src);
      importedLayer.add(src);
      await selectGraphic(src, 'imported', { goTo: false, openPopup: true });
      setEditStatus('تم حفظ التعديل على العنصر المرفوع.', 'success');
    } else {
      const copy = new Graphic({
        geometry: working.geometry,
        attributes: { ...(src.attributes || {}), name: `${getSelectedTitle(srcLayerKey, src.attributes || {})} - نسخة معدلة`, source_layer: srcLayerKey, source_format: 'Edited Copy', edit_status: 'نسخة معدلة غير محفوظة في الطبقة الأصلية', OBJECTID: Date.now() + state.editedCopiesCounter++ },
        symbol: editableSymbolForGeometry(working.geometry?.type, true)
      });
      importedLayer.add(copy);
      await selectGraphic(copy, 'edited-copy', { goTo: false, openPopup: true });
      setEditStatus('تم إنشاء نسخة معدلة داخل طبقة الملفات المرفوعة. الطبقة الأصلية لم تتغير.', 'warning');
    }
    try { state.sketchVM?.cancel?.(); } catch (e) {}
    editLayer.removeAll();
    state.editSourceGraphic = null;
    state.editWorkingGraphic = null;
    updateEditButtons();
  }

  function cancelCurrentEdit() {
    try { state.sketchVM?.cancel?.(); } catch (e) {}
    editLayer.removeAll();
    state.editSourceGraphic = null;
    state.editWorkingGraphic = null;
    updateEditButtons();
    setEditStatus('تم إلغاء التحرير بدون حفظ.', 'warning');
  }

  function openExportDialog() {
    if (!els.exportDialog) return exportImportedGeoJson();
    els.exportDialog.classList.remove('hidden');
  }

  function closeExportDialog() {
    els.exportDialog?.classList.add('hidden');
  }

  function bindExportDialogControls() {
    els.exportGeoJsonBtn?.addEventListener('click', openExportDialog);
    els.confirmExportBtn?.addEventListener('click', async () => {
      try { await exportImportedGeoJson(); }
      finally { closeExportDialog(); }
    });
    els.cancelExportDialogBtn?.addEventListener('click', closeExportDialog);
    els.closeExportDialogBtn?.addEventListener('click', closeExportDialog);
    els.exportDialog?.addEventListener('click', (event) => {
      if (event.target === els.exportDialog) closeExportDialog();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !els.exportDialog?.classList.contains('hidden')) closeExportDialog();
    });
  }

  function bindImportAndEditControls() {
    els.importRouteBtn?.addEventListener('click', () => els.routeFileInput?.click());
    els.routeFileInput?.addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      try { await importRouteFile(file); }
      catch (error) { console.error(error); setEditStatus(error.message || 'تعذر رفع الملف.', 'warning'); }
      finally { if (els.routeFileInput) els.routeFileInput.value = ''; }
    });
    els.editSelectedBtn?.addEventListener('click', beginEditSelectedFeature);
    els.saveEditBtn?.addEventListener('click', saveCurrentEdit);
    els.cancelEditBtn?.addEventListener('click', cancelCurrentEdit);
    bindExportDialogControls();
    updateEditButtons();
  }

  function isSceneView(targetView = view) {
    return String(targetView?.type || '').toLowerCase() === '3d';
  }

  function applySceneVisualQuality(targetView = view) {
    if (!targetView || !isSceneView(targetView)) return;
    try {
      targetView.qualityProfile = 'high';
      targetView.environment = {
        ...targetView.environment,
        atmosphere: { quality: 'high' },
        lighting: {
          ...targetView.environment?.lighting,
          directShadowsEnabled: true,
          ambientOcclusionEnabled: true
        }
      };
    } catch (e) {
      console.warn('3D visual quality settings were not fully applied.', e);
    }
  }

  function applyBaseViewSettings(targetView = view) {
    if (!targetView) return;
    try {
      if (isSceneView(targetView)) {
        targetView.constraints = {
          ...targetView.constraints,
          minScale: 0,
          maxScale: 0
        };
      } else {
        targetView.constraints = {
          ...targetView.constraints,
          rotationEnabled: false,
          snapToZoom: false,
          minScale: 0,
          maxScale: 0,
          geometry: state.fullExtent.clone()
        };
      }
    } catch (e) {
      console.warn('View constraints were not fully applied.', e);
    }
    targetView.highlightOptions = { color: '#0ea5ff', haloOpacity: 0.98, fillOpacity: 0.14 };
    targetView.popupEnabled = true;
    if (targetView.popup) {
      targetView.popup.dockEnabled = true;
      targetView.popup.dockOptions = { buttonEnabled: true, breakpoint: false, position: 'top-left' };
      targetView.popup.highlightEnabled = true;
    }
    applySceneVisualQuality(targetView);
  }

  applyBaseViewSettings(mapView);
  if (mapElement.popupElement) {
    mapElement.popupElement.dockEnabled = true;
    mapElement.popupElement.dockOptions = { buttonEnabled: true, breakpoint: false, position: 'top-left' };
  }

  function getStage(scale) {
    if (scale > SCALE_THRESHOLDS.national) return 'national';
    if (scale > SCALE_THRESHOLDS.regional) return 'regional';
    if (scale > SCALE_THRESHOLDS.local) return 'local';
    return 'detail';
  }

  function updateGovRenderer(stage) {
    const rendererKey = stage === 'national' ? 'national' : stage === 'regional' ? 'regional' : 'outline';
    if (rendererKey === state.currentGovRendererKey) return;
    state.currentGovRendererKey = rendererKey;
    govLayer.renderer = buildGovRenderer(rendererKey === 'outline' ? stage : rendererKey);
  }

  function describeScaleStage(stage) {
    if (stage === 'national') {
      return 'المشهد الآن على مستوى وطني عام: تظهر المحافظات فقط كطبقة قراءة رئيسية مع أسمائها. الطبقات التفصيلية تبقى جاهزة في البحث لكنها لا تظهر على الخريطة إلا بعد التكبير حسب الهرمية.';
    }
    if (stage === 'regional') {
      return 'المشهد الآن في مستوى إقليمي: تظهر المحافظات والحدود الإدارية والمدن الرئيسية، وتبدأ طبقات السكك ومسار درب الأردن بالظهور إذا كانت مفعّلة. التفاصيل الدقيقة ما زالت مخفية حتى لا تتزاحم الخريطة.';
    }
    if (stage === 'local') {
      return 'المشهد الآن في مستوى محلي: تظهر الألوية والسكك والطرق الرئيسية ومسار درب الأردن، وتبدأ المواقع الأثرية بالظهور إذا كانت مفعّلة. أسماء الطبقات تظهر حسب مستوى التكبير المناسب.';
    }
    return 'المشهد الآن في مستوى تفصيلي: تظهر المواقع الأثرية والمواقع المؤسسية والتجمعات المحلية وخطوط الكنتور حسب الخيارات المفعّلة، مع إظهار الأسماء العربية من الحقول المناسبة ومنع التداخل قدر الإمكان.';
  }

  function updateScaleDrivenHierarchy() {
    const scale = Number(view.scale || 0);
    const stage = getStage(scale);
    state.currentStage = stage;
    updateGovRenderer(stage);

    // الهرمية المعتمدة: اختيار المستخدم يعني أن الطبقة مسموحة،
    // أما الظهور الفعلي على الخريطة فيخضع لمقياس الرسم حتى لا تظهر كل الطبقات مرة واحدة.
    const allowGov = !!els.toggleGov.checked;
    const allowLiwa = !!els.toggleLiwa.checked;
    const allowRail = !!els.toggleRails.checked;
    const allowHighway = !!els.toggleHighways.checked;
    const allowPlaces = !!els.togglePlaces.checked;
    const allowArch = !!els.toggleArchSites.checked;
    const allowHotels = !!els.toggleHotels.checked;
    const allowRestaurants = !!els.toggleRestaurants.checked;
    const allowMasar = !!els.toggleMasar.checked;
    const allowContours = !!els.toggleContours.checked;
    const allowFiberEdu = !!els.toggleFiberEdu.checked;
    const allowFiberGov = !!els.toggleFiberGov.checked;
    const allowFiberHealth = !!els.toggleFiberHealth.checked;
    const allowFiberSchools = !!els.toggleFiberSchools.checked;

    const selectedKey = state.selectedLayerKey;
    // لا نجبر الطبقات النقطية الكثيفة على الظهور أثناء الـ Zoom Out الوطني،
    // لأن ذلك كان سبب ظهور المواقع الأثرية وأسمائها فوق المحافظات عند 1:4M.
    const canForceSelected = stage !== 'national';
    const forceSelected = (key) => canForceSelected && selectedKey === key;
    const forcePlaces = canForceSelected && (selectedKey === 'place-major' || selectedKey === 'place-detail');
    const forceFiber = (key) => canForceSelected && selectedKey === key;

    const showLiwa = (allowLiwa && scale <= SCALE_THRESHOLDS.liwaVisible) || forceSelected('liwa');
    const showRail = (allowRail && scale <= SCALE_THRESHOLDS.railVisible) || forceSelected('rail');
    const showHighway = (allowHighway && scale <= SCALE_THRESHOLDS.highwayVisible) || forceSelected('highway');
    const showMajorPlaces = (allowPlaces && scale <= SCALE_THRESHOLDS.majorPlacesVisible) || forceSelected('place-major');
    const showDetailPlaces = (allowPlaces && scale <= SCALE_THRESHOLDS.detailPlacesVisible) || forceSelected('place-detail');
    const showArch = (allowArch && scale <= SCALE_THRESHOLDS.archVisible) || forceSelected('arch');
    const showHotels = (allowHotels && scale <= SCALE_THRESHOLDS.hotelsVisible) || forceSelected('hotels');
    const showRestaurants = (allowRestaurants && scale <= SCALE_THRESHOLDS.restaurantsVisible) || forceSelected('restaurants');
    const showMasar = (allowMasar && scale <= SCALE_THRESHOLDS.masarVisible) || forceSelected('masar');
    const showContours = (allowContours && scale <= SCALE_THRESHOLDS.contourVisible) || forceSelected('contour');
    const showFiberEdu = (allowFiberEdu && scale <= SCALE_THRESHOLDS.fiberEduVisible) || forceFiber('fiber-edu');
    const showFiberGov = (allowFiberGov && scale <= SCALE_THRESHOLDS.fiberGovVisible) || forceFiber('fiber-gov_agency');
    const showFiberHealth = (allowFiberHealth && scale <= SCALE_THRESHOLDS.fiberHealthVisible) || forceFiber('fiber-health');
    const showFiberSchools = (allowFiberSchools && scale <= SCALE_THRESHOLDS.fiberSchoolsVisible) || forceFiber('fiber-school');

    govLayer.visible = allowGov;
    govLayer.labelsVisible = !!state.labelPrefs.gov && allowGov && (stage === 'national' || stage === 'regional');
    govLayer.labelingInfo = [govLabelClass];

    liwaLayer.visible = showLiwa;
    liwaLayer.labelsVisible = (!!state.labelPrefs.liwa && showLiwa && scale <= SCALE_THRESHOLDS.liwaLabels) || forceSelected('liwa');

    railLayer.visible = showRail;
    railLayer.labelsVisible = (!!state.labelPrefs.rail && showRail && scale <= 350000) || forceSelected('rail');

    highwayLayer.visible = showHighway;
    highwayLayer.labelsVisible = (!!state.labelPrefs.highway && showHighway && scale <= SCALE_THRESHOLDS.highwayLabels) || forceSelected('highway');

    majorPlacesLayer.visible = showMajorPlaces;
    detailPlacesLayer.visible = showDetailPlaces;
    archLayer.visible = showArch;
    hotelsLayer.visible = showHotels;
    restaurantsLayer.visible = showRestaurants;

    fiberEduLayer.visible = showFiberEdu;
    fiberGovLayer.visible = showFiberGov;
    fiberHealthLayer.visible = showFiberHealth;
    fiberSchoolsLayer.visible = showFiberSchools;
    fiberEduLayer.labelsVisible = (!!state.labelPrefs.fiber && showFiberEdu && scale <= SCALE_THRESHOLDS.fiberLabels) || forceSelected('fiber-edu');
    fiberGovLayer.labelsVisible = (!!state.labelPrefs.fiber && showFiberGov && scale <= SCALE_THRESHOLDS.fiberLabels) || forceSelected('fiber-gov_agency');
    fiberHealthLayer.labelsVisible = (!!state.labelPrefs.fiber && showFiberHealth && scale <= SCALE_THRESHOLDS.fiberLabels) || forceSelected('fiber-health');
    fiberSchoolsLayer.labelsVisible = (!!state.labelPrefs.fiber && showFiberSchools && scale <= SCALE_THRESHOLDS.fiberSchoolLabels) || forceSelected('fiber-school');

    masarLayer.visible = showMasar;
    masarLayer.labelsVisible = (!!state.labelPrefs.masar && showMasar && scale <= SCALE_THRESHOLDS.masarLabels) || forceSelected('masar');

    contourLayer.visible = showContours;
    contourLayer.labelsVisible = showContours && scale <= SCALE_THRESHOLDS.contourLabels;
    if (hillshadeLayer) hillshadeLayer.visible = !!els.toggleHillshade.checked;

    if (stage === 'regional') { majorPlacesLayer.labelingInfo = [majorCityLabelClass]; }
    else { majorPlacesLayer.labelingInfo = [majorCityLabelClass, majorTownLabelClass]; }

    majorPlacesLayer.labelsVisible = (!!state.labelPrefs.place && showMajorPlaces && scale <= SCALE_THRESHOLDS.majorPlacesLabels) || forceSelected('place-major');
    detailPlacesLayer.labelsVisible = (!!state.labelPrefs.place && showDetailPlaces && scale <= SCALE_THRESHOLDS.detailPlaceLabels) || forceSelected('place-detail');
    archLayer.labelsVisible = (!!state.labelPrefs.arch && showArch && scale <= SCALE_THRESHOLDS.archLabels) || forceSelected('arch');
    hotelsLayer.labelsVisible = (!!state.labelPrefs.hotels && showHotels && scale <= SCALE_THRESHOLDS.hotelsLabels) || forceSelected('hotels');
    restaurantsLayer.labelsVisible = (!!state.labelPrefs.restaurants && showRestaurants && scale <= SCALE_THRESHOLDS.restaurantsLabels) || forceSelected('restaurants');

    if (els.highwayZoomBadge) els.highwayZoomBadge.textContent = STAGE_LABELS[stage];
    if (!state.selectedGraphic && els.featureInfo) els.featureInfo.textContent = describeScaleStage(stage);
  }

  function getWkid(spatialReference) {
    return Number(spatialReference?.latestWkid || spatialReference?.wkid || 0);
  }

  function sameSpatialReference(a, b) {
    const aw = getWkid(a);
    const bw = getWkid(b);
    if (!aw || !bw) return false;
    if (aw === bw) return true;
    return (aw === 102100 && bw === 3857) || (aw === 3857 && bw === 102100);
  }

  function projectExtentToView(extent, targetView = view) {
    if (!extent) return null;
    const cloned = extent.clone ? extent.clone() : extent;
    const viewSR = targetView?.spatialReference || cloned.spatialReference;
    if (!viewSR || sameSpatialReference(cloned.spatialReference, viewSR)) return cloned;

    const sourceWkid = getWkid(cloned.spatialReference);
    const targetWkid = getWkid(viewSR);
    try {
      if ((sourceWkid === 4326 || sourceWkid === 4269) && (targetWkid === 102100 || targetWkid === 3857)) {
        return webMercatorUtils.geographicToWebMercator(cloned) || cloned;
      }
      if ((sourceWkid === 102100 || sourceWkid === 3857) && (targetWkid === 4326 || targetWkid === 4269)) {
        return webMercatorUtils.webMercatorToGeographic(cloned) || cloned;
      }
    } catch (e) {
      console.warn('تعذر تحويل امتداد الأردن إلى نظام العرض الحالي.', e);
    }
    return cloned;
  }

  function extentContainsExtent(outer, inner, toleranceRatio = 0.002) {
    if (!outer || !inner) return false;
    const tolerance = Math.max(Math.abs(Number(inner.width || 0)), Math.abs(Number(inner.height || 0)), 1) * toleranceRatio;
    return Number(outer.xmin) <= Number(inner.xmin) + tolerance
      && Number(outer.ymin) <= Number(inner.ymin) + tolerance
      && Number(outer.xmax) >= Number(inner.xmax) - tolerance
      && Number(outer.ymax) >= Number(inner.ymax) - tolerance;
  }

  async function goToJordanCenterScale(targetExtent, targetScale, duration = 0) {
    const center = targetExtent?.center;
    if (!center || !targetScale) return;
    await view.goTo(
      { center: center.clone ? center.clone() : center, scale: targetScale },
      { duration, easing: 'ease-out', animate: duration > 0 }
    );
  }

  async function ensureJordanExtentVisible(targetExtent, duration = 0) {
    if (!targetExtent || !view) return;
    let safeScale = Number(state.nationalScale || calculateNationalHomeScale(targetExtent));

    // بعد goTo قد يكون ارتفاع إطار الخريطة الفعلي أقل من الحساب الأولي،
    // لذلك نتحقق فعليًا من أن view.extent يحتوي الأردن كاملًا، ونوسع المقياس تدريجيًا إن لزم.
    for (let attempt = 0; attempt < 5; attempt += 1) {
      if (view.extent && extentContainsExtent(view.extent, targetExtent)) break;
      safeScale = Math.ceil((safeScale * 1.12) / 10000) * 10000;
      state.nationalScale = safeScale;
      await goToJordanCenterScale(targetExtent, safeScale, attempt === 0 ? duration : 0);
    }
  }

  function calculateNationalHomeScale(extent) {
    const widthPx = Math.max(1, Number(view.width || els.mapWrap?.clientWidth || 800));
    const heightPx = Math.max(1, Number(view.height || els.mapWrap?.clientHeight || 500));
    const srWkid = Number(extent?.spatialReference?.wkid || extent?.spatialReference?.latestWkid || 4326);
    let widthMeters = 0;
    let heightMeters = 0;

    if (srWkid === 4326 || srWkid === 4269) {
      const xmin = Number(extent.xmin);
      const xmax = Number(extent.xmax);
      const ymin = Number(extent.ymin);
      const ymax = Number(extent.ymax);
      const midLatRad = ((ymin + ymax) / 2) * Math.PI / 180;
      widthMeters = Math.abs(xmax - xmin) * 111320 * Math.max(0.20, Math.cos(midLatRad));
      heightMeters = Math.abs(ymax - ymin) * 110574;
    } else {
      // Web Mercator or projected coordinates are already approximately in meters.
      widthMeters = Math.abs(Number(extent?.xmax) - Number(extent?.xmin));
      heightMeters = Math.abs(Number(extent?.ymax) - Number(extent?.ymin));
    }

    const scaleFromWidth = widthMeters / (widthPx * 0.00028);
    const scaleFromHeight = heightMeters / (heightPx * 0.00028);
    let targetScale = Math.max(scaleFromWidth, scaleFromHeight) * NATIONAL_SCALE_PADDING;

    if (!Number.isFinite(targetScale) || targetScale <= 0) {
      targetScale = NATIONAL_HOME_SCALE_FALLBACK;
    }

    targetScale = Math.max(NATIONAL_MIN_ZOOM_OUT_SCALE, targetScale);
    // قرّب الرقم حتى يكون ثابتًا وواضحًا في مؤشر المقياس.
    return Math.ceil(targetScale / 10000) * 10000;
  }

  function applyNationalZoomConstraints(targetView = view) {
    if (!state.nationalScale || !targetView) return;
    const navigationExtent = (state.nationalViewExtent || state.fullExtent)?.clone?.() || state.fullExtent.clone();
    try {
      if (isSceneView(targetView)) {
        // SceneView يعتمد على الكاميرا، لذلك لا نضع geometry هنا.
        // يتم ضبط منع التصغير بالتحقق من scale وإرجاع المشهد إلى الأردن الكامل.
        targetView.constraints = {
          ...targetView.constraints,
          minScale: state.nationalScale,
          maxScale: 0
        };
      } else {
        targetView.constraints = {
          ...targetView.constraints,
          rotationEnabled: false,
          snapToZoom: false,
          geometry: navigationExtent,
          minScale: state.nationalScale,
          maxScale: 0
        };
      }
    } catch (e) {
      console.warn('National zoom constraints were not fully applied.', e);
    }
  }

  async function rebuildNationalViewLock(duration = 0) {
    if (state.lockRecenterBusy || !state.jordanTargetExtent) return;
    state.lockRecenterBusy = true;
    try {
      const targetExtent = projectExtentToView(state.jordanTargetExtent, view)?.expand?.(1.015) || state.jordanTargetExtent;
      const targetScale = calculateNationalHomeScale(targetExtent);
      state.nationalScale = targetScale;
      state.nationalCenter = targetExtent.center;

      // حرر القيود مؤقتًا قبل الرجوع إلى المشهد الوطني.
      try {
        if (isSceneView(view)) {
          view.constraints = { ...view.constraints, minScale: 0, maxScale: 0 };
        } else {
          view.constraints = { ...view.constraints, geometry: state.fullExtent.clone(), minScale: 0, maxScale: 0 };
        }
      } catch (e) {}

      await goToJordanCenterScale(targetExtent, targetScale, duration);
      await ensureJordanExtentVisible(targetExtent, duration);

      state.nationalViewExtent = view.extent.clone();
      // قيد التحريك يعتمد على امتداد الأردن الحقيقي مع هامش صغير، وليس على الشاشة كلها.
      state.panLimitExtent = targetExtent.clone ? targetExtent.clone().expand(1.035) : targetExtent;
      applyNationalZoomConstraints();
    } catch (e) {
      // تجاهل إلغاء goTo الناتج عن تفاعل سريع من المستخدم.
    } finally {
      state.lockRecenterBusy = false;
      updateScaleBadge();
    }
  }

  async function fitJordanFullView(duration = 0) {
    if (!state.nationalViewExtent || !state.nationalScale || !state.jordanTargetExtent) {
      return rebuildNationalViewLock(duration);
    }
    if (state.lockRecenterBusy) return;
    state.lockRecenterBusy = true;
    try {
      const targetExtent = projectExtentToView(state.jordanTargetExtent, view)?.expand?.(1.015) || state.jordanTargetExtent;
      await goToJordanCenterScale(targetExtent, state.nationalScale, duration);
      await ensureJordanExtentVisible(targetExtent, duration);
      state.nationalCenter = targetExtent.center;
      state.nationalViewExtent = view.extent.clone();
      state.panLimitExtent = targetExtent.clone ? targetExtent.clone().expand(1.035) : targetExtent;
      applyNationalZoomConstraints();
    } catch (e) {
      // ignore interrupted goTo calls
    } finally {
      state.lockRecenterBusy = false;
      updateScaleBadge();
    }
  }

  function isAtOrBeyondNationalView() {
    const scale = Number(view.scale || 0);
    const nationalScale = Number(state.nationalScale || 0);
    if (!scale || !nationalScale) return false;
    return scale >= nationalScale * 0.995;
  }

  async function recenterToNationalExtent(duration = 0) {
    await fitJordanFullView(duration);
  }

  function goHome(duration = 550) {
    return rebuildNationalViewLock(duration);
  }

  async function enforceNationalViewLock() {
    if (state.searchNavigationBusy || state.lockRecenterBusy || !state.nationalViewExtent || !view.extent) return;
    const scale = Number(view.scale || 0);
    const nationalScale = Number(state.nationalScale || 0);
    if (!nationalScale || !scale) return;

    const current = view.extent;
    const national = state.nationalViewExtent;
    const offCenter = Math.abs((current.center?.x || 0) - (national.center?.x || 0)) > national.width * 0.001
      || Math.abs((current.center?.y || 0) - (national.center?.y || 0)) > national.height * 0.001;
    const beyondNationalZoomOut = scale > state.nationalScale * 1.001
      || current.width > national.width * 1.002
      || current.height > national.height * 1.002;

    if (beyondNationalZoomOut || (isAtOrBeyondNationalView() && offCenter)) {
      await fitJordanFullView(0);
    }
  }


  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getClampedCenterInsideJordanExtent() {
    const bounds = state.panLimitExtent || state.nationalViewExtent;
    const current = view.extent;
    const center = view.center;
    if (!bounds || !current || !center) return null;

    const halfWidth = Math.abs(Number(current.width || 0)) / 2;
    const halfHeight = Math.abs(Number(current.height || 0)) / 2;
    if (!halfWidth || !halfHeight) return null;

    const minX = Number(bounds.xmin) + halfWidth;
    const maxX = Number(bounds.xmax) - halfWidth;
    const minY = Number(bounds.ymin) + halfHeight;
    const maxY = Number(bounds.ymax) - halfHeight;

    let x;
    let y;

    // إذا كان عرض الشاشة الحالي أكبر من نطاق الأردن، نعيد المركز إلى مركز الأردن.
    if (minX > maxX) {
      x = bounds.center.x;
    } else {
      x = clampNumber(Number(center.x), minX, maxX);
    }

    if (minY > maxY) {
      y = bounds.center.y;
    } else {
      y = clampNumber(Number(center.y), minY, maxY);
    }

    const epsilon = Math.max(Math.abs(bounds.width || 0), Math.abs(bounds.height || 0), 1) * 0.000001;
    if (Math.abs(x - Number(center.x)) <= epsilon && Math.abs(y - Number(center.y)) <= epsilon) {
      return null;
    }

    return {
      x,
      y,
      spatialReference: center.spatialReference || current.spatialReference || bounds.spatialReference
    };
  }

  async function enforcePanWithinJordanExtent(duration = 0) {
    if (state.searchNavigationBusy || state.lockRecenterBusy || state.panClampBusy || !state.panLimitExtent || !view.extent || !view.center) return;

    // عند مشهد الأردن الكامل لا نسمح بالتحريك أصلًا، ونستخدم قفل المشهد الوطني.
    if (isAtOrBeyondNationalView()) {
      await enforceNationalViewLock();
      return;
    }

    const clampedCenter = getClampedCenterInsideJordanExtent();
    if (!clampedCenter) return;

    state.panClampBusy = true;
    try {
      await view.goTo(
        { center: clampedCenter, scale: view.scale },
        { duration, animate: duration > 0, easing: 'ease-out' }
      );
    } catch (e) {
      // تجاهل إلغاء goTo إذا تفاعل المستخدم بسرعة.
    } finally {
      state.panClampBusy = false;
      updateScaleBadge();
    }
  }

  async function clearSelection() {
    if (state.highlightHandle) {
      state.highlightHandle.remove();
      state.highlightHandle = null;
    }
    if (state.selectionOverlayGraphic && view?.graphics) {
      try { view.graphics.remove(state.selectionOverlayGraphic); } catch (e) {}
    }
    state.selectionOverlayGraphic = null;
    state.selectedGraphic = null;
    state.selectedLayerKey = null;
    updateAiContextSummary();
    if (els.selectionDetails) els.selectionDetails.innerHTML = '<div class="migration-note">لا يوجد عنصر محدد حاليًا.</div>';
    updateScaleDrivenHierarchy();
    updateEditButtons();
  }

  function updateScaleBadge() {
    const rawScale = Number(view.scale || 0);
    const scale = Number.isFinite(rawScale) ? Math.round(rawScale) : 0;
    const scaleText = scale ? `1:${fmt(scale)}` : '1:—';
    if (els.zoomBadge) els.zoomBadge.textContent = scaleText;
    if (els.mapScaleBadge) {
      // فصل اتجاه الرقم عن النص العربي يمنع ظهورها معكوسة مثل: 1:—المقياس.
      els.mapScaleBadge.innerHTML = `<span class="scale-label">المقياس</span> <span class="scale-value" dir="ltr">${scaleText}</span>`;
    }
    if (els.zoomOutBtn) {
      const locked = !!(state.nationalScale && scale >= state.nationalScale * 0.995);
      els.zoomOutBtn.disabled = locked;
      els.zoomOutBtn.classList.toggle('is-disabled-btn', locked);
      els.zoomOutBtn.setAttribute('aria-disabled', locked ? 'true' : 'false');
    }
    updateScaleDrivenHierarchy();
  }

  function updateSidebarToggleButton() {
    if (!els.sidebarToggleBtn) return;
    const collapsed = !!els.appShell?.classList.contains('sidebar-collapsed');
    els.sidebarToggleBtn.classList.toggle('active', collapsed);
    els.sidebarToggleBtn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
    const title = collapsed ? 'إظهار الشريط الجانبي' : 'إخفاء الشريط الجانبي';
    els.sidebarToggleBtn.title = title;
    els.sidebarToggleBtn.setAttribute('aria-label', title);
    els.sidebarToggleBtn.textContent = '☰';
  }

  function getVisibleLayerNamesForExport() {
    const items = [];
    if (state.basemap === 'imagery') items.push('الصور الجوية');
    if (hillshadeLayer?.visible) items.push('التضاريس (Hillshade)');
    if (govLayer?.visible) items.push('المحافظات');
    if (liwaLayer?.visible) items.push('الألوية');
    if (railLayer?.visible) items.push('السكك الحديدية');
    if (highwayLayer?.visible) items.push('الطرق');
    if (majorPlacesLayer?.visible || detailPlacesLayer?.visible) items.push('المدن والبلدات');
    if (fiberEduLayer?.visible) items.push('مديريات التربية');
    if (fiberGovLayer?.visible) items.push('الجهات الحكومية');
    if (fiberHealthLayer?.visible) items.push('المؤسسات الصحية');
    if (fiberSchoolsLayer?.visible) items.push('المدارس');
    if (archLayer?.visible) items.push('المواقع الأثرية');
    if (masarLayer?.visible) items.push('مسار درب الأردن');
    if (contourLayer?.visible) items.push('خطوط الكنتور');
    return items;
  }

  function loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
  }

  function drawRoundedRect(ctx, x, y, w, h, r = 18, fill = 'rgba(255,255,255,.92)', stroke = 'rgba(15,23,42,.14)') {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function drawNorthArrow(ctx, x, y, size, heading = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((-heading || 0) * Math.PI / 180);
    ctx.shadowColor = 'rgba(15,23,42,.18)';
    ctx.shadowBlur = 10;
    drawRoundedRect(ctx, -size * 0.55, -size * 0.7, size * 1.1, size * 1.45, 18, 'rgba(255,255,255,.94)', 'rgba(15,23,42,.12)');
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.42);
    ctx.lineTo(size * 0.16, 0.08 * size);
    ctx.lineTo(0, -size * 0.02);
    ctx.lineTo(-size * 0.16, 0.08 * size);
    ctx.closePath();
    ctx.fillStyle = '#173a62';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, size * 0.45);
    ctx.lineTo(size * 0.11, 0.02 * size);
    ctx.lineTo(0, size * 0.12);
    ctx.lineTo(-size * 0.11, 0.02 * size);
    ctx.closePath();
    ctx.fillStyle = '#cbd5e1';
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = `800 ${Math.round(size * 0.22)}px Tajawal, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', 0, -size * 0.58);
    ctx.restore();
  }

  async function buildProfessionalExportDataUrl() {
    if (!view || typeof view.takeScreenshot !== 'function') return null;
    const width = Math.max(1800, Math.round((els.mapWrap?.clientWidth || 900) * 2));
    const height = Math.max(1100, Math.round(width * ((els.mapWrap?.clientHeight || 560) / Math.max(1, els.mapWrap?.clientWidth || 900))));
    const shot = await view.takeScreenshot({ format: 'png', width, height });
    const image = await loadImage(shot.dataUrl);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);

    const margin = 28;
    const titleBoxWidth = Math.min(620, width * 0.42);
    const titleBoxHeight = 112;
    const infoBoxWidth = Math.min(420, width * 0.28);
    const layers = getVisibleLayerNamesForExport();
    const lineHeight = 28;
    const layerBoxHeight = Math.max(132, 86 + (Math.min(layers.length, 10) * lineHeight));
    const topY = margin;

    // إطار احترافي حول الخريطة
    ctx.save();
    ctx.strokeStyle = 'rgba(23,58,98,.9)';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, width - 6, height - 6);
    ctx.restore();

    // مربع العنوان داخل الخريطة
    const titleX = width - margin - titleBoxWidth;
    drawRoundedRect(ctx, titleX, topY, titleBoxWidth, titleBoxHeight, 20, 'rgba(255,255,255,.95)', 'rgba(23,58,98,.16)');
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#173a62';
    ctx.font = '900 34px Tajawal, Arial, sans-serif';
    ctx.fillText('الخارطة السياحية الذكية', titleX + titleBoxWidth - 22, topY + 38);
    ctx.fillStyle = '#475569';
    ctx.font = '700 18px Tajawal, Arial, sans-serif';
    ctx.fillText('لوحة عرض للمسارات والطبقات السياحية في المملكة الأردنية الهاشمية', titleX + titleBoxWidth - 22, topY + 76);

    // بوصلة الشمال
    drawNorthArrow(ctx, margin + 54, margin + 60, 78, Number(view?.camera?.heading || view?.rotation || 0));

    // مربع معلومات التصدير / المقياس
    const scaleText = Number(view.scale) ? `1:${fmt(Math.round(view.scale))}` : '1:—';
    const modeText = state.viewMode === '3d' ? 'ثلاثي الأبعاد' : 'ثنائي الأبعاد';
    const dateText = new Date().toLocaleString('ar-JO');
    drawRoundedRect(ctx, margin, height - margin - 138, infoBoxWidth, 138, 18, 'rgba(255,255,255,.95)', 'rgba(23,58,98,.12)');
    ctx.fillStyle = '#173a62';
    ctx.font = '800 24px Tajawal, Arial, sans-serif';
    ctx.fillText('بيانات الخريطة', margin + infoBoxWidth - 18, height - margin - 100);
    ctx.fillStyle = '#334155';
    ctx.font = '700 18px Tajawal, Arial, sans-serif';
    ctx.fillText(`مقياس الرسم: ${scaleText}`, margin + infoBoxWidth - 18, height - margin - 66);
    ctx.fillText(`نوع العرض: ${modeText}`, margin + infoBoxWidth - 18, height - margin - 40);
    ctx.fillText(`تاريخ التصدير: ${dateText}`, margin + infoBoxWidth - 18, height - margin - 14);

    // مربع الطبقات الظاهرة
    const layersBoxX = width - margin - infoBoxWidth;
    const layersBoxY = height - margin - layerBoxHeight;
    drawRoundedRect(ctx, layersBoxX, layersBoxY, infoBoxWidth, layerBoxHeight, 18, 'rgba(255,255,255,.95)', 'rgba(23,58,98,.12)');
    ctx.fillStyle = '#173a62';
    ctx.font = '800 24px Tajawal, Arial, sans-serif';
    ctx.fillText('الطبقات الظاهرة', layersBoxX + infoBoxWidth - 18, layersBoxY + 30);
    ctx.fillStyle = '#334155';
    ctx.font = '700 18px Tajawal, Arial, sans-serif';
    const visibleLayers = layers.length ? layers.slice(0, 10) : ['لا توجد طبقات مفعّلة حاليًا'];
    visibleLayers.forEach((name, index) => {
      const yy = layersBoxY + 66 + (index * lineHeight);
      ctx.fillText(`• ${name}`, layersBoxX + infoBoxWidth - 18, yy);
    });

    // شريط تذييل خفيف
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.fillRect(width * 0.34, height - 34, width * 0.32, 24);
    ctx.fillStyle = '#475569';
    ctx.font = '700 14px Tajawal, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('وزارة السياحة والآثار — الخارطة السياحية الذكية', width / 2, height - 17);

    return canvas.toDataURL('image/png');
  }

  async function downloadProfessionalPng() {
    const dataUrl = await buildProfessionalExportDataUrl();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'tourism-routes-map-professional.png';
    a.click();
  }

  async function downloadProfessionalPdf() {
    const dataUrl = await buildProfessionalExportDataUrl();
    if (!dataUrl) return;
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) {
      const w = window.open('', '_blank');
      if (!w) return;
      w.document.write(`<html lang="ar" dir="rtl"><head><title>تصدير PDF</title><style>body{margin:0;padding:18px;font-family:Tajawal,Arial,sans-serif;background:#fff;text-align:center}img{max-width:100%;height:auto}</style></head><body><img src="${dataUrl}" alt="الخارطة السياحية الذكية" /><script>window.onload=()=>window.print();<\/script></body></html>`);
      w.document.close();
      return;
    }
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const props = pdf.getImageProperties(dataUrl);
    const ratio = props.width / props.height;
    const margin = 8;
    let renderW = pageW - (margin * 2);
    let renderH = renderW / ratio;
    if (renderH > pageH - (margin * 2)) {
      renderH = pageH - (margin * 2);
      renderW = renderH * ratio;
    }
    const x = (pageW - renderW) / 2;
    const y = (pageH - renderH) / 2;
    pdf.addImage(dataUrl, 'PNG', x, y, renderW, renderH, undefined, 'FAST');
    pdf.save('خريطة-المسارات-السياحية.pdf');
  }

  function describeGraphic(layerKey, attributes, graphic = null) {
    if (layerKey === 'gov') {
      return {
        title: attributes.gov_name_ar,
        html: renderOfficialGovPopup(attributes)
      };
    }
    if (layerKey === 'place-major' || layerKey === 'place-detail' || layerKey === 'place') {
      return {
        title: attributes.place_name_ar,
        html: `
          <div class="detail-block">
            <h3>${escapeHtml(attributes.place_name_ar)}</h3>
            <div class="detail-grid">
              <div><span>النوع</span><strong>${escapeHtml(attributes.settlement_label || 'موقع')}</strong></div>
              <div><span>المستوى</span><strong>${layerKey === 'place-major' ? 'مدينة رئيسية' : 'تجمع محلي'}</strong></div>
              <div><span>التصنيف</span><strong>${escapeHtml(attributes.fclass || '—')}</strong></div>
              <div><span>السكان</span><strong>${fmt(attributes.population)}</strong></div>
              <div><span>المعرّف</span><strong>${escapeHtml(attributes.osm_id || '—')}</strong></div>
            </div>
          </div>`
      };
    }
    if (layerKey === 'liwa') return { title: attributes.liwa_name_ar, html: `<div class="detail-block"><h3>${escapeHtml(attributes.liwa_name_ar)}</h3><div class="detail-grid"><div><span>النوع</span><strong>لواء</strong></div><div><span>كود اللواء</span><strong>${escapeHtml(attributes.liwa_code || '—')}</strong></div><div><span>المعرّف المكاني</span><strong>${escapeHtml(attributes.osm_id || '—')}</strong></div></div></div>` };
    if (layerKey === 'rail') return { title: attributes.rail_name_ar, html: `<div class="detail-block"><h3>${escapeHtml(attributes.rail_name_ar)}</h3><div class="detail-grid"><div><span>النوع</span><strong>سكة حديدية</strong></div><div><span>تصنيف السكة</span><strong>${escapeHtml(attributes.railway_type || '—')}</strong></div><div><span>عرض السكة</span><strong>${escapeHtml(attributes.gauge || '—')}</strong></div><div><span>الاسم الإنجليزي</span><strong>${escapeHtml(attributes.rail_name_en || '—')}</strong></div></div></div>` };
    if (layerKey === 'highway') return { title: attributes.road_name_ar, html: `<div class="detail-block"><h3>${escapeHtml(attributes.road_name_ar)}</h3><div class="detail-grid"><div><span>النوع</span><strong>طريق</strong></div><div><span>رقم الطريق</span><strong>${escapeHtml(attributes.ref || '—')}</strong></div><div><span>التصنيف بالعربي</span><strong>${escapeHtml(attributes.highway_type_ar || '—')}</strong></div><div><span>المعرّف المكاني</span><strong>${escapeHtml(attributes.osm_id || '—')}</strong></div></div></div>` };
    if (layerKey?.startsWith('fiber-')) return { title: attributes.fiber_name_ar, html: `<div class="detail-block"><h3>${escapeHtml(attributes.fiber_name_ar)}</h3><div class="detail-grid"><div><span>النوع</span><strong>${escapeHtml(attributes.layer_label || 'موقع مؤسسي')}</strong></div><div><span>الجهة / المنطقة</span><strong>${escapeHtml(attributes.department || '—')}</strong></div><div><span>معرّف الاتصال</span><strong>${escapeHtml(attributes.connection_id || '—')}</strong></div><div><span>الحالة</span><strong>${escapeHtml(attributes.active || '—')}</strong></div></div></div>` };
    if (layerKey === 'hotels') return { title: attributes.hotel_name_ar || attributes.hotel_name_en, html: `<div class="detail-block"><h3>${escapeHtml(attributes.hotel_name_ar || attributes.hotel_name_en || 'فندق / منشأة إيواء')}</h3><div class="detail-grid"><div><span>النوع</span><strong>${escapeHtml(attributes.facility_type_ar || 'فندق / منشأة إيواء')}</strong></div><div><span>المحافظة</span><strong>${escapeHtml(attributes.governorate_ar || '—')}</strong></div><div><span>الوجهة</span><strong>${escapeHtml(attributes.destination_ar || '—')}</strong></div><div><span>التصنيف</span><strong>${escapeHtml(attributes.classification_ar || '—')}</strong></div><div><span>الهاتف</span><strong>${escapeHtml(attributes.phone || '—')}</strong></div><div><span>البريد الإلكتروني</span><strong>${escapeHtml(attributes.email || '—')}</strong></div><div><span>الموقع الإلكتروني</span><strong>${escapeHtml(attributes.website || '—')}</strong></div><div><span>العنوان</span><strong>${escapeHtml(attributes.address_ar || '—')}</strong></div></div></div>` };
    if (layerKey === 'restaurants') return { title: attributes.restaurant_name_ar || attributes.restaurant_name_en, html: '<div class="detail-block"><h3>' + escapeHtml(attributes.restaurant_name_ar || attributes.restaurant_name_en || 'مطعم / خدمة طعام') + '</h3><div class="detail-grid"><div><span>النوع</span><strong>' + escapeHtml(attributes.facility_type_ar || 'مطعم / خدمة طعام') + '</strong></div><div><span>المنطقة</span><strong>' + escapeHtml(attributes.area_ar || '—') + '</strong></div><div><span>نوع المطبخ</span><strong>' + escapeHtml(attributes.cuisine_ar || '—') + '</strong></div><div><span>الهاتف</span><strong>' + escapeHtml(attributes.phone || '—') + '</strong></div><div><span>البريد الإلكتروني</span><strong>' + escapeHtml(attributes.email || '—') + '</strong></div><div><span>الموقع الإلكتروني</span><strong>' + escapeHtml(attributes.website || '—') + '</strong></div><div><span>العنوان</span><strong>' + escapeHtml(attributes.address_ar || '—') + '</strong></div><div><span>مطابق مع مصدر رسمي</span><strong>' + escapeHtml(attributes.official_match || 'لا') + '</strong></div></div></div>' };
    if (layerKey === 'masar') return { title: attributes.masar_title, html: renderMasarOfficialPopup(attributes, graphic?.geometry || null) };
    if (layerKey === 'contour') return { title: attributes.contour_name, html: `<div class="detail-block"><h3>${escapeHtml(attributes.contour_name)}</h3><div class="detail-grid"><div><span>النوع</span><strong>خط كنتور</strong></div><div><span>الارتفاع / متر</span><strong>${fmt(attributes.elev)}</strong></div></div></div>` };
    if (layerKey === 'imported' || layerKey === 'edited-copy') {
      const title = attributes.name || attributes.title || attributes.file_name || (layerKey === 'edited-copy' ? 'نسخة معدلة' : 'عنصر مرفوع');
      return {
        title,
        html: `<div class="detail-block imported-detail"><h3>${escapeHtml(title)}</h3><div class="detail-grid"><div><span>المصدر</span><strong>${escapeHtml(attributes.source_format || attributes.source_layer || 'ملف مرفوع')}</strong></div><div><span>نوع الشكل</span><strong>${escapeHtml(graphic?.geometry?.type || '—')}</strong></div><div><span>اسم الملف</span><strong>${escapeHtml(attributes.file_name || '—')}</strong></div><div><span>حالة التحرير</span><strong>${escapeHtml(attributes.edit_status || 'قابل للتعديل')}</strong></div></div><div class="hint">يمكن تعديل هذا العنصر من زر ✎ ثم حفظه أو تصديره GeoJSON.</div></div>`
      };
    }
    return {
      title: attributes.site_name_ar,
      html: renderArchOfficialPopup(attributes, graphic?.geometry || null)
    };
  }

  async function applyHighlight(graphic) {
    if (!graphic?.layer) return;
    if (state.highlightHandle) {
      state.highlightHandle.remove();
      state.highlightHandle = null;
    }
    try {
      const layerView = await view.whenLayerView(graphic.layer);
      state.highlightHandle = layerView.highlight(graphic);
    } catch (error) {
      // قد تكون الطبقة ما زالت مخفية لحظة البحث بسبب الهرمية أو تغيير المقياس.
      // لا نوقف الانتقال إلى النتيجة بسبب فشل التحديد البصري.
      console.warn('تعذر تمييز نتيجة البحث بصريًا:', error);
    }
  }

  function getSearchTargetScale(layerKey) {
    // scale أكبر = zoom out أكثر. هذه القيم تمثل أكبر مقياس مسموح بعد اختيار نتيجة بحث.
    // الهدف: لا يعود البحث إلى عرض عام، بل يذهب إلى feature نفسه ويجبر طبقته على الظهور.
    if (layerKey === 'gov') return 650000;
    if (layerKey === 'liwa') return 450000;
    if (layerKey === 'rail') return 140000;
    if (layerKey === 'highway') return 65000;
    if (layerKey === 'masar') return 90000;
    if (layerKey === 'arch') return 35000;
    if (layerKey === 'hotels') return 22000;
    if (layerKey === 'restaurants') return 22000;
    if (layerKey === 'place-major') return 55000;
    if (layerKey === 'place-detail') return 30000;
    if (layerKey === 'fiber-school') return 22000;
    if (layerKey === 'fiber-health') return 28000;
    if (layerKey === 'fiber-edu' || layerKey === 'fiber-gov_agency') return 35000;
    if (layerKey === 'contour') return 65000;
    return 50000;
  }

  function collectGeoJsonCoordinates(geometry, output = []) {
    if (!geometry || !geometry.coordinates) return output;
    const walk = (value) => {
      if (!Array.isArray(value)) return;
      if (typeof value[0] === 'number' && typeof value[1] === 'number') {
        output.push([Number(value[0]), Number(value[1])]);
        return;
      }
      value.forEach(walk);
    };
    walk(geometry.coordinates);
    return output;
  }

  function getGeoJsonExtent(feature) {
    const coords = collectGeoJsonCoordinates(feature?.geometry, []);
    if (!coords.length) return null;
    let xmin = Infinity;
    let ymin = Infinity;
    let xmax = -Infinity;
    let ymax = -Infinity;
    coords.forEach(([x, y]) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      xmin = Math.min(xmin, x);
      ymin = Math.min(ymin, y);
      xmax = Math.max(xmax, x);
      ymax = Math.max(ymax, y);
    });
    if (![xmin, ymin, xmax, ymax].every(Number.isFinite)) return null;
    const isPointLike = Math.abs(xmax - xmin) < 0.000001 && Math.abs(ymax - ymin) < 0.000001;
    const padX = isPointLike ? 0.012 : Math.max(0.002, (xmax - xmin) * 0.06);
    const padY = isPointLike ? 0.012 : Math.max(0.002, (ymax - ymin) * 0.06);
    const extent4326 = new Extent({
      xmin: xmin - padX,
      ymin: ymin - padY,
      xmax: xmax + padX,
      ymax: ymax + padY,
      spatialReference: { wkid: 4326 }
    });
    return projectExtentToView(extent4326, view) || extent4326;
  }

  async function goToSearchItem(item, fallbackGeometry = null) {
    const targetScale = getSearchTargetScale(item?.layerKey);
    const targetExtent = getGeoJsonExtent(item?.feature);
    state.searchNavigationBusy = true;
    try {
      if (targetExtent?.center) {
        const geometryType = item?.feature?.geometry?.type;
        const isPoint = geometryType === 'Point' || geometryType === 'MultiPoint';
        if (isPoint) {
          await view.goTo({ center: targetExtent.center, scale: targetScale }, { duration: 700, easing: 'ease-in-out' });
        } else {
          // أولًا حاول احتواء امتداد الـ feature، ثم إن بقي المقياس بعيدًا جدًا، قرّب إلى scale مناسب للطبقة.
          await view.goTo({ target: targetExtent, padding: 35 }, { duration: 700, easing: 'ease-in-out' });
          const currentScale = Number(view.scale || 0);
          if (currentScale && currentScale > targetScale) {
            await view.goTo({ center: targetExtent.center, scale: targetScale }, { duration: 420, easing: 'ease-out' });
          }
        }
      } else if (fallbackGeometry) {
        if (fallbackGeometry.type === 'point') {
          await view.goTo({ target: fallbackGeometry, scale: targetScale }, { duration: 700, easing: 'ease-in-out' });
        } else {
          const extentTarget = fallbackGeometry.extent ? fallbackGeometry.extent.clone().expand(1.08) : fallbackGeometry;
          await view.goTo({ target: extentTarget, padding: 35 }, { duration: 700, easing: 'ease-in-out' });
          const currentScale = Number(view.scale || 0);
          const targetCenter = extentTarget?.center || fallbackGeometry?.extent?.center;
          if (targetCenter && currentScale && currentScale > targetScale) {
            await view.goTo({ center: targetCenter, scale: targetScale }, { duration: 420, easing: 'ease-out' });
          }
        }
      }
    } finally {
      state.searchNavigationBusy = false;
      updateScaleBadge();
      updateScaleDrivenHierarchy();
      setTimeout(() => enforcePanWithinJordanExtent(0), 120);
    }
  }


  async function goToSearchGeometry(geometry, layerKey) {
    if (!geometry) return;
    const targetScale = getSearchTargetScale(layerKey);
    state.searchNavigationBusy = true;
    try {
      if (geometry.type === 'point') {
        await view.goTo({ target: geometry, scale: targetScale }, { duration: 650 });
        return;
      }
      const extentTarget = geometry.extent ? geometry.extent.clone().expand(1.08) : geometry;
      await view.goTo({ target: extentTarget, padding: 35 }, { duration: 650 });
      const currentScale = Number(view.scale || 0);
      const center = extentTarget?.center || geometry?.extent?.center;
      if (center && currentScale && currentScale > targetScale) {
        await view.goTo({ center, scale: targetScale }, { duration: 380, easing: 'ease-out' });
      }
    } finally {
      state.searchNavigationBusy = false;
      updateScaleBadge();
    }
  }


  function getSelectionOverlaySymbol(geometryType) {
    // لون أزرق واضح للتحديد حتى لا يتداخل مع ألوان الطرق والسكك والكنتور.
    // تم استخدام أزرق مشبع مع حواف بيضاء للنقاط، وشفافية خفيفة للمضلعات.
    if (geometryType === 'point') {
      return {
        type: 'simple-marker',
        style: 'circle',
        size: 16,
        color: [0, 122, 255, 0.96],
        outline: { color: [255, 255, 255, 1], width: 3 }
      };
    }
    if (geometryType === 'polyline') {
      return {
        type: 'simple-line',
        color: [0, 122, 255, 1],
        width: 7,
        style: 'solid'
      };
    }
    return {
      type: 'simple-fill',
      color: [0, 122, 255, 0.10],
      outline: { color: [0, 122, 255, 1], width: 4 }
    };
  }

  function drawSelectionOverlay(graphic) {
    if (!view?.graphics || !graphic?.geometry) return;
    try {
      if (state.selectionOverlayGraphic) {
        view.graphics.remove(state.selectionOverlayGraphic);
        state.selectionOverlayGraphic = null;
      }
      state.selectionOverlayGraphic = new Graphic({
        geometry: graphic.geometry,
        attributes: graphic.attributes || {},
        symbol: getSelectionOverlaySymbol(graphic.geometry.type)
      });
      view.graphics.add(state.selectionOverlayGraphic);
    } catch (error) {
      console.warn('تعذر رسم تمييز نتيجة البحث على الخريطة:', error);
    }
  }

  async function selectGraphic(graphic, layerKey, options = {}) {
    if (!graphic) return;
    state.selectedGraphic = graphic;
    state.selectedLayerKey = layerKey;
    updateAiContextSummary();

    const attributes = graphic.attributes || {};
    const details = describeGraphic(layerKey, attributes, graphic);
    if (els.selectionDetails) els.selectionDetails.innerHTML = details.html;
    if (els.featureInfo) els.featureInfo.textContent = `${details.title} — تم تحديد العنصر على الخريطة وفتح نافذة المعلومات.`;
    updateScaleDrivenHierarchy();
    drawSelectionOverlay(graphic);
    updateEditButtons();

    if (options.goTo !== false && !options.preNavigated) {
      await goToSearchGeometry(graphic.geometry, layerKey);
      updateScaleDrivenHierarchy();
    }

    await applyHighlight(graphic);

    if (options.openPopup !== false && view.popup && typeof view.popup.open === 'function') {
      try {
        view.popup.open({
          features: [graphic],
          location: options.location || (graphic.geometry?.type === 'point' ? graphic.geometry : undefined)
        });
      } catch (error) {
        console.warn('تعذر فتح نافذة معلومات نتيجة البحث:', error);
      }
    }
  }

  async function queryGraphicByObjectId(layer, objectId) {
    if (!layer || objectId == null || objectId === '') return null;
    try {
      await layer.when?.();
      const query = layer.createQuery();
      query.where = `OBJECTID = ${Number(objectId)}`;
      query.returnGeometry = true;
      query.outFields = ['*'];
      const result = await layer.queryFeatures(query);
      return result.features[0] || null;
    } catch (error) {
      console.warn('تعذر الاستعلام عن نتيجة البحث بواسطة OBJECTID:', error);
      return null;
    }
  }

  function geoJsonGeometryToArcGIS(geometry) {
    if (!geometry || !geometry.type) return null;
    const sr = { wkid: 4326 };
    const coords = geometry.coordinates;
    if (geometry.type === 'Point') {
      return { type: 'point', longitude: coords[0], latitude: coords[1], spatialReference: sr };
    }
    if (geometry.type === 'MultiPoint') {
      return { type: 'multipoint', points: coords, spatialReference: sr };
    }
    if (geometry.type === 'LineString') {
      return { type: 'polyline', paths: [coords], spatialReference: sr };
    }
    if (geometry.type === 'MultiLineString') {
      return { type: 'polyline', paths: coords, spatialReference: sr };
    }
    if (geometry.type === 'Polygon') {
      return { type: 'polygon', rings: coords, spatialReference: sr };
    }
    if (geometry.type === 'MultiPolygon') {
      return { type: 'polygon', rings: coords.flat(), spatialReference: sr };
    }
    return null;
  }

  function createGraphicFromSearchItem(item) {
    if (!item?.feature) return null;
    const geometry = geoJsonGeometryToArcGIS(item.feature.geometry);
    if (!geometry) return null;
    return new Graphic({
      geometry,
      attributes: item.feature.properties || {}
    });
  }

  function getLayerByKey(key) {
    if (key === 'gov') return govLayer;
    if (key === 'liwa') return liwaLayer;
    if (key === 'rail') return railLayer;
    if (key === 'highway') return highwayLayer;
    if (key === 'place-major') return majorPlacesLayer;
    if (key === 'place-detail') return detailPlacesLayer;
    if (key === 'fiber-edu') return fiberEduLayer;
    if (key === 'fiber-gov_agency') return fiberGovLayer;
    if (key === 'fiber-health') return fiberHealthLayer;
    if (key === 'fiber-school') return fiberSchoolsLayer;
    if (key === 'arch') return archLayer;
    if (key === 'hotels') return hotelsLayer;
    if (key === 'restaurants') return restaurantsLayer;
    if (key === 'masar') return masarLayer;
    if (key === 'contour') return contourLayer;
    return null;
  }

  function getLayerKeyFromLayer(layer) {
    // تستخدم عند Identify بالنقر على الخريطة حتى يكون التحديد بنفس أسلوب البحث.
    // المقارنة بالـ object نفسه أدق من الاعتماد على title؛ ثم نستخدم العنوان كاحتياط.
    if (!layer) return null;
    if (layer === govLayer) return 'gov';
    if (layer === liwaLayer) return 'liwa';
    if (layer === railLayer) return 'rail';
    if (layer === highwayLayer) return 'highway';
    if (layer === majorPlacesLayer) return 'place-major';
    if (layer === detailPlacesLayer) return 'place-detail';
    if (layer === fiberEduLayer) return 'fiber-edu';
    if (layer === fiberGovLayer) return 'fiber-gov_agency';
    if (layer === fiberHealthLayer) return 'fiber-health';
    if (layer === fiberSchoolsLayer) return 'fiber-school';
    if (layer === archLayer) return 'arch';
    if (layer === hotelsLayer) return 'hotels';
    if (layer === restaurantsLayer) return 'restaurants';
    if (layer === masarLayer) return 'masar';
    if (layer === contourLayer) return 'contour';
    if (layer === importedLayer) return 'imported';
    if (layer === editLayer) return 'edited-copy';

    const title = normalizeSearchText(layer.title || '');
    if (title.includes('المحافظات')) return 'gov';
    if (title.includes('الالويه') || title.includes('الالوية')) return 'liwa';
    if (title.includes('السكك')) return 'rail';
    if (title.includes('الطرق')) return 'highway';
    if (title.includes('مدن') || title.includes('بلدات')) return 'place-major';
    if (title.includes('تجمع')) return 'place-detail';
    if (title.includes('تربيه') || title.includes('تربية')) return 'fiber-edu';
    if (title.includes('حكوميه') || title.includes('حكومية')) return 'fiber-gov_agency';
    if (title.includes('صحيه') || title.includes('صحية')) return 'fiber-health';
    if (title.includes('مدارس') || title.includes('المدارس')) return 'fiber-school';
    if (title.includes('اثريه') || title.includes('اثرية')) return 'arch';
    if (title.includes('فنادق') || title.includes('الفنادق') || title.includes('الايواء') || title.includes('الإيواء')) return 'hotels';
    if (title.includes('مطاعم') || title.includes('المطاعم') || title.includes('طعام')) return 'restaurants';
    if (title.includes('درب الاردن') || title.includes('مسار')) return 'masar';
    if (title.includes('كنتور')) return 'contour';
    if (title.includes('المرفوعه') || title.includes('المرفوعة') || title.includes('gpx') || title.includes('kml')) return 'imported';
    return null;
  }

  function activateLayerForSearch(layerKey, options = {}) {
    const layer = getLayerByKey(layerKey);
    if (layer) layer.visible = true;
    if (layerKey === 'gov') {
      if (els.toggleGov) els.toggleGov.checked = true;
      if (els.toggleGovLabels) els.toggleGovLabels.checked = true;
      state.labelPrefs.gov = true;
    }
    if (layerKey === 'liwa') {
      if (els.toggleLiwa) els.toggleLiwa.checked = true;
      if (els.toggleLiwaLabels) els.toggleLiwaLabels.checked = true;
      state.labelPrefs.liwa = true;
    }
    if (layerKey === 'rail') {
      if (els.toggleRails) els.toggleRails.checked = true;
      if (els.toggleRailLabels) els.toggleRailLabels.checked = true;
      state.labelPrefs.rail = true;
    }
    if (layerKey === 'highway') {
      if (els.toggleHighways) els.toggleHighways.checked = true;
      if (els.toggleHighwayLabels) els.toggleHighwayLabels.checked = true;
      state.labelPrefs.highway = true;
    }
    if (layerKey === 'arch') {
      if (els.toggleArchSites) els.toggleArchSites.checked = true;
      if (els.toggleArchLabels) els.toggleArchLabels.checked = true;
      state.labelPrefs.arch = true;
    }
    if (layerKey === 'hotels') {
      if (els.toggleHotels) els.toggleHotels.checked = true;
      if (els.toggleHotelLabels) els.toggleHotelLabels.checked = true;
      state.labelPrefs.hotels = true;
    }
    if (layerKey === 'restaurants') {
      if (els.toggleRestaurants) els.toggleRestaurants.checked = true;
      if (els.toggleRestaurantLabels) els.toggleRestaurantLabels.checked = true;
      state.labelPrefs.restaurants = true;
    }
    if (layerKey === 'place-major' || layerKey === 'place-detail') {
      if (els.togglePlaces) els.togglePlaces.checked = true;
      if (els.togglePlaceLabels) els.togglePlaceLabels.checked = true;
      state.labelPrefs.place = true;
    }
    if (layerKey === 'masar') {
      if (els.toggleMasar) els.toggleMasar.checked = true;
      if (els.toggleMasarLabels) els.toggleMasarLabels.checked = true;
      state.labelPrefs.masar = true;
    }
    if (layerKey === 'contour') {
      if (els.toggleContours) els.toggleContours.checked = true;
    }
    if (layerKey?.startsWith('fiber-')) {
      if (els.toggleFiberLabels) els.toggleFiberLabels.checked = true;
      state.labelPrefs.fiber = true;
      if (layerKey === 'fiber-edu' && els.toggleFiberEdu) els.toggleFiberEdu.checked = true;
      if (layerKey === 'fiber-gov_agency' && els.toggleFiberGov) els.toggleFiberGov.checked = true;
      if (layerKey === 'fiber-health' && els.toggleFiberHealth) els.toggleFiberHealth.checked = true;
      if (layerKey === 'fiber-school' && els.toggleFiberSchools) els.toggleFiberSchools.checked = true;
    }
    if (!options.deferUpdate) updateScaleDrivenHierarchy();
  }

  async function handleSearchSelection(item) {
    if (!item) return;
    if (els.mapSearchInput) els.mapSearchInput.value = item.title || '';
    hideSuggestions();
    const layer = getLayerByKey(item.layerKey);
    state.selectedLayerKey = item.layerKey;
    activateLayerForSearch(item.layerKey, { deferUpdate: false });

    if (item.layerKey === 'hotels' && !item.feature?.geometry) {
      await clearSelection();
      state.selectedLayerKey = 'hotels';
      const details = describeGraphic('hotels', item.feature?.properties || {});
      if (els.selectionDetails) els.selectionDetails.innerHTML = details.html;
      if (els.featureInfo) els.featureInfo.textContent = `${details.title} — لا توجد إحداثيات مكانية لهذا السجل، لذلك لا يمكن تكبير الخريطة عليه.`;
      return;
    }

    // الانتقال يتم مباشرة من هندسة الفهرس حتى لا يتعطل بسبب OBJECTID أو إخفاء الطبقة بالهرمية.
    await goToSearchItem(item);

    let graphic = createGraphicFromSearchItem(item);
    // لا نجعل OBJECTID شرطًا للبحث؛ بعض الطبقات تأتي من OSM بأرقام كبيرة أو غير مستقرة.
    // لذلك نعتمد أولًا على هندسة الفهرس، ونستخدم الاستعلام فقط كحل احتياطي.
    if (!graphic && layer && item.objectId != null && item.objectId !== '') {
      graphic = await queryGraphicByObjectId(layer, item.objectId);
    }
    if (graphic) await selectGraphic(graphic, item.layerKey, { goTo: false, preNavigated: true, openPopup: true });
  }

  function getSearchPool() {
    const requested = els.mapSearchLayer?.value || 'all';
    if (requested === 'all') return state.searchIndex;
    if (requested === 'gov') return searchIndices.gov;
    if (requested === 'liwa') return searchIndices.liwa;
    if (requested === 'rail') return searchIndices.rail;
    if (requested === 'highway') return searchIndices.highway;
    if (requested === 'place') return [...searchIndices.placeMajor, ...searchIndices.placeDetail];
    if (requested === 'fiber') return searchIndices.fiber;
    if (requested === 'arch') return searchIndices.arch;
    if (requested === 'hotels') return searchIndices.hotels;
    if (requested === 'restaurants') return searchIndices.restaurants;
    if (requested === 'masar') return searchIndices.masar;
    if (requested === 'contour') return searchIndices.contour;
    return [];
  }

  function hideSuggestions() {
    els.searchSuggestions?.classList.add('hidden');
    if (els.searchSuggestions) els.searchSuggestions.innerHTML = '';
  }

  function getSearchScore(item, term) {
    const title = item.titleSearchText || normalizeSearchText(item.title);
    const text = item.searchText || '';
    if (!term) return 20 + item.layerPriority;
    if (title === term) return 0;
    if (title.startsWith(term)) return 1;
    if (title.split(' ').some((part) => part.startsWith(term))) return 2;
    if (title.includes(term)) return 3;
    if (text.startsWith(term)) return 4;
    if (text.includes(term)) return 5;
    return 99;
  }

  function getRankedSearchResults(term, limit = 30) {
    const pool = getSearchPool();
    const normalizedTerm = normalizeSearchText(term);
    const requested = els.mapSearchLayer?.value || 'all';
    if (!normalizedTerm) {
      if (requested === 'all') return [];
      return pool
        .slice()
        .sort((a, b) => (a.layerPriority - b.layerPriority) || String(a.title).localeCompare(String(b.title), 'ar'))
        .slice(0, limit);
    }
    return pool
      .filter((item) => item.searchText.includes(normalizedTerm))
      .map((item) => ({ item, score: getSearchScore(item, normalizedTerm) }))
      .sort((a, b) => (a.score - b.score) || (a.item.layerPriority - b.item.layerPriority) || (String(a.item.title).length - String(b.item.title).length) || String(a.item.title).localeCompare(String(b.item.title), 'ar'))
      .slice(0, limit)
      .map((entry) => entry.item);
  }

  function renderSuggestions(items) {
    state.renderedSearchResults = items.slice();
    if (!items.length) {
      els.searchSuggestions.innerHTML = '<div class="suggestion-empty">لا توجد نتائج مطابقة في الطبقة أو نطاق البحث المحدد.</div>';
      els.searchSuggestions.classList.remove('hidden');
      return;
    }
    els.searchSuggestions.innerHTML = items
      .map((item, index) => `
          <button class="suggestion-item" type="button" data-index="${index}" title="${escapeHtml(item.title)}">
            <span class="suggestion-title">${escapeHtml(item.title)}</span>
            <span class="suggestion-subtitle">${escapeHtml(item.subtitle)}</span>
          </button>`)
      .join('');
    els.searchSuggestions.classList.remove('hidden');
  }

  function performSearch() {
    const term = els.mapSearchInput?.value || '';
    const requested = els.mapSearchLayer?.value || 'all';
    const results = getRankedSearchResults(term, requested === 'all' ? 35 : 80);
    if (!normalizeSearchText(term) && requested === 'all') {
      hideSuggestions();
      return;
    }
    renderSuggestions(results);
  }

  function hasMapLayer(layer) {
    if (!layer || !map?.layers) return false;
    try {
      if (typeof map.layers.includes === 'function') return map.layers.includes(layer);
      if (typeof map.layers.toArray === 'function') return map.layers.toArray().includes(layer);
    } catch (e) {}
    return false;
  }

  function addLayerOnce(layer, index = BUILDING_LAYER_INSERT_INDEX) {
    if (!layer || hasMapLayer(layer)) return;
    try {
      map.add(layer, Math.max(0, Math.min(index, map.layers.length || index)));
    } catch (e) {
      console.warn('تعذر إضافة طبقة المباني.', e);
    }
  }

  function removeLayerIfPresent(layer) {
    if (!layer || !hasMapLayer(layer)) return;
    try {
      map.remove(layer);
    } catch (e) {
      console.warn('تعذر إزالة طبقة المباني.', e);
    }
  }

  function enforceOperationalLayerOrder() {
    // ترتيب ثابت: الصور الجوية في الأسفل، ثم المباني، ثم الطبقات التشغيلية والتسميات.
    try {
      if (hasMapLayer(aerialImageryLayer)) map.reorder(aerialImageryLayer, 0);
      if (hasMapLayer(buildings2dLayer)) map.reorder(buildings2dLayer, 1);
      if (hasMapLayer(buildings3dLayer)) map.reorder(buildings3dLayer, 1);
      if (hillshadeLayer && hasMapLayer(hillshadeLayer)) map.reorder(hillshadeLayer, 1);
    } catch (e) {
      console.warn('تعذر تثبيت ترتيب الطبقات فوق الصور الجوية.', e);
    }
  }

  function syncBuildingsForCurrentView() {
    const aerialActive = state.basemap === 'imagery';

    if (!aerialActive) {
      buildings2dLayer.visible = false;
      buildings3dLayer.visible = false;
      removeLayerIfPresent(buildings2dLayer);
      removeLayerIfPresent(buildings3dLayer);
      return;
    }

    if (state.viewMode === '3d') {
      buildings2dLayer.visible = false;
      removeLayerIfPresent(buildings2dLayer);
      addLayerOnce(buildings3dLayer, BUILDING_LAYER_INSERT_INDEX);
      buildings3dLayer.visible = true;
      enforceOperationalLayerOrder();
      try { map.ground = 'world-elevation'; } catch (e) {}
      return;
    }

    buildings3dLayer.visible = false;
    removeLayerIfPresent(buildings3dLayer);
    addLayerOnce(buildings2dLayer, BUILDING_LAYER_INSERT_INDEX);
    buildings2dLayer.visible = true;
    enforceOperationalLayerOrder();
  }

  function getBasemapId(mode, viewMode = state.viewMode) {
    // صور جوية خام بدون أسماء أو تسميات من خريطة الأساس.
    // عند ON نستخدم satellite وليس hybrid، حتى تظهر فقط أسماء الطبقات التي يفعلها المستخدم من لوحة الطبقات.
    if (mode === 'imagery') return 'satellite';
    return viewMode === '3d' ? 'topo-3d' : null;
  }

  function updateBasemapButtons() {
    const isImagery = state.basemap === 'imagery';
    const modeText = state.viewMode === '3d' ? '3D' : '2D';

    els.mapWrap?.classList.toggle('imagery', isImagery);
    els.aerial3dBtn?.classList.toggle('active', isImagery);

    if (els.aerial3dBtn) {
      const title = isImagery
        ? `إيقاف الصور الجوية في وضع ${modeText}`
        : `تشغيل الصور الجوية في وضع ${modeText}`;
      els.aerial3dBtn.title = title;
      els.aerial3dBtn.setAttribute('aria-label', title);
      els.aerial3dBtn.setAttribute('aria-pressed', isImagery ? 'true' : 'false');
      els.aerial3dBtn.textContent = '🛰️';
    }
  }

  function setBasemapMode(mode) {
    state.basemap = mode === 'imagery' ? 'imagery' : 'none';

    // يوجد الآن زران فقط للتحكم بالعرض:
    // 1) صور جوية ON/OFF: يفعّل الصور الجوية والمباني حسب الوضع الحالي.
    // 2) 2D/3D: يبدّل بين الخريطة الثنائية والمشهد الثلاثي الأبعاد.
    const targetBasemap = getBasemapId(state.basemap);
    map.basemap = targetBasemap;
    try { if (mapElement) mapElement.basemap = targetBasemap || undefined; } catch (e) {}
    try { if (sceneElement) sceneElement.basemap = targetBasemap || undefined; } catch (e) {}

    // هذه هي طبقة الصور الجوية الفعلية عند ON.
    // هي أول طبقة في الخريطة: تظهر أسفل المحافظات والطرق والرموز.
    aerialImageryLayer.visible = state.basemap === 'imagery';
    enforceOperationalLayerOrder();

    // اجعل ألوان المحافظات شفافة فوق الصور الجوية بدل أن تغطيها بالكامل.
    state.currentGovRendererKey = null;
    updateGovRenderer(getStage(view?.scale || state.nationalScale || NATIONAL_HOME_SCALE_FALLBACK));

    syncBuildingsForCurrentView();
    enforceOperationalLayerOrder();
    updateBasemapButtons();

    if (state.viewMode === '3d') {
      try {
        map.ground = 'world-elevation';
        applySceneVisualQuality(view);
      } catch (e) {}
    }

    if (!state.selectedGraphic) {
      if (state.viewMode === '3d' && state.basemap === 'imagery') {
        if (els.featureInfo) els.featureInfo.textContent = 'الصور الجوية مفعّلة في وضع 3D بدون أسماء من خريطة الأساس. تظهر فقط تسميات الطبقات التي تم تفعيلها، مع مباني OSM ثلاثية الأبعاد عند التكبير المناسب.';
        if (els.modeBadge) els.modeBadge.textContent = 'ArcGIS — صور جوية + مباني 3D';
      } else if (state.viewMode === '3d') {
        if (els.featureInfo) els.featureInfo.textContent = 'العرض ثلاثي الأبعاد مفعّل. زر الصور الجوية مستقل ويمكن تشغيله أو إيقافه دون تغيير وضع 2D/3D.';
        if (els.modeBadge) els.modeBadge.textContent = 'ArcGIS — 3D Scene';
      } else if (state.basemap === 'imagery') {
        if (els.featureInfo) els.featureInfo.textContent = 'الصور الجوية مفعّلة بدون أسماء من خريطة الأساس. تظهر فقط تسميات الطبقات المفعّلة من اللوحة، وتظهر المباني حسب وضع 2D/3D عند التكبير المناسب.';
        if (els.modeBadge) els.modeBadge.textContent = 'ArcGIS — صور جوية';
      } else {
        updateScaleDrivenHierarchy();
      }
    }
  }

  async function toggleAerialImageryBuildings() {
    const activating = state.basemap !== 'imagery';
    setBasemapMode(activating ? 'imagery' : 'none');

    if (activating) {
      if (state.viewMode === '3d') {
        try {
          const sv = await ensureSceneView();
          if (sv && view.camera?.clone) {
            const camera = view.camera.clone();
            camera.tilt = Math.max(camera.tilt || 0, 45);
            camera.heading = camera.heading || 0;
            await view.goTo(camera, { duration: 260 });
          }
        } catch (e) {}
      } else {
        await enforcePanWithinJordanExtent(0);
      }
    }

    updateScaleBadge();
    updateScaleDrivenHierarchy();
  }

  async function ensureSceneView() {
    if (!sceneElement) return null;
    if (sceneView) return sceneView;

    try {
      // ground="world-elevation" هو عنصر التفعيل الحقيقي للبعد الثالث.
      map.ground = 'world-elevation';
      sceneElement.map = map;
      sceneElement.popupComponentEnabled = true;
      sceneElement.classList.remove('hidden');
      sceneElement.style.visibility = 'hidden';
      await sceneElement.viewOnReady();
      sceneView = sceneElement.view;
      applyBaseViewSettings(sceneView);
      bindViewInteractions(sceneView);
      bindPopupWatcher(sceneView);
      sceneElement.style.visibility = '';
      sceneElement.classList.add('hidden');
      return sceneView;
    } catch (e) {
      console.error('3D Scene could not be initialized.', e);
      if (els.featureInfo) els.featureInfo.textContent = 'تعذر تفعيل العرض ثلاثي الأبعاد. تحقق من اتصال الإنترنت ومكتبة ArcGIS.';
      sceneElement?.classList.add('hidden');
      return null;
    }
  }

  async function setViewMode(mode) {
    if (mode === state.viewMode) return;
    if (mode === '3d') {
      const sv = await ensureSceneView();
      if (!sv) return;
      state.viewMode = '3d';
      view = sv;
      mapElement.classList.add('hidden');
      sceneElement.classList.remove('hidden');
      els.mapWrap?.classList.add('is-3d');
      els.view3dBtn?.classList.add('active');
      if (els.view3dBtn) {
        els.view3dBtn.textContent = '2D';
        els.view3dBtn.title = 'العودة إلى العرض ثنائي الأبعاد';
        els.view3dBtn.setAttribute('aria-label', 'العودة إلى العرض ثنائي الأبعاد');
      }
      if (els.modeBadge) els.modeBadge.textContent = state.basemap === 'imagery' ? 'ArcGIS — صور جوية + مباني 3D' : 'ArcGIS — 3D Scene';
      setBasemapMode(state.basemap);
      applyNationalZoomConstraints(view);
      await goHome(450);
      try {
        if (view.camera?.clone) {
          const camera = view.camera.clone();
          camera.tilt = 38;
          camera.heading = 0;
          await view.goTo(camera, { duration: 220 });
        }
      } catch (e) {}
      updateScaleBadge();
      updateScaleDrivenHierarchy();
      return;
    }

    state.viewMode = '2d';
    view = mapView;
    sceneElement?.classList.add('hidden');
    mapElement.classList.remove('hidden');
    els.mapWrap?.classList.remove('is-3d');
    els.view3dBtn?.classList.remove('active');
    if (els.view3dBtn) {
      els.view3dBtn.textContent = '3D';
      els.view3dBtn.title = 'تفعيل العرض ثلاثي الأبعاد';
      els.view3dBtn.setAttribute('aria-label', 'تفعيل العرض ثلاثي الأبعاد');
    }
    if (els.modeBadge) els.modeBadge.textContent = 'ArcGIS — الخارطة السياحية الذكية';
    setBasemapMode(state.basemap);
    applyNationalZoomConstraints(view);
    await goHome(350);
    updateScaleBadge();
    updateScaleDrivenHierarchy();
  }

  function bindPopupWatcher(targetView) {
    const popupWatcher = targetView?.popup;
    if (!popupWatcher || typeof popupWatcher.watch !== 'function' || popupWatcher.__jordanPopupBound) return;
    popupWatcher.__jordanPopupBound = true;
    popupWatcher.watch('visible', async (visible) => {
      if (targetView !== view) return;
      if (!visible && !popupWatcher.selectedFeature) {
        await clearSelection();
      }
    });

    popupWatcher.watch('selectedFeature', async (graphic) => {
      if (targetView !== view || !graphic) return;
      const layerKey = graphic.layer === govLayer ? 'gov'
        : graphic.layer === liwaLayer ? 'liwa'
        : graphic.layer === railLayer ? 'rail'
        : graphic.layer === highwayLayer ? 'highway'
        : graphic.layer === majorPlacesLayer ? 'place-major'
        : graphic.layer === detailPlacesLayer ? 'place-detail'
        : graphic.layer === fiberEduLayer ? 'fiber-edu'
        : graphic.layer === fiberGovLayer ? 'fiber-gov_agency'
        : graphic.layer === fiberHealthLayer ? 'fiber-health'
        : graphic.layer === fiberSchoolsLayer ? 'fiber-school'
        : graphic.layer === hotelsLayer ? 'hotels'
        : graphic.layer === restaurantsLayer ? 'restaurants'
        : graphic.layer === masarLayer ? 'masar'
        : graphic.layer === contourLayer ? 'contour'
        : graphic.layer === archLayer ? 'arch'
        : null;
      if (!layerKey) return;
      await selectGraphic(graphic, layerKey, { goTo: false, openPopup: false });
    });
  }

  function bindViewInteractions(targetView) {
    if (!targetView || targetView.__jordanInteractionsBound) return;
    targetView.__jordanInteractionsBound = true;

    targetView.on('drag', (event) => {
      if (targetView !== view) return;
      if (isAtOrBeyondNationalView()) {
        event.stopPropagation();
        return;
      }
      requestAnimationFrame(() => enforcePanWithinJordanExtent(0));
    });

    targetView.on('mouse-wheel', (event) => {
      if (targetView !== view) return;
      const deltaY = Number(event.deltaY ?? event.native?.deltaY ?? 0);
      if (deltaY > 0 && isAtOrBeyondNationalView()) {
        event.stopPropagation();
        fitJordanFullView(0);
      }
    });

    targetView.on('double-click', (event) => {
      if (targetView !== view) return;
      if (event.native && event.native.shiftKey && isAtOrBeyondNationalView()) {
        event.stopPropagation();
      }
    });

    targetView.watch('scale', () => {
      if (targetView !== view) return;
      updateScaleBadge();
      enforceNationalViewLock();
      enforcePanWithinJordanExtent(0);
    });
    targetView.watch('extent', () => {
      if (targetView !== view) return;
      if (!targetView.interacting && !targetView.animation) enforcePanWithinJordanExtent(0);
    });
    targetView.watch('stationary', (stationary) => {
      if (targetView !== view) return;
      if (stationary) {
        enforceNationalViewLock();
        enforcePanWithinJordanExtent(0);
      }
    });

    targetView.on('click', async (event) => {
      if (targetView !== view) return;
      const hit = await targetView.hitTest(event, { include: [govLayer, liwaLayer, railLayer, highwayLayer, majorPlacesLayer, detailPlacesLayer, fiberEduLayer, fiberGovLayer, fiberHealthLayer, fiberSchoolsLayer, hotelsLayer, restaurantsLayer, masarLayer, contourLayer, archLayer, importedLayer, editLayer] });
      const graphic = hit.results?.find((result) => result?.graphic?.layer)?.graphic || hit.results?.[0]?.graphic;
      if (graphic) {
        const layerKey = getLayerKeyFromLayer(graphic.layer);
        if (layerKey) {
          // Identify بالنقر يستخدم الآن نفس دالة البحث: تفاصيل + Popup + Highlight أزرق + Overlay أزرق.
          await selectGraphic(graphic, layerKey, { goTo: false, openPopup: true, location: event.mapPoint });
          return;
        }
      }

      await clearSelection();
      targetView.popup?.close?.();
      const point = event.mapPoint;
      if (point && els.featureInfo) {
        const lon = Number(point.longitude ?? point.x);
        const lat = Number(point.latitude ?? point.y);
        if (Number.isFinite(lon) && Number.isFinite(lat)) els.featureInfo.textContent = `إحداثيات الموقع: ${lon.toFixed(5)}, ${lat.toFixed(5)}`;
      }
    });
  }

  // امنع مرور نقرات أزرار التحكم إلى الخريطة نفسها.
  els.mapWrap?.querySelectorAll('.map-nav-controls button').forEach((btn) => {
    ['pointerdown', 'mousedown', 'touchstart', 'click', 'dblclick', 'wheel'].forEach((evtName) => {
      btn.addEventListener(evtName, (event) => {
        event.stopPropagation();
        if (evtName === 'wheel') event.preventDefault();
      }, { passive: false });
    });
  });

  bindViewInteractions(mapView);
  bindImportAndEditControls();
  bindPopupWatcher(mapView);

  els.toggleGov?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleGovLabels?.addEventListener('change', () => { state.labelPrefs.gov = els.toggleGovLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleLiwa?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleLiwaLabels?.addEventListener('change', () => { state.labelPrefs.liwa = els.toggleLiwaLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleRails?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleRailLabels?.addEventListener('change', () => { state.labelPrefs.rail = els.toggleRailLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleHighways?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleHighwayLabels?.addEventListener('change', () => { state.labelPrefs.highway = els.toggleHighwayLabels.checked; updateScaleDrivenHierarchy(); });
  els.togglePlaces?.addEventListener('change', updateScaleDrivenHierarchy);
  els.togglePlaceLabels?.addEventListener('change', () => { state.labelPrefs.place = els.togglePlaceLabels.checked; updateScaleDrivenHierarchy(); });
  [els.toggleFiberEdu, els.toggleFiberGov, els.toggleFiberHealth, els.toggleFiberSchools].forEach((toggle) => toggle?.addEventListener('change', updateScaleDrivenHierarchy));
  els.toggleFiberLabels?.addEventListener('change', () => { state.labelPrefs.fiber = els.toggleFiberLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleMasar?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleMasarLabels?.addEventListener('change', () => { state.labelPrefs.masar = els.toggleMasarLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleContours?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleHillshade?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleArchSites?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleArchLabels?.addEventListener('change', () => { state.labelPrefs.arch = els.toggleArchLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleHotels?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleHotelLabels?.addEventListener('change', () => { state.labelPrefs.hotels = els.toggleHotelLabels.checked; updateScaleDrivenHierarchy(); });
  els.toggleRestaurants?.addEventListener('change', updateScaleDrivenHierarchy);
  els.toggleRestaurantLabels?.addEventListener('change', () => { state.labelPrefs.restaurants = els.toggleRestaurantLabels.checked; updateScaleDrivenHierarchy(); });

  async function zoomActiveView(direction) {
    const nationalScale = Number(state.nationalScale || NATIONAL_HOME_SCALE_FALLBACK);
    const currentScale = Number(view.scale || nationalScale);

    if (direction > 0 && currentScale >= nationalScale * 0.995) {
      await fitJordanFullView(0);
      updateScaleBadge();
      return;
    }

    if (isSceneView(view) && view.camera?.clone) {
      const camera = view.camera.clone();
      const factor = direction < 0 ? 1 / 1.45 : 1.45;
      if (camera.position) camera.position.z = Math.max(150, Number(camera.position.z || 10000) * factor);
      await view.goTo(camera, { duration: 220 });
      if (direction > 0 && Number(view.scale || 0) >= nationalScale) await fitJordanFullView(0);
      updateScaleBadge();
      return;
    }

    const nextScale = direction < 0
      ? Math.max(5000, currentScale / 1.45)
      : Math.min(nationalScale, currentScale * 1.45);
    await view.goTo({ center: view.center, scale: nextScale }, { duration: 220 });
    if (direction > 0) await enforceNationalViewLock();
    await enforcePanWithinJordanExtent(0);
    updateScaleBadge();
  }

  els.zoomInBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await zoomActiveView(-1);
  });
  els.zoomOutBtn?.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await zoomActiveView(1);
  });
  els.homeBtn?.addEventListener('click', () => goHome(550));
  els.mapHomeBtn?.addEventListener('click', () => goHome(550));
  els.resetNorthBtn?.addEventListener('click', () => goHome(550));
  els.clearHighlightBtn?.addEventListener('click', async () => { view.popup?.close?.(); await clearSelection(); });
  els.view3dBtn?.addEventListener('click', () => setViewMode(state.viewMode === '3d' ? '2d' : '3d'));
  els.aerial3dBtn?.addEventListener('click', toggleAerialImageryBuildings);

  els.exportBtn?.addEventListener('click', downloadProfessionalPng);

  els.exportPdfBtn?.addEventListener('click', downloadProfessionalPdf);

  els.aiAssistantBtn?.addEventListener('click', () => {
    if (els.aiAssistantPanel?.classList.contains('hidden')) openAiPanel(); else closeAiPanel();
  });
  els.aiAssistantClose?.addEventListener('click', closeAiPanel);
  els.aiAssistantMinimize?.addEventListener('click', () => toggleAiPanelMinimized());
  els.aiModeButtons?.forEach(btn => btn.addEventListener('click', () => setAiMode(btn.dataset.aiMode)));
  els.aiQuickButtons?.forEach(btn => btn.addEventListener('click', () => {
    if (els.aiQuestionInput) els.aiQuestionInput.value = btn.dataset.aiQuestion || '';
    askAiAssistant();
  }));
  els.aiAskBtn?.addEventListener('click', askAiAssistant);
  els.aiQuestionInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      askAiAssistant();
    }
  });
  els.aiClearBtn?.addEventListener('click', () => {
    clearAiMapResults();
    if (els.aiQuestionInput) els.aiQuestionInput.value = '';
    if (els.aiAnswerBox) els.aiAnswerBox.innerHTML = '<strong>جاهز.</strong> تم مسح نتائج المساعد من الخريطة. اكتب سؤالاً جديداً أو اختر سؤالاً سريعاً.';
  });

  els.aiAnswerBox?.addEventListener('click', (event) => {
    const btn = event.target?.closest?.('[data-ai-zoom-index]');
    if (!btn) return;
    const index = Number(btn.getAttribute('data-ai-zoom-index'));
    const item = state.aiResultItems?.[index];
    if (!item?.center) return;
    ai2GoTo(item.center, 1.2).then(() => ai2OpenResultPopup(index));
  });

  window.addEventListener('resize', () => {
    if (!els.aiAssistantPanel?.classList.contains('hidden')) applyAiPanelMapPadding();
  });

  els.sidebarToggleBtn?.addEventListener('click', () => {
    els.appShell.classList.toggle('sidebar-collapsed');
    updateSidebarToggleButton();
    setTimeout(() => view.resize(), 260);
  });

  els.layerHelpBtn?.addEventListener('click', () => {
    els.layerHelpModal.classList.remove('hidden');
    els.layerHelpModal.setAttribute('aria-hidden', 'false');
  });
  els.closeLayerHelpBtn?.addEventListener('click', () => {
    els.layerHelpModal.classList.add('hidden');
    els.layerHelpModal.setAttribute('aria-hidden', 'true');
  });
  els.layerHelpModal?.addEventListener('click', (event) => {
    if (event.target === els.layerHelpModal) {
      els.layerHelpModal.classList.add('hidden');
      els.layerHelpModal.setAttribute('aria-hidden', 'true');
    }
  });

  els.searchBox?.addEventListener('input', () => renderGovTable(els.searchBox.value));
  els.searchSuggestions?.addEventListener('pointerdown', async (event) => {
    const button = event.target?.closest?.('.suggestion-item');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const index = Number(button.dataset.index);
    const item = state.renderedSearchResults[index];
    if (item) await handleSearchSelection(item);
  }, true);
  els.searchSuggestions?.addEventListener('click', async (event) => {
    const button = event.target?.closest?.('.suggestion-item');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const index = Number(button.dataset.index);
    const item = state.renderedSearchResults[index];
    if (item) await handleSearchSelection(item);
  }, true);
  els.mapSearchInput?.addEventListener('input', performSearch);
  els.mapSearchInput?.addEventListener('keyup', performSearch);
  els.mapSearchInput?.addEventListener('search', performSearch);
  els.mapSearchInput?.addEventListener('focus', performSearch);
  els.mapSearchInput?.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const match = getRankedSearchResults(els.mapSearchInput.value, 1)[0];
      if (match) await handleSearchSelection(match);
    }
  });
  els.mapSearchLayer?.addEventListener('change', () => {
    performSearch();
    els.mapSearchInput?.focus?.();
  });
  els.mapSearchClear?.addEventListener('click', () => {
    els.mapSearchInput.value = '';
    if ((els.mapSearchLayer?.value || 'all') === 'all') hideSuggestions();
    else performSearch();
  });
  document.addEventListener('click', (event) => {
    if (els.searchSuggestions && !els.searchSuggestions.contains(event.target) && event.target !== els.mapSearchInput) {
      hideSuggestions();
    }
  });

  await view.when();
  setBasemapMode(state.basemap);

  await govLayer.when();
  const govExtentResult = await govLayer.queryExtent();
  const jordanFullExtent = (govExtentResult?.extent || state.fullExtent.clone()).clone().expand(1.08);
  state.jordanTargetExtent = jordanFullExtent;
  await rebuildNationalViewLock(0);
  await enforcePanWithinJordanExtent(0);

  // تأكيد تحديث مؤشر المقياس عند التحميل الأول، بعد استقرار الخريطة والقيود.
  updateScaleBadge();
  updateSidebarToggleButton();
  requestAnimationFrame(updateScaleBadge);

  // إعادة رسم تسميات الخريطة بعد تحميل الخط المحلي، حتى تستخدم أسماء الطبقات خط Tajawal عند توفره.
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      try {
        Object.values(state.layers || {}).forEach((layer) => {
          if (layer && typeof layer.refresh === 'function') layer.refresh();
        });
        updateScaleBadge();
      } catch (error) {
        console.warn('تعذر تحديث الطبقات بعد تحميل الخط المحلي:', error);
      }
    });
  }
  hideSuggestions();
  await clearSelection();

  window.addEventListener('resize', () => {
    if (state.lockRecenterBusy) return;
    if (isAtOrBeyondNationalView()) {
      setTimeout(() => { rebuildNationalViewLock(0); }, 80);
    }
  });

  window.addEventListener('beforeunload', () => {
    [govUrl, liwaUrl, railUrl, highwayUrl, majorPlacesUrl, detailPlacesUrl, fiberEduUrl, fiberGovUrl, fiberHealthUrl, fiberSchoolsUrl, masarUrl, contourUrl, archUrl].forEach((url) => URL.revokeObjectURL(url));
  });
})();
