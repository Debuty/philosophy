import React from 'react';
import './Articles.scss';
// import { supabase } from '../../supabaseClient';
import ArticlesCard from './components/ArticlesCard';

const Articles: React.FC = () => {
  
  

  
  const article =[ {
    title: {
      en: "The Future of Artificial Intelligence",
      ar: "المستقبل التكنولوجي الذكاء الاصطناعي"
    },  
    description: {
      en: "Explain the future of Artificial Intelligence and how it will change the world",
      ar: "شرح المستقبل التكنولوجي الذكاء الاصطناعي وكيف سيتغير العالم"
    },
    content: {
      en: "It will be the most important technology in the future and how it will change the world",
      ar: "سيكون أكثر التكنولوجيات الأهمية في المستقبل وكيف سيتغير العالم"
    },
    author_name: {
      en: "Socrates",
      ar: "سقراط"
    },
    author_field: {
      en: "Philosopher",
      ar: "فيلسوف"
    },
    author_avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Head_Sokrates_Glyptothek_Munich.jpg",
    category: {
      en: "Philosophy",
      ar: "فلسفة"
    },
    date: {
      en: "2025-01-01",
      ar: "2025-01-01"
    },
    likes: 100,
    dislikes: 10,
  },
  {
    title: {
      en: "The Future of Artificial Intelligence",
      ar: "المستقبل التكنولوجي الذكاء الاصطناعي"
    },
    description: {
      en: "Explain the future of Artificial Intelligence and how it will change the world",
      ar: "شرح المستقبل التكنولوجي الذكاء الاصطناعي وكيف سيتغير العالم"
    },
    content: {
      en: "It will be the most important technology in the future and how it will change the world",
      ar: "سيكون أكثر التكنولوجيات الأهمية في المستقبل وكيف سيتغير العالم"
    },
    author_name: {
      en: "Socrates",
      ar: "سقراط"
    },
    author_field: {
      en: "Philosopher",
      ar: "فيلسوف"
    },
    author_avatar: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Head_Sokrates_Glyptothek_Munich.jpg",
      category: {
      en: "Philosophy",
      ar: "فلسفة"
    },
    date: {
      en: "2025-01-01",
      ar: "2025-01-01"
    },
    likes: 100,
    dislikes: 10,
  }
]


  return (
    <div className="articles">
      {article.map((article) => (
        <ArticlesCard article={article} />
      ))}
     
    </div>
  );
};

export default Articles;
