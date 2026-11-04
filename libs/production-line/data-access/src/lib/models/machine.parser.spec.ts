import { parseMachines } from './machine.parser';

describe('parseMachines', () => {
  const receivedAt = new Date(2020, 4, 1, 12, 44);

  it('maps valid JSON to machines, keeping the line order', () => {
    const machines = parseMachines(
      [
        {
          id: 'scale',
          name: 'Scale',
          type: 'scale',
          state: 'running',
          description: 'Weighs',
        },
        {
          id: 'closer',
          name: 'Closer',
          type: 'bag-closer',
          state: 'warning',
          stateSince: '2020-05-01T10:00:00.000Z',
        },
      ],
      receivedAt,
    );

    expect(machines).toEqual([
      {
        id: 'scale',
        name: 'Scale',
        type: 'scale',
        state: 'running',
        description: 'Weighs',
        stateSince: receivedAt,
      },
      {
        id: 'closer',
        name: 'Closer',
        type: 'bag-closer',
        state: 'warning',
        description: '',
        stateSince: new Date('2020-05-01T10:00:00.000Z'),
      },
    ]);
  });

  it.each([
    ['a non-array payload', { machines: [] }, /must be an array/],
    ['a non-object item', ['scale'], /is not an object/],
    [
      'a missing id',
      [{ name: 'Scale', type: 'scale', state: 'running' }],
      /non-empty "id"/,
    ],
    [
      'an unknown type',
      [{ id: 'x', name: 'X', type: 'robot', state: 'running' }],
      /unknown type/,
    ],
    [
      'an unknown state',
      [{ id: 'x', name: 'X', type: 'scale', state: 'idle' }],
      /unknown state/,
    ],
    [
      'duplicate ids',
      [
        { id: 'x', name: 'X', type: 'scale', state: 'running' },
        { id: 'x', name: 'Y', type: 'packer', state: 'running' },
      ],
      /unique/,
    ],
  ])('rejects %s', (_case, payload, message) => {
    expect(() => parseMachines(payload)).toThrow(message);
  });
});
