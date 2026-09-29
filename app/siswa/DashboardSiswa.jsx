"use client";

import React, { useEffect, useRef, useState } from "react";

// ---------- data awal ----------
const initialTugas = [
  { id: 1, judul: "Membuat ERD Toko Online", mapel: "Basis Data", due: "9 Sep 2026", done: false, file: null },
  { id: 2, judul: "Halaman Utama Sekolah", mapel: "Pemrograman Web", due: "7 Sep 2026", done: false, file: null },
  { id: 3, judul: "Laporan Jaringan LAN", mapel: "Jaringan Komputer", due: "2 Sep 2026", done: true, file: "laporan-lan.pdf" },
];

const materi = [
  { id: 1, judul: "Konsep Dasar Basis Data", mapel: "Basis Data", guru: "Ahmad Fauzan", isi: "Pengertian basis data, DBMS, tabel, baris, kolom, dan kunci utama." },
  { id: 2, judul: "Struktur HTML & CSS Lanjutan", mapel: "Pemrograman Web", guru: "Rina Amelia", isi: "Semantic tag, flexbox, grid, dan responsive design." },
  { id: 3, judul: "Dasar Jaringan Komputer", mapel: "Jaringan Komputer", guru: "Dewi Lestari", isi: "Topologi jaringan, model OSI, dan pengalamatan IP." },
];

const initialUjian = [
  {
    id: 1,
    judul: "Kuis Basis Data Bab 1",
    mapel: "Basis Data",
    st: "Belum dikerjakan",
    file: null,
    q: [
      { t: "Kepanjangan ERD adalah...", o: ["Entity Relationship Diagram", "Entity Record Data", "Extended Relation Design"], a: 0 },
      { t: "Kunci unik pada sebuah tabel disebut...", o: ["Foreign Key", "Primary Key", "Index Key"], a: 1 },
    ],
  },
  {
    id: 2,
    judul: "Ujian Harian HTML & CSS",
    mapel: "Pemrograman Web",
    st: "Belum dikerjakan",
    file: null,
    q: [
      { t: "Tag untuk membuat tautan adalah...", o: ["<link>", "<a>", "<href>"], a: 1 },
      { t: "Properti CSS untuk warna teks adalah...", o: ["color", "font-color", "text-style"], a: 0 },
    ],
  },
];

const nilai = [
  ["Basis Data", "Kuis 1", 85],
  ["Pemrograman Web", "Tugas 1", 90],
  ["Jaringan Komputer", "Ujian Harian", 78],
  ["Matematika", "Ujian Harian", 82],
];

const info = [
  ["Jadwal Ujian Tengah Semester", "UTS dimulai 22 September 2026. Jadwal per kelas ada di papan pengumuman.", "Semua", "20 Sep 2026"],
  ["Libur Semester Ganjil", "Libur mulai 20 Desember 2026 dan masuk kembali 5 Januari 2027.", "Semua", "1 Sep 2026"],
];

const PAGES = [
  ["home", "Beranda"],
  ["materi", "Materi"],
  ["ujian", "Assessment"],
  ["tugas", "Tugas"],
  ["nilai", "Nilai"],
  ["info", "Pengumuman"],
  ["profil", "Profil"],
];

const avg = () => Math.round((nilai.reduce((a, n) => a + n[2], 0) / nilai.length) * 10) / 10;

// ---------- sub komponen baris ----------
function TugasRow({ t, onUpload }) {
  return (
    <div className="row">
      <div>
        <b>{t.judul}</b>
        <div className="mu">
          {t.mapel} · tenggat {t.due}
          {t.file ? " · " + t.file : ""}
        </div>
      </div>
      <div className="acts">
        <span className={"badge" + (t.done ? " ok" : "")}>{t.done ? "Sudah Dikumpulkan" : "Belum Dikumpulkan"}</span>
        <button className={"btn" + (t.done ? "" : " p")} onClick={() => onUpload("t" + t.id)}>
          {t.done ? "Ganti file" : "Upload"}
        </button>
      </div>
    </div>
  );
}

