"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

type Phase = "quiz" | "analyzing";

const DOT_FRAMES = ["解析中．", "解析中．．", "解析中．．．"];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [dotFrame, setDotFrame] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // sessionStorageから途中再開
  useEffect(() => {
    const saved = sessionStorage.getItem("quiz_answers");
    if (saved) {
      const parsed: number[] = JSON.parse(saved);
      if (parsed.length < questions.length) {
        setAnswers(parsed);
        setCurrentIndex(parsed.length);
      }
    }
  }, []);

  // 解析中ドットアニメーション
  useEffect(() => {
    if (phase !== "analyzing") return;
    const interval = setInterval(() => {
      setDotFrame((f) => (f + 1) % DOT_FRAMES.length);
    }, 1000);
    // 2.8秒後に結果ページへ
    const timeout = setTimeout(() => {
      router.push("/result");
    }, 2800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [phase, router]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (score: number) => {
    if (selected !== null) return; // 連打防止

    setSelected(score);

    timerRef.current = setTimeout(() => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);
      sessionStorage.setItem("quiz_answers", JSON.stringify(newAnswers));

      if (currentIndex + 1 >= questions.length) {
        setPhase("analyzing");
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    const newAnswers = answers.slice(0, -1);
    setAnswers(newAnswers);
    sessionStorage.setItem("quiz_answers", JSON.stringify(newAnswers));
    setCurrentIndex(currentIndex - 1);
    setSelected(null);
  };

  // 解析中画面
  if (phase === "analyzing") {
    return (
      <main className="min-h-screen bg-[#0D3D30] flex flex-col items-center justify-center px-6">
        {/* 回転サークル */}
        <div className="relative w-20 h-20 mb-10">
          <div className="absolute inset-0 rounded-full border-4 border-[#C8A84A]/20" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C8A84A]"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <div className="absolute inset-3 rounded-full border-2 border-[#C8A84A]/30" />
        </div>

        {/* テキスト */}
        <p className="text-[#C8A84A] text-lg font-bold tracking-widest mb-3">
          {DOT_FRAMES[dotFrame]}
        </p>
        <p className="text-white/40 text-xs tracking-wide">
          あなたの肌タイプを特定しています
        </p>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D3D30] flex flex-col">
      {/* ヘッダー */}
      <div className="px-6 pt-10 pb-6">
        <p className="text-[#C8A84A] text-xs tracking-widest text-center mb-4">SKIN DIAGNOSIS</p>

        {/* 進捗表示 */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-xs">質問</span>
          <span className="text-white font-bold text-sm">
            {currentIndex + 1}
            <span className="text-white/40 font-normal"> / {questions.length}</span>
          </span>
        </div>

        {/* 進捗バー */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C8A84A] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問カード */}
      <div className="flex-1 px-6 flex flex-col">
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-6">
          {/* タイプラベル */}
          <div className="inline-block bg-[#0D3D30]/10 text-[#0D3D30] text-xs px-3 py-1 rounded-full mb-4 font-medium">
            Q{currentIndex + 1}
          </div>

          {/* 質問テキスト */}
          <p className="text-[#0D3D30] text-base font-medium leading-relaxed mb-6">
            {current.text}
          </p>

          {/* 選択肢 */}
          <div className="space-y-3">
            {current.options.map((option) => (
              <button
                key={option.score}
                onClick={() => handleSelect(option.score)}
                disabled={selected !== null}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                  selected === option.score
                    ? "border-[#C8A84A] bg-[#C8A84A]/20 text-[#0D3D30] scale-[1.02] shadow-md shadow-[#C8A84A]/20"
                    : selected !== null
                    ? "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "border-gray-200 bg-white text-gray-700 hover:border-[#C8A84A]/50 hover:bg-[#C8A84A]/5 active:scale-[0.98]"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full border mr-3 text-xs transition-all duration-200 ${
                    selected === option.score
                      ? "border-[#C8A84A] bg-[#C8A84A] text-white"
                      : "border-gray-300 text-transparent"
                  }`}
                >
                  ✓
                </span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 戻るボタン */}
        {currentIndex > 0 && selected === null && (
          <div className="pb-10">
            <button
              onClick={handleBack}
              className="px-5 py-3 rounded-full border border-white/20 text-white/50 text-sm hover:border-white/40 hover:text-white/70 transition-colors"
            >
              ← 前の質問に戻る
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
