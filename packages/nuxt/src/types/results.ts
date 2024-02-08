import { ResultEnum, Stats } from "mpt-types/Result";
import type { Answer } from "./test";

export interface Results {
  demo: boolean;
  id: string;
  test_id: string;
  stats: Stats;
  result: ResultEnum;
  start_at: number;
  end_at: number;
  answers: Answer[];
  timestamp: number;
}
