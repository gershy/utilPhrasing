import { assertEqual, testRunner } from '../build/utils.test.ts';
import phrasing, { Mode } from './main.ts';

// Note we're 
const allStrModes = [ 'camel', 'kebab', 'snake', 'kamel' ] as const;
type AllStrModes = typeof allStrModes;
type StrMode = AllStrModes[number];

// Type testing
(async () => {
  
  type Enforce<Provided, Expected extends Provided> = { provided: Provided, expected: Expected };
  
  const arr = phrasing('abc', 'camel', 'parts');
  const str = phrasing('abc', 'camel', allStrModes[0 as number]);
  
  type Tests = {
    1: Enforce<typeof arr, string[]>,
    2: Enforce<typeof str, string>,
    3: Enforce<StrMode, Mode>, // Note this test forces `allStrModes` in this file to include all modes from `main.ts`!
  };
  
})();

testRunner([
  
  { name: 'basic test', fn: async () => {
    
    assertEqual(
      phrasing('testyMan', 'camel', 'camel'),
      'testyMan'
    );
    assertEqual(
      phrasing('testyMan', 'camel', 'kebab'),
      'testy-man'
    );
    assertEqual(
      phrasing('testyMan', 'camel', 'snake'),
      'testy_man'
    );
    assertEqual(
      phrasing('testyMan', 'camel', 'kamel'),
      'TestyMan'
    );
    
  }},
  { name: 'fuzz', fn: async () => {
    
    for (const src of allStrModes)
      for (const trg of allStrModes)
        assertEqual(phrasing('', src, trg), '');
    
    for (const src of allStrModes)
      assertEqual(phrasing('', src, 'parts'), []);
    
  }}
  
]);
