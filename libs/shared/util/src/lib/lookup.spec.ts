import { createLookup } from './lookup';

describe('createLookup', () => {
  type Light = 'red' | 'amber' | 'green';

  it('maps every key of the table', () => {
    const toAction = createLookup<Light, string>({
      red: 'stop',
      amber: 'wait',
      green: 'go',
    });

    expect(toAction('red')).toBe('stop');
    expect(toAction('amber')).toBe('wait');
    expect(toAction('green')).toBe('go');
  });
});
