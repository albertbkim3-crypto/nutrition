/* ============================================================
   Shared recipe data — used by index.html and recipes.html
   for Recipe of the Week feature.
   ============================================================ */

window.RECIPES = [
  {
    id: 'r1',
    category: 'korean',
    emoji: '🥣',
    nameEn: 'Miyeokguk (Seaweed Soup)',
    nameKo: '미역국',
    subEn:  'Miyeokguk · Seaweed Soup',
    subKo:  '미역국',
    descEn: 'A light, mineral-rich soup made with dried seaweed. Traditionally eaten on birthdays and after childbirth — high in calcium and iodine, very low in calories.',
    descKo: '마른 미역으로 만든 가볍고 미네랄이 풍부한 국입니다. 생일과 산후에 먹는 전통 음식으로, 칼슘과 요오드가 풍부하고 칼로리가 매우 낮아요.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '45 kcal'  },
      { en: 'Protein', ko: '단백질',   val: '3 g'      },
      { en: 'Sodium',  ko: '나트륨',   val: '260 mg'   },
      { en: 'Calcium', ko: '칼슘',     val: '110 mg'   },
    ]
  },
  {
    id: 'r2',
    category: 'korean',
    emoji: '🍚',
    nameEn: 'Bibimbap (Mixed Rice Bowl)',
    nameKo: '비빔밥',
    subEn:  'Bibimbap · Mixed Rice Bowl',
    subKo:  '비빔밥',
    descEn: 'A colorful bowl of rice topped with seasoned vegetables, a soft egg, and a touch of gochujang. High in fiber, vitamins, and protein.',
    descKo: '밥 위에 나물, 달걀, 고추장을 얹은 영양 만점 한그릇 요리입니다. 식이섬유, 비타민, 단백질이 풍부해요.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '450 kcal' },
      { en: 'Protein', ko: '단백질',   val: '18 g'     },
      { en: 'Sodium',  ko: '나트륨',   val: '380 mg'   },
      { en: 'Fiber',   ko: '식이섬유', val: '6 g'      },
    ]
  },
  {
    id: 'r3',
    category: 'korean',
    emoji: '🍵',
    nameEn: 'Samgyetang (Ginseng Chicken Soup)',
    nameKo: '삼계탕',
    subEn:  'Samgyetang · Ginseng Chicken Soup',
    subKo:  '삼계탕',
    descEn: 'A nourishing whole-chicken soup stuffed with glutinous rice, garlic, ginseng, and jujubes. High in protein and collagen — a traditional Korean health food.',
    descKo: '찹쌀, 마늘, 인삼, 대추를 넣은 보양 닭 요리입니다. 단백질과 콜라겐이 풍부한 전통 보양식입니다.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '380 kcal' },
      { en: 'Protein', ko: '단백질',   val: '35 g'     },
      { en: 'Sodium',  ko: '나트륨',   val: '185 mg'   },
      { en: 'Carbs',   ko: '탄수화물', val: '28 g'     },
    ]
  },
  {
    id: 'r4',
    category: 'korean',
    emoji: '🍜',
    nameEn: 'Japchae (Glass Noodle Stir-Fry)',
    nameKo: '잡채',
    subEn:  'Japchae · Glass Noodle Stir-Fry',
    subKo:  '잡채',
    descEn: 'Glass noodles stir-fried with colorful vegetables and a savory-sweet sesame soy sauce. Naturally gluten-free and low in fat.',
    descKo: '당면과 다채로운 채소를 달콤짭짤한 참깨 간장 소스에 볶은 요리입니다. 글루텐 프리에 지방이 낮아요.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '210 kcal' },
      { en: 'Protein', ko: '단백질',   val: '6 g'      },
      { en: 'Sodium',  ko: '나트륨',   val: '390 mg'   },
      { en: 'Fat',     ko: '지방',     val: '5 g'      },
    ]
  },
  {
    id: 'r5',
    category: 'american',
    emoji: '🐟',
    nameEn: 'Grilled Salmon with Roasted Vegetables',
    nameKo: '연어 구이와 구운 채소',
    subEn:  '연어 구이',
    subKo:  'Grilled Salmon',
    descEn: 'Oven-baked salmon fillet with broccoli and bell peppers. Naturally rich in heart-healthy omega-3 fatty acids and protein.',
    descKo: '브로콜리와 피망을 곁들인 오븐 구이 연어 필레입니다. 심장 건강에 좋은 오메가-3 지방산과 단백질이 풍부해요.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '370 kcal' },
      { en: 'Protein', ko: '단백질',   val: '34 g'     },
      { en: 'Sodium',  ko: '나트륨',   val: '210 mg'   },
      { en: 'Omega-3', ko: '오메가-3', val: '★★★'     },
    ]
  },
  {
    id: 'r6',
    category: 'american',
    emoji: '🫐',
    nameEn: 'Berry Oatmeal Bowl',
    nameKo: '베리 오트밀 볼',
    subEn:  'Berry Oatmeal',
    subKo:  '베리 오트밀',
    descEn: 'Warm rolled oats topped with fresh berries, walnuts, and a drizzle of honey. High in soluble fiber — great for cholesterol and blood sugar control.',
    descKo: '신선한 베리, 호두, 꿀을 올린 따뜻한 오트밀입니다. 수용성 식이섬유가 풍부해 콜레스테롤과 혈당 조절에 좋아요.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '280 kcal' },
      { en: 'Protein', ko: '단백질',   val: '8 g'      },
      { en: 'Sodium',  ko: '나트륨',   val: '85 mg'    },
      { en: 'Fiber',   ko: '식이섬유', val: '7 g'      },
    ]
  },
  {
    id: 'r7',
    category: 'american',
    emoji: '🍲',
    nameEn: 'Chicken Vegetable Soup',
    nameKo: '닭고기 채소 수프',
    subEn:  'Chicken Vegetable Soup',
    subKo:  '닭고기 채소 수프',
    descEn: 'A classic, comforting soup with tender chicken, carrots, celery, and herbs. Easy to digest — ideal for seniors, especially after illness.',
    descKo: '부드러운 닭고기, 당근, 셀러리와 허브로 만든 따뜻한 수프입니다. 소화가 잘 되어 어르신, 특히 병후에 좋습니다.',
    nutrition: [
      { en: 'Cal',     ko: '칼로리',   val: '215 kcal' },
      { en: 'Protein', ko: '단백질',   val: '22 g'     },
      { en: 'Sodium',  ko: '나트륨',   val: '340 mg'   },
      { en: 'Fiber',   ko: '식이섬유', val: '4 g'      },
    ]
  },
];

