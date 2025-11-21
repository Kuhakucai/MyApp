// 分类的多语言翻译
const categoriesTranslations = {
  1: {
    name: {
      'zh-CN': '热门款式',
      'en-US': 'Hot Items',
      'id-ID': 'Populer'
    }
  },
  2: {
    name: {
      'zh-CN': '经典美甲',
      'en-US': 'Classic',
      'id-ID': 'Klasik'
    }
  },
  3: {
    name: {
      'zh-CN': '法式美甲',
      'en-US': 'French',
      'id-ID': 'Prancis'
    }
  },
  4: {
    name: {
      'zh-CN': '创意彩绘',
      'en-US': 'Creative',
      'id-ID': 'Kreatif'
    }
  },
  5: {
    name: {
      'zh-CN': '护理套餐',
      'en-US': 'Care',
      'id-ID': 'Perawatan'
    }
  }
}

// 商品数据的多语言翻译
const productsTranslations = {
  // 热门款式
  1: {
    name: {
      'zh-CN': '星空渐变美甲',
      'en-US': 'Starry Gradient Nails',
      'id-ID': 'Nail Art Gradien Bintang'
    },
    desc: {
      'zh-CN': '梦幻星空渐变效果，深蓝到紫色过渡，搭配闪粉点缀，宛如璀璨星河。适合晚宴派对，持久度高',
      'en-US': 'Dreamy starry gradient from deep blue to purple with glitter. Perfect for parties, long-lasting',
      'id-ID': 'Efek gradien bintang dari biru tua ke ungu dengan glitter. Sempurna untuk pesta, tahan lama'
    }
  },
  2: {
    name: {
      'zh-CN': '樱花粉嫩美甲',
      'en-US': 'Cherry Blossom Pink Nails',
      'id-ID': 'Nail Art Pink Sakura'
    },
    desc: {
      'zh-CN': '温柔粉色系，清新甜美。选用高级粉色甲油，搭配樱花图案手绘，展现少女气质，日常百搭',
      'en-US': 'Soft pink with hand-painted cherry blossoms. Fresh and sweet, perfect for daily wear',
      'id-ID': 'Pink lembut dengan lukisan bunga sakura. Segar dan manis, sempurna untuk sehari-hari'
    }
  },
  3: {
    name: {
      'zh-CN': '镜面光疗美甲',
      'en-US': 'Mirror Chrome Gel Nails',
      'id-ID': 'Nail Art Gel Krom Cermin'
    },
    desc: {
      'zh-CN': '镜面反光效果，时尚高级。使用进口镜面粉打造，呈现金属质感，彰显个性，持久不褪色',
      'en-US': 'Mirror reflection effect with metallic texture. Fashionable and premium, long-lasting',
      'id-ID': 'Efek refleksi cermin dengan tekstur metalik. Modis dan premium, tahan lama'
    }
  },
  4: {
    name: {
      'zh-CN': '纯色甲油美甲',
      'en-US': 'Solid Color Polish',
      'id-ID': 'Cat Kuku Warna Solid'
    },
    desc: {
      'zh-CN': '经典纯色，简约大方。多种颜色可选，适合职场日常，快速上手易打理，性价比之选',
      'en-US': 'Classic solid colors. Multiple colors available, perfect for office and daily wear',
      'id-ID': 'Warna solid klasik. Berbagai warna tersedia, sempurna untuk kantor dan sehari-hari'
    }
  },
  5: {
    name: {
      'zh-CN': '豆沙色美甲',
      'en-US': 'Mauve Nude Nails',
      'id-ID': 'Nail Art Mauve'
    },
    desc: {
      'zh-CN': '温柔豆沙色，显白百搭。经典的豆沙色调，适合任何肤色，温柔知性，职场首选',
      'en-US': 'Gentle mauve color, brightens skin tone. Classic choice for office wear',
      'id-ID': 'Warna mauve lembut, mencerahkan kulit. Pilihan klasik untuk kantor'
    }
  },
  6: {
    name: {
      'zh-CN': '裸色光疗美甲',
      'en-US': 'Nude Gel Nails',
      'id-ID': 'Nail Art Gel Nude'
    },
    desc: {
      'zh-CN': '自然裸色，优雅知性。采用光疗技术，自然裸色调，提亮肤色，适合面试约会，持久3-4周',
      'en-US': 'Natural nude color with gel technology. Elegant, lasts 3-4 weeks',
      'id-ID': 'Warna nude alami dengan teknologi gel. Elegan, tahan 3-4 minggu'
    }
  },
  7: {
    name: {
      'zh-CN': '红色经典美甲',
      'en-US': 'Classic Red Nails',
      'id-ID': 'Nail Art Merah Klasik'
    },
    desc: {
      'zh-CN': '正红色系，气场十足。经典大红色，显手白，提升气质，适合重要场合和节日',
      'en-US': 'Classic red color, brightens hands. Perfect for special occasions and holidays',
      'id-ID': 'Warna merah klasik, mencerahkan tangan. Sempurna untuk acara khusus dan hari libur'
    }
  },
  8: {
    name: {
      'zh-CN': '经典法式美甲',
      'en-US': 'Classic French Manicure',
      'id-ID': 'Manikur Prancis Klasik'
    },
    desc: {
      'zh-CN': '白色甲尖，优雅法式。永不过时的法式风格，白色甲尖配裸色甲床，修长手指，适合婚礼商务',
      'en-US': 'White tips with nude base. Timeless elegance, perfect for weddings and business',
      'id-ID': 'Ujung putih dengan dasar nude. Elegan abadi, sempurna untuk pernikahan dan bisnis'
    }
  },
  9: {
    name: {
      'zh-CN': '反法式美甲',
      'en-US': 'Reverse French Manicure',
      'id-ID': 'Manikur Prancis Terbalik'
    },
    desc: {
      'zh-CN': '创意反法式，时尚个性。颠覆传统法式，甲根位置装饰，年轻时尚，彰显个性态度',
      'en-US': 'Creative reverse French style. Modern and fashionable, shows personality',
      'id-ID': 'Gaya Prancis terbalik kreatif. Modern dan modis, menunjukkan kepribadian'
    }
  },
  10: {
    name: {
      'zh-CN': '彩色法式美甲',
      'en-US': 'Colorful French Nails',
      'id-ID': 'Nail Art Prancis Berwarna'
    },
    desc: {
      'zh-CN': '彩色甲尖，活泼俏皮。传统法式加入彩色元素，多彩甲尖设计，青春活力，夏日必选',
      'en-US': 'Colorful tips with French style. Youthful and energetic, perfect for summer',
      'id-ID': 'Ujung berwarna dengan gaya Prancis. Muda dan energik, sempurna untuk musim panas'
    }
  },
  11: {
    name: {
      'zh-CN': '金银线法式',
      'en-US': 'Gold/Silver Line French',
      'id-ID': 'Nail Art Prancis Garis Emas/Perak'
    },
    desc: {
      'zh-CN': '金银线条装饰，精致奢华。细致的金银线勾勒，搭配法式甲型，轻奢质感，派对吸睛',
      'en-US': 'Gold/silver line decoration. Luxurious texture, perfect for parties',
      'id-ID': 'Dekorasi garis emas/perak. Tekstur mewah, sempurna untuk pesta'
    }
  },
  12: {
    name: {
      'zh-CN': '手绘花朵美甲',
      'en-US': 'Hand-Painted Floral Nails',
      'id-ID': 'Nail Art Bunga Lukis Tangan'
    },
    desc: {
      'zh-CN': '精致手绘花朵，清新自然。资深美甲师手绘，玫瑰/樱花/雏菊可选，每一笔都是艺术，独一无二',
      'en-US': 'Delicate hand-painted flowers. Rose/Cherry blossom/Daisy available, unique artwork',
      'id-ID': 'Bunga lukis tangan yang halus. Mawar/Sakura/Daisy tersedia, karya seni unik'
    }
  },
  13: {
    name: {
      'zh-CN': '卡通图案美甲',
      'en-US': 'Cartoon Pattern Nails',
      'id-ID': 'Nail Art Pola Kartun'
    },
    desc: {
      'zh-CN': '可爱卡通彩绘，减龄少女。迪士尼/史努比/龙猫等IP图案，少女心爆棚，萌系首选',
      'en-US': 'Cute cartoon designs. Disney/Snoopy/Totoro IP patterns, adorable and youthful',
      'id-ID': 'Desain kartun lucu. Pola IP Disney/Snoopy/Totoro, menggemaskan dan muda'
    }
  },
  14: {
    name: {
      'zh-CN': '晕染水墨美甲',
      'en-US': 'Ink Wash Art Nails',
      'id-ID': 'Nail Art Lukisan Tinta'
    },
    desc: {
      'zh-CN': '水墨晕染效果，艺术气息。中国风水墨渲染，层次分明，如同泼墨山水，文艺范十足',
      'en-US': 'Chinese ink wash effect. Artistic style with layered colors',
      'id-ID': 'Efek lukisan tinta Tiongkok. Gaya artistik dengan warna berlapis'
    }
  },
  15: {
    name: {
      'zh-CN': '宝石钻饰美甲',
      'en-US': 'Gemstone & Crystal Nails',
      'id-ID': 'Nail Art Permata & Kristal'
    },
    desc: {
      'zh-CN': '水钻装饰，闪耀华丽。施华洛世奇水钻点缀，3D立体设计，璀璨夺目，晚宴婚礼必备',
      'en-US': 'Swarovski crystal decoration. 3D design, dazzling and glamorous for weddings',
      'id-ID': 'Dekorasi kristal Swarovski. Desain 3D, mempesona dan glamor untuk pernikahan'
    }
  },
  16: {
    name: {
      'zh-CN': '基础护理套餐',
      'en-US': 'Basic Care Package',
      'id-ID': 'Paket Perawatan Dasar'
    },
    desc: {
      'zh-CN': '修型+去死皮+保养。包含指甲修型、死皮软化去除、指缘滋养，适合日常维护，保持指甲健康',
      'en-US': 'Shaping + Cuticle removal + Moisturizing. Daily maintenance for healthy nails',
      'id-ID': 'Pembentukan + Pengangkatan kutikula + Pelembab. Perawatan harian untuk kuku sehat'
    }
  },
  17: {
    name: {
      'zh-CN': '深度护理套餐',
      'en-US': 'Deep Care Package',
      'id-ID': 'Paket Perawatan Mendalam'
    },
    desc: {
      'zh-CN': '深层滋养，修复受损指甲。针对受损脆弱指甲，使用进口营养液深层修护，强韧指甲，恢复健康',
      'en-US': 'Deep nourishment for damaged nails. Imported treatment, strengthen and restore health',
      'id-ID': 'Nutrisi mendalam untuk kuku rusak. Perawatan impor, memperkuat dan mengembalikan kesehatan'
    }
  },
  18: {
    name: {
      'zh-CN': '手部SPA护理',
      'en-US': 'Hand SPA Treatment',
      'id-ID': 'Perawatan SPA Tangan'
    },
    desc: {
      'zh-CN': '手部按摩+精油护理，舒缓放松。包含手部去角质、精油按摩、手膜护理，嫩白双手，放松身心',
      'en-US': 'Hand massage + Essential oil treatment. Exfoliation, massage, mask for soft hands',
      'id-ID': 'Pijat tangan + Perawatan minyak esensial. Eksfoliasi, pijat, masker untuk tangan lembut'
    }
  },
  19: {
    name: {
      'zh-CN': '至尊养护套餐',
      'en-US': 'Premium Care Package',
      'id-ID': 'Paket Perawatan Premium'
    },
    desc: {
      'zh-CN': '全套深度护理+光疗美甲，奢华享受。包含手部SPA、深度护理、光疗美甲，一站式服务，完美蜕变',
      'en-US': 'Full treatment + Gel nails. Includes hand SPA, deep care, gel manicure - luxury service',
      'id-ID': 'Perawatan lengkap + Gel nails. Termasuk SPA tangan, perawatan mendalam, manikur gel - layanan mewah'
    }
  }
}

module.exports = {
  categoriesTranslations,
  productsTranslations
}
