# ซีแอนด์พี บิลดิ้งเฮ้าส์ - เว็บแอพพลิเคชัน

เว็บแอพพลิเคชันแบบ Modern สำหรับบริษัท ซีแอนด์พี บิลดิ้งเฮ้าส์ จำกัด ผู้เชี่ยวชาญด้านการก่อสร้าง การออกแบบ และการปรับปรุงอาคาร

## ฟีเจอร์หลัก

- **React + Vite** - เฟรมเวิร์คที่ทันสมัยและเร็ว
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library ที่ทรงพลัง
- **Responsive Design** - รองรับการใช้งานบนอุปกรณ์ทุกขนาด
- **Modern UI/UX** - ดีไซน์ที่สะอาดตา หรูหรา และเป็นมืออาชีพ

## บริการที่นำเสนอ

1. **รับเหมาก่อสร้าง** - บริการรับเหมาก่อสร้างครบวงจร
2. **RENOVATE** - บริการปรับปรุงและตกแต่งอาคาร
3. **ออกแบบ** - บริการออกแบบสถาปัตยกรรมและภายใน
4. **ต่อเติม** - บริการต่อเติมอาคารและเพิ่มพื้นที่ใช้สอย

## การติดตั้งและใช้งาน

### ขั้นตอนที่ 1: ติดตั้ง Dependencies
```bash
# ใช้ npm
npm install

# หรือใช้ yarn
yarn install

# หรือใช้ pnpm
pnpm install
```

### ขั้นตอนที่ 2: รันโปรเจค
```bash
# Development mode
npm run dev

# หรือ
yarn dev
```

### ขั้นตอนที่ 3: เปิดเว็บเบราว์เซอร์
เปิด `http://localhost:3000` ในเว็บเบราว์เซอร์

## โครงสร้างไฟล์

```
candpbuilding/
├── public/             # Static files
├── src/
│   ├── components/     # React components
│   │   ├── About.jsx
│   │   ├── BackToTop.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Portfolio.jsx
│   │   └── Services.jsx
│   ├── App.jsx         # Main app component
│   ├── index.css       # Global styles
│   └── main.jsx        # React entry point
├── index.html          # HTML template
├── package.json        # Dependencies และ scripts
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── README.md           # Documentation
```

## Available Scripts

```bash
# เริ่ม development server
npm run dev

# Build สำหรับ production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## ฟีเจอร์เด่น

### 🎨 Modern Design
- ใช้ฟอนต์ Kanit สำหรับการแสดงผลภาษาไทยที่สวยงาม
- Color scheme ที่ทันสมัยด้วย Tailwind CSS
- Gradient backgrounds และ modern shadows
- Clean และ minimalist UI design

### 📱 Responsive & Accessible
- Mobile-first responsive design
- Flexible grid system with Tailwind
- Touch-friendly interactive elements
- Semantic HTML structure

### ⚡ Performance & UX
- Fast loading with Vite bundling
- Smooth scrolling navigation
- Portfolio filtering system
- Real-time contact form validation
- Optimized animations with Framer Motion

### 🎭 Advanced Animations
- Entrance animations with Intersection Observer
- Micro-interactions on hover
- Counter animations สำหรับสถิติ
- Typing effect สำหรับหัวข้อหลัก
- Page transitions

## การปรับแต่ง

### เปลี่ยนสี
แก้ไขสีใน `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#dc2626', // สีหลัก
        // ... other shades
      }
    }
  }
}
```

### เปลี่ยนเนื้อหา
- แก้ไขข้อความใน React components (`src/components/`)
- เปลี่ยน icons ใน Lucide React
- ปรับแต่งข้อมูลติดต่อใน `Contact.jsx`

### เพิ่ม Components ใหม่
1. สร้างไฟล์ component ใหม่ใน `src/components/`
2. Import และใช้งานใน `App.jsx`
3. เพิ่ม styles ด้วย Tailwind classes

## เทคโนโลยีที่ใช้

### Core Technologies
- **React 18** - JavaScript library สำหรับสร้าง UI
- **Vite** - Build tool ที่เร็วและทันสมัย
- **Tailwind CSS** - Utility-first CSS framework

### Libraries & Packages
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **React Intersection Observer** - Scroll animations
- **Lucide React** - Modern icon library
- **Google Fonts (Kanit)** - ฟอนต์ภาษาไทย

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Browser Support

- ✅ Chrome (แนะนำ)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (การรองรับจำกัด)

## การพัฒนาต่อ

### สิ่งที่สามารถเพิ่มเติมได้:
- ระบบ CMS สำหรับจัดการเนื้อหา
- Database สำหรับเก็บข้อมูลโครงการ
- ระบบแชทออนไลน์
- Google Maps integration
- ระบบจองคิว/นัดหมาย
- Blog section
- ระบบค้นหาโครงการ

## ข้อมูลติดต่อ

หากต้องการสอบถามเพิ่มเติมหรือขอความช่วยเหลือในการปรับแต่ง:

📧 **Email**: contact@cpbuildinghouse.com  
📞 **โทร**: 02-123-4567  
🏢 **ที่อยู่**: กรุงเทพฯ 10110

---

**© 2024 บริษัท ซีแอนด์พี บิลดิ้งเฮ้าส์ จำกัด สงวนลิขสิทธิ์** 