import { SEO } from "../components/SEO";

const mainClassName = "min-h-screen py-12 pb-20 sm:py-8 sm:pb-16";
const heroClassName = "mx-auto mb-8 max-w-[820px] border-b border-white/10 px-4 pb-8 pt-6";
const titleClassName = "mb-3 text-[2rem] font-extrabold leading-tight";
const metaClassName = "m-0 text-[0.95rem] text-[var(--text-secondary,#94a3b8)]";
const contentClassName =
  "mx-auto flex max-w-[820px] flex-col gap-4 px-4 text-[var(--text-secondary,#cbd5e1)]";
const sectionClassName = "flex flex-col gap-3 pt-4";
const sectionTitleClassName = "m-0 text-[1.2rem] font-bold text-[var(--foreground)]";
const paragraphClassName = "m-0 leading-8";
const listClassName = "list-disc pl-5 leading-8";
const linkClassName = "text-[#9fb3ff] hover:underline";

const UPDATED_AT = "2026年4月18日";

export default function PrivacyPolicy() {
  return (
    <main className={mainClassName}>
      <SEO title="プライバシーポリシー" description="BUKUMANGAにおける利用者情報の取扱いについて" />
      <section className={heroClassName}>
        <h1 className={titleClassName}>プライバシーポリシー</h1>
        <p className={metaClassName}>最終更新日: {UPDATED_AT}</p>
      </section>

      <section className={contentClassName}>
        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>取得する情報</h2>
          <p className={paragraphClassName}>
            当サイトでは、アクセスに伴う技術的な情報（IPアドレス、ブラウザ情報、Cookie等）を取得する場合があります。また、お問い合わせ時には、外部フォーム上で入力された情報を取得します。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>利用目的</h2>
          <ul className={listClassName}>
            <li>当サイトの提供、維持、改善のため</li>
            <li>お問い合わせへの対応のため</li>
            <li>不正利用や障害への対応のため</li>
          </ul>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>外部サービス</h2>
          <p className={paragraphClassName}>
            当サイトでは、アクセス状況の把握のために Cloudflare Web Analytics
            を利用する場合があります。Cloudflare Web Analytics
            は、アクセス状況の集計・分析のために利用されます。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>第三者提供</h2>
          <p className={paragraphClassName}>
            当サイトは、法令に基づく場合を除き、取得した個人情報を本人の同意なく第三者に提供しません。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>お問い合わせ</h2>
          <p className={paragraphClassName}>
            本ポリシーに関するお問い合わせは、
            <a
              className={linkClassName}
              href="https://docs.google.com/forms/d/e/1FAIpQLSeg_kL348hfDtVIsR1FFfjTUm20ktCe8kl7mFME-XgRa69ltg/viewform"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              お問い合わせフォーム
            </a>
            からご連絡ください。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>改定</h2>
          <p className={paragraphClassName}>
            本ポリシーは、必要に応じて変更することがあります。変更後の内容は当サイトに掲載した時点で効力を生じます。
          </p>
        </section>
      </section>
    </main>
  );
}
