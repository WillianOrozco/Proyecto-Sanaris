"use client";
import { useState } from "react";
import { Activity, ArrowLeft, BedDouble, Plus, RefreshCw, Trash2, Search, Filter, Map, List, X, Building2 } from "lucide-react";
import Link from "next/link";

const estados = ["disponible", "ocupada", "limpieza", "mantenimiento"];

const datosIniciales = [
  { id:1, nombre:"Cama 101-A",     tipo:"Cama",        piso:"Piso 1", bloque:"A", area:"Medicina general", estado:"disponible" },
  { id:2, nombre:"Sala cirugía 1", tipo:"Sala",        piso:"Piso 2", bloque:"B", area:"Cirugía",          estado:"ocupada"    },
  { id:3, nombre:"Consultorio 7",  tipo:"Consultorio", piso:"Piso 1", bloque:"A", area:"Consulta externa", estado:"limpieza"   },
  { id:4, nombre:"UCI Cama 4",     tipo:"UCI",         piso:"Piso 3", bloque:"C", area:"UCI",              estado:"disponible" },
  { id:5, nombre:"Cama 102-B",     tipo:"Cama",        piso:"Piso 1", bloque:"A", area:"Medicina general", estado:"ocupada"    },
  { id:6, nombre:"Sala cirugía 2", tipo:"Sala",        piso:"Piso 2", bloque:"B", area:"Cirugía",          estado:"disponible" },
];

const pillColor = (estado) => {
  if (estado === "disponible") return { bg:"rgba(29,158,117,0.15)", color:"#5dcaa5", dot:"#1d9e75", solid:"#1d9e75" };
  if (estado === "ocupada")    return { bg:"rgba(226,75,74,0.15)",  color:"#f09595",  dot:"#E24B4A", solid:"#E24B4A" };
  if (estado === "limpieza")   return { bg:"rgba(239,159,39,0.15)", color:"#EF9F27",  dot:"#EF9F27", solid:"#EF9F27" };
  return                              { bg:"rgba(55,138,221,0.15)", color:"#85B7EB",  dot:"#378ADD", solid:"#378ADD" };
};

function Pill({ estado }) {
  const { bg, color } = pillColor(estado);
  return (
    <span style={{ background:bg, color, borderRadius:"5px", fontSize:"10px", padding:"2px 8px", fontWeight:"500", whiteSpace:"nowrap" }}>
      {estado}
    </span>
  );
}

const tipoSize = { Cama:{ w:80, h:60 }, Consultorio:{ w:100, h:80 }, Sala:{ w:140, h:100 }, UCI:{ w:90, h:70 } };
const tipoIcon = { Cama:"🛏", Consultorio:"🏥", Sala:"🔬", UCI:"❤️" };

const s = {
  page:       { minHeight:"100vh", background:"#111827", color:"#e2e8f0", fontFamily:"sans-serif" },
  topbar:     { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"#0f172a" },
  logoRow:    { display:"flex", alignItems:"center", gap:"10px" },
  logoIcon:   { width:"30px", height:"30px", borderRadius:"8px", background:"#1d9e75", display:"flex", alignItems:"center", justifyContent:"center" },
  backBtn:    { display:"flex", alignItems:"center", gap:"6px", padding:"6px 12px", borderRadius:"7px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", color:"#94a3b8", fontSize:"12px", cursor:"pointer", textDecoration:"none" },
  content:    { padding:"18px 20px" },
  statsRow:   { display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:"10px", marginBottom:"16px", marginTop:"16px" },
  statCard:   { background:"#0f172a", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", padding:"12px 14px" },
  card:       { background:"#0f172a", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"10px", overflow:"hidden", marginBottom:"16px" },
  cardHeader: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)" },
  formRow:    { display:"flex", gap:"8px", flexWrap:"wrap", padding:"14px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.02)", alignItems:"center" },
  input:      { padding:"7px 10px", borderRadius:"6px", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"#e2e8f0", fontSize:"12px", outline:"none" },
  select:     { padding:"7px 10px", borderRadius:"6px", border:"1px solid rgba(255,255,255,0.1)", background:"#1e293b", color:"#e2e8f0", fontSize:"12px", outline:"none", cursor:"pointer" },
  btnCreate:  { display:"flex", alignItems:"center", gap:"6px", padding:"7px 14px", borderRadius:"6px", background:"#1d9e75", color:"#fff", border:"none", fontSize:"12px", cursor:"pointer", fontWeight:"500", whiteSpace:"nowrap" },
  row:        { display:"flex", alignItems:"center", gap:"12px", padding:"10px 16px", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:"12px" },
  filterRow:  { display:"flex", gap:"8px", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)", alignItems:"center", flexWrap:"wrap" },
};

