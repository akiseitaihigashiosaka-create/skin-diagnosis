"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions } from "@/data/questions";
import { skinTypes, SkinType } from "@/data/skinTypes";

type ScoreMap = Record<string, number>;

function calcScores(answers: number[]): ScoreMap {
  const scores: ScoreMap = {};
  skinTypes.forEach((t) => (scores[t.key] = 0));
  answers.forEach((score, i) => {
    const typeKey = questions[i].type_key;
    scores[typeKey] = (scores[typeKey] ?? 0) + score;
  });
  return scores;
}

function getRanked(scores: ScoreMap): SkinType[] {
  return [...skinTypes].sort((a, b) => scores[b.key] - scores[a.key]);
}

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-800",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-800",
    border: "border-rose-200",
    badge: "bg-rose-100 text-rose-700",
  },
  sky: {
    bg: "bg-sky-50",
    text: "text-sky-800",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
};

export default function ResultPage() {
  const router = useRouter();
  const [primary, setPrimary] = useState<SkinType | null>(null);
  const [secondary, setSecondary] = useState<SkinType | null>(null);
  const lineId = "@143radsn";

  useEffect(() => {
    const saved = sessionStorage.getItem("quiz_answers");
    if (!saved) {
      router.replace("/quiz");
      return;
    }
    const answers: number[] = JSON.parse(saved);
    if (answers.length < questions.length) {
      router.replace("/quiz");
      return;
    }
    const scores = calcScores(answers);
    const ranked = getRanked(scores);
    setPrimary(ranked[0]);
    setSecondary(ranked[1]);
  }, [router]);

  const handleRetry = () => {
    sessionStorage.removeItem("quiz_answers");
    router.push("/quiz");
  };

  if (!primary || !secondary) {
    return (
      <main className="min-h-screen bg-[#0D3D30] flex items-center justify-center">
        <div className="text-white/60 text-sm">診断中...</div>
      </main>
    );
  }

  const primaryColor = colorMap[primary.color] ?? colorMap.emerald;
  const secondaryColor = colorMap[secondary.color] ?? colorMap.amber;

  const lineText = `【肌タイプ診断結果】\n主タイプ：${primary.name}\n副タイプ：${secondary.name}\n詳しいケア方法を希望です！`;
  const lineUrl = `https://line.me/R/oaMessage/${lineId}/?${encodeURIComponent(lineText)}#~`;

  return (
    <main className="min-h-screen bg-[#0D3D30]">
      {/* ヘッダー */}
      <div className="px-6 pt-10 pb-6 text-center">
        <p className="text-[#C8A84A] text-xs tracking-widest mb-2">DIAGNOSIS RESULT</p>
        <h1 className="text-white text-xl font-bold">診断結果</h1>
      </div>

      <div className="px-4 pb-12 space-y-4 max-w-lg mx-auto">
        {/* 主タイプカード */}
        <div className={`${primaryColor.bg} rounded-2xl p-6 border ${primaryColor.border}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${primaryColor.badge}`}>
              あなたの主な肌タイプ
            </span>
          </div>

          <div className="flex items-start gap-2 mb-3">
            <div className="w-1 h-full min-h-[2rem] bg-[#C8A84A] rounded-full flex-shrink-0 mt-1" />
            <h2 className={`text-xl font-bold ${primaryColor.text} leading-tight`}>
              {primary.name}
            </h2>
          </div>

          <p className={`text-sm leading-relaxed mb-5 ${primaryColor.text} opacity-80`}>
            {primary.features}
          </p>

          <div className="bg-white/60 rounded-xl p-4">
            <p className={`text-xs font-bold ${primaryColor.text} mb-3 tracking-wide`}>
              おすすめケアアドバイス
            </p>
            <ul className="space-y-2">
              {primary.care.map((item, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm ${primaryColor.text}`}>
                  <span className="text-[#C8A84A] font-bold flex-shrink-0 mt-0.5">✦</span>
                  <span className="leading-relaxed opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 副タイプカード */}
        <div className={`${secondaryColor.bg} rounded-2xl p-6 border ${secondaryColor.border}`}>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${secondaryColor.badge}`}>
              こんなところにも気をつけて👀
            </span>
          </div>

          <h3 className={`text-lg font-bold ${secondaryColor.text} mb-3`}>
            {secondary.name}
          </h3>

          <p className={`text-sm leading-relaxed ${secondaryColor.text} opacity-80`}>
            {secondary.subDescription}
          </p>
        </div>

        {/* LINE登録案内カード */}
        <div className="bg-[#06C755]/10 border border-[#06C755]/30 rounded-2xl p-6">
          <p className="text-white font-bold text-base mb-1">
            より詳しい対策を知りたい方はLINEへ📲
          </p>
          <p className="text-white/60 text-xs mb-4 leading-relaxed">
            診断結果をLINEで送ると、あなたの肌タイプに合った
            詳しいスキンケア情報をお届けします。
          </p>

          {/* 送信テキストプレビュー */}
          <div className="bg-white/10 rounded-xl p-3 mb-4">
            <p className="text-white/40 text-[10px] mb-1 tracking-wide">送信されるテキスト</p>
            <p className="text-white/80 text-xs leading-relaxed whitespace-pre-line">{lineText}</p>
          </div>

          {/* LINEを開くボタン */}
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#06C755] hover:bg-[#05b54c] active:bg-[#04a344] text-white font-bold py-4 px-6 rounded-full text-sm tracking-wide transition-colors duration-200 shadow-lg shadow-[#06C755]/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.038 2 11c0 2.88 1.46 5.45 3.75 7.16L5 22l3.37-1.75C9.39 20.72 10.67 21 12 21c5.523 0 10-4.038 10-9s-4.477-9-10-9z" />
            </svg>
            診断結果をLINEで送る
          </a>
        </div>

        {/* もう一度診断ボタン */}
        <div className="pt-2">
          <button
            onClick={handleRetry}
            className="w-full border border-white/20 text-white/60 hover:text-white/80 hover:border-white/40 py-3 rounded-full text-sm transition-colors"
          >
            もう一度診断する
          </button>
          <Link
            href="/"
            className="block text-center text-white/30 hover:text-white/50 text-xs mt-3 transition-colors"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
