// Casos prácticos simplificados (educativo)
const CASES = [
  {
    text: 'Ana devenga 1.8 SMMLV y recibe auxilio de transporte. ¿Debe incluirse este auxilio en la base para calcular cesantías?',
    options: [
      'Sí, porque todo lo devengado entra a la base',
      'No, el auxilio de transporte no constituye salario para prestaciones',
      'Solo si supera 2 SMMLV'
    ],
    correctIndex: 1,
    explain: 'El auxilio de transporte no constituye salario para cesantías, intereses, prima ni vacaciones.'
  },
  {
    text: 'Luis tiene salario base de $2.500.000. ¿Aplica auxilio de transporte si el SMMLV es $1.300.000?',
    options: [
      'Sí, siempre',
      'No, supera 2 SMMLV',
      'Solo si es aprendiz'
    ],
    correctIndex: 1,
    explain: 'Si el salario supera 2 SMMLV, no se reconoce auxilio de transporte.'
  },
  {
    text: 'María laboró 10 horas extra diurnas. La hora ordinaria es $10.000. ¿Valor de esas horas?',
    options: [
      '$100.000',
      '$150.000',
      '$200.000'
    ],
    correctIndex: 1,
    explain: 'Hora extra diurna = 10.000 * 1.5 = 15.000. Por 10 horas: 150.000.'
  }
  ,
  {
    text: 'Empresa paga a Carlos bonificación habitual mensual por cumplimiento, pactada como salario. ¿Esa bonificación integra base para prestaciones?',
    options: [
      'Sí, al ser habitual y pactada como salario',
      'No, ninguna bonificación integra base',
      'Solo si supera el 50% del salario'
    ],
    correctIndex: 0,
    explain: 'Si la bonificación constituye salario por acuerdo y habitualidad, integra la base de prestaciones.'
  },
  {
    text: 'Paula gana $1.200.000 (SMMLV 1.300.000). ¿Recibe auxilio de transporte?',
    options: [
      'Sí, pues su salario no supera 2 SMMLV',
      'No, porque está por debajo del SMMLV',
      'Solo si trabaja de noche'
    ],
    correctIndex: 0,
    explain: 'Aplica auxilio de transporte para salarios hasta 2 SMMLV, sujeto a normativa vigente.'
  },
  {
    text: 'Julián trabajó en domingo 8 horas sin recargo nocturno. ¿Qué recargo aplica sobre la hora dominical? (orientativo)',
    options: [
      '25%',
      '75%',
      '100%'
    ],
    correctIndex: 1,
    explain: 'El recargo dominical/ festivo ordinario se toma como 75% sobre la hora ordinaria (referencial).'
  }
];
