import {
  Smartphone,
  BatteryCharging,
  Plug,
  Camera,
  Volume2,
  Mic,
  Droplets,
  Settings,
  Unlock,
  LucideIcon,
} from "lucide-react";

export interface RepairService {
  icon: LucideIcon;
  label: string;
  desc: string;
}

export const repairServices: RepairService[] = [
  { icon: Smartphone, label: "Écran cassé", desc: "Remplacement toutes marques" },
  { icon: BatteryCharging, label: "Batterie", desc: "Autonomie retrouvée en 30 min" },
  { icon: Plug, label: "Connecteur de charge", desc: "Nettoyage ou remplacement" },
  { icon: Camera, label: "Caméra", desc: "Photo & vidéo comme neuf" },
  { icon: Volume2, label: "Haut-parleur", desc: "Son clair, sans grésillement" },
  { icon: Mic, label: "Microphone", desc: "Appels et messages vocaux nets" },
  { icon: Droplets, label: "Contact avec l'eau", desc: "Diagnostic & désoxydation" },
  { icon: Settings, label: "Problèmes logiciels", desc: "Mise à jour, bug, blocage" },
  { icon: Unlock, label: "Déblocage / assistance", desc: "Accompagnement pas à pas" },
];

export const CATEGORIES = [
  "Tous",
  "iPhone",
  "Samsung",
  "Xiaomi",
  "Tecno",
  "Infinix",
  "Accessoires",
];
