"use client";

import { useLenis } from '../lib/useLenis';

export function LenisProvider() {
  useLenis();
  return null;
}