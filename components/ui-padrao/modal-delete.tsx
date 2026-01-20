"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalDeleteProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
};

export function ModalDelete({
  open,
  onClose,
  onConfirm,
  loading = false,
  title = "Excluir registro",
  description = "Tem certeza que deseja excluir este registro? Esta ação não poderá ser desfeita.",
}: ModalDeleteProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(value) => !value && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn("fixed inset-0 z-50", "bg-black/50 backdrop-blur-sm")}
        />

        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "fixed z-50",
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100%-2rem)] max-w-md",
            "rounded-xl",
            "bg-background",
            "border border-border",
            "p-6",
            "shadow-xl",
            "focus:outline-none",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="text-lg font-semibold leading-none">
              {title}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button
                type="button"
                className={cn(
                  "rounded-md p-1",
                  "text-muted-foreground",
                  "hover:text-foreground hover:bg-muted",
                  "transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                )}
              ></button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="mt-3 text-sm text-muted-foreground leading-relaxed">
            {description}
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>

            <Button variant="delete" onClick={onConfirm} disabled={loading}>
              {loading ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
