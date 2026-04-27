import type { Locale } from "@/lib/i18n";

export const translations = {
  ru: {
    meta: {
      title: "Кямран Гаджиев",
      description: "Профессиональный ведущий мероприятий",
    },
    common: {
      home: "Главная",
      wedding: "Свадьба",
      anniversary: "Юбилей",
      events: "Мероприятие",
      contacts: "Контакты",
      social: "Социальные сети",
      legal: "Правовая информация",
      privacy: "Политика обработки персональных данных",
      copyright: "© 2026 Кямран Гаджиев",
      menu: "Меню",
      closeNotification: "Закрыть уведомление",
      backHome: "Вернуться на главную",
      notFoundTitle: "Страница не найдена",
      notFoundText:
        "Возможно, она была перемещена или навсегда удалена.",
    },
    toast: {
      title: "Заявка успешно отправлена",
      text: "Ожидайте звонка или свяжитесь со мной по номеру",
    },
    form: {
      title: "Начнем создание вашей истории",
      intro: "Оставьте заявку, и я свяжусь с вами в ближайшее время",
      name: "Имя",
      namePlaceholder: "Ваше имя",
      phone: "Номер телефона",
      phonePlaceholder: "+123456789000",
      consentFirst: "Я согласен с обработкой",
      consentSecond: "персональных данных",
      submit: "Оставить заявку",
    },
    home: {
      heroTitle: "КЯМРАН ГАДЖИЕВ",
      heroLead: "Ведущий меджлисов.",
      heroLeadAccent: "Поэт.",
      heroButton: "Погрузиться в атмосферу",
      audioTitle: "Услышьте ритм вашего торжества",
      audioText: "Авторские стихи, написанные исключительно о вас.",
      play: "Воспроизвести",
      pause: "Пауза",
      fullscreen: "На весь экран",
      skillsTitle: "Три грани мастерства",
      skills: [
        {
          icon: "/AuthorDramaturgyIcon.svg",
          label: "Авторская драматургия",
          description:
            "Разработка сценария, где каждый тост и каждое слово встроены в единую театральную нить.",
        },
        {
          icon: "/LiteraryConferenceIcon.svg",
          label: "Литературный конферанс",
          description:
            "Безупречное владение азербайджанским и русским языками. Ведение без суеты, с уважением к паузам и этикету.",
        },
        {
          icon: "/InstantImprovisationIcon.svg",
          label: "Мгновенная импровизация",
          description:
            "Искусство отвечать стихами на моменты. Я превращаю случайные события вечера в красивые поэтические метафоры прямо на глазах у гостей.",
        },
      ],
      previousSlide: "Предыдущий слайд",
      nextSlide: "Следующий слайд",
      momentsTitle: "Мгновения, застывшие в слове",
      momentSlide: "Показать слайд",
      poemTitle: "Событие как поэма",
      poemAlt: "Событие как поэма",
      poemText: [
        "Меджлис — это не просто праздник, это живой текст, который мы пишем вместе с вами. Я верю, что за каждым торжеством стоит глубокая история семьи, которую нужно рассказать красиво.",
        "Моя база — театральное училище и дар импровизации в стихах. Я не использую шаблоны. Я создаю пространство, где традиции Азербайджана звучат современно, интеллигентно и искренне.",
      ],
      poemQuote:
        "Ваша история заслуживает того, чтобы стать поэзией.",
      readingTitle: "Поэзия в звуке",
      readingText: [
        "Поэзия, звучащая в каждом слове — это не просто речь, а искусство передавать чувства через интонацию, тембр и тонкие оттенки эмоций.",
        "Позвольте себе ощутить глубину звучания, где каждое слово становится знаком искреннего уважения к вашим гостям и отражением ценностей вашего рода, создавая атмосферу тепла, доверия и душевного единства.",
      ],
      authorReading: "Авторское чтение",
    },
    contactsPage: {
      title: "Контакты",
      description: "Контакты для связи с Кямраном Гаджиевым.",
      direct: "Прямая связь",
      directText:
        "Напишите или позвоните, чтобы обсудить дату, формат события и детали вашего мероприятия.",
      socialText:
        "Следите за выступлениями и новыми работами в социальных сетях.",
    },
    pages: {
      wedding: {
        title: "Свадебный меджлис",
        metaTitle: "Свадебный меджлис — Кямран Гаджиев",
        description:
          "Профессиональный ведущий на азербайджанскую свадьбу и меджлис",
        paragraphs: [
          "Свадебный меджлис — это не просто праздник, а важная часть культурных традиций Азербайджана, наполненная уважением к семье, гостям и национальным обычаям. Чтобы этот день прошел идеально, необходим профессиональный ведущий на свадьбу, который сможет создать атмосферу уюта, веселья и гармонии.",
          "Тамада на азербайджанскую свадьбу играет ключевую роль в проведении меджлиса. Он управляет ходом мероприятия, взаимодействует с гостями, поддерживает настроение и следит за соблюдением обрядов.",
          "Азербайджанские свадьбы славятся размахом, большим количеством гостей и богатой программой. Хороший ведущий умеет находить подход к каждому гостю, поддерживать уважительную атмосферу и делать праздник ярким и запоминающимся.",
          "Выбирая ведущего на свадебный меджлис, стоит обратить внимание на опыт, умение работать с большой аудиторией и знание культурных особенностей. Это залог того, что торжество пройдет на высоком уровне.",
        ],
      },
      anniversary: {
        title: "Юбилей и день рождения",
        metaTitle: "Юбилей и день рождения — Кямран Гаджиев",
        description:
          "Профессиональный ведущий на юбилей и день рождения",
        paragraphs: [
          "Юбилей или день рождения — это особенные события, которые хочется отметить ярко, весело и на высоком уровне. Профессиональный ведущий помогает создать правильную атмосферу, объединить гостей и сделать торжество запоминающимся.",
          "Ведущий на юбилей — это не просто человек с микрофоном, а организатор настроения всего мероприятия. Он продумывает сценарий, координирует ход праздника, вовлекает гостей и следит за комфортом каждого.",
          "Проведение дня рождения с профессиональным ведущим позволяет снять организационные заботы с именинника и его близких. Праздник проходит легко, без пауз и неловких моментов.",
          "Хороший ведущий учитывает пожелания клиента, формат мероприятия, количество гостей и стиль праздника — от классического застолья до современной вечеринки.",
          "Качественный ведущий — это инвестиция в эмоции, комфорт и яркие воспоминания, которые останутся с вами и вашими близкими на долгие годы.",
        ],
      },
      events: {
        title: "Мероприятие",
        metaTitle: "Мероприятие — Кямран Гаджиев",
        description: "Профессиональный ведущий мероприятий",
        quote:
          "Каждое мероприятие — это индивидуальный сценарий, продуманный до мелочей.",
        paragraphs: [
          "Организация любого мероприятия требует не только хорошей подготовки, но и сильного ведущего, который сможет задать правильную атмосферу, объединить гостей и сделать праздник действительно запоминающимся.",
          "Главная задача ведущего — не просто говорить, а выстраивать контакт с аудиторией. Я уделяю особое внимание вовлечению гостей в программу, созданию дружелюбной атмосферы и уважительному общению с каждым участником.",
          "Если вам нужен ведущий, который сможет создать правильную атмосферу и провести мероприятие на высоком уровне — свяжитесь со мной. Я помогу реализовать ваше событие так, чтобы оно стало ярким и запоминающимся.",
        ],
      },
    },
    privacyPage: {
      title: "Политика обработки персональных данных",
      description:
        "Политика обработки персональных данных посетителей сайта.",
      published: "Дата публикации: 14 апреля 2026 года",
      sections: [
        {
          title: "1. Общие положения",
          paragraphs: [
            "Настоящая Политика определяет порядок обработки и защиты персональных данных посетителей сайта kamrangadzhyev.com, которые оставляют заявку для связи с Кямраном Гаджиевым.",
            "Политика подготовлена с учетом Федерального закона от 27.07.2006 N 152-ФЗ «О персональных данных» и применяется ко всем данным, полученным через формы сайта.",
          ],
        },
        {
          title: "2. Какие данные обрабатываются",
          paragraphs: [
            "Оператор обрабатывает только данные, которые пользователь самостоятельно указывает в форме заявки: имя и номер телефона.",
            "Сайт не предназначен для сбора специальных категорий персональных данных, биометрических данных, паспортных данных, сведений о платежах или иных избыточных данных.",
          ],
        },
        {
          title: "3. Цели обработки",
          paragraphs: [
            "Персональные данные обрабатываются для приема заявки, связи с пользователем по указанному номеру телефона, уточнения деталей мероприятия и подготовки ответа на обращение.",
            "Данные не используются для массовой рекламной рассылки, не публикуются на сайте и не передаются третьим лицам для самостоятельного использования.",
          ],
        },
        {
          title: "4. Как обрабатываются данные",
          paragraphs: [
            "После отправки формы заявка передается в VK-бота, который направляет владельцу сайта уведомление о новой заявке. В уведомлении могут содержаться имя и номер телефона, указанные пользователем.",
            "VK-бот используется как технический канал доставки уведомления владельцу сайта. Оператор не передает персональные данные третьим лицам для продажи, рассылок или иных целей, не связанных с обработкой заявки.",
          ],
        },
        {
          title: "5. Права пользователя",
          paragraphs: [
            "Пользователь вправе получать сведения об обработке своих персональных данных, требовать уточнения, блокирования или удаления данных, а также отзывать согласие на обработку.",
          ],
        },
      ],
      contactPrefix:
        "Оператор персональных данных: Кямран Гаджиев. Контакты для обращений:",
    },
  },
  az: {
    meta: {
      title: "Kamran Hacıyev",
      description: "Peşəkar tədbir aparıcısı",
    },
    common: {
      home: "Ana səhifə",
      wedding: "Toy",
      anniversary: "Yubiley",
      events: "Tədbir",
      contacts: "Əlaqə",
      social: "Sosial şəbəkələr",
      legal: "Hüquqi məlumat",
      privacy: "Fərdi məlumatların emalı siyasəti",
      copyright: "© 2026 Kamran Hacıyev",
      menu: "Menyu",
      closeNotification: "Bildirişi bağla",
      backHome: "Ana səhifəyə qayıt",
      notFoundTitle: "Səhifə tapılmadı",
      notFoundText: "Ola bilsin, səhifə köçürülüb və ya silinib.",
    },
    toast: {
      title: "Müraciət uğurla göndərildi",
      text: "Zəngi gözləyin və ya mənimlə bu nömrə ilə əlaqə saxlayın",
    },
    form: {
      title: "Sizin hekayənizi yaratmağa başlayaq",
      intro: "Müraciət göndərin, yaxın zamanda sizinlə əlaqə saxlayacağam",
      name: "Ad",
      namePlaceholder: "Adınız",
      phone: "Telefon nömrəsi",
      phonePlaceholder: "+123456789000",
      consentFirst: "Fərdi məlumatlarımın",
      consentSecond: "emalına razıyam",
      submit: "Müraciət göndər",
    },
    home: {
      heroTitle: "Kamran Hacıyev",
      heroLead: "Məclis aparıcısı.", 
      heroLeadAccent: "şair",
      heroButton: "Atmosferə daxil olun",
      audioTitle: "Mərasiminizin ritmini eşidin",
      audioText: "Yalnız sizin haqqınızda yazılmış müəllif şeirləri.",
      play: "Oxut",
      pause: "Pauza",
      fullscreen: "Tam ekran",
      skillsTitle: "Ustalığın üç tərəfi",
      skills: [
        {
          icon: "/AuthorDramaturgyIcon.svg",
          label: "Müəllif dramaturgiyası",
          description:
            "Hər tostun və hər sözün vahid teatr xəttinə bağlandığı ssenarinin hazırlanması.",
        },
        {
          icon: "/LiteraryConferenceIcon.svg",
          label: "Ədəbi konfrans",
          description:
            "Azərbaycan və rus dillərində sərbəst və səliqəli aparıcılıq. Tələsmədən, pauzalara və etiketə hörmətlə.",
        },
        {
          icon: "/InstantImprovisationIcon.svg",
          label: "Ani improvizasiya",
          description:
            "Anlara şeirlə cavab vermək bacarığı. Gecənin təsadüfi hadisələrini qonaqların gözü qarşısında poetik metaforalara çevirirəm.",
        },
      ],
      previousSlide: "Əvvəlki slayd",
      nextSlide: "Növbəti slayd",
      momentsTitle: "Sözdə donmuş anlar",
      momentSlide: "Slaydı göstər",
      poemTitle: "Tədbir bir poema kimi",
      poemAlt: "Tədbir bir poema kimi",
      poemText: [
        "Məclis sadəcə bayram deyil, sizinlə birlikdə yazdığımız canlı mətndir. Hər mərasimin arxasında gözəl danışılmalı olan dərin ailə hekayəsi dayanır.",
        "Mənim əsasım teatr məktəbi və şeirdə improvizasiya bacarığıdır. Şablonlardan istifadə etmirəm. Azərbaycanın ənənələrinin müasir, zərif və səmimi səsləndiyi məkan yaradıram.",
      ],
      poemQuote: "Sizin hekayəniz poeziyaya çevrilməyə layiqdir.",
      readingTitle: "Səsdə poeziya",
      readingText: [
        "Tiktok",
        "Hər söz qonaqlarınıza səmimi hörmətin işarəsinə və ailə dəyərlərinizin əksinə çevrilsin.",
      ],
      authorReading: "Müəllif oxusu",
    },
    contactsPage: {
      title: "Əlaqə",
      description: "Kamran Hacıyevlə əlaqə üçün məlumatlar.",
      direct: "Birbaşa əlaqə",
      directText:
        "Tarixi, tədbirin formatını və detallarını müzakirə etmək üçün yazın və ya zəng edin.",
      socialText:
        "Çıxışları və yeni işləri sosial şəbəkələrdə izləyin.",
    },
    pages: {
      wedding: {
        title: "Toy məclisi",
        metaTitle: "Toy məclisi — Kamran Hacıyev",
        description: "Azərbaycan toyu və məclisi üçün peşəkar aparıcı",
        paragraphs: [
          "Toy məclisi sadəcə bayram deyil, ailəyə, qonaqlara və milli adətlərə hörmətlə dolu Azərbaycan mədəniyyətinin vacib hissəsidir.",
          "Azərbaycan toyunda aparıcı məclisin aparılmasında əsas rol oynayır: tədbirin axınını idarə edir, qonaqlarla ünsiyyət qurur və əhvalı qoruyur.",
          "Azərbaycan toyları genişliyi, çoxsaylı qonaqları və zəngin proqramı ilə seçilir. Peşəkar aparıcı hər qonağa yanaşma tapır və mərasimi yadda qalan edir.",
          "Toy məclisi üçün aparıcı seçərkən təcrübə, böyük auditoriya ilə işləmək bacarığı və mədəni xüsusiyyətləri bilmək vacibdir.",
        ],
      },
      anniversary: {
        title: "Yubiley və ad günü",
        metaTitle: "Yubiley və ad günü — Kamran Hacıyev",
        description: "Yubiley və ad günü üçün peşəkar aparıcı",
        paragraphs: [
          "Yubiley və ad günü parlaq, səmimi və yüksək səviyyədə qeyd olunmalı xüsusi hadisələrdir. Peşəkar aparıcı düzgün atmosfer yaradır və qonaqları birləşdirir.",
          "Yubiley aparıcısı sadəcə mikrofonlu insan deyil, bütün tədbirin əhvalını quran şəxsdir. O, ssenarini düşünür, bayramın gedişini əlaqələndirir və qonaqları cəlb edir.",
          "Peşəkar aparıcı ilə ad günü keçirmək təşkilati qayğıları azaldır. Bayram yüngül, fasiləsiz və rahat keçir.",
          "Yaxşı aparıcı müştərinin istəyini, tədbirin formatını, qonaq sayını və bayramın üslubunu nəzərə alır.",
          "Keyfiyyətli aparıcı emosiyalara, rahatlığa və uzun müddət yadda qalacaq xatirələrə yatırımdır.",
        ],
      },
      events: {
        title: "Tədbir",
        metaTitle: "Tədbir — Kamran Hacıyev",
        description: "Peşəkar tədbir aparıcısı",
        quote:
          "Hər tədbir xırdalıqlarına qədər düşünülmüş fərdi ssenaridir.",
        paragraphs: [
          "İstənilən tədbirin təşkili yalnız yaxşı hazırlıq deyil, düzgün atmosfer yaradacaq güclü aparıcı tələb edir.",
          "Aparıcının əsas vəzifəsi sadəcə danışmaq deyil, auditoriya ilə əlaqə qurmaqdır. Mən qonaqların proqrama cəlb olunmasına və hörmətli ünsiyyətə xüsusi diqqət yetirirəm.",
          "Tədbiri yüksək səviyyədə aparacaq və düzgün atmosfer yaradacaq aparıcıya ehtiyacınız varsa, mənimlə əlaqə saxlayın.",
        ],
      },
    },
    privacyPage: {
      title: "Fərdi məlumatların emalı siyasəti",
      description: "Sayt ziyarətçilərinin fərdi məlumatlarının emalı siyasəti.",
      published: "Dərc tarixi: 14 aprel 2026",
      sections: [
        {
          title: "1. Ümumi müddəalar",
          paragraphs: [
            "Bu Siyasət kamrangadzhyev.com saytında əlaqə üçün müraciət göndərən ziyarətçilərin fərdi məlumatlarının emalı və qorunması qaydasını müəyyən edir.",
            "Siyasət Rusiya Federasiyasının fərdi məlumatlar haqqında qanunvericiliyi nəzərə alınmaqla hazırlanmışdır.",
          ],
        },
        {
          title: "2. Hansı məlumatlar emal olunur",
          paragraphs: [
            "Operator yalnız istifadəçinin müraciət formasında özü göstərdiyi məlumatları emal edir: ad və telefon nömrəsi.",
            "Sayt xüsusi kateqoriyalı fərdi məlumatların, biometrik və ya ödəniş məlumatlarının toplanması üçün nəzərdə tutulmayıb.",
          ],
        },
        {
          title: "3. Emal məqsədləri",
          paragraphs: [
            "Məlumatlar müraciətin qəbul edilməsi, göstərilən telefon nömrəsi ilə əlaqə saxlanması və tədbir detallarının dəqiqləşdirilməsi üçün emal olunur.",
            "Məlumatlar reklam göndərişləri üçün istifadə edilmir, saytda dərc olunmur və müstəqil istifadə üçün üçüncü şəxslərə ötürülmür.",
          ],
        },
        {
          title: "4. Məlumatların emalı qaydası",
          paragraphs: [
            "Forma göndərildikdən sonra müraciət VK-bota ötürülür və bot sayt sahibinə yeni müraciət haqqında bildiriş göndərir.",
            "VK-bot yalnız texniki bildiriş kanalı kimi istifadə olunur. Operator fərdi məlumatları satış, göndəriş və ya müraciətin emalı ilə bağlı olmayan məqsədlər üçün üçüncü şəxslərə ötürmür.",
          ],
        },
        {
          title: "5. İstifadəçinin hüquqları",
          paragraphs: [
            "İstifadəçi məlumatlarının emalı haqqında məlumat almaq, məlumatların dəqiqləşdirilməsini, bloklanmasını və ya silinməsini tələb etmək, həmçinin razılığını geri götürmək hüququna malikdir.",
          ],
        },
      ],
      contactPrefix: "Fərdi məlumatların operatoru: Kamran Hacıyev. Əlaqə:",
    },
  },
  en: {
    meta: {
      title: "Kamran Gadzhiev",
      description: "Professional event host",
    },
    common: {
      home: "Home",
      wedding: "Wedding",
      anniversary: "Anniversary",
      events: "Events",
      contacts: "Contacts",
      social: "Social networks",
      legal: "Legal information",
      privacy: "Personal data processing policy",
      copyright: "© 2026 Kamran Gadzhiev",
      menu: "Menu",
      closeNotification: "Close notification",
      backHome: "Back to home",
      notFoundTitle: "Page not found",
      notFoundText: "It may have been moved or permanently deleted.",
    },
    toast: {
      title: "Request sent successfully",
      text: "Please wait for a call or contact me at",
    },
    form: {
      title: "Let us begin creating your story",
      intro: "Leave a request, and I will contact you shortly",
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone number",
      phonePlaceholder: "+123456789000",
      consentFirst: "I consent to the processing",
      consentSecond: "of my personal data",
      submit: "Send request",
    },
    home: {
      heroTitle: "Kamran Gadzhiev",
      heroLead: "Majlis host.",
      heroLeadAccent: "Poet.",
      heroButton: "Step into the atmosphere",
      audioTitle: "Hear the rhythm of your celebration",
      audioText: "Original poems written exclusively about you.",
      play: "Play",
      pause: "Pause",
      fullscreen: "Fullscreen",
      skillsTitle: "Three facets of mastery",
      skills: [
        {
          icon: "/AuthorDramaturgyIcon.svg",
          label: "Authorial dramaturgy",
          description:
            "A script where every toast and every word become part of one theatrical line.",
        },
        {
          icon: "/LiteraryConferenceIcon.svg",
          label: "Literary hosting",
          description:
            "Fluent Azerbaijani and Russian hosting. Calm pacing, respect for pauses, etiquette and tone.",
        },
        {
          icon: "/InstantImprovisationIcon.svg",
          label: "Instant improvisation",
          description:
            "The art of answering moments with poetry. I turn spontaneous scenes of the evening into elegant poetic metaphors in front of the guests.",
        },
      ],
      previousSlide: "Previous slide",
      nextSlide: "Next slide",
      momentsTitle: "Moments frozen in words",
      momentSlide: "Show slide",
      poemTitle: "An event as a poem",
      poemAlt: "An event as a poem",
      poemText: [
        "A majlis is not just a celebration. It is a living text we write together. I believe every celebration carries a deep family story that deserves to be told beautifully.",
        "My foundation is theatre training and the gift of poetic improvisation. I do not use templates. I create a space where Azerbaijani traditions sound modern, intelligent and sincere.",
      ],
      poemQuote: "Your story deserves to become poetry.",
      readingTitle: "Poetry in sound",
      readingText: [
        "Poetry in every word is not just speech. It is the art of conveying feeling through intonation, timbre and subtle emotional shades.",
        "Let yourself feel the depth of sound, where every word becomes a sign of sincere respect for your guests and a reflection of your family values.",
      ],
      authorReading: "Author reading",
    },
    contactsPage: {
      title: "Contacts",
      description: "Contact details for Kamran Gadzhiev.",
      direct: "Direct contact",
      directText:
        "Write or call to discuss the date, format and details of your event.",
      socialText:
        "Follow performances and new work on social networks.",
    },
    pages: {
      wedding: {
        title: "Wedding majlis",
        metaTitle: "Wedding majlis — Kamran Gadzhiev",
        description: "Professional host for an Azerbaijani wedding and majlis",
        paragraphs: [
          "A wedding majlis is not just a celebration. It is an important part of Azerbaijani cultural tradition, filled with respect for family, guests and national customs.",
          "A host at an Azerbaijani wedding plays a key role: he guides the flow of the evening, interacts with guests, keeps the mood alive and honors the traditions.",
          "Azerbaijani weddings are known for their scale, many guests and rich program. A professional host knows how to connect with every guest and make the celebration memorable.",
          "When choosing a host for a wedding majlis, experience, the ability to work with a large audience and knowledge of cultural details matter most.",
        ],
      },
      anniversary: {
        title: "Anniversary and birthday",
        metaTitle: "Anniversary and birthday — Kamran Gadzhiev",
        description: "Professional host for anniversaries and birthdays",
        paragraphs: [
          "An anniversary or birthday is a special event that deserves to be celebrated brightly, warmly and at a high level.",
          "An anniversary host is not just a person with a microphone, but the person who shapes the mood of the whole event.",
          "A professional host removes the organizational pressure from the birthday person and their family. The evening flows smoothly and comfortably.",
          "A good host considers the client's wishes, event format, number of guests and the desired style of the celebration.",
          "A quality host is an investment in emotions, comfort and vivid memories that stay with you for years.",
        ],
      },
      events: {
        title: "Event",
        metaTitle: "Event — Kamran Gadzhiev",
        description: "Professional event host",
        quote:
          "Every event is an individual scenario, thought through down to the details.",
        paragraphs: [
          "Any event needs not only good preparation, but also a strong host who can set the right atmosphere, unite the guests and make the celebration memorable.",
          "The host's main task is not simply to speak, but to build contact with the audience. I pay special attention to guest involvement, a friendly atmosphere and respectful communication.",
          "If you need a host who can create the right atmosphere and lead your event at a high level, contact me.",
        ],
      },
    },
    privacyPage: {
      title: "Personal data processing policy",
      description: "Personal data processing policy for website visitors.",
      published: "Publication date: April 14, 2026",
      sections: [
        {
          title: "1. General provisions",
          paragraphs: [
            "This Policy defines how personal data of kamrangadzhyev.com visitors is processed and protected when they submit a request to contact Kamran Gadzhiev.",
            "The Policy has been prepared with regard to Russian Federal Law No. 152-FZ On Personal Data and applies to data received through the website forms.",
          ],
        },
        {
          title: "2. Data processed",
          paragraphs: [
            "The operator processes only the data the user provides in the request form: name and phone number.",
            "The website is not intended to collect special categories of personal data, biometric data, passport data, payment information or other excessive data.",
          ],
        },
        {
          title: "3. Processing purposes",
          paragraphs: [
            "Personal data is processed to receive the request, contact the user by the provided phone number, clarify event details and prepare a response.",
            "The data is not used for mass advertising mailings, is not published on the website and is not transferred to third parties for independent use.",
          ],
        },
        {
          title: "4. How data is processed",
          paragraphs: [
            "After the form is submitted, the request is sent to a VK bot, which notifies the website owner about the new request. The notification may include the user's name and phone number.",
            "The VK bot is used only as a technical delivery channel. The operator does not transfer personal data to third parties for sale, mailings or purposes unrelated to processing the request.",
          ],
        },
        {
          title: "5. User rights",
          paragraphs: [
            "The user may request information about the processing of their personal data, ask to correct, block or delete the data, and withdraw consent to processing.",
          ],
        },
      ],
      contactPrefix: "Personal data operator: Kamran Gadzhiev. Contact:",
    },
  },
} satisfies Record<Locale, Record<string, unknown>>;
