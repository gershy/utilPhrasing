import { assertEqual, testRunner } from '../build/utils.test.ts';
import phrasing, { type Mode } from './main.ts';

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
  if (0) ((v?: Tests) => void 0)();
  
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
  { name: 'parts src', fn: async () => {
    
    assertEqual(
      phrasing('parts->camel', [ 'a', 'b', 'c' ]),
      'aBC'
    );
    assertEqual(
      phrasing('parts->camel', [ 'aa', 'bb', 'cc' ]),
      'aaBbCc'
    );
    
  }},
  { name: 'parts trg', fn: async () => {
    
    assertEqual(
      phrasing('camel->parts', 'aBC'),
      [ 'a', 'b', 'c' ]
    );
    assertEqual(
      phrasing('camel->parts', 'aaBbCc'),
      [ 'aa', 'bb', 'cc' ]
    );
    assertEqual(
      phrasing('kebab->parts', 'a-b-c'),
      [ 'a', 'b', 'c' ]
    );
    assertEqual(
      phrasing('snake->parts', 'aa_bb_cc'),
      [ 'aa', 'bb', 'cc' ]
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
