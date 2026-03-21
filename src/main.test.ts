import { assertEqual, testRunner } from '../build/utils.test.ts';
import phrasing, { Mode } from './main.ts';

// Note we're 
const allStrModes = [ 'camel', 'kebab', 'snake', 'kamel' ] as const;
type AllStrModes = typeof allStrModes;
type StrMode = AllStrModes[number];

// Type testing
(async () => {
  
  type Enforce<Provided, Expected extends Provided> = { provided: Provided, expected: Expected };
  
  const arr = phrasing('camel->parts', 'abc');
  const str = phrasing(`camel->${allStrModes[0 as number]}`, 'abc');
  
  type Tests = {
    1: Enforce<typeof arr, string[]>,
    2: Enforce<typeof str, string>,
    3: Enforce<StrMode, Mode>, // Note this test forces `allStrModes` in this file to include all modes from `main.ts`!
  };
  
})();

testRunner([
  
  { name: 'basic test', fn: async () => {
    
    assertEqual(
      phrasing('camel->camel', 'testyMan'),
      'testyMan'
    );
    assertEqual(
      phrasing('camel->kebab', 'testyMan'),
      'testy-man'
    );
    assertEqual(
      phrasing('camel->snake', 'testyMan'),
      'testy_man'
    );
    assertEqual(
      phrasing('camel->kamel', 'testyMan'),
      'TestyMan'
    );
    
  }},
  { name: 'fuzz', fn: async () => {
    
    for (const src of allStrModes)
      for (const trg of allStrModes)
        assertEqual(phrasing(`${src}->${trg}`, ''), '');
    
    for (const src of allStrModes)
      assertEqual(phrasing(`${src}->parts`, ''), []);
    
  }}
  
]);
