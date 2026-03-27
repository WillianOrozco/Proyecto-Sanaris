"use client";
import { useState, useEffect } from "react";
import { Activity, BedDouble, LayoutGrid, LogOut, Bell, Users, Calendar, ClipboardList, Heart } from "lucide-react";
import Link from "next/link";

// Datos de fallback por si no hay nada en localStorage
const ESPACIOS_DEFAULT = [
  { id:1, nombre:"Cama 101-A",    tipo:"Cama",        piso:"Piso 1", area:"Medicina general", estado:"disponible" },
  { id:2, nombre:"Sala cirugía 3",tipo:"Sala",        piso:"Piso 2", area:"Cirugía",          estado:"ocupada"    },
  { id:3, nombre:"Consultorio 7", tipo:"Consultorio", piso:"Piso 1", area:"Consulta externa", estado:"limpieza"   },
  { id:4, nombre:"UCI Cama 4",    tipo:"UCI",         piso:"Piso 3", area:"UCI",              estado:"disponible" },
  { id:5, nombre:"Sala cirugía 1",tipo:"Sala",        piso:"Piso 2", area:"Cirugía",          estado:"mantenimiento" },
  { id:6, nombre:"Cama 203-B",    tipo:"Cama",        piso:"Piso 2", area:"Medicina general", estado:"disponible" },
];

const ACTIVIDAD = [
  { texto:"Cama 203-B marcada como disponible", tiempo:"Hace 5 min", autor:"Enf. García", color:"#1d9e75" },
  { texto:"Sala cirugía 3 asignada — procedimiento programado", tiempo:"Hace 18 min", autor:"Dr. Martínez", color:"#E24B4A" },
  { texto:"Consultorio 7 en proceso de limpieza", tiempo:"Hace 32 min", autor:"Sistema", color:"#EF9F27" },
  { texto:"UCI Cama 2 — ingreso de paciente registrado", tiempo:"Hace 1 h", autor:"Enf. Torres", color:"#378ADD" },
  { texto:"Cama 101-A egreso completado", tiempo:"Hace 2 h", autor:"Dr. Ramírez", color:"#1d9e75" },
];

const PROCEDIMIENTOS = [
  { paciente:"Carlos Ruiz",  espacio:"Sala cirugía 3", hora:"08:00", tipo:"Apendicectomía",  estado:"en curso"  },
  { paciente:"María López",  espacio:"Consultorio 4",  hora:"10:30", tipo:"Consulta control", estado:"pendiente" },
  { paciente:"Jorge Pérez",  espacio:"Sala cirugía 1", hora:"14:00", tipo:"Artroscopia",      estado:"pendiente" },
];

const PACIENTES = [
  { nombre:"Ana Gómez",   cama:"Cama 101-A",  estado:"Estable",        ultima:"Hace 1 h"   },
  { nombre:"Pedro Soto",  cama:"Cama 203-B",  estado:"En observación", ultima:"Hace 30 min" },
  { nombre:"Laura Ríos",  cama:"UCI Cama 4",  estado:"Crítico",        ultima:"Hace 10 min" },
];

const pillColor = (estado) => {
  if (estado === "disponible")    return { bg:"rgba(29,158,117,0.15)", color:"#5dcaa5" };
  if (estado === "ocupada")       return { bg:"rgba(226,75,74,0.15)",  color:"#f09595" };
  if (estado === "limpieza")      return { bg:"rgba(239,159,39,0.15)", color:"#EF9F27" };
  if (estado === "mantenimiento") return { bg:"rgba(55,138,221,0.15)", color:"#85B7EB" };
  if (estado === "en curso")      return { bg:"rgba(226,75,74,0.15)",  color:"#f09595" };
  if (estado === "pendiente")     return { bg:"rgba(239,159,39,0.15)", color:"#EF9F27" };
  if (estado === "Crítico")       return { bg:"rgba(226,75,74,0.15)",  color:"#f09595" };
  return { bg:"rgba(29,158,117,0.15)", color:"#5dcaa5" };
};

