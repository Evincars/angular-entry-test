import {
  MACHINE_STATES,
  MACHINE_TYPES,
  type Machine,
  type MachineState,
  type MachineType,
} from './machine.model';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const isMachineState = (value: unknown): value is MachineState =>
  MACHINE_STATES.some((state) => state === value);

export const isMachineType = (value: unknown): value is MachineType =>
  MACHINE_TYPES.some((type) => type === value);

function parseMachine(raw: unknown, index: number, receivedAt: Date): Machine {
  if (!isRecord(raw)) {
    throw new TypeError(`Machine #${index} is not an object.`);
  }
  const { id, name, type, state, description, stateSince } = raw;

  if (!isNonEmptyString(id) || !isNonEmptyString(name)) {
    throw new TypeError(`Machine #${index} needs a non-empty "id" and "name".`);
  }
  if (!isMachineType(type)) {
    throw new TypeError(
      `Machine "${id}" has an unknown type: ${String(type)}.`,
    );
  }
  if (!isMachineState(state)) {
    throw new TypeError(
      `Machine "${id}" has an unknown state: ${String(state)}.`,
    );
  }

  return {
    id,
    name,
    type,
    state,
    description: typeof description === 'string' ? description : '',
    stateSince:
      typeof stateSince === 'string' ? new Date(stateSince) : receivedAt,
  } satisfies Machine;
}

/**
 * Validates the untyped JSON payload and maps it to the domain model.
 * The array order defines the order of the machines on the line.
 */
export function parseMachines(
  raw: unknown,
  receivedAt = new Date(),
): Machine[] {
  if (!Array.isArray(raw)) {
    throw new TypeError('Machines payload must be an array.');
  }
  const machines = raw.map((item: unknown, index) =>
    parseMachine(item, index, receivedAt),
  );

  const ids = new Set(machines.map(({ id }) => id));
  if (ids.size !== machines.length) {
    throw new TypeError('Machine ids must be unique.');
  }
  return machines;
}
