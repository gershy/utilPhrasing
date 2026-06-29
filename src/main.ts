import '@gershy/clearing';

export type Mode = 'camel' | 'kebab' | 'snake' | 'kamel';

export default ((conversion: `${'parts' | Mode}->${'parts' | Mode}`, inp: string | string[]) => {
  
  const [ src, trg ] = conversion[cl.cut]('->', 1) as [ 'parts' | Mode, 'parts' | Mode ];
  const parts = src !== 'parts'
    ? (inp as string)
        .split({ camel: /(?=[A-Z])/, kamel: /(?=[A-Z])/, kebab: /[-]+/, snake: /[_]+/ }[src])
        .map(cmp => cmp[cl.lower]())
        .filter(v => !!v)
    : (inp as string[]);
  
  if (trg === 'parts') return parts;
  if (trg === 'camel') return [ parts[0], ...parts.slice(1).map(v => v[0][cl.upper]() + v.slice(1)) ].join('');
  if (trg === 'kamel') return parts                        .map(v => v[0][cl.upper]() + v.slice(1))  .join('');
  if (trg === 'kebab') return parts.join('-');
  if (trg === 'snake') return parts.join('_');
  
  throw Error('ouch');
  
}) as {
  
  (conversion: `parts->${Mode}`,  pts: string[]): string,
  (conversion: `${Mode}->parts`,  str: string): string[],
  (conversion: `${Mode}->${Mode}`, str: string): string
  
};