/* ── ISO week number ─────────────────────────────────────── */
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/* ── Pick featured + past recipes ────────────────────────── */
function getROTW() {
  const week = getISOWeek(new Date());
  const n    = RECIPES.length;
  const featuredIdx = week % n;
  const past = [];
  for (let i = 1; i <= 5; i++) {
    const idx = ((week - i) % n + n) % n;
    past.push({ recipe: RECIPES[idx], weeksAgo: i });
  }
  return { featured: RECIPES[featuredIdx], past, weekNum: week };
}

/* ── Build nutrition pills HTML ──────────────────────────── */
function buildPills(nutrition, lang) {
  return nutrition.map(p => `
    <div class="nutr-pill">
      <span class="label">
        <span data-en="${p.en}" data-ko="${p.ko}">${lang === 'en' ? p.en : p.ko}</span>
      </span> ${p.val}
    </div>`).join('');
}

/* ── Featured card HTML ──────────────────────────────────── */
function buildFeaturedCard(recipe, lang, linkHref) {
  const name = lang === 'en' ? recipe.nameEn : recipe.nameKo;
  const sub  = lang === 'en' ? recipe.subEn  : recipe.subKo;
  const desc = lang === 'en' ? recipe.descEn : recipe.descKo;

  return `
    <div class="rotw-featured" role="article">
      <div class="rotw-badge">
        <span data-en="✨ Recipe of the Week" data-ko="✨ 이주의 레시피">${lang === 'en' ? '✨ Recipe of the Week' : '✨ 이주의 레시피'}</span>
      </div>
      <div class="rotw-body">
        <div class="rotw-visual" aria-hidden="true">
          <div class="rotw-emoji">${recipe.emoji}</div>
        </div>
        <div class="rotw-content">
          <h3 class="rotw-name">
            <span data-en="${recipe.nameEn}" data-ko="${recipe.nameKo}">${name}</span>
          </h3>
          <div class="rotw-sub">
            <span data-en="${recipe.subEn}" data-ko="${recipe.subKo}">${sub}</span>
          </div>
          <p class="rotw-desc">
            <span data-en="${recipe.descEn}" data-ko="${recipe.descKo}">${desc}</span>
          </p>
          <div class="nutrition-row" style="margin-bottom:18px;">
            ${buildPills(recipe.nutrition, lang)}
          </div>
          <a href="${linkHref}" class="btn" style="display:inline-flex;">
            <span data-en="View Full Recipe →" data-ko="전체 레시피 보기 →">${lang === 'en' ? 'View Full Recipe →' : '전체 레시피 보기 →'}</span>
          </a>
        </div>
      </div>
    </div>`;
}

/* ── Past recipes row HTML ───────────────────────────────── */
function buildPastRow(past, lang, linkFn) {
  const weeksAgoEn = ['', '1 week ago','2 weeks ago','3 weeks ago','4 weeks ago','5 weeks ago'];
  const weeksAgoKo = ['', '1주 전','2주 전','3주 전','4주 전','5주 전'];

  const cards = past.map(({ recipe, weeksAgo }) => `
    <a href="${linkFn(recipe)}" class="past-card" aria-label="${lang === 'en' ? recipe.nameEn : recipe.nameKo}">
      <div class="past-card-emoji" aria-hidden="true">${recipe.emoji}</div>
      <div class="past-card-name">
        <span data-en="${recipe.nameEn}" data-ko="${recipe.nameKo}">${lang === 'en' ? recipe.nameEn : recipe.nameKo}</span>
      </div>
      <div class="past-card-week">
        <span data-en="${weeksAgoEn[weeksAgo]}" data-ko="${weeksAgoKo[weeksAgo]}">${lang === 'en' ? weeksAgoEn[weeksAgo] : weeksAgoKo[weeksAgo]}</span>
      </div>
    </a>`).join('');

  return `
    <div class="rotw-past-header">
      <p class="section-label" style="margin:0;">
        <span data-en="PAST FEATURED RECIPES" data-ko="지난 추천 레시피">${lang === 'en' ? 'PAST FEATURED RECIPES' : '지난 추천 레시피'}</span>
      </p>
      <div class="rotw-past-line"></div>
    </div>
    <div class="past-recipes-row" role="list">${cards}</div>`;
}
