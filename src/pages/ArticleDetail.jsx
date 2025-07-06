import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, ArrowLeft, Facebook, MessageCircle, Twitter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Mock images (ใช้ herobg.jpg เป็น placeholder)
import cover1 from '../assets/herobg.jpg';
import cover2 from '../assets/herobg.jpg';
import cover3 from '../assets/herobg.jpg';
import cover4 from '../assets/herobg.jpg';

const articles = [
  {
    id: 1,
    title: '5 เทรนด์การออกแบบบ้านยุค 2024',
    summary: 'เทรนด์การออกแบบบ้านที่กำลังเป็นที่นิยม พร้อมแนวโน้มที่จะมาแรงในปีนี้ ตั้งแต่การใช้วัสดุธรรมชาติ จนถึงการออกแบบที่เป็นมิตรกับสิ่งแวดล้อม',
    date: '15 มกราคม 2024',
    author: 'ทีมสถาปนิก C&P',
    category: 'ออกแบบ',
    readTime: '5 นาที',
    views: '1.2k',
    content: 'เนื้อหาบทความฉบับเต็มสำหรับ 5 เทรนด์การออกแบบบ้านยุค 2024 ...',
    gradient: 'from-blue-500 to-purple-600',
    image: cover1
  },
  {
    id: 2,
    title: 'วัสดุก่อสร้างเป็นมิตรกับสิ่งแวดล้อม',
    summary: 'รู้จักวัสดุก่อสร้างใหม่ที่ช่วยลดการปล่อยคาร์บอน และประหยัดพลังงาน พร้อมคำแนะนำในการเลือกใช้วัสดุที่เหมาะสมกับโครงการของคุณ',
    date: '10 มกราคม 2024',
    author: 'ทีมวิศวกร C&P',
    category: 'วัสดุ',
    readTime: '7 นาที',
    views: '980',
    content: 'เนื้อหาบทความฉบับเต็มสำหรับ วัสดุก่อสร้างเป็นมิตรกับสิ่งแวดล้อม ...',
    gradient: 'from-green-500 to-emerald-600',
    image: cover2
  },
  {
    id: 3,
    title: 'เคล็ดลับการประหยัดค่าก่อสร้าง',
    summary: 'วิธีการลดต้นทุนในการก่อสร้างโดยไม่ลดคุณภาพ ตั้งแต่การวางแผนงบประมาณ การเลือกวัสดุ จนถึงเทคนิคการก่อสร้างที่ช่วยประหยัด',
    date: '5 มกราคม 2024',
    author: 'ทีมโครงการ C&P',
    category: 'เคล็ดลับ',
    readTime: '6 นาที',
    views: '2.1k',
    content: 'เนื้อหาบทความฉบับเต็มสำหรับ เคล็ดลับการประหยัดค่าก่อสร้าง ...',
    gradient: 'from-primary-500 to-primary-700',
    image: cover3
  },
  {
    id: 4,
    title: 'Smart Home: บ้านอัจฉริยะยุคใหม่',
    summary: 'เทคโนโลยีบ้านอัจฉริยะที่จะเปลี่ยนวิธีการใช้ชีวิต ตั้งแต่ระบบควบคุมแสง อุณหภูมิ การรักษาความปลอดภัย และการประหยัดพลังงาน',
    date: '1 มกราคม 2024',
    author: 'ทีมเทคโนโลยี C&P',
    category: 'นวัตกรรม',
    readTime: '8 นาที',
    views: '1.8k',
    content: 'เนื้อหาบทความฉบับเต็มสำหรับ Smart Home: บ้านอัจฉริยะยุคใหม่ ...',
    gradient: 'from-purple-500 to-pink-600',
    image: cover4
  }
];

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find(a => String(a.id) === String(id));
  const topStories = articles.filter(a => String(a.id) !== String(id)).slice(0, 3);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24 px-4">
        <h2 className="text-2xl font-bold mb-4 text-red-500">ไม่พบข้อมูลบทความ</h2>
        <Link to="/articles" className="text-primary-600 hover:underline flex items-center"><ArrowLeft className="w-4 h-4 mr-1"/> กลับหน้าบทความ</Link>
      </div>
    );
  }

  // Share handlers
  const shareFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  const shareLine = () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`);
  const shareX = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`);

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <Helmet>
        <title>{article.title} | C&P Building Houses</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
      </Helmet>
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Main Article */}
        <article className="flex-1">
          {/* Breadcrumb */}
          <nav className="text-sm text-secondary-500 mb-4 flex items-center gap-2" aria-label="breadcrumb">
            <Link to="/" className="hover:underline">หน้าแรก</Link>
            <span>/</span>
            <Link to="/articles" className="hover:underline">บทความ</Link>
            <span>/</span>
            <span className="text-secondary-700 font-medium line-clamp-1">{article.title}</span>
          </nav>
          {/* Cover Image */}
          <div className="w-full h-56 md:h-80 rounded-xl overflow-hidden mb-8">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
          </div>
          {/* Meta Info */}
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-2 leading-tight">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-secondary-500 text-sm mb-2">
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{article.date}</span>
              <span className="flex items-center"><Eye className="w-4 h-4 mr-1" />{article.views}</span>
              <span>{article.readTime}</span>
              <span className="flex items-center"><User className="w-4 h-4 mr-1" />{article.author}</span>
              <span className="inline-block bg-primary-600 text-white rounded-full px-3 py-1 text-xs font-medium ml-2">{article.category}</span>
            </div>
          </header>
          {/* Content */}
          <div className="prose max-w-none text-secondary-700 text-lg leading-relaxed mb-8">
            {article.content}
          </div>
          {/* Share */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium text-secondary-700">แชร์ :</span>
            <button
              onClick={shareFB}
              className="rounded-full bg-white shadow hover:scale-110 transition-transform border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="แชร์ Facebook"
              style={{ color: '#1877F3' }}
            >
              <Facebook className="w-6 h-6" />
            </button>
            <button
              onClick={shareLine}
              className="rounded-full bg-white shadow hover:scale-110 transition-transform border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="แชร์ Line"
              style={{ color: '#06C755' }}
            >
              <MessageCircle className="w-6 h-6" />
            </button>
            <button
              onClick={shareX}
              className="rounded-full bg-white shadow hover:scale-110 transition-transform border border-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="แชร์ X"
              style={{ color: '#111' }}
            >
              <Twitter className="w-6 h-6" />
            </button>
          </div>
          <Link to="/articles" className="inline-flex items-center text-primary-600 hover:underline"><ArrowLeft className="w-4 h-4 mr-1"/> กลับหน้าบทความ</Link>
        </article>
        {/* Top Stories */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-lg font-bold mb-4 text-secondary-800">Top Stories</h2>
            <ul className="space-y-4">
              {topStories.map(story => (
                <li key={story.id} className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={story.image} alt={story.title} className="w-full h-full object-cover object-center" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/articles/${story.id}`} className="font-medium text-secondary-800 hover:text-primary-600 line-clamp-2">
                      {story.title}
                    </Link>
                    <div className="text-xs text-secondary-500 mt-1 line-clamp-1">{story.summary}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ArticleDetail; 