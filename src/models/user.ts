export type Model = {
  email: string;
  token: string;
};

export function build(model: Model) {
  return model;
}
