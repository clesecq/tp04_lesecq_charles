import { Request, Response } from "express";

interface CatalogueItem {
  ref: string;
  titre: string;
  prix: number;
}

export function get(req: Request, res: Response): void {
  const catalogue: CatalogueItem[] = [
    { ref: "X001", titre: "Linux", prix: 10 },
    { ref: "X002", titre: "Angular", prix: 20 }
  ];

  res.setHeader('Content-Type', 'application/json');
  res.send(catalogue);
}
