// ══════════════════════════════════════════════════════════════════════
// REAL HISTORICAL ECONOMIC DATA - HARDCODED ARRAYS
// ══════════════════════════════════════════════════════════════════════

// ── DATASET 1: Brent Crude Oil Prices (USD/barrel) ──────────────────
// Source: EIA / IMF FRED (POILBREUSDM), Monthly averages 2000–2024
export const BRENT_MONTHLY = [
  // 2000: Jan–Dec
  {date:"2000-01",price:25.5},{date:"2000-02",price:27.8},{date:"2000-03",price:28.2},
  {date:"2000-04",price:23.1},{date:"2000-05",price:27.6},{date:"2000-06",price:30.4},
  {date:"2000-07",price:27.7},{date:"2000-08",price:29.6},{date:"2000-09",price:34.4},
  {date:"2000-10",price:31.1},{date:"2000-11",price:31.4},{date:"2000-12",price:24.7},
  // 2001
  {date:"2001-01",price:25.0},{date:"2001-06",price:26.2},{date:"2001-12",price:17.5},
  // 2002
  {date:"2002-01",price:19.7},{date:"2002-06",price:24.2},{date:"2002-12",price:28.8},
  // 2003
  {date:"2003-01",price:30.2},{date:"2003-03",price:31.0},{date:"2003-06",price:26.0},
  {date:"2003-12",price:30.0},
  // 2004
  {date:"2004-01",price:31.2},{date:"2004-06",price:35.7},{date:"2004-12",price:39.9},
  // 2005
  {date:"2005-01",price:44.3},{date:"2005-06",price:54.2},{date:"2005-12",price:57.0},
  // 2006
  {date:"2006-01",price:60.7},{date:"2006-06",price:68.8},{date:"2006-12",price:61.8},
  // 2007
  {date:"2007-01",price:53.1},{date:"2007-06",price:71.8},{date:"2007-12",price:91.4},
  // 2008 — CRISIS YEAR (full monthly)
  {date:"2008-01",price:92.2},{date:"2008-02",price:94.8},{date:"2008-03",price:101.6},
  {date:"2008-04",price:108.8},{date:"2008-05",price:122.0},{date:"2008-06",price:132.7},
  {date:"2008-07",price:133.4},{date:"2008-08",price:114.6},{date:"2008-09",price:97.5},
  {date:"2008-10",price:73.4},{date:"2008-11",price:52.5},{date:"2008-12",price:40.1},
  // 2009
  {date:"2009-01",price:43.5},{date:"2009-06",price:68.6},{date:"2009-12",price:74.5},
  // 2010
  {date:"2010-01",price:76.2},{date:"2010-06",price:75.0},{date:"2010-12",price:91.5},
  // 2011
  {date:"2011-01",price:96.0},{date:"2011-04",price:122.0},{date:"2011-12",price:107.2},
  // 2012
  {date:"2012-01",price:110.8},{date:"2012-06",price:92.5},{date:"2012-12",price:109.5},
  // 2013
  {date:"2013-01",price:112.6},{date:"2013-12",price:110.0},
  // 2014 — SHALE GLUT BEGINS
  {date:"2014-01",price:107.2},{date:"2014-06",price:112.0},
  {date:"2014-09",price:95.0},{date:"2014-12",price:60.0},
  // 2015
  {date:"2015-01",price:47.8},{date:"2015-06",price:62.0},{date:"2015-12",price:37.5},
  // 2016 — OPEC PRICE WAR
  {date:"2016-01",price:30.7},{date:"2016-06",price:47.0},{date:"2016-12",price:53.7},
  // 2017
  {date:"2017-01",price:55.4},{date:"2017-12",price:64.4},
  // 2018
  {date:"2018-01",price:68.0},{date:"2018-10",price:81.0},{date:"2018-12",price:57.0},
  // 2019
  {date:"2019-01",price:59.0},{date:"2019-12",price:66.0},
  // 2020 — COVID COLLAPSE
  {date:"2020-01",price:63.8},{date:"2020-03",price:33.0},
  {date:"2020-04",price:18.4},{date:"2020-06",price:40.0},{date:"2020-12",price:51.2},
  // 2021
  {date:"2021-01",price:55.0},{date:"2021-06",price:73.5},{date:"2021-12",price:74.2},
  // 2022 — UKRAINE WAR
  {date:"2022-01",price:83.2},{date:"2022-03",price:116.0},{date:"2022-06",price:122.7},
  {date:"2022-09",price:91.0},{date:"2022-12",price:80.0},
  // 2023
  {date:"2023-01",price:82.7},{date:"2023-06",price:75.0},{date:"2023-12",price:77.8},
  // 2024
  {date:"2024-01",price:77.5},{date:"2024-04",price:91.0},
  {date:"2024-09",price:69.0},{date:"2024-12",price:73.9}
];