function DetalleModal({ espacio, onClose, onCambiarEstado, onEliminar }) {
  if (!espacio) return null;
  const { solid } = pillColor(espacio.estado);
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:"#0f172a", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"14px", padding:"24px", width:"340px", position:"relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position:"absolute", top:"14px", right:"14px", background:"transparent", border:"none", color:"#64748b", cursor:"pointer" }}>
          <X size={16} />
        </button>
        <div style={{ width:"100%", height:"6px", borderRadius:"4px", background:solid, marginBottom:"16px" }} />
        <div style={{ fontSize:"20px", marginBottom:"4px" }}>{tipoIcon[espacio.tipo] || "🏢"}</div>
        <div style={{ fontSize:"16px", fontWeight:"500", color:"#f1f5f9", marginBottom:"8px" }}>{espacio.nombre}</div>
        <div style={{ marginBottom:"16px" }}><Pill estado={espacio.estado} /></div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
          {[
            { label:"Tipo",   value:espacio.tipo },
            { label:"Piso",   value:espacio.piso },
            { label:"Bloque", value:`Bloque ${espacio.bloque}` },
            { label:"Área",   value:espacio.area || "—" },
          ].map(d => (
            <div key={d.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:"8px", padding:"8px 10px" }}>
              <div style={{ fontSize:"10px", color:"#64748b", marginBottom:"2px" }}>{d.label}</div>
              <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{d.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:"8px" }}>
          <button style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"8px", borderRadius:"7px", background:"rgba(55,138,221,0.1)", color:"#85B7EB", border:"1px solid rgba(55,138,221,0.2)", fontSize:"12px", cursor:"pointer" }}
            onClick={() => { onCambiarEstado(espacio.id); onClose(); }}>
            <RefreshCw size={12} /> Cambiar estado
          </button>
          <button style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", padding:"8px 14px", borderRadius:"7px", background:"rgba(226,75,74,0.1)", color:"#f09595", border:"1px solid rgba(226,75,74,0.2)", fontSize:"12px", cursor:"pointer" }}
            onClick={() => { onEliminar(espacio.id); onClose(); }}>
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanoPiso({ piso, espacios, onSelectEspacio }) {
  const pisoEspacios = espacios.filter(e => e.piso === piso);
  if (pisoEspacios.length === 0)
    return <div style={{ padding:"32px", textAlign:"center", color:"#475569", fontSize:"12px" }}>No hay espacios en {piso}</div>;
  return (
    <div style={{ padding:"16px", overflowX:"auto" }}>
      <div style={{ display:"flex", gap:"16px", marginBottom:"16px", flexWrap:"wrap" }}>
        {estados.map(est => {
          const { solid } = pillColor(est);
          return (
            <div key={est} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
              <div style={{ width:"10px", height:"10px", borderRadius:"2px", background:solid, opacity:.8 }} />
              <span style={{ fontSize:"10px", color:"#64748b" }}>{est}</span>
            </div>
          );
        })}
      </div>
      <div style={{ position:"relative", background:"rgba(255,255,255,0.02)", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.06)", padding:"20px", minHeight:"200px" }}>
        <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"1px", background:"rgba(255,255,255,0.05)", transform:"translateX(-50%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"rgba(255,255,255,0.05)", transform:"translateY(-50%)", pointerEvents:"none" }} />
        <div style={{ display:"flex", flexWrap:"wrap", gap:"12px", position:"relative", zIndex:1 }}>
          {pisoEspacios.map(esp => {
            const { solid, bg, color } = pillColor(esp.estado);
            const size = tipoSize[esp.tipo] || { w:80, h:60 };
            return (
              <div key={esp.id} onClick={() => onSelectEspacio(esp)}
                style={{ width:`${size.w}px`, height:`${size.h}px`, background:bg, border:`2px solid ${solid}`, borderRadius:"8px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"4px", padding:"6px", transition:"transform .15s, box-shadow .15s", position:"relative", overflow:"hidden" }}
                onMouseEnter={e => { e.currentTarget.style.transform="scale(1.06)"; e.currentTarget.style.boxShadow=`0 0 14px ${solid}55`; }}
                onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";   e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:solid, borderRadius:"8px 8px 0 0" }} />
                <div style={{ fontSize:"14px" }}>{tipoIcon[esp.tipo] || "🏢"}</div>
                <div style={{ fontSize:"9px", color, fontWeight:"500", textAlign:"center", lineHeight:"1.2", wordBreak:"break-word" }}>{esp.nombre}</div>
                <div style={{ fontSize:"8px", color:"rgba(255,255,255,0.3)" }}>{esp.tipo}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HabitacionesModule() {
  // ── Carga desde localStorage, con fallback a datos iniciales ──
  const [espacios, setEspacios] = useState(() => {
    if (typeof window === "undefined") return datosIniciales;
    const saved = localStorage.getItem("sanaris_espacios");
    return saved ? JSON.parse(saved) : datosIniciales;
  });

  // ── Guarda en estado Y en localStorage ──
  const guardarEspacios = (nuevos) => {
    setEspacios(nuevos);
    localStorage.setItem("sanaris_espacios", JSON.stringify(nuevos));
  };

  const [nombre, setNombre]     = useState("");
  const [tipo, setTipo]         = useState("Cama");
  const [estado, setEstado]     = useState("disponible");
  const [piso, setPiso]         = useState("Piso 1");
  const [bloque, setBloque]     = useState("A");
  const [area, setArea]         = useState("");
  const [filtro, setFiltro]     = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [vista, setVista]       = useState("lista");
  const [pisoPlan, setPisoPlan] = useState("Piso 1");
  const [espacioSel, setEspacioSel] = useState(null);

  const crearEspacio = () => {
    if (!nombre.trim()) return;
    guardarEspacios([...espacios, { id:Date.now(), nombre, tipo, estado, piso, bloque, area }]);
    setNombre(""); setArea("");
  };

  const cambiarEstado = (id) => guardarEspacios(espacios.map(esp => {
    if (esp.id !== id) return esp;
    return { ...esp, estado: estados[(estados.indexOf(esp.estado) + 1) % estados.length] };
  }));

  const eliminarEspacio = (id) => guardarEspacios(espacios.filter(e => e.id !== id));

  const espaciosFiltrados = espacios.filter(esp =>
    (filtro === "todos" || esp.estado === filtro) &&
    (esp.nombre.toLowerCase().includes(busqueda.toLowerCase()) || esp.area.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const conteo = { disponible:0, ocupada:0, limpieza:0, mantenimiento:0 };
  espacios.forEach(e => conteo[e.estado]++);

  const tabBtn = (v) => ({
    display:"flex", alignItems:"center", gap:"5px", padding:"5px 10px", borderRadius:"6px",
    fontSize:"11px", cursor:"pointer", border:"1px solid rgba(255,255,255,0.1)",
    background: vista===v ? "rgba(29,158,117,0.15)" : "transparent",
    color: vista===v ? "#5dcaa5" : "#64748b",
  });

  return (
    <div style={s.page}>
      <div style={s.topbar}>
        <div style={s.logoRow}>
          <div style={s.logoIcon}><Activity size={15} color="#fff" /></div>
          <div>
            <div style={{ fontSize:"14px", fontWeight:"500", color:"#f1f5f9" }}>SANARIS</div>
            <div style={{ fontSize:"10px", color:"#64748b" }}>Clínica Siloé</div>
          </div>
        </div>
        <Link href="/dashboard" style={s.backBtn}><ArrowLeft size={13} /> Volver al Dashboard</Link>
      </div>

      <div style={s.content}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"2px" }}>
          <BedDouble size={15} color="#5dcaa5" />
          <div style={{ fontSize:"16px", fontWeight:"500", color:"#f1f5f9" }}>Gestión de Espacios</div>
        </div>
        <div style={{ fontSize:"11px", color:"#64748b" }}>Administra camas, salas, consultorios y unidades UCI</div>

        <div style={s.statsRow}>
          {[
            { label:"Disponibles",   value:conteo.disponible,    color:"#5dcaa5" },
            { label:"Ocupadas",      value:conteo.ocupada,       color:"#f09595" },
            { label:"En limpieza",   value:conteo.limpieza,      color:"#EF9F27" },
            { label:"Mantenimiento", value:conteo.mantenimiento, color:"#85B7EB" },
          ].map(stat => (
            <div key={stat.label} style={s.statCard}>
              <div style={{ fontSize:"10px", color:"#64748b", textTransform:"uppercase", letterSpacing:".05em", marginBottom:"6px" }}>{stat.label}</div>
              <div style={{ fontSize:"24px", fontWeight:"500", color:stat.color }}>{stat.value}</div>
              <div style={{ fontSize:"10px", color:"#475569", marginTop:"2px" }}>de {espacios.length} espacios</div>
            </div>
          ))}
        </div>

        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={{ fontSize:"12px", fontWeight:"500", color:"#94a3b8", textTransform:"uppercase", letterSpacing:".05em" }}>
              {vista === "lista" ? "Espacios registrados" : "Plano de calor por piso"}
            </span>
            <div style={{ display:"flex", gap:"6px" }}>
              <button style={tabBtn("lista")} onClick={() => setVista("lista")}><List size={12} /> Lista</button>
              <button style={tabBtn("mapa")}  onClick={() => setVista("mapa")} ><Map  size={12} /> Plano</button>
            </div>
          </div>

          <div style={s.formRow}>
            <input style={{ ...s.input, flex:"1", minWidth:"100px" }} placeholder="Nombre del espacio" value={nombre} onChange={e => setNombre(e.target.value)} />
            <select style={s.select} value={tipo}   onChange={e => setTipo(e.target.value)}>
              <option>Cama</option><option>Sala</option><option>Consultorio</option><option>UCI</option>
            </select>
            <select style={s.select} value={estado} onChange={e => setEstado(e.target.value)}>
              {estados.map(est => <option key={est} value={est}>{est}</option>)}
            </select>
            <select style={s.select} value={piso}   onChange={e => setPiso(e.target.value)}>
              <option>Piso 1</option><option>Piso 2</option><option>Piso 3</option>
            </select>
            <select style={s.select} value={bloque} onChange={e => setBloque(e.target.value)}>
              <option>A</option><option>B</option><option>C</option>
            </select>
            <input style={{ ...s.input, flex:"1", minWidth:"80px" }} placeholder="Área" value={area} onChange={e => setArea(e.target.value)} />
            <button style={s.btnCreate} onClick={crearEspacio}><Plus size={13} /> Crear</button>
          </div>

          {vista === "lista" && (
            <>
              <div style={s.filterRow}>
                <Search size={13} color="#64748b" />
                <input style={{ ...s.input, flex:1, maxWidth:"200px" }} placeholder="Buscar espacio o área..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
                <Filter size={13} color="#64748b" style={{ marginLeft:"8px" }} />
                {["todos", ...estados].map(f => (
                  <button key={f} onClick={() => setFiltro(f)}
                    style={{ padding:"5px 12px", borderRadius:"20px", fontSize:"11px", cursor:"pointer",
                      border: filtro===f ? "1px solid rgba(29,158,117,0.4)" : "1px solid rgba(255,255,255,0.1)",
                      background: filtro===f ? "rgba(29,158,117,0.1)" : "transparent",
                      color: filtro===f ? "#5dcaa5" : "#64748b" }}>
                    {f === "todos" ? "Todos" : f}
                  </button>
                ))}
              </div>
              {espaciosFiltrados.length === 0
                ? <div style={{ padding:"24px", textAlign:"center", color:"#475569", fontSize:"12px" }}>No se encontraron espacios</div>
                : espaciosFiltrados.map(esp => {
                    const { dot } = pillColor(esp.estado);
                    return (
                      <div key={esp.id} style={s.row}>
                        <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:dot, flexShrink:0 }} />
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:"12px", color:"#e2e8f0" }}>{esp.nombre}</div>
                          <div style={{ fontSize:"10px", color:"#475569", marginTop:"1px" }}>{esp.tipo} · {esp.piso} · Bloque {esp.bloque} · {esp.area}</div>
                        </div>
                        <Pill estado={esp.estado} />
                        <button style={{ display:"flex", alignItems:"center", gap:"4px", padding:"5px 10px", borderRadius:"6px", background:"rgba(55,138,221,0.1)", color:"#85B7EB", border:"1px solid rgba(55,138,221,0.2)", fontSize:"11px", cursor:"pointer" }} onClick={() => cambiarEstado(esp.id)}>
                          <RefreshCw size={11} /> Estado
                        </button>
                        <button style={{ display:"flex", alignItems:"center", gap:"4px", padding:"5px 10px", borderRadius:"6px", background:"rgba(226,75,74,0.1)", color:"#f09595", border:"1px solid rgba(226,75,74,0.2)", fontSize:"11px", cursor:"pointer" }} onClick={() => eliminarEspacio(esp.id)}>
                          <Trash2 size={11} /> Eliminar
                        </button>
                      </div>
                    );
                  })
              }
            </>
          )}

          {vista === "mapa" && (
            <>
              <div style={{ display:"flex", gap:"8px", padding:"12px 16px", borderBottom:"1px solid rgba(255,255,255,0.06)", alignItems:"center" }}>
                <Building2 size={13} color="#64748b" />
                <span style={{ fontSize:"11px", color:"#64748b", marginRight:"4px" }}>Piso:</span>
                {["Piso 1","Piso 2","Piso 3"].map(p => {
                  const count = espacios.filter(e => e.piso === p).length;
                  return (
                    <button key={p} onClick={() => setPisoPlan(p)}
                      style={{ padding:"5px 14px", borderRadius:"20px", fontSize:"11px", cursor:"pointer",
                        border: pisoPlan===p ? "1px solid rgba(29,158,117,0.4)" : "1px solid rgba(255,255,255,0.1)",
                        background: pisoPlan===p ? "rgba(29,158,117,0.1)" : "transparent",
                        color: pisoPlan===p ? "#5dcaa5" : "#64748b" }}>
                      {p} <span style={{ opacity:.5 }}>({count})</span>
                    </button>
                  );
                })}
              </div>
              <PlanoPiso piso={pisoPlan} espacios={espacios} onSelectEspacio={setEspacioSel} />
            </>
          )}
        </div>
      </div>

      <DetalleModal espacio={espacioSel} onClose={() => setEspacioSel(null)} onCambiarEstado={cambiarEstado} onEliminar={eliminarEspacio} />
    </div>
  );
}