const s = {
  dash:        { display:"flex", minHeight:"100vh", background:"#111827", color:"#e2e8f0", fontFamily:"sans-serif" },
  sidebar:     { width:"210px", background:"#0f172a", borderRight:"1px solid rgba(255,255,255,0.07)", display:"flex", flexDirection:"column", flexShrink:0 },
  logoArea:    { padding:"18px 16px 16px", borderBottom:"1px solid rgba(255,255,255,0.07)" },
  logoRow:     { display:"flex", alignItems:"center", gap:"9px" },
  logoIcon:    { width:"30px", height:"30px", borderRadius:"8px", background:"#1d9e75", display:"flex", alignItems:"center", justifyContent:"center" },
  logoName:    { fontSize:"15px", fontWeight:"500", color:"#f1f5f9" },
  logoSub:     { fontSize:"10px", color:"#64748b", marginTop:"2px" },
  nav:         { flex:1, padding:"12px 10px" },
  navLabel:    { fontSize:"10px", color:"#475569", textTransform:"uppercase", letterSpacing:".07em", padding:"0 8px", margin:"14px 0 5px" },
  navItemBase: { display:"flex", alignItems:"center", gap:"9px", padding:"7px 10px", borderRadius:"7px", cursor:"pointer", fontSize:"12px", marginBottom:"1px", transition:"background .12s" },
  sidebarFooter:{ padding:"12px 10px", borderTop:"1px solid rgba(255,255,255,0.07)" },
  userPill:    { display:"flex", alignItems:"center", gap:"9px", padding:"7px 10px", borderRadius:"7px", cursor:"pointer" },
  avatar:      { width:"28px", height:"28px", borderRadius:"50%", background:"#185FA5", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"500", color:"#B5D4F4", flexShrink:0 },
  main:        { flex:1, display:"flex", flexDirection:"column", minWidth:0, background:"#111827" },
  topbar:      { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)" },
  content:     { flex:1, padding:"18px 20px", display:"flex", flexDirection:"column", gap:"16px" },
  statsGrid:   { display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:"10px" },
  statCard:    { background:"#0f172a", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"13px 14px" },
  card:        { background:"#0f172a", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", overflow:"hidden" },
  cardHeader:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", borderBottom:"1px solid rgba(255,255,255,0.06)" },
  row:         { display:"flex", alignItems:"center", gap:"10px", padding:"9px 14px", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:"12px", cursor:"pointer" },
  twoCol:      { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px" },
  bottomRow:   { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"14px" },
};

function NavItem({ icon: Icon, label, active, href }) {
  const content = (
    <div style={{ ...s.navItemBase, background: active ? "rgba(29,158,117,0.15)" : "transparent", color: active ? "#5dcaa5" : "#94a3b8" }}>
      <Icon size={14} />
      {label}
    </div>
  );
  if (!href) return content;
  return <Link href={href} style={{ textDecoration:"none" }}>{content}</Link>;
}

function Pill({ estado }) {
  const { bg, color } = pillColor(estado);
  return <span style={{ background:bg, color, borderRadius:"5px", fontSize:"10px", padding:"2px 7px", fontWeight:"500" }}>{estado}</span>;
}

function StatCard({ label, value, total, color, pct }) {
  return (
    <div style={s.statCard}>
      <div style={{ fontSize:"10px", color:"#64748b", marginBottom:"6px", textTransform:"uppercase", letterSpacing:".05em" }}>{label}</div>
      <div style={{ fontSize:"24px", fontWeight:"500", color }}>{value}</div>
      <div style={{ fontSize:"11px", color:"#475569", marginTop:"3px" }}>de {total} espacios</div>
      <div style={{ height:"3px", background:"rgba(255,255,255,0.07)", borderRadius:"2px", marginTop:"10px" }}>
        <div style={{ height:"100%", borderRadius:"2px", background:color, width:`${pct}%` }} />
      </div>
    </div>
  );
}

function Sidebar({ rol, initials, nombre }) {
  const navAdmin = [
    { icon:LayoutGrid,   label:"Dashboard", active:true, href:"/dashboard" },
    { icon:BedDouble,    label:"Espacios",  href:"/habitaciones" },
  ];
  const navMedico = [
    { icon:LayoutGrid,   label:"Dashboard",         active:true, href:"/dashboard" },
    { icon:BedDouble,    label:"Disponibilidad" },
    { icon:Calendar,     label:"Mis procedimientos" },
    { icon:ClipboardList,label:"Solicitudes" },
  ];
  const navEnfermero = [
    { icon:LayoutGrid,   label:"Dashboard",   active:true, href:"/dashboard" },
    { icon:BedDouble,    label:"Mis camas" },
    { icon:Heart,        label:"Mis pacientes" },
    { icon:ClipboardList,label:"Registro" },
  ];
  const items = rol === "Administrador" ? navAdmin : rol === "Médico" ? navMedico : navEnfermero;

  return (
    <div style={s.sidebar}>
      <div style={s.logoArea}>
        <div style={s.logoRow}>
          <div style={s.logoIcon}><Activity size={15} color="#fff" /></div>
          <div>
            <div style={s.logoName}>SANARIS</div>
            <div style={s.logoSub}>Clínica Siloé</div>
          </div>
        </div>
      </div>
      <div style={s.nav}>
        <div style={s.navLabel}>Menú</div>
        {items.map(i => <NavItem key={i.label} icon={i.icon} label={i.label} active={i.active} href={i.href} />)}
      </div>
      <div style={s.sidebarFooter}>
        <div style={s.userPill}>
          <div style={s.avatar}>{initials}</div>
          <div>
            <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{nombre}</div>
            <div style={{ fontSize:"10px", color:"#64748b" }}>{rol}</div>
          </div>
        </div>
        <a href="/auth/logout" style={{ display:"flex", alignItems:"center", gap:"8px", padding:"7px 10px", borderRadius:"7px", fontSize:"12px", color:"#64748b", textDecoration:"none", marginTop:"4px" }}>
          <LogOut size={13} /> Cerrar sesión
        </a>
      </div>
    </div>
  );
}

// ── Stats calculadas desde los espacios reales ──────────────────
function calcularStats(espacios) {
  const camas       = espacios.filter(e => e.tipo === "Cama"        && e.estado === "disponible").length;
  const totalCamas  = espacios.filter(e => e.tipo === "Cama").length;
  const salas       = espacios.filter(e => e.tipo === "Sala"        && e.estado === "disponible").length;
  const totalSalas  = espacios.filter(e => e.tipo === "Sala").length;
  const consult     = espacios.filter(e => e.tipo === "Consultorio" && e.estado === "disponible").length;
  const totalConsult= espacios.filter(e => e.tipo === "Consultorio").length;
  const uci         = espacios.filter(e => e.tipo === "UCI"         && e.estado === "disponible").length;
  const totalUci    = espacios.filter(e => e.tipo === "UCI").length;
  return { camas, totalCamas, salas, totalSalas, consult, totalConsult, uci, totalUci };
}

function AdminDashboard({ espacios }) {
  const st = calcularStats(espacios);
  const pct = (v, t) => t > 0 ? Math.round((v / t) * 100) : 0;

  return (
    <>
      <div style={s.statsGrid}>
        <StatCard label="Camas disponibles"      value={st.camas}   total={st.totalCamas}   color="#1d9e75" pct={pct(st.camas,   st.totalCamas)}   />
        <StatCard label="Salas disponibles"      value={st.salas}   total={st.totalSalas}   color="#378ADD" pct={pct(st.salas,   st.totalSalas)}   />
        <StatCard label="Consultorios libres"    value={st.consult} total={st.totalConsult} color="#EF9F27" pct={pct(st.consult, st.totalConsult)} />
        <StatCard label="UCI disponibles"        value={st.uci}     total={st.totalUci}     color="#E24B4A" pct={pct(st.uci,     st.totalUci)}     />
      </div>
      <div style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>Espacios recientes</span>
            <Link href="/habitaciones" style={{ fontSize:"11px", color:"#5dcaa5", cursor:"pointer", textDecoration:"none" }}>Ver todos</Link>
          </div>
          {espacios.slice(0, 6).map(e => (
            <div key={e.id} style={s.row}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: pillColor(e.estado).color, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{e.nombre}</div>
                <div style={{ fontSize:"10px", color:"#475569" }}>{e.piso} · {e.area}</div>
              </div>
              <Pill estado={e.estado} />
            </div>
          ))}
        </div>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>Actividad reciente</span>
            <span style={{ fontSize:"11px", color:"#5dcaa5", cursor:"pointer" }}>Ver historial</span>
          </div>
          {ACTIVIDAD.map((a, i) => (
            <div key={i} style={{ ...s.row, alignItems:"flex-start" }}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:a.color, flexShrink:0, marginTop:"4px" }} />
              <div>
                <div style={{ fontSize:"12px", color:"#94a3b8" }}>{a.texto}</div>
                <div style={{ fontSize:"10px", color:"#475569", marginTop:"2px" }}>{a.tiempo} · {a.autor}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={s.bottomRow}>
        {[
          { label:"Personal en turno",    value:"67", color:"#5dcaa5" },
          { label:"Procedimientos hoy",   value:"12", color:"#85B7EB" },
          { label:"Alertas activas",      value:"3",  color:"#f09595" },
        ].map(m => (
          <div key={m.label} style={{ ...s.statCard, display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ fontSize:"22px", fontWeight:"500", color:m.color }}>{m.value}</div>
            <div style={{ fontSize:"11px", color:"#64748b" }}>{m.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function MedicoDashboard({ espacios }) {
  const st = calcularStats(espacios);
  const pct = (v, t) => t > 0 ? Math.round((v / t) * 100) : 0;
  return (
    <>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:"10px" }}>
        <StatCard label="Camas disponibles"   value={st.camas}   total={st.totalCamas}   color="#1d9e75" pct={pct(st.camas,   st.totalCamas)}   />
        <StatCard label="Salas disponibles"   value={st.salas}   total={st.totalSalas}   color="#378ADD" pct={pct(st.salas,   st.totalSalas)}   />
        <StatCard label="Consultorios libres" value={st.consult} total={st.totalConsult} color="#EF9F27" pct={pct(st.consult, st.totalConsult)} />
      </div>
      <div style={s.card}>
        <div style={s.cardHeader}>
          <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>Mis procedimientos de hoy</span>
          <span style={{ fontSize:"11px", color:"#5dcaa5", cursor:"pointer" }}>+ Solicitar espacio</span>
        </div>
        {PROCEDIMIENTOS.map((p, i) => (
          <div key={i} style={s.row}>
            <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: pillColor(p.estado).color, flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{p.paciente}</div>
              <div style={{ fontSize:"10px", color:"#475569" }}>{p.tipo} · {p.espacio}</div>
            </div>
            <div style={{ fontSize:"11px", color:"#64748b", marginRight:"10px" }}>{p.hora}</div>
            <Pill estado={p.estado} />
          </div>
        ))}
      </div>
      <div style={s.card}>
        <div style={s.cardHeader}>
          <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>Espacios disponibles ahora</span>
        </div>
        {espacios.filter(e => e.estado === "disponible").map(e => (
          <div key={e.id} style={s.row}>
            <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#1d9e75", flexShrink:0 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{e.nombre}</div>
              <div style={{ fontSize:"10px", color:"#475569" }}>{e.piso} · {e.area}</div>
            </div>
            <button style={{ background:"rgba(29,158,117,0.1)", color:"#5dcaa5", border:"1px solid rgba(29,158,117,0.25)", borderRadius:"6px", fontSize:"11px", padding:"4px 10px", cursor:"pointer" }}>
              Solicitar
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function EnfermeroDashboard({ espacios }) {
  const camas = espacios.filter(e => e.tipo === "Cama");
  return (
    <>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:"10px" }}>
        <StatCard label="Camas registradas"     value={camas.length} total={camas.length} color="#378ADD" pct={100} />
        <StatCard label="Camas disponibles"     value={camas.filter(e => e.estado==="disponible").length} total={camas.length} color="#1d9e75" pct={camas.length > 0 ? Math.round(camas.filter(e=>e.estado==="disponible").length/camas.length*100) : 0} />
        <StatCard label="Camas ocupadas"        value={camas.filter(e => e.estado==="ocupada").length}    total={camas.length} color="#EF9F27" pct={camas.length > 0 ? Math.round(camas.filter(e=>e.estado==="ocupada").length/camas.length*100) : 0} />
      </div>
      <div style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>Mis pacientes</span>
          </div>
          {PACIENTES.map((p, i) => (
            <div key={i} style={s.row}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: pillColor(p.estado).color, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{p.nombre}</div>
                <div style={{ fontSize:"10px", color:"#475569" }}>{p.cama} · Últ. registro {p.ultima}</div>
              </div>
              <Pill estado={p.estado} />
            </div>
          ))}
        </div>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>Estado de mis camas</span>
          </div>
          {camas.map(e => (
            <div key={e.id} style={s.row}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: pillColor(e.estado).color, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{e.nombre}</div>
                <div style={{ fontSize:"10px", color:"#475569" }}>{e.area}</div>
              </div>
              <Pill estado={e.estado} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function DashboardClient({ user }) {
  const [rol, setRol]         = useState("Administrador");
  const [espacios, setEspacios] = useState(ESPACIOS_DEFAULT);

  useEffect(() => {
    // Carga el rol del usuario
    const email = user?.email;
    if (email) {
      const saved = localStorage.getItem(`perfil_datos_${email}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setRol(parsed.rol || "Administrador");
      }
    }
    // Carga los espacios reales desde localStorage
    const savedEspacios = localStorage.getItem("sanaris_espacios");
    if (savedEspacios) setEspacios(JSON.parse(savedEspacios));
  }, [user]);

  const initials = user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";
  const nombre   = user?.name?.split(" ").slice(0, 2).join(" ") || "Usuario";
  const fecha    = new Date().toLocaleDateString("es-CO", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
  const titulo   = rol === "Administrador" ? "Panel de ocupación" : rol === "Médico" ? "Mi turno" : "Mis pacientes y camas";

  return (
    <div style={s.dash}>
      <Sidebar rol={rol} initials={initials} nombre={nombre} />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <div style={{ fontSize:"16px", fontWeight:"500", color:"#f1f5f9" }}>{titulo}</div>
            <div style={{ fontSize:"11px", color:"#64748b", marginTop:"2px", textTransform:"capitalize" }}>{fecha}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ background:"rgba(226,75,74,0.15)", color:"#f09595", borderRadius:"6px", fontSize:"11px", padding:"3px 9px", border:"1px solid rgba(226,75,74,0.2)" }}>3 alertas</span>
            <Bell size={16} color="#64748b" style={{ cursor:"pointer" }} />
          </div>
        </div>
        <div style={s.content}>
          {rol === "Administrador" && <AdminDashboard    espacios={espacios} />}
          {rol === "Médico"        && <MedicoDashboard   espacios={espacios} />}
          {rol === "Enfermero"     && <EnfermeroDashboard espacios={espacios} />}
        </div>
      </div>
    </div>
  );
}