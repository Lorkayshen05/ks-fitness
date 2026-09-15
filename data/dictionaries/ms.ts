import type { Dictionary } from "@/data/dictionaries/en";

/** Bahasa Melayu. Mirrors the shape of `en`; typecheck enforces completeness. */
export const ms: Dictionary = {
  meta: {
    siteName: "Sokongan Rohingya",
    title: "Sokongan Rohingya — Cara disahkan untuk menyokong pelarian Rohingya di Malaysia",
    description:
      "Direktori bebas dan bukan transaksi bagi organisasi disahkan yang menyokong pelarian Rohingya di Malaysia. Derma diproses oleh organisasi itu sendiri, bukan oleh laman ini.",
    pages: {
      about: {
        title: "Mengenai platform ini",
        description:
          "Mengapa platform ini wujud, bagaimana organisasi disahkan, dan apa yang sengaja tidak kami lakukan.",
      },
      help: {
        title: "Cara membantu",
        description:
          "Cara kewangan dan bukan kewangan untuk menyokong pelarian Rohingya di Malaysia melalui organisasi yang disahkan.",
      },
      organizations: {
        title: "Organisasi disahkan",
        description:
          "Cari organisasi yang berkhidmat kepada pelarian Rohingya di Malaysia. Setiap pautan derma menuju ke saluran rasmi organisasi itu sendiri.",
      },
      impact: {
        title: "Impak dan angka",
        description:
          "Angka rasmi mengenai populasi pelarian Rohingya di Malaysia, setiap satu disertakan sumber asalnya.",
      },
      stories: {
        title: "Konteks dan penerangan",
        description:
          "Penerangan bersumber tentang sebab pelarian Rohingya berada di Malaysia dan makna hidup tanpa status perundangan.",
      },
      faq: {
        title: "Soalan lazim",
        description:
          "Cara platform ini berfungsi, ke mana derma pergi, bagaimana organisasi disahkan, dan cara data anda dikendalikan.",
      },
      contact: {
        title: "Hubungi dan sukarelawan",
        description:
          "Hantar pertanyaan umum atau daftarkan minat anda untuk menjadi sukarelawan dengan organisasi yang disahkan.",
      },
      privacy: {
        title: "Dasar privasi",
        description:
          "Apa yang dikumpul oleh platform ini, sebabnya, berapa lama disimpan, dan siapa yang boleh melihatnya.",
      },
      terms: {
        title: "Terma penggunaan",
        description: "Terma yang terpakai bagi penggunaan platform maklumat ini.",
      },
    },
  },

  common: {
    skipToContent: "Langkau ke kandungan",
    menu: "Menu",
    close: "Tutup",
    open: "Buka",
    loading: "Memuatkan…",
    readMore: "Baca lanjut",
    learnMore: "Ketahui lanjut",
    viewAll: "Lihat semua",
    back: "Kembali",
    source: "Sumber",
    lastUpdated: "Dikemas kini",
    published: "Diterbitkan",
    verified: "Disahkan",
    verifiedTitle: "Disemak terhadap sumber utama",
    unverified: "Menunggu pengesahan",
    unverifiedTitle: "Belum disemak terhadap sumber utama",
    externalLink: "Membuka laman web rasmi organisasi dalam tab baharu",
    empty: "Tiada apa-apa untuk dipaparkan lagi.",
    error: "Sesuatu telah berlaku. Sila cuba lagi.",
    retry: "Cuba lagi",
  },

  lang: { label: "Bahasa", switchTo: "Tukar bahasa" },

  nav: {
    home: "Utama",
    links: {
      about: "Mengenai",
      help: "Cara membantu",
      organizations: "Organisasi",
      impact: "Impak",
      stories: "Konteks",
      faq: "Soalan lazim",
      contact: "Hubungi",
    },
    legal: { privacy: "Privasi", terms: "Terma" },
    cta: "Cari organisasi",
  },

  home: {
    hero: {
      eyebrow: "Bebas · Malaysia · Bukan transaksi",
      title:
        "Sokongan untuk pelarian Rohingya di Malaysia, disalurkan hanya melalui organisasi yang disahkan.",
      subtitle:
        "Platform ini tidak mengutip wang. Ia membantu anda memahami keadaan sebenar, menemui organisasi yang pendaftaran dan saluran dermanya telah disemak, dan menghubungi mereka secara terus.",
      primary: "Lihat organisasi disahkan",
      secondary: "Fahami keadaannya",
      note: "Setiap pautan derma di laman ini membuka halaman derma rasmi organisasi berkenaan.",
    },
    mission: {
      eyebrow: "Pendekatan kami",
      title: "Tiga peraturan yang kami pegang",
      body:
        "Maklumat kemanusiaan gagal apabila ia dibesar-besarkan. Peraturan inilah yang memastikan platform ini boleh digunakan oleh mereka yang digambarkan di dalamnya, bukan hanya oleh pembaca.",
      points: {
        accurate: {
          title: "Setiap angka membawa sumbernya",
          body:
            "Setiap angka yang diterbitkan di sini menyatakan asalnya dan tarikh ia terakhir disemak. Angka yang tidak boleh disandarkan kepada sumber tidak diterbitkan.",
        },
        verified: {
          title: "Organisasi disemak, bukan sekadar disenaraikan",
          body:
            "Sesebuah organisasi hanya ditanda sebagai disahkan apabila butiran pendaftaran dan saluran derma rasminya telah disemak terhadap sumber utama.",
        },
        consent: {
          title: "Tiada individu rekaan",
          body:
            "Platform ini menerbitkan penerangan berkonteks, bukan testimoni peribadi. Tiada individu bernama dipaparkan tanpa keizinan bermaklumat yang didokumenkan — maka buat masa ini tiada seorang pun.",
        },
      },
    },
    help: {
      eyebrow: "Cara membantu",
      title: "Wang hanyalah satu pilihan antara beberapa",
      body:
        "Kesukarelawanan, pengambilan pekerja, pengajaran dan sumbangan barangan memenuhi keperluan yang tidak dapat dipenuhi oleh wang tunai sahaja. Setiap laluan di bawah membawa kepada langkah seterusnya yang nyata.",
    },
    organizations: {
      eyebrow: "Direktori",
      title: "Organisasi disahkan",
      body:
        "Organisasi yang berkhidmat kepada komuniti Rohingya dan pelarian lain di Malaysia. Cari direktori penuh untuk menapis mengikut nama atau bidang tumpuan.",
    },
    impact: {
      eyebrow: "Angka",
      title: "Skala, seperti yang dilaporkan",
      body:
        "Ini ialah angka yang diterbitkan oleh agensi yang mengumpulnya — bukan anggaran platform ini.",
    },
    stories: {
      eyebrow: "Konteks",
      title: "Latar belakang yang wajar dibaca dahulu",
      body:
        "Penerangan ringkas dan bersumber tentang bagaimana keadaan ini terbentuk dan maknanya dalam kehidupan seharian di Malaysia.",
    },
    faq: {
      eyebrow: "Soalan",
      title: "Tiga soalan yang paling kerap ditanya",
      body: "Senarai penuh ada di halaman soalan lazim.",
    },
    cta: {
      title: "Pilih langkah seterusnya",
      body:
        "Pilih sebuah organisasi dan derma terus melalui saluran mereka sendiri, atau beritahu kami bagaimana anda ingin menjadi sukarelawan dan kami akan menyampaikannya.",
      primary: "Lihat organisasi",
      secondary: "Daftar sebagai sukarelawan",
    },
  },

  about: {
    title: "Mengenai platform ini",
    intro:
      "Sokongan Rohingya ialah platform maklumat bebas mengenai pelarian Rohingya di Malaysia. Ia bukan badan amal, bukan ejen kepada mana-mana organisasi yang disenaraikan, dan tidak mengendalikan derma.",
    sections: {
      context: {
        title: "Mengapa pelarian Rohingya berada di Malaysia",
        body: [
          "Rohingya ialah kumpulan etnik majoriti Muslim dari Negeri Rakhine, Myanmar. Undang-undang Kewarganegaraan Myanmar 1982 tidak memasukkan mereka dalam senarai kumpulan kebangsaan yang diiktiraf, menyebabkan kebanyakan Rohingya menjadi tanpa negara — tiada kewarganegaraan di negara tempat mereka dilahirkan.",
          "Gelombang perpindahan berulang, terutamanya operasi tentera di Negeri Rakhine mulai Ogos 2017, mendorong ratusan ribu orang melintasi sempadan. Bangladesh menempatkan populasi terpindah terbesar; Malaysia pula menjadi salah satu destinasi lanjutan utama di Asia Tenggara.",
        ],
      },
      status: {
        title: "Kedudukan perundangan mereka di Malaysia",
        body: [
          "Malaysia bukan pihak kepada Konvensyen Pelarian 1951 atau Protokol 1967, dan tiada perundangan domestik yang memberikan status pelarian. Mereka yang diiktiraf sebagai pelarian oleh UNHCR selama ini didokumenkan oleh UNHCR dan bukan oleh undang-undang Malaysia, bermakna tiada hak bekerja secara rasmi, tiada akses ke sekolah kerajaan, dan tiada kadar penjagaan kesihatan awam bersubsidi.",
          "Pada 2026, kerajaan Malaysia mula memperkenalkan sistem Dokumen Pendaftaran Pelarian (DPP) sendiri dan, pada Julai 2026, mengarahkan UNHCR menghentikan sementara pendaftaran baharu sepanjang peralihan itu. Organisasi hak asasi manusia termasuk Human Rights Watch, Amnesty International Malaysia dan Fortify Rights telah membangkitkan kebimbangan tentang jurang perlindungan sepanjang peralihan tersebut. Keadaan ini masih berubah; semak sumber utama yang dipetik di halaman Impak sebelum bergantung kepada mana-mana gambaran mengenainya, termasuk yang ini.",
        ],
      },
      platform: {
        title: "Apa yang platform ini lakukan",
        body: [
          "Ia menerangkan keadaan menggunakan bahan bersumber, menyenaraikan organisasi yang pendaftaran dan saluran derma rasminya telah disemak, dan menyalurkan pertanyaan sukarelawan serta hubungan kepada pengendali platform.",
          "Ia tidak memproses pembayaran, tidak mengambil peratusan, tidak memegang dana, dan tidak memindahkan wang bagi pihak sesiapa. Memilih pautan derma akan membawa anda ke laman web organisasi itu sendiri, di mana terma dan pemproses pembayaran organisasi tersebut terpakai.",
        ],
      },
      language: {
        title: "Cara kami menulis tentang manusia",
        body: [
          "Komuniti pelarian kerap digambarkan sama ada melalui belas kasihan atau syak wasangka. Kedua-duanya memesongkan. Platform ini menggambarkan keadaan — ketiadaan kewarganegaraan, ketiadaan hak bekerja, halangan persekolahan — dan bukannya melabel sesuatu populasi, serta tidak mengaitkan perbuatan individu dengan sesuatu kumpulan etnik.",
          "Gambar individu yang boleh dikenal pasti dalam keadaan tertekan tidak digunakan. Kisah peribadi tidak diterbitkan tanpa keizinan bermaklumat yang didokumenkan daripada orang berkenaan, sebab itulah bahagian Konteks buat masa ini memuatkan penerangan dan bukan testimoni.",
        ],
      },
      limits: {
        title: "Apa yang platform ini bukan",
        body: [
          "Ia bukan nasihat guaman, dan ia tidak boleh mendaftarkan sesiapa sebagai pelarian, campur tangan dalam kes tahanan, atau mewakili sesiapa di hadapan pihak berkuasa. UNHCR Malaysia dan penyedia bantuan guaman berlesen ialah hubungan pertama yang sesuai bagi keperluan tersebut.",
          "Penyenaraian sesebuah organisasi bukan pengesahan terhadap setiap aktivitinya, dan pengesahan merekodkan semakan pada satu tarikh — ia bukan jaminan berterusan. Jika anda percaya sesuatu catatan itu salah atau sudah lapuk, sila maklumkan kepada kami melalui borang hubungan.",
        ],
      },
    },
  },

  help: {
    title: "Cara membantu",
    intro:
      "Setiap laluan di bawah berakhir di tempat yang nyata — halaman derma rasmi sesebuah organisasi, pertanyaan sukarelawan yang sampai kepada manusia sebenar, atau bahan yang wajar dibaca sebelum bertindak.",
    ways: {
      donate: {
        title: "Derma melalui organisasi disahkan",
        body:
          "Pilih sebuah organisasi dan derma di halaman rasminya sendiri. Platform ini tidak sekali-kali mengendalikan transaksi, jadi anda dilindungi oleh terma resit dan bayaran balik organisasi tersebut, bukan terma kami.",
        action: "Lihat organisasi",
      },
      volunteer: {
        title: "Sumbangkan masa anda",
        body:
          "Pusat pembelajaran komuniti, klinik dan program bantuan memerlukan guru, penterjemah, sukarelawan perubatan, pemandu dan kakitangan pentadbiran. Beritahu kami apa yang boleh anda tawarkan dan kami akan menyalurkannya kepada organisasi yang memerlukan.",
        action: "Daftarkan minat anda",
      },
      educate: {
        title: "Fahami sebelum bertindak",
        body:
          "Bantuan berniat baik yang dibina atas salah faham hanya menambah kerja kepada mereka yang sepatutnya dibantu. Bahagian konteks merangkumi asasnya dalam kira-kira sepuluh minit.",
        action: "Baca penerangan",
      },
      employ: {
        title: "Tawarkan kerja atau latihan",
        body:
          "Pelarian di Malaysia tiada hak bekerja secara rasmi, menjadikan setiap latihan kemahiran, perantisan atau kerjasama menjana pendapatan yang sah amat bernilai. Majikan dan pelatih boleh menghubungi kami melalui borang hubungan.",
        action: "Hubungi kami",
      },
      goods: {
        title: "Derma barangan dan peralatan",
        body:
          "Pusat pembelajaran dan klinik menerbitkan senarai keperluan semasa mereka sendiri — biasanya alat tulis, pakaian, makanan tidak mudah rosak atau bekalan perubatan. Semak halaman organisasi sebelum menghantar apa-apa, kerana barangan yang tidak diminta membebankan ruang simpanan mereka.",
        action: "Cari organisasi",
      },
      advocate: {
        title: "Bercakap mengenainya dengan tepat",
        body:
          "Perbualan awam tentang pelarian di Malaysia sering dibentuk oleh dakwaan tanpa sumber. Membetulkan satu angka dalam kalangan anda sendiri, berserta sumbernya, adalah kerja yang kecil tetapi nyata.",
        action: "Lihat sumber",
      },
    },
  },

  organizations: {
    title: "Organisasi disahkan",
    intro:
      "Organisasi yang menyokong komuniti Rohingya dan pelarian lain di Malaysia. Pautan derma membuka halaman rasmi organisasi itu sendiri dalam tab baharu.",
    searchLabel: "Cari organisasi",
    searchPlaceholder: "Cari mengikut nama atau bidang…",
    filterLabel: "Pengesahan",
    filterAll: "Semua organisasi",
    filterVerified: "Yang disahkan sahaja",
    apply: "Cari",
    reset: "Kosongkan",
    resultsOne: "1 organisasi",
    resultsMany: "{count} organisasi",
    emptyTitle: "Tiada organisasi sepadan dengan carian itu",
    emptyBody:
      "Cuba kata kunci yang lebih pendek, atau kosongkan penapis untuk melihat direktori penuh.",
    visit: "Lawati laman web",
    donate: "Derma",
    details: "Butiran",
    disclaimer:
      "Platform ini tidak bergabung dengan organisasi yang disenaraikan dan tidak menerima sebarang bahagian daripada derma.",
  },

  organization: {
    backToList: "Semua organisasi",
    aboutHeading: "Mengenai organisasi ini",
    linksHeading: "Saluran rasmi",
    website: "Laman web rasmi",
    donation: "Halaman derma rasmi",
    verifiedOn: "Pengesahan terakhir disemak",
    notice:
      "Derma dibuat di laman web organisasi itu sendiri, di bawah terma dan pemproses pembayarannya. Sokongan Rohingya tidak menerima, memegang atau memindahkan sebarang dana.",
    notFound: "Organisasi itu tiada dalam direktori.",
  },

  donate: {
    trigger: "Derma",
    title: "Anda akan meninggalkan laman ini",
    body:
      "Derma diproses oleh organisasi, bukan oleh platform ini. Pautan di bawah membuka halaman derma rasmi mereka dalam tab baharu.",
    checklistTitle: "Sebelum anda teruskan",
    checklist: [
      "Pastikan alamat dalam pelayar anda sepadan dengan domain rasmi organisasi tersebut.",
      "Simpan resit yang dikeluarkan oleh organisasi — platform ini tidak boleh mengaksesnya.",
      "Pelepasan cukai bergantung pada status organisasi itu, bukan pada platform ini.",
    ],
    confirm: "Teruskan ke {name}",
    cancel: "Kekal di sini",
    unverifiedWarning:
      "Saluran derma organisasi ini belum disahkan terhadap sumber utama. Sila sahkan sendiri sebelum menderma.",
  },

  impact: {
    title: "Impak dan angka",
    intro:
      "Angka yang diterbitkan oleh agensi yang mengumpulnya. Setiap satu menyatakan sumbernya dan tarikh ia terakhir disemak di sini. Platform ini tidak menerbitkan sebarang anggaran sendiri.",
    sourceNote:
      "Sumber dipaparkan sebagaimana diterbitkan. Jika sesuatu angka telah berubah sejak ia direkodkan, pautan sumber itulah yang berautoriti, bukan halaman ini.",
    emptyTitle: "Tiada angka diterbitkan",
    emptyBody: "Angka akan muncul di sini setelah ia disandarkan kepada sumber utama.",
    caveatTitle: "Mengapa tiada jumlah derma atau hasil di sini",
    caveatBody:
      "Platform ini tidak memproses derma dan tidak menjalankan program, jadi ia tiada jumlah derma atau hasil penerima manfaat sendiri untuk dilaporkan. Menerbitkan angka yang tidak dapat disahkan ialah tepat kegagalan yang bahagian ini wujud untuk dielakkan.",
  },

  stories: {
    title: "Konteks dan penerangan",
    intro:
      "Tulisan ringkas dan bersumber tentang bagaimana keadaan ini terbentuk dan maknanya dalam praktik. Setiap satu menyenaraikan sumbernya di penghujung.",
    editorialTitle: "Nota tentang kisah peribadi",
    editorialBody:
      "Kisah peribadi berkuasa dan mudah disalahgunakan. Platform ini tidak menerbitkan kisah seseorang tanpa keizinan bermaklumat yang didokumenkan serta hak untuk menariknya balik, dan ia tidak sekali-kali mereka-reka kisah. Sementara kisah yang diizinkan belum tersedia, bahagian ini memuatkan konteks dan bukan testimoni.",
    emptyTitle: "Belum ada tulisan diterbitkan",
    emptyBody: "Penerangan akan muncul di sini setelah ditulis dan disandarkan kepada sumber.",
    backToList: "Semua tulisan konteks",
    notFound: "Tulisan itu tidak diterbitkan.",
  },

  faq: {
    title: "Soalan lazim",
    intro: "Bagaimana platform ini berfungsi, dan apa yang sengaja tidak kami lakukan.",
    items: {
      "who-runs": {
        q: "Siapa yang mengendalikan platform ini?",
        a: "Ia sebuah projek maklumat bebas yang dibina oleh sukarelawan dan bertumpu kepada Malaysia. Ia bukan badan amal berdaftar, bukan badan kerajaan, dan bukan ejen kepada mana-mana organisasi yang disenaraikan. Ia tiada lesen pungutan derma dan tidak memohonnya, kerana ia tidak memungut derma.",
      },
      "where-money-goes": {
        q: "Ke mana derma saya pergi?",
        a: "Terus kepada organisasi yang anda pilih, di laman web mereka sendiri, melalui pemproses pembayaran mereka sendiri. Platform ini tidak pernah melihat transaksi tersebut, tidak mengambil peratusan, dan tidak boleh mengakses resit anda. Kami juga tidak mendakwa wang itu sampai kepada mana-mana individu tertentu — organisasi memperuntukkan dana mengikut program mereka sendiri.",
      },
      "how-verified": {
        q: "Apakah maksud lencana disahkan?",
        a: "Bahawa pada tarikh yang dipaparkan, butiran pendaftaran organisasi tersebut dan URL derma yang disenaraikan di sini telah disemak terhadap sumber utama — laman rasmi organisasi itu sendiri atau daftar awam. Ia rekod semakan pada satu tarikh, bukan jaminan berterusan tentang tingkah laku, kemampuan kewangan atau kualiti program.",
      },
      "why-no-payments": {
        q: "Mengapa tidak terus terima derma di sini?",
        a: "Memungut derma bagi pihak orang lain menimbulkan kewajipan pelesenan pungutan, perakaunan amanah dan bayaran balik, serta menyelitkan orang tengah yang tidak perlu antara anda dan organisasi. Menghantar anda terus kepada sumbernya lebih selamat dan lebih jujur tentang siapa yang bertanggungjawab.",
      },
      "legal-status": {
        q: "Adakah pelarian Rohingya mempunyai status perundangan di Malaysia?",
        a: "Malaysia bukan pihak kepada Konvensyen Pelarian 1951 dan tiada undang-undang pelarian domestik, jadi pengiktirafan selama ini datang daripada UNHCR dan bukan daripada statut Malaysia. Ini bermakna tiada hak bekerja secara rasmi, tiada tempat di sekolah kerajaan dan tiada kadar penjagaan kesihatan bersubsidi. Sistem Dokumen Pendaftaran Pelarian (DPP) kerajaan mula dilaksanakan pada 2026 dan keadaan masih berubah — semak sumber di halaman Impak dan jangan bergantung pada ringkasan.",
      },
      "volunteer-requirements": {
        q: "Apa yang saya perlukan untuk menjadi sukarelawan?",
        a: "Ia bergantung sepenuhnya kepada organisasi. Peranan mengajar dan menterjemah biasanya menuntut komitmen mingguan yang tetap dan bukan kelayakan khusus; peranan perubatan dan guaman memerlukan kelayakan yang berkaitan. Sesetengah organisasi menuntut pemeriksaan latar belakang bagi peranan yang melibatkan kanak-kanak. Hantarkan kepada kami apa yang boleh anda tawarkan dan kami akan menyalurkannya kepada organisasi yang keperluannya sepadan.",
      },
      "data-handling": {
        q: "Apa yang berlaku kepada apa yang saya hantar?",
        a: "Nama, e-mel, mesej dan jenis pertanyaan anda disimpan pada pelayan platform ini supaya seseorang dapat membalas dan, jika berkaitan, merujuk anda kepada sesebuah organisasi. Apa yang anda hantar tidak diterbitkan, tidak dijual, dan tidak digunakan untuk pengiklanan. Butiran penuh ada dalam dasar privasi.",
      },
      "report-problem": {
        q: "Satu catatan kelihatan salah. Apa patut saya buat?",
        a: "Sila maklumkan kepada kami melalui borang hubungan, berserta sumber jika ada. Penyenaraian yang didapati tidak tepat akan dibetulkan atau dibuang; organisasi yang butirannya tidak lagi dapat disahkan akan kehilangan lencana disahkan sehingga ia dapat disahkan semula.",
      },
    },
  },

  contact: {
    title: "Hubungi dan sukarelawan",
    intro:
      "Gunakan borang ini untuk pertanyaan umum, pembetulan, atau untuk mendaftarkan minat menjadi sukarelawan. Ia sampai kepada pengendali platform ini — bukan terus kepada organisasi.",
    responseTitle: "Apa yang boleh dijangka",
    responseBody:
      "Ini projek yang dikendalikan sukarelawan, jadi balasan tidak serta-merta. Perkara perlindungan yang mendesak patut dibawa terus kepada UNHCR Malaysia atau penyedia bantuan guaman berlesen, bukan melalui borang ini.",
    urgentTitle: "Jika perkara itu mendesak",
    urgentBody:
      "Platform ini tidak boleh campur tangan dalam kes tahanan, pengusiran atau pendaftaran. Hubungi UNHCR Malaysia atau organisasi bantuan guaman berlesen secara terus.",
  },

  form: {
    nameLabel: "Nama anda",
    namePlaceholder: "Nama penuh",
    emailLabel: "Alamat e-mel",
    emailPlaceholder: "anda@contoh.com",
    typeLabel: "Mengenai apa mesej ini?",
    types: { general: "Pertanyaan umum", volunteer: "Kesukarelawanan" },
    messageLabel: "Mesej",
    messagePlaceholderGeneral: "Beritahu kami keperluan anda, atau apa yang kami tersilap.",
    messagePlaceholderVolunteer:
      "Apa yang boleh anda tawarkan, dan lebih kurang berapa banyak masa? Sertakan kemahiran atau kelayakan yang berkaitan.",
    submit: "Hantar mesej",
    submitting: "Menghantar…",
    required: "Wajib",
    privacyNote:
      "Menghantar borang ini menyimpan nama, e-mel dan mesej anda pada pelayan kami supaya kami boleh membalas. Lihat dasar privasi.",
    feedback: {
      success: "Terima kasih — mesej anda telah diterima. Kami akan membalas melalui e-mel.",
      error: "Mesej anda tidak dapat dihantar. Sila semak medan di bawah dan cuba lagi.",
      rateLimited: "Itu beberapa mesej dalam masa singkat. Sila tunggu seminit dan cuba lagi.",
      server: "Sesuatu telah berlaku di pihak kami. Sila cuba lagi sebentar nanti.",
    },
    errors: {
      nameRequired: "Sila masukkan nama anda.",
      nameTooLong: "Sila pastikan nama anda kurang daripada 100 aksara.",
      emailRequired: "Sila masukkan alamat e-mel anda.",
      emailInvalid: "Itu tidak kelihatan seperti alamat e-mel.",
      emailTooLong: "Sila gunakan alamat e-mel kurang daripada 200 aksara.",
      messageRequired: "Sila tulis mesej.",
      messageTooShort: "Sila tulis sekurang-kurangnya 10 aksara supaya kami boleh bertindak.",
      messageTooLong: "Sila pastikan mesej anda kurang daripada 4,000 aksara.",
      typeInvalid: "Sila pilih mengenai apa mesej anda.",
    },
  },

  legal: {
    updated: "Terakhir disemak",
    privacy: {
      title: "Dasar privasi",
      intro:
        "Platform ini mengumpul sesedikit yang mungkin. Ia tiada analitis, tiada pengiklanan, tiada piksel penjejak dan tiada skrip pihak ketiga.",
      sections: {
        collect: {
          title: "Apa yang kami kumpul",
          body: [
            "Apabila anda menghantar borang hubungan atau sukarelawan: nama, alamat e-mel, mesej dan jenis pertanyaan yang anda berikan.",
            "Pilihan bahasa, disimpan dalam kuki pihak pertama supaya laman dipaparkan dalam bahasa yang anda pilih. Ia mengandungi kod bahasa sahaja.",
            "Log permintaan pelayan biasa yang disimpan oleh penyedia hos. Platform ini tidak menambah sebarang analitis atau penjejakan sendiri.",
          ],
        },
        use: {
          title: "Mengapa kami menggunakannya",
          body: [
            "Untuk membalas anda, dan — jika anda menawarkan diri sebagai sukarelawan atau menawarkan kerja — untuk merujuk pertanyaan anda kepada organisasi yang keperluannya sepadan.",
            "Untuk mengenakan had anti-spam asas, yang melibatkan pengiraan penghantaran terkini bagi setiap alamat rangkaian untuk tempoh yang singkat.",
          ],
        },
        retain: {
          title: "Berapa lama kami menyimpannya",
          body: [
            "Penghantaran disimpan selama yang diperlukan untuk mengendalikan pertanyaan dan susulannya, dan dipadam apabila diminta.",
            "Pembilang anti-spam disimpan dalam memori sahaja dan dibuang dalam masa beberapa minit.",
          ],
        },
        share: {
          title: "Siapa lagi yang melihatnya",
          body: [
            "Tiada sesiapa, melainkan rujukan pertanyaan anda memerlukannya — dan ketika itu hanya organisasi berkenaan, hanya dengan butiran yang diperlukan, dan hanya bagi pertanyaan kesukarelawanan, pekerjaan atau barangan yang anda hantar untuk tujuan itu.",
            "Kami tidak menjual, menyewakan atau memperdagangkan penghantaran, dan kami tidak menggunakannya untuk pengiklanan.",
          ],
        },
        rights: {
          title: "Pilihan anda",
          body: [
            "Anda boleh bertanya apa yang kami simpan tentang anda, meminta ia dibetulkan, atau meminta ia dipadam, dengan menulis kepada kami melalui borang hubungan.",
            "Mengikuti pautan derma membawa anda kepada pihak ketiga. Setibanya di sana, dasar privasi organisasi itulah yang terpakai — bukan dasar ini.",
          ],
        },
        cookies: {
          title: "Kuki",
          body: [
            "Satu kuki sahaja ditetapkan: pilihan bahasa anda. Ia pihak pertama, mengandungi kod bahasa sahaja, dan luput selepas setahun.",
            "Tiada kuki pengiklanan atau analitis, jadi tiada sepanduk keizinan untuk ditutup.",
          ],
        },
      },
    },
    terms: {
      title: "Terma penggunaan",
      intro:
        "Menggunakan laman ini bermakna menerima terma di bawah. Ia ringkas kerana platform ini melakukan sangat sedikit bagi pihak anda.",
      sections: {
        purpose: {
          title: "Apa perkhidmatan ini",
          body: [
            "Sebuah direktori maklumat mengenai organisasi yang menyokong pelarian Rohingya di Malaysia, diterbitkan untuk manfaat awam.",
            "Ia bukan nasihat guaman, perubatan, imigresen atau kewangan, dan ia bukan pengganti kepada menghubungi UNHCR Malaysia atau penyedia berlesen.",
          ],
        },
        "no-payments": {
          title: "Tiada pemprosesan pembayaran",
          body: [
            "Platform ini tidak memungut, memegang, memindahkan atau membayar balik derma, dan tidak mengambil sebarang komisen.",
            "Pautan derma menuju ke laman web pihak ketiga. Sebarang derma yang anda buat ialah kontrak antara anda dan organisasi tersebut, tertakluk kepada terma dan pemproses pembayarannya.",
          ],
        },
        accuracy: {
          title: "Ketepatan dan pengesahan",
          body: [
            "Kandungan diterbitkan dengan niat baik daripada sumber yang dinyatakan pada halaman, tetapi keadaan berubah dan sumber disemak semula. Sentiasa semak sumber yang dipetik sebelum bergantung pada sesuatu angka.",
            "Lencana disahkan merekodkan semakan yang dibuat pada tarikh yang dinyatakan terhadap sumber utama. Ia bukan pengesahan sokongan, bukan jaminan tingkah laku dan bukan jaminan kedudukan kewangan.",
          ],
        },
        conduct: {
          title: "Penggunaan yang boleh diterima",
          body: [
            "Jangan gunakan borang untuk menghantar penderaan, spam, perisian hasad atau pemasaran pukal, dan jangan cuba mengganggu perkhidmatan atau mengakses data yang bukan milik anda.",
            "Penghantaran yang melanggar perkara ini akan dipadam, dan akses boleh disekat.",
          ],
        },
        liability: {
          title: "Liabiliti",
          body: [
            "Laman ini disediakan sebagaimana adanya. Setakat yang dibenarkan undang-undang, pengendali tidak bertanggungan atas kerugian yang timbul daripada penggunaan laman ini atau daripada urusan dengan organisasi pihak ketiga yang ditemui melaluinya.",
            "Tiada apa-apa di sini yang mengehadkan liabiliti yang tidak boleh dihadkan secara sah.",
          ],
        },
        changes: {
          title: "Perubahan",
          body: [
            "Terma ini boleh dikemas kini; tarikh semakan di bahagian atas halaman ini menunjukkan bila ia terakhir dikemas kini.",
            "Terus menggunakan laman ini selepas sesuatu perubahan bermakna menerima terma yang disemak semula.",
          ],
        },
      },
    },
  },

  notFound: {
    title: "Halaman tidak dijumpai",
    body: "Halaman itu tidak wujud, atau telah dipindahkan. Bahagian utama dipautkan di bawah.",
    cta: "Kembali ke laman utama",
  },

  footer: {
    blurb:
      "Platform maklumat bebas mengenai sokongan kepada pelarian Rohingya di Malaysia. Bukan badan amal, dan bukan pemproses pembayaran.",
    exploreHeading: "Terokai",
    legalHeading: "Perundangan",
    disclaimerHeading: "Penting",
    disclaimer:
      "Sokongan Rohingya tidak memungut derma. Setiap pautan derma membuka halaman rasmi organisasi yang disenaraikan, di mana organisasi itu bertanggungjawab sepenuhnya untuk memproses, mengeluarkan resit dan memperuntukkan sumbangan anda.",
    rights:
      "Diterbitkan untuk manfaat awam. Kandungan boleh diguna semula dengan pengiktirafan kepada sumber asalnya.",
  },
};
