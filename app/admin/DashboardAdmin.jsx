"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  School,
  Users,
  UserCog,
  BookOpen,
  Megaphone,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

// ---------- brand colors ----------
const BRAND = "#3B5B7A";
const BRAND_DARK = "#2C4661";
const GOLD = "#c9a227";
const LOGO_URL = "data:image/png;base64,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";

// ---------- seed data ----------
const initialClasses = [
  { id: 1, name: "X RPL 1", waliKelas: "Sri Wahyuni, S.Kom", kapasitas: 32 },
  { id: 2, name: "X RPL 2", waliKelas: "Budi Santoso, S.Pd", kapasitas: 30 },
  { id: 3, name: "XI TKJ 1", waliKelas: "Dewi Lestari, S.T", kapasitas: 28 },
];

const initialStudents = [
  { id: 1, name: "Ahmad Fauzi", nis: "2425001", kelas: "X RPL 1", jenisKelamin: "Laki-laki" },
  { id: 2, name: "Siti Aminah", nis: "2425002", kelas: "X RPL 1", jenisKelamin: "Perempuan" },
  { id: 3, name: "Rizky Ramadhan", nis: "2425003", kelas: "XI TKJ 1", jenisKelamin: "Laki-laki" },
];

const initialTeachers = [
  { id: 1, name: "Sri Wahyuni, S.Kom", nip: "198203012010012001", mataPelajaran: "Pemrograman Web", noHp: "0812-3456-7890" },
  { id: 2, name: "Budi Santoso, S.Pd", nip: "197911052008011003", mataPelajaran: "Matematika", noHp: "0813-2233-4455" },
  { id: 3, name: "Dewi Lestari, S.T", nip: "199001152015022002", mataPelajaran: "Jaringan Komputer", noHp: "0857-1122-3344" },
];

const subjectList = ["Pemrograman Web", "Matematika", "Jaringan Komputer", "Basis Data", "Bahasa Inggris"];

const initialAnnouncements = [
  {
    id: 1,
    title: "Libur Semester Ganjil",
    content: "Libur semester ganjil dimulai 20 Desember 2026 dan masuk kembali 5 Januari 2027.",
    target: "Semua",
    date: "2026-09-01",
  },
  {
    id: 2,
    title: "Rapat Wali Kelas",
    content: "Rapat koordinasi wali kelas dilaksanakan Jumat, 12 September 2026 pukul 13.00 di ruang guru.",
    target: "Guru",
    date: "2026-09-03",
  },
];

// ---------- small ui atoms ----------
function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-medium text-slate-500 mb-1">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#c9a227]/60 focus:border-[#c9a227]";

