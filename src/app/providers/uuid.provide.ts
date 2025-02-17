import { UUID_TOKEN } from "../injectionTokens/uuid.token";
import { v4 as uuidv4 } from "uuid";
export const UUID_PROVIDER = {
  provide: UUID_TOKEN,
  useValue: uuidv4,
};
