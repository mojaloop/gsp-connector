
import { randomUUID } from "crypto";

export class GspTransformer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toFspiopCurrency(amountMicros: string): string {
    // TODO: Implement conversion
    return amountMicros
  }

  // @ts-expect-error: TODO
  static toUUID(associationId: string): string {
    // TODO: Implement conversion
    return randomUUID()
  }
}