// ============================================================
// LandingPage.jsx — Page awal LMS SMK Citra Negara
// Cara pakai: import LandingPage from './LandingPage'
// Warna utama: #3B5B7A
// ============================================================
import React from 'react';

const css = `
  :root{
    --biru:#3B5B7A;
    --biru-gelap:#2E4861;
    --biru-muda:#6C92B8;
    --biru-muda2:#54769A;
    --biru-bg:#EAF0F5;
    --teks:#2B3A4A;
  }
  *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',Arial,sans-serif;font-weight:500;}
  .lp-body{background:#fff;color:var(--teks);}

  /* NAVBAR */
  .lp-nav{position:fixed;top:0;left:0;right:0;background:var(--biru);z-index:100;box-shadow:0 2px 12px rgba(0,0,0,.15);}
  .lp-nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:10px 24px;}
  .lp-nav-logo{display:flex;align-items:center;gap:12px;color:#fff;}
  .lp-nav-logo img{height:48px;}
  .lp-nav-logo .lp-brand b{font-size:15px;display:block;letter-spacing:.5px;font-weight:800;}
  .lp-nav-logo .lp-brand span{font-size:10px;color:#C8D6E2;}
  .lp-nav-links{display:flex;align-items:center;gap:26px;}
  .lp-nav-links a{color:#DCE6F0;text-decoration:none;font-size:13px;font-weight:700;transition:.2s;}
  .lp-nav-links a:hover{color:var(--biru-muda);}
  .lp-btn-masuk{background:var(--biru-muda);color:#fff;border:none;border-radius:20px;padding:9px 24px;font-size:13px;font-weight:800;cursor:pointer;transition:.2s;text-decoration:none;}
  .lp-btn-masuk:hover{background:var(--biru-muda2);transform:translateY(-2px);}

  /* HERO */
  .lp-hero{background:linear-gradient(135deg,var(--biru) 0%,var(--biru-gelap) 100%);padding:150px 24px 90px;color:#fff;position:relative;overflow:hidden;}
  .lp-hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:rgba(255,255,255,.04);top:-200px;right:-150px;}
  .lp-hero::after{content:'';position:absolute;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.05);bottom:-120px;left:-80px;}
  .lp-hero-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:50px;position:relative;z-index:2;}
  .lp-hero-text{flex:1;}
  .lp-hero-badge{display:inline-block;background:rgba(108,146,184,.25);border:1px solid var(--biru-muda);color:#BFD4E6;font-size:11px;font-weight:800;letter-spacing:2px;padding:6px 16px;border-radius:20px;margin-bottom:18px;}
  .lp-hero-text h1{font-size:40px;font-weight:800;line-height:1.2;margin-bottom:18px;}
  .lp-hero-text h1 span{color:var(--biru-muda);}
  .lp-hero-text p{font-size:15px;font-weight:600;line-height:1.8;color:#C8D6E2;margin-bottom:30px;}
  .lp-hero-btns{display:flex;gap:14px;flex-wrap:wrap;}
  .lp-btn-1{background:var(--biru-muda);color:#fff;border:none;border-radius:24px;padding:13px 32px;font-size:14px;font-weight:800;cursor:pointer;transition:.2s;text-decoration:none;display:inline-block;}
  .lp-btn-1:hover{background:var(--biru-muda2);transform:translateY(-2px);}
  .lp-btn-2{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.5);border-radius:24px;padding:13px 32px;font-size:14px;font-weight:700;cursor:pointer;transition:.2s;text-decoration:none;display:inline-block;}
  .lp-btn-2:hover{border-color:#fff;background:rgba(255,255,255,.08);}
  .lp-hero-img{flex:1;text-align:center;}
  .lp-hero-img img{width:100%;max-width:420px;filter:drop-shadow(0 20px 40px rgba(0,0,0,.3));animation:lp-float 4s ease-in-out infinite;}
  @keyframes lp-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}

  /* STATS */
  .lp-stats{background:var(--biru-gelap);padding:36px 24px;}
  .lp-stats-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center;color:#fff;}
  .lp-stat .angka{font-size:32px;font-weight:800;color:var(--biru-muda);}
  .lp-stat .label{font-size:12px;color:#C8D6E2;margin-top:4px;font-weight:600;}

  /* SECTION */
  .lp-section{padding:80px 24px;}
  .lp-section-inner{max-width:1100px;margin:0 auto;}
  .lp-sec-title{text-align:center;margin-bottom:14px;}
  .lp-sec-title .sub{font-size:11px;font-weight:800;letter-spacing:3px;color:var(--biru-muda);text-transform:uppercase;}
  .lp-sec-title h2{font-size:28px;font-weight:800;color:var(--biru);margin-top:8px;}
  .lp-sec-title p{font-size:13.5px;font-weight:600;color:#66788A;margin-top:10px;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.7;}

  /* FITUR */
  .lp-fitur-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px;}
  .lp-fitur-card{background:var(--biru-bg);border-radius:16px;padding:28px 24px;transition:.25s;border-top:4px solid transparent;}
  .lp-fitur-card:hover{transform:translateY(-8px);box-shadow:0 14px 30px rgba(59,91,122,.18);border-top-color:var(--biru-muda);background:#fff;}
  .lp-fitur-icon{width:52px;height:52px;border-radius:14px;background:var(--biru);color:#BFD4E6;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:16px;}
  .lp-fitur-card h3{font-size:16px;font-weight:800;color:var(--biru);margin-bottom:8px;}
  .lp-fitur-card p{font-size:12.5px;font-weight:600;color:#66788A;line-height:1.7;}

  /* TENTANG */
  .lp-tentang{background:var(--biru-bg);}
  .lp-tentang-grid{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center;}
  .lp-tentang-img{text-align:center;}
  .lp-tentang-img img{width:100%;max-width:380px;}
  .lp-tentang-text h2{font-size:26px;font-weight:800;color:var(--biru);margin-bottom:16px;}
  .lp-tentang-text p{font-size:13.5px;font-weight:600;color:#4A5A6A;line-height:1.9;margin-bottom:14px;}
  .lp-tentang-list{list-style:none;margin-top:18px;}
  .lp-tentang-list li{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;font-size:13px;font-weight:700;color:#3A4A5A;}
  .lp-tentang-list li::before{content:'\\2713';color:#fff;background:var(--biru-muda);border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;margin-top:1px;}

  /* CARA */
  .lp-cara-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:48px;}
  .lp-cara-card{background:#fff;border:1.5px solid #DCE4EB;border-radius:16px;padding:30px 24px;text-align:center;transition:.25s;}
  .lp-cara-card:hover{border-color:var(--biru);box-shadow:0 12px 26px rgba(59,91,122,.12);transform:translateY(-6px);}
  .lp-cara-num{width:44px;height:44px;border-radius:50%;background:var(--biru-muda);color:#fff;font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
  .lp-cara-card h3{font-size:15px;font-weight:800;color:var(--biru);margin-bottom:8px;}
  .lp-cara-card p{font-size:12.5px;font-weight:600;color:#66788A;line-height:1.7;}

  /* CTA */
  .lp-cta{background:linear-gradient(135deg,var(--biru),var(--biru-gelap));border-radius:20px;padding:50px 40px;text-align:center;color:#fff;position:relative;overflow:hidden;}
  .lp-cta::before{content:'';position:absolute;width:260px;height:260px;border-radius:50%;background:rgba(108,146,184,.2);top:-100px;right:-60px;}
  .lp-cta h2{font-size:26px;font-weight:800;margin-bottom:12px;position:relative;}
  .lp-cta p{font-size:14px;font-weight:600;color:#D8E4EE;margin-bottom:26px;position:relative;}
  .lp-cta .lp-btn-1{position:relative;}

  /* FOOTER */
  .lp-footer{background:var(--biru-gelap);color:#C8D6E2;padding:40px 24px 24px;font-size:12.5px;}
  .lp-footer-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr;gap:36px;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.12);}
  .lp-footer-inner h4{color:#fff;font-size:14px;font-weight:800;margin-bottom:14px;}
  .lp-footer-inner p{line-height:1.8;font-weight:600;}
  .lp-footer-inner a{color:#C8D6E2;text-decoration:none;display:block;margin-bottom:8px;font-weight:600;transition:.2s;}
  .lp-footer-inner a:hover{color:var(--biru-muda);}
  .lp-footer-bottom{max-width:1100px;margin:20px auto 0;text-align:center;font-size:11px;color:#8FA5B8;}

  @media (max-width:820px){
    .lp-hero-inner,.lp-tentang-grid{flex-direction:column;grid-template-columns:1fr;text-align:center;}
    .lp-hero-text p{margin-left:auto;margin-right:auto;}
    .lp-hero-btns{justify-content:center;}
    .lp-fitur-grid,.lp-cara-grid{grid-template-columns:1fr;}
    .lp-stats-inner{grid-template-columns:repeat(2,1fr);}
    .lp-footer-inner{grid-template-columns:1fr;}
    .lp-hero-text h1{font-size:30px;}
  }
`;

