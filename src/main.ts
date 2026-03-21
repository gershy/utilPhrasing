import '@gershy/clearing';

export type Mode = 'camel' | 'kebab' | 'snake' | 'kamel';

export default ((conversion: `${Mode}->${'parts' | Mode}`, str: string) => {
  
  const [ src, trg ] = conversion[cl.cut]('->', 1) as [ Mode, 'parts' | Mode ];
  const splitReg = { camel: /(?=[A-Z])/, kamel: /(?=[A-Z])/, kebab: /[-]+/, snake: /[_]+/ }[src];
  const parts = str.split(splitReg).map(cmp => cmp[cl.lower]()).filter(v => !!v);
  
  if (trg === 'parts') return parts;
  if (trg === 'camel') return [ parts[0], ...parts.slice(1).map(v => v[0][cl.upper]() + v.slice(1)) ].join('');
  if (trg === 'kamel') return parts                        .map(v => v[0][cl.upper]() + v.slice(1))  .join('');
  if (trg === 'kebab') return parts.join('-');
  if (trg === 'snake') return parts.join('_');
  
  throw Error('ouch');
  
}) as {
  
  <Src extends Mode>                  (conversion: `${Src}->parts`,  str: string): string[],
  <Src extends Mode, Trg extends Mode>(conversion: `${Src}->${Trg}`, str: string): string
  
};