// ── DATASET 2: US CPI Inflation Rate (YoY %) ────────────────────────
// Source: BLS / FRED CPIAUCSL — Annual averages with monthly shocks
export const CPI_MONTHLY_YOY = [
  {date:"2000-01",rate:2.7},{date:"2000-06",rate:3.7},{date:"2000-12",rate:3.4},
  {date:"2001-01",rate:3.7},{date:"2001-06",rate:2.9},{date:"2001-12",rate:1.6},
  {date:"2002-01",rate:1.1},{date:"2002-12",rate:2.4},
  {date:"2003-01",rate:2.6},{date:"2003-12",rate:1.9},
  {date:"2004-01",rate:1.9},{date:"2004-12",rate:3.3},
  {date:"2005-01",rate:3.0},{date:"2005-12",rate:3.4},
  {date:"2006-01",rate:4.0},{date:"2006-12",rate:2.5},
  {date:"2007-01",rate:2.1},{date:"2007-12",rate:4.1},
  // 2008 — Full monthly (shock year)
  {date:"2008-01",rate:4.3},{date:"2008-02",rate:4.0},{date:"2008-03",rate:4.0},
  {date:"2008-04",rate:3.9},{date:"2008-05",rate:4.2},{date:"2008-06",rate:5.0},
  {date:"2008-07",rate:5.6},{date:"2008-08",rate:5.4},{date:"2008-09",rate:4.9},
  {date:"2008-10",rate:3.7},{date:"2008-11",rate:1.1},{date:"2008-12",rate:0.1},
  // 2009 — deflation
  {date:"2009-01",rate:0.0},{date:"2009-04",rate:-0.7},{date:"2009-07",rate:-2.1},
  {date:"2009-12",rate:2.7},
  {date:"2010-01",rate:2.6},{date:"2010-12",rate:1.5},
  {date:"2011-01",rate:1.6},{date:"2011-09",rate:3.9},{date:"2011-12",rate:3.0},
  {date:"2012-01",rate:2.9},{date:"2012-12",rate:1.7},
  {date:"2013-01",rate:1.6},{date:"2013-12",rate:1.5},
  {date:"2014-01",rate:1.6},{date:"2014-12",rate:0.8},
  {date:"2015-01",rate:-0.1},{date:"2015-12",rate:0.7},
  {date:"2016-01",rate:1.4},{date:"2016-12",rate:2.1},
  {date:"2017-01",rate:2.5},{date:"2017-12",rate:2.1},
  {date:"2018-01",rate:2.1},{date:"2018-07",rate:2.9},{date:"2018-12",rate:1.9},
  {date:"2019-01",rate:1.6},{date:"2019-12",rate:2.3},
  {date:"2020-01",rate:2.5},{date:"2020-04",rate:0.3},{date:"2020-12",rate:1.4},
  // 2021 — inflation surge
  {date:"2021-01",rate:1.4},{date:"2021-06",rate:5.4},
  {date:"2021-09",rate:5.4},{date:"2021-12",rate:7.0},
  // 2022 — 40-year peak
  {date:"2022-01",rate:7.5},{date:"2022-03",rate:8.5},
  {date:"2022-06",rate:9.1},{date:"2022-09",rate:8.2},{date:"2022-12",rate:6.5},
  // 2023
  {date:"2023-01",rate:6.4},{date:"2023-06",rate:3.0},{date:"2023-12",rate:3.4},
  // 2024
  {date:"2024-01",rate:3.1},{date:"2024-06",rate:3.0},{date:"2024-12",rate:2.9}
];

// Shock events for annotation
export const CPI_SHOCKS = [
  {date:"2008-07", rate:5.6, label:"Oil price pass-through peak"},
  {date:"2009-07", rate:-2.1, label:"Post-GFC deflation floor"},
  {date:"2022-06", rate:9.1, label:"40-year inflation high"},
  {date:"2020-04", rate:0.3, label:"COVID demand collapse"}
];

