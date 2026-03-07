import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Eye, ArrowLeft, Facebook, MessageCircle, Twitter, Loader2, AlertCircle, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { articlesApi } from '../lib/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [topStories, setTopStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch main article
      const item = await articlesApi.getById(id);
      setArticle(item);

      // Fetch top stories (just take 5 latest)
      const list = await articlesApi.getAll({ limit: 5 });
      setTopStories(list.data.filter(a => a._id !== id).slice(0, 3));

    } catch (err) {
      setError(err.message || 'ไม่พบข้อมูลบทความ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24 px-4 text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p>กำลังโหลดบทความ...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-4 text-slate-800">{error || 'ไม่พบข้อมูลบทความ'}</h2>
        <Link to="/articles" className="text-primary-600 hover:underline flex items-center font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> กลับหน้าบทความ
        </Link>
      </div>
    );
  }

  // Share handlers
  const shareFB = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  const shareLine = () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`);
  const shareX = () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`);

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 px-4">
      <Helmet>
        <title>{article.title} | C&P Building Houses</title>
        <meta name="description" content={article.summary} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.summary} />
        <meta property="og:image" content={article.image?.url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Main Article */}
        <article className="flex-1">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2" aria-label="breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">หน้าแรก</Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-primary-600 transition-colors">บทความ</Link>
            <span>/</span>
            <span className="text-slate-600 font-medium line-clamp-1">{article.title}</span>
          </nav>

          {/* Cover Image/Gradient */}
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden mb-10 shadow-lg border border-slate-100 bg-slate-50">
            {article.image?.url ? (
              <img src={article.image.url} alt={article.title} className="w-full h-full object-cover object-center" />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${article.gradient || 'from-slate-100 to-slate-200'} flex items-center justify-center`}>
                <FileText className="w-20 h-20 text-white/50" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {article.category}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm py-4 border-y border-slate-50">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                {new Date(article.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary-500" />
                {article.views?.toLocaleString() || '0'} views
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-500" />
                {article.author}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-slate max-w-none mb-12">
            <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
              {article.content}
            </div>
          </div>

          {/* Share */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-slate-50 rounded-2xl mb-12 border border-slate-100">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">แชร์บทความนี้ :</span>
            <div className="flex gap-4">
              <button onClick={shareFB} className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#1877F3] hover:scale-110 hover:bg-white transition-all">
                <Facebook className="w-6 h-6" />
              </button>
              <button onClick={shareLine} className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#06C755] hover:scale-110 hover:bg-white transition-all">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button onClick={shareX} className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[#111] hover:scale-110 hover:bg-white transition-all">
                <Twitter className="w-6 h-6" />
              </button>
            </div>
          </div>

          <Link to="/articles" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:underline group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            กลับหน้าบทความ
          </Link>
        </article>

        {/* Sidebar / Top Stories */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h2 className="text-lg font-bold mb-6 text-slate-900 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary-600 rounded-full" />
                บทความที่คุณอาจสนใจ
              </h2>
              <div className="space-y-6">
                {topStories.length === 0 ? (
                  <p className="text-xs text-slate-400">ไม่มีบทความแนะนำ</p>
                ) : (
                  topStories.map(story => (
                    <div key={story._id} className="group cursor-pointer">
                      <Link to={`/articles/${story._id}`} className="flex gap-4 items-start">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm bg-white">
                          {story.image?.url ? (
                            <img src={story.image.url} alt={story.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${story.gradient || 'from-slate-100 to-slate-200'} flex items-center justify-center p-4`}>
                              <FileText className="w-8 h-8 text-white/50" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-slate-800 group-hover:text-primary-600 line-clamp-2 transition-colors leading-snug">
                            {story.title}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-primary-500" />
                            {new Date(story.createdAt).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-primary-600 rounded-2xl p-6 text-white text-center shadow-xl shadow-primary-500/20">
              <h3 className="text-lg font-bold mb-2">สนใจปลูกสร้างบ้าน?</h3>
              <p className="text-sm text-primary-100 mb-6">ปรึกษาเราฟรี! ทีมงานสถาปนิกพร้อมดูแล</p>
              <Link to="/contact" className="block w-full py-3 bg-white text-primary-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors shadow-lg">
                ติดต่อสอบถาม
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ArticleDetail;