export const PLATFORM_IDS = {
  ASACOMI: "asacomi",
  BIG_COMICS: "bigcomics",
  CHAMPION_CROSS: "championcross",
  COMIC_ACTION: "comicaction",
  COMIC_BORDER: "comicborder",
  COMIC_DAYS: "comicdays",
  COMIC_FUZ: "comicfuz",
  COMIC_GARDO: "comicgardo",
  COMIC_GROWL: "comicgrowl",
  COMIC_MEDU: "comicmedu",
  COMIC_PASH: "comicpash",
  COMIC_RIDE: "comicride",
  COMIC_ROOM_BASE: "comicroombase",
  COMIC_RUELLE: "comicruelle",
  COMIC_TRAIL: "comictrail",
  COMIC_YOURS: "comicyours",
  COMIC_ZENON: "comiczenon",
  COROCORO: "corocoro",
  DQN_SAGA: "dqnsaga",
  EARTH_STAR: "earthstar",
  FEEL_WEB: "feelweb",
  GANGANONLINE: "ganganonline",
  GORAKU_WEB: "gorakuweb",
  HAYACOMI: "hayacomic",
  HEROS_WEB: "herosweb",
  ICHICOMI: "ichicomi",
  KADOCOMI: "kadocomi",
  KIMICOMI: "kimicomi",
  KURAGE_BUNCH: "kuragebunch",
  MAGAPOKE: "magapoke",
  MAGCOMI: "magcomi",
  MAGKAN: "magkan",
  MANGALT: "mangalt",
  MANGAZ: "mangaz",
  MANGANO: "mangano",
  MANGA_BANG: "mangabang",
  MANGA_ONE: "mangaone",
  MANGA_SPA: "mangaspa",
  MANGA_ZEGRA: "mangazegra",
  NICONICO_MANGA: "niconicomanga",
  OGYAAA: "ogyaaa",
  ONEPUNCHMAN: "onepunchman",
  OHTA_WEB: "ohtaweb",
  OMOCORO: "omocoro",
  OUR_FEEL: "ourfeel",
  PIXIV: "pixiv",
  RIMACOMI: "rimacomi",
  ROOKIE: "rookie",
  SEASONS: "seasons",
  SHONEN_JUMP_PLUS: "shonenjumpplus",
  SHURO: "shuro",
  SUNDAY_WEBRY: "sundaywebry",
  TAKE_COMIC: "takecomic",
  TAIKAISYU: "taikaisyu",
  TONARINO_YJ: "tonarinoyj",
  TORCH: "torch",
  YANMAGA: "yanmaga",
  YNJN: "ynjn",
  YOUNG_ANIMAL: "younganimal",
  YOUNG_CHAMPION: "youngchampion",
} as const;

export type PlatformId = (typeof PLATFORM_IDS)[keyof typeof PLATFORM_IDS];

