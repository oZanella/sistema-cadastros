"use client";

import { useState, useRef, useEffect } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const selectedDate = formData.data ? new Date(formData.data) : undefined;
  const calendarRef = useRef<HTMLDivElement>(null);

  // Fecha o calendário ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Registro</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Input value={formData.tipo} readOnly />
          </div>

          <div className="grid gap-2 relative">
            <Label htmlFor="data">Data</Label>
            <div className="relative w-full">
              <Input
                id="data"
                className="w-full pr-10"
                value={
                  selectedDate
                    ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
                    : ""
                }
                readOnly
              />
              <CalendarIcon
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setCalendarOpen(!calendarOpen)}
                size={20}
              />
            </div>

            {calendarOpen && (
              <div
                ref={calendarRef}
                className="absolute z-50 mt-2 left-0"
                style={{ minWidth: "250px" }}
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      onFormChange("data", date.toISOString());
                      setCalendarOpen(false);
                    }
                  }}
                  className="rounded-lg border bg-white"
                  locale={ptBR}
                />
              </div>
            )}
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
