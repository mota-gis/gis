(function(){
  const govData = window.GOV_DATA;
  const liwaData = window.LIWA_DATA;
  const railData = window.RAIL_DATA;
  const highwayData = window.HIGHWAY_DATA;
  const placesExtraData = window.PLACES_EXTRA_DATA;
  const fiberLayersData = window.FIBER_LAYERS_DATA;
  const contourData = window.CONTOUR_DATA;
  const elevationGrid = window.ELEVATION_GRID;
  const archSitesData = window.ARCH_SITES_DATA || {type:'FeatureCollection',features:[]};
  const masarData = window.MASAR_DATA || {type:'FeatureCollection',features:[]};

  const GOV_COLORS = {
    'إربد':'#2A9D8F','عجلون':'#8FD6C3','جرش':'#F4A261','البلقاء':'#E9C46A','الزرقاء':'#4A90E2','عمان':'#5B6C9E','مأدبا':'#7B6FD6','مادبا':'#7B6FD6','الكرك':'#E76F51','الطفيلة':'#A78BFA','معان':'#6C757D','العقبة':'#70A1D7','المفرق':'#6AB187'
  };
  const PALE_GOV = '#F6EFCF';
  const LIWA_STYLE = { stroke:'#8b6f1f', fill:'rgba(233,196,106,0.08)', width:1.2, dash:[5,4] };
  const PLACE_STYLE = { city:{fill:'#b91c1c', radius:5.2}, town:{fill:'#7c3aed', radius:4.4}, village:{fill:'#0f766e', radius:3.4} };
  const CONTOUR_STYLE = { stroke:'rgba(113, 87, 28, 0.55)', width:1.05, majorStroke:'rgba(96,72,17,.72)', majorWidth:1.5 };
  const FIBER_STYLE = { edu:{fill:'#0ea5e9', radius:4.8, stroke:'#ffffff'}, gov_agency:{fill:'#ef4444', radius:4.8, stroke:'#ffffff'}, health:{fill:'#10b981', radius:4.8, stroke:'#ffffff'}, school:{fill:'#8b5cf6', radius:3.8, stroke:'#ffffff'} };
  const ARCH_STYLE = { fill:'#b45309', radius:6, stroke:'#ffffff' };
  const MASAR_STYLE = { stroke:'#0f766e', halo:'rgba(255,255,255,0.95)', width:3.4, selected:'#f59e0b' };

  const SERVICE_STYLE = {
    main:{stroke:'#364152', width:2.8, dash:[]},
    service:{stroke:'#2f6fb0', width:2.1, dash:[8,6]},
    historic:{stroke:'#a56a32', width:1.9, dash:[4,6]},
  };
  const ROAD_STYLE = {
    major:{stroke:'#c2410c', width:2.8, dash:[]},
    medium:{stroke:'#e09f3e', width:2.2, dash:[]},
    local:{stroke:'#8b5e3c', width:1.55, dash:[]},
    minor:{stroke:'#7c8aa5', width:1.2, dash:[4,4]},
  };

  const els = {
    canvas: document.getElementById('mapCanvas'), mapWrap: document.getElementById('mapWrap'), featureInfo: document.getElementById('featureInfo'),
    selectionDetails: document.getElementById('selectionDetails'), govLegend: document.getElementById('govLegend'), railLegendWrap: document.getElementById('railLegendWrap'), highwayLegendWrap: document.getElementById('highwayLegendWrap'), placeLegendWrap: document.getElementById('placeLegendWrap'), fiberLegendWrap: document.getElementById('fiberLegendWrap'), archLegendWrap: document.getElementById('archLegendWrap'),
    modeBadge: document.getElementById('modeBadge'), zoomBadge: document.getElementById('zoomBadge'), zoomHint: document.getElementById('zoomHint'), highwayZoomBadge: document.getElementById('highwayZoomBadge'),
    toggleGov: document.getElementById('toggleGov'), toggleGovLabels: document.getElementById('toggleGovLabels'), toggleLiwa: document.getElementById('toggleLiwa'), toggleLiwaLabels: document.getElementById('toggleLiwaLabels'), toggleRails: document.getElementById('toggleRails'), toggleRailLabels: document.getElementById('toggleRailLabels'),
    toggleHighways: document.getElementById('toggleHighways'), toggleHighwayLabels: document.getElementById('toggleHighwayLabels'), togglePlaces: document.getElementById('togglePlaces'), togglePlaceLabels: document.getElementById('togglePlaceLabels'), toggleFiberEdu: document.getElementById('toggleFiberEdu'), toggleFiberGov: document.getElementById('toggleFiberGov'), toggleFiberHealth: document.getElementById('toggleFiberHealth'), toggleFiberSchools: document.getElementById('toggleFiberSchools'), toggleFiberLabels: document.getElementById('toggleFiberLabels'), toggleArchSites: document.getElementById('toggleArchSites'), toggleArchLabels: document.getElementById('toggleArchLabels'), toggleMasar: document.getElementById('toggleMasar'), toggleMasarLabels: document.getElementById('toggleMasarLabels'), toggleHillshade: document.getElementById('toggleHillshade'), toggleContours: document.getElementById('toggleContours'),
    homeBtn: document.getElementById('homeBtn'), layerHelpBtn: document.getElementById('layerHelpBtn'), basemapBtn: document.getElementById('basemapBtn'), sidebarToggleBtn: document.getElementById('sidebarToggleBtn'), exportBtn: document.getElementById('exportBtn'), exportPdfBtn: document.getElementById('exportPdfBtn'), clearHighlightBtn: document.getElementById('clearHighlightBtn'),
    zoomInBtn: document.getElementById('zoomInBtn'), zoomOutBtn: document.getElementById('zoomOutBtn'), resetNorthBtn: document.getElementById('resetNorthBtn'),
    kpiGovCount: document.getElementById('kpiGovCount'), kpiRailCount: document.getElementById('kpiRailCount'), kpiHighwayCount: document.getElementById('kpiHighwayCount'), kpiPopulation: document.getElementById('kpiPopulation'), kpiTopGov: document.getElementById('kpiTopGov'),
    govTableBody: document.getElementById('govTableBody'), searchBox: document.getElementById('searchBox'),
    mapSearchInput: document.getElementById('mapSearchInput'), mapSearchLayer: document.getElementById('mapSearchLayer'), mapSearchClear: document.getElementById('mapSearchClear'), searchSuggestions: document.getElementById('searchSuggestions'), layerHelpModal: document.getElementById('layerHelpModal'), closeLayerHelpBtn: document.getElementById('closeLayerHelpBtn')
  };

  function decodeArabicMojibake(value){
    if(value == null) return '';
    const s = String(value).trim();
    if(!s) return '';
    try{ if(/[\u0600-\u06FF]/.test(s)) return s; return decodeURIComponent(escape(s)); }catch(e){}
    try{ return new TextDecoder('windows-1256').decode(Uint8Array.from([...s].map(ch => ch.charCodeAt(0) & 0xFF))); }catch(e){}
    return s;
  }
  const GOV_NAME_MAP = {
    'Aqaba':'العقبة','Ajloun':'عجلون','Ajlun':'عجلون','Amman':'عمان','Balqa':'البلقاء','Irbid':'إربد',
    'Jerash':'جرش','Jarash':'جرش','Karak':'الكرك','Mafraq':'المفرق','Madaba':'مادبا',"Ma'an":'معان','Maan':'معان','Tafiela':'الطفيلة','Tafilah':'الطفيلة','Zarqa':'الزرقاء'
  };
  const GOV_LABEL_POINTS = {
    'Aqaba':[35.20914,29.989996], 'Irbid':[35.816178,32.498879], "Ma'an":[36.524385,30.223496],
    'Madaba':[35.709609,31.61324], 'Mafraq':[38.203368,32.609451], 'Jarash':[35.878769,32.264596],
    'Jerash':[35.878769,32.264596], 'Karak':[35.851594,31.142788], 'Ajlun':[35.702188,32.317124],
    'Ajloun':[35.702188,32.317124], 'Balqa':[35.662292,31.981986], 'Amman':[36.312988,31.669709],
    'Zarqa':[36.835037,31.874682], 'Tafiela':[35.687011,30.801989], 'Tafilah':[35.687011,30.801989]
  };
  function getGovArabicName(props){
    const decoded = decodeArabicMojibake(props.Name_A || '');
    if(decoded && /[\u0600-\u06FF]/.test(decoded)) return decoded;
    return GOV_NAME_MAP[props.NIC_NAME_E] || props.NIC_NAME_E || '—';
  }
  function getLiwaArabicName(props){
    return decodeArabicMojibake(props.name || '') || props.name || 'لواء';
  }
  function getPlaceArabicName(props){
    return decodeArabicMojibake(props.name || '') || props.name || 'موقع';
  }
  function normalizePlaceType(props){
    const f=(props.fclass||'').toLowerCase();
    if(f==='national_capital' || f==='city') return 'city';
    if(f==='town' || f==='suburb') return 'town';
    return 'village';
  }
  function getPlaceTypeLabel(feature){
    return feature._type==='city' ? 'مدينة' : feature._type==='town' ? 'بلدة / ضاحية' : 'قرية / محلية';
  }
  function getFiberArabicName(props){ return decodeArabicMojibake(props.Arabic_Name || props.name || '') || props.Arabic_Name || 'موقع مؤسسي'; }
  function getFiberLayerLabel(feature){ return feature.properties.layer_label || 'موقع مؤسسي'; }
  function getArchArabicName(props){ return decodeArabicMojibake(props.site || props.name || '') || props.site || props.name || 'موقع أثري'; }
  function getMasarArabicName(props){
    const stage = props.stage ? `مرحلة ${props.stage}` : 'مرحلة';
    const title = props.title || props.name || 'مسار درب الأردن';
    return `${stage} — ${title}`;
  }

  function getRailArabicName(props){
    const ar = decodeArabicMojibake(props.NAME || '');
    if(ar && /[\u0600-\u06FF]/.test(ar)) return ar;
    return props.NAME_EN || props.NAME || 'خط سكة';
  }
  function getHighwayArabicName(props){
    const ar = decodeArabicMojibake(props.NAME || '');
    if(ar && /[\u0600-\u06FF]/.test(ar)) return ar;
    if(props.NAME_EN) return props.NAME_EN;
    if(props.REF) return 'طريق ' + props.REF;
    return '';
  }

  const ctx = els.canvas.getContext('2d');
  const DPR = Math.max(1, window.devicePixelRatio || 1);
  const view = {scale:1, minScale:1, maxScale:18, tx:0, ty:0, baseScale:1};
  const homeView = { scale:1, minScale:1, maxScale:18, tx:0, ty:0, baseScale:1 };
  const ZOOM_LIMITS = { minFactor: 0.95, maxFactor: 18 };
  const state = {dragging:false, lastX:0,lastY:0, hover:null, selected:null, mode:'overview', labelsDeferredUntil:0, renderQueued:false, searchTarget:null, clickedLocation:null, basemap:'standard', sidebarCollapsed:false};
  const imagery = { key:'', img:null, loading:false, error:false, requestedAt:0 };
  const hillshade = { img:null, loading:false, ready:false };

  function getBounds(features){
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    const scan=(coords)=>{ if(typeof coords[0]==='number'){ const [x,y]=coords; if(x<minX)minX=x; if(y<minY)minY=y; if(x>maxX)maxX=x; if(y>maxY)maxY=y; } else coords.forEach(scan); };
    features.forEach(f=>scan(f.geometry.coordinates));
    return [minX,minY,maxX,maxY];
  }
  function bboxOfGeometry(geometry){
    let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
    const scan=(coords)=>{ if(typeof coords[0]==='number'){ const [x,y]=coords; if(x<minX)minX=x; if(y<minY)minY=y; if(x>maxX)maxX=x; if(y>maxY)maxY=y; } else coords.forEach(scan); };
    scan(geometry.coordinates); return [minX,minY,maxX,maxY];
  }
  function bboxIntersectsWorld(b, vw){ return !(b[2] < vw[0] || b[0] > vw[2] || b[3] < vw[1] || b[1] > vw[3]); }
  function pointBBox(coord, pad=0.01){ return [coord[0]-pad, coord[1]-pad, coord[0]+pad, coord[1]+pad]; }

  function createSpatialIndex(features, cellSize){
    const buckets = new Map();
    const key = (ix,iy)=>`${ix}|${iy}`;
    features.forEach((f, idx)=>{
      const b = f._bbox;
      const minX = Math.floor(b[0] / cellSize), maxX = Math.floor(b[2] / cellSize);
      const minY = Math.floor(b[1] / cellSize), maxY = Math.floor(b[3] / cellSize);
      f._gridRange = [minX,minY,maxX,maxY];
      for(let ix=minX; ix<=maxX; ix++){
        for(let iy=minY; iy<=maxY; iy++){
          const k = key(ix,iy);
          if(!buckets.has(k)) buckets.set(k, []);
          buckets.get(k).push(idx);
        }
      }
    });
    return {cellSize, buckets};
  }
  function querySpatialIndex(index, viewport){
    const {cellSize, buckets} = index;
    const key = (ix,iy)=>`${ix}|${iy}`;
    const minX = Math.floor(viewport[0] / cellSize), maxX = Math.floor(viewport[2] / cellSize);
    const minY = Math.floor(viewport[1] / cellSize), maxY = Math.floor(viewport[3] / cellSize);
    const seen = new Set(), out = [];
    for(let ix=minX; ix<=maxX; ix++){
      for(let iy=minY; iy<=maxY; iy++){
        const arr = buckets.get(key(ix,iy));
        if(!arr) continue;
        for(let i=0; i<arr.length; i++){
          const id = arr[i];
          if(seen.has(id)) continue;
          seen.add(id);
          out.push(id);
        }
      }
    }
    return out;
  }
  function expandViewport(vw, factor=0.08){
    const dx = vw[2]-vw[0], dy = vw[3]-vw[1];
    return [vw[0]-dx*factor, vw[1]-dy*factor, vw[2]+dx*factor, vw[3]+dy*factor];
  }
  function currentViewportWorld(){
    const w=els.mapWrap.clientWidth, h=els.mapWrap.clientHeight;
    const a=screenToWorld(0,h), b=screenToWorld(w,0);
    return [Math.min(a[0],b[0]), Math.min(a[1],b[1]), Math.max(a[0],b[0]), Math.max(a[1],b[1])];
  }

  const govBounds=getBounds(govData.features);
  const liwaBounds=getBounds(liwaData.features);
  const railBounds=getBounds(railData.features);
  const highwayBounds=getBounds(highwayData.features);
  const placesBounds=getBounds(placesExtraData.features);
  const fiberBounds=getBounds(fiberLayersData.features);
  const archBounds = archSitesData.features.length ? getBounds(archSitesData.features) : fiberBounds;
  const masarBounds = masarData.features.length ? getBounds(masarData.features) : archBounds;
  const allBounds=[Math.min(govBounds[0],liwaBounds[0],railBounds[0],highwayBounds[0],placesBounds[0],fiberBounds[0],archBounds[0],masarBounds[0]),Math.min(govBounds[1],liwaBounds[1],railBounds[1],highwayBounds[1],placesBounds[1],fiberBounds[1],archBounds[1],masarBounds[1]),Math.max(govBounds[2],liwaBounds[2],railBounds[2],highwayBounds[2],placesBounds[2],fiberBounds[2],archBounds[2],masarBounds[2]),Math.max(govBounds[3],liwaBounds[3],railBounds[3],highwayBounds[3],placesBounds[3],fiberBounds[3],archBounds[3],masarBounds[3])];

  function fmt(n){ if(n==null || n==='') return '—'; return Number(n).toLocaleString('en-US'); }
  function normalizeSearchText(value){
    return String(value || '')
      .toLowerCase()
      .replace(/[ً-ٰٟـ]/g, '')
      .replace(/[أإآٱ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/[ىئ]/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function sampleElevationAt(world){
    if(!elevationGrid || !Array.isArray(elevationGrid.values)) return null;
    const [minX,minY,maxX,maxY] = elevationGrid.bounds;
    const x = Math.min(maxX, Math.max(minX, world[0]));
    const y = Math.min(maxY, Math.max(minY, world[1]));
    const fx = (x - minX) / (maxX - minX) * (elevationGrid.width - 1);
    const fy = (maxY - y) / (maxY - minY) * (elevationGrid.height - 1);
    const x0 = Math.floor(fx), y0 = Math.floor(fy);
    const x1 = Math.min(elevationGrid.width - 1, x0 + 1), y1 = Math.min(elevationGrid.height - 1, y0 + 1);
    const tx = fx - x0, ty = fy - y0;
    const idx = (xx,yy)=> yy * elevationGrid.width + xx;
    const v00 = elevationGrid.values[idx(x0,y0)];
    const v10 = elevationGrid.values[idx(x1,y0)];
    const v01 = elevationGrid.values[idx(x0,y1)];
    const v11 = elevationGrid.values[idx(x1,y1)];
    if([v00,v10,v01,v11].some(v=>v==null || Number.isNaN(v))) return null;
    const top = v00 * (1-tx) + v10 * tx;
    const bottom = v01 * (1-tx) + v11 * tx;
    return Math.round(top * (1-ty) + bottom * ty);
  }

  function normalizeRailType(props){
    const railway=(props.RAILWAY||'').toLowerCase();
    const service=(props.SERVICE||'').toLowerCase();
    if(service.includes('yard') || service.includes('siding') || service.includes('spur')) return 'service';
    if(railway.includes('abandoned') || railway.includes('disused') || railway.includes('historic') || railway.includes('razed')) return 'historic';
    if(railway.includes('rail') || railway.includes('narrow_gauge')) return 'main';
    return 'main';
  }
  function normalizeRoadType(props){
    const h=(props.HIGHWAY||'').toLowerCase();
    if(['motorway','motorway_link','trunk','trunk_link','primary','primary_link'].includes(h)) return 'major';
    if(['secondary','secondary_link','tertiary','tertiary_link'].includes(h)) return 'medium';
    if(['residential','service','unclassified','living_street','pedestrian','construction'].includes(h)) return 'local';
    return 'minor';
  }

  function centroidOfFeature(geometry){
    let rings=[]; if(geometry.type==='Polygon') rings=geometry.coordinates; else if(geometry.type==='MultiPolygon') rings=geometry.coordinates.flat();
    let sx=0, sy=0, n=0; rings.forEach(r=>r.forEach(([x,y])=>{sx+=x;sy+=y;n++;})); return n?[sx/n, sy/n]:[0,0];
  }
  function lineLabelPoint(coords){
    const lines = Array.isArray(coords[0][0]) ? coords : [coords];
    let best = null, bestLen = -1;
    lines.forEach(line=>{ let len=0; for(let i=1;i<line.length;i++) len += Math.hypot(line[i][0]-line[i-1][0], line[i][1]-line[i-1][1]); if(len>bestLen){ bestLen=len; best=line; } });
    if(!best || best.length===0) return [0,0];
    let total=0; for(let i=1;i<best.length;i++) total += Math.hypot(best[i][0]-best[i-1][0], best[i][1]-best[i-1][1]);
    let half=total/2, acc=0; for(let i=1;i<best.length;i++){ const a=best[i-1], b=best[i], seg=Math.hypot(b[0]-a[0], b[1]-a[1]); if(acc+seg>=half){ const t=(half-acc)/seg; return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t]; } acc += seg; }
    return best[Math.floor(best.length/2)];
  }


  function bboxWidth(b){ return Math.max(0, (b?.[2]||0) - (b?.[0]||0)); }
  function bboxHeight(b){ return Math.max(0, (b?.[3]||0) - (b?.[1]||0)); }
  function bboxArea(b){ return bboxWidth(b) * bboxHeight(b); }
  function geometryLength(geometry){
    const lines = geometry.type==='LineString' ? [geometry.coordinates] : (geometry.type==='MultiLineString' ? geometry.coordinates : []);
    let total = 0;
    lines.forEach(line=>{ for(let i=1;i<line.length;i++) total += Math.hypot(line[i][0]-line[i-1][0], line[i][1]-line[i-1][1]); });
    return total;
  }

  function pointInRing(point, ring){
    let inside = false;
    for(let i=0, j=ring.length - 1; i < ring.length; j = i++){
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      const intersect = ((yi > point[1]) !== (yj > point[1])) && (point[0] < ((xj - xi) * (point[1] - yi)) / ((yj - yi) || 1e-12) + xi);
      if(intersect) inside = !inside;
    }
    return inside;
  }
  function pointInFeature(point, feature){
    const g = feature.geometry;
    if(g.type === 'Polygon'){
      if(!pointInRing(point, g.coordinates[0])) return false;
      for(let i=1;i<g.coordinates.length;i++){ if(pointInRing(point, g.coordinates[i])) return false; }
      return true;
    }
    if(g.type === 'MultiPolygon'){
      return g.coordinates.some(poly => {
        if(!pointInRing(point, poly[0])) return false;
        for(let i=1;i<poly.length;i++){ if(pointInRing(point, poly[i])) return false; }
        return true;
      });
    }
    return false;
  }
  function governorateAtWorldPoint(point){
    for(let i=0;i<govProcessed.length;i++){
      const f = govProcessed[i];
      if(!bboxIntersectsWorld(f._bbox, [point[0],point[1],point[0],point[1]])) continue;
      if(pointInFeature(point, f)) return f;
    }
    return null;
  }
  function clearSelection(){
    state.selected = null;
    state.searchTarget = null;
    state.clickedLocation = null;
    els.featureInfo.innerHTML = 'اضغط على محافظة أو لواء أو خط سكة أو طريق أو مسار درب الأردن أو مدينة/بلدة أو موقع مؤسسي أو موقع أثري لعرض التفاصيل، أو اضغط على أي موقع داخل الخريطة لعرض الإحداثيات.';
    updateInfo();
    scheduleDraw();
  }

  function setBasemap(mode){
    state.basemap = mode === 'imagery' ? 'imagery' : 'standard';
    if(els.basemapBtn){
      els.basemapBtn.textContent = state.basemap === 'imagery' ? '🛰' : '🗺';
      els.basemapBtn.title = state.basemap === 'imagery' ? 'الخلفية: جوية' : 'الخلفية: قياسية';
      els.basemapBtn.setAttribute('aria-label', els.basemapBtn.title);
    }
    if(els.mapWrap) els.mapWrap.classList.toggle('imagery', state.basemap === 'imagery');
    scheduleDraw();
  }
  function toggleSidebar(){
    state.sidebarCollapsed = !state.sidebarCollapsed;
    const shell = document.querySelector('.app-shell');
    if(shell) shell.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
    if(els.sidebarToggleBtn) els.sidebarToggleBtn.textContent = state.sidebarCollapsed ? 'إظهار اللوحة' : 'إخفاء اللوحة';
    setTimeout(()=>{ resize(); scheduleDraw(); }, 260);
  }
  function toggleBasemap(){
    setBasemap(state.basemap === 'imagery' ? 'standard' : 'imagery');
  }
  function openLayerHelp(){
    if(!els.layerHelpModal) return;
    els.layerHelpModal.classList.remove('hidden');
    els.layerHelpModal.setAttribute('aria-hidden','false');
  }
  function closeLayerHelp(){
    if(!els.layerHelpModal) return;
    els.layerHelpModal.classList.add('hidden');
    els.layerHelpModal.setAttribute('aria-hidden','true');
  }
  function imageryUrlForViewport(width, height){
    const vw = currentViewportWorld();
    const bbox = [vw[0], vw[1], vw[2], vw[3]].map(v=>Number(v).toFixed(6)).join(',');
    const size = `${Math.max(256, Math.round(width))},${Math.max(256, Math.round(height))}`;
    return `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${bbox}&bboxSR=4326&imageSR=4326&size=${size}&format=jpg&transparent=false&f=image`;
  }
  function drawStandardBasemap(w,h){
    const bg = ctx.createLinearGradient(0,0,0,h);
    bg.addColorStop(0,'#eef3f8');
    bg.addColorStop(1,'#f9fbfd');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,w,h);
  }
  function requestImagery(width,height){
    const now = performance.now();
    const key = `${imageryUrlForViewport(width,height)}|${Math.round(view.scale*100)/100}`;
    if(imagery.loading || key === imagery.key || (now - imagery.requestedAt < 220)) return;
    imagery.key = key;
    imagery.loading = true;
    imagery.requestedAt = now;
    imagery.error = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = ()=>{ imagery.img = img; imagery.loading = false; imagery.error = false; scheduleDraw(); };
    img.onerror = ()=>{ imagery.loading = false; imagery.error = true; scheduleDraw(); };
    img.src = key.split('|')[0];
  }
  function drawImageryBasemap(w,h){
    ctx.fillStyle = '#d9d0b2';
    ctx.fillRect(0,0,w,h);
    if(imagery.img){
      ctx.drawImage(imagery.img, 0, 0, w, h);
      ctx.fillStyle = 'rgba(255,248,220,0.10)';
      ctx.fillRect(0,0,w,h);
    }else{
      ctx.fillStyle = '#d8cfb0';
      ctx.fillRect(0,0,w,h);
    }
    if(!state.dragging) requestImagery(w,h);
    if(imagery.error){
      ctx.fillStyle = 'rgba(24,59,99,.75)';
      ctx.font = '13px Segoe UI, Tahoma, Arial';
      ctx.textAlign = 'right';
      ctx.fillText('تعذر تحميل الخلفية الجوية حاليًا.', w - 16, 24);
    }
  }

  function ensureHillshadeLoaded(){
    if(hillshade.ready || hillshade.loading) return;
    hillshade.loading = true;
    const img = new Image();
    img.onload = ()=>{ hillshade.img = img; hillshade.loading = false; hillshade.ready = true; scheduleDraw(); };
    img.onerror = ()=>{ hillshade.loading = false; };
    img.src = 'data/hillshade.png';
  }
  function drawHillshadeLayer(){
    if(!els.toggleHillshade || !els.toggleHillshade.checked) return;
    ensureHillshadeLoaded();
    if(!hillshade.ready || !hillshade.img || !elevationGrid) return;
    const [minX,minY,maxX,maxY] = elevationGrid.bounds;
    const tl = worldToScreen(minX, maxY);
    const br = worldToScreen(maxX, minY);
    const x = Math.min(tl[0], br[0]), y = Math.min(tl[1], br[1]);
    const w = Math.abs(br[0] - tl[0]), h = Math.abs(br[1] - tl[1]);
    if(w < 2 || h < 2) return;
    ctx.save();
    ctx.globalAlpha = state.basemap === 'imagery' ? 0.28 : 0.42;
    ctx.drawImage(hillshade.img, x, y, w, h);
    ctx.restore();
  }

  function drawContours(){
    if(!els.toggleContours || !els.toggleContours.checked || !contourProcessed) return;
    const ratio = view.scale / view.baseScale;
    if(ratio < 2.2) return;
    const vw = expandViewport(currentViewportWorld(), 0.03);
    const ids = querySpatialIndex(contourIndex, vw);
    ctx.save();
    for(const id of ids){
      const f = contourProcessed[id];
      if(!bboxIntersectsWorld(f._bbox, vw)) continue;
      const elev = f.properties.elev || 0;
      const major = elev % 400 === 0;
      ctx.beginPath();
      pathGeometry(f.geometry);
      ctx.strokeStyle = major ? CONTOUR_STYLE.majorStroke : CONTOUR_STYLE.stroke;
      ctx.lineWidth = major ? CONTOUR_STYLE.majorWidth : CONTOUR_STYLE.width;
      ctx.stroke();
    }
    ctx.restore();
  }


  function buildMapExportCanvas(){
    draw();
    const pad = 40;
    const head = 110;
    const foot = 56;
    const out = document.createElement('canvas');
    out.width = els.canvas.width + pad * 2;
    out.height = els.canvas.height + head + foot;
    const g = out.getContext('2d');
    g.fillStyle = '#ffffff';
    g.fillRect(0,0,out.width,out.height);
    g.fillStyle = '#183b63';
    g.font = '700 28px Segoe UI, Tahoma, Arial';
    g.textAlign = 'right';
    g.direction = 'rtl';
    g.fillText('Jordan Geo Infrastructure Viewer', out.width - pad, 42);
    g.font = '600 18px Segoe UI, Tahoma, Arial';
    g.fillStyle = '#334155';
    const subtitle = state.selected ? ('العنصر المحدد: ' + (state.selected.kind==='gov' ? getGovArabicName(state.selected.feature.properties) : state.selected.kind==='rail' ? getRailArabicName(state.selected.feature.properties) : (getHighwayArabicName(state.selected.feature.properties) || state.selected.feature.properties.REF || 'طريق'))) : (state.clickedLocation ? 'موقع مختار داخل الخريطة' : 'تصدير الخريطة الحالية');
    g.fillText(subtitle, out.width - pad, 72);
    g.font = '14px Segoe UI, Tahoma, Arial';
    g.fillStyle = '#64748b';
    g.fillText('مقياس العرض: ' + (view.scale / view.baseScale).toFixed(2) + '×', out.width - pad, 98);
    g.strokeStyle = '#d9e3f0';
    g.lineWidth = 2;
    g.strokeRect(pad-1, head-1, els.canvas.width+2, els.canvas.height+2);
    g.drawImage(els.canvas, pad, head);
    g.fillStyle = '#64748b';
    g.font = '13px Segoe UI, Tahoma, Arial';
    g.fillText('تم التصدير من العارض المحلي', out.width - pad, out.height - 18);
    return out;
  }
  function downloadCanvasAsPdf(canvas, fileName){
    const jpeg = canvas.toDataURL('image/jpeg', 0.92);
    const b64 = jpeg.split(',')[1];
    const imgBytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const encoder = new TextEncoder();
    const pageW = 841.89, pageH = 595.28;
    const margin = 28;
    const maxW = pageW - margin*2, maxH = pageH - margin*2;
    const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
    const drawW = canvas.width * ratio, drawH = canvas.height * ratio;
    const posX = (pageW - drawW) / 2;
    const posY = (pageH - drawH) / 2;
    const content = `q
${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${posX.toFixed(2)} ${posY.toFixed(2)} cm
/Im0 Do
Q
`;
    const objects = [];
    objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
    objects[2] = `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`;
    objects[3] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(2)} ${pageH.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 5 0 R >>`;
    objects[4] = `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>`;
    objects[5] = `<< /Length ${encoder.encode(content).length} >>`;
    let parts = [];
    let offsets = [0];
    let pos = 0;
    const pushText = (s) => { const arr = encoder.encode(s); parts.push(arr); pos += arr.length; };
    const pushBytes = (arr) => { parts.push(arr); pos += arr.length; };
    pushText('%PDF-1.4\n%âãÏÓ\n');
    for(let i=1;i<=5;i++){
      offsets[i] = pos;
      pushText(`${i} 0 obj\n`);
      pushText(objects[i] + '\n');
      if(i===4){
        pushText('stream\n');
        pushBytes(imgBytes);
        pushText('\nendstream\n');
      } else if(i===5){
        pushText('stream\n');
        pushText(content);
        pushText('endstream\n');
      }
      pushText('endobj\n');
    }
    const xrefPos = pos;
    pushText(`xref\n0 6\n0000000000 65535 f \n`);
    for(let i=1;i<=5;i++){ pushText(String(offsets[i]).padStart(10,'0') + ' 00000 n \n'); }
    pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`);
    const blob = new Blob(parts, {type:'application/pdf'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fileName; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 1500);
  }

  const govProcessed = govData.features.map((f,i)=>({
    ...f,
    _id:'g'+i,
    _displayName:getGovArabicName(f.properties),
    _color:GOV_COLORS[getGovArabicName(f.properties)] || '#8aa9d6',
    _labelPoint: GOV_LABEL_POINTS[f.properties.NIC_NAME_E] || centroidOfFeature(f.geometry),
    _bbox:bboxOfGeometry(f.geometry)
  }));
  const liwaProcessed = liwaData.features.map((f,i)=>({
    ...f,
    _id:'l'+i,
    _displayName:getLiwaArabicName(f.properties),
    _labelPoint: centroidOfFeature(f.geometry),
    _bbox:bboxOfGeometry(f.geometry)
  }));
  const railProcessed = railData.features.map((f,i)=>({
    ...f, _id:'r'+i, _type: normalizeRailType(f.properties), _labelPoint: lineLabelPoint(f.geometry.coordinates), _label: getRailArabicName(f.properties), _bbox:bboxOfGeometry(f.geometry)
  }));
  const highwayProcessed = highwayData.features.map((f,i)=>{
    const label = getHighwayArabicName(f.properties);
    return {...f, _id:'h'+i, _type: normalizeRoadType(f.properties), _label: label, _labelPoint: label ? lineLabelPoint(f.geometry.coordinates) : null, _bbox:bboxOfGeometry(f.geometry)};
  });
  const placeProcessed = placesExtraData.features.map((f,i)=>{
    const coords = f.geometry.coordinates;
    return {...f, _id:'p'+i, _type: normalizePlaceType(f.properties), _label:getPlaceArabicName(f.properties), _labelPoint: coords, _bbox: pointBBox(coords, 0.012), _population:Number(f.properties.population)||0};
  });
  const fiberProcessed = fiberLayersData.features.map((f,i)=>{ const coords=f.geometry.coordinates; return {...f, _id:'f'+i, _type:f.properties.layer_key, _label:getFiberArabicName(f.properties), _labelPoint:coords, _bbox: pointBBox(coords, 0.01)}; });
  const archProcessed = archSitesData.features.map((f,i)=>{ const coords=f.geometry.coordinates; return {...f, _id:'a'+i, _type:'arch', _label:getArchArabicName(f.properties), _labelPoint:coords, _bbox: pointBBox(coords, 0.012)}; });
  const masarProcessed = masarData.features.map((f,i)=>({ ...f, _id:'m'+i, _type:'masar', _label:getMasarArabicName(f.properties), _labelPoint: lineLabelPoint(f.geometry.coordinates), _bbox:bboxOfGeometry(f.geometry) }));

  const contourProcessed = (contourData && contourData.features ? contourData.features.map((f,i)=>({ ...f, _id:'c'+i, _bbox:bboxOfGeometry(f.geometry) })) : []);
  const contourIndex = contourProcessed.length ? createSpatialIndex(contourProcessed, 0.12) : {cellSize:1,buckets:new Map()};

  const roadBuckets = {
    major: highwayProcessed.filter(f=>f._type==='major'),
    medium: highwayProcessed.filter(f=>f._type==='medium'),
    local: highwayProcessed.filter(f=>f._type==='local'),
    minor: highwayProcessed.filter(f=>f._type==='minor'),
  };
  const railBuckets = {
    main: railProcessed.filter(f=>f._type==='main'),
    service: railProcessed.filter(f=>f._type==='service'),
    historic: railProcessed.filter(f=>f._type==='historic'),
  };
  const railIndexes = {
    main: createSpatialIndex(railBuckets.main, 0.22),
    service: createSpatialIndex(railBuckets.service, 0.18),
    historic: createSpatialIndex(railBuckets.historic, 0.18),
  };
  const roadIndexes = {
    major: createSpatialIndex(roadBuckets.major, 0.12),
    medium: createSpatialIndex(roadBuckets.medium, 0.08),
    local: createSpatialIndex(roadBuckets.local, 0.05),
    minor: createSpatialIndex(roadBuckets.minor, 0.035),
  };
  const placeIndex = createSpatialIndex(placeProcessed, 0.08);
  const fiberBuckets = { edu: fiberProcessed.filter(f=>f._type==='edu'), gov_agency: fiberProcessed.filter(f=>f._type==='gov_agency'), health: fiberProcessed.filter(f=>f._type==='health'), school: fiberProcessed.filter(f=>f._type==='school') };
  const fiberIndexes = { edu: createSpatialIndex(fiberBuckets.edu, 0.07), gov_agency: createSpatialIndex(fiberBuckets.gov_agency, 0.07), health: createSpatialIndex(fiberBuckets.health, 0.07), school: createSpatialIndex(fiberBuckets.school, 0.07) };
  const archIndex = createSpatialIndex(archProcessed, 0.07);
  const masarIndex = createSpatialIndex(masarProcessed, 0.16);


  const searchState = {items: [], results: [], activeIndex: -1};

  function buildSearchIndex(){
    const items = [];
    const pushItem = (item) => {
      item._searchAr = normalizeSearchText(item.nameAr || '');
      item._searchEn = normalizeSearchText(item.nameEn || '');
      item._searchCombined = normalizeSearchText([item.nameAr, item.nameEn, item.tags].filter(Boolean).join(' '));
      if(!item._searchCombined) return;
      items.push(item);
    };

    govProcessed.forEach(f => {
      pushItem({
        id: 'gov-' + f._id, kind: 'gov', feature: f, bounds: f._bbox,
        nameAr: f._displayName, nameEn: f.properties.NIC_NAME_E || '',
        layerLabel: 'محافظة', layerValue: 'gov', tags: 'محافظات حدود ادارية', rank: 1
      });
    });
    liwaProcessed.forEach(f => {
      pushItem({
        id: 'liwa-' + f._id, kind: 'liwa', feature: f, bounds: f._bbox,
        nameAr: f._displayName, nameEn: '', layerLabel: 'لواء', layerValue: 'liwa',
        tags: 'الوية حدود فرعية admin level 5', rank: 2
      });
    });

    const railGroups = new Map();
    railProcessed.forEach(f => {
      const name = (f._label || '').trim();
      if(!name) return;
      const key = 'rail|' + normalizeSearchText(name);
      const segLen = geometryLength(f.geometry);
      if(!railGroups.has(key)){
        railGroups.set(key, {
          id: key, kind: 'rail', feature: f, features:[f], bestLen: segLen, bounds: [...f._bbox],
          nameAr: name, nameEn: f.properties.NAME_EN || '', layerLabel: 'سكة', layerValue: 'rail',
          tags: (f.properties.RAILWAY || '') + ' ' + (f.properties.SERVICE || ''), rank: f._type === 'main' ? 2 : 3
        });
      } else {
        const g = railGroups.get(key);
        g.features.push(f);
        g.bounds = [Math.min(g.bounds[0], f._bbox[0]), Math.min(g.bounds[1], f._bbox[1]), Math.max(g.bounds[2], f._bbox[2]), Math.max(g.bounds[3], f._bbox[3])];
        if(segLen > g.bestLen){ g.bestLen = segLen; g.feature = f; }
      }
    });
    railGroups.forEach(pushItem);

    const roadGroups = new Map();
    highwayProcessed.forEach(f => {
      if(!(f._type === 'major' || f._type === 'medium')) return;
      const name = (f._label || '').trim();
      if(!name || name.length < 2) return;
      const key = 'road|' + normalizeSearchText(name);
      const priority = f._type === 'major' ? 4 : 5;
      const segLen = geometryLength(f.geometry);
      if(!roadGroups.has(key)){
        roadGroups.set(key, {
          id: key, kind: 'highway', feature: f, features:[f], bestLen: segLen, bounds: [...f._bbox],
          nameAr: name, nameEn: f.properties.NAME_EN || '', layerLabel: 'طريق', layerValue: 'highway',
          tags: [f.properties.HIGHWAY, f.properties.REF].filter(Boolean).join(' '), rank: priority
        });
      } else {
        const g = roadGroups.get(key);
        g.features.push(f);
        g.bounds = [Math.min(g.bounds[0], f._bbox[0]), Math.min(g.bounds[1], f._bbox[1]), Math.max(g.bounds[2], f._bbox[2]), Math.max(g.bounds[3], f._bbox[3])];
        if(priority < g.rank || segLen > g.bestLen){ g.rank = Math.min(priority, g.rank); g.bestLen = Math.max(segLen, g.bestLen); g.feature = f; }
      }
    });
    roadGroups.forEach(pushItem);

    placeProcessed.forEach(f => {
      if(f._type==='village' && !f._population && (f._label||'').length < 4) return;
      pushItem({
        id:'place-' + f._id, kind:'place', feature:f, bounds:f._bbox,
        nameAr:f._label, nameEn:'', layerLabel:getPlaceTypeLabel(f), layerValue:'place',
        tags:[f.properties.fclass, f.properties.population].filter(Boolean).join(' '), rank: f._type==='city' ? 2 : f._type==='town' ? 3 : 5
      });
    });
    fiberProcessed.forEach(f => {
      pushItem({
        id:'fiber-' + f._id, kind:'fiber', feature:f, bounds:f._bbox,
        nameAr:f._label, nameEn:'', layerLabel:getFiberLayerLabel(f), layerValue:'fiber',
        tags:[f.properties.Department, f.properties.Connection_ID, f.properties.layer_label].filter(Boolean).join(' '), rank: f._type==='edu' ? 2 : f._type==='health' ? 2 : f._type==='gov_agency' ? 3 : 4
      });
    });
    archProcessed.forEach(f => {
      pushItem({
        id:'arch-' + f._id, kind:'arch', feature:f, bounds:f._bbox,
        nameAr:f._label, nameEn:'', layerLabel:'موقع أثري', layerValue:'arch',
        tags:[f.properties.gover, f.properties.desc_, f.properties.Num, f.properties.Act_Num].filter(Boolean).join(' '), rank: 2
      });
    });
    masarProcessed.forEach(f => {
      pushItem({
        id:'masar-' + f._id, kind:'masar', feature:f, bounds:f._bbox,
        nameAr:f._label, nameEn:f.properties.name || '', layerLabel:'مسار درب الأردن', layerValue:'masar',
        tags:[f.properties.stage, f.properties.distance_km].filter(Boolean).join(' '), rank: 3
      });
    });

    searchState.items = items.sort((a,b)=> a.rank - b.rank || a.nameAr.localeCompare(b.nameAr, 'ar'));
  }

  function escapeHtml(value){
    return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function searchItems(query, layer){
    const q = normalizeSearchText(query);
    if(!q) return [];
    const layerFilter = layer && layer !== 'all' ? layer : null;
    const queryWords = q.split(/\s+/).filter(Boolean).filter(w => !['طريق','شارع','سكه','سكة','محافظه','محافظة'].includes(w));
    const starts = [], wordStarts = [], tokenMatches = [], contains = [];
    for(const item of searchState.items){
      if(layerFilter && item.layerValue !== layerFilter) continue;
      const ar = item._searchAr || '';
      const en = item._searchEn || '';
      const combined = item._searchCombined || '';
      if(ar.startsWith(q) || en.startsWith(q)){
        starts.push(item);
        continue;
      }
      const words = combined.split(/\s+/).filter(Boolean);
      if(words.some(word => word.startsWith(q))){
        wordStarts.push(item);
        continue;
      }
      if(queryWords.length && queryWords.every(word => combined.includes(word))){
        tokenMatches.push(item);
        continue;
      }
      if(combined.includes(q)) contains.push(item);
    }
    return [...starts, ...wordStarts, ...tokenMatches, ...contains].slice(0, 12);
  }

  function hideSuggestions(){
    if(!els.searchSuggestions) return;
    els.searchSuggestions.classList.add('hidden');
    els.searchSuggestions.innerHTML = '';
    searchState.results = [];
    searchState.activeIndex = -1;
  }

  function renderSuggestions(results){
    if(!els.searchSuggestions) return;
    searchState.results = results;
    searchState.activeIndex = -1;
    if(!results.length){
      els.searchSuggestions.innerHTML = '<div class="search-empty">لا توجد نتائج مطابقة في الطبقات الحالية.</div>';
      els.searchSuggestions.classList.remove('hidden');
      return;
    }
    els.searchSuggestions.innerHTML = results.map((item, idx) => `
      <div class="search-suggestion" data-index="${idx}">
        <div>
          <div class="title">${escapeHtml(item.nameAr || item.nameEn || '—')}</div>
          <div class="meta">
            <span class="chip">${escapeHtml(item.layerLabel)}</span>
            ${item.nameEn ? `<span>${escapeHtml(item.nameEn)}</span>` : ''}
          </div>
        </div>
      </div>`).join('');
    els.searchSuggestions.classList.remove('hidden');
  }

  function highlightSuggestion(index){
    if(!els.searchSuggestions) return;
    const nodes = [...els.searchSuggestions.querySelectorAll('.search-suggestion')];
    nodes.forEach((node, i)=> node.classList.toggle('active', i === index));
    const active = nodes[index];
    if(active) active.scrollIntoView({block:'nearest'});
    searchState.activeIndex = index;
  }

  function focusBoundsOnly(bounds, pad=54){
    if(!bounds || bounds.length !== 4) return;
    const dx = Math.max(bounds[2] - bounds[0], 0.02);
    const dy = Math.max(bounds[3] - bounds[1], 0.02);
    fitBounds(expandBounds([bounds[0], bounds[1], bounds[0] + dx, bounds[1] + dy], 0.2, 0.01), pad);
  }

  function getRepresentativeSearchTarget(item){
    const feature = item.feature;
    let features = item.features || (feature ? [feature] : []);
    let repFeature = feature;
    if(item.kind === 'highway' && features.length > 1 && feature && feature._bbox){
      const anchor = expandBounds(feature._bbox, 0.8, 0.02);
      const nearby = features.filter(f => bboxIntersectsWorld(f._bbox, anchor));
      if(nearby.length) features = nearby.slice(0, 18); else features = [feature];
      repFeature = nearby.find(f => f._labelPoint) || feature;
    }
    if(item.kind === 'rail' && features.length > 1 && feature && feature._bbox){
      const anchor = expandBounds(feature._bbox, 0.5, 0.03);
      const nearby = features.filter(f => bboxIntersectsWorld(f._bbox, anchor));
      if(nearby.length) features = nearby.slice(0, 14);
      repFeature = nearby.find(f => f._labelPoint) || feature;
    }
    const sourceBounds = repFeature && repFeature._bbox ? repFeature._bbox : (feature && feature._bbox ? feature._bbox : item.bounds);
    const repBounds = expandBounds(sourceBounds, item.kind === 'highway' ? 0.28 : 0.22, item.kind === 'highway' ? 0.004 : 0.01);
    return {feature: repFeature || feature, bounds: repBounds, features};
  }

  function selectSearchItem(item){
    if(!item) return;
    const chosenName = item.nameAr || item.nameEn || '';
    els.mapSearchInput.value = chosenName;
    hideSuggestions();
    if(item.layerValue === 'gov') els.toggleGov.checked = true;
    if(item.layerValue === 'liwa') els.toggleLiwa.checked = true;
    if(item.layerValue === 'rail') els.toggleRails.checked = true;
    if(item.layerValue === 'highway') els.toggleHighways.checked = true;
    if(item.layerValue === 'place') els.togglePlaces.checked = true;

    const target = getRepresentativeSearchTarget(item);
    state.searchTarget = {kind:item.kind, bounds:target.bounds, name:chosenName, features:target.features};
    state.selected = {kind: item.kind, feature: target.feature};
    state.clickedLocation = null;

    if(item.kind === 'gov'){
      focusFeature(target.feature);
    } else {
      const [cx, cy] = bboxCenter(target.bounds);
      const factor = item.kind === 'highway' ? 9.0 : 5.2;
      centerOnWorldPoint(cx, cy, homeView.baseScale * factor);
      state.labelsDeferredUntil = performance.now() + 220;
      updateInfo();
      scheduleDraw();
    }
    els.featureInfo.textContent = `تم الانتقال إلى: ${chosenName || 'العنصر المحدد'}`;
  }

  function setupMapSearch(){
    if(!els.mapSearchInput || !els.mapSearchLayer || !els.mapSearchClear || !els.searchSuggestions) return;
    buildSearchIndex();
    const update = () => {
      const query = els.mapSearchInput.value || '';
      if(!query.trim()){ hideSuggestions(); return; }
      renderSuggestions(searchItems(query, els.mapSearchLayer.value));
    };
    els.mapSearchInput.addEventListener('input', update);
    els.mapSearchLayer.addEventListener('change', update);
    els.mapSearchInput.addEventListener('focus', update);
    els.mapSearchInput.addEventListener('keydown', (e)=>{
      if(els.searchSuggestions.classList.contains('hidden')) return;
      if(e.key === 'ArrowDown'){ e.preventDefault(); highlightSuggestion(Math.min(searchState.results.length - 1, searchState.activeIndex + 1)); }
      else if(e.key === 'ArrowUp'){ e.preventDefault(); highlightSuggestion(Math.max(0, searchState.activeIndex - 1)); }
      else if(e.key === 'Enter'){ e.preventDefault(); const idx = searchState.activeIndex >= 0 ? searchState.activeIndex : 0; selectSearchItem(searchState.results[idx]); }
      else if(e.key === 'Escape'){ hideSuggestions(); }
    });
    els.searchSuggestions.addEventListener('mousedown', (e)=>{
      const node = e.target.closest('.search-suggestion');
      if(!node) return;
      e.preventDefault();
      selectSearchItem(searchState.results[Number(node.dataset.index)]);
    });
    els.mapSearchClear.addEventListener('click', ()=>{ els.mapSearchInput.value=''; hideSuggestions(); els.mapSearchInput.focus(); clearSelection(); });
    document.addEventListener('click', (e)=>{ if(!e.target.closest('#mapSearchBox')) hideSuggestions(); });
  }

  function setupLegend(){
    els.govLegend.innerHTML='';
    govProcessed.forEach(f=>{ const div=document.createElement('div'); div.className='legend-item'; div.innerHTML=`<span class="legend-swatch" style="background:${f._color}"></span><span>${f._displayName}</span>`; els.govLegend.appendChild(div); });
  }
  function setupKpis(){
    const totalPop = govProcessed.reduce((s,f)=>s+(Number(f.properties.Pop_2014)||0),0);
    const top = [...govProcessed].sort((a,b)=>(Number(b.properties.Pop_2014)||0)-(Number(a.properties.Pop_2014)||0))[0];
    els.kpiGovCount.textContent = govProcessed.length;
    els.kpiRailCount.textContent = railProcessed.length;
    els.kpiHighwayCount.textContent = highwayProcessed.length.toLocaleString('en-US');
    els.kpiPopulation.textContent = fmt(totalPop);
    els.kpiTopGov.textContent = top?._displayName || '—';
  }
  function setupTable(){
    const rows=[...govProcessed].sort((a,b)=>(Number(b.properties.Pop_2014)||0)-(Number(a.properties.Pop_2014)||0));
    const render=()=>{
      const q=(els.searchBox.value||'').trim(); els.govTableBody.innerHTML='';
      rows.filter(r=>!q || r._displayName.includes(q) || (r.properties.NIC_NAME_E||'').toLowerCase().includes(q.toLowerCase())).forEach(r=>{
        const tr=document.createElement('tr'); tr.innerHTML=`<td>${r._displayName}</td><td>${fmt(r.properties.Pop_2014)}</td><td>${fmt(r.properties['Pop_km²_14'])}</td><td>${fmt(r.properties.Ho_beds_14)}</td><td>${fmt(r.properties.Refugees)}</td>`;
        tr.onclick=()=>{state.selected={kind:'gov', feature:r}; state.clickedLocation = null; focusFeature(r);}; els.govTableBody.appendChild(tr);
      });
    };
    els.searchBox.addEventListener('input', render); render();
  }

  function resizeCanvas(){
    const rect=els.mapWrap.getBoundingClientRect();
    els.canvas.width = Math.round(rect.width * DPR);
    els.canvas.height = Math.round(rect.height * DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
    fitBounds(allBounds, 36);
    homeView.scale = view.scale;
    homeView.minScale = view.minScale;
    homeView.maxScale = view.maxScale;
    homeView.tx = view.tx;
    homeView.ty = view.ty;
    homeView.baseScale = view.baseScale;
    scheduleDraw();
  }
  function fitBounds(bounds, pad=24){
    const w=els.mapWrap.clientWidth, h=els.mapWrap.clientHeight;
    const dx=Math.max(bounds[2]-bounds[0], 1e-6), dy=Math.max(bounds[3]-bounds[1], 1e-6);
    const s=Math.min((w-pad*2)/dx,(h-pad*2)/dy);
    view.baseScale=s; view.scale=s; view.minScale=s*ZOOM_LIMITS.minFactor; view.maxScale=s*ZOOM_LIMITS.maxFactor;
    view.tx = pad + (w - pad*2 - dx*s)/2 - bounds[0]*s;
    view.ty = pad + (h - pad*2 - dy*s)/2 + bounds[3]*s;
  }
  function setScaleKeepingCenter(targetScale){
    const w=els.mapWrap.clientWidth, h=els.mapWrap.clientHeight;
    const centerWorld = screenToWorld(w/2, h/2);
    view.scale = Math.max(view.minScale, Math.min(view.maxScale, targetScale));
    const [sx, sy] = worldToScreen(centerWorld[0], centerWorld[1]);
    view.tx += (w/2 - sx);
    view.ty += (h/2 - sy);
    clampPan();
  }
  function resetHomeView(){
    view.scale = homeView.scale;
    view.minScale = homeView.minScale;
    view.maxScale = homeView.maxScale;
    view.tx = homeView.tx;
    view.ty = homeView.ty;
    view.baseScale = homeView.baseScale;
  }
  function centerOnWorldPoint(x, y, targetScale){
    resetHomeView();
    view.scale = Math.max(view.minScale, Math.min(view.maxScale, targetScale));
    const w = els.mapWrap.clientWidth, h = els.mapWrap.clientHeight;
    view.tx = w / 2 - x * view.scale;
    view.ty = h / 2 + y * view.scale;
    clampPan();
  }
  function bboxCenter(bounds){
    return [(bounds[0] + bounds[2]) / 2, (bounds[1] + bounds[3]) / 2];
  }
  function expandBounds(bounds, padFrac=0.18, minPad=0.01){
    const dx=Math.max(bounds[2]-bounds[0], minPad), dy=Math.max(bounds[3]-bounds[1], minPad);
    const px=Math.max(dx*padFrac, minPad), py=Math.max(dy*padFrac, minPad);
    return [bounds[0]-px, bounds[1]-py, bounds[2]+px, bounds[3]+py];
  }
  function clampPan(){
    const w=els.mapWrap.clientWidth, h=els.mapWrap.clientHeight; const marginX=Math.max(120, w*0.35), marginY=Math.max(120, h*0.35); const xs=[allBounds[0],allBounds[2]], ys=[allBounds[1],allBounds[3]]; const sx=xs.map(x=>x*view.scale + view.tx); const sy=ys.map(y=>view.ty - y*view.scale); const minScreenX=Math.min(...sx), maxScreenX=Math.max(...sx); const minScreenY=Math.min(...sy), maxScreenY=Math.max(...sy); if(maxScreenX < marginX) view.tx += marginX - maxScreenX; if(minScreenX > w - marginX) view.tx -= minScreenX - (w - marginX); if(maxScreenY < marginY) view.ty += maxScreenY - marginY; if(minScreenY > h - marginY) view.ty += (h - marginY) - minScreenY;
  }
  function worldToScreen(x,y){ return [x*view.scale + view.tx, view.ty - y*view.scale]; }
  function screenToWorld(px,py){ return [(px - view.tx)/view.scale, (view.ty - py)/view.scale]; }

  function scheduleDraw(){
    if(state.renderQueued) return;
    state.renderQueued = true;
    requestAnimationFrame(()=>{ state.renderQueued = false; draw(); });
  }

  function labelsAllowed(){
    return !state.dragging && performance.now() >= state.labelsDeferredUntil;
  }

  function pathGeometry(geometry){
    if(geometry.type==='Polygon') drawPolygonCoords(geometry.coordinates); else if(geometry.type==='MultiPolygon') geometry.coordinates.forEach(drawPolygonCoords); else if(geometry.type==='LineString') drawLineCoords(geometry.coordinates); else if(geometry.type==='MultiLineString') geometry.coordinates.forEach(drawLineCoords);
  }
  function drawPolygonCoords(poly){ poly.forEach(ring=>{ ring.forEach(([x,y],idx)=>{ const [sx,sy]=worldToScreen(x,y); idx?ctx.lineTo(sx,sy):ctx.moveTo(sx,sy); }); ctx.closePath(); }); }
  function drawLineCoords(line){ line.forEach(([x,y],idx)=>{ const [sx,sy]=worldToScreen(x,y); idx?ctx.lineTo(sx,sy):ctx.moveTo(sx,sy); }); }

  function currentMode(){ const ratio = view.scale / view.baseScale; if(ratio < 1.8) return 'overview'; if(ratio < 3.3) return 'transition'; return 'detail'; }
  function visibleRailTypes(){ const ratio = view.scale / view.baseScale; if(ratio < 1.55) return []; if(ratio < 2.25) return ['main']; if(ratio < 3) return ['main','service']; return ['main','service','historic']; }
  function visibleLiwa(){ return (view.scale / view.baseScale) >= 1.45; }
  function visiblePlaces(){ return (view.scale / view.baseScale) >= 2.6; }
  function visibleFiber(){ return (view.scale / view.baseScale) >= 3.0; }
  function visibleArchSites(){ return (view.scale / view.baseScale) >= 2.2; }
  function visibleMasar(){ return true; }
  function activeFiberTypes(){ const ratio = view.scale / view.baseScale; const out=[]; if(els.toggleFiberEdu?.checked && ratio >= 3.0) out.push('edu'); if(els.toggleFiberGov?.checked && ratio >= 3.2) out.push('gov_agency'); if(els.toggleFiberHealth?.checked && ratio >= 3.3) out.push('health'); if(els.toggleFiberSchools?.checked && ratio >= 5.8) out.push('school'); return out; }
  function visibleRoadTypes(){
    const ratio = view.scale / view.baseScale;
    if(ratio < 4.4) return [];
    if(ratio < 6.4) return ['major'];
    if(ratio < 8.3) return ['major','medium'];
    if(ratio < 10.8) return ['major','medium','local'];
    return ['major','medium','local','minor'];
  }
  function activeRoadTypes(){
    const visible = visibleRoadTypes();
    if(!state.dragging) return visible;
    return visible.includes('major') ? ['major'] : [];
  }
  function activeRailTypes(){
    const visible = visibleRailTypes();
    if(!state.dragging) return visible;
    if(visible.includes('main')) return ['main'];
    return visible;
  }
  function updateZoomBadges(){
    const ratio = view.scale / view.baseScale;
    els.modeBadge.textContent = state.mode==='overview'?'إداري':state.mode==='transition'?'انتقالي':'تفصيلي';
    els.zoomBadge.textContent = ratio.toFixed(2) + '×';
    const roadTypes=visibleRoadTypes();
    els.highwayZoomBadge.textContent = !roadTypes.length ? 'غير ظاهر بعد' : roadTypes.length===1 ? 'رئيسية فقط' : roadTypes.length===2 ? 'رئيسية + متوسطة' : roadTypes.length===3 ? 'حتى المحلية' : 'كل الفئات';
    els.zoomHint.textContent = !roadTypes.length ? 'لتحسين الأداء، لا تظهر الطرق إلا تدريجيًا حسب التكبير ونوع الطريق.' : (state.dragging ? 'أثناء السحب أو التكبير تبقى الطرق الرئيسية فقط لتسريع العرض.' : `يتم رسم ${roadTypes.join(' + ')} فقط داخل النطاق الظاهر.`);
    els.railLegendWrap.classList.toggle('hidden', state.mode==='overview');
    els.highwayLegendWrap.classList.toggle('hidden', !roadTypes.length);
    if(els.placeLegendWrap) els.placeLegendWrap.classList.toggle('hidden', !(els.togglePlaces.checked && visiblePlaces()));
    if(els.fiberLegendWrap) els.fiberLegendWrap.classList.toggle('hidden', !activeFiberTypes().length);
    if(els.archLegendWrap) els.archLegendWrap.classList.toggle('hidden', !(els.toggleArchSites?.checked && visibleArchSites()));
    if(els.masarLegendWrap) els.masarLegendWrap.classList.toggle('hidden', !els.toggleMasar?.checked);
  }

  function draw(){
    const w=els.mapWrap.clientWidth, h=els.mapWrap.clientHeight; ctx.clearRect(0,0,w,h); if(state.basemap === 'imagery'){ drawImageryBasemap(w,h); } else { drawStandardBasemap(w,h); }
    drawHillshadeLayer();
    state.mode=currentMode(); updateZoomBadges();

    if(els.toggleGov.checked){
      govProcessed.forEach(f=>{ ctx.beginPath(); pathGeometry(f.geometry); ctx.fillStyle = state.mode==='overview' ? f._color : PALE_GOV; ctx.strokeStyle = state.selected?.kind==='gov' && state.selected.feature._id===f._id ? '#ef4444' : '#ffffff'; ctx.lineWidth = state.selected?.kind==='gov' && state.selected.feature._id===f._id ? 2.8 : 1.6; ctx.fill(); ctx.stroke(); });
      if(els.toggleGovLabels.checked) drawGovernorateLabels();
    }
    if(els.toggleLiwa.checked && visibleLiwa()) drawLiwa();
    if(els.toggleMasar?.checked && visibleMasar()) drawMasar();
    if(els.toggleRails.checked) drawRails();
    if(els.toggleHighways.checked) drawHighways();
    if(els.togglePlaces.checked && visiblePlaces()) drawPlaces();
    if(activeFiberTypes().length) drawFiberLayers();
    if(els.toggleArchSites?.checked && visibleArchSites()) drawArchSites();
    if(els.toggleContours?.checked) drawContours();
    drawSelectedOverlay();
    if(state.hover && !state.dragging){ ctx.save(); if(state.hover.kind==='gov' || state.hover.kind==='liwa'){ const f=state.hover.feature; ctx.beginPath(); pathGeometry(f.geometry); ctx.strokeStyle='#ffd166'; ctx.lineWidth=3; ctx.stroke(); } else if(state.hover.kind==='rail' || state.hover.kind==='highway'){ ctx.beginPath(); pathGeometry(state.hover.feature.geometry); ctx.strokeStyle='#ffd166'; ctx.lineWidth=4; ctx.stroke(); } else if(state.hover.kind==='place' || state.hover.kind==='fiber' || state.hover.kind==='arch'){ const [sx,sy]=worldToScreen(...state.hover.feature.geometry.coordinates); ctx.fillStyle='#ffd166'; ctx.beginPath(); ctx.arc(sx,sy,7.5,0,Math.PI*2); ctx.fill(); } ctx.restore(); }
  }

  function drawSelectedOverlay(){
    if(!state.selected) return;
    if(state.selected.kind==='gov' || state.selected.kind==='liwa') return;
    const features = state.searchTarget && state.searchTarget.kind === state.selected.kind ? state.searchTarget.features : [state.selected.feature];
    if(!features || !features.length) return;
    const maxFeatures = state.selected.kind === 'highway' ? 24 : 12;
    ctx.save();
    ctx.lineJoin='round'; ctx.lineCap='round';
    let count=0;
    for(const f of features){
      if(count>=maxFeatures) break;
      if(f.geometry.type === 'Point'){
        const [sx,sy]=worldToScreen(...f.geometry.coordinates);
        ctx.beginPath();
        ctx.fillStyle='rgba(255,255,255,0.95)';
        ctx.arc(sx,sy,10,0,Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle='#f59e0b';
        ctx.arc(sx,sy,6.5,0,Math.PI*2);
        ctx.fill();
      } else {
        ctx.beginPath(); pathGeometry(f.geometry);
        ctx.strokeStyle='rgba(255,255,255,0.95)';
        ctx.lineWidth = state.selected.kind==='highway' ? 7.5 : 6.5;
        ctx.stroke();
        ctx.beginPath(); pathGeometry(f.geometry);
        ctx.strokeStyle = state.selected.kind==='highway' ? '#ef4444' : '#d97706';
        ctx.lineWidth = state.selected.kind==='highway' ? 4.2 : 3.5;
        ctx.stroke();
      }
      count += 1;
    }
    ctx.restore();
  }

  function drawLiwa(){
    const ratio=view.scale/view.baseScale;
    liwaProcessed.forEach(f=>{
      ctx.save();
      ctx.beginPath(); pathGeometry(f.geometry);
      ctx.fillStyle = state.selected?.kind==='liwa' && state.selected.feature._id===f._id ? 'rgba(239,68,68,0.10)' : LIWA_STYLE.fill;
      ctx.strokeStyle = state.selected?.kind==='liwa' && state.selected.feature._id===f._id ? '#ef4444' : LIWA_STYLE.stroke;
      ctx.lineWidth = state.selected?.kind==='liwa' && state.selected.feature._id===f._id ? 2.4 : LIWA_STYLE.width;
      ctx.setLineDash(ratio < 2.2 ? [4,4] : LIWA_STYLE.dash);
      ctx.fill(); ctx.stroke();
      ctx.restore();
    });
    if(els.toggleLiwaLabels.checked) drawLiwaLabels();
  }
  function drawLiwaLabels(){
    if(!labelsAllowed()) return;
    const ratio=view.scale/view.baseScale;
    if(ratio < 2.0) return;
    ctx.save();
    ctx.font=`700 ${Math.min(12,9+ratio*0.28)}px Segoe UI, Arial`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    const occupied=[]; const cell=118; const used=new Set();
    let maxLabels = ratio < 3.4 ? 18 : ratio < 5.5 ? 28 : 40;
    liwaProcessed.forEach(f=>{
      if(maxLabels<=0) return;
      const [sx,sy]=worldToScreen(...f._labelPoint);
      if(sx<48||sx>els.mapWrap.clientWidth-48||sy<18||sy>els.mapWrap.clientHeight-18) return;
      const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy; if(used.has(key)) return;
      const width=ctx.measureText(f._displayName).width+14; const box={x:sx-width/2,y:sy-9,w:width,h:18};
      if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) return;
      used.add(key); occupied.push(box); maxLabels--;
      ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=4; ctx.strokeText(f._displayName,sx,sy);
      ctx.fillStyle='#7a5a16'; ctx.fillText(f._displayName,sx,sy);
    });
    ctx.restore();
  }

  function drawGovernorateLabels(){
    if(!labelsAllowed()) return;
    const ratio=view.scale/view.baseScale;
    govProcessed.forEach(f=>{ if(state.mode==='detail' && ratio>3.2) return; const [sx,sy]=worldToScreen(...f._labelPoint); if(sx<34||sx>els.mapWrap.clientWidth-34||sy<18||sy>els.mapWrap.clientHeight-18) return; ctx.save(); ctx.font = `700 ${state.mode==='overview'?15:11}px Segoe UI, Arial`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=4; ctx.strokeText(f._displayName,sx,sy); ctx.fillStyle= state.mode==='overview' ? '#183b63' : '#735f14'; ctx.fillText(f._displayName,sx,sy); ctx.restore(); });
  }
  function drawMasar(){
    const ratio = view.scale / view.baseScale;
    const vw = expandViewport(currentViewportWorld(), 0.05);
    const ids = querySpatialIndex(masarIndex, vw);
    const labelCandidates=[];
    ctx.save();
    ctx.lineJoin='round'; ctx.lineCap='round';
    for(let i=0;i<ids.length;i++){
      const f=masarProcessed[ids[i]];
      if(!bboxIntersectsWorld(f._bbox,vw)) continue;
      ctx.beginPath(); pathGeometry(f.geometry); ctx.strokeStyle=MASAR_STYLE.halo; ctx.lineWidth=MASAR_STYLE.width+2.8; ctx.stroke();
      ctx.beginPath(); pathGeometry(f.geometry); ctx.strokeStyle=(state.selected?.kind==='masar' && state.selected.feature._id===f._id)?MASAR_STYLE.selected:MASAR_STYLE.stroke; ctx.lineWidth=(state.selected?.kind==='masar' && state.selected.feature._id===f._id)?MASAR_STYLE.width+1.6:MASAR_STYLE.width; ctx.stroke();
      if(els.toggleMasarLabels?.checked && labelsAllowed()) labelCandidates.push(f);
    }
    ctx.restore();
    if(els.toggleMasarLabels?.checked && labelsAllowed()) drawMasarLabels(labelCandidates, ratio);
  }
  function drawMasarLabels(candidates, ratio){
    if(ratio < 1.5) return;
    ctx.save(); ctx.font=`700 ${Math.min(11, 8.5+ratio*0.18)}px Segoe UI, Arial`; ctx.textAlign='center'; ctx.textBaseline='bottom';
    const occupied=[]; const cell=120; const used=new Set(); let maxLabels = ratio < 2.5 ? 8 : ratio < 4 ? 16 : 28;
    for(const f of candidates){
      if(maxLabels<=0) break;
      const [sx,sy]=worldToScreen(...f._labelPoint);
      if(sx<40||sx>els.mapWrap.clientWidth-40||sy<20||sy>els.mapWrap.clientHeight-20) continue;
      const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy; if(used.has(key)) continue;
      const text = f.properties.stage ? `مرحلة ${f.properties.stage}` : 'درب الأردن';
      const width=ctx.measureText(text).width+12; const box={x:sx-width/2,y:sy-16,w:width,h:16};
      if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) continue;
      used.add(key); occupied.push(box); maxLabels--;
      ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=3.2; ctx.strokeText(text,sx,sy);
      ctx.fillStyle='#065f46'; ctx.fillText(text,sx,sy);
    }
    ctx.restore();
  }

  function drawRails(){
    const visibleTypes = activeRailTypes(); if(!visibleTypes.length) return;
    const vw = expandViewport(currentViewportWorld(), 0.06);
    visibleTypes.forEach(type=>{
      const feats = railBuckets[type];
      const ids = querySpatialIndex(railIndexes[type], vw);
      const style = SERVICE_STYLE[type];
      for(let i=0;i<ids.length;i++){
        const f = feats[ids[i]];
        if(!bboxIntersectsWorld(f._bbox, vw)) continue;
        ctx.save(); ctx.beginPath(); pathGeometry(f.geometry); ctx.lineJoin='round'; ctx.lineCap='round';
        ctx.strokeStyle='rgba(255,255,255,0.85)'; ctx.lineWidth=(style.width+2.4)*(view.scale/view.baseScale>3?1.05:1); ctx.setLineDash(style.dash); ctx.stroke();
        ctx.beginPath(); pathGeometry(f.geometry); ctx.strokeStyle=style.stroke; ctx.lineWidth=style.width; ctx.setLineDash(style.dash); ctx.stroke(); ctx.restore();
      }
    });
    if(els.toggleRailLabels.checked && state.mode==='detail') drawRailLabels(visibleTypes, vw);
  }
  function drawRailLabels(visibleTypes, vw){
    if(!labelsAllowed()) return;
    const ratio=view.scale/view.baseScale;
    ctx.save();
    ctx.font=`700 ${Math.min(13,10+ratio*0.7)}px Segoe UI, Arial`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    const occupied=[]; const cell=110; const used=new Set();
    let shown=0, maxLabels = ratio > 6 ? 36 : 20;
    const candidates=[];
    visibleTypes.forEach(type=>{
      railBuckets[type].forEach(f=>{
        if(!f._label || !bboxIntersectsWorld(f._bbox, vw)) return;
        candidates.push(f);
      });
    });
    candidates.sort((a,b)=> (a._type==='main'?0:a._type==='service'?1:2) - (b._type==='main'?0:b._type==='service'?1:2));
    for(const f of candidates){
      if(shown>=maxLabels) break;
      const [sx,sy]=worldToScreen(...f._labelPoint);
      if(sx<60||sx>els.mapWrap.clientWidth-60||sy<24||sy>els.mapWrap.clientHeight-24) continue;
      const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy;
      if(used.has(key)) continue;
      const width = ctx.measureText(f._label).width + 18;
      const box={x:sx-width/2,y:sy-10,w:width,h:20};
      if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) continue;
      used.add(key); occupied.push(box); shown++;
      ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=4; ctx.strokeText(f._label,sx,sy);
      ctx.fillStyle='#4b3a1a'; ctx.fillText(f._label,sx,sy);
    }
    ctx.restore();
  }

  function drawHighways(){
    const visibleTypes=activeRoadTypes(); if(!visibleTypes.length) return;
    const vw=expandViewport(currentViewportWorld(), state.dragging ? 0.02 : 0.05); const ratio=view.scale/view.baseScale;
    visibleTypes.forEach(type=>{
      const feats = roadBuckets[type];
      const ids = querySpatialIndex(roadIndexes[type], vw);
      const style=ROAD_STYLE[type];
      const scaleBoost = ratio > 9 ? 1.15 : ratio > 6 ? 1.05 : 1;
      const maxDraw = state.dragging
        ? (type==='major' ? Math.min(ids.length, 2200) : 0)
        : (type==='major' ? Math.min(ids.length, 4500)
          : type==='medium' ? Math.min(ids.length, 4200)
          : type==='local' ? Math.min(ids.length, 2800)
          : Math.min(ids.length, 1200));
      for(let i=0;i<maxDraw;i++){
        const f = feats[ids[i]];
        if(!bboxIntersectsWorld(f._bbox, vw)) continue;
        ctx.save(); ctx.beginPath(); pathGeometry(f.geometry); ctx.lineJoin='round'; ctx.lineCap='round';
        ctx.strokeStyle='rgba(255,255,255,0.88)'; ctx.lineWidth=(style.width+1.6)*scaleBoost; ctx.setLineDash(style.dash); ctx.stroke();
        ctx.beginPath(); pathGeometry(f.geometry); ctx.strokeStyle=style.stroke; ctx.lineWidth=style.width*scaleBoost; ctx.setLineDash(style.dash); ctx.stroke(); ctx.restore();
      }
    });
    if(!state.dragging && els.toggleHighwayLabels.checked && ratio >= 7.4) drawHighwayLabels(visibleTypes, vw, ratio);
  }
  function drawHighwayLabels(visibleTypes, vw, ratio){
    if(!labelsAllowed()) return;
    ctx.save(); ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.font=`700 ${Math.min(12, 9 + ratio*0.35)}px Segoe UI, Arial`;
    const occupied=[]; const cell=130; const used=new Set();
    const candidateTypes = ratio >= 10.8 ? ['major','medium'] : ['major'];
    let maxLabels = ratio >= 12 ? 30 : ratio >= 10.8 ? 20 : 10;
    for(const type of candidateTypes){
      if(!visibleTypes.includes(type)) continue;
      const feats = roadBuckets[type];
      const ids = querySpatialIndex(roadIndexes[type], vw);
      let shown = 0;
      for(let i=0;i<ids.length;i++){
        if(maxLabels<=0) break;
        const f=feats[ids[i]];
        if(!f._label || !f._labelPoint || !bboxIntersectsWorld(f._bbox, vw)) continue;
        const [sx,sy]=worldToScreen(...f._labelPoint);
        if(sx<70||sx>els.mapWrap.clientWidth-70||sy<26||sy>els.mapWrap.clientHeight-26) continue;
        const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy;
        if(used.has(key)) continue;
        const width = ctx.measureText(f._label).width + 16; const box={x:sx-width/2,y:sy-9,w:width,h:18};
        if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) continue;
        used.add(key); occupied.push(box); shown++; maxLabels--;
        ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=4; ctx.strokeText(f._label,sx,sy);
        ctx.fillStyle= type==='major' ? '#5b3a18' : '#6b4f2f'; ctx.fillText(f._label,sx,sy);
        if((type==='major' && shown>=24) || (type==='medium' && shown>=12)) break;
      }
    }
    ctx.restore();
  }

  function drawPlaces(){
    const ratio=view.scale/view.baseScale;
    const vw=expandViewport(currentViewportWorld(), 0.03);
    const ids=querySpatialIndex(placeIndex, vw);
    const candidates=[];
    for(let i=0;i<ids.length;i++){
      const f=placeProcessed[ids[i]]; if(!bboxIntersectsWorld(f._bbox,vw)) continue;
      if(ratio < 4.2 && f._type==='village') continue;
      if(ratio < 3.3 && f._type==='town') continue;
      candidates.push(f);
    }
    candidates.sort((a,b)=> (a._type===b._type ? (b._population-a._population) : (a._type==='city'?-1:b._type==='city'?1:a._type==='town'?-1:b._type==='town'?1:0)));
    const limit = ratio < 3.3 ? 40 : ratio < 5.2 ? 120 : ratio < 7.8 ? 260 : 520;
    ctx.save();
    const labelCandidates=[];
    for(let i=0;i<Math.min(candidates.length,limit);i++){
      const f=candidates[i]; const [sx,sy]=worldToScreen(...f.geometry.coordinates);
      if(sx<0||sx>els.mapWrap.clientWidth||sy<0||sy>els.mapWrap.clientHeight) continue;
      const style = PLACE_STYLE[f._type] || PLACE_STYLE.village;
      const rad = state.selected?.kind==='place' && state.selected.feature._id===f._id ? style.radius+2.4 : style.radius;
      ctx.beginPath(); ctx.arc(sx,sy,rad+1.6,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.92)'; ctx.fill();
      ctx.beginPath(); ctx.arc(sx,sy,rad,0,Math.PI*2); ctx.fillStyle=style.fill; ctx.fill();
      if(els.togglePlaceLabels.checked) labelCandidates.push({f,sx,sy});
    }
    ctx.restore();
    if(els.togglePlaceLabels.checked && labelsAllowed()) drawPlaceLabels(labelCandidates, ratio);
  }
  function drawPlaceLabels(candidates, ratio){
    ctx.save(); ctx.font=`700 ${Math.min(12,9+ratio*0.18)}px Segoe UI, Arial`; ctx.textAlign='center'; ctx.textBaseline='bottom';
    const occupied=[]; const cell=104; const used=new Set(); let maxLabels = ratio < 3.3 ? 14 : ratio < 5.2 ? 34 : ratio < 7.8 ? 70 : 120;
    for(const item of candidates){
      if(maxLabels<=0) break; const f=item.f;
      if(ratio < 4.2 && f._type==='village') continue;
      if(ratio < 3.3 && f._type!=='city') continue;
      const sx=item.sx, sy=item.sy - 7;
      const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy; if(used.has(key)) continue;
      const width=ctx.measureText(f._label).width+12; const box={x:sx-width/2,y:sy-16,w:width,h:16};
      if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) continue;
      used.add(key); occupied.push(box); maxLabels--;
      ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=3.5; ctx.strokeText(f._label,sx,sy);
      ctx.fillStyle='#133c63'; ctx.fillText(f._label,sx,sy);
    }
    ctx.restore();
  }

  function drawArchSites(){
    const ratio = view.scale / view.baseScale;
    const vw = expandViewport(currentViewportWorld(), 0.04);
    const ids = querySpatialIndex(archIndex, vw);
    const labelCandidates = [];
    for(let i=0;i<ids.length;i++){
      const f = archProcessed[ids[i]];
      if(!bboxIntersectsWorld(f._bbox, vw)) continue;
      const [sx,sy]=worldToScreen(...f.geometry.coordinates);
      const r = ARCH_STYLE.radius + (state.selected?.kind==='arch' && state.selected.feature._id===f._id ? 2 : 0);
      ctx.beginPath();
      ctx.fillStyle = ARCH_STYLE.fill;
      ctx.strokeStyle = state.selected?.kind==='arch' && state.selected.feature._id===f._id ? '#f59e0b' : ARCH_STYLE.stroke;
      ctx.lineWidth = state.selected?.kind==='arch' && state.selected.feature._id===f._id ? 3.2 : 1.8;
      ctx.arc(sx,sy,r,0,Math.PI*2);
      ctx.fill(); ctx.stroke();
      if(els.toggleArchLabels?.checked && labelsAllowed()) labelCandidates.push({f,sx,sy});
    }
    if(els.toggleArchLabels?.checked && labelsAllowed()) drawArchLabels(labelCandidates, ratio);
  }
  function drawArchLabels(candidates, ratio){
    ctx.save();
    ctx.font=`700 ${Math.min(11, 8.5+ratio*0.16)}px Segoe UI, Arial`;
    ctx.textAlign='center'; ctx.textBaseline='bottom';
    const occupied=[]; const cell=96; const used=new Set();
    let maxLabels = ratio < 3.2 ? 4 : 16;
    for(const item of candidates){
      if(maxLabels<=0) break;
      const text=item.f._label;
      const sx=item.sx, sy=item.sy - 8;
      const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy;
      if(used.has(key)) continue;
      const width=ctx.measureText(text).width+10;
      const box={x:sx-width/2,y:sy-15,w:width,h:15};
      if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) continue;
      used.add(key); occupied.push(box); maxLabels--;
      ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=3.2; ctx.strokeText(text,sx,sy);
      ctx.fillStyle='#7c2d12'; ctx.fillText(text,sx,sy);
    }
    ctx.restore();
  }

  function drawFiberLayers(){
    const ratio = view.scale / view.baseScale;
    const vw = expandViewport(currentViewportWorld(), 0.04);
    const labelCandidates=[];
    const types = activeFiberTypes();
    for(const type of types){
      const feats = fiberBuckets[type];
      const ids = querySpatialIndex(fiberIndexes[type], vw);
      const style = FIBER_STYLE[type];
      for(let i=0;i<ids.length;i++){
        const f = feats[ids[i]];
        if(!bboxIntersectsWorld(f._bbox, vw)) continue;
        const [sx,sy]=worldToScreen(...f.geometry.coordinates);
        const r = style.radius + (state.selected?.kind==='fiber' && state.selected.feature._id===f._id ? 2 : 0);
        ctx.beginPath();
        ctx.fillStyle = style.fill;
        ctx.strokeStyle = state.selected?.kind==='fiber' && state.selected.feature._id===f._id ? '#f59e0b' : style.stroke;
        ctx.lineWidth = state.selected?.kind==='fiber' && state.selected.feature._id===f._id ? 3.2 : 1.5;
        ctx.arc(sx,sy,r,0,Math.PI*2);
        ctx.fill(); ctx.stroke();
        if(els.toggleFiberLabels?.checked && labelsAllowed()) labelCandidates.push({f,sx,sy});
      }
    }
    if(els.toggleFiberLabels?.checked && labelsAllowed()) drawFiberLabels(labelCandidates, ratio);
  }
  function drawFiberLabels(candidates, ratio){
    ctx.save();
    ctx.font=`700 ${Math.min(11, 8.5+ratio*0.16)}px Segoe UI, Arial`;
    ctx.textAlign='center'; ctx.textBaseline='bottom';
    const occupied=[]; const cell=96; const used=new Set();
    let maxLabels = ratio < 4.5 ? 12 : ratio < 6.8 ? 28 : ratio < 9 ? 60 : 110;
    for(const item of candidates){
      if(maxLabels<=0) break;
      const f=item.f;
      if(ratio < 5.8 && f._type==='school') continue;
      const sx=item.sx, sy=item.sy - 7;
      const gx=Math.floor(sx/cell), gy=Math.floor(sy/cell), key=gx+','+gy;
      if(used.has(key)) continue;
      const text=f._label;
      const width=ctx.measureText(text).width+10;
      const box={x:sx-width/2,y:sy-15,w:width,h:15};
      if(occupied.some(o=>!(box.x+box.w<o.x||o.x+o.w<box.x||box.y+box.h<o.y||o.y+o.h<box.y))) continue;
      used.add(key); occupied.push(box); maxLabels--;
      ctx.strokeStyle='rgba(255,255,255,0.98)'; ctx.lineWidth=3.2; ctx.strokeText(text,sx,sy);
      ctx.fillStyle='#0f172a'; ctx.fillText(text,sx,sy);
    }
    ctx.restore();
  }

  function hitTest(px,py){
    const vw=expandViewport(currentViewportWorld(), 0.02);
    if(els.togglePlaces.checked && visiblePlaces()){
      const ids=querySpatialIndex(placeIndex, vw);
      for(let i=ids.length-1;i>=0;i--){
        const f=placeProcessed[ids[i]]; if(!bboxIntersectsWorld(f._bbox,vw)) continue;
        const [sx,sy]=worldToScreen(...f.geometry.coordinates);
        const style=PLACE_STYLE[f._type] || PLACE_STYLE.village; const r=style.radius+6;
        if((px-sx)*(px-sx)+(py-sy)*(py-sy) <= r*r) return {kind:'place', feature:f};
      }
    }
    const visibleFibers = activeFiberTypes();
    if(visibleFibers.length){
      for(let t=visibleFibers.length-1;t>=0;t--){
        const type=visibleFibers[t], feats=fiberBuckets[type], ids=querySpatialIndex(fiberIndexes[type], vw), style=FIBER_STYLE[type];
        for(let i=ids.length-1;i>=0;i--){
          const f=feats[ids[i]]; if(!bboxIntersectsWorld(f._bbox,vw)) continue;
          const [sx,sy]=worldToScreen(...f.geometry.coordinates); const r=style.radius+7;
          if((px-sx)*(px-sx)+(py-sy)*(py-sy) <= r*r) return {kind:'fiber', feature:f};
        }
      }
    }
    if(els.toggleArchSites?.checked && visibleArchSites()){
      const ids=querySpatialIndex(archIndex, vw);
      for(let i=ids.length-1;i>=0;i--){
        const f=archProcessed[ids[i]]; if(!bboxIntersectsWorld(f._bbox,vw)) continue;
        const [sx,sy]=worldToScreen(...f.geometry.coordinates); const r=ARCH_STYLE.radius+7;
        if((px-sx)*(px-sx)+(py-sy)*(py-sy) <= r*r) return {kind:'arch', feature:f};
      }
    }
    if(els.toggleMasar?.checked && visibleMasar()){
      const ids=querySpatialIndex(masarIndex, vw);
      for(let i=ids.length-1;i>=0;i--){
        const f=masarProcessed[ids[i]];
        if(!bboxIntersectsWorld(f._bbox,vw)) continue;
        ctx.beginPath(); pathGeometry(f.geometry); ctx.lineWidth=Math.max(10, MASAR_STYLE.width+8); if(ctx.isPointInStroke(px,py)) return {kind:'masar', feature:f};
      }
    }
    const visibleRoads=visibleRoadTypes();
    if(visibleRoads.length){
      for(let t=visibleRoads.length-1;t>=0;t--){
        const type=visibleRoads[t], feats=roadBuckets[type], ids=querySpatialIndex(roadIndexes[type], vw), style=ROAD_STYLE[type];
        for(let i=ids.length-1;i>=0;i--){
          const f=feats[ids[i]];
          if(!bboxIntersectsWorld(f._bbox,vw)) continue;
          ctx.beginPath(); pathGeometry(f.geometry); ctx.lineWidth=Math.max(9, style.width+7); if(ctx.isPointInStroke(px,py)) return {kind:'highway', feature:f};
        }
      }
    }
    const visibleRails=visibleRailTypes();
    for(let t=visibleRails.length-1;t>=0;t--){
      const type=visibleRails[t], feats=railBuckets[type], ids=querySpatialIndex(railIndexes[type], vw), style=SERVICE_STYLE[type];
      for(let i=ids.length-1;i>=0;i--){
        const f=feats[ids[i]];
        if(!bboxIntersectsWorld(f._bbox,vw)) continue;
        ctx.beginPath(); pathGeometry(f.geometry); ctx.lineWidth=Math.max(10, style.width+8); if(ctx.isPointInStroke(px,py)) return {kind:'rail', feature:f};
      }
    }
    if(els.toggleLiwa.checked && visibleLiwa()){
      for(let i=liwaProcessed.length-1;i>=0;i--){
        const f=liwaProcessed[i]; ctx.beginPath(); pathGeometry(f.geometry); if(ctx.isPointInPath(px,py)) return {kind:'liwa', feature:f};
      }
    }
    for(let i=govProcessed.length-1;i>=0;i--){
      const f=govProcessed[i];
      ctx.beginPath(); pathGeometry(f.geometry);
      if(ctx.isPointInPath(px,py)) return {kind:'gov', feature:f};
    }
    return null;
  }

  function updateInfo(){
    if(state.selected){
      const s=state.selected;
      if(s.kind==='gov'){
        const p=s.feature.properties; const elev = sampleElevationAt(s.feature._labelPoint || centroidOfFeature(s.feature.geometry));
        els.selectionDetails.innerHTML = `<div class="title">${getGovArabicName(p)}</div><div><span class="chip">${p.NIC_NAME_E||''}</span></div><div>السكان 2014: <strong>${fmt(p.Pop_2014)}</strong></div><div>الكثافة: <strong>${fmt(p['Pop_km²_14'])}</strong></div><div>أسرة الفنادق: <strong>${fmt(p.Ho_beds_14)}</strong></div><div>اللاجئون: <strong>${fmt(p.Refugees)}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>محافظة ${getGovArabicName(p)}</strong> — تم تحديد الشكل وإبرازه على الخريطة.`;
      } else if(s.kind==='liwa'){
        const p=s.feature.properties; const elev = sampleElevationAt(s.feature._labelPoint || centroidOfFeature(s.feature.geometry));
        els.selectionDetails.innerHTML = `<div class="title">${s.feature._displayName}</div><div><span class="chip">لواء</span><span class="chip">${p.fclass||''}</span></div><div>الاسم الأصلي: <strong>${p.name || '—'}</strong></div><div>OSM ID: <strong>${p.osm_id || '—'}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>${s.feature._displayName}</strong> — تم تحديد اللواء وإبرازه على الخريطة.`;
      } else if(s.kind==='rail'){
        const p=s.feature.properties; const kindAr = s.feature._type==='main'?'رئيسي/تشغيلي':s.feature._type==='service'?'خدمي':'تاريخي/متوقف'; const elev = sampleElevationAt(s.feature._labelPoint || lineLabelPoint(s.feature.geometry.coordinates));
        els.selectionDetails.innerHTML = `<div class="title">${getRailArabicName(p)}</div><div><span class="chip">${kindAr}</span><span class="chip">${p.RAILWAY||'غير محدد'}</span></div><div>Gauge: <strong>${p.GAUGE || '—'}</strong></div><div>Bridge: <strong>${p.BRIDGE || '—'}</strong></div><div>Tunnel: <strong>${p.TUNNEL || '—'}</strong></div><div>OSM ID: <strong>${p.OSM_ID || '—'}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>${getRailArabicName(p)}</strong> — تم تحديد المسار وإبرازه على الخريطة.`;
      } else if(s.kind==='place'){
        const p=s.feature.properties; const elev = sampleElevationAt(s.feature.geometry.coordinates);
        els.selectionDetails.innerHTML = `<div class="title">${s.feature._label}</div><div><span class="chip">${getPlaceTypeLabel(s.feature)}</span><span class="chip">${p.fclass || '—'}</span></div><div>السكان: <strong>${fmt(p.population)}</strong></div><div>OSM ID: <strong>${p.osm_id || '—'}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>${s.feature._label}</strong> — تم تحديد الموقع وإبرازه على الخريطة.`;
      } else if(s.kind==='fiber'){
        const p=s.feature.properties; const elev = sampleElevationAt(s.feature.geometry.coordinates);
        els.selectionDetails.innerHTML = `<div class="title">${s.feature._label}</div><div><span class="chip">${p.layer_label || 'موقع مؤسسي'}</span><span class="chip">${p.Department || '—'}</span></div><div>معرف الربط: <strong>${p.Connection_ID || '—'}</strong></div><div>الحالة: <strong>${p.Active || '—'}</strong></div><div>AGG: <strong>${p.AGG ?? '—'}</strong></div><div>الإحداثيات: <strong>${Number(p.Lat||0).toFixed(6)}, ${Number(p.Long||0).toFixed(6)}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>${s.feature._label}</strong> — تم تحديد الموقع المؤسسي وإبرازه على الخريطة.`;
      } else if(s.kind==='arch'){
        const p=s.feature.properties; const elev = sampleElevationAt(s.feature.geometry.coordinates);
        els.selectionDetails.innerHTML = `<div class="title">${s.feature._label}</div><div><span class="chip">موقع أثري</span><span class="chip">${p.gover || '—'}</span></div><div>الوصف: <strong>${p.desc_ || '—'}</strong></div><div>الرقم: <strong>${p.Num || '—'}</strong></div><div>الرقم الفعلي: <strong>${p.Act_Num || '—'}</strong></div><div>الإحداثيات: <strong>${Number(p.y||s.feature.geometry.coordinates[1]).toFixed(6)}, ${Number(p.x||s.feature.geometry.coordinates[0]).toFixed(6)}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>${s.feature._label}</strong> — تم تحديد الموقع الأثري وإبرازه على الخريطة.`;
      } else if(s.kind==='masar'){
        const p=s.feature.properties; const elev = sampleElevationAt(s.feature._labelPoint || lineLabelPoint(s.feature.geometry.coordinates));
        els.selectionDetails.innerHTML = `<div class="title">مسار درب الأردن</div><div><span class="chip">${p.stage ? 'مرحلة '+p.stage : 'مسار'}</span><span class="chip">${p.distance_km ? p.distance_km+' كم' : '—'}</span></div><div>اسم المرحلة: <strong>${p.title || p.name || '—'}</strong></div><div>اسم المصدر: <strong>${p.name || '—'}</strong></div><div>الارتفاع التقريبي قرب المسار: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>مسار درب الأردن</strong> — تم تحديد المرحلة وإبرازها على الخريطة.`;
      } else {
        const p=s.feature.properties; const typeAr = s.feature._type==='major'?'رئيسي' : s.feature._type==='medium'?'متوسط' : s.feature._type==='local'?'محلي' : 'مسار/ممر'; const display = getHighwayArabicName(p) || p.REF || p.HIGHWAY || 'طريق'; const elev = sampleElevationAt(s.feature._labelPoint || lineLabelPoint(s.feature.geometry.coordinates));
        els.selectionDetails.innerHTML = `<div class="title">${display}</div><div><span class="chip">طريق ${typeAr}</span><span class="chip">${p.HIGHWAY || 'غير محدد'}</span></div><div>المرجع: <strong>${p.REF || '—'}</strong></div><div>Bridge: <strong>${p.BRIDGE || '—'}</strong></div><div>Tunnel: <strong>${p.TUNNEL || '—'}</strong></div><div>OSM ID: <strong>${p.OSM_ID || '—'}</strong></div><div>الارتفاع التقريبي: <strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div>`;
        els.featureInfo.innerHTML = `<strong>${display}</strong> — تم الوصول إلى الطريق وإبرازه على الخريطة.`;
      }
      return;
    }
    if(state.clickedLocation){
      const x = state.clickedLocation.world[0];
      const y = state.clickedLocation.world[1];
      const containingGov = state.clickedLocation.govName ? `<div class="coord-row"><span>ضمن المحافظة</span><strong>${state.clickedLocation.govName}</strong></div>` : ''; const elev = sampleElevationAt([x,y]);
      els.selectionDetails.innerHTML = `<div class="location-card"><div class="title">معلومات الموقع</div>${containingGov}<div class="coord-row"><span>خط الطول</span><strong>${x.toFixed(6)}</strong></div><div class="coord-row"><span>خط العرض</span><strong>${y.toFixed(6)}</strong></div><div class="coord-row"><span>الارتفاع</span><strong>${elev!=null?fmt(elev)+' م':'—'}</strong></div><div class="coord-row"><span>مقياس العرض</span><strong>${(view.scale / view.baseScale).toFixed(2)}×</strong></div></div>`;
      els.featureInfo.innerHTML = `<strong>موقع محدد</strong> — تم اختيار نقطة على الخريطة. يمكنك مسح الإبراز أو التصدير إلى PDF.`;
      return;
    }
    els.selectionDetails.textContent='لا يوجد عنصر محدد.';
    els.featureInfo.innerHTML = 'اضغط على محافظة أو لواء أو خط سكة أو طريق أو مسار درب الأردن أو مدينة/بلدة أو موقع مؤسسي أو موقع أثري لعرض التفاصيل، أو اضغط على أي موقع داخل الخريطة لعرض الإحداثيات.';
  }

  function focusFeature(feature){
    let b=[Infinity,Infinity,-Infinity,-Infinity];
    const scan=(coords)=>{ if(typeof coords[0]==='number'){ const [x,y]=coords; if(x<b[0])b[0]=x;if(y<b[1])b[1]=y;if(x>b[2])b[2]=x;if(y>b[3])b[3]=y; } else coords.forEach(scan); };
    scan(feature.geometry.coordinates);
    const pad = feature.geometry.type.includes('Line') ? 60 : 40;
    if(feature.geometry.type==='Point'){
      centerOnWorldPoint(feature.geometry.coordinates[0], feature.geometry.coordinates[1], homeView.baseScale*6.5);
    } else {
      fitBounds(expandBounds(b, feature.geometry.type.includes('Line') ? 0.3 : 0.12, feature.geometry.type.includes('Line') ? 0.008 : 0.01), pad);
      if(feature.geometry.type.includes('Line')) setScaleKeepingCenter(Math.max(view.scale, view.baseScale*4.2));
    }
    state.labelsDeferredUntil = performance.now() + 180;
    scheduleDraw();
    updateInfo();
  }
  function zoomAt(cx,cy,factor){ const before=screenToWorld(cx,cy); view.scale = Math.max(view.minScale, Math.min(view.maxScale, view.scale * factor)); const after=worldToScreen(...before); view.tx += cx - after[0]; view.ty += cy - after[1]; clampPan(); state.labelsDeferredUntil = performance.now() + 180; scheduleDraw(); }

  els.canvas.addEventListener('wheel', e=>{ e.preventDefault(); const factor = e.deltaY < 0 ? 1.15 : 1/1.15; zoomAt(e.offsetX, e.offsetY, factor); }, {passive:false});
  els.canvas.addEventListener('dblclick', e=>{ e.preventDefault(); zoomAt(e.offsetX, e.offsetY, 1.35); });
  els.canvas.addEventListener('mousedown', e=>{ state.dragging=true; state.labelsDeferredUntil = performance.now() + 240; state.lastX=e.clientX; state.lastY=e.clientY; els.canvas.classList.add('dragging'); });
  window.addEventListener('mouseup', ()=>{ if(state.dragging){ state.dragging=false; state.labelsDeferredUntil = performance.now() + 180; els.canvas.classList.remove('dragging'); scheduleDraw(); } });
  window.addEventListener('mousemove', e=>{ if(state.dragging){ view.tx += e.clientX-state.lastX; view.ty += e.clientY-state.lastY; state.lastX=e.clientX; state.lastY=e.clientY; clampPan(); scheduleDraw(); return; } const rect=els.canvas.getBoundingClientRect(); const hit=hitTest(e.clientX-rect.left,e.clientY-rect.top); state.hover=hit; els.canvas.style.cursor = hit ? 'pointer' : 'grab'; scheduleDraw(); });
  els.canvas.addEventListener('click', e=>{
    const hit=hitTest(e.offsetX,e.offsetY);
    if(hit){
      state.selected=hit;
      state.searchTarget = {kind: hit.kind, bounds: hit.feature._bbox, name:'', features:[hit.feature]};
      state.clickedLocation = null;
    } else {
      const world = screenToWorld(e.offsetX, e.offsetY);
      const gov = governorateAtWorldPoint(world);
      state.selected = null;
      state.searchTarget = null;
      state.clickedLocation = {world, govName: gov ? getGovArabicName(gov.properties) : ''};
    }
    updateInfo();
    scheduleDraw();
  });

  els.homeBtn.onclick=()=>{ resetHomeView(); state.searchTarget = null; state.selected = null; state.clickedLocation = null; updateInfo(); scheduleDraw(); };
  if(els.layerHelpBtn){ els.layerHelpBtn.onclick = ()=> openLayerHelp(); }
  if(els.sidebarToggleBtn){ els.sidebarToggleBtn.onclick = ()=> toggleSidebar(); }
  if(els.basemapBtn){ els.basemapBtn.onclick = ()=> toggleBasemap(); }
  if(els.closeLayerHelpBtn){ els.closeLayerHelpBtn.onclick = ()=> closeLayerHelp(); }
  if(els.layerHelpModal){ els.layerHelpModal.addEventListener('click', (e)=>{ if(e.target === els.layerHelpModal) closeLayerHelp(); }); }
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLayerHelp(); });
  els.zoomInBtn.onclick=()=> zoomAt(els.mapWrap.clientWidth/2, els.mapWrap.clientHeight/2, 1.2);
  els.zoomOutBtn.onclick=()=> zoomAt(els.mapWrap.clientWidth/2, els.mapWrap.clientHeight/2, 1/1.2);
  els.resetNorthBtn.onclick=()=>{ resetHomeView(); state.searchTarget = null; state.selected = null; state.clickedLocation = null; updateInfo(); scheduleDraw(); };
  [els.toggleGov, els.toggleGovLabels, els.toggleLiwa, els.toggleLiwaLabels, els.toggleRails, els.toggleRailLabels, els.toggleHighways, els.toggleHighwayLabels, els.togglePlaces, els.togglePlaceLabels, els.toggleFiberEdu, els.toggleFiberGov, els.toggleFiberHealth, els.toggleFiberSchools, els.toggleFiberLabels, els.toggleArchSites, els.toggleArchLabels, els.toggleMasar, els.toggleMasarLabels, els.toggleHillshade, els.toggleContours].forEach(el=>el && el.addEventListener('change', scheduleDraw));
  els.exportBtn.onclick=()=>{ draw(); const a=document.createElement('a'); a.download='jordan-geoinfra-view.png'; a.href=els.canvas.toDataURL('image/png'); a.click(); };
  if(els.exportPdfBtn){ els.exportPdfBtn.onclick=()=>{ const exportCanvas = buildMapExportCanvas(); downloadCanvasAsPdf(exportCanvas, 'jordan-geoinfra-view.pdf'); }; }
  if(els.clearHighlightBtn){ els.clearHighlightBtn.onclick=()=> clearSelection(); }
  window.addEventListener('resize', resizeCanvas);

  setupLegend(); setupKpis(); setupTable(); setupMapSearch(); resizeCanvas(); setBasemap('standard'); updateInfo(); scheduleDraw();
})();
