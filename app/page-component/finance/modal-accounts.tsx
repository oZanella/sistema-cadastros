"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipos
type FormData = {
  tipo: string;
  data: string;
  nome: string;
  historico: string;
  valor: string;
};

type FinanceEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
  onSave: () => void;
};

export default function FinanceEditModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSave,
}: FinanceEditModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Registro</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select
              value={formData.tipo}
              onValueChange={(value) => onFormChange("tipo", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Receita">Receita</SelectItem>
                <SelectItem value="Despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              className="w-full"
              value={formData.data}
              onChange={(e) => onFormChange("data", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              className="w-full"
              value={formData.nome}
              onChange={(e) => onFormChange("nome", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="historico">Histórico</Label>
            <Input
              id="historico"
              className="w-full"
              value={formData.historico}
              onChange={(e) => onFormChange("historico", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="valor">Valor</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              className="w-full"
              value={formData.valor}
              onChange={(e) => onFormChange("valor", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
