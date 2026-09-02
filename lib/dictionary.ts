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
    nav: {
      brand: "KS FITNESS",
      links: {
        calculator: "Calculator",
        pricing: "Pricing",
        pass: "Free Pass",
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
      classes: {
        strength: "Strength & Powerlifting",
        hiit: "HIIT & Conditioning",
        yoga: "Yoga & Mobility",
        spin: "Spin & Endurance",
        boxing: "Boxing & Martial Arts",
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
    nav: {
      brand: "KS 健身",
      links: {
        calculator: "热量计算器",
        pricing: "会员方案",
        pass: "免费体验",
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
      classes: {
        strength: "力量与举重",
        hiit: "HIIT 与体能",
        yoga: "瑜伽与柔韧",
        spin: "动感单车与耐力",
        boxing: "拳击与格斗",
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
