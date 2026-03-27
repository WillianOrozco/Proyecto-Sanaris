using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ApiSanaris.Models;

public partial class SanarisContext : DbContext
{
    public SanarisContext()
    {
    }

    public SanarisContext(DbContextOptions<SanarisContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Administrador> Administradors { get; set; }

    public virtual DbSet<Cronograma> Cronogramas { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<Enfermero> Enfermeros { get; set; }

    public virtual DbSet<EnfermeroPaciente> EnfermeroPacientes { get; set; }

    public virtual DbSet<GestorAsignacione> GestorAsignaciones { get; set; }

    public virtual DbSet<Habitacion> Habitacions { get; set; }

    public virtual DbSet<Hospital> Hospitals { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<Solicitud> Solicituds { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=sanaris;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Administrador>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Administ__3213E83F00C08BBB");

            entity.ToTable("Administrador");

            entity.HasIndex(e => e.Correo, "UQ__Administ__2A586E0BE9AB588A").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.Correo)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");
        });

        modelBuilder.Entity<Cronograma>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cronogra__3213E83F5042FFB2");

            entity.ToTable("Cronograma");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Espacio).HasColumnName("espacio");
            entity.Property(e => e.Fecha).HasColumnName("fecha");
            entity.Property(e => e.HoraFin).HasColumnName("horaFin");
            entity.Property(e => e.HoraInicio).HasColumnName("horaInicio");
            entity.Property(e => e.Procedimiento)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("procedimiento");
            entity.Property(e => e.Responsable).HasColumnName("responsable");

            entity.HasOne(d => d.EspacioNavigation).WithMany(p => p.Cronogramas)
                .HasForeignKey(d => d.Espacio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_cronograma_habitacion");

            entity.HasOne(d => d.ResponsableNavigation).WithMany(p => p.Cronogramas)
                .HasForeignKey(d => d.Responsable)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_cronograma_doctor");
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Doctor__3213E83FF7190884");

            entity.ToTable("Doctor");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.Edad).HasColumnName("edad");
            entity.Property(e => e.Especialidad)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("especialidad");
            entity.Property(e => e.Experiencia).HasColumnName("experiencia");
            entity.Property(e => e.Hospital).HasColumnName("hospital");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");

            entity.HasOne(d => d.HospitalNavigation).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.Hospital)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_doctor_hospital");
        });

        modelBuilder.Entity<Enfermero>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Enfermer__3213E83F967802C7");

            entity.ToTable("Enfermero");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.Edad).HasColumnName("edad");
            entity.Property(e => e.Experiencia).HasColumnName("experiencia");
            entity.Property(e => e.Hospital).HasColumnName("hospital");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");

            entity.HasOne(d => d.HospitalNavigation).WithMany(p => p.Enfermeros)
                .HasForeignKey(d => d.Hospital)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_enfermero_hospital");
        });

        modelBuilder.Entity<EnfermeroPaciente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Enfermer__3213E83F9C26A8DF");

            entity.ToTable("Enfermero_Paciente");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Enfermero).HasColumnName("enfermero");
            entity.Property(e => e.Paciente).HasColumnName("paciente");

            entity.HasOne(d => d.EnfermeroNavigation).WithMany(p => p.EnfermeroPacientes)
                .HasForeignKey(d => d.Enfermero)
                .HasConstraintName("fk_ep_enfermero");

            entity.HasOne(d => d.PacienteNavigation).WithMany(p => p.EnfermeroPacientes)
                .HasForeignKey(d => d.Paciente)
                .HasConstraintName("fk_ep_paciente");
        });

        modelBuilder.Entity<GestorAsignacione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__GestorAs__3213E83F9CD92B6C");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Alerta)
                .IsUnicode(false)
                .HasColumnName("alerta");
            entity.Property(e => e.Estrategia)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("estrategia");
            entity.Property(e => e.FechaEjecucion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fechaEjecucion");
            entity.Property(e => e.Habitacion).HasColumnName("habitacion");
            entity.Property(e => e.Solicitud).HasColumnName("solicitud");

            entity.HasOne(d => d.HabitacionNavigation).WithMany(p => p.GestorAsignaciones)
                .HasForeignKey(d => d.Habitacion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_gestor_habitacion");

            entity.HasOne(d => d.SolicitudNavigation).WithMany(p => p.GestorAsignaciones)
                .HasForeignKey(d => d.Solicitud)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_gestor_solicitud");
        });

        modelBuilder.Entity<Habitacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Habitaci__3213E83F8B9C69B0");

            entity.ToTable("Habitacion");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Area).HasColumnName("area");
            entity.Property(e => e.Capacidad)
                .HasDefaultValue(1)
                .HasColumnName("capacidad");
            entity.Property(e => e.Estado)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasDefaultValue("disponible")
                .HasColumnName("estado");
            entity.Property(e => e.Hospital).HasColumnName("hospital");
            entity.Property(e => e.Numero).HasColumnName("numero");
            entity.Property(e => e.Piso).HasColumnName("piso");
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo");

            entity.HasOne(d => d.HospitalNavigation).WithMany(p => p.Habitacions)
                .HasForeignKey(d => d.Hospital)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_habitacion_hospital");
        });

        modelBuilder.Entity<Hospital>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Hospital__3213E83F27CB295C");

            entity.ToTable("Hospital");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CPisos)
                .HasDefaultValue(1)
                .HasColumnName("c_pisos");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("direccion");
            entity.Property(e => e.FFundacion).HasColumnName("f_fundacion");
            entity.Property(e => e.NEmpleados).HasColumnName("n_empleados");
            entity.Property(e => e.NHabitaciones).HasColumnName("n_habitaciones");
            entity.Property(e => e.Nombres)
                .HasMaxLength(150)
                .IsUnicode(false)
                .HasColumnName("nombres");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Paciente__3213E83FCFEFE4B7");

            entity.ToTable("Paciente");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellidos");
            entity.Property(e => e.Descripcion)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.Doctor).HasColumnName("doctor");
            entity.Property(e => e.Edad).HasColumnName("edad");
            entity.Property(e => e.FNacimiento).HasColumnName("f_nacimiento");
            entity.Property(e => e.Habitacion).HasColumnName("habitacion");
            entity.Property(e => e.Nombres)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombres");

            entity.HasOne(d => d.DoctorNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.Doctor)
                .HasConstraintName("fk_paciente_doctor");

            entity.HasOne(d => d.HabitacionNavigation).WithMany(p => p.Pacientes)
                .HasForeignKey(d => d.Habitacion)
                .HasConstraintName("fk_paciente_habitacion");
        });

        modelBuilder.Entity<Solicitud>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Solicitu__3213E83FC0D6892B");

            entity.ToTable("Solicitud");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Descripcion)
                .IsUnicode(false)
                .HasColumnName("descripcion");
            entity.Property(e => e.FechaHora)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fechaHora");
            entity.Property(e => e.IdPaciente).HasColumnName("idPaciente");
            entity.Property(e => e.Prioridad)
                .HasDefaultValue(1)
                .HasColumnName("prioridad");
            entity.Property(e => e.Tipo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("tipo");

            entity.HasOne(d => d.IdPacienteNavigation).WithMany(p => p.Solicituds)
                .HasForeignKey(d => d.IdPaciente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_solicitud_paciente");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
