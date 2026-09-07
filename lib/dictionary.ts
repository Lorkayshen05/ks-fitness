/**
 * Bilingual (English / 简体中文) copy deck for the KS Fitness landing page.
 *
 * The dictionary is a plain object rather than an async loader so it can be
 * imported directly into a client component: the copy ships in the bundle and
 * the language toggle swaps strings with zero network round-trips and zero
 * hydration mismatch (server and client render the same default locale).
 */

export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Label shown on the navbar toggle: it names the language you switch *to*. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export const dictionary = {
  en: {
    meta: {
      title: "KS Fitness — Train Hard. Live Strong.",
      description:
        "Premium strength, conditioning and personal training in the heart of the city. Claim your 7-day free pass at KS Fitness.",
    },
    classTypes: {
      strength: "Strength & Powerlifting",
      hiit: "HIIT & Conditioning",
      yoga: "Yoga & Mobility",
      spin: "Spin & Endurance",
      boxing: "Boxing & Martial Arts",
    },
    levels: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    nav: {
      brand: "KS FITNESS",
      links: {
        home: "Home",
        schedule: "Schedule",
        trainers: "Trainers",
        gallery: "Gallery",
        pricing: "Pricing",
      },
      cta: "Claim Free Pass",
      toggleAria: "Switch language to Chinese",
      menuAria: "Toggle navigation menu",
    },
    hero: {
      badge: "Now open · 24/7 access",
      titleLead: "Train Hard.",
      titleAccent: "Live Strong.",
      subtitle:
        "Olympic platforms, competition-grade equipment and coaches who actually program for you. KS Fitness is built for people who show up.",
      primaryCta: "Claim Your 7-Day Free Pass",
      secondaryCta: "Calculate Your Goal",
      stats: [
        { value: "2,400+", label: "Active members" },
        { value: "45", label: "Weekly classes" },
        { value: "18", label: "Certified coaches" },
        { value: "24/7", label: "Door access" },
      ],
    },
    calculator: {
      eyebrow: "Goal Planner",
      title: "Fitness & Calorie Goal Calculator",
      subtitle:
        "Estimate your monthly calorie burn and how long it takes to reach your target weight. Numbers update as you type.",
      fields: {
        weight: "Current weight (kg)",
        target: "Target weight (kg)",
        age: "Age",
        sessions: "Sessions per week",
        duration: "Minutes per session",
        intensity: "Training intensity",
      },
      intensities: {
        light: "Light — steady cardio & mobility",
        moderate: "Moderate — classes & circuits",
        intense: "Intense — HIIT & heavy lifting",
      },
      results: {
        perSession: "Burn per session",
        monthly: "Monthly calorie burn",
        weeks: "Weeks to target",
        weeklyLoss: "Projected weekly change",
        kcal: "kcal",
        kg: "kg",
        weeks_unit: "weeks",
        perWeek: "kg / week",
        sessionsUnit: "×",
        minutesUnit: "min",
        date: "Estimated arrival",
      },
      atGoal: "You are already at your target weight — time to set a new one.",
      gaining:
        "Your target is above your current weight. Pair these sessions with a calorie surplus to build mass.",
      aggressive:
        "That pace is faster than 1 kg per week. Our coaches will help you set a safer timeline.",
      disclaimer:
        "Estimates only, based on MET values and a 7,700 kcal-per-kg energy deficit. Not medical advice.",
      cta: "Book a free consult",
    },
    pricing: {
      eyebrow: "Membership",
      title: "Pick Your Level",
      subtitle: "No lock-in on monthly plans. Cancel any time, no questions asked.",
      monthly: "Monthly",
      annual: "Annual",
      annualBadge: "Save 20%",
      perMonth: "/mo",
      perMonthAnnual: "/mo, billed annually",
      free: "Free",
      popular: "Most popular",
      plans: {
        trial: {
          name: "Trial Pass",
          tagline: "Test the floor for a full week.",
          cta: "Start free",
          features: [
            "7 days of full gym access",
            "One group class of your choice",
            "Guided facility walkthrough",
            "InBody composition scan",
          ],
        },
        allAccess: {
          name: "All-Access",
          tagline: "The everyday membership for consistent training.",
          cta: "Join All-Access",
          features: [
            "24/7 access to every KS location",
            "Unlimited group classes",
            "Sauna, recovery lounge & towel service",
            "Quarterly progress check-ins",
            "Bring a guest twice a month",
          ],
        },
        vip: {
          name: "VIP Personal Training",
          tagline: "A dedicated coach and a program written for you.",
          cta: "Apply for VIP",
          features: [
            "Everything in All-Access",
            "8 one-on-one coaching sessions a month",
            "Custom programming & nutrition plan",
            "Priority class and equipment booking",
            "Monthly body composition review",
            "Direct line to your coach",
          ],
        },
      },
    },
    lead: {
      eyebrow: "7-Day Free Pass",
      title: "Your First Week Is On Us",
      subtitle:
        "Tell us how you like to train and we will have a pass and a coach waiting at the front desk.",
      fields: {
        name: "Full name",
        email: "Email address",
        classType: "Preferred class type",
      },
      placeholders: {
        name: "Alex Chan",
        email: "you@example.com",
        classType: "Choose a class",
      },
      submit: "Claim My Free Pass",
      submitting: "Sending…",
      successTitle: "You're in!",
      successBody:
        "Check your inbox — your 7-day pass and onboarding details are on the way.",
      resetCta: "Register someone else",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        classType: "Pick the class you'd like to start with.",
      },
      privacy: "No spam. We email you the pass and nothing else.",
    },
    schedule: {
      meta: {
        title: "Class Schedule & Booking — KS Fitness",
        description:
          "Browse the KS Fitness weekly timetable, filter by discipline, level or coach, and reserve your spot in seconds.",
      },
      eyebrow: "Timetable",
      title: "Book Your Week",
      subtitle:
        "Forty-five classes a week across five disciplines. Filter the grid, grab a spot, and we will hold it until ten minutes before the door closes.",
      filters: {
        type: "Discipline",
        level: "Level",
        trainer: "Coach",
        all: "All",
        clear: "Clear filters",
        showing: "Showing {shown} of {total} classes",
      },
      noResults: {
        title: "No classes match those filters",
        body: "Try widening the discipline or level, or clear the filters to see the full week.",
      },
      dayNames: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      dayShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      minutes: "min",
      withCoach: "with",
      spotsLeft: "{n} spots left",
      oneSpotLeft: "1 spot left",
      full: "Class full",
      waitlist: "Join waitlist",
      book: "Book",
      booked: "Booked",
      cancel: "Cancel booking",
      yourBookings: "Your bookings",
      noBookings: "You have not booked anything yet this week.",
      booking: {
        title: "Reserve your spot",
        nameLabel: "Full name",
        emailLabel: "Email address",
        namePlaceholder: "Alex Chan",
        emailPlaceholder: "you@example.com",
        confirm: "Confirm booking",
        confirming: "Reserving…",
        close: "Close",
        successTitle: "Spot reserved",
        successBody: "We have emailed you the details. See you on the floor.",
        done: "Done",
        errors: {
          name: "Please enter your name.",
          email: "Please enter a valid email address.",
        },
      },
      legend: "Colour indicates discipline",
      note: "Bookings are stored in this browser for the demo. Wire the confirm handler to your booking system to go live.",
    },

    trainers: {
      meta: {
        title: "Meet the Coaches — KS Fitness",
        description:
          "Eighteen certified coaches across strength, conditioning, yoga, spin and boxing. Find the one who fits how you train.",
      },
      eyebrow: "The Team",
      title: "Coaches Who Program For You",
      subtitle:
        "Every KS coach holds an accredited certification and writes individual programming. Filter by discipline to find your fit.",
      filterAll: "All disciplines",
      viewProfile: "View profile",
      backToAll: "All coaches",
      years: "Years coaching",
      clients: "Members coached",
      specialties: "Specialties",
      certifications: "Certifications",
      teaches: "Classes this week",
      classCount: "{n} classes this week",
      noClasses: "No scheduled classes this week — available for one-to-one sessions.",
      bookWith: "Book a session",
      seeSchedule: "See full schedule",
      photoNote: "Portrait placeholder",
      people: {
        mei: {
          name: "Mei-Lin Cheng",
          title: "Head of Strength",
          bio: "Mei-Lin competed in the 63kg class for eight years before moving into coaching full time. She writes the powerlifting programming at KS and runs the advanced platform sessions, with a focus on technique under fatigue.",
          quote: "Strong is a skill. We drill it like one.",
          certifications: ["NSCA CSCS", "IPF Level 2 Coach", "Precision Nutrition L1"],
        },
        darius: {
          name: "Darius Okafor",
          title: "Conditioning Lead",
          bio: "Darius came out of collegiate track and brings that engine to the conditioning floor. His HIIT sessions are built in blocks so beginners and competitors can run the same clock at different intensities.",
          quote: "You do not have to be fast. You have to be honest about the effort.",
          certifications: ["NASM CPT", "USATF Level 1", "Kettlebell Sport L2"],
        },
        priya: {
          name: "Priya Raman",
          title: "Yoga & Mobility Director",
          bio: "Priya has taught for fourteen years across Chennai, Singapore and here. Her classes pair breath work with joint-specific mobility, and she runs the recovery protocols for the powerlifting squad.",
          quote: "Mobility is not stretching. It is strength at the end of your range.",
          certifications: ["RYT-500", "FRC Mobility Specialist", "Yoga Therapy Dip."],
        },
        tomas: {
          name: "Tomas Vidal",
          title: "Onboarding Coach",
          bio: "Tomas runs the first ninety days for most new members. He specialises in taking people who have never touched a barbell to a confident, self-directed session three times a week.",
          quote: "The first month is about showing up, not about numbers.",
          certifications: ["ACE CPT", "FMS Level 2", "First Aid & CPR"],
        },
        aisha: {
          name: "Aisha Bello",
          title: "Boxing & Martial Arts",
          bio: "Aisha fought amateur for six years and now coaches the full boxing programme, from pad basics to sparring. Her beginner classes stay technical — footwork and defence before anyone throws hard.",
          quote: "Defence first. Everything else is decoration.",
          certifications: ["England Boxing L2", "Strength & Conditioning Cert.", "Concussion Protocol"],
        },
        kenji: {
          name: "Kenji Moriyama",
          title: "Endurance & Spin",
          bio: "Kenji rode domestic elite before a knee injury moved him indoors. He builds spin sessions around real power targets, so the numbers on the bike mean something outside the studio too.",
          quote: "Watts do not lie. That is why I like them.",
          certifications: ["Schwinn Cycling Cert.", "British Cycling L2", "TrainingPeaks Coach"],
        },
      },
    },

    gallery: {
      meta: {
        title: "Gallery — KS Fitness",
        description:
          "Inside KS Fitness: the training floor, our classes, member events and the community that shows up.",
      },
      eyebrow: "Inside KS",
      title: "The Floor, The People",
      subtitle:
        "Two thousand square metres of competition-grade equipment, and the people who make it worth showing up for.",
      categories: {
        all: "Everything",
        facility: "Facility",
        classes: "Classes",
        events: "Events",
        community: "Community",
      },
      counter: "{current} of {total}",
      close: "Close",
      previous: "Previous image",
      next: "Next image",
      openAria: "Open image",
      placeholderNote:
        "These tiles are styled placeholders. Add a `src` to any item in lib/data.ts to drop in real photography.",
      captions: {
        "floor-main": "The main training floor at opening hour",
        "rack-row": "Ten competition racks along the north wall",
        platform: "Olympic platforms with calibrated plates",
        recovery: "Sauna and the recovery lounge",
        "hiit-floor": "Mid-block on the conditioning floor",
        "spin-studio": "The spin studio, lights down",
        "yoga-room": "Morning mobility in the quiet room",
        "boxing-ring": "Pad work in the boxing corner",
        "open-day": "Open day, first Saturday of the quarter",
        "powerlift-meet": "Our in-house powerlifting meet",
        "charity-row": "The 24-hour charity row",
        "morning-crew": "The six-thirty crew",
        "pb-board": "The personal-best board",
        "post-class": "After the Saturday session",
      },
    },

    footer: {
      tagline: "Premium strength & conditioning. Built for people who show up.",
      hours: "Open 24/7 · Staffed 6am–10pm daily",
      address: "88 Harbour Road, Central",
      rights: "All rights reserved.",
    },
  },

  zh: {
    meta: {
      title: "KS Fitness 健身中心 — 全力训练，活出力量。",
      description:
        "市中心高端力量与体能训练中心，配备专业私人教练。立即领取 KS Fitness 七天免费体验卡。",
    },
    classTypes: {
      strength: "力量与举重",
      hiit: "HIIT 与体能",
      yoga: "瑜伽与柔韧",
      spin: "动感单车与耐力",
      boxing: "拳击与格斗",
    },
    levels: {
      beginner: "入门",
      intermediate: "进阶",
      advanced: "高阶",
    },
    nav: {
      brand: "KS 健身",
      links: {
        home: "首页",
        schedule: "课程表",
        trainers: "教练团队",
        gallery: "场馆相册",
        pricing: "会员方案",
      },
      cta: "领取免费体验卡",
      toggleAria: "切换到英文",
      menuAria: "展开导航菜单",
    },
    hero: {
      badge: "全新开业 · 24 小时开放",
      titleLead: "全力训练，",
      titleAccent: "活出力量。",
      subtitle:
        "奥林匹克举重台、比赛级器械，以及真正为你量身编排训练计划的教练团队。KS Fitness 属于每一个持续到场的人。",
      primaryCta: "领取七天免费体验卡",
      secondaryCta: "计算我的目标",
      stats: [
        { value: "2,400+", label: "活跃会员" },
        { value: "45", label: "每周团课" },
        { value: "18", label: "认证教练" },
        { value: "24/7", label: "全天开放" },
      ],
    },
    calculator: {
      eyebrow: "目标规划",
      title: "健身与热量目标计算器",
      subtitle: "估算你的每月热量消耗，以及达成目标体重所需的时间。数据随输入实时更新。",
      fields: {
        weight: "当前体重（公斤）",
        target: "目标体重（公斤）",
        age: "年龄",
        sessions: "每周训练次数",
        duration: "每次训练时长（分钟）",
        intensity: "训练强度",
      },
      intensities: {
        light: "轻度 — 有氧与柔韧训练",
        moderate: "中度 — 团课与循环训练",
        intense: "高强度 — HIIT 与大重量训练",
      },
      results: {
        perSession: "单次消耗",
        monthly: "每月热量消耗",
        weeks: "达标所需周数",
        weeklyLoss: "预计每周变化",
        kcal: "千卡",
        kg: "公斤",
        weeks_unit: "周",
        perWeek: "公斤 / 周",
        sessionsUnit: "次",
        minutesUnit: "分钟",
        date: "预计达成日期",
      },
      atGoal: "你已经达到目标体重了 — 是时候设定新目标啦。",
      gaining: "你的目标体重高于当前体重。请在训练之余保持热量盈余以增肌。",
      aggressive: "这个速度超过每周 1 公斤，我们的教练会帮你制定更安全的时间表。",
      disclaimer: "以 MET 代谢当量及每公斤 7,700 千卡的能量缺口估算，仅供参考，不构成医疗建议。",
      cta: "预约免费咨询",
    },
    pricing: {
      eyebrow: "会员方案",
      title: "选择你的等级",
      subtitle: "月付方案无需长期绑定，随时取消，绝不刁难。",
      monthly: "按月",
      annual: "按年",
      annualBadge: "省 20%",
      perMonth: "/月",
      perMonthAnnual: "/月，按年结算",
      free: "免费",
      popular: "最受欢迎",
      plans: {
        trial: {
          name: "体验卡",
          tagline: "用整整一周认识我们的训练场。",
          cta: "免费开始",
          features: ["七天全馆通行", "任选一节团体课程", "专人场馆导览", "InBody 体成分检测"],
        },
        allAccess: {
          name: "全馆通行",
          tagline: "为持续训练打造的日常会员方案。",
          cta: "加入全馆通行",
          features: [
            "24 小时通行所有 KS 门店",
            "无限次团体课程",
            "桑拿、恢复休息区与毛巾服务",
            "每季度进度回顾",
            "每月可携带两次访客",
          ],
        },
        vip: {
          name: "VIP 私人教练",
          tagline: "专属教练，为你量身编写的训练计划。",
          cta: "申请 VIP",
          features: [
            "包含全馆通行所有权益",
            "每月 8 次一对一私教课",
            "定制训练与营养方案",
            "课程与器械优先预约",
            "每月体成分复盘",
            "教练专线随时沟通",
          ],
        },
      },
    },
    lead: {
      eyebrow: "七天免费体验",
      title: "第一周由我们请客",
      subtitle: "告诉我们你喜欢的训练方式，体验卡与教练会在前台等你。",
      fields: {
        name: "姓名",
        email: "电子邮箱",
        classType: "偏好课程类型",
      },
      placeholders: {
        name: "陈小明",
        email: "you@example.com",
        classType: "请选择课程",
      },
      submit: "立即领取体验卡",
      submitting: "提交中…",
      successTitle: "报名成功！",
      successBody: "请查收邮箱 — 你的七天体验卡与入门指引已在路上。",
      resetCta: "再帮朋友报名",
      errors: {
        name: "请填写你的姓名。",
        email: "请输入有效的电子邮箱。",
        classType: "请选择你想开始的课程。",
      },
      privacy: "绝无骚扰。我们只会寄出体验卡相关信息。",
    },
    schedule: {
      meta: {
        title: "课程表与预约 — KS Fitness",
        description: "浏览 KS Fitness 每周课程表，按项目、难度或教练筛选，几秒完成预约。",
      },
      eyebrow: "课程表",
      title: "预约你的一周",
      subtitle:
        "五大项目，每周四十五节课程。筛选课表、锁定名额，我们会为你保留至开课前十分钟。",
      filters: {
        type: "项目",
        level: "难度",
        trainer: "教练",
        all: "全部",
        clear: "清除筛选",
        showing: "显示 {total} 节课程中的 {shown} 节",
      },
      noResults: {
        title: "没有符合筛选条件的课程",
        body: "试着放宽项目或难度条件，或清除筛选查看完整课表。",
      },
      dayNames: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
      dayShort: ["一", "二", "三", "四", "五", "六", "日"],
      minutes: "分钟",
      withCoach: "教练",
      spotsLeft: "剩余 {n} 个名额",
      oneSpotLeft: "仅剩 1 个名额",
      full: "已满员",
      waitlist: "加入候补",
      book: "预约",
      booked: "已预约",
      cancel: "取消预约",
      yourBookings: "我的预约",
      noBookings: "本周你还没有预约任何课程。",
      booking: {
        title: "锁定名额",
        nameLabel: "姓名",
        emailLabel: "电子邮箱",
        namePlaceholder: "陈小明",
        emailPlaceholder: "you@example.com",
        confirm: "确认预约",
        confirming: "预约中…",
        close: "关闭",
        successTitle: "预约成功",
        successBody: "详情已发送至你的邮箱，我们训练场见。",
        done: "完成",
        errors: {
          name: "请填写你的姓名。",
          email: "请输入有效的电子邮箱。",
        },
      },
      legend: "颜色代表项目类别",
      note: "演示版本的预约记录保存在本机浏览器中。接入你的预约系统即可正式上线。",
    },

    trainers: {
      meta: {
        title: "教练团队 — KS Fitness",
        description: "十八位认证教练，涵盖力量、体能、瑜伽、单车与拳击。找到最适合你的那一位。",
      },
      eyebrow: "团队",
      title: "为你编写计划的教练",
      subtitle:
        "每位 KS 教练都持有权威认证，并为学员量身编写训练计划。按项目筛选，找到适合你的教练。",
      filterAll: "全部项目",
      viewProfile: "查看简介",
      backToAll: "全部教练",
      years: "执教年数",
      clients: "指导学员",
      specialties: "专长项目",
      certifications: "专业认证",
      teaches: "本周课程",
      classCount: "本周 {n} 节课",
      noClasses: "本周暂无排课 — 可预约一对一私教。",
      bookWith: "预约课程",
      seeSchedule: "查看完整课表",
      photoNote: "照片占位",
      people: {
        mei: {
          name: "郑美琳",
          title: "力量训练总监",
          bio: "美琳在 63 公斤级赛场征战八年后转为全职教练。她负责 KS 的举重训练编排，主带高阶举重台课程，专注于疲劳状态下的动作质量。",
          quote: "力量是一项技术，我们就按技术来打磨。",
          certifications: ["NSCA CSCS", "IPF 二级教练", "Precision Nutrition L1"],
        },
        darius: {
          name: "达瑞斯·奥卡福",
          title: "体能训练主管",
          bio: "达瑞斯出身大学田径队，把那份耐力带到了体能训练区。他的 HIIT 课程以模块编排，让新手与竞技选手可以在同一节奏下各取所需。",
          quote: "你不需要很快，但你要对自己的努力诚实。",
          certifications: ["NASM CPT", "USATF 一级", "壶铃运动 L2"],
        },
        priya: {
          name: "普里娅·拉曼",
          title: "瑜伽与柔韧总监",
          bio: "普里娅执教十四年，足迹遍及金奈、新加坡与本地。她的课程将呼吸训练与关节专项灵活度结合，并负责举重队的恢复方案。",
          quote: "柔韧不是拉伸，而是活动范围末端的力量。",
          certifications: ["RYT-500", "FRC 灵活度专家", "瑜伽治疗文凭"],
        },
        tomas: {
          name: "托马斯·维达尔",
          title: "入门教练",
          bio: "托马斯负责多数新会员的前九十天。他擅长带领从未碰过杠铃的人，走到每周三次自主训练的状态。",
          quote: "第一个月的关键是到场，而不是数字。",
          certifications: ["ACE CPT", "FMS 二级", "急救与心肺复苏"],
        },
        aisha: {
          name: "艾莎·贝洛",
          title: "拳击与格斗",
          bio: "艾莎有六年业余比赛经历，现负责完整的拳击课程体系，从靶位基础到实战对练。她的入门课始终强调技术 — 先练步法与防守，再谈重拳。",
          quote: "防守第一，其他都是装饰。",
          certifications: ["England Boxing L2", "体能训练认证", "脑震荡处理规范"],
        },
        kenji: {
          name: "森山健二",
          title: "耐力与单车",
          bio: "健二曾是国内精英级车手，膝伤后转入室内训练。他以真实功率目标编排单车课程，让车上的数据在户外同样有意义。",
          quote: "功率不会说谎，这正是我喜欢它的原因。",
          certifications: ["Schwinn 单车认证", "British Cycling L2", "TrainingPeaks 教练"],
        },
      },
    },

    gallery: {
      meta: {
        title: "场馆相册 — KS Fitness",
        description: "走进 KS Fitness：训练场地、课程现场、会员活动，以及持续到场的社群。",
      },
      eyebrow: "走进 KS",
      title: "场地与人",
      subtitle: "两千平方米比赛级器械，以及让这一切值得的人们。",
      categories: {
        all: "全部",
        facility: "场馆设施",
        classes: "课程现场",
        events: "活动",
        community: "社群",
      },
      counter: "第 {current} 张，共 {total} 张",
      close: "关闭",
      previous: "上一张",
      next: "下一张",
      openAria: "查看大图",
      placeholderNote:
        "这些图块为设计占位。在 lib/data.ts 中为任一项目添加 `src` 即可替换为实拍照片。",
      captions: {
        "floor-main": "开馆时分的主训练区",
        "rack-row": "北墙一整排十座比赛级深蹲架",
        platform: "配备校准杠铃片的奥举台",
        recovery: "桑拿与恢复休息区",
        "hiit-floor": "体能训练区的组间时刻",
        "spin-studio": "灯光调暗的单车教室",
        "yoga-room": "静音教室里的晨间柔韧课",
        "boxing-ring": "拳击区的靶位训练",
        "open-day": "每季度首个周六的开放日",
        "powerlift-meet": "馆内举重赛",
        "charity-row": "24 小时慈善划船挑战",
        "morning-crew": "六点半的晨练小队",
        "pb-board": "个人最佳纪录墙",
        "post-class": "周六课程结束后",
      },
    },

    footer: {
      tagline: "高端力量与体能训练，为每一个持续到场的人而建。",
      hours: "24 小时开放 · 每日 6:00–22:00 有教练驻场",
      address: "中环海港道 88 号",
      rights: "版权所有。",
    },
  },
} as const;

/** Shape of one locale's copy — derived from the English tree. */
export type Dictionary = (typeof dictionary)[typeof defaultLocale];

export function getDictionary(locale: Locale): Dictionary {
  // The Chinese tree mirrors the English one, so the cast is safe and keeps
  // consumers on a single, fully-typed shape.
  return dictionary[locale] as unknown as Dictionary;
}