export interface PlatformConfig {
  name: string;
  url: string;
  domain: string;
  episodePattern?: RegExp;
  category?: "個人サイト";
  description?: string;
  imageUrl?: string;
  author?: string;
}

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  // 集英社
  [PLATFORM_IDS.SHONEN_JUMP_PLUS]: {
    domain: "shonenjumpplus.com",
    episodePattern: /\/episode\/\d+/,
    name: "少年ジャンプ＋",
    url: "https://shonenjumpplus.com",
  },
  [PLATFORM_IDS.TONARINO_YJ]: {
    domain: "tonarinoyj.jp",
    episodePattern: /\/episode\/\d+/,
    name: "となりのヤングジャンプ",
    url: "https://tonarinoyj.jp",
  },
  [PLATFORM_IDS.YNJN]: {
    domain: "ynjn.jp",
    episodePattern: /\/(title|viewer)\//,
    name: "ヤンジャン+",
    url: "https://ynjn.jp",
  },
  [PLATFORM_IDS.ROOKIE]: {
    domain: "rookie.shonenjump.com",
    episodePattern: /\/(series|episodes)\//,
    name: "ジャンプルーキー！",
    url: "https://rookie.shonenjump.com",
  },

  // 講談社
  [PLATFORM_IDS.COMIC_DAYS]: {
    domain: "comic-days.com",
    episodePattern: /\/episode\/\d+/,
    name: "コミックDAYS",
    url: "https://comic-days.com",
  },
  [PLATFORM_IDS.MAGAPOKE]: {
    domain: "pocket.shonenmagazine.com",
    episodePattern: /\/episode\/\d+/,
    name: "マガポケ",
    url: "https://pocket.shonenmagazine.com",
  },
  [PLATFORM_IDS.YANMAGA]: {
    domain: "yanmaga.jp",
    episodePattern: /\/comics\/[^/]+/,
    name: "ヤンマガWeb",
    url: "https://yanmaga.jp",
  },

  // 小学館
  [PLATFORM_IDS.SUNDAY_WEBRY]: {
    domain: "www.sunday-webry.com",
    episodePattern: /\/episode\/\d+/,
    name: "サンデーうぇぶり",
    url: "https://www.sunday-webry.com",
  },
  [PLATFORM_IDS.MANGA_ONE]: {
    domain: "manga-one.com",
    episodePattern: /\/manga\/\d+\/chapter\/\d+/,
    name: "マンガワン",
    url: "https://manga-one.com",
  },
  [PLATFORM_IDS.BIG_COMICS]: {
    domain: "bigcomics.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "ビッグコミック",
    url: "https://bigcomics.jp",
  },
  [PLATFORM_IDS.COROCORO]: {
    domain: "www.corocoro.jp",
    episodePattern: /\/(title|chapter)\/\d+/,
    name: "週刊コロコロコミック",
    url: "https://www.corocoro.jp",
  },

  // 秋田書店
  [PLATFORM_IDS.CHAMPION_CROSS]: {
    domain: "championcross.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "チャンピオンクロス",
    url: "https://championcross.jp",
  },
  [PLATFORM_IDS.YOUNG_CHAMPION]: {
    domain: "youngchampion.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "ヤンチャンWeb",
    url: "https://youngchampion.jp",
  },

  // KADOKAWA
  [PLATFORM_IDS.KADOCOMI]: {
    domain: "comic-walker.com",
    episodePattern: /\/(detail|viewer)\/[A-Z0-9_]+/,
    name: "カドコミ",
    url: "https://comic-walker.com",
  },

  // 白泉社
  [PLATFORM_IDS.YOUNG_ANIMAL]: {
    domain: "younganimal.com",
    episodePattern: /\/(series|episodes)\//,
    name: "ヤングアニマル",
    url: "https://younganimal.com",
  },

  // 新潮社
  [PLATFORM_IDS.KURAGE_BUNCH]: {
    domain: "kuragebunch.com",
    episodePattern: /\/episode\/\d+/,
    name: "くらげバンチ",
    url: "https://kuragebunch.com",
  },

  // 双葉社
  [PLATFORM_IDS.COMIC_ACTION]: {
    domain: "comic-action.com",
    episodePattern: /\/episode\/\d+/,
    name: "webアクション",
    url: "https://comic-action.com",
  },

  // ホーム社
  [PLATFORM_IDS.OGYAAA]: {
    domain: "comic-ogyaaa.com",
    episodePattern: /\/episode\/\d+/,
    name: "COMIC OGYAAA!!",
    url: "https://comic-ogyaaa.com",
  },

  // 少年画報社
  [PLATFORM_IDS.COMIC_YOURS]: {
    domain: "comic-y-ours.com",
    episodePattern: /\/episode\/\d+/,
    name: "COMIC Y-OURS",
    url: "https://comic-y-ours.com",
  },

  // 一迅社
  [PLATFORM_IDS.ICHICOMI]: {
    domain: "ichicomi.com",
    episodePattern: /\/episode\/\d+/,
    name: "一迅プラス",
    url: "https://ichicomi.com",
  },

  // 日本文芸社
  [PLATFORM_IDS.GORAKU_WEB]: {
    domain: "gorakuweb.com",
    episodePattern: /\/episode\/\d+\/\d+/,
    name: "ゴラクうぇぶ！",
    url: "https://gorakuweb.com",
  },

  // ヒーローズ
  [PLATFORM_IDS.HEROS_WEB]: {
    domain: "viewer.heros-web.com",
    episodePattern: /\/episode\/\d+/,
    name: "HERO'S Web",
    url: "https://viewer.heros-web.com",
  },

  // MAG Garden
  [PLATFORM_IDS.MAGCOMI]: {
    domain: "magcomi.com",
    episodePattern: /\/episode\/\d+/,
    name: "マグコミ",
    url: "https://magcomi.com",
  },

  // Coamix
  [PLATFORM_IDS.COMIC_ZENON]: {
    domain: "comic-zenon.com",
    episodePattern: /\/episode\/\d+/,
    name: "ゼノン編集部",
    url: "https://comic-zenon.com",
  },

  // スクウェアエニックス
  [PLATFORM_IDS.GANGANONLINE]: {
    domain: "www.ganganonline.com",
    episodePattern: /\/title\/\d+/,
    name: "ガンガンONLINE",
    url: "https://www.ganganonline.com",
  },

  // マガジンハウス
  [PLATFORM_IDS.SHURO]: {
    domain: "shuro.world",
    episodePattern: /\/(manga|episode)\//,
    name: "SHURO",
    url: "https://shuro.world",
  },

  // 扶桑社
  [PLATFORM_IDS.MANGA_SPA]: {
    domain: "mangaspa.nikkan-spa.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "マンガSPA！",
    url: "https://mangaspa.nikkan-spa.jp",
  },

  // 芳文社
  [PLATFORM_IDS.COMIC_FUZ]: {
    domain: "comic-fuz.com",
    episodePattern: /\/manga\/viewer\/\d+/,
    name: "COMIC FUZ",
    url: "https://comic-fuz.com",
  },
  [PLATFORM_IDS.COMIC_TRAIL]: {
    domain: "comic-trail.com",
    episodePattern: /\/episode\/\d+/,
    name: "コミックトレイル",
    url: "https://comic-trail.com",
  },

  // 竹書房
  [PLATFORM_IDS.TAKE_COMIC]: {
    domain: "takecomic.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "竹コミ！",
    url: "https://takecomic.jp",
  },

  // リイド社
  [PLATFORM_IDS.TORCH]: {
    domain: "to-ti.in",
    episodePattern: /\/(product|story)\/[a-zA-Z0-9_-]+/,
    name: "トーチweb",
    url: "https://to-ti.in",
  },
  [PLATFORM_IDS.COMIC_BORDER]: {
    domain: "comicborder.com",
    episodePattern: /\/episode\/\d+/,
    name: "コミックボーダー",
    url: "https://comicborder.com",
  },
  [PLATFORM_IDS.MANGALT]: {
    domain: "mangalt.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "マンガルト",
    url: "https://mangalt.jp",
  },

  // 早川書房
  [PLATFORM_IDS.HAYACOMI]: {
    domain: "hayacomic.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "ハヤコミ",
    url: "https://hayacomic.jp",
  },

  // ブシロードワークス
  [PLATFORM_IDS.COMIC_GROWL]: {
    domain: "comic-growl.com",
    episodePattern: /\/(series|episodes)\//,
    name: "コミックグロウル",
    url: "https://comic-growl.com",
  },

  // GOTcorporation
  [PLATFORM_IDS.COMIC_MEDU]: {
    domain: "comic-medu.com",
    episodePattern: /\/(series|episodes)\//,
    name: "COMIC MeDu",
    url: "https://comic-medu.com",
  },

  // MICRO MAGAZINE
  [PLATFORM_IDS.COMIC_RIDE]: {
    domain: "comicride.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "ライコミ",
    url: "https://comicride.jp",
  },

  // KILL TIME COMMUNICATION
  [PLATFORM_IDS.KIMICOMI]: {
    domain: "kimicomi.com",
    episodePattern: /\/(series|episodes)\//,
    name: "キミコミ",
    url: "https://kimicomi.com",
  },

  // スターツ出版
  [PLATFORM_IDS.MANGA_ZEGRA]: {
    domain: "manga-zegra.com",
    episodePattern: /\/(series|episodes)\//,
    name: "マンガゼグラ",
    url: "https://manga-zegra.com",
  },

  // 太田出版
  [PLATFORM_IDS.OHTA_WEB]: {
    domain: "webcomic.ohtabooks.com",
    episodePattern: /\/[a-zA-Z0-9_-]+\/?/,
    name: "Ohta Web Comic",
    url: "https://webcomic.ohtabooks.com",
  },

  // Amazia
  [PLATFORM_IDS.MANGA_BANG]: {
    domain: "comics.manga-bang.com",
    episodePattern: /\/(series|episodes)\//,
    name: "マンガBANGコミックス",
    url: "https://comics.manga-bang.com",
  },

  // 祥伝社
  [PLATFORM_IDS.OUR_FEEL]: {
    domain: "ourfeel.jp",
    episodePattern: /\/episode\/\d+/,
    name: "OUR FEEL",
    url: "https://ourfeel.jp",
  },
  [PLATFORM_IDS.FEEL_WEB]: {
    domain: "feelweb.jp",
    episodePattern: /\/episode\/\d+/,
    name: "FEEL WEB",
    url: "https://feelweb.jp",
  },

  // 女性向け
  [PLATFORM_IDS.SEASONS]: {
    domain: "comic-seasons.com",
    episodePattern: /\/episode\/\d+/,
    name: "Seasons",
    url: "https://comic-seasons.com",
  },
  [PLATFORM_IDS.COMIC_GARDO]: {
    domain: "comic-gardo.com",
    episodePattern: /\/episode\/\d+/,
    name: "コミックガルド",
    url: "https://comic-gardo.com",
  },
  [PLATFORM_IDS.COMIC_ROOM_BASE]: {
    domain: "comic-room-base.com",
    episodePattern: /\/(series|episodes)\//,
    name: "COMIC ROOM BASE",
    url: "https://comic-room-base.com",
  },
  [PLATFORM_IDS.EARTH_STAR]: {
    domain: "comic-earthstar.com",
    episodePattern: /\/episode\/\d+/,
    name: "コミック アース・スター",
    url: "https://comic-earthstar.com",
  },
  [PLATFORM_IDS.ASACOMI]: {
    domain: "asacomi.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "アサコミ",
    url: "https://asacomi.jp",
  },
  [PLATFORM_IDS.COMIC_PASH]: {
    domain: "comicpash.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "コミックPASH! neo",
    url: "https://comicpash.jp",
  },
  [PLATFORM_IDS.MAGKAN]: {
    domain: "kansai.mag-garden.co.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "MAGKAN",
    url: "https://kansai.mag-garden.co.jp",
  },
  [PLATFORM_IDS.RIMACOMI]: {
    domain: "rimacomiplus.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "リマコミ＋",
    url: "https://rimacomiplus.jp",
  },
  [PLATFORM_IDS.COMIC_RUELLE]: {
    domain: "comic.j-nbooks.jp",
    episodePattern: /\/(series|episodes)\//,
    name: "COMICリュエル＆COMICジャルダン",
    url: "https://comic.j-nbooks.jp",
  },

  // 非特定出版社配信サイト
  [PLATFORM_IDS.NICONICO_MANGA]: {
    domain: "manga.nicovideo.jp",
    episodePattern: /\/comic\/\d+/,
    name: "ニコニコ漫画",
    url: "https://manga.nicovideo.jp",
  },
  [PLATFORM_IDS.MANGANO]: {
    domain: "manga-no.com",
    episodePattern: /\/(works|episodes)\//,
    name: "マンガノ",
    url: "https://manga-no.com",
  },
  [PLATFORM_IDS.MANGAZ]: {
    domain: "www.mangaz.com",
    episodePattern: /\/(series|book)\/detail\/\d+/,
    name: "マンガ図書館Z",
    url: "https://www.mangaz.com",
  },

  // 非漫画専門サイト
  [PLATFORM_IDS.OMOCORO]: {
    domain: "omocoro.jp",
    episodePattern: /omocoro\.jp\/(kiji|comic)\/\d+/,
    name: "オモコロ",
    url: "https://omocoro.jp",
  },
  [PLATFORM_IDS.PIXIV]: {
    domain: "www.pixiv.net",
    episodePattern: /\/artworks\/\d+/,
    name: "pixiv",
    url: "https://www.pixiv.net",
  },

  // 個人サイト
  [PLATFORM_IDS.ONEPUNCHMAN]: {
    category: "個人サイト",
    description:
      "一撃必殺！強くなりすぎて、どんな凶悪な怪人もワンパンチで倒してしまうヒーロー“サイタマ”。平熱系最強ヒーローの伝説開幕!!",
    domain: "galaxyheavyblow.web.fc2.com",
    name: "ワンパンマン",
    url: "http://galaxyheavyblow.web.fc2.com",
    author: "ONE",
  },
  [PLATFORM_IDS.DQN_SAGA]: {
    category: "個人サイト",
    description:
      "剣や魔法が幅を利かせている時代――。王都ザイダーマに住む男、モッコスは持って生まれた圧倒的な力で暴虐の限りを尽くしていた。ある日国王の命により魔王討伐に向かったモッコスは、魔王城で一人の少女と出会う。",
    domain: "hasama.hippy.jp",
    imageUrl: "https://hasama.hippy.jp/dqn/images/top2.jpg",
    name: "ドキュンサーガ",
    url: "https://hasama.hippy.jp/dqn/",
    author: "いとまん",
  },
  [PLATFORM_IDS.TAIKAISYU]: {
    category: "個人サイト",
    description:
      "Web漫画 総天然色長編『胎界主』一部二部完結。全頁無料公開中。内容はダークファンタジー。第三部＜翻訳儀典＞を毎週金曜日に連載。",
    domain: "www.taikaisyu.com",
    imageUrl: "http://www.taikaisyu.com/top/taitoru.png",
    name: "胎界主",
    url: "http://www.taikaisyu.com/",
    author: "尾籠憲一",
  },
} as const;

export function getPlatform(id: string) {
  return PLATFORMS[id as PlatformId] || null;
}

export function getPlatformIdsByCategory(category: "個人サイト"): PlatformId[] {
  return (Object.entries(PLATFORMS) as [PlatformId, PlatformConfig][])
    .filter(([, config]) => config.category === category)
    .map(([id]) => id);
}
