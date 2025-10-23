// Banco simple de preguntas (educativo, no asesoría legal)
const QUIZ_QUESTIONS = [
  {
    question: 'Para determinar si procede el auxilio de transporte, ¿sobre qué valor se verifica el tope de 2 SMMLV?',
    options: [
      'Devengado total incluyendo horas extra',
      'Salario ordinario pactado (sin incluir horas extra ni recargos)',
      'IBC de seguridad social',
      'Salario integral dividido entre 12'
    ],
    correctIndex: 1,
    explain: 'La elegibilidad suele evaluarse sobre el salario ordinario pactado. Horas extra/recargos no se usan para verificar el tope.'
  },
  {
    question: 'En un contrato NO integral, el IBC típico del trabajador para salud y pensión corresponde a:',
    options: [
      'Devengado total sin topes',
      'Salario y factores que constituyen salario, con topes mínimos y máximos',
      'Solo comisiones',
      'Salario básico menos auxilio de transporte'
    ],
    correctIndex: 1,
    explain: 'El IBC se calcula con salario y factores salariales conforme a la norma, sujeto a piso (SMMLV) y techo (25 SMMLV aprox.).'
  },
  {
    question: 'Una bonificación habitual pactada como no salarial y que no remunera el servicio, ¿integra la base de cesantías?',
    options: [
      'Sí, siempre que sea habitual',
      'No, si es expresamente no salarial y no retribuye el servicio',
      'Sí, pero solo el 50%',
      'Depende del número de trabajadores'
    ],
    correctIndex: 1,
    explain: 'Pagos expresamente no salariales y que no remuneran el servicio no integran la base de prestaciones.'
  },
  {
    question: 'Un trabajador con salario ordinario de $2.000.000 realiza 12 horas extra diurnas. Si la hora ordinaria es $8.333, ¿cuál es el valor de las horas extra?',
    options: [
      '$99.996',
      '$149.994',
      '$199.992',
      '$233.324'
    ],
    correctIndex: 1,
    explain: 'Hora extra diurna = 1.5 × hora. 12 × 8.333 × 1.5 ≈ $149.994.'
  },
  {
    question: 'El trabajo nocturno ordinario (no extra) tiene un recargo aproximado de:',
    options: ['25%', '35%', '75%', '100%'],
    correctIndex: 1,
    explain: 'El recargo nocturno ordinario es del 35% sobre la hora ordinaria.'
  },
  {
    question: 'La prima legal de servicios equivale, en términos mensualizados aproximados, a:',
    options: ['4.17%', '8.33%', '12.5%', '16.66%'],
    correctIndex: 1,
    explain: '30 días/año ≈ 8.33% mensualizado.'
  },
  {
    question: 'Las vacaciones legales mínimas en Colombia corresponden a:',
    options: ['15 días hábiles por año', '15 días calendario', '20 días calendario', '10 días hábiles'],
    correctIndex: 0,
    explain: 'Corresponden a 15 días hábiles de vacaciones por cada año de servicios.'
  },
  {
    question: 'Respecto al auxilio de transporte, señale la correcta:',
    options: [
      'Constituye salario para prestaciones',
      'No constituye salario para prestaciones',
      'Solo constituye salario para vacaciones',
      'Constituye salario si se paga en efectivo'
    ],
    correctIndex: 1,
    explain: 'El auxilio de transporte no constituye salario para prestaciones (cesantías, intereses, prima, vacaciones).'
  },
  {
    question: 'En la liquidación de prestaciones, el auxilio de transporte:',
    options: [
      'Se incluye en cesantías e intereses',
      'Se excluye de cesantías e intereses',
      'Solo se incluye en prima',
      'Solo se incluye en vacaciones'
    ],
    correctIndex: 1,
    explain: 'Se excluye de las bases prestacionales; su naturaleza es no salarial para esos efectos.'
  },
  {
    question: 'Para cálculo referencial de provisiones, ¿cuál de las siguientes tasas mensualizadas se usa con mayor frecuencia?',
    options: [
      'Cesantías 8.33%, Prima 8.33%, Vacaciones 4.17%',
      'Cesantías 4.17%, Prima 8.33%, Vacaciones 8.33%',
      'Cesantías 12.5%, Prima 4.17%, Vacaciones 8.33%',
      'Todas son 8.33%'
    ],
    correctIndex: 0,
    explain: 'Mensualización referencial: cesantías 8.33%, prima 8.33%, vacaciones 4.17% sobre salario base.'
  },
  {
    question: 'Un trabajador con salario de $1.300.000 y SMMLV $1.423.000, ¿recibe auxilio de transporte (valor parametrizable)?',
    options: ['Sí, porque no supera 2 SMMLV', 'No, porque está por debajo del SMMLV', 'No, porque supera 2 SMMLV', 'Solo si es aprendiz'],
    correctIndex: 0,
    explain: 'Hasta 2 SMMLV suele aplicar el auxilio de transporte, sujeto a normativa vigente.'
  },
  {
    question: 'En un salario integral, ¿cómo se tratan los factores prestacionales?',
    options: [
      'Se causan igual que en salario ordinario',
      'Se entienden incluidos en la suma integral según acuerdo y ley',
      'No se pagan',
      'Se pagan solo cesantías'
    ],
    correctIndex: 1,
    explain: 'El salario integral incluye factor prestacional conforme a la regulación aplicable.'
  }
];
