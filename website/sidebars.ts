import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    { type: 'doc', id: 'architecture', label: 'Architecture' },
    { type: 'doc', id: 'seps', label: 'SEP References' },
    { type: 'doc', id: 'integration-patterns', label: 'Integration Patterns' },
    { type: 'doc', id: 'soroban', label: 'Soroban Contract Patterns' },
    { type: 'doc', id: 'wallet', label: 'Wallet Integration' },
  ],
};

export default sidebars;
