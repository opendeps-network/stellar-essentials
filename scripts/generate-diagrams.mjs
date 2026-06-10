#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const SPEC_DIR = resolve(import.meta.dirname, '../specs');
const OUTPUT_DIR = resolve(import.meta.dirname, '../website/static/img/diagrams');

function parseSpec(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n').filter(l => l.trim() && !l.startsWith('#'));
  const spec = { nodes: [], edges: [] };
  let section = null;

  for (const line of lines) {
    if (line.startsWith('nodes:')) { section = 'nodes'; continue; }
    if (line.startsWith('edges:')) { section = 'edges'; continue; }
    if (section === 'nodes') {
      const [id, label] = line.split('|').map(s => s.trim());
      if (id && label) spec.nodes.push({ id, label });
    }
    if (section === 'edges') {
      const [from, to, label] = line.split('|').map(s => s.trim());
      if (from && to) spec.edges.push({ from, to, label: label || '' });
    }
  }
  return spec;
}

function toMermaid(spec) {
  const lines = ['graph TD'];
  for (const n of spec.nodes) {
    lines.push(`    ${n.id}["${n.label}"]`);
  }
  for (const e of spec.edges) {
    const lbl = e.label ? `|${e.label}|` : '';
    lines.push(`    ${e.from} -->${lbl} ${e.to}`);
  }
  return lines.join('\n');
}

function generate() {
  if (!existsSync(SPEC_DIR)) {
    mkdirSync(SPEC_DIR, { recursive: true });
    const example = `# Architecture spec: System Overview
nodes:
frontend | Voting Dashboard (React + Freighter)
backend  | API Layer (Express)
contracts | Soroban Smart Contracts
horizon  | Stellar Horizon
edges:
frontend | backend | HTTP API calls
backend | contracts | Soroban RPC
backend | horizon | Horizon queries
`;
    writeFileSync(resolve(SPEC_DIR, 'architecture.yml'), example);
    console.log('Created example spec at specs/architecture.yml');
  }

  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = readFileSync(SPEC_DIR).filter(f => f.endsWith('.yml'));
  for (const file of files) {
    const spec = parseSpec(resolve(SPEC_DIR, file));
    const mermaid = toMermaid(spec);
    const outName = file.replace('.yml', '.mmd');
    writeFileSync(resolve(OUTPUT_DIR, outName), mermaid);
    console.log(`Generated ${outName}`);
  }
}

generate();