// ── DATASET 3: Gold Price (USD/oz) & DXY Index ─────────
// Source: LBMA / ICE / World Gold Council + Fed DXY
export const GOLD_DXY_MONTHLY = [
  {date:"2005-01",gold:427,dxy:83},{date:"2005-06",gold:430,dxy:88},
  {date:"2005-12",gold:513,dxy:90},
  {date:"2006-01",gold:550,dxy:89},{date:"2006-06",gold:596,dxy:85},
  {date:"2006-12",gold:636,dxy:83},
  {date:"2007-01",gold:630,dxy:85},{date:"2007-06",gold:655,dxy:82},
  {date:"2007-12",gold:836,dxy:76},
  // 2008 — Crisis: inverse coherence strong
  {date:"2008-01",gold:924,dxy:76},{date:"2008-03",gold:1003,dxy:73},
  {date:"2008-06",gold:896,dxy:72},{date:"2008-09",gold:745,dxy:79},
  {date:"2008-10",gold:806,dxy:83},{date:"2008-12",gold:869,dxy:82},
  // 2009
  {date:"2009-01",gold:858,dxy:85},{date:"2009-06",gold:944,dxy:80},
  {date:"2009-12",gold:1107,dxy:78},
  // 2010
  {date:"2010-01",gold:1118,dxy:79},{date:"2010-06",gold:1233,dxy:84},
  {date:"2010-12",gold:1421,dxy:80},
  // 2011 — Gold ATH at time
  {date:"2011-01",gold:1356,dxy:79},{date:"2011-09",gold:1771,dxy:76},
  {date:"2011-12",gold:1566,dxy:80},
  // 2012-2014: Gold decline, DXY rising
  {date:"2012-12",gold:1657,dxy:80},{date:"2013-12",gold:1202,dxy:80},
  {date:"2014-12",gold:1184,dxy:90},
  // 2015-2018
  {date:"2015-12",gold:1062,dxy:98},{date:"2016-12",gold:1152,dxy:103},
  {date:"2017-12",gold:1291,dxy:93},{date:"2018-12",gold:1282,dxy:97},
  // 2019-2020
  {date:"2019-01",gold:1290,dxy:96},{date:"2019-09",gold:1514,dxy:99},
  {date:"2019-12",gold:1520,dxy:97},
  // 2020 — COVID: Gold to ATH $2075, DXY volatile
  {date:"2020-01",gold:1590,dxy:99},{date:"2020-03",gold:1591,dxy:103},
  {date:"2020-08",gold:2067,dxy:93},{date:"2020-12",gold:1887,dxy:90},
  // 2021
  {date:"2021-01",gold:1847,dxy:90},{date:"2021-06",gold:1763,dxy:92},
  {date:"2021-12",gold:1829,dxy:96},
  // 2022 — Ukraine war: UNUSUAL positive correlation
  {date:"2022-01",gold:1796,dxy:97},{date:"2022-03",gold:1947,dxy:99},
  {date:"2022-06",gold:1840,dxy:105},{date:"2022-09",gold:1659,dxy:113},
  {date:"2022-12",gold:1824,dxy:104},
  // 2023 — both rise together (central bank buying)
  {date:"2023-01",gold:1930,dxy:102},{date:"2023-06",gold:1912,dxy:103},
  {date:"2023-12",gold:2063,dxy:101},
  // 2024 — Gold record highs + DXY stable
  {date:"2024-01",gold:2029,dxy:103},{date:"2024-04",gold:2340,dxy:106},
  {date:"2024-10",gold:2650,dxy:104},{date:"2024-12",gold:2625,dxy:108}
];

