import { SEO } from "../components/SEO";

const mainClassName = "min-h-screen py-12 pb-20 sm:py-8 sm:pb-16";
const contentClassName =
  "mx-auto flex max-w-[820px] flex-col gap-4 px-4 text-[var(--text-secondary,#cbd5e1)]";
const sectionClassName = "flex flex-col gap-3 pt-4";
const sectionTitleClassName = "m-0 text-[1.2rem] font-bold text-[var(--foreground)]";
const paragraphClassName = "m-0 leading-8";
const linkClassName = "text-[#9fb3ff] hover:underline";

export default function About() {
  return (
    <main className={mainClassName}>
      <SEO title="このサービスについて" description="BUKUMANGAについて" />

      <section className={contentClassName}>
        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>BUKUMANGA とは</h2>
          <p className={paragraphClassName}>
            BUKUMANGAは、複数のWEB漫画配信サービスに分散している作品情報をまとめて、今読まれている作品や面白い作品を探しやすくするためのサービスです。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>このサービスの目的</h2>
          <p className={paragraphClassName}>
            WEB漫画は多くの配信サービスに分かれているため、面白い作品や話題作を探すには複数のサービスを行き来する必要があります。
            BUKUMANGAは、その分散した情報を横断的に整理し、ユーザーが面白い作品に出会うことを目的としています。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>掲載している情報</h2>
          <p className={paragraphClassName}>
            BUKUMANGAは、はてな社様のサービス
            <a
              className={linkClassName}
              href="https://b.hatena.ne.jp/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              「はてなブックマーク」
            </a>
            を利用して情報収集を行っています。
            したがって、すべてのWEB漫画を収集対象としているわけではなく、「はてなブックマーク」で収集された各漫画配信サービスに掲載されている作品についてのみ情報を収集し、タイトル、作者名、書影、配信サービスなどをまとめて表示しています。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>トレンドについて</h2>
          <p className={paragraphClassName}>
            トレンドは一定期間に増加した各エピソードに対するはてなブックマーク数をもとに算出しています。
            更新情報そのものに加えて、どれだけ反響が集まっているかもあわせて見ることで、今読むべき作品を見つけやすくしています。
            更新は1時間ごとに行われます。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>ランキングについて</h2>
          <p className={paragraphClassName}>
            ランキングは各エピソードに対するはてなブックマーク数をもとに算出しています。
            直近の一定期間、または特定の月・年、及び歴代でのランキングを掲載しています。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>検索について</h2>
          <p className={paragraphClassName}>
            タイトルや作者名、配信サービスなどで作品を検索できます。
            トレンド・ランキングと異なり各エピソードはシリーズ作品としてまとめられて表示されます。読み切りは1作品として表示されます。
            表示されるはてなブックマーク数は、シリーズ作品の場合は各エピソードのうち最大のはてなブックマーク数が表示されます。
          </p>
        </section>

        <section className={sectionClassName}>
          <h2 className={sectionTitleClassName}>お問い合わせ</h2>
          <p className={paragraphClassName}>
            掲載内容に誤りがある場合や、ご質問・ご意見がある場合は、
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
      </section>
    </main>
  );
}
