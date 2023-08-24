import { z } from "zod";
import * as UserModel from "@/models/user";

export function fromObject(object: unknown) {
  const parsed = z
    .object({
      email: z.string(),
      token: z.string().optional(),
    })
    .parse(object);
  return UserModel.build({
    email: parsed.email,
    token: parsed.token ?? "",
  });
}
