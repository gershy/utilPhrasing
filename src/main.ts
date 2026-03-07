export type Mode = 'camel' | 'kebab' | 'snake' | 'kamel';

export default ((str: string, src: Mode, trg: 'parts' | Mode) => {
  
  const splitReg = { camel: /(?=[A-Z])/, kamel: /(?=[A-Z])/, kebab: /[-]+/, snake: /[_]+/ }[src];
  const parts = str.split(splitReg).map(cmp => cmp[lower]()).filter(v => !!v);
  
  if (trg === 'parts') return parts;
  if (trg === 'camel') return [ parts[0], ...parts.slice(1).map(v => v[0][upper]() + v.slice(1)) ].join('');
  if (trg === 'kamel') return parts                        .map(v => v[0][upper]() + v.slice(1))  .join('');
  if (trg === 'kebab') return parts.join('-');
  if (trg === 'snake') return parts.join('_');
  
  throw Error('ouch');
  
}) as ({
  
  (str: string, src: Mode, trg: 'parts'): string[],
  (str: string, src: Mode, trg: Mode):    string,
  
});