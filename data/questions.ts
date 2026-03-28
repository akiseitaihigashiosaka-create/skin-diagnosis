export type Question = {
  id: number;
  text: string;
  type_key: string;
  options: {
    label: string;
    score: number;
  }[];
};

const frequencyOptions = (labels: [string, string, string, string]) =>
  labels.map((label, i) => ({ label, score: i }));

export const questions: Question[] = [
  // 乾燥・バリア低下タイプ (dry_barrier) - Q1〜3
  {
    id: 1,
    text: "洗顔後、何もつけないでいると肌がつっぱる感じがしますか？",
    type_key: "dry_barrier",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 2,
    text: "肌の乾燥やカサつきが気になることがありますか？",
    type_key: "dry_barrier",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 3,
    text: "季節の変わり目や空調の効いた室内で肌がざらざらしたり、粉をふいたりしますか？",
    type_key: "dry_barrier",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },

  // 皮脂・毛穴タイプ (sebum_pore) - Q4〜6
  {
    id: 4,
    text: "日中、肌のテカリやべたつきが気になりますか？",
    type_key: "sebum_pore",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 5,
    text: "毛穴の開きや黒ずみが気になることがありますか？",
    type_key: "sebum_pore",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 6,
    text: "化粧崩れ（特に鼻まわりや額）が起きやすいですか？",
    type_key: "sebum_pore",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },

  // くすみ・巡り不足タイプ (dullness_circulation) - Q7〜9
  {
    id: 7,
    text: "顔色が暗い・くすんでいると感じることがありますか？",
    type_key: "dullness_circulation",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 8,
    text: "目の下のクマや顔のむくみが気になりますか？",
    type_key: "dullness_circulation",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 9,
    text: "肌のトーンが均一でなく、くすみやまだら感が気になりますか？",
    type_key: "dullness_circulation",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },

  // 炎症・ゆらぎタイプ (inflammation_sensitive) - Q10〜12
  {
    id: 10,
    text: "肌が赤くなりやすい、またはほてりを感じやすいですか？",
    type_key: "inflammation_sensitive",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 11,
    text: "スキンケアや化粧品を変えると肌荒れや刺激感が出やすいですか？",
    type_key: "inflammation_sensitive",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 12,
    text: "ストレスや生理前などで肌の調子が崩れやすいですか？",
    type_key: "inflammation_sensitive",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },

  // ハリ低下・エイジングタイプ (aging_firmness) - Q13〜15
  {
    id: 13,
    text: "肌のたるみやハリのなさが気になることがありますか？",
    type_key: "aging_firmness",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 14,
    text: "小じわや表情じわが目立ってきたと感じますか？",
    type_key: "aging_firmness",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
  {
    id: 15,
    text: "肌の弾力が昔と比べて落ちてきたと感じますか？",
    type_key: "aging_firmness",
    options: frequencyOptions(["全くない", "たまにある", "よくある", "いつもある"]),
  },
];