function FormModal({ title, fields, initialValues, onCancel, onSubmit }) {
  const [values, setValues] = useState(initialValues || {});

  const handleChange = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">
          {fields.map((f) => (
            <Field label={f.label} key={f.key}>
              {f.type === "select" ? (
                <select
                  className={inputCls}
                  value={values[f.key] ?? ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                >
                  <option value="" disabled>
                    Pilih {f.label.toLowerCase()}
                  </option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  className={inputCls + " min-h-[90px] resize-none"}
                  value={values[f.key] ?? ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              ) : (
                <input
                  type={f.type === "number" ? "number" : "text"}
                  className={inputCls}
                  value={values[f.key] ?? ""}
                  onChange={(e) => handleChange(f.key, e.target.value)}
                />
              )}
            </Field>
          ))}
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Batal
          </button>
          <button
            onClick={() => onSubmit(values)}
            className="btn-brand rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

function CrudSection({ title, subtitle, columns, fields, data, setData, addLabel }) {
  const [modal, setModal] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => setModal({ mode: "add", item: {} });
  const openEdit = (item) => setModal({ mode: "edit", item });

  const handleSubmit = (values) => {
    if (modal.mode === "add") {
      setData((d) => [...d, { id: Date.now(), ...values }]);
    } else {
      setData((d) => d.map((it) => (it.id === modal.item.id ? { ...it, ...values } : it)));
    }
    setModal(null);
  };

  const confirmDelete = () => {
    setData((d) => d.filter((it) => it.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <button
          onClick={openAdd}
          className="btn-brand flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          <Plus size={16} /> {addLabel}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-400">
                  Belum ada data. Klik "{addLabel}" untuk menambahkan.
                </td>
              </tr>
            )}
            {data.map((row, i) => (
              <tr key={row.id} className={i % 2 ? "bg-white" : "bg-slate-50/40"}>
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-slate-700">
                    {row[c.key]}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(row)}
                      className="hover-text-brand rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(row.id)}
                      className="rounded-md p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      title="Hapus"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <FormModal
          title={modal.mode === "add" ? addLabel : `Edit ${title}`}
          fields={fields}
          initialValues={modal.item}
          onCancel={() => setModal(null)}
          onSubmit={handleSubmit}
        />
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="font-semibold text-slate-800">Hapus data ini?</h3>
            <p className="mt-1 text-sm text-slate-500">Tindakan ini tidak bisa dibatalkan.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ classes, students, teachers, announcements }) {
  const stats = [
    { label: "Total Guru", value: teachers.length, icon: UserCog },
    { label: "Total Siswa", value: students.length, icon: Users },
    { label: "Total Kelas", value: classes.length, icon: School },
    { label: "Mata Pelajaran", value: subjectList.length, icon: BookOpen },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800">Ringkasan</h2>
      <p className="mb-6 text-sm text-slate-500">Gambaran umum data akademik SMK Citra Negara.</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="bg-brand-soft text-brand mb-3 flex h-9 w-9 items-center justify-center rounded-lg">
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-semibold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Pengumuman Terbaru</h3>
        <div className="space-y-2">
          {announcements.slice(0, 3).map((a) => (
            <div key={a.id} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c9a227]/15 text-[#a9821b]">
                <Megaphone size={15} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">{a.title}</p>
                  <span className="text-xs text-slate-400">{a.date}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">{a.content}</p>
                <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                  Target: {a.target}
                </span>
              </div>
            </div>
          ))}
          {announcements.length === 0 && (
            <p className="text-sm text-slate-400">Belum ada pengumuman.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function MataPelajaranView({ teachers }) {
  const rows = useMemo(
    () =>
      subjectList.map((subj) => ({
        subj,
        pengampu: teachers.filter((t) => t.mataPelajaran === subj).map((t) => t.name),
      })),
    [teachers]
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800">Mata Pelajaran</h2>
      <p className="mb-5 text-sm text-slate-500">
        Daftar mata pelajaran beserta guru pengampunya. Data guru dikelola melalui menu Manajemen Guru.
      </p>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Mata Pelajaran</th>
              <th className="px-4 py-3 font-medium">Guru Pengampu</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.subj} className={i % 2 ? "bg-white" : "bg-slate-50/40"}>
                <td className="px-4 py-3 font-medium text-slate-700">{r.subj}</td>
                <td className="px-4 py-3 text-slate-600">
                  {r.pengampu.length ? r.pengampu.join(", ") : <span className="text-slate-400">Belum ada guru</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#243b52]">
      <style>{`
        .bg-brand { background-color: ${BRAND}; }
        .text-brand { color: ${BRAND}; }
        .bg-brand-soft { background-color: ${BRAND}1A; }
        .btn-brand { background-color: ${BRAND}; }
        .btn-brand:hover { background-color: ${BRAND_DARK}; }
      `}</style>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
        <img src={LOGO_URL} alt="Logo SMK Citra Negara" className="mx-auto mb-4 h-16 w-16 object-contain" />
        <h1 className="text-lg font-semibold text-slate-800">LMS SMK Citra Negara</h1>
        <p className="mt-1 mb-6 text-sm text-slate-500">Anda telah keluar. Masuk kembali untuk melanjutkan.</p>
        <input className={inputCls + " mb-3"} placeholder="Username" disabled value="admin" />
        <input className={inputCls + " mb-5"} placeholder="Password" type="password" disabled value="••••••••" />
        <button
          onClick={onLogin}
          className="btn-brand w-full rounded-lg py-2.5 text-sm font-medium text-white"
        >
          Masuk sebagai Admin
        </button>
      </div>
    </div>
  );
}

export default function DashboardAdmin() {
  const [page, setPage] = useState("dashboard");
  const [loggedIn, setLoggedIn] = useState(true);

  const [classes, setClasses] = useState(initialClasses);
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const nav = [
    { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { key: "kelas", label: "Manajemen Kelas", icon: School },
    { key: "siswa", label: "Manajemen Siswa", icon: Users },
    { key: "guru", label: "Manajemen Guru", icon: UserCog },
    { key: "mapel", label: "Mata Pelajaran", icon: BookOpen },
    { key: "pengumuman", label: "Pengumuman", icon: Megaphone },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <style>{`
        .bg-brand { background-color: ${BRAND}; }
        .text-brand { color: ${BRAND}; }
        .bg-brand-soft { background-color: ${BRAND}1A; }
        .bg-gold { background-color: ${GOLD}; }
        .btn-brand { background-color: ${BRAND}; }
        .btn-brand:hover { background-color: ${BRAND_DARK}; }
        .hover-text-brand:hover { color: ${BRAND}; }
      `}</style>
      <aside className="bg-brand flex w-60 shrink-0 flex-col text-white">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-1.5">
            <img src={LOGO_URL} alt="Logo SMK Citra Negara" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">LMS</p>
            <p className="text-[10px] text-white/70">SMK CITRA NEGARA</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-5">
          {nav.map((n) => {
            const active = page === n.key;
            return (
              <button
                key={n.key}
                onClick={() => setPage(n.key)}
                className={`flex w-full items-center gap-2.5 rounded-full px-4 py-2 text-sm transition ${
                  active ? "bg-white text-brand font-medium" : "text-white/90 hover:bg-white/10"
                }`}
              >
                <n.icon size={16} />
                {n.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-4 py-5">
          <button
            onClick={() => setLoggedIn(false)}
            className="flex w-full items-center gap-2.5 rounded-full px-4 py-2 text-sm text-red-300 hover:bg-white/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <p className="mb-4 text-xs font-medium tracking-wide text-slate-400">DASBORD ADMIN</p>

        {page === "dashboard" && (
          <Dashboard classes={classes} students={students} teachers={teachers} announcements={announcements} />
        )}

        {page === "kelas" && (
          <CrudSection
            title="Manajemen Kelas"
            subtitle="Kelola data kelas yang ada di sekolah."
            addLabel="Tambah Kelas"
            columns={[
              { key: "name", label: "Nama Kelas" },
              { key: "waliKelas", label: "Wali Kelas" },
              { key: "kapasitas", label: "Kapasitas" },
            ]}
            fields={[
              { key: "name", label: "Nama Kelas" },
              { key: "waliKelas", label: "Wali Kelas" },
              { key: "kapasitas", label: "Kapasitas", type: "number" },
            ]}
            data={classes}
            setData={setClasses}
          />
        )}

        {page === "siswa" && (
          <CrudSection
            title="Manajemen Siswa"
            subtitle="Kelola data siswa terdaftar."
            addLabel="Tambah Siswa"
            columns={[
              { key: "name", label: "Nama Siswa" },
              { key: "nis", label: "NIS" },
              { key: "kelas", label: "Kelas" },
              { key: "jenisKelamin", label: "Jenis Kelamin" },
            ]}
            fields={[
              { key: "name", label: "Nama Siswa" },
              { key: "nis", label: "NIS" },
              { key: "kelas", label: "Kelas", type: "select", options: classes.map((c) => c.name) },
              { key: "jenisKelamin", label: "Jenis Kelamin", type: "select", options: ["Laki-laki", "Perempuan"] },
            ]}
            data={students}
            setData={setStudents}
          />
        )}

        {page === "guru" && (
          <CrudSection
            title="Manajemen Guru"
            subtitle="Kelola data guru dan mata pelajaran yang diampu."
            addLabel="Tambah Guru"
            columns={[
              { key: "name", label: "Nama Guru" },
              { key: "nip", label: "NIP" },
              { key: "mataPelajaran", label: "Mata Pelajaran" },
              { key: "noHp", label: "No. HP" },
            ]}
            fields={[
              { key: "name", label: "Nama Guru" },
              { key: "nip", label: "NIP" },
              { key: "mataPelajaran", label: "Mata Pelajaran", type: "select", options: subjectList },
              { key: "noHp", label: "No. HP" },
            ]}
            data={teachers}
            setData={setTeachers}
          />
        )}

        {page === "mapel" && <MataPelajaranView teachers={teachers} />}

        {page === "pengumuman" && (
          <CrudSection
            title="Pengumuman"
            subtitle="Buat dan kelola pengumuman untuk guru dan/atau siswa."
            addLabel="Buat Pengumuman"
            columns={[
              { key: "title", label: "Judul" },
              { key: "target", label: "Target" },
              { key: "date", label: "Tanggal" },
            ]}
            fields={[
              { key: "title", label: "Judul" },
              { key: "content", label: "Isi Pengumuman", type: "textarea" },
              { key: "target", label: "Target", type: "select", options: ["Semua", "Guru", "Siswa"] },
              { key: "date", label: "Tanggal (YYYY-MM-DD)" },
            ]}
            data={announcements}
            setData={setAnnouncements}
          />
        )}
      </main>
    </div>
  );
}