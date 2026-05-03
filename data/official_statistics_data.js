window.OFFICIAL_STATS = {
  metadata: {
    title: 'المؤشرات الرسمية المرتبطة مكانياً',
    years: [2021, 2022, 2023, 2024, 2025],
    note: 'هذه النسخة تعرض فقط الأرقام التي تم إدخالها رقمياً والتحقق من مصدرها: السكان والكثافة 2025 من دائرة الإحصاءات، والبطالة حسب المحافظة 2024 من دائرة الإحصاءات، ومؤشرات الإيواء 2024 من جداول دائرة الإحصاءات/السياحة المدمجة سابقاً. بيانات وزارة السياحة تظهر كحزمة ملفات رسمية مرتبطة، ولا تُعرض كأرقام إلا بعد تحويل كل ملف Excel إلى JSON.',
    sources: [
      { name: 'دائرة الإحصاءات العامة - التقديرات السكانية 2025', url: 'https://dosweb.dos.gov.jo/DataBank/population/population_Estimares/PopulationEstimates.pdf' },
      { name: 'دائرة الإحصاءات العامة - الأردن بالأرقام 2025 / بطالة 2024', url: 'https://dosweb.dos.gov.jo/databank/JordanInFigures/Jorinfo_2024.pdf' },
      { name: 'وزارة السياحة والآثار - الإحصائيات السياحية', url: 'https://www.mota.gov.jo/AR/List/ar_statisiics' },
      { name: 'وزارة السياحة والآثار - إحصائيات 2025', url: 'https://www.mota.gov.jo/AR/List/الاحصائيات_السياحية_لعام_2025' },
      { name: 'وزارة السياحة والآثار - إحصائيات 2024', url: 'https://www.mota.gov.jo/AR/List/الاحصائيات_السياحية_لعام_2024' }
    ]
  },
  govAliases: {
    'عمان': 'amman', 'عمّان': 'amman', 'العاصمة': 'amman', 'محافظة العاصمة': 'amman', 'Amman': 'amman',
    'البلقاء': 'balqa', 'Balqa': 'balqa', 'Balqaa': 'balqa',
    'الزرقاء': 'zarqa', 'Zarqa': 'zarqa',
    'مادبا': 'madaba', 'مأدبا': 'madaba', 'Madaba': 'madaba',
    'إربد': 'irbid', 'اربد': 'irbid', 'Irbid': 'irbid',
    'المفرق': 'mafraq', 'Mafraq': 'mafraq',
    'جرش': 'jarash', 'Jerash': 'jarash', 'Jarash': 'jarash',
    'عجلون': 'ajloun', 'Ajloun': 'ajloun', 'Ajlun': 'ajloun',
    'الكرك': 'karak', 'Karak': 'karak',
    'الطفيلة': 'tafiela', 'Tafiela': 'tafiela', 'Tafilah': 'tafiela',
    'معان': 'maan', "Ma'an": 'maan', 'Maan': 'maan',
    'العقبة': 'aqaba', 'Aqaba': 'aqaba'
  },
  governorates: {
    amman: { name_ar: 'العاصمة / عمّان', population2025: { total: 5004600, male: 2689000, female: 2315600, share: 41.9, urban: 4865300, rural: 139300, area_km2: 7579, density: 660.3 }, unemployment2024: 20.7 },
    balqa: { name_ar: 'البلقاء', population2025: { total: 614000, male: 329900, female: 284100, share: 5.1, urban: 504100, rural: 109900, area_km2: 1120, density: 548.0 }, unemployment2024: 22.1 },
    zarqa: { name_ar: 'الزرقاء', population2025: { total: 1704500, male: 901800, female: 802700, share: 14.3, urban: 1642500, rural: 62000, area_km2: 4761, density: 358.0 }, unemployment2024: 22.5 },
    madaba: { name_ar: 'مادبا', population2025: { total: 236200, male: 125000, female: 111200, share: 2.0, urban: 184800, rural: 51400, area_km2: 940, density: 251.4 }, unemployment2024: 20.5 },
    irbid: { name_ar: 'إربد', population2025: { total: 2210500, male: 1143000, female: 1067500, share: 18.5, urban: 2041400, rural: 169100, area_km2: 1572, density: 1406.4 }, unemployment2024: 22.2 },
    mafraq: { name_ar: 'المفرق', population2025: { total: 686800, male: 354300, female: 332500, share: 5.8, urban: 478400, rural: 208400, area_km2: 26551, density: 25.9 }, unemployment2024: 23.2 },
    jarash: { name_ar: 'جرش', population2025: { total: 296000, male: 154000, female: 142000, share: 2.5, urban: 227800, rural: 68200, area_km2: 410, density: 722.3 }, unemployment2024: 20.9 },
    ajloun: { name_ar: 'عجلون', population2025: { total: 219900, male: 113300, female: 106600, share: 1.8, urban: 184500, rural: 35400, area_km2: 420, density: 524.0 }, unemployment2024: 21.2 },
    karak: { name_ar: 'الكرك', population2025: { total: 395400, male: 206700, female: 188700, share: 3.3, urban: 233800, rural: 161600, area_km2: 3495, density: 113.1 }, unemployment2024: 20.2 },
    tafiela: { name_ar: 'الطفيلة', population2025: { total: 120300, male: 63000, female: 57300, share: 1.0, urban: 93800, rural: 26500, area_km2: 2209, density: 54.4 }, unemployment2024: 21.9 },
    maan: { name_ar: 'معان', population2025: { total: 197900, male: 103300, female: 94600, share: 1.7, urban: 107000, rural: 90900, area_km2: 32832, density: 6.0 }, unemployment2024: 23.2 },
    aqaba: { name_ar: 'العقبة', population2025: { total: 250900, male: 136600, female: 114300, share: 2.1, urban: 221300, rural: 29600, area_km2: 6905, density: 36.3 }, unemployment2024: 17.3 }
  },
  tourismAccommodation2024: {
    amman: { label: 'عمان', units: 376, rooms: 17647, beds: 34372, employees: 13852, note: 'مصنفة + غير مصنفة + شقق وأجنحة + نزل/مخيمات' },
    aqaba: { label: 'العقبة', units: 101, rooms: 6560, beds: 12247, employees: 2692, note: 'مصنفة + نزل/موتيلات/مخيمات' },
    maan: { label: 'معان / البترا / وادي رم', units: 318, rooms: 7087, beds: 13313, employees: 2020, note: 'تجميع معان + البترا + وادي رم' },
    karak: { label: 'الكرك', units: 5, rooms: 86, beds: 130, employees: 39, note: 'مصنفة + غير مصنفة' },
    ajloun: { label: 'عجلون', units: 8, rooms: 106, beds: 184, employees: 68, note: 'مصنفة + شقق/أجنحة + نزل/مخيمات' },
    irbid: { label: 'إربد', units: 28, rooms: 386, beds: 972, employees: 202, note: 'مصنفة + غير مصنفة + شقق/أجنحة' },
    balqa: { label: 'البلقاء / البحر الميت', units: 14, rooms: 2371, beds: 3514, employees: 2942, note: 'البلقاء + البحر الميت' },
    zarqa: { label: 'الزرقاء / الأزرق', units: 7, rooms: 89, beds: 316, employees: 53, note: 'الزرقاء + الأزرق + شقق/أجنحة' },
    madaba: { label: 'مادبا', units: 26, rooms: 610, beds: 1063, employees: 333, note: 'مصنفة + غير مصنفة + شقق/أجنحة + نزل/مخيمات' },
    tafiela: { label: 'الطفيلة', units: 17, rooms: 230, beds: 375, employees: 94, note: 'مصنفة + غير مصنفة + نزل/مخيمات' },
    mafraq: { label: 'المفرق', units: 3, rooms: 35, beds: 157, employees: 41, note: 'مصنفة + شقق/أجنحة' },
    jarash: { label: 'جرش', units: 7, rooms: 138, beds: 281, employees: 53, note: 'مصنفة + غير مصنفة + شقق/أجنحة + نزل/مخيمات' }
  },
  motaOfficialPackages: {
    2025: [
      'المنشآت السياحية والعاملون لعام 2025',
      'تصنيف الزوار لعام 2025',
      'المجموعات السياحية لعام 2025',
      'الدخل والإنفاق السياحي لعام 2025',
      'زوار المواقع الأثرية والسياحية لعام 2025',
      'إحصاءات مؤسسات الإيواء السياحي لعام 2025'
    ],
    2024: [
      'الفعاليات السياحية وأعداد العاملين',
      'تصنيف الزوار',
      'المجموعات السياحية',
      'الدخل والإنفاق السياحي',
      'زوار المواقع السياحية لعام 2024',
      'إحصاءات مؤسسات الإيواء السياحي لعام 2024'
    ]
  },
  currentMapLayers: {
    hotels: { total: 349, source: 'طبقة الفنادق داخل التطبيق' },
    restaurants: { total: 709, source: 'طبقة المطاعم داخل التطبيق' }
  }
};
