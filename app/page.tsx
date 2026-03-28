import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0D3D30] px-6 py-12">
      {/* 装飾ライン */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-12 bg-[#C8A84A]" />
        <span className="text-[#C8A84A] text-xs tracking-[0.3em] uppercase">Skin Diagnosis</span>
        <div className="h-px w-12 bg-[#C8A84A]" />
      </div>

      {/* メインコンテンツ */}
      <div className="text-center max-w-sm w-full">
        {/* タイトル */}
        <h1 className="text-white text-3xl font-bold leading-tight mb-3 tracking-wide">
          あなたの
          <br />
          肌タイプ診断
        </h1>

        {/* キャッチコピー */}
        <p className="text-white/70 text-sm leading-relaxed mb-2">
          15の質問に答えて、あなたの肌を知ろう
        </p>
        <p className="text-white/50 text-xs leading-relaxed mb-10">
          所要時間：約3分
        </p>

        {/* カード */}
        <div className="bg-white/5 border border-[#C8A84A]/30 rounded-2xl p-6 mb-10 text-left">
          <p className="text-[#C8A84A] text-xs font-medium tracking-widest mb-3">診断でわかること</p>
          <ul className="space-y-2">
            {[
              "あなたの主な肌タイプ",
              "気をつけるべき副タイプ",
              "タイプ別スキンケアアドバイス",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-white/80 text-sm">
                <span className="text-[#C8A84A] mt-0.5">✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTAボタン */}
        <Link
          href="/quiz"
          className="block w-full bg-[#C8A84A] hover:bg-[#b8943e] active:bg-[#a8842e] text-white font-bold py-4 px-8 rounded-full text-base tracking-wide transition-colors duration-200 shadow-lg shadow-[#C8A84A]/20"
        >
          診断スタート
        </Link>

        <p className="text-white/30 text-xs mt-6">無料・登録不要</p>
      </div>

      {/* 下部装飾 */}
      <div className="mt-16 flex items-center gap-3">
        <div className="h-px w-8 bg-[#C8A84A]/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A84A]/40" />
        <div className="h-px w-8 bg-[#C8A84A]/40" />
      </div>
    </main>
  );
}