// ── DATASET 4: Bitcoin Price (USD) Monthly ───────────────────────────
// Source: CoinMarketCap / CoinLore historical
export const BITCOIN_MONTHLY = [
  {date:"2017-01",price:963},{date:"2017-02",price:1190},
  {date:"2017-03",price:1065},{date:"2017-04",price:1347},
  {date:"2017-05",price:2247},{date:"2017-06",price:2607},
  {date:"2017-07",price:2867},{date:"2017-08",price:4400},
  {date:"2017-09",price:4358},{date:"2017-10",price:6155},
  {date:"2017-11",price:9888},{date:"2017-12",price:14156},
  // 2018 — crash year
  {date:"2018-01",price:10100},{date:"2018-02",price:9100},
  {date:"2018-03",price:7000},{date:"2018-06",price:7500},
  {date:"2018-09",price:6600},{date:"2018-12",price:3350},
  // 2019
  {date:"2019-01",price:3500},{date:"2019-06",price:12700},
  {date:"2019-12",price:7200},
  // 2020
  {date:"2020-01",price:9350},{date:"2020-03",price:5900},
  {date:"2020-06",price:9100},{date:"2020-12",price:29300},
  // 2021 — boom
  {date:"2021-01",price:33000},{date:"2021-02",price:46200},
  {date:"2021-04",price:57800},{date:"2021-05",price:37400},
  {date:"2021-07",price:32300},{date:"2021-10",price:60900},
  {date:"2021-11",price:64400},{date:"2021-12",price:46300},
  // 2022 — bear market + FTX collapse
  {date:"2022-01",price:38100},{date:"2022-03",price:45500},
  {date:"2022-06",price:20000},{date:"2022-09",price:19500},
  {date:"2022-11",price:16800},{date:"2022-12",price:16600},
  // 2023
  {date:"2023-01",price:23100},{date:"2023-06",price:30500},
  {date:"2023-12",price:42000},
  // 2024
  {date:"2024-01",price:43000},{date:"2024-03",price:70000},
  {date:"2024-06",price:62000},{date:"2024-12",price:95000}
];

// ── DATASET 5: US GDP Quarterly (chained 2017 billions USD) ──────────
// Source: BEA (Bureau of Economic Analysis)
export const GDP_QUARTERLY = [
  {q:"2006-Q1",v:17000},{q:"2006-Q2",v:17200},{q:"2006-Q3",v:17350},{q:"2006-Q4",v:17420},
  {q:"2007-Q1",v:17600},{q:"2007-Q2",v:17780},{q:"2007-Q3",v:17900},{q:"2007-Q4",v:17920},
  // 2008 — recession begins Q4 2007, official
  {q:"2008-Q1",v:17800},{q:"2008-Q2",v:17760},{q:"2008-Q3",v:17650},
  {q:"2008-Q4",v:17200},
  // 2009 — trough
  {q:"2009-Q1",v:16900},{q:"2009-Q2",v:16700},{q:"2009-Q3",v:16850},
  {q:"2009-Q4",v:17050},
  // 2010–2019: steady growth
  {q:"2010-Q1",v:17200},{q:"2010-Q4",v:17600},
  {q:"2011-Q4",v:18100},{q:"2012-Q4",v:18500},
  {q:"2013-Q4",v:18900},{q:"2014-Q4",v:19400},
  {q:"2015-Q4",v:19800},{q:"2016-Q4",v:20200},
  {q:"2017-Q4",v:20660},{q:"2018-Q4",v:21200},
  {q:"2019-Q4",v:21700},
  // 2020 — COVID shock
  {q:"2020-Q1",v:21100},{q:"2020-Q2",v:19000},
  {q:"2020-Q3",v:21200},{q:"2020-Q4",v:21700},
  // 2021–2023: recovery
  {q:"2021-Q1",v:22100},{q:"2021-Q4",v:23400},
  {q:"2022-Q4",v:24200},{q:"2023-Q4",v:25200},
  {q:"2024-Q3",v:25900}
];

// ══════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ══════════════════════════════════════════════════════════════════════

// Linear interpolation to create dense time series
export function interpolateSeries(data: any[], targetLength: number, valueKey: string) {
  if (data.length === 0) return [];
  
  const result = [];
  const step = (data.length - 1) / (targetLength - 1);
  
  for (let i = 0; i < targetLength; i++) {
    const index = i * step;
    const lowerIndex = Math.floor(index);
    const upperIndex = Math.ceil(index);
    const fraction = index - lowerIndex;
    
    if (lowerIndex === upperIndex) {
      result.push({...data[lowerIndex]});
    } else {
      const lowerValue = data[lowerIndex][valueKey];
      const upperValue = data[upperIndex][valueKey];
      const interpolatedValue = lowerValue + (upperValue - lowerValue) * fraction;
      result.push({
        ...data[lowerIndex],
        [valueKey]: interpolatedValue
      });
    }
  }
  
  return result;
}

// Extract values array from dataset
export function extractValues(data: any[], key: string): number[] {
  return data.map(d => d[key]);
}

// Normalize data to 0-1 range
export function normalize(data: number[]): number[] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  return data.map(v => (v - min) / range);
}
