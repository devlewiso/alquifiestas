export interface ContractTerms {
  id: string;
  version: string;
  effective_date: string;
  title: string;
  sections: ContractSection[];
}

export interface ContractSection {
  id: string;
  title: string;
  clauses: string[];
}

export const standardContract: ContractTerms = {
  id: "contract-v1",
  version: "1.0",
  effective_date: "2026-06-01",
  title: "Contrato de Servicios para Eventos — Alquifiestas",
  sections: [
    {
      id: "sec-1",
      title: "1. Partes del Contrato",
      clauses: [
        "Este contrato es celebrado entre el CLIENTE (quien realiza la reserva a través de la plataforma Alquifiestas) y el PROVEEDOR (prestador del servicio o alquiler de equipos).",
        "Alquifiestas actúa como intermediario de confianza, gestionando el depósito de seguridad y mediando en caso de disputas.",
      ],
    },
    {
      id: "sec-2",
      title: "2. Objeto del Servicio",
      clauses: [
        "El proveedor se compromete a entregar los servicios y/o equipos descritos en la reserva, en la fecha, hora y lugar acordados.",
        "El cliente se compromete a proporcionar acceso al lugar del evento y las condiciones necesarias para la instalación y operación.",
        "Cualquier cambio en los servicios contratados debe ser notificado con al menos 72 horas de anticipación.",
      ],
    },
    {
      id: "sec-3",
      title: "3. Pagos y Depósito",
      clauses: [
        "El cliente pagará un depósito del 30% del total al momento de confirmar la reserva. Este depósito es retenido por Alquifiestas como garantía.",
        "El saldo restante (70%) se pagará directamente al proveedor el día del evento o según lo acordado entre las partes.",
        "El depósito será liberado al proveedor dentro de las 24 horas siguientes a la finalización del evento, si no hay disputas.",
      ],
    },
    {
      id: "sec-4",
      title: "4. Cancelaciones y Reembolsos",
      clauses: [
        "Cancelación con más de 15 días de anticipación: reembolso del 100% del depósito.",
        "Cancelación entre 7 y 15 días: reembolso del 50% del depósito. El 50% restante compensa al proveedor por la fecha bloqueada.",
        "Cancelación con menos de 7 días: el depósito no es reembolsable. El proveedor puede ofrecer crédito para futuros eventos a su discreción.",
        "Si el proveedor cancela por causas de fuerza mayor, el depósito se reembolsa al 100% y Alquifiestas ayuda a encontrar reemplazo.",
      ],
    },
    {
      id: "sec-5",
      title: "5. Responsabilidad y Daños",
      clauses: [
        "El proveedor es responsable de entregar los equipos en condiciones óptimas de funcionamiento y limpieza.",
        "El cliente es responsable por daños causados por uso indebido, negligencia o accidentes durante el evento.",
        "En caso de daños, Alquifiestas mediará entre las partes. Si no hay acuerdo, se aplicará un depósito en garantía de hasta el 20% del valor del equipo dañado.",
        "El proveedor debe reportar daños dentro de las 24 horas posteriores al evento con evidencia fotográfica.",
      ],
    },
    {
      id: "sec-6",
      title: "6. Puntualidad y Incumplimiento",
      clauses: [
        "El proveedor debe llegar a la hora acordada. Un retraso de hasta 30 minutos es aceptable si se comunica al cliente.",
        "Retrasos superiores a 1 hora sin justificación válida habilitan al cliente a solicitar un descuento del 20% o la cancelación con reembolso total.",
        "Si el proveedor no se presenta (no-show), el cliente recibe reembolso del 100% del depósito + un crédito de Q500 en Alquifiestas.",
      ],
    },
    {
      id: "sec-7",
      title: "7. Reseñas y Reputación",
      clauses: [
        "Solo los clientes que completaron un evento con el proveedor pueden dejar reseñas en la plataforma.",
        "Las reseñas deben ser veraces y basadas en la experiencia real del evento.",
        "Alquifiestas se reserva el derecho de moderar o eliminar reseñas que contengan lenguaje ofensivo, spam o información falsa.",
      ],
    },
    {
      id: "sec-8",
      title: "8. Resolución de Disputas",
      clauses: [
        "En caso de disputa, ambas partes se comprometen a intentar una solución amistosa en un plazo de 5 días hábiles.",
        "Si no hay acuerdo, Alquifiestas actuará como mediador neutral. La decisión de Alquifiestas será vinculante para ambas partes.",
        "Alquifiestas se reserva el derecho de suspender temporalmente los fondos en disputa hasta alcanzar una resolución.",
      ],
    },
    {
      id: "sec-9",
      title: "9. Seguro de Evento (Opcional)",
      clauses: [
        "El cliente puede contratar un seguro de evento por un monto adicional del 3% al 5% del total de la reserva.",
        "El seguro cubre: cancelación de último momento por enfermedad, daños accidentales a equipos, y retraso del proveedor.",
        "El seguro es ofrecido por un tercero asegurador autorizado. Alquifiestas solo facilita la contratación.",
      ],
    },
    {
      id: "sec-10",
      title: "10. Aceptación",
      clauses: [
        "Al marcar la casilla de aceptación y pagar el depósito, el cliente confirma que ha leído, entendido y aceptado todos los términos de este contrato.",
        "El proveedor también acepta estos términos al confirmar la reserva en su dashboard.",
        "Este contrato tiene validez legal en la República de Guatemala y se rige por las leyes guatemaltecas vigentes.",
      ],
    },
  ],
};
