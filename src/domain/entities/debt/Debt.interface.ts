import { DebtStatus } from "@shared/enums/debt.enum";

export interface IDebt {
  id: string;
  userId: string;
  description: string;
  amount: number;
  status: DebtStatus;
  createdAt: Date;
  updatedAt: Date;
}