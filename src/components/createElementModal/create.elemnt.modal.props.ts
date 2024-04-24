import { MouseEventHandler } from "react";

export interface CreateElementModalProps {
  x: number
  y: number;
  isOpen: boolean;
  onClose: MouseEventHandler;
  onSubmit: any;
}