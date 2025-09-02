export interface PhilosopherData {
  id: number;
  name: {
    en: string;
    ar: string;
  };
  school: {
    en: string;
    ar: string;
  };
  era: {
    en: string;
    ar: string;
  };
  image: string;
  shortDescription: {
    en: string;
    ar: string;
  };
  birth: string;
  death: string;
  nationality: {
    en: string;
    ar: string;
  };
  longArticle: {
    en: string;
    ar: string;
  };
  philosophicalImpact: {
    en: string;
    ar: string;
  };
}



export const PhilosophersData: PhilosopherData[] = [
  {
    id: 1,
    name: {
      en: "Socrates",
      ar: "سقراط"
    },
    school: {
      en: "Classical Philosophy",
      ar: "الفلسفة الكلاسيكية"
    },
    era: {
      en: "Ancient Philosophy",
      ar: "الفلسفة القديمة"
    },
    image: "/images/philosophers/socrates.jpg",
    shortDescription: {
      en: "The father of Western philosophy who taught through questioning",
      ar: "أب الفلسفة الغربية الذي علم من خلال التساؤل"
    },
    birth: "470 BCE",
    death: "399 BCE",
    nationality: {
      en: "Greek",
      ar: "يوناني"
    },
    longArticle: {
      en: "Socrates was a classical Greek philosopher credited as one of the founders of Western philosophy. He is known for his Socratic method of questioning, which is still used in modern education. Socrates never wrote down his philosophical views, and what we know about him comes from the writings of his students, particularly Plato and Xenophon. He was sentenced to death by drinking hemlock for allegedly corrupting the youth of Athens and impiety. His death marked the end of the classical period of Greek philosophy and the beginning of the Hellenistic period.",
      ar: "كان سقراط فيلسوفاً يونانياً كلاسيكياً يُعتبر أحد مؤسسي الفلسفة الغربية. اشتهر بطريقة سقراط في التساؤل، والتي لا تزال تُستخدم في التعليم الحديث. لم يكتب سقراط آراءه الفلسفية، وما نعرفه عنه يأتي من كتابات تلاميذه، خاصة أفلاطون وكسينوفون. حُكم عليه بالإعدام بشرب الشوكران بتهمة إفساد شباب أثينا وعدم التقوى. كان موته نهاية العصر الكلاسيكي للفلسفة اليونانية وبداية العصر الهلنستي."
    },
    philosophicalImpact: {
      en: "Socrates' method of questioning and his emphasis on self-examination laid the foundation for critical thinking and ethical philosophy. His influence extends through Plato to all of Western philosophy.",
      ar: "طريقة سقراط في التساؤل وتأكيده على فحص الذات وضعت الأساس للتفكير النقدي والفلسفة الأخلاقية. يمتد تأثيره من أفلاطون إلى جميع الفلسفة الغربية."
    }
  },
  {
    id: 2,
    name: {
      en: "Plato",
      ar: "أفلاطون"
    },
    school: {
      en: "Idealism",
      ar: "المثالية"
    },
    era: {
      en: "Ancient Philosophy",
      ar: "الفلسفة القديمة"
    },
    image: "/images/philosophers/plato.jpg",
    shortDescription: {
      en: "Founder of the Academy and author of the Theory of Forms",
      ar: "مؤسس الأكاديمية ومؤلف نظرية المثل"
    },
    birth: "428/427 BCE",
    death: "348/347 BCE",
    nationality: {
      en: "Greek",
      ar: "يوناني"
    },
    longArticle: {
      en: "Plato was a student of Socrates and the teacher of Aristotle. He founded the Academy in Athens, the first institution of higher learning in the Western world. Plato's philosophy centers on his Theory of Forms, which posits that the material world is a shadow of a higher, more real world of abstract forms or ideas. His most famous work, 'The Republic', explores justice and the ideal society. Plato's dialogues, written in the form of conversations between Socrates and various interlocutors, are masterpieces of philosophical literature.",
      ar: "كان أفلاطون تلميذاً لسقراط ومعلم أرسطو. أسس الأكاديمية في أثينا، أول مؤسسة للتعليم العالي في العالم الغربي. تدور فلسفة أفلاطون حول نظريته في المثل، التي تفترض أن العالم المادي هو ظل لعالم أعلى وأكثر واقعية من المثل أو الأفكار المجردة. أشهر أعماله 'الجمهورية' تستكشف العدالة والمجتمع المثالي. حوارات أفلاطون، المكتوبة في شكل محادثات بين سقراط ومحاورين مختلفين، هي روائع الأدب الفلسفي."
    },
    philosophicalImpact: {
      en: "Plato's influence on Western philosophy is immeasurable. His Academy trained generations of philosophers, and his Theory of Forms influenced Christian theology and modern philosophy. His method of dialogue continues to be a model for philosophical inquiry.",
      ar: "تأثير أفلاطون على الفلسفة الغربية لا يُقدر. دربت أكاديميته أجيالاً من الفلاسفة، ونظريته في المثل أثرت في اللاهوت المسيحي والفلسفة الحديثة. طريقته في الحوار لا تزال نموذجاً للاستفسار الفلسفي."
    }
  },
  {
    id: 3,
    name: {
      en: "Aristotle",
      ar: "أرسطو"
    },
    school: {
      en: "Empiricism",
      ar: "التجريبية"
    },
    era: {
      en: "Ancient Philosophy",
      ar: "الفلسفة القديمة"
    },
    image: "/images/philosophers/aristotle.jpg",
    shortDescription: {
      en: "Student of Plato and founder of systematic philosophy and logic",
      ar: "تلميذ أفلاطون ومؤسس الفلسفة المنهجية والمنطق"
    },
    birth: "384 BCE",
    death: "322 BCE",
    nationality: {
      en: "Greek",
      ar: "يوناني"
    },
    longArticle: {
      en: "Aristotle was a student of Plato and the teacher of Alexander the Great. He founded the Lyceum in Athens and wrote extensively on almost every subject, including physics, biology, ethics, politics, metaphysics, and logic. Aristotle's approach was empirical and systematic, contrasting with Plato's more mystical approach. He developed formal logic and the syllogism, which remained the standard form of logical reasoning until the 19th century. His works on ethics, particularly 'Nicomachean Ethics', continue to influence moral philosophy today.",
      ar: "كان أرسطو تلميذاً لأفلاطون ومعلم الإسكندر الأكبر. أسس الليقيوم في أثينا وكتب بشكل موسع في كل موضوع تقريباً، بما في ذلك الفيزياء والأحياء والأخلاق والسياسة والميتافيزيقا والمنطق. كان نهج أرسطو تجريبياً ومنهجياً، متبايناً مع نهج أفلاطون الأكثر صوفية. طور المنطق الرسمي والقياس المنطقي، الذي ظل الشكل القياسي للاستدلال المنطقي حتى القرن التاسع عشر. أعماله في الأخلاق، خاصة 'الأخلاق النيقوماخية'، لا تزال تؤثر في الفلسفة الأخلاقية اليوم."
    },
    philosophicalImpact: {
      en: "Aristotle's systematic approach to knowledge influenced the development of science and philosophy for over two millennia. His logic formed the basis of Western reasoning, and his ethical theories continue to be studied and debated.",
      ar: "أثر نهج أرسطو المنهجي في المعرفة على تطور العلم والفلسفة لأكثر من ألفي عام. شكل منطقه أساس الاستدلال الغربي، ونظرياته الأخلاقية لا تزال تُدرس وتُناقش."
    }
  },
  {
    id: 4,
    name: {
      en: "Augustine of Hippo",
      ar: "أوغسطينوس"
    },
    school: {
      en: "Christian Philosophy",
      ar: "الفلسفة المسيحية"
    },
    era: {
      en: "Medieval Philosophy",
      ar: "الفلسفة في العصور الوسطى"
    },
    image: "/images/philosophers/augustine.jpg",
    shortDescription: {
      en: "Christian theologian who synthesized Greek philosophy with Christian doctrine",
      ar: "لاهوتي مسيحي جمع الفلسفة اليونانية مع العقيدة المسيحية"
    },
    birth: "354 CE",
    death: "430 CE",
    nationality: {
      en: "Roman",
      ar: "روماني"
    },
    longArticle: {
      en: "Augustine of Hippo was a Roman African philosopher and theologian who became one of the most important figures in the development of Western Christianity. His works, including 'Confessions' and 'The City of God', synthesized Greek philosophy with Christian theology. Augustine's philosophy addressed fundamental questions about time, memory, and the nature of evil. He developed the concept of original sin and influenced the development of Western theology for centuries. His philosophical method combined reason with faith, setting a pattern for medieval philosophy.",
      ar: "كان أوغسطينوس من هيبو فيلسوفاً ولاهوتياً رومانياً أفريقياً أصبح أحد أهم الشخصيات في تطور المسيحية الغربية. أعماله، بما في ذلك 'الاعترافات' و'مدينة الله'، جمعت الفلسفة اليونانية مع اللاهوت المسيحي. تناولت فلسفة أوغسطينوس أسئلة أساسية حول الزمن والذاكرة وطبيعة الشر. طور مفهوم الخطيئة الأصلية وأثر في تطور اللاهوت الغربي لقرون. طريقته الفلسفية جمعت العقل مع الإيمان، واضعة نمطاً للفلسفة في العصور الوسطى."
    },
    philosophicalImpact: {
      en: "Augustine's synthesis of Greek philosophy and Christian theology created a foundation for medieval philosophy and influenced Christian thought for over a millennium. His ideas about time and memory continue to be relevant to modern philosophy.",
      ar: "جمع أوغسطينوس الفلسفة اليونانية واللاهوت المسيحي أنشأ أساساً للفلسفة في العصور الوسطى وأثر في الفكر المسيحي لأكثر من ألف عام. أفكاره حول الزمن والذاكرة لا تزال ذات صلة بالفلسفة الحديثة."
    }
  },
  {
    id: 5,
    name: {
      en: "Thomas Aquinas",
      ar: "توما الأكويني"
    },
    school: {
      en: "Scholasticism",
      ar: "المدرسية"
    },
    era: {
      en: "Medieval Philosophy",
      ar: "الفلسفة في العصور الوسطى"
    },
    image: "/images/philosophers/aquinas.jpg",
    shortDescription: {
      en: "Dominican friar who synthesized Aristotle with Christian theology",
      ar: "راهب دومينيكي جمع أرسطو مع اللاهوت المسيحي"
    },
    birth: "1225",
    death: "1274",
    nationality: {
      en: "Italian",
      ar: "إيطالي"
    },
    longArticle: {
      en: "Thomas Aquinas was an Italian Dominican friar, philosopher, and theologian who is considered one of the most important figures in medieval philosophy. His most famous work, 'Summa Theologica', attempted to reconcile Aristotle's philosophy with Christian theology. Aquinas developed the concept of natural law and argued that reason and faith could work together harmoniously. He systematized Christian theology and created a comprehensive philosophical framework that influenced both Catholic and Protestant thought. His 'Five Ways' to prove God's existence remain influential in philosophy of religion.",
      ar: "كان توما الأكويني راهباً دومينيكياً إيطالياً وفيلسوفاً ولاهوتياً يُعتبر أحد أهم الشخصيات في الفلسفة في العصور الوسطى. أشهر أعماله 'الخلاصة اللاهوتية' حاولت التوفيق بين فلسفة أرسطو واللاهوت المسيحي. طور الأكويني مفهوم القانون الطبيعي وجادل أن العقل والإيمان يمكن أن يعملا معاً بتناغم. نظم اللاهوت المسيحي وأنشأ إطاراً فلسفياً شاملاً أثر في الفكر الكاثوليكي والبروتستانتي. 'طرقه الخمس' لإثبات وجود الله لا تزال مؤثرة في فلسفة الدين."
    },
    philosophicalImpact: {
      en: "Aquinas' synthesis of Aristotelian philosophy and Christian theology became the foundation of Catholic philosophy and influenced the development of natural law theory. His systematic approach to theology continues to be studied in Catholic institutions worldwide.",
      ar: "أصبح جمع الأكويني الفلسفة الأرسطية واللاهوت المسيحي أساس الفلسفة الكاثوليكية وأثر في تطور نظرية القانون الطبيعي. نهجه المنهجي في اللاهوت لا يزال يُدرس في المؤسسات الكاثوليكية في جميع أنحاء العالم."
    }
  },
  {
    id: 6,
    name: {
      en: "René Descartes",
      ar: "رينيه ديكارت"
    },
    school: {
      en: "Rationalism",
      ar: "العقلانية"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/descartes.jpg",
    shortDescription: {
      en: "Father of modern philosophy and author of 'Cogito, ergo sum'",
      ar: "أب الفلسفة الحديثة ومؤلف 'أنا أفكر إذن أنا موجود'"
    },
    birth: "1596",
    death: "1650",
    nationality: {
      en: "French",
      ar: "فرنسي"
    },
    longArticle: {
      en: "René Descartes was a French philosopher, mathematician, and scientist who is often called the 'Father of Modern Philosophy'. His famous statement 'Cogito, ergo sum' (I think, therefore I am) became the foundation of his philosophical system. Descartes sought to establish a secure foundation for knowledge by doubting everything that could be doubted, leading to his famous method of systematic doubt. His work 'Meditations on First Philosophy' established the mind-body dualism that would influence philosophy for centuries. Descartes also made significant contributions to mathematics, developing Cartesian geometry.",
      ar: "كان رينيه ديكارت فيلسوفاً ورياضياً وعالماً فرنسياً يُطلق عليه غالباً 'أب الفلسفة الحديثة'. عبارته الشهيرة 'أنا أفكر إذن أنا موجود' أصبحت أساس نظامه الفلسفي. سعى ديكارت لإنشاء أساس آمن للمعرفة من خلال الشك في كل شيء يمكن الشك فيه، مما أدى إلى طريقته الشهيرة في الشك المنهجي. عمله 'تأملات في الفلسفة الأولى' أنشأ الثنائية العقلية-الجسدية التي ستؤثر في الفلسفة لقرون. قدم ديكارت أيضاً مساهمات مهمة في الرياضيات، مطوراً الهندسة الديكارتية."
    },
    philosophicalImpact: {
      en: "Descartes' method of systematic doubt and his mind-body dualism fundamentally changed Western philosophy. His emphasis on reason and mathematical method influenced the development of modern science and philosophy. The Cartesian coordinate system is named after him.",
      ar: "طريقة ديكارت في الشك المنهجي وثنائيته العقلية-الجسدية غيرت الفلسفة الغربية بشكل أساسي. تأكيده على العقل والطريقة الرياضية أثر في تطور العلم والفلسفة الحديثة. نظام الإحداثيات الديكارتي سُمي باسمه."
    }
  },
  {
    id: 7,
    name: {
      en: "Baruch Spinoza",
      ar: "باروخ سبينوزا"
    },
    school: {
      en: "Rationalism",
      ar: "العقلانية"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/spinoza.jpg",
    shortDescription: {
      en: "Dutch philosopher who developed pantheism and monism",
      ar: "فيلسوف هولندي طور وحدة الوجود والأحادية"
    },
    birth: "1632",
    death: "1677",
    nationality: {
      en: "Dutch",
      ar: "هولندي"
    },
    longArticle: {
      en: "Baruch Spinoza was a Dutch philosopher of Portuguese Sephardic Jewish origin who is considered one of the most important figures in the history of philosophy. His major work, 'Ethics', presents his philosophical system in a geometric format, using definitions, axioms, and propositions. Spinoza developed a monistic philosophy that identified God with nature (pantheism) and argued that everything in the universe is part of a single substance. His views on religion and politics were radical for his time, leading to his excommunication from the Jewish community. Spinoza's philosophy influenced later thinkers including Hegel and Einstein.",
      ar: "كان باروخ سبينوزا فيلسوفاً هولندياً من أصل يهودي سفاردي برتغالي يُعتبر أحد أهم الشخصيات في تاريخ الفلسفة. عمله الرئيسي 'الأخلاق' يعرض نظامه الفلسفي في شكل هندسي، مستخدماً التعريفات والبديهيات والافتراضات. طور سبينوزا فلسفة أحادية تعرف الله مع الطبيعة (وحدة الوجود) وجادل أن كل شيء في الكون جزء من مادة واحدة. آراؤه في الدين والسياسة كانت راديكالية لعصره، مما أدى إلى طرده من المجتمع اليهودي. أثرت فلسفة سبينوزا في مفكرين لاحقين بما في ذلك هيجل وآينشتاين."
    },
    philosophicalImpact: {
      en: "Spinoza's monistic philosophy and his identification of God with nature challenged traditional religious views and influenced the development of modern philosophy. His geometric method of presenting philosophy influenced later systematic philosophers.",
      ar: "تحدت الفلسفة الأحادية لسبينوزا وتحديده الله مع الطبيعة الآراء الدينية التقليدية وأثرت في تطور الفلسفة الحديثة. طريقته الهندسية في عرض الفلسفة أثرت في الفلاسفة المنهجيين اللاحقين."
    }
  },
  {
    id: 8,
    name: {
      en: "John Locke",
      ar: "جون لوك"
    },
    school: {
      en: "Empiricism",
      ar: "التجريبية"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/locke.jpg",
    shortDescription: {
      en: "English philosopher who founded British empiricism",
      ar: "فيلسوف إنجليزي أسس التجريبية البريطانية"
    },
    birth: "1632",
    death: "1704",
    nationality: {
      en: "English",
      ar: "إنجليزي"
    },
    longArticle: {
      en: "John Locke was an English philosopher and physician who is widely regarded as one of the most influential Enlightenment thinkers. His 'Essay Concerning Human Understanding' established the foundations of British empiricism, arguing that all knowledge comes from experience. Locke's political philosophy, particularly his 'Two Treatises of Government', influenced the development of liberal democracy and the American Declaration of Independence. He developed the concept of tabula rasa (blank slate), arguing that humans are born without innate ideas. Locke's ideas about religious tolerance and the separation of church and state were revolutionary for his time.",
      ar: "كان جون لوك فيلسوفاً وطبيباً إنجليزياً يُعتبر على نطاق واسع أحد أكثر مفكري التنوير تأثيراً. 'مقالته في الفهم البشري' أنشأت أسس التجريبية البريطانية، مجادلاً أن كل المعرفة تأتي من التجربة. فلسفة لوك السياسية، خاصة 'رسالتان في الحكومة'، أثرت في تطور الديمقراطية الليبرالية وإعلان الاستقلال الأمريكي. طور مفهوم اللوح الأملس، مجادلاً أن البشر يولدون بدون أفكار فطرية. أفكار لوك حول التسامح الديني وفصل الكنيسة عن الدولة كانت ثورية لعصره."
    },
    philosophicalImpact: {
      en: "Locke's empiricism and political philosophy fundamentally influenced the development of modern liberalism and democracy. His ideas about natural rights and government by consent shaped the American and French Revolutions and continue to influence political thought today.",
      ar: "أثرت التجريبية وفلسفة لوك السياسية بشكل أساسي في تطور الليبرالية والديمقراطية الحديثة. أفكاره حول الحقوق الطبيعية والحكومة بالرضا شكلت الثورتين الأمريكية والفرنسية وتستمر في التأثير على الفكر السياسي اليوم."
    }
  },
  {
    id: 9,
    name: {
      en: "David Hume",
      ar: "ديفيد هيوم"
    },
    school: {
      en: "Empiricism",
      ar: "التجريبية"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/hume.jpg",
    shortDescription: {
      en: "Scottish philosopher who developed radical empiricism and skepticism",
      ar: "فيلسوف اسكتلندي طور التجريبية والشك الراديكاليين"
    },
    birth: "1711",
    death: "1776",
    nationality: {
      en: "Scottish",
      ar: "اسكتلندي"
    },
    longArticle: {
      en: "David Hume was a Scottish Enlightenment philosopher, historian, and economist who is best known for his radical empiricism and philosophical skepticism. His major work, 'A Treatise of Human Nature', argues that all knowledge comes from experience and that reason alone cannot establish matters of fact. Hume's famous 'problem of induction' questions how we can justify our belief that the future will resemble the past. He also developed a sophisticated theory of morality based on sentiment rather than reason. Hume's skepticism about causation and the self challenged fundamental philosophical assumptions and influenced later philosophers including Kant.",
      ar: "كان ديفيد هيوم فيلسوفاً ومؤرخاً واقتصادياً اسكتلندياً من عصر التنوير اشتهر بتجريبيته الراديكالية وشكه الفلسفي. عمله الرئيسي 'رسالة في الطبيعة البشرية' يجادل أن كل المعرفة تأتي من التجربة وأن العقل وحده لا يمكنه إنشاء أمور الواقع. مشكلة هيوم الشهيرة في الاستقراء تسأل كيف يمكننا تبرير اعتقادنا أن المستقبل سيشبه الماضي. طور أيضاً نظرية متطورة في الأخلاق مبنية على المشاعر بدلاً من العقل. شك هيوم في السببية والذات تحدى الافتراضات الفلسفية الأساسية وأثر في فلاسفة لاحقين بما في ذلك كانط."
    },
    philosophicalImpact: {
      en: "Hume's radical empiricism and skepticism challenged the foundations of knowledge and morality, forcing later philosophers to address his objections. His problem of induction remains one of the central problems in philosophy of science.",
      ar: "تحدت التجريبية الراديكالية وشك هيوم أسس المعرفة والأخلاق، مما أجبر الفلاسفة اللاحقين على معالجة اعتراضاته. مشكلته في الاستقراء تبقى إحدى المشاكل المركزية في فلسفة العلم."
    }
  },
  {
    id: 10,
    name: {
      en: "Immanuel Kant",
      ar: "إيمانويل كانط"
    },
    school: {
      en: "Transcendental Idealism",
      ar: "المثالية المتعالية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/kant.jpg",
    shortDescription: {
      en: "German philosopher who revolutionized epistemology with his 'Copernican Revolution'",
      ar: "فيلسوف ألماني ثور في نظرية المعرفة بثورته الكوبرنيكية"
    },
    birth: "1724",
    death: "1804",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Immanuel Kant was a German philosopher who is considered one of the most important figures in modern philosophy. His 'Critique of Pure Reason' revolutionized epistemology by arguing that the mind actively structures our experience of the world rather than passively receiving it. This 'Copernican Revolution' in philosophy argued that objects conform to our knowledge rather than our knowledge conforming to objects. Kant's moral philosophy, developed in 'Groundwork for the Metaphysics of Morals', introduced the categorical imperative as the foundation of moral law. His work on aesthetics and teleology also influenced later philosophical developments.",
      ar: "كان إيمانويل كانط فيلسوفاً ألمانياً يُعتبر أحد أهم الشخصيات في الفلسفة الحديثة. 'نقده للعقل الخالص' ثور في نظرية المعرفة مجادلاً أن العقل ينظم بنشاط خبرتنا في العالم بدلاً من استقبالها بسلبية. هذه 'الثورة الكوبرنيكية' في الفلسفة جادلت أن الأشياء تتوافق مع معرفتنا بدلاً من توافق معرفتنا مع الأشياء. فلسفة كانط الأخلاقية، المطورة في 'أساس ميتافيزيقا الأخلاق'، قدمت الأمر القاطع كأساس للقانون الأخلاقي. عمله في الجماليات والغائية أثر أيضاً في التطورات الفلسفية اللاحقة."
    },
    philosophicalImpact: {
      en: "Kant's transcendental idealism fundamentally changed philosophy by showing how the mind structures experience. His moral philosophy and his distinction between phenomena and noumena continue to influence contemporary philosophy. Kant is often seen as the bridge between early modern and contemporary philosophy.",
      ar: "غيرت المثالية المتعالية لكانط الفلسفة بشكل أساسي من خلال إظهار كيف ينظم العقل التجربة. فلسفته الأخلاقية وتمييزه بين الظواهر والأشياء في ذاتها تستمر في التأثير على الفلسفة المعاصرة. يُرى كانط غالباً كجسر بين الفلسفة الحديثة المبكرة والمعاصرة."
    }
  },
  {
    id: 11,
    name: {
      en: "Georg Wilhelm Friedrich Hegel",
      ar: "جورج فيلهلم فريدريش هيجل"
    },
    school: {
      en: "German Idealism",
      ar: "المثالية الألمانية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/hegel.jpg",
    shortDescription: {
      en: "German idealist who developed dialectical philosophy and absolute idealism",
      ar: "مثالي ألماني طور الفلسفة الجدلية والمثالية المطلقة"
    },
    birth: "1770",
    death: "1831",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Georg Wilhelm Friedrich Hegel was a German idealist philosopher who developed a comprehensive philosophical system known as absolute idealism. His philosophy is characterized by its dialectical method, which he used to show how concepts develop through contradiction and synthesis. Hegel's major works include 'Phenomenology of Spirit', 'Science of Logic', and 'Elements of the Philosophy of Right'. He argued that reality is fundamentally rational and that history progresses through a dialectical process toward greater freedom and self-consciousness. Hegel's influence extended beyond philosophy to theology, politics, and social theory.",
      ar: "كان جورج فيلهلم فريدريش هيجل فيلسوفاً مثالياً ألمانياً طور نظاماً فلسفياً شاملاً معروفاً بالمثالية المطلقة. تتميز فلسفته بطريقتها الجدلية، التي استخدمها لإظهار كيف تتطور المفاهيم من خلال التناقض والتوليف. أعمال هيجل الرئيسية تشمل 'ظاهريات الروح' و'علم المنطق' و'عناصر فلسفة الحق'. جادل أن الواقع عقلاني أساساً وأن التاريخ يتقدم من خلال عملية جدلية نحو حرية أكبر ووعي ذاتي أكبر. امتد تأثير هيجل خارج الفلسفة إلى اللاهوت والسياسة والنظرية الاجتماعية."
    },
    philosophicalImpact: {
      en: "Hegel's dialectical method and absolute idealism influenced the development of Marxism, existentialism, and postmodern philosophy. His philosophy of history and his systematic approach to philosophy continue to be studied and debated in contemporary philosophy.",
      ar: "أثرت الطريقة الجدلية والمثالية المطلقة لهيجل في تطور الماركسية والوجودية والفلسفة ما بعد الحداثة. فلسفته في التاريخ ونهجه المنهجي في الفلسفة تستمر في الدراسة والنقاش في الفلسفة المعاصرة."
    }
  },
  {
    id: 12,
    name: {
      en: "Karl Marx",
      ar: "كارل ماركس"
    },
    school: {
      en: "Historical Materialism",
      ar: "المادية التاريخية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/marx.jpg",
    shortDescription: {
      en: "German philosopher and economist who developed historical materialism and communism",
      ar: "فيلسوف واقتصادي ألماني طور المادية التاريخية والشيوعية"
    },
    birth: "1818",
    death: "1883",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Karl Marx was a German philosopher, economist, historian, sociologist, political theorist, journalist, and revolutionary socialist. His most famous works include 'The Communist Manifesto' (co-authored with Friedrich Engels) and 'Capital'. Marx developed the theory of historical materialism, arguing that the economic base of society determines its political and ideological superstructure. He analyzed capitalism and predicted its eventual collapse due to internal contradictions. Marx's philosophy emphasized the importance of class struggle and the need for revolutionary change to achieve a classless, communist society.",
      ar: "كان كارل ماركس فيلسوفاً واقتصادياً ومؤرخاً وعالم اجتماع ونظري سياسي وصحفياً واشتراكياً ثورياً. أشهر أعماله تشمل 'البيان الشيوعي' (مؤلف مشترك مع فريدريك إنجلز) و'رأس المال'. طور ماركس نظرية المادية التاريخية، مجادلاً أن الأساس الاقتصادي للمجتمع يحدد بنيته الفوقية السياسية والأيديولوجية. حلل الرأسمالية وتنبأ بانهيارها النهائي بسبب التناقضات الداخلية. أكدت فلسفة ماركس على أهمية الصراع الطبقي والحاجة للتغيير الثوري لتحقيق مجتمع شيوعي بلا طبقات."
    },
    philosophicalImpact: {
      en: "Marx's historical materialism and critique of capitalism fundamentally influenced the development of socialist and communist movements worldwide. His analysis of class struggle and economic determinism continues to be relevant to contemporary social and political theory.",
      ar: "أثرت المادية التاريخية لماركس ونقده للرأسمالية بشكل أساسي في تطور الحركات الاشتراكية والشيوعية في جميع أنحاء العالم. تحليله للصراع الطبقي والحتمية الاقتصادية يستمر في كونه ذا صلة بالنظرية الاجتماعية والسياسية المعاصرة."
    }
  },
  {
    id: 13,
    name: {
      en: "Friedrich Nietzsche",
      ar: "فريدريك نيتشه"
    },
    school: {
      en: "Existentialism",
      ar: "الوجودية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/nietzsche.jpg",
    shortDescription: {
      en: "German philosopher who proclaimed the death of God and developed the will to power",
      ar: "فيلسوف ألماني أعلن موت الإله وطور إرادة القوة"
    },
    birth: "1844",
    death: "1900",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Friedrich Nietzsche was a German philosopher, cultural critic, composer, poet, and philologist whose work has exerted a profound influence on modern intellectual history. His major works include 'Thus Spoke Zarathustra', 'Beyond Good and Evil', and 'The Genealogy of Morals'. Nietzsche is known for his critique of traditional morality and religion, his concept of the 'Übermensch' (Overman), and his doctrine of the 'will to power'. He proclaimed the 'death of God' and argued that traditional values had lost their authority in the modern world. Nietzsche's philosophy emphasized the importance of individual creativity and self-overcoming.",
      ar: "كان فريدريك نيتشه فيلسوفاً وناقداً ثقافياً وملحناً وشاعراً وعالم فقه لغة ألماني أثر عمله تأثيراً عميقاً على التاريخ الفكري الحديث. أعماله الرئيسية تشمل 'هكذا تكلم زرادشت' و'ما وراء الخير والشر' و'جينالوجيا الأخلاق'. اشتهر نيتشه بنقده للأخلاق والدين التقليديين، ومفهومه عن 'الإنسان الأعلى'، ومذهبه في 'إرادة القوة'. أعلن 'موت الإله' وجادل أن القيم التقليدية فقدت سلطتها في العالم الحديث. أكدت فلسفة نيتشه على أهمية الإبداع الفردي والتغلب على الذات."
    },
    philosophicalImpact: {
      en: "Nietzsche's critique of traditional values and his emphasis on individual creativity influenced the development of existentialism, postmodernism, and contemporary philosophy. His concepts of the will to power and eternal recurrence continue to be debated and interpreted.",
      ar: "أثر نقد نيتشه للقيم التقليدية وتأكيده على الإبداع الفردي في تطور الوجودية وما بعد الحداثة والفلسفة المعاصرة. مفاهيمه في إرادة القوة والتكرار الأبدي تستمر في النقاش والتفسير."
    }
  },
  {
    id: 14,
    name: {
      en: "Jean-Paul Sartre",
      ar: "جان بول سارتر"
    },
    school: {
      en: "Existentialism",
      ar: "الوجودية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/sartre.jpg",
    shortDescription: {
      en: "French existentialist philosopher who emphasized human freedom and responsibility",
      ar: "فيلسوف وجودي فرنسي أكد على الحرية والمسؤولية الإنسانية"
    },
    birth: "1905",
    death: "1980",
    nationality: {
      en: "French",
      ar: "فرنسي"
    },
    longArticle: {
      en: "Jean-Paul Sartre was a French philosopher, playwright, novelist, screenwriter, political activist, biographer, and literary critic. He was a leading figure in 20th-century French philosophy and Marxism, and an exponent of existentialism. His major philosophical works include 'Being and Nothingness' and 'Existentialism is a Humanism'. Sartre argued that human beings are fundamentally free and responsible for their own existence. He developed the concept of 'bad faith' to describe how people deny their freedom and responsibility. Sartre was also politically active, supporting various leftist causes and criticizing both capitalism and Soviet communism.",
      ar: "كان جان بول سارتر فيلسوفاً وكاتب مسرحي وروائياً وكاتب سيناريو وناشطاً سياسياً وكاتب سيرة ذاتية وناقداً أدبياً فرنسياً. كان شخصية رائدة في الفلسفة الفرنسية والماركسية في القرن العشرين، وممثلاً للوجودية. أعماله الفلسفية الرئيسية تشمل 'الوجود والعدم' و'الوجودية إنسانية'. جادل سارتر أن البشر أحرار أساساً ومسؤولون عن وجودهم الخاص. طور مفهوم 'الإيمان السيئ' لوصف كيف ينكر الناس حريتهم ومسؤوليتهم. كان سارتر أيضاً نشطاً سياسياً، داعماً لقضايا يسارية مختلفة وناقداً للرأسمالية والشيوعية السوفيتية."
    },
    philosophicalImpact: {
      en: "Sartre's existentialism and his emphasis on human freedom and responsibility influenced the development of contemporary philosophy, psychology, and political theory. His concept of bad faith continues to be relevant to understanding human behavior and social psychology.",
      ar: "أثرت وجودية سارتر وتأكيده على الحرية والمسؤولية الإنسانية في تطور الفلسفة وعلم النفس والنظرية السياسية المعاصرة. مفهومه في الإيمان السيئ يستمر في كونه ذا صلة بفهم السلوك البشري وعلم النفس الاجتماعي."
    }
  },
  {
    id: 15,
    name: {
      en: "Martin Heidegger",
      ar: "مارتن هايدغر"
    },
    school: {
      en: "Phenomenology",
      ar: "الظاهراتية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/heidegger.jpg",
    shortDescription: {
      en: "German philosopher who explored the question of Being and human existence",
      ar: "فيلسوف ألماني استكشف سؤال الكينونة والوجود الإنساني"
    },
    birth: "1889",
    death: "1976",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Martin Heidegger was a German philosopher who is best known for his contributions to phenomenology and existential philosophy. His major work, 'Being and Time', is considered one of the most important philosophical works of the 20th century. Heidegger explored the question of Being (Sein) and argued that human existence (Dasein) is fundamentally different from other types of being. He developed the concept of 'being-in-the-world' to describe how humans are always already embedded in a meaningful world. Heidegger's later work focused on language, art, and technology, and he became increasingly critical of modern technological society.",
      ar: "كان مارتن هايدغر فيلسوفاً ألمانياً اشتهر بمساهماته في الظاهراتية والفلسفة الوجودية. عمله الرئيسي 'الكينونة والزمن' يُعتبر أحد أهم الأعمال الفلسفية في القرن العشرين. استكشف هايدغر سؤال الكينونة (Sein) وجادل أن الوجود الإنساني (Dasein) مختلف أساساً عن أنواع الكينونة الأخرى. طور مفهوم 'الكينونة-في-العالم' لوصف كيف يكون البشر دائماً مدمجين بالفعل في عالم ذي معنى. ركز عمل هايدغر اللاحق على اللغة والفن والتكنولوجيا، وأصبح ناقداً متزايداً للمجتمع التكنولوجي الحديث."
    },
    philosophicalImpact: {
      en: "Heidegger's analysis of Being and human existence influenced the development of existentialism, hermeneutics, and postmodern philosophy. His critique of technology and his emphasis on the importance of questioning continue to be relevant to contemporary philosophy.",
      ar: "أثر تحليل هايدغر للكينونة والوجود الإنساني في تطور الوجودية والتأويلية والفلسفة ما بعد الحداثة. نقده للتكنولوجيا وتأكيده على أهمية التساؤل يستمر في كونه ذا صلة بالفلسفة المعاصرة."
    }
  },
  {
    id: 16,
    name: {
      en: "Ludwig Wittgenstein",
      ar: "لودفيغ فتجنشتاين"
    },
    school: {
      en: "Analytic Philosophy",
      ar: "الفلسفة التحليلية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/wittgenstein.jpg",
    shortDescription: {
      en: "Austrian-British philosopher who revolutionized philosophy of language",
      ar: "فيلسوف نمساوي-بريطاني ثور في فلسفة اللغة"
    },
    birth: "1889",
    death: "1951",
    nationality: {
      en: "Austrian-British",
      ar: "نمساوي-بريطاني"
    },
    longArticle: {
      en: "Ludwig Wittgenstein was an Austrian-British philosopher who worked primarily in logic, the philosophy of mathematics, the philosophy of mind, and the philosophy of language. His two major works, 'Tractatus Logico-Philosophicus' and 'Philosophical Investigations', represent two distinct phases of his philosophical development. In the Tractatus, Wittgenstein argued that language and reality share a logical structure, and that philosophical problems arise from misunderstandings of this structure. In his later work, he developed the concept of language games and argued that meaning is determined by use within specific contexts.",
      ar: "كان لودفيغ فتجنشتاين فيلسوفاً نمساوياً-بريطانياً عمل أساساً في المنطق وفلسفة الرياضيات وفلسفة العقل وفلسفة اللغة. عملاها الرئيسيان 'رسالة منطقية فلسفية' و'تحقيقات فلسفية' يمثلان مرحلتين متميزتين من تطوره الفلسفي. في الرسالة، جادل فتجنشتاين أن اللغة والواقع يشتركان في بنية منطقية، وأن المشاكل الفلسفية تنشأ من سوء فهم هذه البنية. في عمله اللاحق، طور مفهوم ألعاب اللغة وجادل أن المعنى يحدده الاستخدام في سياقات محددة."
    },
    philosophicalImpact: {
      en: "Wittgenstein's philosophy of language and his method of philosophical analysis influenced the development of analytic philosophy and continues to be relevant to contemporary philosophy of mind and language. His later work on language games influenced ordinary language philosophy.",
      ar: "أثرت فلسفة فتجنشتاين في اللغة وطريقته في التحليل الفلسفي في تطور الفلسفة التحليلية وتستمر في كونه ذات صلة بالفلسفة المعاصرة للعقل واللغة. عمله اللاحق في ألعاب اللغة أثر في فلسفة اللغة العادية."
    }
  },
  {
    id: 17,
    name: {
      en: "Michel Foucault",
      ar: "ميشيل فوكو"
    },
    school: {
      en: "Poststructuralism",
      ar: "ما بعد البنيوية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/foucault.jpg",
    shortDescription: {
      en: "French philosopher who analyzed power, knowledge, and social institutions",
      ar: "فيلسوف فرنسي حلل السلطة والمعرفة والمؤسسات الاجتماعية"
    },
    birth: "1926",
    death: "1984",
    nationality: {
      en: "French",
      ar: "فرنسي"
    },
    longArticle: {
      en: "Michel Foucault was a French philosopher, historian of ideas, social theorist, and literary critic. His work focused on the relationship between power and knowledge, and how they are used as a form of social control through societal institutions. Foucault's major works include 'Madness and Civilization', 'The Birth of the Clinic', 'Discipline and Punish', and 'The History of Sexuality'. He developed the concept of 'biopower' to describe how modern states exercise control over populations through various mechanisms. Foucault's work has been influential in sociology, anthropology, and cultural studies.",
      ar: "كان ميشيل فوكو فيلسوفاً ومؤرخ أفكار ونظري اجتماعي وناقد أدبي فرنسي. ركز عمله على العلاقة بين السلطة والمعرفة، وكيف تُستخدم كشكل من أشكال السيطرة الاجتماعية من خلال المؤسسات المجتمعية. أعمال فوكو الرئيسية تشمل 'الجنون والحضارة' و'ميلاد العيادة' و'المراقبة والعقاب' و'تاريخ الجنسانية'. طور مفهوم 'السلطة البيولوجية' لوصف كيف تمارس الدول الحديثة السيطرة على السكان من خلال آليات مختلفة. كان عمل فوكو مؤثراً في علم الاجتماع والأنثروبولوجيا والدراسات الثقافية."
    },
    philosophicalImpact: {
      en: "Foucault's analysis of power and knowledge has fundamentally influenced contemporary social theory, cultural studies, and political philosophy. His concepts of biopower and disciplinary society continue to be relevant to understanding modern social institutions.",
      ar: "أثر تحليل فوكو للسلطة والمعرفة بشكل أساسي في النظرية الاجتماعية والدراسات الثقافية والفلسفة السياسية المعاصرة. مفاهيمه في السلطة البيولوجية والمجتمع التأديبي تستمر في كونه ذات صلة بفهم المؤسسات الاجتماعية الحديثة."
    }
  },
  {
    id: 18,
    name: {
      en: "Jacques Derrida",
      ar: "جاك دريدا"
    },
    school: {
      en: "Deconstruction",
      ar: "التفكيك"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/derrida.jpg",
    shortDescription: {
      en: "Algerian-French philosopher who developed deconstruction",
      ar: "فيلسوف جزائري-فرنسي طور التفكيك"
    },
    birth: "1930",
    death: "2004",
    nationality: {
      en: "Algerian-French",
      ar: "جزائري-فرنسي"
    },
    longArticle: {
      en: "Jacques Derrida was an Algerian-born French philosopher best known for developing a form of semiotic analysis known as deconstruction. His work has been associated with post-structuralism and postmodern philosophy. Derrida's major works include 'Of Grammatology', 'Writing and Difference', and 'Margins of Philosophy'. He argued that language is inherently unstable and that meaning is always deferred and never fully present. Derrida's method of deconstruction involves analyzing texts to reveal their internal contradictions and the ways in which they undermine their own claims to truth and coherence.",
      ar: "كان جاك دريدا فيلسوفاً فرنسياً مولوداً في الجزائر اشتهر بتطوير شكل من أشكال التحليل السيميائي المعروف بالتفكيك. ارتبط عمله بما بعد البنيوية والفلسفة ما بعد الحداثة. أعمال دريدا الرئيسية تشمل 'في علم الكتابة' و'الكتابة والاختلاف' و'هوامش الفلسفة'. جادل أن اللغة غير مستقرة بطبيعتها وأن المعنى دائماً مؤجل ولا يكون حاضراً بالكامل أبداً. تتضمن طريقة دريدا في التفكيك تحليل النصوص لكشف تناقضاتها الداخلية والطرق التي تقوض بها ادعاءاتها الخاصة في الحقيقة والتماسك."
    },
    philosophicalImpact: {
      en: "Derrida's deconstruction has influenced literary theory, philosophy, and cultural studies. His critique of logocentrism and his emphasis on the instability of meaning continue to be debated in contemporary philosophy and literary criticism.",
      ar: "أثر تفكيك دريدا في النظرية الأدبية والفلسفة والدراسات الثقافية. نقده للمركزية المنطقية وتأكيده على عدم استقرار المعنى يستمر في النقاش في الفلسفة المعاصرة والنقد الأدبي."
    }
  },
  {
    id: 19,
    name: {
      en: "Epicurus",
      ar: "إبيقور"
    },
    school: {
      en: "Epicureanism",
      ar: "الأبيقورية"
    },
    era: {
      en: "Ancient Philosophy",
      ar: "الفلسفة القديمة"
    },
    image: "/images/philosophers/epicurus.jpg",
    shortDescription: {
      en: "Greek philosopher who founded Epicureanism and emphasized pleasure and tranquility",
      ar: "فيلسوف يوناني أسس الأبيقورية وأكد على المتعة والهدوء"
    },
    birth: "341 BCE",
    death: "270 BCE",
    nationality: {
      en: "Greek",
      ar: "يوناني"
    },
    longArticle: {
      en: "Epicurus was an ancient Greek philosopher and sage who founded Epicureanism, a highly influential school of philosophy. He taught that the purpose of philosophy is to attain a happy, tranquil life, characterized by ataraxia (peace and freedom from fear) and aponia (absence of pain). Epicurus believed that the greatest good is to seek modest pleasures in order to attain a state of tranquility and freedom from fear. He taught that the root of all human unhappiness is the fear of death and the fear of the gods. Epicurus established a school in Athens called 'The Garden' where he taught his philosophy.",
      ar: "كان إبيقور فيلسوفاً وحكيماً يونانياً قديماً أسس الأبيقورية، مدرسة فلسفية مؤثرة للغاية. علم أن الغرض من الفلسفة هو تحقيق حياة سعيدة هادئة، تتميز بالاتاراكسيا (السلام والحرية من الخوف) والأبونيا (غياب الألم). اعتقد إبيقور أن أعظم خير هو البحث عن متع متواضعة من أجل تحقيق حالة من الهدوء والحرية من الخوف. علم أن جذر كل تعاسة بشرية هو الخوف من الموت والخوف من الآلهة. أسس إبيقور مدرسة في أثينا تسمى 'الحديقة' حيث علم فلسفته."
    },
    philosophicalImpact: {
      en: "Epicurus' philosophy influenced the development of hedonism and utilitarianism. His emphasis on seeking tranquility and avoiding unnecessary desires continues to be relevant to contemporary discussions of happiness and well-being.",
      ar: "أثرت فلسفة إبيقور في تطور اللذة والنفعية. تأكيده على البحث عن الهدوء وتجنب الرغبات غير الضرورية يستمر في كونه ذا صلة بالمناقشات المعاصرة للسعادة والرفاهية."
    }
  },
  {
    id: 20,
    name: {
      en: "Zeno of Citium",
      ar: "زينون الرواقي"
    },
    school: {
      en: "Stoicism",
      ar: "الرواقية"
    },
    era: {
      en: "Ancient Philosophy",
      ar: "الفلسفة القديمة"
    },
    image: "/images/philosophers/zeno.jpg",
    shortDescription: {
      en: "Greek philosopher who founded Stoicism",
      ar: "فيلسوف يوناني أسس الرواقية"
    },
    birth: "334 BCE",
    death: "262 BCE",
    nationality: {
      en: "Greek",
      ar: "يوناني"
    },
    longArticle: {
      en: "Zeno of Citium was a Hellenistic philosopher from Citium, Cyprus, and was the founder of the Stoic school of philosophy. He taught in Athens from about 300 BCE, based in the Stoa Poikile (Painted Porch), from which his philosophy got its name. Zeno's philosophy emphasized that virtue is the only good and that external things like wealth, health, and pleasure are neither good nor bad but indifferent. He taught that people should live according to nature and accept whatever happens with equanimity. Zeno's Stoicism became one of the most influential philosophical schools in the ancient world.",
      ar: "كان زينون الرواقي فيلسوفاً هلنستياً من كيتيوم، قبرص، وكان مؤسس المدرسة الرواقية للفلسفة. علم في أثينا من حوالي 300 قبل الميلاد، مقره في ستوا بويكيلي (الرواق المزخرف)، الذي أخذت منه فلسفته اسمها. أكدت فلسفة زينون أن الفضيلة هي الخير الوحيد وأن الأشياء الخارجية مثل الثروة والصحة والمتعة ليست خيراً ولا شراً بل محايدة. علم أن الناس يجب أن يعيشوا وفقاً للطبيعة ويقبلوا أي شيء يحدث بتوازن. أصبحت الرواقية لزينون إحدى أكثر المدارس الفلسفية تأثيراً في العالم القديم."
    },
    philosophicalImpact: {
      en: "Zeno's Stoicism influenced the development of Roman philosophy and continues to be relevant to contemporary discussions of ethics and personal development. The Stoic emphasis on self-control and acceptance has influenced modern cognitive behavioral therapy.",
      ar: "أثرت الرواقية لزينون في تطور الفلسفة الرومانية وتستمر في كونه ذات صلة بالمناقشات المعاصرة للأخلاق والتطور الشخصي. التأكيد الرواقي على ضبط النفس والقبول أثر في العلاج السلوكي المعرفي الحديث."
    }
  },
  {
    id: 21,
    name: {
      en: "Marcus Aurelius",
      ar: "ماركوس أوريليوس"
    },
    school: {
      en: "Stoicism",
      ar: "الرواقية"
    },
    era: {
      en: "Ancient Philosophy",
      ar: "الفلسفة القديمة"
    },
    image: "/images/philosophers/marcus-aurelius.jpg",
    shortDescription: {
      en: "Roman emperor and Stoic philosopher who wrote 'Meditations'",
      ar: "إمبراطور روماني وفيلسوف رواقي كتب 'التأملات'"
    },
    birth: "121 CE",
    death: "180 CE",
    nationality: {
      en: "Roman",
      ar: "روماني"
    },
    longArticle: {
      en: "Marcus Aurelius was a Roman emperor from 161 to 180 CE and a Stoic philosopher. He is known for his personal writings called 'Meditations', which were written in Greek while he was on campaign between 170 and 180 CE. The work is a series of personal writings by Marcus Aurelius, setting forth his ideas on Stoic philosophy. Marcus Aurelius emphasizes the importance of living in accordance with nature, accepting what happens, and focusing on what is within one's control. His writings reflect the Stoic belief that virtue is the only good and that external events should not disturb one's inner peace.",
      ar: "كان ماركوس أوريليوس إمبراطوراً رومانياً من 161 إلى 180 م وفيلسوفاً رواقياً. اشتهر بكتاباته الشخصية المسماة 'التأملات'، التي كُتبت باليونانية بينما كان في حملة عسكرية بين 170 و180 م. العمل عبارة عن سلسلة من الكتابات الشخصية لماركوس أوريليوس، يوضح فيها أفكاره في الفلسفة الرواقية. يؤكد ماركوس أوريليوس على أهمية العيش وفقاً للطبيعة، وقبول ما يحدث، والتركيز على ما هو ضمن سيطرة المرء. تعكس كتاباته الاعتقاد الرواقي أن الفضيلة هي الخير الوحيد وأن الأحداث الخارجية يجب ألا تزعج السلام الداخلي للمرء."
    },
    philosophicalImpact: {
      en: "Marcus Aurelius' 'Meditations' has been one of the most influential works of Stoic philosophy, influencing countless readers throughout history. His practical approach to Stoicism continues to be relevant to contemporary discussions of leadership and personal development.",
      ar: "كانت 'التأملات' لماركوس أوريليوس إحدى أكثر أعمال الفلسفة الرواقية تأثيراً، مؤثرة في عدد لا يحصى من القراء عبر التاريخ. نهجه العملي في الرواقية يستمر في كونه ذا صلة بالمناقشات المعاصرة للقيادة والتطور الشخصي."
    }
  },
  {
    id: 22,
    name: {
      en: "Al-Kindi",
      ar: "الكندي"
    },
    school: {
      en: "Islamic Philosophy",
      ar: "الفلسفة الإسلامية"
    },
    era: {
      en: "Medieval Philosophy",
      ar: "الفلسفة في العصور الوسطى"
    },
    image: "/images/philosophers/alkindi.jpg",
    shortDescription: {
      en: "Arab philosopher who introduced Greek philosophy to the Islamic world",
      ar: "فيلسوف عربي قدم الفلسفة اليونانية للعالم الإسلامي"
    },
    birth: "801",
    death: "873",
    nationality: {
      en: "Arab",
      ar: "عربي"
    },
    longArticle: {
      en: "Al-Kindi was an Arab Muslim philosopher, polymath, mathematician, physician, and musician. He is known as the 'Father of Arab Philosophy' and was the first of the Muslim Peripatetic philosophers. Al-Kindi was instrumental in introducing Greek philosophy to the Islamic world, translating and commenting on the works of Aristotle and other Greek philosophers. He attempted to reconcile Greek philosophy with Islamic theology, arguing that philosophy and religion were compatible. Al-Kindi wrote on various subjects including philosophy, logic, mathematics, medicine, and music, and his work influenced later Islamic and European philosophers.",
      ar: "كان الكندي فيلسوفاً مسلماً عربياً وعالماً متعدد المواهب ورياضياً وطبيباً وموسيقياً. يُعرف باسم 'أب الفلسفة العربية' وكان أول الفلاسفة المشائين المسلمين. كان الكندي أساسياً في تقديم الفلسفة اليونانية للعالم الإسلامي، مترجماً ومعلقاً على أعمال أرسطو والفلاسفة اليونانيين الآخرين. حاول التوفيق بين الفلسفة اليونانية واللاهوت الإسلامي، مجادلاً أن الفلسفة والدين متوافقان. كتب الكندي في مواضيع مختلفة تشمل الفلسفة والمنطق والرياضيات والطب والموسيقى، وأثر عمله في فلاسفة إسلاميين وأوروبيين لاحقين."
    },
    philosophicalImpact: {
      en: "Al-Kindi's introduction of Greek philosophy to the Islamic world was crucial for the development of Islamic philosophy and the preservation of Greek philosophical texts. His work influenced the development of philosophy in both the Islamic and European worlds.",
      ar: "كان تقديم الكندي الفلسفة اليونانية للعالم الإسلامي حاسماً لتطور الفلسفة الإسلامية والحفاظ على النصوص الفلسفية اليونانية. أثر عمله في تطور الفلسفة في كل من العالمين الإسلامي والأوروبي."
    }
  },
  {
    id: 23,
    name: {
      en: "Al-Farabi",
      ar: "الفارابي"
    },
    school: {
      en: "Islamic Philosophy",
      ar: "الفلسفة الإسلامية"
    },
    era: {
      en: "Medieval Philosophy",
      ar: "الفلسفة في العصور الوسطى"
    },
    image: "/images/philosophers/alfarabi.jpg",
    shortDescription: {
      en: "Persian philosopher who synthesized Greek and Islamic thought",
      ar: "فيلسوف فارسي جمع الفكر اليوناني والإسلامي"
    },
    birth: "872",
    death: "950",
    nationality: {
      en: "Persian",
      ar: "فارسي"
    },
    longArticle: {
      en: "Al-Farabi was a Persian philosopher and polymath who lived in the Islamic Golden Age. He is known as the 'Second Teacher' after Aristotle, and his work represents a synthesis of Greek philosophy and Islamic thought. Al-Farabi wrote extensively on logic, ethics, political philosophy, and metaphysics. His most famous work, 'The Perfect State', describes an ideal society ruled by a philosopher-king. Al-Farabi was influenced by Plato's 'Republic' and Aristotle's works, and he attempted to reconcile their ideas with Islamic theology. He also made significant contributions to music theory and the classification of sciences.",
      ar: "كان الفارابي فيلسوفاً وعالماً متعدد المواهب فارسياً عاش في العصر الذهبي الإسلامي. يُعرف باسم 'المعلم الثاني' بعد أرسطو، ويمثل عمله جمع الفلسفة اليونانية والفكر الإسلامي. كتب الفارابي بشكل موسع في المنطق والأخلاق والفلسفة السياسية والميتافيزيقا. أشهر أعماله 'المدينة الفاضلة' تصف مجتمعاً مثالياً يحكمه فيلسوف-ملك. تأثر الفارابي بـ'الجمهورية' لأفلاطون وأعمال أرسطو، وحاول التوفيق بين أفكارهما واللاهوت الإسلامي. قدم أيضاً مساهمات مهمة في نظرية الموسيقى وتصنيف العلوم."
    },
    philosophicalImpact: {
      en: "Al-Farabi's synthesis of Greek and Islamic philosophy influenced the development of Islamic philosophy and later European philosophy. His political philosophy and classification of sciences continue to be studied in contemporary philosophy.",
      ar: "أثر جمع الفارابي الفلسفة اليونانية والإسلامية في تطور الفلسفة الإسلامية والفلسفة الأوروبية اللاحقة. فلسفته السياسية وتصنيفه للعلوم تستمر في الدراسة في الفلسفة المعاصرة."
    }
  },
  {
    id: 24,
    name: {
      en: "Avicenna (Ibn Sina)",
      ar: "ابن سينا"
    },
    school: {
      en: "Islamic Philosophy",
      ar: "الفلسفة الإسلامية"
    },
    era: {
      en: "Medieval Philosophy",
      ar: "الفلسفة في العصور الوسطى"
    },
    image: "/images/philosophers/avicenna.jpg",
    shortDescription: {
      en: "Persian polymath who wrote 'The Book of Healing' and 'The Canon of Medicine'",
      ar: "عالم متعدد المواهب فارسي كتب 'كتاب الشفاء' و'القانون في الطب'"
    },
    birth: "980",
    death: "1037",
    nationality: {
      en: "Persian",
      ar: "فارسي"
    },
    longArticle: {
      en: "Avicenna (Ibn Sina) was a Persian polymath who is regarded as one of the most significant physicians, astronomers, thinkers, and writers of the Islamic Golden Age. His major philosophical work, 'The Book of Healing', is a comprehensive philosophical encyclopedia that covers logic, physics, mathematics, and metaphysics. Avicenna's 'Canon of Medicine' was a standard medical text in Europe and the Islamic world for centuries. He developed a sophisticated philosophical system that attempted to reconcile Aristotelian philosophy with Islamic theology. Avicenna's concept of the 'flying man' thought experiment influenced later discussions of consciousness and the self.",
      ar: "كان ابن سينا عالماً متعدد المواهب فارسياً يُعتبر أحد أهم الأطباء والفلكيين والمفكرين والكتاب في العصر الذهبي الإسلامي. عمله الفلسفي الرئيسي 'كتاب الشفاء' هو موسوعة فلسفية شاملة تغطي المنطق والفيزياء والرياضيات والميتافيزيقا. كان 'القانون في الطب' لابن سينا نصاً طبياً قياسياً في أوروبا والعالم الإسلامي لقرون. طور نظاماً فلسفياً متطوراً حاول التوفيق بين الفلسفة الأرسطية واللاهوت الإسلامي. مفهوم ابن سينا في تجربة 'الرجل الطائر' الفكرية أثر في المناقشات اللاحقة للوعي والذات."
    },
    philosophicalImpact: {
      en: "Avicenna's philosophical system influenced both Islamic and European philosophy. His medical works remained authoritative for centuries, and his philosophical ideas continue to be studied in contemporary philosophy of mind and metaphysics.",
      ar: "أثر نظام ابن سينا الفلسفي في كل من الفلسفة الإسلامية والأوروبية. أعماله الطبية ظلت موثوقة لقرون، وأفكاره الفلسفية تستمر في الدراسة في الفلسفة المعاصرة للعقل والميتافيزيقا."
    }
  },
  {
    id: 25,
    name: {
      en: "Averroes (Ibn Rushd)",
      ar: "ابن رشد"
    },
    school: {
      en: "Islamic Philosophy",
      ar: "الفلسفة الإسلامية"
    },
    era: {
      en: "Medieval Philosophy",
      ar: "الفلسفة في العصور الوسطى"
    },
    image: "/images/philosophers/averroes.jpg",
    shortDescription: {
      en: "Andalusian philosopher who commented extensively on Aristotle",
      ar: "فيلسوف أندلسي علق بشكل موسع على أرسطو"
    },
    birth: "1126",
    death: "1198",
    nationality: {
      en: "Andalusian",
      ar: "أندلسي"
    },
    longArticle: {
      en: "Averroes (Ibn Rushd) was an Andalusian philosopher and polymath who wrote on many subjects, including philosophy, theology, medicine, astronomy, physics, psychology, mathematics, Islamic jurisprudence, and law. He is best known for his extensive commentaries on Aristotle, which were translated into Latin and influenced the development of Western philosophy. Averroes argued that philosophy and religion were compatible and that both could lead to truth. His concept of 'double truth' suggested that religious and philosophical truths could coexist even when they appeared to contradict each other. Averroes' work was influential in both the Islamic and Christian worlds.",
      ar: "كان ابن رشد فيلسوفاً وعالماً متعدد المواهب أندلسياً كتب في مواضيع عديدة، تشمل الفلسفة واللاهوت والطب والفلك والفيزياء وعلم النفس والرياضيات والفقه الإسلامي والقانون. اشتهر بتعليقاته الموسعة على أرسطو، التي تُرجمت إلى اللاتينية وأثرت في تطور الفلسفة الغربية. جادل ابن رشد أن الفلسفة والدين متوافقان وأن كلاهما يمكن أن يؤدي إلى الحقيقة. مفهومه في 'الحقيقة المزدوجة' اقترح أن الحقائق الدينية والفلسفية يمكن أن تتعايش حتى عندما تبدو متضاربة. كان عمل ابن رشد مؤثراً في كل من العالمين الإسلامي والمسيحي."
    },
    philosophicalImpact: {
      en: "Averroes' commentaries on Aristotle were crucial for the development of medieval European philosophy. His ideas about the compatibility of philosophy and religion influenced both Islamic and Christian philosophical traditions.",
      ar: "كانت تعليقات ابن رشد على أرسطو حاسمة لتطور الفلسفة الأوروبية في العصور الوسطى. أفكاره حول توافق الفلسفة والدين أثرت في كل من التقاليد الفلسفية الإسلامية والمسيحية."
    }
  },
  {
    id: 26,
    name: {
      en: "Gottfried Wilhelm Leibniz",
      ar: "غوتفريد فيلهلم لايبنتز"
    },
    school: {
      en: "Rationalism",
      ar: "العقلانية"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/leibniz.jpg",
    shortDescription: {
      en: "German polymath who developed calculus and monadology",
      ar: "عالم متعدد المواهب ألماني طور التفاضل والتكامل ونظرية الأحاد"
    },
    birth: "1646",
    death: "1716",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Gottfried Wilhelm Leibniz was a German polymath active as a mathematician, philosopher, scientist, and diplomat. He is a prominent figure in both the history of philosophy and the history of mathematics. Leibniz developed calculus independently of Isaac Newton, and his notation is the one in general use since then. In philosophy, Leibniz is most noted for his optimism, his conclusion that our Universe is, in a restricted sense, the best possible one that God could have created. He developed the concept of monads as the fundamental units of reality in his metaphysical system. Leibniz also made significant contributions to logic, probability theory, and the philosophy of mind.",
      ar: "كان غوتفريد فيلهلم لايبنتز عالماً متعدد المواهب ألمانياً نشطاً كرياضي وفيلسوف وعالم ودبلوماسي. هو شخصية بارزة في كل من تاريخ الفلسفة وتاريخ الرياضيات. طور لايبنتز التفاضل والتكامل بشكل مستقل عن إسحاق نيوتن، وتدوينه هو المستخدم عموماً منذ ذلك الحين. في الفلسفة، اشتهر لايبنتز بتفاؤله، واستنتاجه أن كوننا، بمعنى مقيد، هو أفضل كون ممكن أن يكون الله قد خلقه. طور مفهوم الأحاد كوحدات أساسية للواقع في نظامه الميتافيزيقي. قدم لايبنتز أيضاً مساهمات مهمة في المنطق ونظرية الاحتمال وفلسفة العقل."
    },
    philosophicalImpact: {
      en: "Leibniz's philosophical system, particularly his monadology and his principle of sufficient reason, influenced the development of German idealism and continues to be studied in contemporary metaphysics. His work in mathematics and logic was foundational for modern developments in these fields.",
      ar: "أثر نظام لايبنتز الفلسفي، خاصة نظريته في الأحاد ومبدأ السبب الكافي، في تطور المثالية الألمانية ويستمر في الدراسة في الميتافيزيقا المعاصرة. عمله في الرياضيات والمنطق كان أساسياً للتطورات الحديثة في هذه المجالات."
    }
  },
  {
    id: 27,
    name: {
      en: "George Berkeley",
      ar: "جورج بيركلي"
    },
    school: {
      en: "Idealism",
      ar: "المثالية"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/berkeley.jpg",
    shortDescription: {
      en: "Irish philosopher who developed subjective idealism",
      ar: "فيلسوف أيرلندي طور المثالية الذاتية"
    },
    birth: "1685",
    death: "1753",
    nationality: {
      en: "Irish",
      ar: "أيرلندي"
    },
    longArticle: {
      en: "George Berkeley was an Irish philosopher who is best known for his theory of subjective idealism, which he called 'immaterialism'. Berkeley argued that material objects exist only as perceptions in the minds of perceivers, and that the existence of an object consists in its being perceived. His famous dictum 'esse est percipi' (to be is to be perceived) summarizes this view. Berkeley's major works include 'A Treatise Concerning the Principles of Human Knowledge' and 'Three Dialogues between Hylas and Philonous'. He was also a bishop in the Church of Ireland and wrote on theology and mathematics.",
      ar: "كان جورج بيركلي فيلسوفاً أيرلندياً اشتهر بنظريته في المثالية الذاتية، التي سماها 'اللامادية'. جادل بيركلي أن الأشياء المادية موجودة فقط كإدراكات في عقول المدركين، وأن وجود الشيء يتكون في إدراكه. قوله الشهير 'esse est percipi' (أن تكون يعني أن تُدرك) يلخص هذا الرأي. أعمال بيركلي الرئيسية تشمل 'رسالة في مبادئ المعرفة البشرية' و'ثلاث حوارات بين هيلاس وفيلونوس'. كان أيضاً أسقفاً في كنيسة أيرلندا وكتب في اللاهوت والرياضيات."
    },
    philosophicalImpact: {
      en: "Berkeley's subjective idealism challenged the materialist assumptions of his contemporaries and influenced the development of idealism in philosophy. His critique of abstract ideas and his emphasis on perception continue to be relevant to contemporary philosophy of mind.",
      ar: "تحدت المثالية الذاتية لبيركلي الافتراضات المادية لمعاصريه وأثرت في تطور المثالية في الفلسفة. نقده للأفكار المجردة وتأكيده على الإدراك يستمر في كونه ذا صلة بالفلسفة المعاصرة للعقل."
    }
  },
  {
    id: 28,
    name: {
      en: "Arthur Schopenhauer",
      ar: "آرثر شوبنهاور"
    },
    school: {
      en: "Pessimism",
      ar: "التشاؤمية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/schopenhauer.jpg",
    shortDescription: {
      en: "German philosopher who developed a pessimistic philosophy based on will",
      ar: "فيلسوف ألماني طور فلسفة تشاؤمية مبنية على الإرادة"
    },
    birth: "1788",
    death: "1860",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Arthur Schopenhauer was a German philosopher who is best known for his 1818 work 'The World as Will and Representation', which characterizes the phenomenal world as the product of a blind and insatiable metaphysical will. Schopenhauer developed a pessimistic philosophy that argued that the world is fundamentally characterized by suffering and that the will is the source of all suffering. He was influenced by Eastern philosophy, particularly Buddhism and Hinduism, and argued that the way to escape suffering is through the denial of the will. Schopenhauer's work influenced later philosophers including Nietzsche and Wittgenstein, and his aesthetic theory emphasized the importance of art as a temporary escape from the will.",
      ar: "كان آرثر شوبنهاور فيلسوفاً ألمانياً اشتهر بعمله في 1818 'العالم كإرادة وتمثيل'، الذي يميز العالم الظاهري كمنتج لإرادة ميتافيزيقية عمياء وشرهة. طور شوبنهاور فلسفة تشاؤمية جادلت أن العالم يتميز أساساً بالمعاناة وأن الإرادة هي مصدر كل المعاناة. تأثر بالفلسفة الشرقية، خاصة البوذية والهندوسية، وجادل أن الطريقة للهروب من المعاناة هي من خلال إنكار الإرادة. أثر عمل شوبنهاور في فلاسفة لاحقين بما في ذلك نيتشه وفيتجنشتاين، ونظريته الجمالية أكدت على أهمية الفن كهروب مؤقت من الإرادة."
    },
    philosophicalImpact: {
      en: "Schopenhauer's pessimistic philosophy and his concept of the will influenced the development of existentialism and contemporary philosophy of mind. His aesthetic theory and his engagement with Eastern philosophy continue to be studied in contemporary aesthetics and comparative philosophy.",
      ar: "أثرت الفلسفة التشاؤمية لشوبنهاور ومفهومه في الإرادة في تطور الوجودية والفلسفة المعاصرة للعقل. نظريته الجمالية وانخراطه في الفلسفة الشرقية يستمر في الدراسة في الجماليات المعاصرة والفلسفة المقارنة."
    }
  },
  {
    id: 29,
    name: {
      en: "Søren Kierkegaard",
      ar: "سورين كيركغور"
    },
    school: {
      en: "Existentialism",
      ar: "الوجودية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/kierkegaard.jpg",
    shortDescription: {
      en: "Danish philosopher who is considered the father of existentialism",
      ar: "فيلسوف دنماركي يُعتبر أب الوجودية"
    },
    birth: "1813",
    death: "1855",
    nationality: {
      en: "Danish",
      ar: "دنماركي"
    },
    longArticle: {
      en: "Søren Kierkegaard was a Danish philosopher, theologian, poet, social critic, and religious author who is widely considered to be the first existentialist philosopher. He wrote critical texts on organized religion, Christendom, morality, ethics, psychology, and the philosophy of religion, displaying a fondness for metaphor, irony, and parables. Kierkegaard's major works include 'Fear and Trembling', 'Either/Or', and 'The Sickness Unto Death'. He emphasized the importance of individual choice and commitment, arguing that truth is subjective and that each person must make their own existential choices. Kierkegaard's work was largely ignored during his lifetime but became influential in the 20th century.",
      ar: "كان سورين كيركغور فيلسوفاً ولاهوتياً وشاعراً وناقداً اجتماعياً وكاتباً دينياً دنماركياً يُعتبر على نطاق واسع أول فيلسوف وجودي. كتب نصوصاً نقدية عن الدين المنظم والمسيحية والأخلاق وعلم النفس وفلسفة الدين، معبراً عن حبه للاستعارة والسخرية والأمثال. أعمال كيركغور الرئيسية تشمل 'الخوف والرعدة' و'إما/أو' و'المرض حتى الموت'. أكد على أهمية الاختيار والالتزام الفردي، مجادلاً أن الحقيقة ذاتية وأن كل شخص يجب أن يتخذ خياراته الوجودية الخاصة. كان عمل كيركغور يُتجاهل إلى حد كبير خلال حياته لكنه أصبح مؤثراً في القرن العشرين."
    },
    philosophicalImpact: {
      en: "Kierkegaard is considered the father of existentialism and his emphasis on individual choice and subjective truth influenced the development of 20th-century existentialist philosophy. His critique of organized religion and his emphasis on personal faith continue to be relevant to contemporary philosophy of religion.",
      ar: "يُعتبر كيركغور أب الوجودية وتأكيده على الاختيار الفردي والحقيقة الذاتية أثر في تطور الفلسفة الوجودية في القرن العشرين. نقده للدين المنظم وتأكيده على الإيمان الشخصي يستمر في كونه ذا صلة بالفلسفة المعاصرة للدين."
    }
  },
  {
    id: 30,
    name: {
      en: "Bertrand Russell",
      ar: "برتراند راسل"
    },
    school: {
      en: "Analytic Philosophy",
      ar: "الفلسفة التحليلية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/russell.jpg",
    shortDescription: {
      en: "British philosopher who founded analytic philosophy and wrote on logic",
      ar: "فيلسوف بريطاني أسس الفلسفة التحليلية وكتب في المنطق"
    },
    birth: "1872",
    death: "1970",
    nationality: {
      en: "British",
      ar: "بريطاني"
    },
    longArticle: {
      en: "Bertrand Russell was a British philosopher, logician, mathematician, historian, writer, social critic, political activist, and Nobel laureate. He is considered one of the founders of analytic philosophy and made significant contributions to logic, the philosophy of mathematics, epistemology, and metaphysics. Russell's major works include 'Principia Mathematica' (with Alfred North Whitehead), 'The Problems of Philosophy', and 'A History of Western Philosophy'. He developed the theory of descriptions and made important contributions to mathematical logic. Russell was also a prominent social activist, advocating for pacifism, women's rights, and nuclear disarmament.",
      ar: "كان برتراند راسل فيلسوفاً ومنطقياً ورياضياً ومؤرخاً وكاتباً وناقداً اجتماعياً وناشطاً سياسياً وحائزاً على جائزة نوبل بريطانياً. يُعتبر أحد مؤسسي الفلسفة التحليلية وقدم مساهمات مهمة في المنطق وفلسفة الرياضيات ونظرية المعرفة والميتافيزيقا. أعمال راسل الرئيسية تشمل 'مبادئ الرياضيات' (مع ألفريد نورث وايتهيد) و'مشاكل الفلسفة' و'تاريخ الفلسفة الغربية'. طور نظرية الأوصاف وقدم مساهمات مهمة في المنطق الرياضي. كان راسل أيضاً ناشطاً اجتماعياً بارزاً، داعماً للسلمية وحقوق المرأة ونزع السلاح النووي."
    },
    philosophicalImpact: {
      en: "Russell's work in logic and analytic philosophy was foundational for the development of 20th-century philosophy. His theory of descriptions and his contributions to mathematical logic continue to be studied in contemporary philosophy and logic.",
      ar: "كان عمل راسل في المنطق والفلسفة التحليلية أساسياً لتطور الفلسفة في القرن العشرين. نظريته في الأوصاف ومساهماته في المنطق الرياضي تستمر في الدراسة في الفلسفة والمنطق المعاصرة."
    }
  },
  {
    id: 31,
    name: {
      en: "Jean-Jacques Rousseau",
      ar: "جان جاك روسو"
    },
    school: {
      en: "Social Contract",
      ar: "العقد الاجتماعي"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/rousseau.jpg",
    shortDescription: {
      en: "Swiss-French philosopher who wrote 'The Social Contract'",
      ar: "فيلسوف سويسري-فرنسي كتب 'العقد الاجتماعي'"
    },
    birth: "1712",
    death: "1778",
    nationality: {
      en: "Swiss-French",
      ar: "سويسري-فرنسي"
    },
    longArticle: {
      en: "Jean-Jacques Rousseau was a Swiss-French philosopher, writer, and composer whose political philosophy influenced the progress of the Enlightenment throughout Europe, as well as aspects of the French Revolution and the development of modern political, economic, and educational thought. His major works include 'The Social Contract', 'Emile', and 'Confessions'. Rousseau argued that human beings are naturally good but are corrupted by society and civilization. He developed the concept of the 'general will' and argued that legitimate political authority comes from a social contract agreed upon by all citizens. Rousseau's ideas about education and the natural state of humanity were revolutionary for his time.",
      ar: "كان جان جاك روسو فيلسوفاً وكاتباً وملحناً سويسرياً-فرنسياً أثرت فلسفته السياسية في تقدم التنوير في جميع أنحاء أوروبا، وكذلك جوانب الثورة الفرنسية وتطور الفكر السياسي والاقتصادي والتعليمي الحديث. أعماله الرئيسية تشمل 'العقد الاجتماعي' و'إميل' و'الاعترافات'. جادل روسو أن البشر طيبون بطبيعتهم لكنهم يُفسدون من قبل المجتمع والحضارة. طور مفهوم 'الإرادة العامة' وجادل أن السلطة السياسية المشروعة تأتي من عقد اجتماعي يتفق عليه جميع المواطنين. كانت أفكار روسو حول التعليم والحالة الطبيعية للإنسانية ثورية لعصره."
    },
    philosophicalImpact: {
      en: "Rousseau's political philosophy and his concept of the social contract influenced the French Revolution and the development of modern democratic theory. His ideas about education and human nature continue to be relevant to contemporary political and educational philosophy.",
      ar: "أثرت الفلسفة السياسية لروسو ومفهومه في العقد الاجتماعي في الثورة الفرنسية وتطور النظرية الديمقراطية الحديثة. أفكاره حول التعليم والطبيعة البشرية تستمر في كونه ذات صلة بالفلسفة السياسية والتعليمية المعاصرة."
    }
  },
  {
    id: 32,
    name: {
      en: "Voltaire",
      ar: "فولتير"
    },
    school: {
      en: "Enlightenment",
      ar: "التنوير"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/voltaire.jpg",
    shortDescription: {
      en: "French Enlightenment writer and philosopher who advocated for freedom of speech",
      ar: "كاتب وفيلسوف تنويري فرنسي دعا لحرية التعبير"
    },
    birth: "1694",
    death: "1778",
    nationality: {
      en: "French",
      ar: "فرنسي"
    },
    longArticle: {
      en: "Voltaire was a French Enlightenment writer, historian, and philosopher famous for his wit, his attacks on the established Catholic Church, and his advocacy of freedom of religion, freedom of expression, and separation of church and state. His major works include 'Candide', 'Letters on the English', and numerous philosophical essays. Voltaire was a prolific writer, producing works in almost every literary form, including plays, poems, novels, essays, and historical and scientific works. He was an outspoken advocate of civil liberties and was often at odds with the French authorities of the time. Voltaire's influence on the French Revolution and the development of modern secular thought was profound.",
      ar: "كان فولتير كاتباً ومؤرخاً وفيلسوفاً فرنسياً من عصر التنوير اشتهر بذكائه وهجماته على الكنيسة الكاثوليكية الراسخة ودعوته لحرية الدين وحرية التعبير وفصل الكنيسة عن الدولة. أعماله الرئيسية تشمل 'كانديد' و'رسائل في الإنجليز' وعدة مقالات فلسفية. كان فولتير كاتباً غزير الإنتاج، منتجاً أعمالاً في كل شكل أدبي تقريباً، تشمل المسرحيات والقصائد والروايات والمقالات والأعمال التاريخية والعلمية. كان مدافعاً صريحاً عن الحريات المدنية وكان غالباً في خلاف مع السلطات الفرنسية في ذلك الوقت. كان تأثير فولتير على الثورة الفرنسية وتطور الفكر العلماني الحديث عميقاً."
    },
    philosophicalImpact: {
      en: "Voltaire's advocacy for civil liberties and his critique of religious and political authority influenced the development of modern secular thought and the French Revolution. His emphasis on reason and tolerance continues to be relevant to contemporary discussions of freedom and democracy.",
      ar: "أثرت دعوة فولتير للحريات المدنية ونقده للسلطة الدينية والسياسية في تطور الفكر العلماني الحديث والثورة الفرنسية. تأكيده على العقل والتسامح يستمر في كونه ذا صلة بالمناقشات المعاصرة للحرية والديمقراطية."
    }
  },
  {
    id: 33,
    name: {
      en: "Adam Smith",
      ar: "آدم سميث"
    },
    school: {
      en: "Classical Economics",
      ar: "الاقتصاد الكلاسيكي"
    },
    era: {
      en: "Early Modern Philosophy",
      ar: "الفلسفة الحديثة المبكرة"
    },
    image: "/images/philosophers/adam-smith.jpg",
    shortDescription: {
      en: "Scottish economist and philosopher who wrote 'The Wealth of Nations'",
      ar: "اقتصادي وفيلسوف اسكتلندي كتب 'ثروة الأمم'"
    },
    birth: "1723",
    death: "1790",
    nationality: {
      en: "Scottish",
      ar: "اسكتلندي"
    },
    longArticle: {
      en: "Adam Smith was a Scottish economist, philosopher, and author who is a key figure in the Scottish Enlightenment. He is best known for two classic works: 'The Theory of Moral Sentiments' (1759) and 'An Inquiry into the Nature and Causes of the Wealth of Nations' (1776). The latter, usually abbreviated as 'The Wealth of Nations', is considered his magnum opus and the first modern work of economics. Smith introduced the concept of the 'invisible hand' to describe how self-interested actions can lead to beneficial social outcomes. His work laid the foundation for classical economics and influenced the development of capitalism.",
      ar: "كان آدم سميث اقتصادياً وفيلسوفاً وكاتباً اسكتلندياً وهو شخصية رئيسية في التنوير الاسكتلندي. اشتهر بعملين كلاسيكيين: 'نظرية المشاعر الأخلاقية' (1759) و'بحث في طبيعة وأسباب ثروة الأمم' (1776). الأخير، عادة ما يُختصر بـ'ثروة الأمم'، يُعتبر تحفته الأولى وأول عمل حديث في الاقتصاد. قدم سميث مفهوم 'اليد الخفية' لوصف كيف يمكن أن تؤدي الأفعال المصلحية إلى نتائج اجتماعية مفيدة. وضع عمله الأساس للاقتصاد الكلاسيكي وأثر في تطور الرأسمالية."
    },
    philosophicalImpact: {
      en: "Smith's work laid the foundation for classical economics and influenced the development of modern capitalism. His concept of the invisible hand and his analysis of market mechanisms continue to be studied in contemporary economics and political philosophy.",
      ar: "وضع عمل سميث الأساس للاقتصاد الكلاسيكي وأثر في تطور الرأسمالية الحديثة. مفهومه في اليد الخفية وتحليله لآليات السوق يستمر في الدراسة في الاقتصاد والفلسفة السياسية المعاصرة."
    }
  },
  {
    id: 34,
    name: {
      en: "Jeremy Bentham",
      ar: "جيريمي بنثام"
    },
    school: {
      en: "Utilitarianism",
      ar: "النفعية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/bentham.jpg",
    shortDescription: {
      en: "English philosopher who founded modern utilitarianism",
      ar: "فيلسوف إنجليزي أسس النفعية الحديثة"
    },
    birth: "1748",
    death: "1832",
    nationality: {
      en: "English",
      ar: "إنجليزي"
    },
    longArticle: {
      en: "Jeremy Bentham was an English philosopher, jurist, and social reformer who is regarded as the founder of modern utilitarianism. His major work, 'An Introduction to the Principles of Morals and Legislation', outlines the principle of utility, which states that actions are right insofar as they promote happiness and wrong insofar as they produce unhappiness. Bentham argued that the goal of society should be 'the greatest happiness of the greatest number'. He was also a leading theorist in Anglo-American philosophy of law and a political radical whose ideas influenced the development of welfarism. Bentham's work on prison reform and his panopticon design were influential in the development of modern penal systems.",
      ar: "كان جيريمي بنثام فيلسوفاً وقانونياً ومصلحاً اجتماعياً إنجليزياً يُعتبر مؤسس النفعية الحديثة. عمله الرئيسي 'مقدمة في مبادئ الأخلاق والتشريع' يوضح مبدأ المنفعة، الذي ينص على أن الأفعال صحيحة بقدر ما تعزز السعادة وخاطئة بقدر ما تنتج التعاسة. جادل بنثام أن هدف المجتمع يجب أن يكون 'أعظم سعادة لأعظم عدد'. كان أيضاً نظرياً رائداً في فلسفة القانون الأنجلو-أمريكية وراديكالياً سياسياً أثرت أفكاره في تطور الرفاهية. كان عمل بنثام في إصلاح السجون وتصميمه للبانوبتيكون مؤثراً في تطور النظم العقابية الحديثة."
    },
    philosophicalImpact: {
      en: "Bentham's utilitarianism became the foundation of modern consequentialist ethics and influenced the development of welfare economics and social policy. His principle of utility continues to be debated in contemporary moral philosophy.",
      ar: "أصبحت النفعية لبنثام أساس الأخلاق العواقبية الحديثة وأثرت في تطور اقتصاد الرفاهية والسياسة الاجتماعية. مبدأ المنفعة يستمر في النقاش في الفلسفة الأخلاقية المعاصرة."
    }
  },
  {
    id: 35,
    name: {
      en: "John Stuart Mill",
      ar: "جون ستيوارت ميل"
    },
    school: {
      en: "Utilitarianism",
      ar: "النفعية"
    },
    era: {
      en: "Modern Philosophy",
      ar: "الفلسفة الحديثة"
    },
    image: "/images/philosophers/john-stuart-mill.jpg",
    shortDescription: {
      en: "English philosopher who developed and refined utilitarianism",
      ar: "فيلسوف إنجليزي طور وصقل النفعية"
    },
    birth: "1806",
    death: "1873",
    nationality: {
      en: "English",
      ar: "إنجليزي"
    },
    longArticle: {
      en: "John Stuart Mill was an English philosopher, political economist, Member of Parliament, and civil servant. One of the most influential thinkers in the history of classical liberalism, he contributed extensively to social theory, political theory, and political economy. Mill's major works include 'On Liberty', 'Utilitarianism', and 'The Subjection of Women'. He refined and developed the utilitarian philosophy of Jeremy Bentham, arguing that not all pleasures are equal and that higher pleasures (intellectual and moral) are more valuable than lower pleasures (physical). Mill was also a strong advocate for women's rights and individual liberty, arguing that the only legitimate reason for interfering with individual freedom is to prevent harm to others.",
      ar: "كان جون ستيوارت ميل فيلسوفاً واقتصادياً سياسياً وعضو برلمان وموظف مدني إنجليزياً. أحد أكثر المفكرين تأثيراً في تاريخ الليبرالية الكلاسيكية، ساهم بشكل موسع في النظرية الاجتماعية والنظرية السياسية والاقتصاد السياسي. أعمال ميل الرئيسية تشمل 'في الحرية' و'النفعية' و'استعباد النساء'. صقل وطور الفلسفة النفعية لجيريمي بنثام، مجادلاً أن ليس كل المتع متساوية وأن المتع العليا (الفكرية والأخلاقية) أكثر قيمة من المتع الدنيا (الجسدية). كان ميل أيضاً مدافعاً قوياً عن حقوق المرأة والحرية الفردية، مجادلاً أن السبب المشروع الوحيد للتدخل في الحرية الفردية هو منع الضرر للآخرين."
    },
    philosophicalImpact: {
      en: "Mill's refinement of utilitarianism and his defense of individual liberty influenced the development of liberal political theory and contemporary discussions of human rights. His work on women's rights and freedom of expression continues to be relevant to modern political philosophy.",
      ar: "أثر صقل ميل للنفعية ودفاعه عن الحرية الفردية في تطور النظرية السياسية الليبرالية والمناقشات المعاصرة لحقوق الإنسان. عمله في حقوق المرأة وحرية التعبير يستمر في كونه ذا صلة بالفلسفة السياسية الحديثة."
    }
  },
  {
    id: 36,
    name: {
      en: "Edmund Husserl",
      ar: "إدموند هوسرل"
    },
    school: {
      en: "Phenomenology",
      ar: "الظاهراتية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/husserl.jpg",
    shortDescription: {
      en: "German philosopher who founded phenomenology",
      ar: "فيلسوف ألماني أسس الظاهراتية"
    },
    birth: "1859",
    death: "1938",
    nationality: {
      en: "German",
      ar: "ألماني"
    },
    longArticle: {
      en: "Edmund Husserl was a German philosopher who established the school of phenomenology. In his early work, he elaborated critiques of historicism and of psychologism in logic based on analyses of intentionality. In his mature work, he sought to develop a systematic foundational science based on the so-called phenomenological reduction. Husserl's major works include 'Logical Investigations', 'Ideas', and 'The Crisis of European Sciences and Transcendental Phenomenology'. He argued that philosophy should focus on the description of phenomena as they appear in consciousness, rather than trying to explain them in terms of causes or underlying structures. Husserl's work influenced the development of existentialism and hermeneutics.",
      ar: "كان إدموند هوسرل فيلسوفاً ألمانياً أسس مدرسة الظاهراتية. في عمله المبكر، طور نقوداً للتاريخية والنفسية في المنطق مبنية على تحليلات القصدية. في عمله الناضج، سعى لتطوير علم أساسي منهجي مبنى على ما يسمى بالاختزال الظاهراتي. أعمال هوسرل الرئيسية تشمل 'التحقيقات المنطقية' و'الأفكار' و'أزمة العلوم الأوروبية والظاهراتية المتعالية'. جادل أن الفلسفة يجب أن تركز على وصف الظواهر كما تظهر في الوعي، بدلاً من محاولة شرحها من حيث الأسباب أو البنى الكامنة. أثر عمل هوسرل في تطور الوجودية والتأويلية."
    },
    philosophicalImpact: {
      en: "Husserl's phenomenology became the foundation for existentialism and influenced the development of contemporary continental philosophy. His method of phenomenological reduction continues to be studied in contemporary philosophy of mind and consciousness.",
      ar: "أصبحت الظاهراتية لهوسرل الأساس للوجودية وأثرت في تطور الفلسفة القارية المعاصرة. طريقته في الاختزال الظاهراتي تستمر في الدراسة في الفلسفة المعاصرة للعقل والوعي."
    }
  },
  {
    id: 37,
    name: {
      en: "Maurice Merleau-Ponty",
      ar: "موريس ميرلو-بونتي"
    },
    school: {
      en: "Phenomenology",
      ar: "الظاهراتية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/merleau-ponty.jpg",
    shortDescription: {
      en: "French phenomenological philosopher who focused on perception and embodiment",
      ar: "فيلسوف ظاهراتي فرنسي ركز على الإدراك والتجسد"
    },
    birth: "1908",
    death: "1961",
    nationality: {
      en: "French",
      ar: "فرنسي"
    },
    longArticle: {
      en: "Maurice Merleau-Ponty was a French phenomenological philosopher, strongly influenced by Edmund Husserl and Martin Heidegger. His major works include 'Phenomenology of Perception' and 'The Visible and the Invisible'. Merleau-Ponty focused on the role of the body in perception and argued that perception is not simply a matter of receiving sensory data but involves the body's active engagement with the world. He developed the concept of 'flesh' to describe the intertwining of subject and object in perception. Merleau-Ponty's work emphasized the importance of embodiment and challenged traditional Cartesian dualism between mind and body.",
      ar: "كان موريس ميرلو-بونتي فيلسوفاً ظاهراتياً فرنسياً تأثر بشدة بإدموند هوسرل ومارتن هايدغر. أعماله الرئيسية تشمل 'ظاهراتية الإدراك' و'المرئي وغير المرئي'. ركز ميرلو-بونتي على دور الجسد في الإدراك وجادل أن الإدراك ليس مجرد مسألة استقبال بيانات حسية بل يتضمن انخراط الجسد النشط مع العالم. طور مفهوم 'اللحم' لوصف تشابك الذات والموضوع في الإدراك. أكد عمل ميرلو-بونتي على أهمية التجسد وتحدى الثنائية الديكارتية التقليدية بين العقل والجسد."
    },
    philosophicalImpact: {
      en: "Merleau-Ponty's focus on embodiment and perception influenced the development of contemporary philosophy of mind and cognitive science. His challenge to Cartesian dualism continues to be relevant to discussions of consciousness and the body.",
      ar: "أثر تركيز ميرلو-بونتي على التجسد والإدراك في تطور الفلسفة المعاصرة للعقل وعلم الإدراك. تحديه للثنائية الديكارتية يستمر في كونه ذا صلة بمناقشات الوعي والجسد."
    }
  },
  {
    id: 38,
    name: {
      en: "Simone de Beauvoir",
      ar: "سيمون دي بوفوار"
    },
    school: {
      en: "Existentialism",
      ar: "الوجودية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/beauvoir.jpg",
    shortDescription: {
      en: "French existentialist philosopher who wrote 'The Second Sex'",
      ar: "فيلسوفة وجودية فرنسية كتبت 'الجنس الثاني'"
    },
    birth: "1908",
    death: "1986",
    nationality: {
      en: "French",
      ar: "فرنسية"
    },
    longArticle: {
      en: "Simone de Beauvoir was a French existentialist philosopher, writer, social theorist, and feminist activist. She is best known for her treatise 'The Second Sex', a detailed analysis of women's oppression and a foundational tract of contemporary feminism. Beauvoir was a close associate of Jean-Paul Sartre and shared many of his existentialist views. Her major works include 'The Ethics of Ambiguity', 'The Mandarins', and 'Memoirs of a Dutiful Daughter'. Beauvoir argued that 'one is not born, but rather becomes, a woman', emphasizing the social construction of gender. Her work on existentialist ethics and feminist theory influenced the development of contemporary feminist philosophy.",
      ar: "كانت سيمون دي بوفوار فيلسوفة وجودية وكاتبة ونظرية اجتماعية وناشطة نسوية فرنسية. اشتهرت ببحثها 'الجنس الثاني'، تحليل مفصل لقمع النساء ومقالة أساسية في النسوية المعاصرة. كانت بوفوار شريكة مقربة لجان بول سارتر وشاركت العديد من آرائه الوجودية. أعمالها الرئيسية تشمل 'أخلاقيات الغموض' و'المندارين' و'مذكرات ابنة مطيعة'. جادلت بوفوار أن 'المرء لا يولد امرأة، بل يصبح امرأة'، مؤكدة على البناء الاجتماعي للنوع الاجتماعي. أثر عملها في الأخلاق الوجودية والنظرية النسوية في تطور الفلسفة النسوية المعاصرة."
    },
    philosophicalImpact: {
      en: "Beauvoir's 'The Second Sex' became a foundational text of contemporary feminism and influenced the development of feminist philosophy and gender studies. Her existentialist analysis of women's oppression continues to be relevant to contemporary feminist theory.",
      ar: "أصبح 'الجنس الثاني' لبوفوار نصاً أساسياً في النسوية المعاصرة وأثر في تطور الفلسفة النسوية ودراسات النوع الاجتماعي. تحليلها الوجودي لقمع النساء يستمر في كونه ذا صلة للنظرية النسوية المعاصرة."
    }
  },
  {
    id: 39,
    name: {
      en: "Albert Camus",
      ar: "ألبير كامو"
    },
    school: {
      en: "Absurdism",
      ar: "العبثية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/camus.jpg",
    shortDescription: {
      en: "Algerian-French philosopher who developed the philosophy of the absurd",
      ar: "فيلسوف جزائري-فرنسي طور فلسفة العبث"
    },
    birth: "1913",
    death: "1960",
    nationality: {
      en: "Algerian-French",
      ar: "جزائري-فرنسي"
    },
    longArticle: {
      en: "Albert Camus was an Algerian-French philosopher, author, and journalist. He won the Nobel Prize in Literature in 1957. Camus is best known for his philosophical concept of the absurd, which he developed in works such as 'The Myth of Sisyphus' and 'The Stranger'. He argued that human beings naturally seek meaning and purpose in life, but the universe is indifferent and provides no answers. This creates an 'absurd' tension that humans must confront. Camus suggested that while life may be meaningless, we can still find happiness and create our own meaning through rebellion and solidarity. His work also addressed themes of colonialism, justice, and human dignity.",
      ar: "كان ألبير كامو فيلسوفاً وكاتباً وصحفياً جزائرياً-فرنسياً. فاز بجائزة نوبل في الأدب في 1957. اشتهر كامو بمفهومه الفلسفي في العبث، الذي طوره في أعمال مثل 'أسطورة سيزيف' و'الغريب'. جادل أن البشر يبحثون طبيعياً عن المعنى والغرض في الحياة، لكن الكون غير مبال ولا يوفر إجابات. هذا يخلق توتراً 'عبثياً' يجب على البشر مواجهته. اقترح كامو أنه بينما قد تكون الحياة بلا معنى، يمكننا لا يزال أن نجد السعادة ونخلق معنانا الخاص من خلال التمرد والتضامن. تناول عمله أيضاً موضوعات الاستعمار والعدالة والكرامة الإنسانية."
    },
    philosophicalImpact: {
      en: "Camus's philosophy of the absurd influenced the development of existentialism and continues to be relevant to contemporary discussions of meaning and purpose in life. His work on colonialism and justice remains important to political philosophy.",
      ar: "أثرت فلسفة كامو في العبث في تطور الوجودية وتستمر في كونه ذات صلة بالمناقشات المعاصرة للمعنى والغرض في الحياة. عمله في الاستعمار والعدالة يبقى مهماً للفلسفة السياسية."
    }
  },
  {
    id: 40,
    name: {
      en: "Hannah Arendt",
      ar: "حنة أرندت"
    },
    school: {
      en: "Political Philosophy",
      ar: "الفلسفة السياسية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/arendt.jpg",
    shortDescription: {
      en: "German-American political philosopher who analyzed totalitarianism",
      ar: "فيلسوفة سياسية ألمانية-أمريكية حللت الشمولية"
    },
    birth: "1906",
    death: "1975",
    nationality: {
      en: "German-American",
      ar: "ألمانية-أمريكية"
    },
    longArticle: {
      en: "Hannah Arendt was a German-American political philosopher who is widely considered one of the most important political thinkers of the 20th century. Her major works include 'The Origins of Totalitarianism', 'The Human Condition', and 'Eichmann in Jerusalem: A Report on the Banality of Evil'. Arendt analyzed the nature of totalitarianism and argued that evil is often banal rather than demonic. She developed the concept of 'the banality of evil' to describe how ordinary people can commit horrific acts when they fail to think critically about their actions. Arendt's work on political action, freedom, and the public sphere influenced the development of contemporary political theory.",
      ar: "كانت حنة أرندت فيلسوفة سياسية ألمانية-أمريكية يُعتبر على نطاق واسع إحدى أهم المفكرين السياسيين في القرن العشرين. أعمالها الرئيسية تشمل 'أصول الشمولية' و'الشرط الإنساني' و'أيخمان في القدس: تقرير عن تفاهة الشر'. حللت أرندت طبيعة الشمولية وجادلت أن الشر غالباً ما يكون تافهاً بدلاً من أن يكون شيطانياً. طورت مفهوم 'تفاهة الشر' لوصف كيف يمكن للناس العاديين ارتكاب أفعال مروعة عندما يفشلون في التفكير النقدي حول أفعالهم. أثر عمل أرندت في الفعل السياسي والحرية والمجال العام في تطور النظرية السياسية المعاصرة."
    },
    philosophicalImpact: {
      en: "Arendt's analysis of totalitarianism and her concept of the banality of evil influenced the development of contemporary political theory and continue to be relevant to understanding modern political phenomena. Her work on political action and freedom remains important to democratic theory.",
      ar: "أثر تحليل أرندت للشمولية ومفهومها في تفاهة الشر في تطور النظرية السياسية المعاصرة وتستمر في كونه ذات صلة لفهم الظواهر السياسية الحديثة. عملها في الفعل السياسي والحرية يبقى مهماً للنظرية الديمقراطية."
    }
  },
  {
    id: 41,
    name: {
      en: "Noam Chomsky",
      ar: "نعوم تشومسكي"
    },
    school: {
      en: "Analytic Philosophy",
      ar: "الفلسفة التحليلية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/chomsky.jpg",
    shortDescription: {
      en: "American linguist and philosopher who revolutionized linguistics and cognitive science",
      ar: "لغوي وفيلسوف أمريكي ثور في اللغويات وعلم الإدراك"
    },
    birth: "1928",
    death: "",
    nationality: {
      en: "American",
      ar: "أمريكي"
    },
    longArticle: {
      en: "Noam Chomsky is an American linguist, philosopher, cognitive scientist, historian, social critic, and political activist. He is widely considered the father of modern linguistics and has made significant contributions to philosophy, cognitive science, and political theory. Chomsky's major works include 'Syntactic Structures', 'Aspects of the Theory of Syntax', and 'Manufacturing Consent'. He developed the theory of generative grammar and argued that humans have an innate capacity for language acquisition. Chomsky has also been a prominent critic of U.S. foreign policy and media, arguing that the media often serves to manufacture consent for government policies.",
      ar: "نعوم تشومسكي لغوي وفيلسوف وعالم إدراك ومؤرخ وناقد اجتماعي وناشط سياسي أمريكي. يُعتبر على نطاق واسع أب اللغويات الحديثة وقدم مساهمات مهمة في الفلسفة وعلم الإدراك والنظرية السياسية. أعمال تشومسكي الرئيسية تشمل 'البنى التركيبية' و'جوانب نظرية التركيب' و'تصنيع الموافقة'. طور نظرية النحو التوليدي وجادل أن البشر لديهم قدرة فطرية على اكتساب اللغة. كان تشومسكي أيضاً ناقداً بارزاً للسياسة الخارجية الأمريكية والإعلام، مجادلاً أن الإعلام غالباً ما يخدم في تصنيع الموافقة للسياسات الحكومية."
    },
    philosophicalImpact: {
      en: "Chomsky's work in linguistics and cognitive science revolutionized our understanding of language and mind. His political critiques and his analysis of media influence continue to be relevant to contemporary political philosophy and media studies.",
      ar: "أثر عمل تشومسكي في اللغويات وعلم الإدراك ثور في فهمنا للغة والعقل. نقوده السياسية وتحليله لتأثير الإعلام يستمر في كونه ذات صلة بالفلسفة السياسية ودراسات الإعلام المعاصرة."
    }
  },
  {
    id: 42,
    name: {
      en: "Judith Butler",
      ar: "جوديث بتلر"
    },
    school: {
      en: "Poststructuralism",
      ar: "ما بعد البنيوية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/butler.jpg",
    shortDescription: {
      en: "American philosopher who developed gender performativity theory",
      ar: "فيلسوفة أمريكية طورت نظرية أداء النوع الاجتماعي"
    },
    birth: "1956",
    death: "",
    nationality: {
      en: "American",
      ar: "أمريكية"
    },
    longArticle: {
      en: "Judith Butler is an American philosopher and gender theorist whose work has influenced political philosophy, ethics, and the fields of third-wave feminism, queer theory, and literary theory. Her major works include 'Gender Trouble: Feminism and the Subversion of Identity', 'Bodies That Matter: On the Discursive Limits of Sex', and 'Excitable Speech: A Politics of the Performative'. Butler developed the theory of gender performativity, arguing that gender is not something one is but something one does through repeated performances. She has also written extensively on topics such as hate speech, censorship, and the politics of mourning.",
      ar: "جوديث بتلر فيلسوفة ونظرية النوع الاجتماعي أمريكية أثر عملها في الفلسفة السياسية والأخلاق ومجالات النسوية الموجة الثالثة ونظرية المثلية والنظرية الأدبية. أعمالها الرئيسية تشمل 'مشكلة النوع الاجتماعي: النسوية وتقويض الهوية' و'الأجساد التي تهم: حول الحدود الخطابية للجنس' و'الكلام المثير: سياسة الأداء'. طورت بتلر نظرية أداء النوع الاجتماعي، مجادلة أن النوع الاجتماعي ليس شيئاً يكونه المرء بل شيئاً يفعله من خلال العروض المتكررة. كتبت أيضاً بشكل موسع في مواضيع مثل خطاب الكراهية والرقابة وسياسات الحداد."
    },
    philosophicalImpact: {
      en: "Butler's theory of gender performativity has fundamentally influenced contemporary feminist theory, queer theory, and gender studies. Her work on identity, power, and discourse continues to be relevant to contemporary political and social philosophy.",
      ar: "أثرت نظرية بتلر في أداء النوع الاجتماعي بشكل أساسي في النظرية النسوية المعاصرة ونظرية المثلية ودراسات النوع الاجتماعي. عملها في الهوية والسلطة والخطاب يستمر في كونه ذا صلة بالفلسفة السياسية والاجتماعية المعاصرة."
    }
  },
  {
    id: 43,
    name: {
      en: "Slavoj Žižek",
      ar: "سلافوي جيجك"
    },
    school: {
      en: "Continental Philosophy",
      ar: "الفلسفة القارية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/zizek.jpg",
    shortDescription: {
      en: "Slovenian philosopher who combines Lacanian psychoanalysis with Marxist theory",
      ar: "فيلسوف سلوفيني يجمع التحليل النفسي اللاكاني مع النظرية الماركسية"
    },
    birth: "1949",
    death: "",
    nationality: {
      en: "Slovenian",
      ar: "سلوفيني"
    },
    longArticle: {
      en: "Slavoj Žižek is a Slovenian philosopher, cultural theorist, and public intellectual who is internationally known for his work in continental philosophy, political theory, cultural studies, and psychoanalysis. His major works include 'The Sublime Object of Ideology', 'Looking Awry: An Introduction to Jacques Lacan through Popular Culture', and 'Living in the End Times'. Žižek combines the psychoanalytic theories of Jacques Lacan with the political philosophy of Karl Marx to analyze contemporary ideology and culture. He is known for his provocative style and his use of popular culture examples to illustrate complex philosophical concepts. Žižek's work addresses topics such as ideology, capitalism, democracy, and the role of the unconscious in politics.",
      ar: "سلافوي جيجك فيلسوف ونظري ثقافي ومفكر عام سلوفيني معروف دولياً لعمله في الفلسفة القارية والنظرية السياسية والدراسات الثقافية والتحليل النفسي. أعماله الرئيسية تشمل 'الموضوع المتعالي للأيديولوجيا' و'النظر منحرفاً: مقدمة لجاك لاكان من خلال الثقافة الشعبية' و'العيش في نهاية الأزمنة'. يجمع جيجك نظريات جاك لاكان التحليلية النفسية مع الفلسفة السياسية لكارل ماركس لتحليل الأيديولوجيا والثقافة المعاصرة. اشتهر بأسلوبه الاستفزازي واستخدامه أمثلة من الثقافة الشعبية لتوضيح المفاهيم الفلسفية المعقدة. يتناول عمل جيجك مواضيع مثل الأيديولوجيا والرأسمالية والديمقراطية ودور اللاوعي في السياسة."
    },
    philosophicalImpact: {
      en: "Žižek's synthesis of Lacanian psychoanalysis and Marxist theory has influenced contemporary continental philosophy and cultural studies. His analysis of ideology and his critique of capitalism continue to be relevant to contemporary political and social theory.",
      ar: "أثر جمع جيجك التحليل النفسي اللاكاني والنظرية الماركسية في الفلسفة القارية والدراسات الثقافية المعاصرة. تحليله للأيديولوجيا ونقده للرأسمالية يستمر في كونه ذا صلة للنظرية السياسية والاجتماعية المعاصرة."
    }
  },
  {
    id: 44,
    name: {
      en: "Gayatri Chakravorty Spivak",
      ar: "غاياتري شاكرافورتي سبيفاك"
    },
    school: {
      en: "Postcolonial Theory",
      ar: "النظرية ما بعد الاستعمارية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/spivak.jpg",
    shortDescription: {
      en: "Indian literary theorist and feminist who developed postcolonial theory",
      ar: "نظرية أدبية ونسوية هندية طورت النظرية ما بعد الاستعمارية"
    },
    birth: "1942",
    death: "",
    nationality: {
      en: "Indian",
      ar: "هندية"
    },
    longArticle: {
      en: "Gayatri Chakravorty Spivak is an Indian literary theorist, feminist critic, postcolonial theorist, and professor of comparative literature. She is best known for her essay 'Can the Subaltern Speak?' which is considered a foundational text of postcolonial studies. Spivak's major works include 'In Other Worlds: Essays in Cultural Politics', 'The Post-Colonial Critic: Interviews, Strategies, Dialogues', and 'A Critique of Postcolonial Reason: Toward a History of the Vanishing Present'. She combines deconstruction, Marxism, feminism, and postcolonial theory to analyze issues of representation, power, and the voice of the marginalized. Spivak's work has been influential in postcolonial studies, feminist theory, and cultural studies.",
      ar: "غاياتري شاكرافورتي سبيفاك نظرية أدبية وناقدة نسوية ونظرية ما بعد استعمارية وأستاذة الأدب المقارن هندية. اشتهرت بمقالها 'هل يمكن للتابع أن يتكلم؟' الذي يُعتبر نصاً أساسياً في الدراسات ما بعد الاستعمارية. أعمال سبيفاك الرئيسية تشمل 'في عوالم أخرى: مقالات في السياسة الثقافية' و'الناقد ما بعد الاستعماري: مقابلات واستراتيجيات وحوارات' و'نقد العقل ما بعد الاستعماري: نحو تاريخ الحاضر المتلاشي'. تجمع التفكيك والماركسية والنسوية والنظرية ما بعد الاستعمارية لتحليل قضايا التمثيل والسلطة وصوت المهمشين. كان عمل سبيفاك مؤثراً في الدراسات ما بعد الاستعمارية والنظرية النسوية والدراسات الثقافية."
    },
    philosophicalImpact: {
      en: "Spivak's work has been foundational for postcolonial studies and has influenced the development of contemporary feminist and cultural theory. Her analysis of the subaltern and her critique of representation continue to be relevant to understanding power dynamics in contemporary society.",
      ar: "كان عمل سبيفاك أساسياً للدراسات ما بعد الاستعمارية وأثر في تطور النظرية النسوية والثقافية المعاصرة. تحليلها للتابع ونقدها للتمثيل يستمر في كونه ذات صلة لفهم ديناميكيات السلطة في المجتمع المعاصر."
    }
  },
  {
    id: 45,
    name: {
      en: "Kwame Anthony Appiah",
      ar: "كوامي أنتوني أبياه"
    },
    school: {
      en: "Analytic Philosophy",
      ar: "الفلسفة التحليلية"
    },
    era: {
      en: "Contemporary Philosophy",
      ar: "الفلسفة المعاصرة"
    },
    image: "/images/philosophers/appiah.jpg",
    shortDescription: {
      en: "Ghanaian-British-American philosopher who works on ethics and identity",
      ar: "فيلسوف غاني-بريطاني-أمريكي يعمل في الأخلاق والهوية"
    },
    birth: "1954",
    death: "",
    nationality: {
      en: "Ghanaian-British-American",
      ar: "غاني-بريطاني-أمريكي"
    },
    longArticle: {
      en: "Kwame Anthony Appiah is a Ghanaian-British-American philosopher and novelist who works in moral and political philosophy, the philosophy of language and mind, and African intellectual history. His major works include 'In My Father's House: Africa in the Philosophy of Culture', 'The Ethics of Identity', and 'Cosmopolitanism: Ethics in a World of Strangers'. Appiah has written extensively on issues of identity, race, and cosmopolitanism, arguing for a form of cosmopolitanism that respects local identities while promoting universal ethical principles. He has also worked on topics such as honor, shame, and the role of culture in moral development. Appiah's work combines analytic philosophy with insights from African and postcolonial thought.",
      ar: "كوامي أنتوني أبياه فيلسوف وروائي غاني-بريطاني-أمريكي يعمل في الفلسفة الأخلاقية والسياسية وفلسفة اللغة والعقل والتاريخ الفكري الأفريقي. أعماله الرئيسية تشمل 'في بيت أبي: أفريقيا في فلسفة الثقافة' و'أخلاقيات الهوية' و'الكونية: الأخلاق في عالم الغرباء'. كتب أبياه بشكل موسع في قضايا الهوية والعرق والكونية، مجادلاً لصالح شكل من الكونية يحترم الهويات المحلية بينما يعزز المبادئ الأخلاقية العالمية. عمل أيضاً في مواضيع مثل الشرف والعار ودور الثقافة في التطور الأخلاقي. يجمع عمل أبياه الفلسفة التحليلية مع رؤى من الفكر الأفريقي وما بعد الاستعماري."
    },
    philosophicalImpact: {
      en: "Appiah's work on cosmopolitanism and identity has influenced contemporary discussions of multiculturalism and global ethics. His synthesis of analytic philosophy with African and postcolonial thought continues to be relevant to contemporary political and moral philosophy.",
      ar: "أثر عمل أبياه في الكونية والهوية في المناقشات المعاصرة للتعددية الثقافية والأخلاق العالمية. جمعه الفلسفة التحليلية مع الفكر الأفريقي وما بعد الاستعماري يستمر في كونه ذا صلة للفلسفة السياسية والأخلاقية المعاصرة."
    }
  }
];
