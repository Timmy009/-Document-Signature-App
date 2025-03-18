export default async function promisify<E = Error, R = unknown>(
  promise: Promise<R>
): Promise<[E, R]> {
  try {
    const data = await promise;
    return [null as E, data as R];
  } catch (err) {
    return [err as E, null as R];
  }
}
