import React from 'react';

interface SEP {
  number: number;
  title: string;
  status: string;
  usedIn: string;
}

const SEPS: SEP[] = [
  { number: 10, title: 'Stellar Web Authentication', status: 'Active', usedIn: 'frontend, backend' },
  { number: 24, title: 'Hosted Deposit and Withdrawal', status: 'Planned', usedIn: 'backend (future)' },
  { number: 29, title: 'Network Passphrase', status: 'Active', usedIn: 'all components' },
  { number: 38, title: 'Anchor RFQ', status: 'Planned', usedIn: 'backend (future)' },
  { number: 41, title: 'Soroban Smart Contracts', status: 'Active', usedIn: 'contracts, integration lib' },
];

export default function SEPReference(): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>SEP</th>
          <th>Title</th>
          <th>Status</th>
          <th>Used In</th>
        </tr>
      </thead>
      <tbody>
        {SEPS.map((sep) => (
          <tr key={sep.number}>
            <td>
              <a href={`https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-00${sep.number}.md`}>
                SEP-{sep.number}
              </a>
            </td>
            <td>{sep.title}</td>
            <td>{sep.status}</td>
            <td><code>{sep.usedIn}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