export default function LandingPage() {
  return (
    <div className="lp-body">
      <style>{css}</style>

      {/* NAVBAR */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-nav-logo">
            <img src="/assets/logo_sidebar.png" alt="LMS" />
            <div className="lp-brand">
              <b>LMS CITRA NEGARA</b>
              <span>Learning Management System</span>
            </div>
          </div>
          <div className="lp-nav-links">
            <a href="#beranda">Beranda</a>
            <a href="#fitur">Fitur</a>
            <a href="#tentang">Tentang</a>
            <a href="#cara">Cara Pakai</a>
            <a href="/" className="lp-btn-masuk">Masuk</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="lp-hero" id="beranda">
        <div className="lp-hero-inner">
          <div className="lp-hero-text">
            <div className="lp-hero-badge">PLATFORM PEMBELAJARAN DIGITAL</div>
            <h1>Learning<br />Management<br /><span>System</span></h1>
            <p>Satu platform untuk mengelola seluruh proses pembelajaran — materi, tugas,
               penilaian, nilai, dan pengumuman dalam satu tempat yang mudah diakses
               guru dan siswa kapan saja, di mana saja.</p>
            <div className="lp-hero-btns">
              <a href="/" className="lp-btn-1">&#128275; Masuk</a>
              <a href="#fitur" className="lp-btn-2">Pelajari Fitur &#10140;</a>
            </div>
          </div>
          <div className="lp-hero-img">
            <img src="/assets/illus_top.png" alt="Ilustrasi LMS" />
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="lp-stats">
        <div className="lp-stats-inner">
          <div className="lp-stat"><div className="angka">500+</div><div className="label">Siswa Aktif</div></div>
          <div className="lp-stat"><div className="angka">30+</div><div className="label">Guru Pengajar</div></div>
          <div className="lp-stat"><div className="angka">120+</div><div className="label">Materi Pembelajaran</div></div>
          <div className="lp-stat"><div className="angka">24/7</div><div className="label">Akses Online</div></div>
        </div>
      </div>

      {/* FITUR */}
      <section className="lp-section" id="fitur">
        <div className="lp-section-inner">
          <div className="lp-sec-title">
            <div className="sub">Fitur Unggulan</div>
            <h2>Semua Kebutuhan Belajar dalam Satu Sistem</h2>
            <p>LMS SMK Citra Negara dirancang untuk memudahkan guru mengajar
               dan siswa belajar secara terpadu.</p>
          </div>
          <div className="lp-fitur-grid">
            <div className="lp-fitur-card"><div className="lp-fitur-icon">&#128218;</div><h3>Materi Pembelajaran</h3>
              <p>Guru dapat mengunggah dan mengelola materi pelajaran secara digital, mudah diakses siswa kapan saja.</p></div>
            <div className="lp-fitur-card"><div className="lp-fitur-icon">&#128203;</div><h3>Tugas Online</h3>
              <p>Buat dan distribusikan tugas dengan deadline jelas, pantau keterlambatan dan pengumpulan siswa.</p></div>
            <div className="lp-fitur-card"><div className="lp-fitur-icon">&#128221;</div><h3>Penilaian & Ujian</h3>
              <p>Susun kuis, ulangan harian, hingga ujian tengah dan akhir semester dengan sistem penilaian otomatis.</p></div>
            <div className="lp-fitur-card"><div className="lp-fitur-icon">&#128202;</div><h3>Rekap Nilai</h3>
              <p>Input dan simpan nilai siswa, predikat otomatis A–E, serta rekap performa belajar per kelas.</p></div>
            <div className="lp-fitur-card"><div className="lp-fitur-icon">&#128226;</div><h3>Pengumuman</h3>
              <p>Sebar informasi penting seperti jadwal ujian atau kegiatan sekolah langsung ke semua siswa.</p></div>
            <div className="lp-fitur-card"><div className="lp-fitur-icon">&#128197;</div><h3>Jadwal Belajar</h3>
              <p>Kelola jadwal pelajaran dan agenda akademik agar guru dan siswa selalu selaras waktunya.</p></div>
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section className="lp-section lp-tentang" id="tentang">
        <div className="lp-section-inner lp-tentang-grid">
          <div className="lp-tentang-img">
            <img src="/assets/illus_bottom.png" alt="Tentang LMS" />
          </div>
          <div className="lp-tentang-text">
            <div className="sub" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: '#6C92B8', textTransform: 'uppercase' }}>Tentang Sistem</div>
            <h2>Apa itu Learning Management System?</h2>
            <p>Learning Management System (LMS) adalah sistem manajemen pembelajaran berbasis
               digital yang menghubungkan guru, siswa, dan seluruh kegiatan akademik dalam
               satu platform terpadu.</p>
            <p>Dengan LMS SMK Citra Negara, proses belajar mengajar tidak lagi terbatas
               ruang kelas — semua materi, tugas, dan nilai tersimpan rapi dan aman.</p>
            <ul className="lp-tentang-list">
              <li>Akses pembelajaran 24/7 dari mana saja</li>
              <li>Data akademik tersimpan aman & terpusat</li>
              <li>Mempermudah monitoring progres siswa</li>
              <li>Gratis digunakan untuk seluruh warga sekolah</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CARA PAKAI */}
      <section className="lp-section" id="cara">
        <div className="lp-section-inner">
          <div className="lp-sec-title">
            <div className="sub">Cara Menggunakan</div>
            <h2>Mulai Belajar dalam 3 Langkah</h2>
          </div>
          <div className="lp-cara-grid">
            <div className="lp-cara-card"><div className="lp-cara-num">1</div><h3>Login Akun</h3>
              <p>Masuk menggunakan username dan password yang diberikan oleh admin sekolah melalui halaman login.</p></div>
            <div className="lp-cara-card"><div className="lp-cara-num">2</div><h3>Akses Dashboard</h3>
              <p>Pilih menu yang tersedia — materi, tugas, penilaian, nilai, hingga pengumuman sesuai kebutuhan.</p></div>
            <div className="lp-cara-card"><div className="lp-cara-num">3</div><h3>Belajar & Mengajar</h3>
              <p>Guru kelola pembelajaran, siswa akses materi dan kumpulkan tugas — semua tercatat otomatis.</p></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="lp-section" style={{ paddingTop: 0 }}>
        <div className="lp-section-inner">
          <div className="lp-cta">
            <h2>Siap Memulai Pembelajaran Digital?</h2>
            <p>Masuk sekarang dan rasakan kemudahan mengelola pembelajaran di LMS SMK Citra Negara.</p>
            <a href="/" className="lp-btn-1">Masuk &#10140;</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div>
            <h4>LMS SMK CITRA NEGARA</h4>
            <p>Platform pembelajaran digital yang menghubungkan guru dan siswa
               dalam satu ekosistem belajar yang modern, mudah, dan aman.</p>
          </div>
          <div>
            <h4>Menu</h4>
            <a href="#beranda">Beranda</a>
            <a href="#fitur">Fitur</a>
            <a href="#tentang">Tentang LMS</a>
            <a href="#cara">Cara Pakai</a>
          </div>
        </div>
        <div className="lp-footer-bottom">&copy; 2026 LMS SMK Citra Negara — Learning Management System. All rights reserved.</div>
      </footer>
    </div>
  );
}
