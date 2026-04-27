import { submitLead } from "@/app/actions";
import Image from "next/image";
import PhoneInput from "@/components/PhoneInput";
import { getLocalizedHref, type Locale } from "@/lib/i18n";
import { translations } from "@/lib/translations";

type FormSectionProps = {
  locale: Locale;
  successPath?: string;
};

export default function FormSection({
  locale,
  successPath = "/",
}: FormSectionProps) {
  const t = translations[locale].form;

  return (
    <section
      id="form"
      className="w-full max-w-7xl mx-auto px-8 lg:px-14.5 pb-12 lg:pb-24"
    >
      <h2 className="text-white font-bold text-[20px] lg:text-[24px] mb-6 lg:mb-8">
        {t.title}
      </h2>
      <div className="relative rounded-[20px] overflow-hidden">
        <Image
          src="/StartCreatingStoryBackgroundImage.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 1216px, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex justify-center py-10 lg:py-16 px-4">
          <div className="bg-black/10 md:bg-[#0C2037]/70 backdrop-blur-md rounded-[25px] p-8 lg:p-12 w-full max-w-[800px] shadow-2xl">
            <p className="text-white text-[16px] lg:text-[20px] text-center mb-8 lg:mb-12 font-medium">
              {t.intro}
            </p>
            <form
              action={submitLead}
              className="flex flex-col md:grid md:grid-cols-2 gap-5 md:gap-x-10 md:gap-y-8 md:items-end"
            >
              <input type="hidden" name="redirectTo" value={getLocalizedHref(successPath, locale)} />

              <div className="order-1 flex flex-col">
                <label className="text-white font-medium text-[14px] lg:text-[15px] block mb-2 opacity-90">
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={80}
                  placeholder={t.namePlaceholder}
                  className="w-full border border-[#ebe2c3]/60 rounded-[14px] bg-transparent
                             text-white placeholder-white/40 text-[15px] px-5 h-[52px]
                             outline-none focus:border-[#ebe2c3] transition-colors"
                />
              </div>

              <div className="order-2 md:order-3 flex flex-col mt-2 md:mt-0">
                <label className="text-white font-medium text-[14px] lg:text-[15px] block mb-2 opacity-90">
                  {t.phone}
                </label>
                <PhoneInput placeholder={t.phonePlaceholder} />
              </div>

              <label className="order-3 md:order-2 flex items-center gap-4 cursor-pointer md:pb-1 group mt-3 md:mt-0 justify-center md:justify-center">
                <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="peer w-5 h-5 appearance-none border border-white/60 rounded bg-transparent checked:bg-transparent checked:border-[#ebe2c3] transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute w-3 h-3 text-[#ebe2c3] pointer-events-none opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 9L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-white text-[13px] lg:text-[14px] leading-snug opacity-80 group-hover:opacity-100 transition-opacity select-none text-left">
                  {t.consentFirst}
                  <br className="hidden md:block" /> {t.consentSecond}
                </span>
              </label>

              <button
                type="submit"
                className="order-4 w-full bg-[#0a2e58] hover:bg-[#0f407a] text-white font-medium text-[15px] lg:text-[16px]
                           rounded-[14px] h-[52px] transition-colors mt-2 md:mt-0"
              >
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