function MateriRow({ m, onView, onDownload }) {
  return (
    <div className="row">
      <div>
        <b>{m.judul}</b>
        <div className="mu">
          {m.mapel} · {m.guru}
        </div>
      </div>
      <div className="acts">
        <button className="btn" onClick={() => onView(m.id)}>
          Lihat
        </button>
        <button className="btn p" onClick={() => onDownload(m.id)}>
          Unduh
        </button>
      </div>
    </div>
  );
}

function UjianRow({ u, onQuiz, onUpload }) {
  const ok = u.st !== "Belum dikerjakan";
  return (
    <div className="row">
      <div>
        <b>{u.judul}</b>
        <div className="mu">
          {u.mapel}
          {u.file ? " · " + u.file : ""}
        </div>
      </div>
      <div className="acts">
        <span className={"badge" + (ok ? " ok" : "")}>{u.st}</span>
        <button className="btn p" onClick={() => onQuiz(u.id)}>
          Kerjakan
        </button>
        <button className="btn" onClick={() => onUpload("u" + u.id)}>
          Upload jawaban
        </button>
      </div>
    </div>
  );
}

export default function DashboardSiswa() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [page, setPage] = useState("home");
  const [tugas, setTugas] = useState(initialTugas);
  const [ujian, setUjian] = useState(initialUjian);
  const [modal, setModal] = useState(null); // { type: 'view'|'quiz', id }
  const [toastMsg, setToastMsg] = useState("");
  const fileInputRef = useRef(null);
  const pendingUpload = useRef(null);
  const toastTimer = useRef(null);

  // kunci mode terang, jangan ikut dark mode sistem/browser
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(""), 2200);
  };

  const goto = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const startUpload = (key) => {
    pendingUpload.current = key;
    fileInputRef.current?.click();
  };

  const handleFileChosen = (e) => {
    const f = e.target.files?.[0];
    const key = pendingUpload.current;
    if (!f || !key) return;
    const isTugas = key[0] === "t";
    const id = Number(key.slice(1));
    if (isTugas) {
      setTugas((list) => list.map((it) => (it.id === id ? { ...it, file: f.name, done: true } : it)));
    } else {
      setUjian((list) => list.map((it) => (it.id === id ? { ...it, file: f.name, st: "Dikumpulkan" } : it)));
    }
    showToast("File " + f.name + " berhasil diupload");
    e.target.value = "";
  };

  const downloadMateri = (id) => {
    const m = materi.find((x) => x.id === id);
    if (!m) return;
    const blob = new Blob([m.judul + "\n" + m.mapel + " - " + m.guru + "\n\n" + m.isi], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = m.judul + ".txt";
    a.click();
    showToast("Mengunduh " + m.judul);
  };

  const submitQuiz = (id, answers) => {
    const u = ujian.find((x) => x.id === id);
    if (!u) return;
    const correct = u.q.filter((q, n) => Number(answers[n]) === q.a).length;
    const score = Math.round((correct / u.q.length) * 100);
    setUjian((list) => list.map((it) => (it.id === id ? { ...it, st: "Selesai · skor " + score } : it)));
    setModal(null);
    showToast("Jawaban terkirim");
  };

  if (!loggedIn) {
    return (
      <>
        <GlobalStyle />
        <div className="login">
          <div className="box">
            <h3>LMS SMK Citra Negara</h3>
            <p className="mu">Kamu sudah keluar. Masuk lagi untuk lanjut.</p>
            <input value="arya" disabled readOnly />
            <input type="password" value="••••••••" disabled readOnly />
            <button className="btn p" style={{ width: "100%", marginTop: 8 }} onClick={() => setLoggedIn(true)}>
              Masuk sebagai Siswa
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <div id="app">
        <aside>
          <div className="brand">
            <div className="logo">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#3B5B7A">
                <path d="M12 2l9 5v2H3V7l9-5zM5 11h2v7H5v-7zm4 0h2v7H9v-7zm4 0h2v7h-2v-7zm4 0h2v7h-2v-7zM3 20h18v2H3v-2z" />
              </svg>
            </div>
            <div>
              <b>Sistem Manajemen Pembelajaran</b>
              <small>Siswa</small>
            </div>
          </div>
          <nav>
            {PAGES.map(([k, l]) => (
              <button key={k} className={page === k ? "on" : ""} onClick={() => goto(k)}>
                {l}
              </button>
            ))}
          </nav>
          <div className="bot">
            <button onClick={() => setLoggedIn(false)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Keluar
            </button>
          </div>
        </aside>

        <main>
          <div className="top">
            <span>LMS SMK CITRA NEGARA</span>
            <div className="me">
              <div>
                <b>Arya</b>
                <div className="mu">XII PPLG 2</div>
              </div>
              <div className="av">AR</div>
            </div>
          </div>

          <div id="view">
            {page === "home" && (
              <>
                <h2>Selamat datang, Arya!</h2>
                <div className="quick">
                  {[
                    ["materi", "Materi"],
                    ["tugas", "Tugas"],
                    ["ujian", "Assessment"],
                    ["nilai", "Nilai Rata-Rata"],
                  ].map(([k, l]) => (
                    <button key={k} onClick={() => goto(k)}>
                      {l}
                    </button>
                  ))}
                </div>
                <section className="card">
                  <h3>
                    Tugas mendatang{" "}
                    <span className="lnk" onClick={() => goto("tugas")}>
                      Lihat semua
                    </span>
                  </h3>
                  {tugas.filter((t) => !t.done).slice(0, 2).length ? (
                    tugas
                      .filter((t) => !t.done)
                      .slice(0, 2)
                      .map((t) => <TugasRow key={t.id} t={t} onUpload={startUpload} />)
                  ) : (
                    <div className="row mu">Semua tugas sudah dikumpulkan.</div>
                  )}
                </section>
                <section className="card">
                  <h3>
                    Materi terbaru{" "}
                    <span className="lnk" onClick={() => goto("materi")}>
                      Lihat semua
                    </span>
                  </h3>
                  {materi.slice(0, 2).map((m) => (
                    <MateriRow key={m.id} m={m} onView={(id) => setModal({ type: "view", id })} onDownload={downloadMateri} />
                  ))}
                </section>
              </>
            )}

            {page === "materi" && (
              <>
                <h2>Materi</h2>
                <section className="card">
                  {materi.map((m) => (
                    <MateriRow key={m.id} m={m} onView={(id) => setModal({ type: "view", id })} onDownload={downloadMateri} />
                  ))}
                </section>
              </>
            )}

            {page === "ujian" && (
              <>
                <h2>Assessment</h2>
                <section className="card">
                  {ujian.map((u) => (
                    <UjianRow key={u.id} u={u} onQuiz={(id) => setModal({ type: "quiz", id })} onUpload={startUpload} />
                  ))}
                </section>
                <p className="mu">Kerjakan langsung di sini, atau upload jawaban dalam bentuk file.</p>
              </>
            )}

            {page === "tugas" && (
              <>
                <h2>Tugas</h2>
                <section className="card">
                  {tugas.map((t) => (
                    <TugasRow key={t.id} t={t} onUpload={startUpload} />
                  ))}
                </section>
              </>
            )}

            {page === "nilai" && (
              <>
                <h2>Nilai</h2>
                <section className="card">
                  <h3>Rata-rata</h3>
                  <div className="big">{avg()}</div>
                </section>
                <section className="card">
                  <table>
                    <tbody>
                      <tr>
                        <th>Mata Pelajaran</th>
                        <th>Jenis</th>
                        <th>Nilai</th>
                      </tr>
                      {nilai.map((n, i) => (
                        <tr key={i}>
                          <td>{n[0]}</td>
                          <td>{n[1]}</td>
                          <td>
                            <b>{n[2]}</b>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}

            {page === "info" && (
              <>
                <h2>Pengumuman</h2>
                <section className="card">
                  {info.map((i, idx) => (
                    <div className="row" key={idx}>
                      <div>
                        <b>{i[0]}</b>
                        <div className="mu">{i[1]}</div>
                      </div>
                      <div className="acts">
                        <span className="badge ok">{i[2]}</span>
                        <span className="mu">{i[3]}</span>
                      </div>
                    </div>
                  ))}
                </section>
              </>
            )}

            {page === "profil" && (
              <>
                <h2>Profil</h2>
                <section className="card">
                  <div className="row">
                    <div className="av" style={{ width: 56, height: 56, fontSize: 18 }}>
                      UP
                    </div>
                    <div style={{ flex: 1 }}>
                      <b style={{ fontSize: 16 }}>Arya</b>
                      <div className="mu">Siswa · XII PPLG 2</div>
                    </div>
                  </div>
                  {[
                    ["NIS", "2425107"],
                    ["Kelas", "XII PPLG 2"],
                    ["Jurusan", "Pengembangan Perangkat Lunak dan Gim"],
                    ["Wali Kelas", "Sri Wahyuni, S.Kom"],
                    ["Email", "arya@smkcitranegara.sch.id"],
                  ].map((r, i) => (
                    <div className="row" key={i}>
                      <span className="mu">{r[0]}</span>
                      <span>{r[1]}</span>
                    </div>
                  ))}
                </section>
              </>
            )}
          </div>
        </main>
      </div>

      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChosen} />

      {modal?.type === "view" && (
        <ViewMateriModal id={modal.id} onClose={() => setModal(null)} onDownload={downloadMateri} />
      )}
      {modal?.type === "quiz" && (
        <QuizModal id={modal.id} ujian={ujian} onClose={() => setModal(null)} onSubmit={submitQuiz} />
      )}

      {toastMsg && <div id="toast">{toastMsg}</div>}
    </>
  );
}

function ViewMateriModal({ id, onClose, onDownload }) {
  const m = materi.find((x) => x.id === id);
  if (!m) return null;
  return (
    <div className="modal">
      <div className="box">
        <h3>{m.judul}</h3>
        <p className="mu">
          {m.mapel} · {m.guru}
        </p>
        <p>{m.isi}</p>
        <div className="acts">
          <button className="btn" onClick={onClose}>
            Tutup
          </button>
          <button className="btn p" onClick={() => onDownload(m.id)}>
            Unduh
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizModal({ id, ujian, onClose, onSubmit }) {
  const u = ujian.find((x) => x.id === id);
  const [answers, setAnswers] = useState({});
  if (!u) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(id, answers);
  };

  return (
    <div className="modal">
      <div className="box">
        <h3>{u.judul}</h3>
        <form onSubmit={handleSubmit}>
          {u.q.map((q, n) => (
            <div className="q" key={n}>
              <b>
                {n + 1}. {q.t}
              </b>
              {q.o.map((o, j) => (
                <label key={j}>
                  <input
                    type="radio"
                    name={"q" + n}
                    value={j}
                    required
                    checked={answers[n] === String(j)}
                    onChange={(e) => setAnswers((a) => ({ ...a, [n]: e.target.value }))}
                  />{" "}
                  {o}
                </label>
              ))}
            </div>
          ))}
          <div className="acts">
            <button type="button" className="btn" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn p">
              Kirim jawaban
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function GlobalStyle() {
  return (
    <style>{`
:root{--brand:#3B5B7A;--dark:#2C4661;--gold:#c9a227;--bg:#f1f4f7;--card:#fff;--tx:#1f2933;--mu:#64748b;--ln:#e2e8f0;--lk:#3B5B7A;--bad:#fdecea;--badt:#b42318;--ok:#e7f6ec;--okt:#1a7f37;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
*{box-sizing:border-box}
[hidden]{display:none!important}
body{margin:0;background:var(--bg);color:var(--tx);font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
#app{display:flex;min-height:100vh}
aside{width:232px;background:var(--brand);color:#fff;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;flex-shrink:0}
.brand{display:flex;gap:10px;align-items:center;padding:18px;border-bottom:1px solid #ffffff22}
.logo{width:40px;height:40px;border-radius:50%;background:#fff;display:grid;place-items:center;flex-shrink:0}
.brand b{font-size:13px;line-height:1.2;display:block}.brand small{font-size:11px;opacity:.7}
nav{flex:1;padding:14px;display:flex;flex-direction:column;gap:6px}
aside button{background:none;border:0;color:#ffffffe6;text-align:left;padding:9px 14px;border-radius:999px;cursor:pointer;font:inherit}
aside button:hover{background:#ffffff1a}
aside button.on{background:#fff;color:var(--brand);font-weight:600}
.bot{padding:14px;border-top:1px solid #ffffff22}.bot button{color:#fca5a5;width:100%;display:flex;align-items:center;gap:8px}
main{flex:1;min-width:0}
.top{display:flex;justify-content:space-between;align-items:center;padding:12px 24px;background:var(--card);border-bottom:1px solid var(--ln)}
.top span{color:var(--lk);font-weight:600;font-size:12px;letter-spacing:.03em}
.me{display:flex;gap:10px;align-items:center;text-align:right;line-height:1.2}
.av{width:34px;height:34px;border-radius:50%;background:var(--gold);color:#fff;display:grid;place-items:center;font-weight:700;font-size:12px}
#view{padding:24px;max-width:1100px}
h2{margin:0 0 14px;font-size:18px}
.quick{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0 18px}
.quick button{background:var(--brand);color:#fff;border:0;border-radius:12px;padding:16px;cursor:pointer;font:inherit;font-weight:600}
.quick button:hover{background:var(--dark)}
.card{background:var(--card);border:1px solid var(--ln);border-radius:14px;margin-bottom:16px;overflow:hidden}
.card>h3{margin:0;padding:14px 18px;font-size:15px;border-bottom:1px solid var(--ln);display:flex;justify-content:space-between;align-items:center}
.row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--ln)}
.row:last-child{border:0}
.mu{color:var(--mu);font-size:12px}
.badge{font-size:11px;padding:3px 10px;border-radius:99px;background:var(--bad);color:var(--badt);white-space:nowrap}
.badge.ok{background:var(--ok);color:var(--okt)}
.btn{border:1px solid var(--ln);background:var(--card);color:var(--tx);border-radius:8px;padding:7px 14px;cursor:pointer;font:inherit;font-size:13px}
.btn:hover{border-color:var(--brand)}
.btn.p{background:var(--brand);border-color:var(--brand);color:#fff}
.acts{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:flex-end}
.lnk{color:var(--lk);cursor:pointer;font-size:12px;font-weight:600}
table{width:100%;border-collapse:collapse}
th,td{padding:10px 18px;text-align:left;border-bottom:1px solid var(--ln)}
th{color:var(--mu);font-weight:500;font-size:12px}
.big{font-size:32px;font-weight:700;color:var(--lk);padding:16px 18px}
.modal{position:fixed;inset:0;background:#0009;display:grid;place-items:center;padding:16px;z-index:9}
.box{background:var(--card);border-radius:14px;padding:20px;width:100%;max-width:460px;max-height:85vh;overflow:auto}
.box h3{margin:0 0 10px}.q{margin:12px 0}.q label{display:block;padding:3px 0;cursor:pointer}
.login{position:fixed;inset:0;background:#243b52;display:grid;place-items:center;z-index:20;padding:16px}
.login .box{text-align:center;max-width:340px}
.login input{width:100%;margin:6px 0;padding:9px 12px;border:1px solid var(--ln);border-radius:8px;background:var(--bg);color:var(--tx)}
#toast{position:fixed;bottom:calc(20px + env(safe-area-inset-bottom,0px));left:50%;transform:translateX(-50%);background:var(--dark);color:#fff;padding:9px 16px;border-radius:99px;font-size:13px;z-index:30}
@media (max-width:760px){#app{flex-direction:column}aside{width:100%;height:auto;position:static}nav{flex-direction:row;overflow-x:auto}aside nav button{white-space:nowrap}.quick{grid-template-columns:1fr 1fr}#view{padding:16px}.top{padding:10px 16px}.row{flex-direction:column;align-items:flex-start}.acts{justify-content:flex-start}}
`}</style>
  );
}