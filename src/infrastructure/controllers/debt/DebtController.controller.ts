import { Request, Response } from 'express';
import { AuthRequest } from '../../middlewares/debtauth.middleware';

import { PrismaDebtRepository } from '../../repositories/PrismaDebtRepository';

import { CreateDebt } from '@usecases/debt/CreateDebt.usecase';
import { UpdateDebt } from '@usecases/debt/UpdateDebt.usecase';
import { DeleteDebt } from '@usecases/debt/DeleteDebt.usecase';
import { MarkDebtPaid } from '@usecases/debt/MarkDebtPaid.usecase';
import { ListDebts } from '@usecases/debt/ListDebts.usecase';
import { ExportDebts } from '@usecases/debt/ExportDebts.usecase';
import { DebtAggregates } from '@usecases/debt/DebtAggregates.usecase';

const repo = new PrismaDebtRepository();

const createDebt = new CreateDebt(repo);
const updateDebt = new UpdateDebt(repo);
const deleteDebt = new DeleteDebt(repo);
const markDebtPaid = new MarkDebtPaid(repo);
const listDebts = new ListDebts(repo);
const exportDebts = new ExportDebts(repo);
const aggregates = new DebtAggregates(repo);

export class DebtController {

  /**
   * POST /debts
   */
  static async create(req: AuthRequest, res: Response) {
    try {
      const debt = await createDebt.execute(
        req.user!.userId,
        req.body
      );
      res.status(201).json(debt);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * GET /debts?status=PENDING|PAID
   */
  static async list(req: AuthRequest, res: Response) {
    try {
      const debts = await listDebts.execute(
        req.user!.userId,
        req.query.status as any
      );
      res.json(debts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * PUT /debts/:id
   */
  static async update(req: AuthRequest, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'ID es requerido' });
      }

      const debt = await updateDebt.execute(
        id,
        req.body
      );
      res.json(debt);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * DELETE /debts/:id
   */
  static async delete(req: AuthRequest, res: Response)  {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'ID es requerido' });
      }
      await deleteDebt.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * POST /debts/:id/pay
   */
  static async pay(req: AuthRequest, res: Response)  {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      if (!id) {
        return res.status(400).json({ message: 'ID es requerido' });
      }

      const debt = await markDebtPaid.execute(id);
      res.json(debt);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * GET /debts/export/:format (json | csv)
   */
  static async export(req: AuthRequest, res: Response)  {
    try {
      const format = req.params.format as 'json' | 'csv';
      const result = await exportDebts.execute(
        req.user!.userId,
        format
      );

      if (format === 'csv') {
        res.header('Content-Type', 'text/csv');
        res.attachment('debts.csv');
        return res.send(result);
      }

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * GET /debts/aggregates
   */
  static async aggregates (req: AuthRequest, res: Response)  {
    try {
      const result = await aggregates.execute(req.user!.userId);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
