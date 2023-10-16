import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const PosState = atom({
  key: "PosState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});